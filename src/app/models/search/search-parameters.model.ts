import { SearchItemType } from './search-item-type.type';

export interface SearchParameters {
    search?: string;
    itemType?: SearchItemType;
    productType?: string;
    mission?: string;
    instrument?: string;
}