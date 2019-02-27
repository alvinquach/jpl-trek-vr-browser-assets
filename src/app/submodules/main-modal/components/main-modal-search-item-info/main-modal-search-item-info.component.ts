import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UnityGlobalVariables } from 'src/app/models/global/unity/unity-global-variables.model';

@Component({
    selector: 'app-main-modal-search-item-info',
    templateUrl: './main-modal-search-item-info.component.html',
    styleUrls: ['./main-modal-search-item-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainModalSearchItemInfoComponent {

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

    @Input()
    boundingBox: string;

    navigate() {
        UnityGlobalVariables.instance.navigateTo(this.boundingBox);
    }

}
