import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';
import { SearchItemType } from 'src/app/models/search/search-item-type.type';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { SearchService } from 'src/app/services/search/base-search.service';

@Component({
    selector: 'app-controller-modal-search-results',
    templateUrl: './controller-modal-search-results.component.html',
    styleUrls: ['./controller-modal-search-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalSearchResultsComponent implements OnInit {

    private _itemType: SearchItemType;
    get itemType() {
        return this._itemType;
    }

    private _items: (SearchResultItem | Bookmark)[];
    get items() {
        return this._items;
    }

    private _helpMode = false;
    get helpMode() {
        return this._helpMode;
    }
    set helpMode(value: boolean) {
        this._helpMode = value;
    }

    constructor(private _activatedRoute: ActivatedRoute,
                private _cd: ChangeDetectorRef,
                private _searchService: SearchService) {

    }

    ngOnInit() {
        const path = this._activatedRoute.snapshot.routeConfig.path;
        if (path === 'products') {
            this._itemType = 'Product';
            this._searchService.getProducts(res => {
                this._items = res.items;
                this._cd.detectChanges();
            });
        } else if (path === 'bookmarks') {
            this._itemType = 'Bookmark';
            this._searchService.getBookmarks(res => {
                this._items = res;
                this._cd.detectChanges();
            });
        }
    }

    toggleHelpMode(): void {
        this.helpMode = !this._helpMode;
    }

}
