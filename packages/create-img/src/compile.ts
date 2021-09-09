import { ImageTemplate, ImageResolution, loadRemoteTemplate, ParamValues, renderTemplateToHtml } from '@resoc/core'
import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import copy from 'recursive-copy'
import { loadLocalTemplate } from './local'
import { imageFingerprint } from './fingerprint'
import Mustache from 'mustache'

type LocalTemplateOptions = {
  cache: boolean;
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

export const cachedImageName = async (templateDir: string, values: ParamValues, imagePath: string): Promise<string> => {
  const hash = await imageFingerprint(templateDir, values);
  return Mustache.render(imagePath, { hash });
};

export const compileLocalTemplate = async (
  templateManifestPath: string,
  paramValues: ParamValues,
  resolution: ImageResolution,
  imagePath: string,
  options?: LocalTemplateOptions
): Promise<string> => {
  options = Object.assign({}, {
    cache: false
  }, options);

  const templateDir = path.resolve(path.dirname(templateManifestPath));

  if (options.cache) {
    imagePath = await cachedImageName(templateDir, paramValues, imagePath);
    if (await fileExists(imagePath)) {
      return imagePath;
    }
  }

  const template = await loadLocalTemplate(templateManifestPath);

  await compileTemplate(
    template,
    paramValues,
    resolution,
    imagePath,
    templateDir
  );

  return imagePath;
};

export const compileTemplate = async (template: ImageTemplate, paramValues: ParamValues, resolution: ImageResolution, imagePath: string, resourcePath?: string): Promise<void> => {
  const html = renderTemplateToHtml(template, paramValues, resolution);

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resoc-compile-'));

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

  await urlToImage(
    `file:///${htmlPath}`,
    imagePath
  );
}

export const urlToImage = async (url: string, outputPath: string): Promise<void> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Wait until there are no network connexion for 500ms
  await page.goto(url, {waitUntil: [
    'networkidle0', 'domcontentloaded', 'load'
  ]});
  const output = outputPath;
  await page.screenshot({
    path: output,
    fullPage: true
  });

  await browser.close();
};
