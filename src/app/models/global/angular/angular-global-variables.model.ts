import { GlobalComponent } from 'src/app/components/base-global.component';
import { GlobalService } from 'src/app/services/base-global.service';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

/**
 * An instance of this class is stored globally in the 'window'
 * variable so that certain parts of the Angular application can
 * be accessed externally by Unity, etc.
 *
 * @author Alvin Quach
 */
export class AngularGlobalVariables {

    static get instance(): AngularGlobalVariables {
        return window[AngularGlobalVariables.name];
    }

    readonly componentsMap: {[key: string]: GlobalComponent} = {};

    readonly injectablesMap: {[key: string]: GlobalService} = {};

    constructor(private _ngZone: NgZone, private _router: Router) {

    }

    detectChanges(): void {
        for (const key of Object.keys(this.componentsMap)) {
            this.componentsMap[key].cd.detectChanges();
        }
    }

    navigateTo(path: string): void {
        this._ngZone.run(() => {
            this._router.navigateByUrl(path);
        });
    }

}
