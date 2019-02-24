import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainModalHomeComponent } from './components/main-modal-home/main-modal-home.component';
import { MainModalComponent } from './main-modal.component';

const ModuleRoutes: Routes = [
    {
        path: '',
        component: MainModalComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: 'home',
                component: MainModalHomeComponent
            },
        ]
    }
];

const MdcWebModules = [

];

@NgModule({
    declarations: [
        MainModalComponent,
        MainModalHomeComponent
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
export class MainModalModule {

}
