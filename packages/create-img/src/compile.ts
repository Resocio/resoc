import { puppeteerBrowser } from './puppeteer'
import type { Browser, ScreenshotOptions } from 'puppeteer'
import { ImageResolution, ImageTemplate, ParamValues } from '@resoc/core';
import createImgCore from '@resoc/create-img-core'

type LocalTemplateOptions = {
  cache?: boolean;
  browser?: Browser
};

export const createImage = async (
  templateManifestPath: string,
  paramValues: ParamValues,
  resolution: ImageResolution,
  imagePath: string,
  options?: LocalTemplateOptions
): Promise<string> => (
  createImgCore.createImage(
    templateManifestPath,
    paramValues,
    resolution,
    imagePath,
    options?.browser || await puppeteerBrowser(),
    options?.cache || false
  )
);

// Old name
export const compileLocalTemplate = createImage;

export const createImageFromTemplate = async (
  template: ImageTemplate,
  paramValues: ParamValues,
  resolution: ImageResolution,
  imagePath: string,
  resourcePath?: string,
  browser?: Browser
): Promise<void> => (
  createImgCore.createImageFromTemplate(
    template, paramValues, resolution, imagePath, resourcePath, browser || await puppeteerBrowser()
  )
);

export const createAnyImageFromTemplate = async (
  template: ImageTemplate,
  paramValues: ParamValues,
  resolution: ImageResolution,
  outputOptions: ScreenshotOptions,
  resourcePath?: string,
  browser?: Browser
): Promise<string | Buffer | void> => {
  if (!browser) {
    browser = await puppeteerBrowser();
  }

  return createAnyImageFromTemplate(
    template, paramValues, resolution, outputOptions, resourcePath, browser
  );
};

// Old name
export const compileTemplate = createImageFromTemplate;
