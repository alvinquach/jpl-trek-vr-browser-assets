import { Injectable } from '@angular/core';
import { ToolsService } from './base-tools.service';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from 'src/app/models/terrain/coordinate.model';

@Injectable()
export class AngularToolsService extends ToolsService {

    constructor(private _http: HttpClient) {
        super(undefined);
    }

    getDistance(points: Coordinate[], callback: (res) => void, errorCallback?: (error: any) => void) {

        const paramsMap = {
            endpoint: 'https://trek.nasa.gov/mars/arcgis/rest/services/mola128_mola64_merge_90Nto90S_SimpleC_clon0/ImageServer',
            path: this._coordinatesToString(points),
            radiusInMeters: '3390000' // TODO Un-hardcode this
        };

        this._http.get('https://trek.nasa.gov/mars/TrekServices/ws/elevationProfile/distance', { params: paramsMap })
            .subscribe(res => callback(res));
    }

}
