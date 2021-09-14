import type { Browser } from 'puppeteer'
import type puppeteer from 'puppeteer'

const defaultLocalBrowser = async (): Promise<Browser> => {
  try {
    const puppeteer = require('puppeteer');
    return await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  catch(e) {
    throw new Error('Cannot find local browser. See https://www.npmjs.com/package/@resoc/create-img#configure-puppeteer');
  };
}

export const convertUrlToImage = async (url: string, outputOptions: puppeteer.ScreenshotOptions, browser?: Browser): Promise<string | void | Buffer> => {
  browser ||= await defaultLocalBrowser();

  const page = await browser.newPage();
  // Wait until there are no network connexion for 500ms
  await page.goto(url, {waitUntil: [
    'networkidle0', 'domcontentloaded', 'load'
  ]});
  const image = await page.screenshot(outputOptions);

  await browser.close();

  return image;
};
