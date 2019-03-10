import { Injectable, NgZone } from '@angular/core';
import { SearchService } from './base-search.service';
import { UnityDataRequest } from 'src/app/models/global/unity/unity-data-request.model';
import { SearchResult } from 'src/app/models/search/search-result.model';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { SearchParameters } from 'src/app/models/search/search-parameters.model';
import { SearchItemType } from 'src/app/models/search/search-item-type.type';

/**
 * Implementation of SearchService that makes HTTP calls through
 * Unity to avoid issues if network access is blocked on the
 * ZFBrowser process.
 *
 * @author Alvin Quach
 */
@Injectable()
export class UnitySearchService extends SearchService {

    private _currentRequestId = 0;

    private readonly _searchRequests: {[key: string]: UnityDataRequest<SearchResult>} = {};

    constructor(private _ngZone: NgZone) {
        super(UnitySearchService.name);
    }

    getFacetInfo(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (!this._functionReadyAndValid('getFacetInfo')) {
            return;
        }
        const requestId = `${this._currentRequestId++}_GET_FACET_INFO`;
        UnityGlobalVariables.instance.getFacetInfo(requestId);

        // Register a web request so that a response can be received from Unity.
        this._addSearchRequest(requestId, (res: SearchResult) => {
            // TODO Handle errors
            this._processResults(res);
            callback(res);
        });
    }

    getBookmarks(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (!this._functionReadyAndValid('getBookmarks')) {
            return;
        }
        const requestId = `${this._currentRequestId++}_GET_BOOKMARKS`;
        UnityGlobalVariables.instance.getBookmarks(requestId);

        // Register a web request so that a response can be received from Unity.
        this._addSearchRequest(requestId, (res: SearchResult) => {
            // TODO Handle errors
            this._processResults(res);
            callback(res);
        });
    }

    getDatasets(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (!this._functionReadyAndValid('getDatasets')) {
            return;
        }
        const requestId = `${this._currentRequestId++}_GET_DATASETS`;
        UnityGlobalVariables.instance.getDatasets(requestId);

        // Register a web request so that a response can be received from Unity.
        this._addSearchRequest(requestId, (res: SearchResult) => {
            // TODO Handle errors
            this._processResults(res);
            callback(res);
        });
    }

    getNomenclatures(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (!this._functionReadyAndValid('getNomenclatures')) {
            return;
        }
        const requestId = `${this._currentRequestId++}_GET_NOMENCLATURE`;
        UnityGlobalVariables.instance.getNomenclatures(requestId);

        // Register a web request so that a response can be received from Unity.
        this._addSearchRequest(requestId, (res: SearchResult) => {
            // TODO Handle errors
            this._processResults(res);
            callback(res);
        });
    }

    getProducts(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (!this._functionReadyAndValid('getProducts')) {
            return;
        }
        const requestId = `${this._currentRequestId++}_GET_PRODUCTS`;
        UnityGlobalVariables.instance.getProducts(requestId);

        // Register a web request so that a response can be received from Unity.
        this._addSearchRequest(requestId, (res: SearchResult) => {
            // TODO Handle errors
            this._processResults(res);
            callback(res);
        });
    }

    search(searchParams: SearchParameters, callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (!this._functionReadyAndValid('search')) {
            return;
        }
        const requestId = `${this._currentRequestId++}_SEARCH`;
        UnityGlobalVariables.instance.search(searchParams, requestId);

        // Register a web request so that a response can be received from Unity.
        this._addSearchRequest(requestId, (res: SearchResult) => {
            // TODO Handle errors
            this._processResults(res);
            callback(res);
        });
    }

    fulfillRequest(requestId: string, response: string): boolean {
        console.log(requestId);
        const request = this._searchRequests[requestId];
        if (!request) {
            console.error(`Search request ID ${requestId} does not exist.`);
            return false;
        }
        this._ngZone.run(() => {
            request.response = JSON.parse(response);
            delete this._searchRequests[requestId];
        });
        return true;
    }

    private _processResults(res: SearchResult): void {
        if (res.facetInfo && res.facetInfo.itemType) {
            const itemType = <any>res.facetInfo.itemType;
            const itemTypeMap = new Map<SearchItemType, number>();
            for (const key of Object.keys(itemType)) {
                itemTypeMap.set(<any>key, itemType[key]);
            }
            res.facetInfo.itemType = itemTypeMap;
        }
    }

    private _addSearchRequest(requestId: string, callback?: (res: SearchResult) => void): UnityDataRequest<SearchResult> {
        if (!!this._searchRequests[requestId]) {
            console.error(`Search request ID ${requestId} already exists.`);
            return null;
        }
        return this._searchRequests[requestId] = new UnityDataRequest(requestId, callback);
    }

    private _functionReadyAndValid(functionName: string): boolean {
        const unityGlobalVariables = UnityGlobalVariables.instance;
        if (!unityGlobalVariables || !unityGlobalVariables.webFunctionsReady) {
            console.error('Error: Search requests through Unity is currently not available.');
            return false;
        }
        if (typeof unityGlobalVariables[functionName] !== 'function') {
            console.error(`Error: ${functionName} is not a function.`);
            return false;
        }
        return true;
    }

}
