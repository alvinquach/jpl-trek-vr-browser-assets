import { SearchItemType } from './search-item-type.type';

export interface SearchFacetInfo {
    itemType: Map<SearchItemType, number>;
    productType: {[key: string]: number};
    mission: {[key: string]: number};
    instrument: {[key: string]: number};
}