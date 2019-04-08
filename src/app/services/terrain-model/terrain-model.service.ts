import { Optional, Injectable } from '@angular/core';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { GlobalService } from '../base-global.service';
import { UnityDataService } from '../unity-data/unity-data.service';

@Injectable()
export class TerrainModelService extends GlobalService {

    private readonly _unityGlobalVariables = UnityGlobalVariables.instance;

    constructor(@Optional() private _unityDataService: UnityDataService) {
        super(TerrainModelService.name);
    }

    showGlobeModel() {
        if (!this._functionReadyAndValid('showGlobeModel')) {
            return;
        }
        this._unityGlobalVariables.showGlobeModel();
    }

    navigateToCoordinate(bbox: string) {
        if (!this._functionReadyAndValid('navigateToCoordinate')) {
            return;
        }
        this._unityGlobalVariables.navigateToCoordinate(bbox);
    }

    highlightBoundingBoxOnGlobe(bbox: string) {
        if (!this._functionReadyAndValid('highlightBoundingBoxOnGlobe')) {
            return;
        }
        this._unityGlobalVariables.highlightBoundingBoxOnGlobe(bbox);
    }

    createLocalTerrainFromBookmark(bookmarkJson: string) {
        if (!this._functionReadyAndValid('createLocalTerrainFromBookmark')) {
            return;
        }
        this._unityGlobalVariables.createLocalTerrainFromBookmark(bookmarkJson);
    }

    getCurrentViewSettings(callback: (data: {[key: string]: any}) => void) {
        if (this._unityDataService && this._functionReadyAndValid('getCurrentViewSettings')) {
            const request = this._unityDataService.registerRequest(callback);
            this._unityGlobalVariables.getCurrentViewSettings(request.requestId);
        } else {
            console.error('Unity data service is not available. Displaying mock data.');
            callback({});
        }
    }

    setHeightExaggeration(value: number) {
        if (!this._functionReadyAndValid('setHeightExaggeration')) {
            return;
        }
        this._unityGlobalVariables.setHeightExaggeration(value);
    }

    setTexturesVisiblity(visible: boolean) {
        if (!this._functionReadyAndValid('setTexturesVisiblity')) {
            return;
        }
        this._unityGlobalVariables.setTexturesVisiblity(visible);
    }

    setCoordinateIndicatorsVisibility(visible: boolean) {
        if (!this._functionReadyAndValid('setCoordinateIndicatorsVisibility')) {
            return;
        }
        this._unityGlobalVariables.setCoordinateIndicatorsVisibility(visible);
    }

    setLocationNamesVisibility(visible: boolean) {
        if (!this._functionReadyAndValid('setLocationNamesVisibility')) {
            return;
        }
        this._unityGlobalVariables.setLocationNamesVisibility(visible);
    }

    hideControlPanel() {
        if (!this._functionReadyAndValid('hideControlPanel')) {
            return;
        }
        this._unityGlobalVariables.hideControlPanel();
    }

    // Temporary
    adjustLayer(layer: number, value: number) {
        if (!this._functionReadyAndValid('adjustLayer')) {
            return;
        }
        this._unityGlobalVariables.adjustLayer(layer, value);
    }

    // Temporary
    getCurrentLayers(callback: (layers: any) => void) {
        if (this._unityDataService && this._functionReadyAndValid('getCurrentLayers')) {
            const request = this._unityDataService.registerRequest(callback);
            this._unityGlobalVariables.getCurrentLayers(request.requestId);
        } else {
            console.error('Unity data service is not available. Displaying mock data.');
            callback([
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
            ]);
        }
    }

    private _functionReadyAndValid(functionName: string): boolean {
        if (!this._unityGlobalVariables || !this._unityGlobalVariables.terrainFunctionsReady) {
            console.error('Error: Terrain model control is currently not available.');
            return false;
        }
        if (typeof this._unityGlobalVariables[functionName] !== 'function') {
            console.error(`Error: ${functionName} is not a function.`);
            return false;
        }
        return true;
    }
}