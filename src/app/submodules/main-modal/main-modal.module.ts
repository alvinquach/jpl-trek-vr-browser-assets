import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainModalHomeComponent } from './components/main-modal-home/main-modal-home.component';
import { MainModalComponent } from './main-modal.component';
import { MainModalSearchRootComponent } from './components/main-modal-search-root/main-modal-search-root.component';
import { MainModalSearchBookmarkComponent } from './components/main-modal-search-bookmark/main-modal-search-bookmark.component';
import { MainModalSearchProductComponent } from './components/main-modal-search-product/main-modal-search-product.component';
import { MainModalSearchNomenclatureComponent } from './components/main-modal-search-nomenclature/main-modal-search-nomenclature.component';
import { MainModalService } from './services/main-modal.service';
import { CommonModule } from '@angular/common';
import { MainModalSearchItemInfoComponent } from './components/main-modal-search-item-info/main-modal-search-item-info.component';
import { MdcIconModule, MdcButtonModule } from '@angular-mdc/web';

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
                component: MainModalHomeComponent,
                children: [
                    {
                        path: 'search',
                        component: MainModalSearchRootComponent,
                        children: [
                            {
                                path: 'bookmark',
                                component: MainModalSearchBookmarkComponent
                            },
                            {
                                path: 'nomenclature',
                                component: MainModalSearchNomenclatureComponent
                            },
                            {
                                path: 'product',
                                component: MainModalSearchProductComponent
                            }
                        ]
                    },
                ]
            },
        ]
    }
];

const MdcWebModules = [
    MdcButtonModule,
    MdcIconModule
];

@NgModule({
    declarations: [
        MainModalComponent,
        MainModalHomeComponent,
        MainModalSearchRootComponent,
        MainModalSearchBookmarkComponent,
        MainModalSearchNomenclatureComponent,
        MainModalSearchProductComponent,
        MainModalSearchItemInfoComponent
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
        MainModalService
    ]
})
export class MainModalModule {

}
