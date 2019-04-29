import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as $ from 'jquery';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { SearchService } from 'src/app/services/search/base-search.service';

@Component({
    selector: 'app-main-modal-search-result-list',
    templateUrl: './main-modal-search-result-list.component.html',
    styleUrls: ['./main-modal-search-result-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchResultListComponent {

    @Output()
    readonly selectedItemChange: EventEmitter<SearchResultItem | Bookmark> = new EventEmitter();

    private _items: (SearchResultItem | Bookmark)[];
    private _sortedItems: (SearchResultItem | Bookmark)[];
    get items() {
        return this._sortedItems;
    }
    @Input()
    set items(value) {
        this._items = value;
        this._sortItems();
    }

    private _sortKey: string;
    @Input()
    set sortKey(value) {
        this._sortKey = value;
        this._sortItems();
    }

    private _sortOrder: 'asc' | 'desc' = 'desc';
    @Input()
    set sortOrder(value) {
        this._sortOrder = value;
        this._sortItems();
    }

    private _selectedItem: SearchResultItem | Bookmark;
    get selectedItem() {
        return this._selectedItem;
    }
    @Input()
    set selectedItem(value) {
        if (this._selectedItem === value) {
            return;
        }
        this._selectedItem = value;
        setTimeout(() => {
            if (this._selectedItem) {
                this._scrollToSelected();
            }
        });
    }

    constructor(private _searchService: SearchService) {

    }

    selectItem(index: number) {
        this._selectedItem = this.items[index];
        this.selectedItemChange.emit(this.selectedItem);
        this._searchService.updateSearchListActiveIndex(index);
    }

    private _sortItems() {
        if (!this._items) {
            return;
        }
        const key = this._sortKey;
        if (!key) {
            this._sortedItems = [...this._items];
            return;
        }
        const order = this._sortOrder === 'asc' ? -1 : 1;
        this._sortedItems = [...this._items].sort((a, b) => {
            if (a[key] === b[key]) {
                return 0;
            } else if (a[key] < b[key]) {
                return order;
            } else {
                return -order;
            }
        });
    }

    private _scrollToSelected() {
        const container = $('.search-results-list');
        const target = $('.search-item.selected');
        if (!container || !target) {
            return;
        }
        container.scrollTop(target.offset().top - container.offset().top + container.scrollTop() - container.height() / 2);
    }

}
