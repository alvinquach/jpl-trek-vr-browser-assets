import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularGlobalVariables } from './models/global/angular/angular-global-variables.model';
import { UnityGlobalVariables } from './models/global/unity/unity-global-variables.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

    constructor() {

        // Create the global window objects so that Unity can access Angular
        // components and variables that are registered for global access
        // and vice versa.
        window[AngularGlobalVariables.name] = new AngularGlobalVariables();
        window[UnityGlobalVariables.name] = new UnityGlobalVariables();

    }

}