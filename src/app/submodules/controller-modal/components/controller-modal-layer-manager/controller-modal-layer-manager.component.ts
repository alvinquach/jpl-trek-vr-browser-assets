import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';

@Component({
    selector: 'app-controller-modal-layer-manager',
    templateUrl: './controller-modal-layer-manager.component.html',
    styleUrls: ['./controller-modal-layer-manager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalLayerManagerComponent implements OnInit {

    private readonly _adjustmentDelta = 5;

    private _selectedLayer = 0;
    get selectedLayer() {
        return this._selectedLayer;
    }

    private _layers: any[];
    get layers() {
        return this._layers;
    }
    set layers(value: any[]) {
        this._selectedLayer = 0;
        this._layers = value;
    }

    constructor(private _cd: ChangeDetectorRef,
                private _terrainModelService: TerrainModelService) {

    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this._focusPrevious();
                break;
            case 'a':
                this._adjustLayer(this._selectedLayer, -this._adjustmentDelta)
                break;
            case 's':
                this._focusNext();
                break;
            case 'd':
                this._adjustLayer(this._selectedLayer, this._adjustmentDelta)
                break;
        }
    }

    ngOnInit() {
        this._terrainModelService.getCurrentLayers(data => {
            this._layers = data;
            this._cd.detectChanges();
        });
    }

    private _focusPrevious(): void {
        if (this._selectedLayer <= 0) {
            return;
        }
        this._selectedLayer--;
    }

    private _focusNext(): void {
        if (this._selectedLayer >= this._layers.length - 1) {
            return;
        }
        this._selectedLayer++;
    }

    private _adjustLayer(index: number, diff: number) {
        const layer = this._layers[index];
        layer.opacity += diff;
        if (layer.opacity < 0) {
            layer.opacity = 0;
        } else if (layer.opacity > 100) {
            layer.opacity = 100;
        }
        this._terrainModelService.adjustLayer(index + 1, layer.opacity);
    }

}
