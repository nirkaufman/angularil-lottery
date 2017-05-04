import { browser, element, by } from 'protractor';

export class AngularilLotteryPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ngil-root h1')).getText();
  }
}
