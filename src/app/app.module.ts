import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnityService } from './services/unity.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: UnityService,
            useFactory: () => environment.unity ? new UnityService() : null
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
