import { Injectable } from '@angular/core';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { UnityWebRequest } from 'src/app/models/global/unity/unity-web-request.model';
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

    private readonly _webRequests: {[key: string]: UnityWebRequest} = {};

    constructor() {
        super(UnityHttpService.name);
    }

    get(uri: string, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        const unityGlobalVariables = this.unityGlobalVariables;
        if (!unityGlobalVariables || !unityGlobalVariables.webFunctionsReady) {
            console.error('Error: Web requests through Unity is currently not available.');
            return;
        }
        if (typeof unityGlobalVariables.getRequest !== 'function') {
            console.error('Error: getRequest is not a function.');
            return;
        }
        const requestId = `GET${this._currentRequestId++}`;
        unityGlobalVariables.getRequest(uri, requestId);

        // Register a web request so that a response can be received from Unity.
        this.addWebRequest(requestId, (res: string) => {
            // TODO Handle errors
            const responseObject = JSON.parse(res);
            callback(responseObject);
        });
    }

    post(uri: string, body: any, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        const unityGlobalVariables = this.unityGlobalVariables;
        if (!unityGlobalVariables || !unityGlobalVariables.webFunctionsReady) {
            console.error('Error: Web requests through Unity is currently not available.');
            return;
        }
        if (typeof unityGlobalVariables.postRequest !== 'function') {
            console.error('Error: postRequest is not a function.');
            return;
        }
        const requestId = `POST${this._currentRequestId++}`;
        unityGlobalVariables.postRequest(uri, JSON.stringify(body), requestId);

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

    private addWebRequest(requestId: string, callback?: (res: string) => void): UnityWebRequest {
        if (!!this._webRequests[requestId]) {
            console.error(`Web request ID ${requestId} already exists.`);
            return null;
        }
        return this._webRequests[requestId] = new UnityWebRequest(requestId, callback);
    }

    private get unityGlobalVariables(): UnityGlobalVariables {
        return window[UnityGlobalVariables.name];
    }

}
