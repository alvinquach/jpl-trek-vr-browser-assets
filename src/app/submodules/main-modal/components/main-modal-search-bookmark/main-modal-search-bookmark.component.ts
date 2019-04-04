import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { SearchService } from 'src/app/services/search/base-search.service';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';

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

    private _bookmarks: Bookmark[];
    get bookmarks() {
        return this._bookmarks;
    }

    selectedItem: Bookmark;
    selectedItemImageUrl: string;
    selectedItemDescription: string;

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
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

    selectItem(item: Bookmark): void {
        this.selectedItem = item;
        if (!item.thumbnailUrl || item.thumbnailUrl === 'n/a') {
            this.selectedItemImageUrl = null;
        } else {
            this.selectedItemImageUrl = item.thumbnailUrl;
        }
        if (item.description) {
            this.selectedItemDescription = item.description;
        }
    }

    viewInController() {
        UnityGlobalVariables.instance.startSecondaryControllerActivity('BookmarkResults');
    }

}
