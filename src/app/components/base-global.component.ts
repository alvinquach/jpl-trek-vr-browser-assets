import { AngularGlobalVariables } from '../models/global/angular/angular-global-variables.model';
import { OnDestroy, ChangeDetectorRef } from '@angular/core';

export abstract class GlobalComponent implements OnDestroy {

    constructor(protected readonly _componentName: string, public changeDetector: ChangeDetectorRef) {
        const angularGlobalVariables = AngularGlobalVariables.instance;
        if (!!angularGlobalVariables.injectablesMap[_componentName]) {
            console.error(`Error: Injectable with the name ${_componentName} already exists in the global map.`);
            return;
        }
        angularGlobalVariables.componentsMap[_componentName] = this;
    }

    ngOnDestroy() {
        console.log(`Component ${this._componentName} destroyed.`);
        const angularGlobalVariables = AngularGlobalVariables.instance;
        delete angularGlobalVariables.componentsMap[this._componentName];
    }

}
