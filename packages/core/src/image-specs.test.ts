import { fillImageSpecsViaDestination, getImageMaxRatio, getImageSpecsByDestination, ImageDestination, TwitterBannerDestination, WebPageSocialImageDestination } from './image-specs'

test('getImageSpecsByDestination', () => {
  expect(
    getImageSpecsByDestination(ImageDestination.WebPageSocialImage)
  ).toEqual(WebPageSocialImageDestination);
  expect(
    getImageSpecsByDestination(ImageDestination.TwitterBanner)
  ).toEqual(TwitterBannerDestination);
});

test('fillImageSpecsViaDestination', () => {
  expect(fillImageSpecsViaDestination({
    destination: ImageDestination.WebPageSocialImage
  })).toEqual(WebPageSocialImageDestination);
  expect(fillImageSpecsViaDestination({
    destination: ImageDestination.TwitterBanner,
    maxWidth: 1000,
    minHeight: 300
  })).toEqual({
    destination: ImageDestination.TwitterBanner,
    ratio: 3.0,
    maxWidth: 1000,
    minWidth: 600,
    minHeight: 300
  });
});

test('getImageMaxRatio', () => {
  expect(getImageMaxRatio({
    maxRatio: 2.1, minRatio: 1.8
  })).toEqual(2.1);
  expect(getImageMaxRatio({
    destination: ImageDestination.WebPageSocialImage
  })).toEqual(2.0);
  expect(getImageMaxRatio({
    destination: ImageDestination.TwitterBanner
  })).toEqual(3.0);
});
