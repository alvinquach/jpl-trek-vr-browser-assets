import { GlobalComponent } from 'src/app/components/base-global.component';
import { GlobalService } from 'src/app/services/base-global.service';

export class AngularGlobalVariables {

    readonly componentsMap: {[key: string]: GlobalComponent} = {};

    readonly injectablesMap: {[key: string]: GlobalService} = {};

    detectChanges(): void {
        for (const key of Object.keys(this.componentsMap)) {
            this.componentsMap[key].changeDetector.detectChanges();
        }
    }

}
