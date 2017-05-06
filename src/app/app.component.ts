import {Component} from '@angular/core';

@Component({
  selector: 'ngil-root',
  template: `
    <md-toolbar color="primary">
      <span>ANGULAR-IL | LOTTERY </span>
    </md-toolbar>

    <ngil-text [maxIterations]="10" [speed]="50"></ngil-text>
  `,

})
export class AppComponent {

}
