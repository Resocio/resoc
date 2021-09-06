#!/usr/bin/env node

import path from 'path'
import program from 'commander'
import { copyTemplate, directoryNotEmpty } from './create-template';
import { error, log, logDone, newLine, notice, success, warn } from './log';
import { viewTemplate } from './view-template';
import { compileTemplate, loadLocalTemplate, parseParameters } from '@resoc/create-img';
import { DefaultManifestName } from '@resoc/core';

const runCommand = async () => {
  program
    .name('itdk')
    .version(require('../../package.json').version);

  program
    .command('init [template-dir]')
    .description('Create a new image template')
    .option('-i, --only-init', 'just create the template, do not view it')
    .option('-f, --force', 'create the template, even if the target directory is not empty')
    .action(async (templateDir, args) => {
      const dir = templateDir || '.';
      const dirCaption = templateDir || 'the current directory';
      const manifestOption = `${templateDir}/${DefaultManifestName}`;
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

      await copyTemplate(dir);
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
    .description('Display an image template in your browser, and refresh as you edit it')
    .action(async (templatePath, args) => {
      const path = templatePath || `./${DefaultManifestName}`;
      await viewTemplate(path);
    });

  program
    .command('create [manifest-path]')
    .description('Create and image base on an image template')
    .option('-p, --params <parameters...>', 'Parameter values, with <name>=<value> format')
    .option('-o, --output <imagePath>', 'Output image file', './output.png')
    .action(async (manifestPath, options) => {
      log(warn(`Creating image ${options.output} based on template ${manifestPath}`));
      const template = await loadLocalTemplate(manifestPath);
      const paramValues = parseParameters(template.parameters, options.params);
      await compileTemplate(
        template, paramValues, options.output, path.resolve(path.dirname(manifestPath))
      );
      logDone();
    });

  log(notice('Resoc Image Template Development Kit'));
  newLine();

  program.parse(process.argv);
}

runCommand();
