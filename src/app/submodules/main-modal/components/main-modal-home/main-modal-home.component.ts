import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';

@Component({
    selector: 'app-main-modal-home',
    templateUrl: './main-modal-home.component.html',
    styleUrls: ['./main-modal-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalHomeComponent {

    startBoundingBoxSelection() {
        UnityGlobalVariables.instance.startPrimaryControllerActivity('BBoxSelection');
    }

}
