import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-main-modal-search-item-info',
    templateUrl: './main-modal-search-item-info.component.html',
    styleUrls: ['./main-modal-search-item-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchItemInfoComponent {

    @Input()
    title = 'No Title';

    private _imageUrl: string;
    get imageUrl(): string {
        return this._imageUrl;
    }
    @Input()
    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    @Input()
    description: string;

}
