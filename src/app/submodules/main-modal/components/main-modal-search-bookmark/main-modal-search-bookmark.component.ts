import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { SearchService } from 'src/app/services/search/base-search.service';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseSearchResultsComponent } from '../main-modal-base-search-results/main-modal-base-search-results.component';

@Component({
    selector: 'app-main-modal-search-bookmark',
    templateUrl: './main-modal-search-bookmark.component.html',
    styleUrls: ['./main-modal-search-bookmark.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchBookmarkComponent extends MainModalBaseSearchResultsComponent<Bookmark> implements OnInit {

    protected readonly _title = 'Bookmarks';

    protected get _isNavigable() {
        return false;
    }

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                terrainModelService: TerrainModelService,
                private _searchService: SearchService) {

        super(activatedRoute, cd, router, mainModalService, terrainModelService);
    }

    ngOnInit() {
        super.ngOnInit();

        this._searchService.getBookmarks(res => {
            this._items = res;
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

    selectLocalTerrain() {
        const jsonString = JSON.stringify(this.selectedItem);
        this._terrainModelService.createLocalTerrainFromBookmark(jsonString);
    }

}
