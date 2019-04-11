import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Coordinate } from 'src/app/models/terrain/coordinate.model';
import { GlobalComponent } from 'src/app/components/base-global.component';

@Component({
    selector: 'app-controller-modal-tools-distance',
    templateUrl: './controller-modal-tools-distance.component.html',
    styleUrls: ['./controller-modal-tools-distance.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalToolsDistanceComponent extends GlobalComponent {

    readonly points: Coordinate[] = [];

    readonly currentPoint: Coordinate = {
        x: 0,
        y: 0
    }

    private _helpMode = false;
    get helpMode() {
        return this._helpMode;
    }

    constructor(cd: ChangeDetectorRef) {
        super(ControllerModalToolsDistanceComponent.name, cd);
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

}
