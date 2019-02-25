import { GlobalService } from '../base-global.service';

export abstract class HttpService extends GlobalService {

    abstract get(uri: string, callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

    abstract post(uri: string, body: any, callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

}
