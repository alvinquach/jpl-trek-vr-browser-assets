import { Injectable, NgZone } from '@angular/core';
import { UnityDataRequest } from 'src/app/models/global/unity/unity-data-request.model';
import { GlobalService } from '../base-global.service';

/**
 * Service for requesting and receiving application data from Unity.
 * @author Alvin Quach
 */
@Injectable()
export class UnityDataService extends GlobalService {

    private _currentRequestId = 0;

    private readonly _dataRequests: {[key: string]: UnityDataRequest<any>} = {};

    constructor(private _ngZone: NgZone) {
        super(UnityDataService.name);
    }

    registerRequest<T>(callback?: (res: T) => void): UnityDataRequest<T> {
        const requestId = `${++this._currentRequestId}_APPDATA`;
        return this._dataRequests[requestId] = new UnityDataRequest(requestId, callback);
    }

    fulfillRequest(requestId: string, response: string): boolean {
        console.log(requestId);
        const request = this._dataRequests[requestId];
        if (!request) {
            console.error(`Data request ID ${requestId} does not exist.`);
            return false;
        }
        // Why isn't ngZone.run() needed here?
        request.response = JSON.parse(response);
        delete this._dataRequests[requestId];
        return true;
    }

}
