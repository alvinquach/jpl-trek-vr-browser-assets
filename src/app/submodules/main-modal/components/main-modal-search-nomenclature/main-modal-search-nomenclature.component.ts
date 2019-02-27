import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigatibleComponent } from '../base-navigatible.component';

@Component({
    selector: 'app-main-modal-search-nomenclature',
    templateUrl: './main-modal-search-nomenclature.component.html',
    styleUrls: ['./main-modal-search-nomenclature.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchNomenclatureComponent extends NavigatibleComponent {

    protected readonly _title = 'Nomenclatures';

}
