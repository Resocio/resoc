import { FacebookOpenGraph, ImageResolution } from ".";

export enum ImageDestination {
  WebPageSocialImage = 'WebPageSocialImage',
  TwitterBanner = 'TwitterBanner'
};

export type ImageSpecs = {
  destination?: ImageDestination;
  minRatio?: number;
  maxRatio?: number;
  ratio?: number;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  minHeight?: number;
  maxHeight?: number;
  height?: number;
};

export const WebPageSocialImageDestination: ImageSpecs = {
  destination: ImageDestination.WebPageSocialImage,
  minRatio: 1.91,
  maxRatio: 2.0,
  minWidth: 1200,
  minHeight: 630
};

export const TwitterBannerDestination: ImageSpecs = {
  destination: ImageDestination.TwitterBanner,
  ratio: 3.0,
  minWidth: 600,
  minHeight: 200
};

export const getImageSpecsByDestination = (destination: ImageDestination): ImageSpecs => {
  if (destination === ImageDestination.WebPageSocialImage) {
    return WebPageSocialImageDestination;
  }

  return TwitterBannerDestination;
}

export const fillImageSpecsViaDestination = (specs: ImageSpecs): ImageSpecs => (
  Object.assign({}, specs.destination ? getImageSpecsByDestination(specs.destination) : {}, specs)
);

export const getImageMaxRatio = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.maxRatio || s.ratio;
};

export const getImageMinRatio = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.minRatio || s.ratio;
};

export const getImageRatio = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.ratio;
};

export const getImageMaxWidth = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.maxWidth || s.width;
};

export const getImageMinWidth = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.minWidth || s.width;
};

export const getImageWidth = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.width;
};

export const getImageMaxHeight = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.maxHeight || s.height;
};

export const getImageMinHeight = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.minHeight || s.height;
};

export const getImageHeight = (specs: ImageSpecs): number | undefined => {
  const s = fillImageSpecsViaDestination(specs);
  return s.height;
};

export const getImageDemoResolution = (specs: ImageSpecs): ImageResolution => {
  const s = fillImageSpecsViaDestination(specs);

  if (s.destination === ImageDestination.TwitterBanner) {
    const height = 600;
    return { width: height * (getImageRatio(s) || 3.0), height };
  }

  return FacebookOpenGraph;
}
