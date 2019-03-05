import { SearchResultItem } from './search-result-item.model';
import { SearchFacetInfo } from './search-facet-info.model';

export interface SearchResult {
    totalCount: number;
    startIndex: number;
    items: SearchResultItem[];
    facetInfo: SearchFacetInfo;
}
