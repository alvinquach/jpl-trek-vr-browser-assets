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

    @Input()
    items: (SearchResultItem | Bookmark)[];

    private _selectedItem: SearchResultItem | Bookmark;
    get selectedItem() {
        return this._selectedItem;
    }
    @Input()
    set selectedItem(value) {
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

    private _scrollToSelected() {
        const container = $('.search-results-list');
        const target = $('.search-item.selected');

        container.scrollTop(target.offset().top - container.offset().top + container.scrollTop() - container.height() / 2);
    }

}
