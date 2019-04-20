import { Injectable } from '@angular/core';
import { ToolsService } from './base-tools.service';
import { HttpClient } from '@angular/common/http';
import { Coordinate } from 'src/app/models/terrain/coordinate.model';

@Injectable()
export class AngularToolsService extends ToolsService {

    private readonly _endpoint = 'https://trek.nasa.gov/mars/arcgis/rest/services/mola128_mola64_merge_90Nto90S_SimpleC_clon0/ImageServer';

    private readonly _radius = 3390000; // TOOD Move this somewhere else.

    constructor(private _http: HttpClient) {
        super(undefined);
    }

    getDistance(points: Coordinate[], callback: (res) => void, errorCallback?: (error: any) => void) {

        const paramsMap = {
            endpoint: this._endpoint,
            path: `[${this._coordinatesToString(points)}]`,
            radiusInMeters: `${this._radius}`
        };

        this._http.get('https://trek.nasa.gov/mars/TrekServices/ws/elevationProfile/distance', { params: paramsMap })
            .subscribe(res => callback(res));
    }

    getHeightProfile(points: Coordinate[], sampleCount: number, callback: (res) => void, errorCallback?: (error: any) => void) {

        const paramsMap = {
            endpoint: this._endpoint,
            path: this._coordinatesToString(points),
            numberOfPoints: `${sampleCount}`,
            radiusInMeters: `${this._radius}`
        };

        this._http.get('https://trek.nasa.gov/mars/TrekServices/ws/elevationProfile/calculate', { params: paramsMap })
            .subscribe(res => callback(res));
    }

}
