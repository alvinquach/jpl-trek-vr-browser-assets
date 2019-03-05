import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchFacetInfo } from 'src/app/models/search/search-facet-info.model';
import { SearchItemType } from 'src/app/models/search/search-item-type.type';
import { SearchService } from 'src/app/services/search/base-search.service';
import { MainModalService } from '../../services/main-modal.service';
import { NavigatibleComponent } from '../base-navigatible.component';

@Component({
    selector: 'app-main-modal-search-root',
    templateUrl: './main-modal-search-root.component.html',
    styleUrls: ['./main-modal-search-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchRootComponent extends NavigatibleComponent implements OnInit {

    protected readonly _title = 'Search';

    private _facetInfo: SearchFacetInfo;
    get facetInfo() {
        return this._facetInfo;
    }

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                private _searchService: SearchService) {

        super(activatedRoute, cd, router, mainModalService);
    }

    ngOnInit() {
        super.ngOnInit();

        this._searchService.getFacetInfo(res => {
            this._facetInfo = res.facetInfo;
            console.log(this._facetInfo);
            this._cd.detectChanges();
        });
    }

    getCount(itemType: SearchItemType): number {
        return this._facetInfo.itemType.get(itemType);
    }

}
