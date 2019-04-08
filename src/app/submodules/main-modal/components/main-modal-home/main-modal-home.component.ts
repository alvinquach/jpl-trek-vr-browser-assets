import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControllerModalActivity } from 'src/app/models/controller-modal-activity.type';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';

@Component({
    selector: 'app-main-modal-home',
    templateUrl: './main-modal-home.component.html',
    styleUrls: ['./main-modal-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalHomeComponent extends MainModalBaseNavigableComponent {

    protected readonly _title = 'Menu';

    protected get _isNavigable() {
        return true;
    }

    constructor(activatedRoute: ActivatedRoute,
                cd: ChangeDetectorRef,
                router: Router,
                mainModalService: MainModalService) {

        super(activatedRoute, cd, router, mainModalService);
    }

    startActivity(activity: ControllerModalActivity) {
        const unityGlobalVariables = UnityGlobalVariables.instance;
        if (unityGlobalVariables.userInterfaceFunctionsReady) {
            UnityGlobalVariables.instance.startSecondaryControllerActivity(activity);
        } else {
            console.error(`User interface functions are not available or ready.`);
        }
    }

    protected _navigateBackAction() {
        const unityGlobalVariables = UnityGlobalVariables.instance;
        if (unityGlobalVariables.userInterfaceFunctionsReady) {
            unityGlobalVariables.setMainModalVisiblity(false);
        } else {
            console.error(`User interface functions are not available or ready.`);
        }
    }

}
