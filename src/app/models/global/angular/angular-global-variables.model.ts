import { GlobalComponent } from 'src/app/components/base-global.component';
import { GlobalService } from 'src/app/services/base-global.service';
import { AngularWebRequest } from './angular-web-request.model';

export class AngularGlobalVariables {

    private readonly _webRequests: {[key: string]: AngularWebRequest} = {};

    readonly componentsMap: {[key: string]: GlobalComponent} = {};

    readonly injectablesMap: {[key: string]: GlobalService} = {};

    addWebRequest(requestId: string, callback?: (res: string) => void): AngularWebRequest {
        if (!!this._webRequests[requestId]) {
            console.error(`Web request ID ${requestId} already exists.`);
            return null;
        }
        return this._webRequests[requestId] = new AngularWebRequest(requestId, callback);
    }

    fulfillWebRequest(requestId: string, response: string): boolean {
        console.log(requestId);
        const request = this._webRequests[requestId];
        if (!request) {
            console.error(`Web request ID ${requestId} does not exist.`);
            return false;
        }
        request.response = response;
        delete this._webRequests[requestId];
        return true;
    }

    detectChanges(): void {
        for (const key of Object.keys(this.componentsMap)) {
            this.componentsMap[key].changeDetector.detectChanges();
        }
    }

}
