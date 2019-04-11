import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-dev-navigation',
    templateUrl: './dev-navigation.component.html',
    styleUrls: ['./dev-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DevNavigationComponent {

    readonly mainModal: Link = {
        label: 'Main Modal',
        link: './main-modal'
    };

    readonly terrainControlPanel: Link = {
        label: 'Terrain Ctrl',
        link: './terrain-control-panel'
    };

    readonly testLinks1: Link[] = [
        {
            label: 'BBox Selection',
            link: './controller-modal/bbox-selection'
        },
        {
            label: 'Bookmarks',
            link: './controller-modal/bookmarks'
        },
        {
            label: 'Nomeclatures',
            link: './controller-modal/nomenclatures'
        },
        {
            label: 'Products',
            link: './controller-modal/products'
        },
        {
            label: 'Layer Manager',
            link: './controller-modal/layer-manager'
        }
    ];

    readonly testLinks2: Link[] = [
        {
            label: 'Link 4',
            link: './fake-link'
        },
        {
            label: 'Link 5',
            link: './fake-link'
        },
        {
            label: 'Link 6',
            link: './fake-link'
        }
    ];

    collapsed = true;

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
    }

}

interface Link {
    readonly label: string;
    readonly link: string;
}
