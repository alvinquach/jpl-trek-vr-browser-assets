import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TerrainModelLayer } from 'src/app/models/terrain/layer/terrain-model-layer.model';
import { LayerService } from 'src/app/services/layer/layer.service';

@Component({
    selector: 'app-controller-modal-layer-manager',
    templateUrl: './controller-modal-layer-manager.component.html',
    styleUrls: ['./controller-modal-layer-manager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalLayerManagerComponent implements OnInit, OnDestroy {

    private readonly _adjustmentDelta = 5;

    private _layersUpdateSubscription: Subscription;

    private _activeLayerIndex = 0;
    get activeLayerIndex() {
        return this._activeLayerIndex;
    }

    private _layers: TerrainModelLayer[];
    get layers() {
        return this._layers;
    }

    constructor(private _cd: ChangeDetectorRef,
                private _layerService: LayerService) {

    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this._focusPrevious();
                break;
            case 'a':
                this._adjustLayer(this._activeLayerIndex, -this._adjustmentDelta)
                break;
            case 's':
                this._focusNext();
                break;
            case 'd':
                this._adjustLayer(this._activeLayerIndex, this._adjustmentDelta)
                break;
        }
    }

    ngOnInit() {
        this._layerService.getCurrentLayers(res => {
            this._layers = this._layerService.processData(res);
            this._cd.detectChanges();
        });

        this._layersUpdateSubscription = this._layerService.onLayersUpdated.subscribe(res => {
            if (!res) {
                return;
            }
            this._layers = this._layerService.processData(res);
            this._cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this._layersUpdateSubscription && this._layersUpdateSubscription.unsubscribe();
    }

    private _focusPrevious(): void {
        if (this._activeLayerIndex <= 0) {
            return;
        }
        this._activeLayerIndex--;
    }

    private _focusNext(): void {
        if (this._activeLayerIndex >= this._layers.length - 1) {
            return;
        }
        this._activeLayerIndex++;
    }

    private _adjustLayer(index: number, diff: number) {
        const layer = this._layers[index];
        layer.opacity += diff;
        if (layer.opacity < 0) {
            layer.opacity = 0;
        } else if (layer.opacity > 100) {
            layer.opacity = 100;
        }
        this._layerService.updateLayer({
            index: this._getActualIndex(index),
            opacity: layer.opacity / 100
        });
    }

    private _getActualIndex(index: number) {
        // Assumes index is within bounds.
        return this._layers.length - index - 1;
    }

}
