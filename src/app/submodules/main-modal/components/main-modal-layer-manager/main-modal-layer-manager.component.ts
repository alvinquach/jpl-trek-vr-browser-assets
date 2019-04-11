import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { TerrainModelLayer } from 'src/app/models/terrain/layer/terrain-model-layer.model';
import { HttpService } from 'src/app/services/http/base-http.service';
import { LayerService } from 'src/app/services/layer/layer.service';
import { SearchService } from 'src/app/services/search/base-search.service';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';
import { ProductUtils } from 'src/app/utils/product.utils';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseSearchResultsComponent } from '../main-modal-base-search-results/main-modal-base-search-results.component';

@Component({
    selector: 'app-main-modal-layer-manager',
    templateUrl: './main-modal-layer-manager.component.html',
    styleUrls: [
        './main-modal-layer-manager.component.scss',
        '../main-modal-base-search-results/main-modal-base-search-results.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalLayerManagerComponent extends MainModalBaseSearchResultsComponent<SearchResultItem> implements OnInit, AfterViewInit, OnDestroy {

    protected readonly _title = 'Layer Manager';

    readonly maxLayerCount = 15;

    protected get _isNavigable() {
        return false;
    }

    private _layersUpdateSubscription: Subscription;

    // Prevent too many updates from being sent in a short time.
    private readonly _updateTimeoutDuration = 100;

    private _updateTimedout = false;

    // Sliders are wonky if they are moved after they are initialized.
    // We have to wait for the page animation to end before displaying.
    private _slidersReady = false;
    get slidersReady() {
        return this._slidersReady;
    }

    private _searchMode = false;
    get searchMode() {
        return this._searchMode;
    }
    set searchMode(value) {
        this._searchMode = value;
        if (value) {
            this._slidersReady = false;
        } else {
            this.resetSelectedItem();

            // Hacky fix for positioning issues with sliders.
            setTimeout(() => {
                this._slidersReady = true;
                this._cd.detectChanges();
            }, 50);
        }
    }

    private _layers: TerrainModelLayer[] = [];
    get layers() {
        return this._layers;
    }

    private _draggedIndex: number;
    get draggedIndex() {
        return this._draggedIndex;
    }

    private _draggedOverIndex: number;
    get draggedOverIndex() {
        return this._draggedOverIndex;
    }

    private _selectedItemAlreadyAdded: boolean;
    get selectedItemAlreadyAdded() {
        return this._selectedItemAlreadyAdded;
    }

    private _selectedItemIsDem: boolean;
    get selectedItemIsDem() {
        return this._selectedItemIsDem;
    }

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                searchService: SearchService,
                terrainModelService: TerrainModelService,
                private _httpService: HttpService,
                private _layerService: LayerService) {

        super(activatedRoute, cd, router, mainModalService, searchService, terrainModelService);
    }

    ngOnInit() {
        super.ngOnInit();

        this._searchService.getRasters(res => {
            this._items = res.items;
            console.log(res);
            this._cd.detectChanges();
        });

        this._layerService.getCurrentLayers(res => {
            this._layers = this._layerService.processData(res);
            this._cd.detectChanges();
        });

        this._layersUpdateSubscription = this._layerService.onLayersUpdated.subscribe(res => {
            if (!res) {
                return;
            }
            this._layers = this._layerService.processData(res);
            this._cd.detectChanges();
        });
    }

    ngAfterViewInit() {
        // NOTE: Timeout delay should match variable $icon-transform-transition-duration in scss file.
        setTimeout(() => {
            this._slidersReady = true;
            this._cd.detectChanges();
        }, 550);
    }

    ngOnDestroy() {
        this._layersUpdateSubscription && this._layersUpdateSubscription.unsubscribe();
    }

    toggleSearchMode() {
        this.searchMode = !this._searchMode;
    }

    //#region Layers template functions

    onDragStart(index: number) {
        this._draggedIndex = index;
        console.log("DRAG START", index);
        this._cd.detectChanges();
    }

    onDrag(event) {
        // Dragging doesn't work in ZFBrowser...
        console.log(event);
    }

    onDragEnter(index: number) {
        this._draggedOverIndex = index;
        this._cd.detectChanges();
    }

    onDragLeave() {
        setTimeout(() => {
            this._draggedOverIndex = null;
            this._cd.detectChanges();
        });
    }

    onDragEnd() {
        console.log("DRAG END");
        if (this._draggedOverIndex != null) {
            if (this._draggedOverIndex < this._draggedIndex) {
                this._draggedOverIndex += 1;
            }
            if (this._draggedIndex !== this._draggedOverIndex) {
                console.log("Moved from", this._draggedIndex, "to", this._draggedOverIndex);
                const from = this._getActualIndex(this._draggedIndex);
                const to = this._getActualIndex(this._draggedOverIndex);
                this._layerService.moveLayer(from, to);
            }
        }
        this._draggedIndex = null;
        this._draggedOverIndex = null;
        this._cd.detectChanges();
    }

    onSliderChange(index: number) {
        this._cd.detectChanges();
        if (this._updateTimedout) {
            return;
        }
        const layer = this._layers[index];
        this._layerService.updateLayer({
            index: this._getActualIndex(index),
            opacity: layer.opacity / 100
        });
        this._updateTimedout = true;
        setTimeout(() => this._updateTimedout = false, this._updateTimeoutDuration);
    }

    toggleVisiblity(index: number) {
        if (this._updateTimedout) {
            return;
        }
        const layer = this._layers[index];
        layer.visible = !layer.visible;
        this._layerService.updateLayer({
            index: this._getActualIndex(index),
            visible: layer.visible
        });
        this._cd.detectChanges();
        this._updateTimedout = true;
        setTimeout(() => this._updateTimedout = false, this._updateTimeoutDuration);
    }

    deleteLayer(index: number) {
        this._layerService.removeLayer(this._getActualIndex(index));
        this._layers.splice(index, 1);
    }

    //#endregion

    //#region Search layers functions

    selectItem(item: SearchResultItem): void {
        this.selectedItem = item;
        if (!item) {
            return;
        }

        this.selectedItemImageUrl = ProductUtils.parseThumbnailUrl(item.thumbnailUrl);

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

        this._selectedItemAlreadyAdded = this._layers.findIndex(l => l.productUUID === item.uuid) >= 0;
        this._selectedItemIsDem = item.productType === 'DEM';
    }

    addSelectedItem() {
        if (this.selectedItem) {
            this._layerService.addLayer(this.selectedItem.uuid);
        }
        this.searchMode = false;
    }

    viewInController() {
        UnityGlobalVariables.instance.startSecondaryControllerActivity('LayerManager');
    }

    //#endregion

    protected _navigateBackAction() {
        if (this._searchMode) {
            this.searchMode = false;
        } else {
            super._navigateBackAction();
        }
    }

    private _getActualIndex(index: number) {
        // Assumes index is within bounds.
        return this._layers.length - index - 1;
    }

}
