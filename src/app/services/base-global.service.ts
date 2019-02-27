import { AngularGlobalVariables } from '../models/global/angular/angular-global-variables.model';

export abstract class GlobalService {

    constructor(protected readonly _serviceName: string) {
        if (_serviceName == null) {
            return;
        }
        setTimeout(() => {
            const angularGlobalVariables = AngularGlobalVariables.instance;
            if (!!angularGlobalVariables.injectablesMap[_serviceName]) {
                console.error(`Error: Injectable with the name ${_serviceName} already exists in the global map.`);
                return;
            }
            angularGlobalVariables.injectablesMap[_serviceName] = this;
        });

    }

}
