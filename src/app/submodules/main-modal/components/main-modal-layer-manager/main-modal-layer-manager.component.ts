import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { NavigatibleComponent } from '../base-navigatible.component';

@Component({
    selector: 'app-main-modal-layer-manager',
    templateUrl: './main-modal-layer-manager.component.html',
    styleUrls: ['./main-modal-layer-manager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalLayerManagerComponent extends NavigatibleComponent {

    protected readonly _title = 'Layer Manager';

}
