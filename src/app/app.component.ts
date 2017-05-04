import { Component } from '@angular/core';

@Component({
  selector: 'ngil-root',
  template: `
  <h1>
    {{title}}
  </h1>
  `,
  styles: []
})
export class AppComponent {
  title = 'ngil works!';
}
