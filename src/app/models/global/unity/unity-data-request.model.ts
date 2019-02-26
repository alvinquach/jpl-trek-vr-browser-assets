export class UnityDataRequest<T> {

    private _response: T;

    constructor(public readonly requestId, private _callback: (res?: T) => void) {

    }

    set response(res) {
        this._response = res;
        this._callback && this._callback(res);
    }

    get response() {
        return this._response;
    }

}