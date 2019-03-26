import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-terrain-control-panel-home',
    templateUrl: './terrain-control-panel-home.component.html',
    styleUrls: ['./terrain-control-panel-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerrainControlPanelHomeComponent implements OnInit, OnDestroy {

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

    onBackTriggerClick(event): void {
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });
        event.stopPropagation();
    }

}
