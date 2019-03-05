import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef, OnDestroy, OnInit, HostListener } from '@angular/core';
import { MainModalService } from '../services/main-modal.service';

export abstract class NavigatibleComponent implements OnInit, OnDestroy {

    protected abstract readonly _title;

    protected _routerSubscription: Subscription;
    get isLastChild() {
        return this._activatedRoute.snapshot.children.length === 0;
    }

    constructor(protected _activatedRoute: ActivatedRoute,
                protected _cd: ChangeDetectorRef,
                protected _router: Router,
                protected _mainModalService: MainModalService) {

    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (this.isLastChild && event.key === 'm') {
            this._navigateBackAction();
        }
    }

    ngOnInit() {
        this._mainModalService.setHeaderText(this._title);
        this._routerSubscription = this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.isLastChild) {
                    this._mainModalService.setHeaderText(this._title);
                }
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

    protected _navigateBackAction() {
        this._router.navigate(['../'], { relativeTo: this._activatedRoute });
    }

}
