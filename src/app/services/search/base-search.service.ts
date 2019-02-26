import { GlobalService } from '../base-global.service';

export abstract class SearchService extends GlobalService {

    abstract getFacetInfo(callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

    abstract getBookmarks(callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

}
