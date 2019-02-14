import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  vals = {
    a: 0,
    b: 0,
    c: 0
  }

  test(event, v) {
    console.log(event);
    this.vals[v] += 1;
  }

  keydown(event, v) {
    console.log(event);
  }

}
