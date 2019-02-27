import { GlobalService } from '../base-global.service';
import { SearchParameters } from 'src/app/models/search/search-parameters.model';

export abstract class SearchService extends GlobalService {

    abstract getFacetInfo(callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

    abstract getBookmarks(callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

    abstract getDatasets(callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

    abstract getNomenclature(callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

    abstract getProducts(callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

    abstract search(searchParams: SearchParameters, callback: (value: Object) => void, errorCallback?: (error: any) => void): void;

}
