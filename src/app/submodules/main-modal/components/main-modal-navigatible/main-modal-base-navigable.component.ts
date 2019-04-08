import { ChangeDetectorRef, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { MainModalService } from '../../services/main-modal.service';
import { MainModalNavigableIconComponent } from './main-modal-navigable-icon.component';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';

export abstract class MainModalBaseNavigableComponent implements OnInit, OnDestroy {

    protected abstract readonly _title;

    get componentName() {
        return this.constructor.name;
    }

    private _navigableIcons: MainModalNavigableIconComponent[];
    get navigableIcons() {
        return this._navigableIcons;
    }

    @ViewChildren(MainModalNavigableIconComponent)
    set navigableIconComponents(value: QueryList<MainModalNavigableIconComponent>) {
        this._navigableIcons = value.toArray();
        this._cd.detectChanges();
    }

    protected _routerSubscription: Subscription;
    get isLastChild() {
        return this._activatedRoute.snapshot.children.length === 0;
    }

    private _mode: IconMode = 'expanded';
    get mode() {
        return this._mode;
    }

    protected abstract get _isNavigable();

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
                    this._mode = 'expanded';
                }
                this._cd.detectChanges();
            }
        });
    }

    ngOnDestroy() {
        this._routerSubscription.unsubscribe();
    }

    navigate(route: string, iconIndex: number) {
        if (!this._isNavigable) {
            this._mode = 'hidden';
        } else {
            this._mode = 'compact';
            for (let i = 0, length = this._navigableIcons.length; i < length; i++) {
                const icon = this._navigableIcons[i];
                const dummyIcons = $(`.${this.componentName}.dummy-icon.${i}`);
                if (!dummyIcons.length) {
                    continue;
                }
                const boundingRect = dummyIcons[0].getBoundingClientRect();
                icon.startTransition(boundingRect.top, boundingRect.left);
                if (i === iconIndex) {
                    icon.active = true;
                }
            }
        }
        this._router.navigate([route], {relativeTo: this._activatedRoute});
    }

    onBackTriggerClick(event) {
        if (this.mode !== 'compact') {
            return;
        }
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });
        event.stopPropagation();
    }

    protected _navigateBackAction() {
        this._router.navigate(['../'], { relativeTo: this._activatedRoute });
    }

}

export type IconMode = 'expanded' | 'compact' | 'hidden';
