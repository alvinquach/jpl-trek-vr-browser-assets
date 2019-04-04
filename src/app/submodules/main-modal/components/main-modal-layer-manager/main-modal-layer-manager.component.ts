import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchResult } from 'src/app/models/search/search-result.model';
import { HttpService } from 'src/app/services/http/base-http.service';
import { SearchService } from 'src/app/services/search/base-search.service';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';

@Component({
    selector: 'app-main-modal-layer-manager',
    templateUrl: './main-modal-layer-manager.component.html',
    styleUrls: ['./main-modal-layer-manager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalLayerManagerComponent extends MainModalBaseNavigableComponent implements OnInit {

    protected readonly _title = 'Layer Manager';

    protected get _isNavigable() {
        return false;
    }

    private _rasters: SearchResult;
    get rasters() {
        return this._rasters;
    }

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService,
                private _httpService: HttpService,
                private _searchService: SearchService) {

        super(activatedRoute, cd, router, mainModalService);
    }

    ngOnInit() {
        super.ngOnInit();

        this._searchService.getRasters(res => {
            this._rasters = res;
            console.log(res);
            this._cd.detectChanges();
        });
    }

}
