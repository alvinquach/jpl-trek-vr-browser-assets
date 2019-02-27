import { Injectable } from '@angular/core';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { UnityDataRequest } from 'src/app/models/global/unity/unity-data-request.model';
import { HttpService } from './base-http.service';

/**
 * Implementation of HttpService that makes HTTP calls through
 * Unity to avoid issues if network access is blocked on the
 * ZFBrowser process.
 *
 * @author Alvin Quach
 */
@Injectable()
export class UnityHttpService extends HttpService {

    private _currentRequestId = 0;

    private readonly _webRequests: {[key: string]: UnityDataRequest<string>} = {};

    constructor() {
        super(UnityHttpService.name);
    }

    get(uri: string, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        if (!this.functionReadyAndValid('getRequest')) {
            return;
        }
        const requestId = `${this._currentRequestId++}_GET`;
        UnityGlobalVariables.instance.getRequest(uri, requestId);

        // Register a web request so that a response can be received from Unity.
        this.addWebRequest(requestId, (res: string) => {
            // TODO Handle errors
            const responseObject = JSON.parse(res);
            callback(responseObject);
        });
    }

    getText(uri: string, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        // TODO Implement this
    }

    post(uri: string, body: any, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        if (!this.functionReadyAndValid('postRequest')) {
            return;
        }
        const requestId = `${this._currentRequestId++}_POST`;
        UnityGlobalVariables.instance.postRequest(uri, JSON.stringify(body), requestId);

        // Register a web request so that a response can be received from Unity.
        this.addWebRequest(requestId, (res: string) => {
            // TODO Handle errors
            const responseObject = JSON.parse(res);
            callback(responseObject);
        });
    }

    fulfillWebRequest(requestId: string, response: string): boolean {
        console.log(requestId);
        const request = this._webRequests[requestId];
        if (!request) {
            console.error(`Web request ID ${requestId} does not exist.`);
            return false;
        }
        request.response = response;
        delete this._webRequests[requestId];
        return true;
    }

    private addWebRequest(requestId: string, callback?: (res: string) => void): UnityDataRequest<string> {
        if (!!this._webRequests[requestId]) {
            console.error(`Web request ID ${requestId} already exists.`);
            return null;
        }
        return this._webRequests[requestId] = new UnityDataRequest(requestId, callback);
    }

    private functionReadyAndValid(functionName: string): boolean {
        const unityGlobalVariables = UnityGlobalVariables.instance;
        if (!unityGlobalVariables || !unityGlobalVariables.webFunctionsReady) {
            console.error('Error: Web requests through Unity is currently not available.');
            return false;
        }
        if (typeof unityGlobalVariables[functionName] !== 'function') {
            console.error(`Error: ${functionName} is not a function.`);
            return false;
        }
        return true;
    }

}
