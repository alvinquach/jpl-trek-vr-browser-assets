import { MdcIconModule } from '@angular-mdc/web';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerrainControlPanelHomeComponent } from './components/terrain-control-panel-home/terrain-control-panel-home.component';
import { TerrainControlPanelComponent } from './terrain-control-panel.component';
import { TerrainControlPanelViewSettingsComponent } from './components/terrain-control-panel-view-settings/terrain-control-panel-view-settings.component';

const ModuleRoutes: Routes = [
    {
        path: '',
        component: TerrainControlPanelComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: 'home',
                component: TerrainControlPanelHomeComponent,
                children: [
                    {
                        path: 'view-settings',
                        component: TerrainControlPanelViewSettingsComponent
                    }
                ]
            }
        ]
    }
];

const MdcWebModules = [
    MdcIconModule
];

@NgModule({
    declarations: [
        TerrainControlPanelComponent,
        TerrainControlPanelHomeComponent,
        TerrainControlPanelViewSettingsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ModuleRoutes),
        ...MdcWebModules
    ],
    exports: [
        RouterModule
    ],
    providers: [

    ]
})
export class TerrainControlPanelModule {

}