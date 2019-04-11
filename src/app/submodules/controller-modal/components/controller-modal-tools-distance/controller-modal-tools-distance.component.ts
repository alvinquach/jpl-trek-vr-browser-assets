import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-controller-modal-tools-distance',
    templateUrl: './controller-modal-tools-distance.component.html',
    styleUrls: ['./controller-modal-tools-distance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalToolsDistanceComponent {

    private _helpMode = false;
    get helpMode() {
        return this._helpMode;
    }

    toggleHelpMode(): void {
        this._helpMode = !this._helpMode;
    }

}
