import { Injectable } from '@angular/core';
import { UnityGlobalVariables } from '../models/global/unity-global-variables.model';
import { AngularGlobalVariables } from '../models/global/angular/angular-global-variables.model';
import { AngularWebRequest } from '../models/global/angular/angular-web-request.model';

@Injectable()
export class UnityService {

    private _currentRequestId = 0;

    get webFunctionsReady(): boolean {
        return this.unityGlobalVariables.webFunctionsReady;
    }

    executeFunction(functionName: string, args: any) {
        const unityGlobalVariables = this.unityGlobalVariables;
        const func = unityGlobalVariables.functionsMap[functionName];
        if (typeof func === 'function') {
            func(...args);
        } else {
            console.error(`Error: ${functionName} is not a function.`);
        }
    }

    registerFunctionsFor(componentOrService: string) {
        const unityGlobalVariables = this.unityGlobalVariables;
        if (typeof unityGlobalVariables.registerFunctionsFor === 'function') {
            unityGlobalVariables.registerFunctionsFor(componentOrService);
        } else {
            console.error(`Error: registerFunctionsFor is not a function.`);
        }
    }

    unregisterFunctionsFor(componentOrService: string) {
        const unityGlobalVariables = this.unityGlobalVariables;
        if (typeof unityGlobalVariables.unregisterFunctionsFor === 'function') {
            unityGlobalVariables.unregisterFunctionsFor(componentOrService);
        } else {
            console.error(`Error: unregisterFunctionsFor is not a function.`);
        }
    }

    //#region HTTP reqeusts

    get(uri: string, callback?: (res: string) => void): AngularWebRequest {
        const unityGlobalVariables = this.unityGlobalVariables;
        if (typeof unityGlobalVariables.getRequest !== 'function') {
            console.error(`Error: getRequest is not a function.`);
            return null;
        }
        const requestId = `GET${this._currentRequestId++}`;
        unityGlobalVariables.getRequest(uri, requestId);

        // Register a web request with the AngularGlobalVariables so that
        // a response can be received from Unity.
        const angularGlobalVariables = this.angularGlobalVariables;
        return angularGlobalVariables.addWebRequest(requestId, callback);
    }

    post(uri: string, body: string, callback?: (res: string) => void): AngularWebRequest {
        const unityGlobalVariables = this.unityGlobalVariables;
        if (typeof unityGlobalVariables.postRequest !== 'function') {
            console.error(`Error: postRequest is not a function.`);
            return null;
        }
        const requestId = `POST${this._currentRequestId++}`;
        unityGlobalVariables.postRequest(uri, body, requestId);

        // Register a web request with the AngularGlobalVariables so that
        // a response can be received from Unity.
        const angularGlobalVariables = this.angularGlobalVariables;
        return angularGlobalVariables.addWebRequest(requestId, callback);
    }

    //#endregion

    private get angularGlobalVariables(): AngularGlobalVariables {
        return window[AngularGlobalVariables.name];
    }

    private get unityGlobalVariables(): UnityGlobalVariables {
        return window[UnityGlobalVariables.name];
    }

}
