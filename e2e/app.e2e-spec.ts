import { AngularilLotteryPage } from './app.po';

describe('angularil-lottery App', () => {
  let page: AngularilLotteryPage;

  beforeEach(() => {
    page = new AngularilLotteryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ngil works!');
  });
});
