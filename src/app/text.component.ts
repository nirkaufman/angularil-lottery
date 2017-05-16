import {Component, Input} from '@angular/core';
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

  @Input() maxIterations: number;
  @Input() speed: number;

  public name: string;

  private running: boolean;
  private selected: string;
  private covered: string | any | void;
  private timer: any;
  private currentIteration: any;
  private names: string[];

  constructor(dataService: DataService) {
    dataService.names.subscribe( result => {
      this.names = result.json();
      this.init();
    });
  }

  public init() {
    this.names = this.paddNames(this.names);
    this.currentIteration = 0;
    this.running          = false;
    this.selected         = this.names[Math.random() * this.names.length | 0]['name'].toUpperCase();
    this.covered          = this.selected.replace(/([\s]|[\S])/g, '_');
    this.name             = this.covered;
  }

  public start() {
    this.running = true;
    this.timer   = setInterval(this.decode.bind(this), this.speed);
  }

  private paddNames(shortNames) {
    const longNames: any[] = [];
    // calc max length for all names

    let maxLength = 0;
    shortNames.forEach((obj: any) => {
      if (obj.name.length > maxLength) {
        maxLength = obj.name.length;
      }
    });

    // padd all names to max length
    shortNames.forEach((obj: any) => {
      const padding = (maxLength - obj.name.length) / 2;
      const paddingName = ' '.repeat(padding) + obj.name + ' '.repeat(padding);
      longNames.push({'name': paddingName});
    });

    return longNames;
  }

  private decode() {
    let newText = this.covered.split('').map(this.changeLetter().bind(this)).join('');
    newText     =  this.currentIteration++ >= this.maxIterations ? this.selected : newText;

    if (newText === this.selected) {
      this.name = newText;
      clearTimeout(this.timer);
      this.running = false;
      return false;
    }
    this.covered = newText;
    this.name    = newText;
  }

  private changeLetter() {
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
