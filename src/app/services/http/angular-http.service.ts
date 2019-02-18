import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './base-http.service';

@Injectable()
export class AngularHttpService extends HttpService {

    constructor(private _http: HttpClient) {
        super();
    }

    get(uri: string, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        this._http.get(uri).subscribe(value => callback(value), error => errorCallback && errorCallback(error));
    }

    post(uri: string, body: any, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        this._http.post(uri, body).subscribe(value => callback(value), error => errorCallback && errorCallback(error));
    }

}