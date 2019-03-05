import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { MainModalService } from '../../services/main-modal.service';
import { NavigatibleComponent } from '../base-navigatible.component';

@Component({
    selector: 'app-main-modal-home',
    templateUrl: './main-modal-home.component.html',
    styleUrls: ['./main-modal-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalHomeComponent extends NavigatibleComponent {

    protected readonly _title = 'Menu';

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService) {

        super(activatedRoute, cd, router, mainModalService);
    }

    startBoundingBoxSelection() {
        UnityGlobalVariables.instance.startSecondaryControllerActivity('BBoxSelection');
    }

    protected _navigateBackAction() {
        const unityGlobalVariables = UnityGlobalVariables.instance;
        if (unityGlobalVariables.terrainFunctionsReady) {
            unityGlobalVariables.setMainModalVisiblity(false);
        } else {
            console.error(`Terrain functions are not available or ready.`);
        }
    }

}
