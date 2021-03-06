import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class DataService {
  private _winners: string[] = [];
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public get names() {
    return this.http.get('http://localhost:3000/jspoland');
  }

  public addWinner(name) {
    this._winners.push(name);
  }
}
