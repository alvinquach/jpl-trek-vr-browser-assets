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

    readonly testLinks1: Link[] = [
        {
            label: 'Link 1',
            link: './fake-link'
        },
        {
            label: 'Link 2',
            link: './fake-link'
        },
        {
            label: 'Link 3',
            link: './fake-link'
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
