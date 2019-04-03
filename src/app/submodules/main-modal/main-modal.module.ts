import { MdcButtonModule, MdcIconModule } from '@angular-mdc/web';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModalHomeComponent } from './components/main-modal-home/main-modal-home.component';
import { MainModalLayerManagerComponent } from './components/main-modal-layer-manager/main-modal-layer-manager.component';
import { MainModalSearchBookmarkComponent } from './components/main-modal-search-bookmark/main-modal-search-bookmark.component';
import { MainModalSearchItemInfoComponent } from './components/main-modal-search-item-info/main-modal-search-item-info.component';
import { MainModalSearchNomenclatureComponent } from './components/main-modal-search-nomenclature/main-modal-search-nomenclature.component';
import { MainModalSearchProductComponent } from './components/main-modal-search-product/main-modal-search-product.component';
import { MainModalSearchRootComponent } from './components/main-modal-search-root/main-modal-search-root.component';
import { MainModalComponent } from './main-modal.component';
import { MainModalService } from './services/main-modal.service';
import { MainModalNavigableIconComponent } from './components/main-modal-navigatible/main-modal-navigable-icon.component';

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
                    {
                        path: 'layer-manager',
                        component: MainModalLayerManagerComponent,
                    }
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
        MainModalSearchItemInfoComponent,
        MainModalLayerManagerComponent,
        MainModalNavigableIconComponent
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
