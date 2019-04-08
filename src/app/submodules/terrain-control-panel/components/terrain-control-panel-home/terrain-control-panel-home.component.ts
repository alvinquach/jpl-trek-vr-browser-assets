import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { GlobalComponent } from 'src/app/components/base-global.component';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';

@Component({
    selector: 'app-terrain-control-panel-home',
    templateUrl: './terrain-control-panel-home.component.html',
    styleUrls: ['./terrain-control-panel-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerrainControlPanelHomeComponent extends GlobalComponent {

    constructor(cd: ChangeDetectorRef,
                private _terrainModelService: TerrainModelService) {

        super(TerrainControlPanelHomeComponent.name, cd);
    }

    showGlobeModel() {
        this._terrainModelService.showGlobeModel();
    }

    hideControlPanel() {
        this._terrainModelService.hideControlPanel();
    }

}
