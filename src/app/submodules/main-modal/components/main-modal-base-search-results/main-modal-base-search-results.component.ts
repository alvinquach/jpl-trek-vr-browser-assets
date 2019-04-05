import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';

export abstract class MainModalBaseSearchResultsComponent<T> extends MainModalBaseNavigableComponent {

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
                mainModalService: MainModalService) {

        super(activatedRoute, cd, router, mainModalService);
    }

    navigate() {
        if (!this.selectedItem || !this.selectedItem['boundingBox']) {
            return;
        }
        const unityGlobalVariables = UnityGlobalVariables.instance;
        if (unityGlobalVariables.terrainFunctionsReady) {
            unityGlobalVariables.navigateToCoordinate(this.selectedItem['boundingBox']);
        } else {
            console.error(`Terrain functions are not available or ready.`);
        }
    }

    abstract selectItem(item: T): void;

    abstract viewInController(): void;

}
