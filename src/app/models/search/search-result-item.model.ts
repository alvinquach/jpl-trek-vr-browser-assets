import { SearchItemType } from './search-item-type.type';

export interface SearchResultItem {
    name: string;
    itemType: SearchItemType;
    thumbnailUrl: string;
    productLabel: string;
    productType: string;
    instrument: string;
    description: string;
    boundingBox: string;
}
