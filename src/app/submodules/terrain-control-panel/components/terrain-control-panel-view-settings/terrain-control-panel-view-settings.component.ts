import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalComponent } from 'src/app/components/base-global.component';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { TerrainType } from 'src/app/models/terrain/terrain-type.type';
import { TerrainModelService } from 'src/app/services/terrain-model/terrain-model.service';
import { MathUtils } from 'src/app/utils/math.utils';

@Component({
    selector: 'app-terrain-control-panel-view-settings',
    templateUrl: './terrain-control-panel-view-settings.component.html',
    styleUrls: ['./terrain-control-panel-view-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerrainControlPanelViewSettingsComponent extends GlobalComponent implements OnInit {

    private readonly _unityGlobalVariables = UnityGlobalVariables.instance;

    // Note, these values are scaled by a factor of 10.
    readonly defaultTerrainExaggeration = 10;
    readonly minTerrainExaggeration = 0;
    readonly maxTerrainExaggeration = 100;
    readonly terrainExaggerationStep = 1;

    private _settingsRetrieved = false;
    get settingsRetrieved() {
        return this._settingsRetrieved;
    }

    private _editHeightScaleMode = false;
    get editHeightScaleMode() {
        return this._editHeightScaleMode;
    }
    set editHeightScaleMode(value) {
        this._editHeightScaleMode = value;
        this.cd.detectChanges();
    }

    private _terrainType: TerrainType = 'globe';
    get terrainType() {
        return this._terrainType;
    }

    // Note, this value is scaled by a factor of 10.
    private _heightExaggeration = this.defaultTerrainExaggeration;
    get heightExaggeration() {
        return this._heightExaggeration;
    }
    set heightExaggeration(value) {
        value = MathUtils.clamp(value, this.minTerrainExaggeration, this.maxTerrainExaggeration);
        if (value !== this._heightExaggeration) {
            this._terrainModelService.setHeightExaggeration(value / 10);
            this._heightExaggeration = value;
            this.cd.detectChanges();
        }
    }

    readonly booleanViewSettings: BooleanViewSetting[] = [
        {
            id: 'textures',
            name: 'Textures',
            onIcon: 'invert_colors',
            offIcon: 'invert_colors_off',
            status: true,
            enabled: true,
            terrainTypes: ['globe', 'local'],
            onValueChanged: val => {
                this._terrainModelService.setTexturesVisiblity(val);
            }
        },
        {
            id: 'coordinates',
            name: 'Coordinates',
            onIcon: 'grid_on',
            offIcon: 'grid_off',
            status: true,
            enabled: true,
            terrainTypes: ['globe'],
            onValueChanged: val => {
                this._terrainModelService.setCoordinateIndicatorsVisibility(val);
            }
        },
        {
            id: 'locationNames',
            name: 'Location Names',
            onIcon: 'location_on',
            offIcon: 'location_off',
            status: true,
            enabled: false,
            terrainTypes: ['globe'],
            onValueChanged: val => {
                this._terrainModelService.setLocationNamesVisibility(val);
            }
        },
    ];

    constructor(cd: ChangeDetectorRef,
                private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _terrainModelService: TerrainModelService) {

        super(TerrainControlPanelViewSettingsComponent.name, cd);
    }

    ngOnInit() {
        this._terrainModelService.getCurrentViewSettings(data => {
            this._onViewSettingsRetreived(data);
            this.cd.detectChanges();
        });
    }

    toggleSetting(setting: BooleanViewSetting) {
        if (!setting.enabled) {
            return;
        }
        setting.status = !setting.status;
        setting.onValueChanged && setting.onValueChanged(setting.status);
        this.cd.detectChanges();
    }

    onBackTriggerClick(event): void {
        if (this.editHeightScaleMode) {
            this.editHeightScaleMode = false;
        } else {
            this._router.navigate(['../'], { relativeTo: this._activatedRoute });
        }
    }

    /**
     * @deprecated
     */
    onSliderChange(event) {
        console.log(event);
    }

    hideControlPanel() {
        this._terrainModelService.hideControlPanel();
    }

    private _onViewSettingsRetreived(settings: {[key: string]: any}) {

        // Applied the retrieved settings.
        for (const key of Object.keys(settings)) {
            switch (key) {
                case 'terrainType':
                    this._terrainType = settings[key];
                    break;
                case 'heightExaggeration':
                    this._heightExaggeration = ~~(settings[key] * 10);
                    break;
                default:
                    for (const setting of this.booleanViewSettings) {
                        if (setting.id === key) {
                            setting.status = settings[key];
                            break;
                        }
                    }
            }
        }

        // Check which settings are avalible for the current terrain type.
        for (const setting of this.booleanViewSettings) {
            setting.enabled = setting.terrainTypes.indexOf(this._terrainType) !== -1;
        }

        this._settingsRetrieved = true;
    }

}

interface BooleanViewSetting {
    readonly id: 'textures' | 'coordinates' | 'locationNames';
    readonly onIcon: string;
    readonly offIcon: string;
    readonly name: string;
    status: boolean;
    enabled: boolean;
    readonly terrainTypes: TerrainType[];
    readonly onValueChanged?: (value: boolean) => void;
}
