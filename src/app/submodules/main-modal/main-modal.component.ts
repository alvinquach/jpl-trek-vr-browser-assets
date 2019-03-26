import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainModalService } from './services/main-modal.service';

@Component({
    selector: 'app-main-modal',
    templateUrl: './main-modal.component.html',
    styleUrls: ['./main-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalComponent implements OnInit {

    private _headerText: string;
    get headerText() {
        return this._headerText;
    }

    constructor(private _cd: ChangeDetectorRef,
                private _mainModalService: MainModalService) {

    }

    ngOnInit() {
        this._mainModalService.headerText.subscribe(value => {
            this._headerText = value;
            this._cd.detectChanges();
        });
    }

}
