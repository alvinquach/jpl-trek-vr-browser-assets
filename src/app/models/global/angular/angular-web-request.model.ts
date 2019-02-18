export class AngularWebRequest {

    private _response: any;

    constructor(public readonly requestId, private _callback: (res?: string) => void) {

    }

    set response(res) {
        this._response = res;
        this._callback && this._callback(res);
    }

    get response() {
        return this._response;
    }

}