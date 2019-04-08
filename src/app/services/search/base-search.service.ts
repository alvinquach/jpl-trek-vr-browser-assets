import { BehaviorSubject } from 'rxjs';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';
import { SearchParameters } from 'src/app/models/search/search-parameters.model';
import { SearchResult } from 'src/app/models/search/search-result.model';
import { GlobalService } from '../base-global.service';

export abstract class SearchService extends GlobalService {

    abstract get onSearchListActiveIndexChange(): BehaviorSubject<number>;

    abstract updateSearchListActiveIndex(index: number): void;

    abstract getFacetInfo(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getBookmarks(callback: (value: Bookmark[]) => void, errorCallback?: (error: any) => void): void;

    abstract getDatasets(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getNomenclatures(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getProducts(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract getRasters(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    abstract searchItems(searchParams: SearchParameters, callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

    // abstract searchRasters(searchParams: SearchParameters, callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void;

}
