import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MainModalService {

    public readonly headerText: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    setHeaderText(text: string): void {
        this.headerText.next(text);
    }

    getHeaderText(): string {
        return this.headerText.value;
    }

}
