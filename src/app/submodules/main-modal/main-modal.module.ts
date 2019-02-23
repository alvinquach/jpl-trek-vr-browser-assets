import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainModalHomeComponent } from './components/main-modal-home/main-modal-home.component';
import { MainModalContainerComponent } from './components/main-modal-container/main-modal-container.component';

const routes: Routes = [
    {
        path: '',
        component: MainModalContainerComponent,
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
        MainModalContainerComponent,
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
export class MainModalModule { }