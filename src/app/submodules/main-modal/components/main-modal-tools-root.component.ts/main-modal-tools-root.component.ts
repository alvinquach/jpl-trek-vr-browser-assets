import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { MainModalBaseNavigableComponent } from '../main-modal-navigatible/main-modal-base-navigable.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MainModalService } from '../../services/main-modal.service';
import { ControllerModalActivity } from 'src/app/models/controller-modal-activity.type';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';

@Component({
    selector: 'app-main-modal-tools-root',
    templateUrl: './main-modal-tools-root.component.html',
    styleUrls: ['./main-modal-tools-root.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalToolsRootComponent extends MainModalBaseNavigableComponent implements OnInit {

    protected readonly _title = 'Tools';

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

}