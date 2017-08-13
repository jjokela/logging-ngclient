import { NewnewPage } from './app.po';

describe('logdashboard App', () => {
  let page: NewnewPage;

  beforeEach(() => {
    page = new NewnewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
