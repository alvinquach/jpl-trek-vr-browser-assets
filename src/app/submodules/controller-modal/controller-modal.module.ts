import { MdcIconModule, MdcSliderModule } from '@angular-mdc/web';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ControllerModalBoundingBoxSelectionComponent } from './components/controller-modal-bbox-selection/controller-modal-bbox-selection.component';
import { ControllerModalLayerManagerComponent } from './components/controller-modal-layer-manager/controller-modal-layer-manager.component';
import { ControllerModalSearchResultDetailsComponent } from './components/controller-modal-search-result-details/controller-modal-search-result-details.component';
import { ControllerModalSearchResultsComponent } from './components/controller-modal-search-results/controller-modal-search-results.component';
import { ControllerModalComponent } from './controller-modal.component';

const ModuleRoutes: Routes = [
    {
        path: '',
        component: ControllerModalComponent,
        children: [
            // {
            //     path: '',
            //     pathMatch: 'full',
            //     redirectTo: 'home'
            // },
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
                path: 'bookmarks/:index',
                component: ControllerModalSearchResultDetailsComponent
            },
            {
                path: 'layer-manager',
                component: ControllerModalLayerManagerComponent
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
        ControllerModalLayerManagerComponent
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
    providers: []
})
export class ControllerModalModule {

}
