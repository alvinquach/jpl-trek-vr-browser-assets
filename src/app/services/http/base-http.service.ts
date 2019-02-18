export abstract class HttpService {

    abstract get(uri: string, callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

    abstract post(uri: string, body: any, callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

}