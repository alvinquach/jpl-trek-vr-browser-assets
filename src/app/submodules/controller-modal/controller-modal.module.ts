import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControllerModalComponent } from './controller-modal.component';
import { ControllerModalBoundingBoxSelectionComponent } from './components/controller-modal-bbox-selection/controller-modal-bbox-selection.component';
import { CommonModule } from '@angular/common';

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
            }
        ]
    }
];

const MdcWebModules = [

];

@NgModule({
    declarations: [
        ControllerModalComponent,
        ControllerModalBoundingBoxSelectionComponent
    ],
    imports: [
        CommonModule,
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
