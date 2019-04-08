import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';

export abstract class MainModalBaseSearchResultsComponent<T> extends MainModalBaseNavigableComponent implements OnDestroy {

    protected _items: T[];
    get items() {
        return this._items;
    }

    selectedItem: T;
    selectedItemImageUrl: string;
    selectedItemDescription: string;

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                protected _terrainModelService: TerrainModelService) {

        super(activatedRoute, cd, router, mainModalService);
    }

    ngOnDestroy() {
        super.ngOnDestroy();

        // Temporary way to unhighlight the area.
        this._terrainModelService.highlightBoundingBoxOnGlobe(null);
    }

    navigate() {
        if (!this.selectedItem) {
            return;
        }
        const bbox: string = this.selectedItem['boundingBox'];
        if (!bbox) {
            return;
        }
        this._terrainModelService.navigateToCoordinate(bbox);
        this._terrainModelService.highlightBoundingBoxOnGlobe(bbox);
    }

    abstract selectItem(item: T): void;

    abstract viewInController(): void;

}
