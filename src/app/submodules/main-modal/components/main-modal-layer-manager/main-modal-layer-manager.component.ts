import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';

@Component({
    selector: 'app-main-modal-layer-manager',
    templateUrl: './main-modal-layer-manager.component.html',
    styleUrls: ['./main-modal-layer-manager.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalLayerManagerComponent extends MainModalBaseNavigableComponent {

    protected readonly _title = 'Layer Manager';

    protected get _isNavigable() {
        return false;
    }
    
}
