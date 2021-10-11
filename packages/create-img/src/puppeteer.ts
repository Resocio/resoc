import type { Browser, ScreenshotOptions } from 'puppeteer'
import puppeteer from 'puppeteer'
import createImageCore from '@resoc/create-img-core'

export const puppeteerBrowser = async () => (
  puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
)

export const convertUrlToImage = async (
  url: string,
  outputOptions: ScreenshotOptions,
  browser?: Browser
): Promise<string | void | Buffer> => (
  createImageCore.convertUrlToImage(url, outputOptions, browser || await puppeteerBrowser())
);
