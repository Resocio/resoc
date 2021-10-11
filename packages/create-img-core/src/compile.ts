import {
  ImageTemplate,
  ImageResolution,
  ParamValues,
  renderTemplateToHtml,
  TemplateParam,
  ParamType,
  paramValueToString
} from '@resoc/core'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import copy from 'recursive-copy'
import { loadLocalTemplate } from './local'
import { imageFingerprint } from './fingerprint'
import Mustache from 'mustache'
import { v4 as uuidv4 } from 'uuid'
import { convertUrlToImage } from './puppeteer'
import type { Browser, ScreenshotOptions } from 'puppeteer'

type LocalTemplateOptions = {
  cache?: boolean;
  browser?: Browser
};

export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  }
  catch (e) {
    return false;
  }
};

export const cachedImageName = async (
  templateDir: string,
  values: ParamValues,
  imagePath: string
): Promise<string> => {
  const hash = await imageFingerprint(templateDir, values);
  return Mustache.render(imagePath, { hash });
};

export const createImage = async (
  templateManifestPath: string,
  paramValues: ParamValues,
  resolution: ImageResolution,
  imagePath: string,
  browser: Browser,
  cache?: boolean
): Promise<string> => {
  const templateDir = path.resolve(path.dirname(templateManifestPath));

  if (cache) {
    imagePath = await cachedImageName(templateDir, paramValues, imagePath);
    if (await fileExists(imagePath)) {
      return imagePath;
    }
  }

  const template = await loadLocalTemplate(templateManifestPath);

  await createImageFromTemplate(
    template,
    paramValues,
    resolution,
    imagePath,
    templateDir,
    browser
  );

  return imagePath;
};

export const isLocalResource = (url: string): boolean => {
  const up = url.toLowerCase();
  return (
    !up.startsWith('http://') &&
    !up.startsWith('https://') &&
    !up.startsWith('//') &&
    !up.startsWith('data:') // Data URL
  );
};

const copyLocalResources = async (
  parameters: TemplateParam[],
  values: ParamValues,
  tmpDir: string
): Promise<ParamValues> => {
  const newValues = Object.assign({}, values);
  for (const param of parameters) {
    const value = values[param.name];
    if (param.type === ParamType.ImageUrl && value) {
      const v = paramValueToString(param, value);
      if (isLocalResource(v)) {
        const dest = `${tmpDir}/${uuidv4()}-${path.basename(v)}`;
        await fs.copyFile(v, dest);
        newValues[param.name] = dest;
      }
    }
  }
  return newValues;
};

const isJpeg = (imagePath: string) => (
  imagePath && imagePath.toLowerCase().endsWith('.jpg') || imagePath.toLowerCase().endsWith('.jpeg')
)

export const createImageFromTemplate = async (
  template: ImageTemplate,
  paramValues: ParamValues,
  resolution: ImageResolution,
  imagePath: string,
  resourcePath: string | undefined,
  browser: Browser
): Promise<void> => {
  const htmlPath = await renderLocalTemplate(template, paramValues, resolution, resourcePath);

  await convertUrlToImage(
    `file:///${htmlPath}`, {
      path: imagePath,
      quality: isJpeg(imagePath) ? 80 : undefined,
      fullPage: true
    },
    browser
  );
};

export const createAnyImageFromTemplate = async (
  template: ImageTemplate,
  paramValues: ParamValues,
  resolution: ImageResolution,
  outputOptions: ScreenshotOptions,
  resourcePath: string,
  browser: Browser
): Promise<string | Buffer | void> => {
  const htmlPath = renderLocalTemplate(template, paramValues, resolution, resourcePath);
  return convertUrlToImage(`file:///${htmlPath}`, outputOptions, browser);
};

// Old name
export const compileTemplate = createImageFromTemplate;

/**
 * Turn a template and values into a local HTML file. The resources are copied locally, so the HTML can be opened as is by a browser.
 * @returns The path to the HTML file
 */
export const renderLocalTemplate = async (
  template: ImageTemplate,
  paramValues: ParamValues,
  resolution: ImageResolution,
  resourcePath?: string
): Promise<string> => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resoc-compile-'));

  // Copy extenal resources
  paramValues = await copyLocalResources(template.parameters, paramValues, tmpDir);

  const html = renderTemplateToHtml(template, paramValues, resolution);

  // Write filled template
  const htmlPath = `${tmpDir}/content.html`;
  await fs.writeFile(htmlPath, html);

  // Also copy template resources
  if (resourcePath) {
    await copy(
      resourcePath,
      tmpDir
    );
  }

  return htmlPath;
};
