import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalComponent } from 'src/app/components/base-global.component';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';

@Component({
    selector: 'app-terrain-control-panel-home',
    templateUrl: './terrain-control-panel-home.component.html',
    styleUrls: ['./terrain-control-panel-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerrainControlPanelHomeComponent extends GlobalComponent {

    private readonly _unityGlobalVariables = UnityGlobalVariables.instance;

    constructor(protected _cd: ChangeDetectorRef) {
        super(TerrainControlPanelHomeComponent.name, _cd);
    }

    showGlobeModel() {
        if (!this._unityGlobalVariables.terrainFunctionsReady) {
            console.error('Unity terrain functions are not ready or not available.');
            return;
        }
        this._unityGlobalVariables.showGlobeModel();
    }

    hideControlPanel() {
        if (!this._unityGlobalVariables.terrainFunctionsReady) {
            console.error('Unity terrain functions are not ready or not available.');
            return;
        }
        this._unityGlobalVariables.hideControlPanel();
    }

}
