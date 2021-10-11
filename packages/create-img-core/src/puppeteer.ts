import type { Browser, ScreenshotOptions } from 'puppeteer'

export const convertUrlToImage = async (url: string, outputOptions: ScreenshotOptions, browser: Browser): Promise<string | void | Buffer> => {
  const page = await browser.newPage();
  // Wait until there are no network connexion for 500ms
  await page.goto(url, {waitUntil: [
    'networkidle0', 'domcontentloaded', 'load'
  ]});
  const image = await page.screenshot(outputOptions);

  await browser.close();

  return image;
};
