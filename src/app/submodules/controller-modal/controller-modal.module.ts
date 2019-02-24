import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        ]
    }
];

const MdcWebModules = [

];

@NgModule({
    declarations: [
        ControllerModalComponent,
    ],
    imports: [
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
