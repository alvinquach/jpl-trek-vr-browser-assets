import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { GlobalComponent } from 'src/app/components/base-global.component';
import { Coordinate } from 'src/app/models/terrain/coordinate.model';
import { ToolsService } from 'src/app/services/tools/base-tools.service';

@Component({
    selector: 'app-controller-modal-tools-distance',
    templateUrl: './controller-modal-tools-distance.component.html',
    styleUrls: ['./controller-modal-tools-distance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalToolsDistanceComponent extends GlobalComponent {

    private readonly _scrollDistance = 100;

    readonly points: Coordinate[] = [];

    readonly currentPoint: Coordinate = {
        x: 0,
        y: 0
    };

    private _helpMode = false;
    get helpMode() {
        return this._helpMode;
    }

    private _results;
    get results() {
        return this._results;
    }

    constructor(cd: ChangeDetectorRef,
                private _toolsService: ToolsService) {
        super(ControllerModalToolsDistanceComponent.name, cd);
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

    toggleHelpMode(): void {
        this._helpMode = !this._helpMode;
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

    showResults(show: boolean) {
        if (!show) {
            this._results = null;
            this.cd.detectChanges();
        } else {
            this._toolsService.getDistance(this.points, res => {
                this._results = res;
                this.cd.detectChanges();
            });
        }
    }

    private _scroll(delta: number) {
        const container = $('.points-container');
        if (!container) {
            return;
        }
        container.animate({
            scrollTop: container.scrollTop() + delta
        }, 100);
    }

    private _scrollToBottom() {
        const container = $('.points-container');
        if (!container) {
            return;
        }
        container.animate({
            scrollTop: container[0].scrollHeight
        }, 500);
    }

}
