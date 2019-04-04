import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';
import { SearchFacetInfo } from 'src/app/models/search/search-facet-info.model';
import { SearchItemType } from 'src/app/models/search/search-item-type.type';
import { SearchParameters } from 'src/app/models/search/search-parameters.model';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { SearchResult } from 'src/app/models/search/search-result.model';
import { StringUtils } from 'src/app/utils/string.utils';
import { SearchService } from './base-search.service';

/**
 * Implementation of SearchServices that makes HTTP calls using
 * Angular's HttpClient. For use when testing the UI using a
 * real browser with network access.
 *
 * @author Alvin Quach
 */
@Injectable()
export class AngularSearchService extends SearchService {

    private readonly _baseUrl = 'https://trek.nasa.gov/marsbeta/TrekServices/ws/index/eq';

    private readonly _itemSearchUrl = '/searchItems?&&&&proj=urn:ogc:def:crs:EPSG::104905';

    private readonly _rasterSearchUrl = '/searchRaster?';

    private _facetInfo: SearchResult;
    private _bookmarks: Bookmark[];
    private _datasets: SearchResult;
    private _nomenclatures: SearchResult;
    private _products: SearchResult;
    private _rasters: SearchResult;

    constructor(private _http: HttpClient) {
        super(undefined);
    }

    getFacetInfo(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._facetInfo) {
            callback(this._facetInfo);
            return;
        }
        const paramsMap = {
            start: '0',
            rows: '0' // Only get the facet data.
        };
        this._http.get(`${this._baseUrl}${this._itemSearchUrl}`, { params: paramsMap }).subscribe(res => {
            this._facetInfo = this._convertResults(res);
            callback(this._facetInfo);
        });
    }

    getBookmarks(callback: (value: Bookmark[]) => void, errorCallback?: (error: any) => void): void {
        if (this._bookmarks) {
            callback(this._bookmarks);
            return;
        }
        /* tslint:disable:max-line-length */
        // Dummy data since no actual HTTP service currenlty exists.
        const dummy = [
            {
                'item_UUID': 'curiosityBookmarkTesting',
                'title': 'Curiosity Bookmark',
                'bbox': '137.2469,-4.8715,137.5518,-4.5392',
                'shape': 'POLYGON ((137.2469 -4.8715,137.5518 -4.8715,137.5518 -4.5392,137.2469 -4.5392,137.2469 -4.8715))',
                'textures': ['b40d61ea-a26b-48e1-bdec-5f5ed5cf73d5'],
                'dem': 'a0f5221a-0a08-40b9-ae82-75a49aac5afe',
                'description': 'Curiosity landed in Gale Crater on Mars on August 6th, 2012. With a diameter of 154 km and a central peak 5.5 km tall, Gale Crater was chosen as the landing site for the Mars Science Laboratory Curiosity rover. The choice was based on evidence from orbiting spacecraft that indicate that the crater may have once contained large amounts of liquid water. The central peak, Mount Sharp, exhibits layered rock deposits rich in sedimentary minerals including clays, sulfates, and salts that require water to form.',
                'mediaURL': 'https://trek.nasa.gov/mars/jpl/assets/features/curiosity/images/curiosity_rover_story.png',
            }
        ];
        /* tslint:enable:max-line-length */
        this._bookmarks = dummy.map(doc => {
            return {
                name: doc.title,
                uuid: doc.item_UUID,
                thumbnailUrl: doc.mediaURL,
                description: doc.description,
                boundingBox: doc.bbox,
                demUUID: doc.dem,
                texturesUUID: [...doc.textures],
            };
        });
        callback(this._bookmarks);
    }

    getDatasets(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._datasets) {
            callback(this._datasets);
            return;
        }
        this.searchItems({ itemType: 'Dataset' }, res => {
            this._datasets = res;
            callback(this._datasets);
        });
    }

    getNomenclatures(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._nomenclatures) {
            callback(this._nomenclatures);
            return;
        }
        this.searchItems({ itemType: 'Nomenclature' }, res => {
            this._nomenclatures = res;
            callback(this._nomenclatures);
        });
    }

    getProducts(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._products) {
            callback(this._products);
            return;
        }
        this.searchItems({ itemType: 'Product' }, res => {
            this._products = res;
            callback(this._products);
        });
    }

    getRasters(callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {
        if (this._rasters) {
            callback(this._rasters);
            return;
        }

        const paramsMap = {
            productType: '*'
        };

        this._http.get(`${this._baseUrl}${this._rasterSearchUrl}`, { params: paramsMap }).subscribe(res => {
            const result = this._convertResults(res);
            callback(result);
        });
    }

    searchItems(searchParams: SearchParameters, callback: (value: SearchResult) => void, errorCallback?: (error: any) => void): void {

        this.getFacetInfo(info => {

            const paramsMap = {
                start: '0',
                rows: `${info.totalCount}`
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

            this._http.get(`${this._baseUrl}${this._itemSearchUrl}`, { params: paramsMap }).subscribe(res => {
                const result = this._convertResults(res);
                callback(result);
            });

        });

    }

    private _convertResults(res: any): SearchResult {
        const items: SearchResultItem[] = (<any[]>res.response.docs).map(doc => {
            return {
                name: doc.title,
                uuid: doc.item_UUID,
                thumbnailUrl: doc.thumbnailURLDir,
                itemType: <any>StringUtils.firstCharacterToUpper(doc.itemType),
                productLabel: doc.productLabel,
                productType: doc.productType,
                instrument: doc.instrument,
                description: doc.description,
                boundingBox: doc.bbox
            };
        });
        const facetInfo: SearchFacetInfo = !res.facet_counts ? null : {
            itemType: this._convertFacetItemTypesToMap(res.facet_counts.facet_fields.itemType),
            productType: this._convertListToMap(res.facet_counts.facet_fields.productType),
            mission: this._convertListToMap(res.facet_counts.facet_fields.mission),
            instrument: this._convertListToMap(res.facet_counts.facet_fields.instrument)
        };
        const result: SearchResult = {
            totalCount: res.response.numFound,
            startIndex: res.response.start,
            items: items,
            facetInfo: facetInfo
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