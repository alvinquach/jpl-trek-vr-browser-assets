import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControllerModalComponent } from './controller-modal.component';

const routes: Routes = [
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

@NgModule({
    declarations: [
        ControllerModalComponent,
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class ControllerModalModule {

}
