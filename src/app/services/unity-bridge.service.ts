import { Injectable, Optional } from '@angular/core';
import { GlobalService } from './base-global.service';
import { UnityHttpService } from './http/unity-http.service';

/**
 * A service that allows access to other services that can't
 * be registered as a global service (ie. HttpService).
 */
@Injectable()
export class UnityBridgeService extends GlobalService {

    constructor(@Optional() public httpService: UnityHttpService) {
        super(UnityBridgeService.name);
    }

}