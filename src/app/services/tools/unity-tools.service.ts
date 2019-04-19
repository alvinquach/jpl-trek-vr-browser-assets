import { Injectable, Optional } from '@angular/core';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { Coordinate } from 'src/app/models/terrain/coordinate.model';
import { UnityDataService } from '../unity-data/unity-data.service';
import { ToolsService } from './base-tools.service';

@Injectable()
export class UnityToolsService extends ToolsService {

    private readonly _unityGlobalVariables = UnityGlobalVariables.instance;

    constructor(@Optional() private _unityDataService: UnityDataService) {
        super(UnityToolsService.name);
    }

    getDistance(points: Coordinate[], callback: (res) => void, errorCallback?: (error: any) => void) {
        if (this._unityDataService && this._functionReadyAndValid('getDistance')) {
            const request = this._unityDataService.registerRequest<string>(res => {
                callback(JSON.parse(res));
            });
            this._unityGlobalVariables.getDistance(this._coordinatesToString(points), request.requestId);
        } else {
            callback({totalDistance: 'Service not available'});
        }
    }

    private _functionReadyAndValid(functionName: string): boolean {
        if (!this._unityGlobalVariables || !this._unityGlobalVariables.toolsFunctionsReady) {
            console.error('Error: Tools service through Unity is currently not available.');
            return false;
        }
        if (typeof this._unityGlobalVariables[functionName] !== 'function') {
            console.error(`Error: ${functionName} is not a function.`);
            return false;
        }
        return true;
    }

}
