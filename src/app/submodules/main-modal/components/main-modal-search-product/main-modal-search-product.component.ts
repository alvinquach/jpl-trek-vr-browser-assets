import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { SearchResultItem } from 'src/app/models/search/search-result-item.model';
import { HttpService } from 'src/app/services/http/base-http.service';
import { SearchService } from 'src/app/services/search/base-search.service';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseSearchResultsComponent } from '../main-modal-base-search-results/main-modal-base-search-results.component';

@Component({
    selector: 'app-main-modal-search-product',
    templateUrl: './main-modal-search-product.component.html',
    styleUrls: ['./main-modal-search-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchProductComponent extends MainModalBaseSearchResultsComponent<SearchResultItem> implements OnInit {

    protected readonly _title = 'Products';

    protected get _isNavigable() {
        return false;
    }

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                terrainModelService: TerrainModelService,
                private _httpService: HttpService,
                private _searchService: SearchService) {

        super(activatedRoute, cd, router, mainModalService, terrainModelService);
    }

    ngOnInit() {
        super.ngOnInit();

        this._searchService.getProducts(res => {
            this._items = res.items;
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
        UnityGlobalVariables.instance.startSecondaryControllerActivity('ProductResults');
    }

}
