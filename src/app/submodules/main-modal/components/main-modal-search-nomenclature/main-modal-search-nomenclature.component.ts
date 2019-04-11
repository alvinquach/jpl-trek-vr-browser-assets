import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { SearchService } from 'src/app/services/search/base-search.service';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseSearchResultsComponent } from '../main-modal-base-search-results/main-modal-base-search-results.component';

@Component({
    selector: 'app-main-modal-search-nomenclature',
    templateUrl: './main-modal-search-nomenclature.component.html',
    styleUrls: ['../main-modal-base-search-results/main-modal-base-search-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchNomenclatureComponent extends MainModalBaseSearchResultsComponent<SearchResultItem> implements OnInit {

    protected readonly _title = 'Nomenclatures';

    protected get _isNavigable() {
        return false;
    }

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                searchService: SearchService,
                terrainModelService: TerrainModelService) {

        super(activatedRoute, cd, router, mainModalService, searchService, terrainModelService);
    }

    ngOnInit() {
        super.ngOnInit();

        this._searchService.getNomenclatures(res => {
            this._items = res.items;
            this._cd.detectChanges();
        });
    }

    selectItem(item: SearchResultItem): void {
        this.selectedItem = item;
    }

    viewInController() {
        const unityGlobalVariables = UnityGlobalVariables.instance;
        if (unityGlobalVariables.userInterfaceFunctionsReady) {
            unityGlobalVariables.startSecondaryControllerActivity('NomenclatureResults');
        } else {
            console.error(`User interface functions are not available or ready.`);
        }
    }

}
