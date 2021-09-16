import path from "path";
import { promises as fs } from 'fs'
import os from 'os'
import { log, newLine, notice, success, warn } from "./log";
import opener from 'opener'
import WebSocket from 'ws';
import watch from 'node-watch'
import express from "express";
import serveStatic from "serve-static";
import { isAbsoluteUrl } from "@resoc/core";

const FACEBOOK_MODEL_PREFIX = 'facebook-model-42ffe6-';
const TWITTER_MODEL_PREFIX  = 'twitter-model-ae29c0-';

const rawModuleUrlToViewerUrl = (modelUrl: string | undefined, prefix: string) => {
  if (!modelUrl) {
    return null;
  }

  return isAbsoluteUrl(modelUrl) ? modelUrl : modelUrlToFileName(modelUrl, prefix);
};

const modelUrlToFileName = (modelUrl: string | undefined, prefix: string): string | null => (
  modelUrl ? `${prefix}-${path.basename(modelUrl)}` : null
);

export const viewTemplate = async (manifestPath: string, facebookModelUrl?: string, twitterModelUrl?: string) => {
  const viewerDir = path.normalize(`${__dirname}/../../viewer`);
  manifestPath = path.normalize(manifestPath);
  const manifestName = path.basename(manifestPath);
  const templateDir = path.dirname(manifestPath);
  const serverDir = await fs.mkdtemp(path.join(os.tmpdir(), 'resoc-view-server-'));

  const port = 8080;
  const siteUrl = `http://localhost:${port}/`;

  console.log('Start server');

  // Web server
  const app = express();
  app.set('etag', false);
  app.use(function (req, res, next) {
    if (req.url && req.url === '/env.json') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        manifestPath: manifestPath.replace(/\\/g, '/'),
        templateDir,
        manifestName,
        facebookModelUrl: rawModuleUrlToViewerUrl(facebookModelUrl, FACEBOOK_MODEL_PREFIX),
        twitterModelUrl: rawModuleUrlToViewerUrl(twitterModelUrl, TWITTER_MODEL_PREFIX),
      }));
      return;
    }

    next();
  });

  // Facebook and Twitter models
  app.use(function (req, res, next) {
    if (facebookModelUrl && req?.url === `/${modelUrlToFileName(facebookModelUrl, FACEBOOK_MODEL_PREFIX)}`) {
      res.sendFile(path.resolve(facebookModelUrl));
      return;
    }

    if (twitterModelUrl && req?.url === `/${modelUrlToFileName(twitterModelUrl, TWITTER_MODEL_PREFIX)}`) {
      res.sendFile(path.resolve(twitterModelUrl));
      return;
    }

    next();
  });

  app.use(serveStatic(viewerDir));
  app.use(serveStatic(templateDir));
  app.listen(port);

  // Changes
  const notifyChange = changeNotificationServer();
  watch(templateDir, { recursive: true }, (evt, name) => {
    log('Template changed, reload...');
    notifyChange();
  });

  log(success('Done!') + ' Template available at ' + warn(siteUrl));
  newLine();
  log(`Edit your template files in ${warn(templateDir)} and see the changes in real time`);
  newLine();

  opener(siteUrl);
};

type Notify = () => void;

const changeNotificationServer = (): Notify => {
  let currentWs: WebSocket | null = null;

  const wss = new WebSocket.Server({
    port: 6789
  });

  wss.on('connection', (ws) => {
    currentWs = ws;
  });

  return () => {
    if (currentWs) {
      currentWs.send("Update");
    }
  };
};
