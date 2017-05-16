import {Component} from '@angular/core';

@Component({
  selector: 'ngil-root',
  template: `
    <md-toolbar color="primary">
      <span>ANGULAR-IL | LOTTERY </span>
    </md-toolbar>

    <ngil-text [maxIterations]="250"
               [speed]="17"></ngil-text>
  `,

})
export class AppComponent {

}
