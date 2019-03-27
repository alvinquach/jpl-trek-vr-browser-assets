import { ChangeDetectionStrategy, Component, OnInit, Optional, ChangeDetectorRef } from '@angular/core';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';
import { TerrainType } from 'src/app/models/terrain/terrain-type.type';
import { UnityDataService } from 'src/app/services/unity-data/unity-data.service';

@Component({
    selector: 'app-terrain-control-panel-view-settings',
    templateUrl: './terrain-control-panel-view-settings.component.html',
    styleUrls: ['./terrain-control-panel-view-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerrainControlPanelViewSettingsComponent implements OnInit {

    private readonly _unityGlobalVariables = UnityGlobalVariables.instance;

    private _settingsRetrieved = false;
    get settingsRetrieved() {
        return this._settingsRetrieved;
    }

    private _terrainType: TerrainType = 'globe';
    get terrainType() {
        return this._terrainType;
    }

    private _heightExaggeration = 1;
    get heightExaggeration() {
        return this._heightExaggeration;
    }

    readonly booleanViewSettings: BooleanViewSetting[] = [
        {
            id: 'textures',
            name: 'Textures',
            onIcon: 'invert_colors',
            offIcon: 'invert_colors_off',
            status: true,
            enabled: true,
            terrainTypes: ['globe', 'section'],
            onValueChanged: val => {
                this._executeUnityTerrainFunction(this._unityGlobalVariables.setTexturesVisiblity, val);
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
                this._executeUnityTerrainFunction(this._unityGlobalVariables.setCoordinateIndicatorsVisibility, val);
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
                this._executeUnityTerrainFunction(this._unityGlobalVariables.setLocationNamesVisibility, val);
            }
        },
    ];

    constructor(private _cd: ChangeDetectorRef,
                @Optional() private _unityDataService: UnityDataService) {

    }

    ngOnInit() {
        if (this._unityDataService && this._unityGlobalVariables.terrainFunctionsReady) {
            const request = this._unityDataService.registerRequest<{[key: string]: any}>(data => {
                this._onViewSettingsRetreived(data);
                this._cd.detectChanges();
            });
            this._unityGlobalVariables.getCurrentViewSettings(request.requestId);
        } else {
            console.error(`Error retrieving view settings. Displaying mock data.`);
            this._settingsRetrieved = true;
        }
    }

    toggleSetting(setting: BooleanViewSetting) {
        if (!setting.enabled) {
            return;
        }
        setting.status = !setting.status;
        setting.onValueChanged && setting.onValueChanged(setting.status);
        this._cd.detectChanges();
    }

    temp() {
        this._executeUnityTerrainFunction(this._unityGlobalVariables.setHeightExaggeration, 1.0);
    }

    private _executeUnityTerrainFunction<T>(fn: (value: T) => void, val: T) {
        if (!this._unityGlobalVariables.terrainFunctionsReady) {
            console.error('Unity terrain functions are not ready or not available.');
            return;
        }
        fn(val);
    }

    private _onViewSettingsRetreived(settings: {[key: string]: any}) {

        // Applied the retrieved settings.
        for (const key of Object.keys(settings)) {
            switch (key) {
                case 'terrainType':
                    this._terrainType = settings[key];
                    break;
                case 'heightExaggeration':
                    this._heightExaggeration = settings[key];
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