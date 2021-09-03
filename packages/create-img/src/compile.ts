import { loadRemoteTemplate, renderTemplateToHtml } from '@resoc/core'
import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import copy from 'recursive-copy'
import { parseParameters } from './parse-parameters'
import { loadLocalTemplate } from './local'

export const compileTemplate = async (manifestPath: string, params: string[], imagePath: string): Promise<void> => {
  const template = await loadLocalTemplate(manifestPath);

  const paramValues = parseParameters(template.parameters, params);

  const html = renderTemplateToHtml(template, paramValues);

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resoc-compile-'));

  // Write filled template
  const htmlPath = `${tmpDir}/content.html`;
  await fs.writeFile(htmlPath, html);

  // Also copy template resources
  await copy(
    path.resolve(path.dirname(manifestPath)),
    tmpDir
  );

  await urlToImage(
    `file:///${htmlPath}`,
    imagePath
  );
}

export const urlToImage = async (url: string, outputPath: string): Promise<void> => {
  const browser = await puppeteer.launch(
//    {args: ['--no-sandbox', '--disable-setuid-sandbox']}
  );
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
