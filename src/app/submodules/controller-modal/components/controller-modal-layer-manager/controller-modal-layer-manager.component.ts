import { ChangeDetectionStrategy, Component, OnInit, Optional, ChangeDetectorRef, HostListener } from '@angular/core';
import { UnityDataService } from 'src/app/services/unity-data/unity-data.service';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';

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
                @Optional() private _unityDataService: UnityDataService) {

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
        if (this._unityDataService) {
            const unityGlobalVariables = UnityGlobalVariables.instance;
            if (unityGlobalVariables.terrainFunctionsReady) {
                const request = this._unityDataService.registerRequest<any>(data => {
                    this._layers = data;
                    this._cd.detectChanges();
                });
                unityGlobalVariables.getCurrentLayers(request.requestId);
            } else {
                console.error(`Terrain model functions are not available or not ready yet.`);
            }
        } else {
            console.error('Unity data service is not available. Displaying mock data.');
            this._layers = [
                {
                    name: 'Test Texture',
                    opacity: 0
                },
                {
                    name: 'mola_roughness',
                    opacity: 0
                },
                {
                    name: 'Mars_MGS_MOLA_ClrShade_merge_global_463m',
                    opacity: 0
                },
            ];
        }
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

        const unityGlobalVariables = UnityGlobalVariables.instance;
        if (unityGlobalVariables.terrainFunctionsReady) {
            unityGlobalVariables.adjustLayer(index + 1, layer.opacity);
        }
    }

}
