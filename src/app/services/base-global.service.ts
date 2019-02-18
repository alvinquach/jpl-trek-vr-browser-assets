import { AngularGlobalVariables } from '../models/global/angular/angular-global-variables.model';

export abstract class GlobalService {

    protected readonly _globalServiceId: string;

    constructor(serviceName: string) {

        // Unlike with components, there should only be one instance of
        // a service at any time.
        this._globalServiceId = serviceName;
        const angularGlobalVariables: AngularGlobalVariables = window[AngularGlobalVariables.name];
        if (!!angularGlobalVariables.injectablesMap[this._globalServiceId]) {
            console.error(`Error: Injectable with the name ${this._globalServiceId} already exists in the global map.`);
            return;
        }
        angularGlobalVariables.injectablesMap[this._globalServiceId] = this;
    }

}