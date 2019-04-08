import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';
import { SearchItemType } from 'src/app/models/search/search-item-type.type';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { SearchService } from 'src/app/services/search/base-search.service';
import { MathUtils } from 'src/app/utils/math.utils';

@Component({
    selector: 'app-controller-modal-search-results',
    templateUrl: './controller-modal-search-results.component.html',
    styleUrls: ['./controller-modal-search-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalSearchResultsComponent implements OnInit {

    private readonly _fastSkipCount = 10;

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

    private _activeItemIndex = 0;
    get activeItemIndex() {
        return this._activeItemIndex;
    }

    constructor(private _activatedRoute: ActivatedRoute,
                private _cd: ChangeDetectorRef,
                private _searchService: SearchService) {

    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this._focusPrevious();
                break;
            case 'a':
                this._fastSkipPrevious();
                break;
            case 's':
                this._focusNext();
                break;
            case 'd':
                this._fastSkipNext();
                break;
        }
    }

    ngOnInit() {
        const path = this._activatedRoute.snapshot.routeConfig.path;
        this._searchService.onSearchListActiveIndexChange.subscribe(index => {
            this._activeItemIndex = index;
        });

        // The active index should have been retrieved before the items are retrieved.
        // If the items somehow get retrieved before the index, then retrieve the items
        // syncronously after retrieving the index.
        if (path === 'products') {
            this._itemType = 'Product';
            this._searchService.getProducts(res => this._onItemsUpdated(res.items));
        } else if (path === 'bookmarks') {
            this._itemType = 'Bookmark';
            this._searchService.getBookmarks(res => this._onItemsUpdated(res));
        }
    }

    toggleHelpMode(): void {
        this.helpMode = !this._helpMode;
    }

    private _onItemsUpdated(items: (SearchResultItem | Bookmark)[]) {
        this._items = items;
        this._checkValidIndex();
        this._cd.detectChanges();
        setTimeout(() => this._scrollToActive());
    }

    private _checkValidIndex() {
        if (this._activeItemIndex < 0 || this._activeItemIndex >= this._items.length) {
            this._activeItemIndex = 0;
            this._searchService.updateSearchListActiveIndex(0);
        }
    }

    private _focusPrevious() {
        if (this._activeItemIndex <= 0) {
            return;
        }
        this._activeItemIndex--;
        this._searchService.updateSearchListActiveIndex(this._activeItemIndex);
        setTimeout(() => this._scrollToActive());
    }

    private _focusNext() {
        if (this._activeItemIndex >= this._items.length - 1) {
            return;
        }
        this._activeItemIndex++;
        this._searchService.updateSearchListActiveIndex(this._activeItemIndex);
        setTimeout(() => this._scrollToActive());
    }

    private _fastSkipPrevious() {
        this._activeItemIndex = MathUtils.clamp(this._activeItemIndex - this._fastSkipCount, 0);
        this._searchService.updateSearchListActiveIndex(this._activeItemIndex);
        setTimeout(() => this._scrollToActive(250));
    }

    private _fastSkipNext() {
        this._activeItemIndex = MathUtils.clamp(this._activeItemIndex + this._fastSkipCount, 0, this._items.length - 1);
        this._searchService.updateSearchListActiveIndex(this._activeItemIndex);
        setTimeout(() => this._scrollToActive(250));
    }

    private _scrollToActive(duration = 100) {
        const container = $('.main-contents');
        const target = $('.item.active');

        container.animate({
            scrollTop: target.offset().top - container.offset().top + container.scrollTop() - container.height() / 2
        }, duration);
    }

}
