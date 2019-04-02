import { GlobalService } from '../base-global.service';
import { SearchParameters } from 'src/app/models/search/search-parameters.model';
import { SearchResult } from 'src/app/models/search/search-result.model';

export abstract class SearchService extends GlobalService {

    abstract getFacetInfo(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getBookmarks(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getDatasets(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getNomenclatures(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getProducts(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getRasters(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract searchItems(searchParams: SearchParameters, callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    // abstract searchRasters(searchParams: SearchParameters, callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

}
