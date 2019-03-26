import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-terrain-control-panel-view-settings',
    templateUrl: './terrain-control-panel-view-settings.component.html',
    styleUrls: ['./terrain-control-panel-view-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerrainControlPanelViewSettingsComponent {

    readonly viewSettings: ViewSetting[] = [
        {
            id: 'textures',
            name: 'Textures',
            onIcon: 'invert_colors',
            offIcon: 'invert_colors_off',
            status: true,
            enabled: true
        },
        {
            id: 'grid',
            name: 'Coordinates',
            onIcon: 'grid_on',
            offIcon: 'grid_off',
            status: true,
            enabled: true
        },
        {
            id: 'nomenclatures',
            name: 'Location Names',
            onIcon: 'location_on',
            offIcon: 'location_off',
            status: true,
            enabled: false
        },
    ];


    toggleSetting(setting: ViewSetting): void {
        if (!setting.enabled) {
            return;
        }
        setting.status = !setting.status;
    }

}

interface ViewSetting {
    id: 'textures' | 'grid' | 'nomenclatures';
    onIcon: string;
    offIcon: string;
    name: string;
    status: boolean;
    enabled: boolean;
}