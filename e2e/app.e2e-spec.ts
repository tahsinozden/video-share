import { VideoSharePage } from './app.po';

describe('video-share App', () => {
  let page: VideoSharePage;

  beforeEach(() => {
    page = new VideoSharePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
