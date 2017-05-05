import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ngil-buttons',
  template: `      
      <button md-raised-button
              color="primary"
              (click)="start.emit()">start
      </button>

      <button md-raised-button
              color="secondary"
              (click)="init.emit()">init
      </button>
  `,
  styles: []
})
export class ButtonsComponent  {

  @Output() start = new EventEmitter<void>();
  @Output() init = new EventEmitter<void>();

}
