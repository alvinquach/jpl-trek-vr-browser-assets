import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { GlobalComponent } from 'src/app/components/base-global.component';
import { BoundingBox } from 'src/app/models/bounding-box.model';

@Component({
    selector: 'app-controller-modal-bbox-selection',
    templateUrl: './controller-modal-bbox-selection.component.html',
    styleUrls: ['./controller-modal-bbox-selection.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalBoundingBoxSelectionComponent extends GlobalComponent {

    private readonly _boundingBox: BoundingBox = {
        lonStart: NaN,
        latStart: NaN,
        lonEnd: NaN,
        latEnd: NaN
    };
    get boundingBox() {
        return this._boundingBox;
    }

    private _activeIndex: number;
    get activeIndex() {
        return this._activeIndex;
    }

    private _helpMode = false;
    get helpMode() {
        return this._helpMode;
    }
    set helpMode(value: boolean) {
        this._helpMode = value;
    }

    constructor(cd: ChangeDetectorRef) {
        super(ControllerModalBoundingBoxSelectionComponent.name, cd);
    }

    toggleHelpMode(): void {
        this.helpMode = !this._helpMode;
    }

    updateBoundingBox(lonStart: number, latStart: number, lonEnd: number, latEnd: number, activeIndex: number) {
        this._boundingBox.lonStart = lonStart;
        this._boundingBox.latStart = latStart;
        this._boundingBox.lonEnd = lonEnd;
        this._boundingBox.latEnd = latEnd;
        this._activeIndex = activeIndex;
        this.changeDetector.detectChanges();
    }

    formatCoordinate(coordinate: number): string {
        if (isNaN(coordinate)) {
            return '—';
        }
        return `${coordinate}°`;
    }

}
