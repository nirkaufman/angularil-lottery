import {Component} from '@angular/core';
import {DataService} from './data.service';

@Component({
  selector: 'ngil-text',
  styles  : [`
    p {
      font-family: Courier;
      letter-spacing: 9px;
      font-size: 60px;
    }`],
  template: `
    <p>{{ name }}</p>

    <ngil-buttons *ngIf="!running"
                  (start)="start()"
                  (init)="init()"></ngil-buttons>
  `,
})
export class TextComponent {

  public name: string;

  private running: boolean;
  private selected: string;
  private covered: string | any | void;
  private timer: any;
  private maxIniterations: any;
  private currentIniteration: any;
  private names: string[];

  constructor(dataService: DataService) {
    this.names = dataService.names;
    this.init();
  }

  public init() {
    this.maxIniterations = 300;
    this.currentIniteration = 0;
    this.running  = false;
    this.selected = this.names[Math.random() * this.names.length | 0].toUpperCase();
    this.covered  = this.selected.replace(/[^\s]/g, '_');
    this.name     = this.covered;
  }

  start() {
    this.running = true;
    this.timer   = setInterval(this.decode.bind(this), 50);
  }

  checkIniteration(newText) {
    this.currentIniteration++;
    if (this.currentIniteration > this.maxIniterations) {
      return this.selected;
    }
    return newText;
  }

  decode() {
    let newText = this.covered.split('').map(this.changeLetter().bind(this)).join('');
    newText = this.checkIniteration(newText);
    if (newText === this.selected) {
      this.name = newText;
      clearTimeout(this.timer);
      this.running = false;
      return false;
    }
    this.covered = newText;
    this.name    = newText;
  }

  changeLetter() {
    const replacements    = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz%!@&*#_ אבגדהוזחטיכךלמםנןסעפףצץקרשת';
    const replacementsLen = replacements.length;
    return function (letter, index) {
      if (this.selected[index] === letter) {
        return letter;
      } else {
        return replacements[Math.random() * replacementsLen | 0];
      }
    };
  }
}
