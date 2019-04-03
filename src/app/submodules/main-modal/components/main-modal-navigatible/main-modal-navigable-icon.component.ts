import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, HostBinding, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import { IconMode } from './main-modal-base-navigable.component';

@Component({
    selector: 'app-main-modal-navigable-icon',
    templateUrl: './main-modal-navigable-icon.component.html',
    styleUrls: ['./main-modal-navigable-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalNavigableIconComponent {

    @ViewChild('icon')
    private _iconElement: ElementRef;

    @Output()
    readonly iconClicked: EventEmitter<any> = new EventEmitter();

    @Input()
    materialIcon: string;

    @Input()
    title: string;

    @Input()
    subtitle: string;

    @Input()
    active: boolean;

    private _mode: IconMode = 'expanded';
    get mode() {
        return this._mode;
    }
    @Input()
    set mode(value) {
        if (this._mode === 'compact' && value === 'expanded') {
            this._resetPosition();
            this.active = false;
        }
        this._mode = value;
    }

    private _expanding = null;
    get expanding() {
        return this._expanding;
    }

    private _originalTop: number;

    private _originalLeft: number;

    constructor(private _cd: ChangeDetectorRef) {

    }

    onClick(event) {
        if (this._mode !== 'expanded') {
            return;
        }
        this.iconClicked.emit(event);
    }

    startTransition(targetTop: number, targetLeft: number) {
        const el: any = $(this._iconElement.nativeElement);
        this._originalLeft = el[0].offsetLeft;
        this._originalTop = el[0].offsetTop;
        el.css('position', 'absolute');
        el.css('top', this._originalTop);
        el.css('left', this._originalLeft);
        setTimeout(() => {
            el.css('top', targetTop);
            el.css('left', targetLeft);
        });
    }

    /** This should be called when mode transitions from 'compact' to 'expanded'. */
    private _resetPosition() {
        const el: any = $(this._iconElement.nativeElement);
        el.css('top', this._originalTop);
        el.css('left', this._originalLeft);
        this._expanding = true;

        // NOTE: Timeout delay should match variable $icon-transform-transition-duration in scss file.
        setTimeout(() => {
            el.css('position', '');
            el.css('top', '');
            el.css('left', '');
            this._expanding = false;
            this._cd.detectChanges();
        }, 500);
    }

}
