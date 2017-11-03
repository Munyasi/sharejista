import { SharejistaPage } from './app.po';

describe('sharejista App', () => {
  let page: SharejistaPage;

  beforeEach(() => {
    page = new SharejistaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
