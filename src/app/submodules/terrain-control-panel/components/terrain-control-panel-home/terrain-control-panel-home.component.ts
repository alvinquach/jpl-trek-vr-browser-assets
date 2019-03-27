import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';

@Component({
    selector: 'app-terrain-control-panel-home',
    templateUrl: './terrain-control-panel-home.component.html',
    styleUrls: ['./terrain-control-panel-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerrainControlPanelHomeComponent implements OnInit, OnDestroy {

    private readonly _unityGlobalVariables = UnityGlobalVariables.instance;

    protected _routerSubscription: Subscription;
    get isLastChild() {
        return this._activatedRoute.snapshot.children.length === 0;
    }

    constructor(protected _activatedRoute: ActivatedRoute,
                protected _cd: ChangeDetectorRef,
                protected _router: Router) {

    }

    ngOnInit() {
        this._routerSubscription = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this._cd.detectChanges();
            }
        });
    }

    ngOnDestroy() {
        this._routerSubscription.unsubscribe();
    }

    showGlobeModel() {
        if (!this._unityGlobalVariables.terrainFunctionsReady) {
            console.error('Unity terrain functions are not ready or not available.');
            return;
        }
        this._unityGlobalVariables.showGlobeModel();
    }

    onBackTriggerClick(event): void {
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });
        event.stopPropagation();
    }

}
