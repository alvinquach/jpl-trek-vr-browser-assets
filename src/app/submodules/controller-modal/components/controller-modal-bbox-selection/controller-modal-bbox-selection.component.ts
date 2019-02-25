import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GlobalComponent } from 'src/app/components/base-global.component';
import { HelpEnabledComponent } from '../../models/help-enabled-component.interface';

@Component({
    selector: 'app-controller-modal-bbox-selection',
    templateUrl: './controller-modal-bbox-selection.component.html',
    styleUrls: ['./controller-modal-bbox-selection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalBoundingBoxSelectionComponent extends GlobalComponent implements HelpEnabledComponent {

    private _helpMode = false;
    get helpMode() {
        return this._helpMode;
    }
    set helpMode(value: boolean) {
        this._helpMode = value;
    }

    constructor(cd: ChangeDetectorRef) {
        super(ControllerModalBoundingBoxSelectionComponent.name, cd);
    }

    toggleHelpMode(): void {
        this.helpMode = !this._helpMode;
    }

}
