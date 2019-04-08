import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Bookmark } from 'src/app/models/bookmark/bookmark.model';
import { SearchItemType } from 'src/app/models/search/search-item-type.type';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { TerrainType } from 'src/app/models/terrain/terrain-type.type';
import { HttpService } from 'src/app/services/http/base-http.service';
import { SearchService } from 'src/app/services/search/base-search.service';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-controller-modal-search-result-details',
    templateUrl: './controller-modal-search-result-details.component.html',
    styleUrls: ['./controller-modal-search-result-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalSearchResultDetailsComponent implements OnInit, OnDestroy {

    private readonly _scrollDistance = 100;

    private _terrainTypeChangeSubscription: Subscription;

    private _currentTerrainType: TerrainType;

    private _itemType: SearchItemType;
    get itemType() {
        return this._itemType;
    }

    private _item: SearchResultItem | Bookmark;
    get item() {
        return this._item;
    }

    private _imageUrl: string;
    get imageUrl() {
        return this._imageUrl;
    }

    private _description: string;
    get description() {
        return this._description;
    }

    private _focusedActionButtonIndex = 0;
    get focusedActionButtonIndex() {
        return this._focusedActionButtonIndex;
    }

    private _highlightedOnGlobe = false;

    readonly actionButtons: any[] = [
        {
            icon: 'keyboard_return',
            label: 'Go Back',
            clickedAction: () => this._navigateBackToList()
        },
        {
            icon: 'language',
            label: 'View on Globe',
            disableCondition: () => this._currentTerrainType !== 'globe',
            clickedAction: () => this._highlightOnGlobe()
        },
        {
            icon: 'terrain',
            label: 'View Model',
            displayCondition: () => this._itemType === 'Bookmark',
            clickedAction: () => this._selectLocalTerrain()
        }
    ];

    constructor(private _activatedRoute: ActivatedRoute,
                private _cd: ChangeDetectorRef,
                private _httpService: HttpService,
                private _router: Router,
                private _searchService: SearchService,
                private _terrainModelService: TerrainModelService) {

    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this._scroll(-this._scrollDistance);
                break;
            case 'a':
                this._focusPrevious();
                break;
            case 's':
                this._scroll(this._scrollDistance);
                break;
            case 'd':
                this._focusNext();
                break;
            case 't':
                const button = this.actionButtons[this._focusedActionButtonIndex];
                button && button.clickedAction();
                break;
            case 'm':
                this._navigateBackToList();
                break;
        }
    }

    ngOnInit() {
        const snapshot = this._activatedRoute.snapshot;
        const path = snapshot.routeConfig.path;
        const index = parseInt(snapshot.params['index']);
        if (isNaN(index)) {
            console.warn('Index is NaN!');
            return;
        }
        if (path.indexOf('products') >= 0) {
            this._itemType = 'Product';
            this._searchService.getProducts(res => this._onItemsLoaded(res.items, index));
        } else if (path.indexOf('bookmarks') >= 0) {
            this._itemType = 'Bookmark';
            this._searchService.getBookmarks(res => this._onItemsLoaded(res, index));
        }

        this._terrainTypeChangeSubscription = this._terrainModelService.onTerrainTypeChange.subscribe(type => {
            this._currentTerrainType = type;
            this._cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this._terrainTypeChangeSubscription && this._terrainTypeChangeSubscription.unsubscribe();
    }

    focusButton(index: number) {
        this._focusedActionButtonIndex = index;
    }

    private _onItemsLoaded(items: (SearchResultItem | Bookmark)[], index: number) {
        this._item = items[index];
        if (this._item) {

            // Get thumbnail URL
            const baseThumbnailUrl = this._item.thumbnailUrl;
            if (!baseThumbnailUrl || baseThumbnailUrl === 'n/a') {
                this._imageUrl = null;
            } else if (baseThumbnailUrl.endsWith('-')) {
                this._imageUrl = `${baseThumbnailUrl}200.png`;
            } else {
                this._imageUrl = baseThumbnailUrl;
            }

            // Get description
            if (this._item.description) {
                this._description = this._item.description;
            } else {
                this._description = null;
                if (this._itemType !== 'Bookmark') {
                    this._httpService.getText(
                        `https://trek.nasa.gov/mars/TrekWS/rest/cat/abstract?label=${(<SearchResultItem>this._item).productLabel}`,
                        res => {
                            this._description = <string>res;
                            this._cd.detectChanges();
                        }
                    );
                }
            }

        } else {
            this._imageUrl = null;
            this._description = null;
        }

        this._cd.detectChanges();
    }

    private _focusPrevious() {
        if (this._focusedActionButtonIndex <= 0) {
            return;
        }
        let newIndex = this._focusedActionButtonIndex - 1;
        while (true) {
            const button = this.actionButtons[newIndex];
            if (!this._isDisabledOrHidden(button)) {
                this._focusedActionButtonIndex = newIndex;
                break;
            }
            newIndex--;
            if (newIndex < 0) {
                break;
            }
        }
    }

    private _focusNext() {
        if (this._focusedActionButtonIndex >= this.actionButtons.length - 1) {
            return;
        }
        let newIndex = this._focusedActionButtonIndex + 1;
        while (true) {
            const button = this.actionButtons[newIndex];
            if (!this._isDisabledOrHidden(button)) {
                this._focusedActionButtonIndex = newIndex;
                break;
            }
            newIndex++;
            if (newIndex < 0) {
                break;
            }
        }
    }

    private _scroll(delta: number) {
        const container = $('.main-contents');
        if (!container) {
            return;
        }
        container.animate({
            scrollTop: container.scrollTop() + delta
        }, 100);
    }

    private _isDisabledOrHidden(button) {
        return (button.displayCondition && !button.displayCondition()) || (button.disableCondition && button.disableCondition());
    }

    private _navigateBackToList() {
        this._router.navigate(['../'], { relativeTo: this._activatedRoute });
    }

    private _highlightOnGlobe() {
        if (this._highlightedOnGlobe) {
            this._terrainModelService.highlightBoundingBoxOnGlobe();
            this._highlightedOnGlobe = false;
        } else {
            const bbox: string = this._item['boundingBox'];
            if (!bbox) {
                return;
            }
            this._terrainModelService.navigateToCoordinate(bbox);
            this._terrainModelService.highlightBoundingBoxOnGlobe(bbox);
            this._highlightedOnGlobe = true;
        }
    }

    private _selectLocalTerrain() {
        if (this._itemType !== 'Bookmark') {
            return;
        }
        const jsonString = JSON.stringify(this._item);
        this._terrainModelService.createLocalTerrainFromBookmark(jsonString);
    }

}
