import {Component, Input} from '@angular/core';
import {DataService} from './data.service';

const hebrewLetters = 'אבגדהוזחטיכךלמםנןסעפףצץקרשת';
const replacements    = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz%!@&*#_${hebrewLetters}`;

@Component({
  selector: 'ngil-text',
  styles  : [`
    p {
      font-family: Courier;
      letter-spacing: 9px;
      font-size: 60px;
    }
    .single-char {
      display: inline-block;
      width: 45px;
      height: 73px;
      vertical-align: bottom;
    }`],
  template: `
    <p><span class="single-char" *ngFor="let c of nameArr">{{ c }}</span></p>

    <ngil-buttons *ngIf="!running"
                  (start)="start()"
                  (init)="init()"></ngil-buttons>
    <h1>Winners</h1>
    <p *ngFor="let winner of winners">{{ winner }}</p>
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
  private winners: string[];

  constructor(private dataService: DataService) {
    dataService.names.subscribe( result => {
      this.names = result.json();
      this.init();
    });
  }

  get nameArr() {
    if (!this.name) {
      return [];
    }

    const splitName = this.name.split('');

    return hebrewLetters.includes(this.selected[0]) ? splitName.reverse() : splitName;
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

    // Get Max Length from all names
    const maxLength = Math.max(...shortNames.map((obj) => obj.name.length));

    // padd all names to max length
    const longNames = shortNames.map((obj) => {
      const padding = (maxLength - obj.name.length) / 2;
      return {name: ' '.repeat(padding) + obj.name + ' '.repeat(padding)};
    });

    return longNames;
  }

  private decode() {
    let newText = this.name.split('').map(this.changeLetter().bind(this)).join('');
    newText     =  this.currentIteration++ >= this.maxIterations ? this.selected : newText;

    if (newText === this.selected) {
      clearInterval(this.timer);
      this.running = false;
      this.dataService.addWinner(this.selected);
    }
    this.name    = newText;
  }

  private changeLetter() {
    const replacementsLen = replacements.length;
    return (letter, index) => {
      if (this.selected[index] === ' ') {
        return ' ';
      } else if (this.selected[index] === letter && this.currentIteration > 50) {
        return letter;
      } else {
        return replacements[Math.random() * replacementsLen | 0];
      }
    };
  }
}
