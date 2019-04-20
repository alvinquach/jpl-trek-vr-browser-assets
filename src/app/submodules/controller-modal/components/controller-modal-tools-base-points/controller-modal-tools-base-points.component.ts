import { ChangeDetectorRef, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { GlobalComponent } from 'src/app/components/base-global.component';
import { Coordinate } from 'src/app/models/terrain/coordinate.model';

export abstract class ControllerModalToolsBasePointsComponent extends GlobalComponent {

    protected readonly _scrollDistance = 100;

    readonly points: Coordinate[] = [];

    readonly currentPoint: Coordinate = {
        x: 0,
        y: 0
    };

    constructor(componentName: string, cd: ChangeDetectorRef) {

        super(componentName, cd);
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this._scroll(-this._scrollDistance);
                break;
            case 's':
                this._scroll(this._scrollDistance);
                break;
        }
    }

    addPoint(lat: number, lon: number) {
        this.points.push({
            x: lat,
            y: lon
        });
        this.cd.detectChanges();
        setTimeout(() => this._scrollToBottom());
    }

    updateCurrentPoint(lat: number, lon: number) {
        this.currentPoint.x = lat;
        this.currentPoint.y = lon;
        this.cd.detectChanges();
    }

    removeLastPoint() {
        this.points.pop();
        this.cd.detectChanges();
    }

    clearPoints() {
        this.points.splice(0); // Always have at least one point.
        this.currentPoint.x = 0;
        this.currentPoint.y = 0;
        this.cd.detectChanges();
    }

    abstract showResults(show: boolean);

    protected _scroll(delta: number) {
        const container = $('.points-container');
        if (!container) {
            return;
        }
        container.animate({
            scrollTop: container.scrollTop() + delta
        }, 100);
    }

    protected _scrollToBottom() {
        const container = $('.points-container');
        if (!container) {
            return;
        }
        container.animate({
            scrollTop: container[0].scrollHeight
        }, 500);
    }

}
