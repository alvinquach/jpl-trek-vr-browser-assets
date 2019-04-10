import { Injectable, Optional } from '@angular/core';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { TerrainModelLayerChange } from 'src/app/models/terrain/layer/terrain-model-layer-change.model';
import { TerrainModelLayer } from 'src/app/models/terrain/layer/terrain-model-layer.model';
import { ProductUtils } from 'src/app/utils/product.utils';
import { GlobalService } from '../base-global.service';
import { UnityDataService } from '../unity-data/unity-data.service';

@Injectable()
export class LayerService extends GlobalService {

    private readonly _unityGlobalVariables = UnityGlobalVariables.instance;

    constructor(@Optional() private _unityDataService: UnityDataService) {

        super(LayerService.name);
    }

    get onLayersUpdated() {
        return this._unityGlobalVariables.onLayersUpdated;
    }

    addLayer(uuid: string, index?: number) {
        if (!this._functionReadyAndValid('addLayer')) {
            return;
        }
        this._unityGlobalVariables.addLayer(uuid, index);
    }

    updateLayer(changes: TerrainModelLayerChange) {
        if (!this._functionReadyAndValid('updateLayer')) {
            return;
        }
        this._unityGlobalVariables.updateLayer(JSON.stringify(changes));
    }

    moveLayer(from: number, to: number) {
        if (!this._functionReadyAndValid('moveLayer')) {
            return;
        }
        this._unityGlobalVariables.moveLayer(from, to);
    }

    removeLayer(index: number) {
        if (!this._functionReadyAndValid('removeLayer')) {
            return;
        }
        this._unityGlobalVariables.removeLayer(index);
    }

    getCurrentLayers(callback: (layers: TerrainModelLayer[]) => void) {
        if (this._unityDataService && this._functionReadyAndValid('getCurrentLayers')) {
            const request = this._unityDataService.registerRequest(callback);
            this._unityGlobalVariables.getCurrentLayers(request.requestId);
        } else {
            console.error('Unity data service is not available. Displaying mock data.');
            /* tslint:disable:max-line-length */
            const mockLayers: TerrainModelLayer[] = [
                {
                    name: 'Base',
                    thumbnailUrl: null,
                    productUUID: '8bc9352d-ee73-4d1f-94b8-de5495fd8dfa',
                    opacity: 1.0,
                    visible: true
                },
                {
                    name: 'MGS MOLA and Mars Express HRSC, Color Hillshade Blend',
                    thumbnailUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw/thumbnail/Mars_MOLA_blend200ppx_HRSC_ClrShade_clon0dd_200mpp_lzw-',
                    productUUID: 'eb179b2d-89a8-4c5a-baaa-f4670ff5a335',
                    opacity: 1.0,
                    visible: true
                },
                {
                    name: 'MGS MOLA and Mars Express HRSC, Hillshade Blend',
                    thumbnailUrl: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MOLA_blend200ppx_HRSC_Shade_clon0dd_200mpp_lzw/thumbnail/Mars_MOLA_blend200ppx_HRSC_Shade_clon0dd_200mpp_lzw-',
                    productUUID: '595e535f-942d-41f4-b650-31e64ab63246',
                    opacity: 0.5,
                    visible: true
                }
            ];
            /* tslint:enable:max-line-length */
            callback(mockLayers);
        }
    }

    processData(layers: TerrainModelLayer[]): TerrainModelLayer[] {
        return layers.map(l => {
            return {
                name: l.name,
                thumbnailUrl: ProductUtils.parseThumbnailUrl(l.thumbnailUrl),
                productUUID: l.productUUID,
                opacity: ~~(l.opacity * 100),
                visible: l.visible
            };
        }).reverse();
    }

    private _functionReadyAndValid(functionName: string): boolean {
        if (!this._unityGlobalVariables || !this._unityGlobalVariables.layerFunctionsReady) {
            console.error('Error: Layer management controls are currently not available.');
            return false;
        }
        if (typeof this._unityGlobalVariables[functionName] !== 'function') {
            console.error(`Error: ${functionName} is not a function.`);
            return false;
        }
        return true;
    }

}
