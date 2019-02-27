import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchService } from './base-search.service';
import { SearchParameters } from 'src/app/models/search/search-parameters.model';
import { SearchResult } from 'src/app/models/search/search-result.model';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { StringUtils } from 'src/app/utils/string.utils';
import { SearchFacetInfo } from 'src/app/models/search/search-facet-info.model';
import { SearchItemType } from 'src/app/models/search/search-item-type.type';

/**
 * Implementation of SearchServices that makes HTTP calls using
 * Angular's HttpClient. For use when testing the UI using a
 * real browser with network access.
 *
 * @author Alvin Quach
 */
@Injectable()
export class AngularSearchService extends SearchService {

    private readonly _baseUrl = 'https://trek.nasa.gov/mars/TrekServices/ws/index/eq/searchItems?&&&&proj=urn:ogc:def:crs:EPSG::104905';

    private _facetInfo: SearchResult;
    private _bookmarks: SearchResult;
    private _datasets: SearchResult;
    private _nomenclature: SearchResult;
    private _products: SearchResult;

    constructor(private _http: HttpClient) {
        super(undefined);
    }

    getFacetInfo(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._facetInfo) {
            callback(this._facetInfo);
        }
        const paramsMap = {
            start: '0',
            rows: '0' // Only get the facet data.
        };
        this._http.get(this._baseUrl, { params: paramsMap }).subscribe(res => {
            this._facetInfo = this._convertResults(res);
            callback(this._facetInfo);
        });
    }

    getBookmarks(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._bookmarks) {
            callback(this._bookmarks);
        }
        this.search({ itemType: 'Bookmark' }, res => {
            this._bookmarks = res;
            callback(this._bookmarks);
        });
    }

    getDatasets(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._datasets) {
            callback(this._datasets);
        }
        this.search({ itemType: 'Dataset' }, res => {
            this._datasets = res;
            callback(this._datasets);
        });
    }

    getNomenclature(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._nomenclature) {
            callback(this._nomenclature);
        }
        this.search({ itemType: 'Nomenclature' }, res => {
            this._nomenclature = res;
            callback(this._nomenclature);
        });
    }

    getProducts(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._products) {
            callback(this._products);
        }
        this.search({ itemType: 'Product' }, res => {
            this._products = res;
            callback(this._products);
        });
    }

    search(searchParams: SearchParameters, callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {

        this.getFacetInfo(info => {

            const paramsMap = {
                start: '0',
                rows: '3000' // TODO check facet info for exact count
            };

            const facetKeys: string[] = [];
            const facetValues: string[] = [];

            if (searchParams.itemType) {
                facetKeys.push('itemType');
                facetValues.push(StringUtils.firstCharacterToLower(searchParams.itemType));
            }
            if (searchParams.productType) {
                facetKeys.push('productType');
                facetValues.push(searchParams.productType);
            }
            if (searchParams.mission) {
                facetKeys.push('mission');
                facetValues.push(searchParams.mission);
            }
            if (searchParams.instrument) {
                facetKeys.push('instrument');
                facetValues.push(searchParams.instrument);
            }

            paramsMap['facetKeys'] = facetKeys.join('|');
            paramsMap['facetValues'] = facetValues.join('|');

            if (searchParams.search) {
                paramsMap['key'] = searchParams.search;
            }

            this._http.get(this._baseUrl, { params: paramsMap }).subscribe(res => {
                const result = this._convertResults(res);
                callback(result);
            });

        });

    }

    private _convertResults(res: any): SearchResult {
        const items: any[] = (<any[]>res.response.docs).map(doc => {
            return {
                name: doc.productLabel,
                itemType: StringUtils.firstCharacterToUpper(doc.itemType)
            };
        });
        const facetInfo: SearchFacetInfo = {
            itemType: this._convertFacetItemTypesToMap(res.facet_counts.facet_fields.itemType),
            productType: this._convertListToMap(res.facet_counts.facet_fields.productType),
            mission: this._convertListToMap(res.facet_counts.facet_fields.mission),
            instrument: this._convertListToMap(res.facet_counts.facet_fields.instrument)
        };
        const result: SearchResult = {
            totalCount: res.response.numFound,
            startIndex: res.response.start,
            items: items,
            searchFacetInfo: facetInfo
        };
        return result;
    }

    private _convertFacetItemTypesToMap(src: any[]): Map<SearchItemType, number> {
        const dest = new Map<SearchItemType, number>();
        for (let i = 0; i < src.length; i += 2) {
            const itemType = StringUtils.firstCharacterToUpper(src[i]);
            const count = src[i + 1];
            dest.set(<any>itemType, count);
        }
        return dest;
    }

    private _convertListToMap(src: any[]): {[key: string]: number} {
        const dest: {[key: string]: number} = {};
        for (let i = 0; i < src.length; i += 2) {
            dest[src[i]] = src[i + 1];
        }
        return dest;
    }

}