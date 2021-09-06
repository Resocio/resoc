import { ImageTemplate, loadRemoteTemplate, ParamValues, renderTemplateToHtml } from '@resoc/core'
import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import copy from 'recursive-copy'
import { loadLocalTemplate } from './local'

export const compileLocalTemplate = async (templateManifestPath: string, paramValues: ParamValues, imagePath: string): Promise<void> => {
  const template = await loadLocalTemplate(templateManifestPath);

  return compileTemplate(
    template,
    paramValues,
    imagePath,
    path.resolve(path.dirname(templateManifestPath))
  );
};

export const compileTemplate = async (template: ImageTemplate, paramValues: ParamValues, imagePath: string, resourcePath?: string): Promise<void> => {
  const html = renderTemplateToHtml(template, paramValues);

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
