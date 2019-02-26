import { MdcButtonModule, MdcIconButtonModule, MdcIconModule, MdcListModule, MdcMenuModule, MdcTopAppBarModule } from '@angular-mdc/web';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevNavigationComponent } from './components/dev-navigation/dev-navigation.component';
import { AngularHttpService } from './services/http/angular-http.service';
import { HttpService } from './services/http/base-http.service';
import { UnityHttpService } from './services/http/unity-http.service';
import { SearchService } from './services/search/base-search.service';
import { UnitySearchService } from './services/search/unity-search.service';
import { AngularSearchService } from './services/search/angular-search.service';

const MdcWebModules = [
    MdcButtonModule,
    MdcIconButtonModule,
    MdcIconModule,
    MdcListModule,
    MdcMenuModule,
    MdcTopAppBarModule,
];

@NgModule({
    declarations: [
        AppComponent,
        DevNavigationComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        environment.unity ? [] : HttpClientModule,
        ...MdcWebModules
    ],
    providers: [
        {
            provide: HttpService,
            useClass: environment.unity ? UnityHttpService : AngularHttpService
        },
        {
            provide: SearchService,
            useClass: environment.unity ? UnitySearchService : AngularSearchService
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
