import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  private _names: string[];

  constructor() {
    // todo: replace with real data source
    this._names = [
      'Armando Plante',
      'Yuko Chronister',
      'Kassandra Mungia',
      'Rosario Corey',
      'Derek Peri',
      'Darwin Massie',
      'Almeda Binder',
      'Toby Barter',
      'Burl Edgemon',
      'ניר קאופמן'
    ];
  }

  public get names(): string[] {
    return this._names;
  }
}
