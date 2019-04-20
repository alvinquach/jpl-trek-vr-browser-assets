import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ToolsService } from 'src/app/services/tools/base-tools.service';
import { ControllerModalToolsBasePointsComponent } from '../controller-modal-tools-base-points/controller-modal-tools-base-points.component';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
    selector: 'app-controller-modal-tools-height-profile',
    templateUrl: './controller-modal-tools-height-profile.component.html',
    styleUrls: [
        '../controller-modal-tools-base-points/controller-modal-tools-base-points.component.scss',
        './controller-modal-tools-height-profile.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerModalToolsHeightProfileComponent extends ControllerModalToolsBasePointsComponent {

    readonly heightProfileSampleCount = 100;

    private _helpMode = false;
    get helpMode() {
        return this._helpMode;
    }

    private _results: GoogleChartInterface;
    get results() {
        return this._results;
    }

    constructor(cd: ChangeDetectorRef,
                private _toolsService: ToolsService) {

        super(ControllerModalToolsHeightProfileComponent.name, cd);
    }

    toggleHelpMode(): void {
        this._helpMode = !this._helpMode;
    }

    showResults(show: boolean) {
        if (!show) {
            this._results = null;
            this.cd.detectChanges();
        } else {
            this._toolsService.getHeightProfile(this.points, this.heightProfileSampleCount, res => {
                this._results = this._processResults(res);
                console.log(this.results)
                this.cd.detectChanges();
            });
        }
    }

    private _processResults(res): GoogleChartInterface {
        const line: any[] = res.line;
        if (!line) {
            console.error('Bad data.');
            return null;
        }
        const totalDistance = res.totalDistance / 1000;
        const samples = line.map((p, i) => [
            i / (this.heightProfileSampleCount - 2) * totalDistance,
            p.elevation
        ]);
        return {
            chartType: 'LineChart',
            dataTable: [
                ['Distance', 'Elevation'],
                ...samples
            ],
            options: {
                backgroundColor: 'transparent',
                curveType: 'function',
                hAxis: {
                    textStyle: {
                        color: 'white',
                        fontName: 'Roboto',
                        fontSize: 20
                    },
                    title: 'Distance (km)',
                    titleTextStyle: {
                        color: 'white',
                        fontName: 'Roboto',
                        fontSize: 24,
                        italic: false
                    }
                },
                height: 736,
                legend: 'none',
                series: {
                    0: {
                        color: '#83e603',
                        lineWidth: 4
                    },
                },
                vAxis: {
                    textStyle: {
                        color: 'white',
                        fontName: 'Roboto',
                        fontSize: 20
                    },
                    title: 'Elevation (m)',
                    titleTextStyle: {
                        color: 'white',
                        fontName: 'Roboto',
                        fontSize: 24,
                        italic: false
                    }
                }
            }
        };
    }

}
