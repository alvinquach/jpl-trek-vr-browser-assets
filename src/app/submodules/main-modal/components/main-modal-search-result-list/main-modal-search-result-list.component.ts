import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Component, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';

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

    @Input()
    selectedItem: SearchResultItem | Bookmark;

    selectItem(item: SearchResultItem | Bookmark) {
        this.selectedItem = item;
        this.selectedItemChange.emit(item);
    }

}