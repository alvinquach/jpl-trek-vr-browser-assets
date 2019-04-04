import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchResult } from 'src/app/models/search/search-result.model';
import { SearchService } from 'src/app/services/search/base-search.service';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { HttpService } from 'src/app/services/http/base-http.service';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';

@Component({
    selector: 'app-main-modal-search-bookmark',
    templateUrl: './main-modal-search-bookmark.component.html',
    styleUrls: ['./main-modal-search-bookmark.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchBookmarkComponent extends MainModalBaseNavigableComponent implements OnInit {

    protected readonly _title = 'Bookmarks';

    protected get _isNavigable() {
        return false;
    }

    private _bookmarks: SearchResult;
    get bookmarks() {
        return this._bookmarks;
    }

    selectedItem: SearchResultItem;
    selectedItemImageUrl: string;
    selectedItemDescription: string;

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                private _httpService: HttpService,
                private _searchService: SearchService) {

        super(activatedRoute, cd, router, mainModalService);
    }

    ngOnInit() {
        super.ngOnInit();

        this._searchService.getBookmarks(res => {
            this._bookmarks = res;
            this._cd.detectChanges();
        });
    }

    selectItem(item: SearchResultItem): void {
        this.selectedItem = item;
        if (!item.thumbnailUrl || item.thumbnailUrl === 'n/a') {
            this.selectedItemImageUrl = null;
        } else {
            this.selectedItemImageUrl = `${item.thumbnailUrl}200.png`;
        }
        if (item.description) {
            this.selectedItemDescription = item.description;
        } else {
            this.selectedItemDescription = null;
            this._httpService.getText(
                `https://trek.nasa.gov/mars/TrekWS/rest/cat/abstract?label=${item.productLabel}`,
                res => {
                    this.selectedItemDescription = <string>res;
                    this._cd.detectChanges();
                }
            );
        }
    }

    viewInController() {
        UnityGlobalVariables.instance.startSecondaryControllerActivity('BookmarkResults');
    }

}
