import { ChangeDetectorRef, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TerrainType } from 'src/app/models/terrain/terrain-type.type';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';
import { SearchService } from 'src/app/services/search/base-search.service';

export abstract class MainModalBaseSearchResultsComponent<T> extends MainModalBaseNavigableComponent implements OnInit, OnDestroy {

    private _terrainTypeChangeSubscription: Subscription;
    private _searchListActiveIndexSubscription: Subscription;

    @Input()
    autoSelectItem = true;

    protected _terrainType: TerrainType = 'globe';
    get terrainType() {
        return this._terrainType;
    }

    protected _items: T[];
    get items() {
        return this._items;
    }

    protected _sortKey: string;
    get sortKey() {
        return this._sortKey;
    }
    set sortKey(value) {
        if (this._sortKey !== value) {
            this._sortKey = value;
            this._sortOrder = 'desc';
        } else {
            this._sortOrder = this._sortOrder === 'asc' ? 'desc' : 'asc';
        }
        this._cd.detectChanges();
    }

    protected _sortOrder: 'asc' | 'desc' = 'desc';
    get sortOrder() {
        return this._sortOrder;
    }

    highlightedItem: T;

    selectedItem: T;
    selectedItemImageUrl: string;
    selectedItemDescription: string;

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                protected _searchService: SearchService,
                protected _terrainModelService: TerrainModelService) {

        super(activatedRoute, cd, router, mainModalService);
    }

    ngOnInit() {
        super.ngOnInit();

        this._terrainTypeChangeSubscription = this._terrainModelService.onTerrainTypeChange.subscribe(type => {
            this._terrainType = type;
            this._onTerrainTypeChange(type);
            this._cd.detectChanges();
        });

        this._searchListActiveIndexSubscription = this._searchService.onSearchListActiveIndexChange.subscribe(index => {
            if (!this._items || !this._items.length) {
                return;
            }
            if (index == null) {
                this.selectItem(null);
            } else if (index < 0 || index >= this._items.length) {
                return;
            } else {
                this.selectItem(this._items[index]);
            }
            this._cd.detectChanges();
        });
    }

    ngOnDestroy() {
        super.ngOnDestroy();

        this._terrainTypeChangeSubscription && this._terrainTypeChangeSubscription.unsubscribe();
        this._searchListActiveIndexSubscription && this._searchListActiveIndexSubscription.unsubscribe();

        // Temporary way to unhighlight the area.
        this._terrainModelService.highlightBoundingBoxOnGlobe();

        // If we navigate away from search page, then clear the selected index.
        this._searchService.updateSearchListActiveIndex(null);
    }

    highlightOnGlobe() {
        if (!this.selectedItem) {
            return;
        }

        // If the selected item is already highlighted, then just unhighlight it.
        if (this.selectedItem === this.highlightedItem) {

            // Temporary way to unhighlight the area.
            this._terrainModelService.highlightBoundingBoxOnGlobe();

            this.highlightedItem = null;
            return;
        }

        const bbox: string = this.selectedItem['boundingBox'];
        if (!bbox) {
            return;
        }
        this._terrainModelService.navigateToCoordinate(bbox);
        this._terrainModelService.highlightBoundingBoxOnGlobe(bbox);
        this.highlightedItem = this.selectedItem;
    }

    /** Additional actions to performed when terrain type is updated. */
    protected _onTerrainTypeChange(type: TerrainType) {
        this.highlightedItem = null;
    }

    resetSelectedItem() {
        this.selectedItem = null;
        this.selectedItemDescription = null;
        this.selectedItemImageUrl = null;
    }

    abstract selectItem(item: T): void;

    abstract viewInController(): void;

}
