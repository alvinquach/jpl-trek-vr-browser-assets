import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { DevNavigationComponent } from './components/dev-navigation/dev-navigation.component';
import { environment } from 'src/environments/environment';

const UnityRoutes: Routes = [
    {
        path: 'main-modal',
        loadChildren: './submodules/main-modal/main-modal.module#MainModalModule'
    },
    {
        path: 'controller-modal',
        loadChildren: './submodules/controller-modal/controller-modal.module#ControllerModalModule'
    },
];

const WebRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: environment.unity ? 'main-modal' : 'dev'
    },
    {
        path: 'dev',
        component: DevNavigationComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'main-modal'
            },
            ...UnityRoutes,
        ]
    },
    ...UnityRoutes
];

@NgModule({
    imports: [
        RouterModule.forRoot(WebRoutes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
