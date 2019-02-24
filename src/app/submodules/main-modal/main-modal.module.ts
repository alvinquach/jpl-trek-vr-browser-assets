import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainModalHomeComponent } from './components/main-modal-home/main-modal-home.component';
import { MainModalComponent } from './main-modal.component';

const routes: Routes = [
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

@NgModule({
    declarations: [
        MainModalComponent,
        MainModalHomeComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class MainModalModule {

}
