import { AngularGlobalVariables } from '../models/global/angular/angular-global-variables.model';
import { OnDestroy, ChangeDetectorRef } from '@angular/core';

export abstract class GlobalComponent implements OnDestroy {

    protected readonly _globalComponentId: string;

    constructor(componentName: string, public changeDetector: ChangeDetectorRef) {
        const angularGlobalVariables: AngularGlobalVariables = window[AngularGlobalVariables.name];
        let i = 0;
        while (true) {
            this._globalComponentId = componentName + i;
            if (!angularGlobalVariables.componentsMap[this._globalComponentId]) {
                angularGlobalVariables.componentsMap[this._globalComponentId] = this;
                break;
            }
            i++;
        }
    }

    ngOnDestroy() {
        console.log("DESTROYED");
        const angularGlobalVariables: AngularGlobalVariables = window[AngularGlobalVariables.name];
        delete angularGlobalVariables.componentsMap[this._globalComponentId];
    }

}
