import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';

@Component({
    selector: 'app-main-modal-search-nomenclature',
    templateUrl: './main-modal-search-nomenclature.component.html',
    styleUrls: ['../main-modal-base-search-results/main-modal-base-search-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchNomenclatureComponent extends MainModalBaseNavigableComponent {

    protected readonly _title = 'Nomenclatures';

    protected get _isNavigable() {
        return false;
    }

}
