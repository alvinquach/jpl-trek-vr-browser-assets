import { Injectable, Optional } from '@angular/core';
import { HttpService } from './base-http.service';
import { UnityService } from '../unity.service';

@Injectable()
export class UnityHttpService extends HttpService {

    constructor(@Optional() private _unityService: UnityService) {
        super();
    }

    get(uri: string, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        if (!this.unityWebServicesAvaiable) {
            return;
        }
        this._unityService.get(uri, (res: string) => {
            // TODO Handle errors
            const responseObject = JSON.parse(res);
            callback(responseObject);
        });
    }

    post(uri: string, body: any, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        if (!this.unityWebServicesAvaiable) {
            return;
        }
        this._unityService.post(uri, JSON.stringify(body), (res: string) => {
            // TODO Handle errors
            const responseObject = JSON.parse(res);
            callback(responseObject);
        });
    }

    private get unityWebServicesAvaiable(): boolean {
        return this._unityService && this._unityService.webFunctionsReady;
    }

}