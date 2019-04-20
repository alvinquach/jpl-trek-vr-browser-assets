import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ToolsService } from 'src/app/services/tools/base-tools.service';
import { ControllerModalToolsBasePointsComponent } from '../controller-modal-tools-base-points/controller-modal-tools-base-points.component';

@Component({
    selector: 'app-controller-modal-tools-distance',
    templateUrl: './controller-modal-tools-distance.component.html',
    styleUrls: [
        '../controller-modal-tools-base-points/controller-modal-tools-base-points.component.scss',
        './controller-modal-tools-distance.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalToolsDistanceComponent extends ControllerModalToolsBasePointsComponent {

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

    toggleHelpMode(): void {
        this._helpMode = !this._helpMode;
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

}
