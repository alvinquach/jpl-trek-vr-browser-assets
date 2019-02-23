import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/app/services/http/base-http.service';

@Component({
    selector: 'app-main-modal-home',
    templateUrl: './main-modal-home.component.html',
    styleUrls: ['./main-modal-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalHomeComponent {

    constructor(httpService: HttpService) {
        setTimeout(() => {
            httpService.get(
                'https://trek.nasa.gov/mars/TrekServices/ws/index/eq/searchItems?&&&&proj=urn:ogc:def:crs:EPSG::104905&start=0&rows=30&facetKeys=itemType&facetValues=bookmark&&resolutionMin=&resolutionMax=&noSort=false',
                res => console.log(res)
            );
        }, 500);
    }

}