import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './base-search.service';
import { SearchParameters } from 'src/app/models/search/search-parameters.model';

/**
 * Implementation of SearchServices that makes HTTP calls using
 * Angular's HttpClient. For use when testing the UI using a
 * real browser with network access.
 *
 * @author Alvin Quach
 */
@Injectable()
export class AngularSearchService extends SearchService {

    constructor(private _http: HttpClient) {
        super(undefined);
    }

    getFacetInfo(callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        // TODO Implement this
    }

    search(searchParams: SearchParameters, callback: (value: Object) => void, errorCallback?: (error: any) => void): void {
        // TODO Implement this
    }

}