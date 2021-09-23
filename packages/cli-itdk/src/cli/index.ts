#!/usr/bin/env node

import path from 'path'
import program from 'commander'
import { copyTemplate, directoryNotEmpty } from './create-template';
import { error, log, logDone, newLine, notice, success, warn } from './log';
import { viewTemplate } from './view-template';
import { DefaultManifestName, FacebookOpenGraph } from '@resoc/core';

const runCommand = async () => {
  program
    .name('itdk')
    .version(require('../../package.json').version);

  let modelOption = new program.Option('-m, --model <model>', 'The model to start from');
  modelOption = modelOption.choices(['basic', 'title-description']);
  modelOption = modelOption.default('basic');

  program
    .command('init [template-dir]')
    .description('Create a new image template')
    .option('-i, --only-init', 'just create the template, do not view it')
    .option('-f, --force', 'create the template, even if the target directory is not empty')
    .addOption(modelOption)
    .action(async (templateDir, args) => {
      const dir = templateDir || '.';
      const dirCaption = templateDir || 'the current directory';
      const manifestOption = `${dir}/${DefaultManifestName}`;
      log(`Create a new image template in ${warn(dirCaption)}`);

      if (!args.force) {
        if (await directoryNotEmpty(dir)) {
          log(error(`Directory ${dir} is not empty`));
          newLine();
          log("If you just want to view an existing template, run:");
          log(warn(`  npx itdk view ${manifestOption}`));
          newLine();
          return;
        }
      }

      await copyTemplate(dir, args.model);
      logDone();
      newLine();

      if (args.onlyInit) {
        log("What to do next:");
        newLine();
        log("  -> View your template and see your changes in real time:");
        log(warn(`     npx itdk view ${manifestOption}`));
        newLine();
        log(`  -> Edit your template files in ${warn(dirCaption)}`);
        newLine();
      } else {
        const path = `${dir}/${DefaultManifestName}`;
        await viewTemplate(path);

        log("Next time you want to work on your template, run:");
        log(warn(`  npx itdk view ${manifestOption}`));
        newLine();
      }
    });

  program
    .command('view [manifest-path]')
    .option('-fm, --facebook-model <path-or-url>', 'display an image below the Facebook template preview')
    .option('-tm, --twitter-model <path-or-url>', 'display an image below the Twitter template preview')
    .description('Display an image template in your browser, and refresh as you edit it')
    .action(async (templatePath, args) => {
      const path = templatePath || `./${DefaultManifestName}`;
      await viewTemplate(path, args.facebookModel, args.twitterModel);
    });

  log(notice('Resoc Image Template Development Kit'));
  newLine();

  program.parse(process.argv);
}

runCommand();
