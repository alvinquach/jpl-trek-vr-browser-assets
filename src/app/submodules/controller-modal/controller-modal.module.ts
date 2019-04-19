import { MdcIconModule, MdcSliderModule } from '@angular-mdc/web';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularToolsService } from 'src/app/services/tools/angular-tools.service';
import { ToolsService } from 'src/app/services/tools/base-tools.service';
import { UnityToolsService } from 'src/app/services/tools/unity-tools.service';
import { environment } from 'src/environments/environment';
import { ControllerModalBoundingBoxSelectionComponent } from './components/controller-modal-bbox-selection/controller-modal-bbox-selection.component';
import { ControllerModalLayerManagerComponent } from './components/controller-modal-layer-manager/controller-modal-layer-manager.component';
import { ControllerModalSearchResultDetailsComponent } from './components/controller-modal-search-result-details/controller-modal-search-result-details.component';
import { ControllerModalSearchResultsComponent } from './components/controller-modal-search-results/controller-modal-search-results.component';
import { ControllerModalToolsDistanceComponent } from './components/controller-modal-tools-distance/controller-modal-tools-distance.component';
import { ControllerModalComponent } from './controller-modal.component';

const ModuleRoutes: Routes = [
    {
        path: '',
        component: ControllerModalComponent,
        children: [
            {
                path: 'bbox-selection',
                component: ControllerModalBoundingBoxSelectionComponent
            },
            {
                path: 'products',
                component: ControllerModalSearchResultsComponent,
            },
            {
                path: 'products/:index',
                component: ControllerModalSearchResultDetailsComponent
            },
            {
                path: 'bookmarks',
                component: ControllerModalSearchResultsComponent,
            },
            {
                path: 'nomenclatures',
                component: ControllerModalSearchResultsComponent,
            },
            {
                path: 'nomenclatures/:index',
                pathMatch: 'full',
                redirectTo: 'nomenclatures'
            },
            {
                path: 'bookmarks/:index',
                component: ControllerModalSearchResultDetailsComponent
            },
            {
                path: 'layer-manager',
                component: ControllerModalLayerManagerComponent
            },
            {
                path: 'tools/distance',
                component: ControllerModalToolsDistanceComponent
            }
        ]
    }
];

const MdcWebModules = [
    MdcIconModule,
    MdcSliderModule
];

@NgModule({
    declarations: [
        ControllerModalComponent,
        ControllerModalBoundingBoxSelectionComponent,
        ControllerModalSearchResultsComponent,
        ControllerModalSearchResultDetailsComponent,
        ControllerModalLayerManagerComponent,
        ControllerModalToolsDistanceComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(ModuleRoutes),
        ...MdcWebModules
    ],
    exports: [
        RouterModule
    ],
    providers: [
        {
            provide: ToolsService,
            useClass: environment.unity ? UnityToolsService : AngularToolsService
        },
    ]
})
export class ControllerModalModule {

}
