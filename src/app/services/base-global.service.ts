import { AngularGlobalVariables } from '../models/global/angular/angular-global-variables.model';

export abstract class GlobalService {

    protected readonly _globalServiceId: string;

    constructor(serviceName: string) {

        if (serviceName == null) {
            return;
        }

        // Unlike with components, there should only be one instance of a
        // service at any time, so we don't need to generate a unique name.
        this._globalServiceId = serviceName;

        setTimeout(() => {
            const angularGlobalVariables: AngularGlobalVariables = window[AngularGlobalVariables.name];
            if (!!angularGlobalVariables.injectablesMap[this._globalServiceId]) {
                console.error(`Error: Injectable with the name ${this._globalServiceId} already exists in the global map.`);
                return;
            }
            angularGlobalVariables.injectablesMap[this._globalServiceId] = this;
        });

    }

}
