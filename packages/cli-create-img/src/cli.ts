#!/usr/bin/env node

import path from 'path'
import { program } from 'commander'
import { compileTemplate, loadLocalTemplate, parseParameters } from '@resoc/create-img';

const runCompiler = async () => {
  program
    .name('create-img')
    .description("Create an image based on a Resoc image template")
    .version(require('../package.json').version)
    .argument('[manifest-path]', 'path of the image template manifest', (v, p) => v, './image-template-manifest.json')
    .option('-p, --params <parameters...>', 'parameter values, with <name>=<value> format')
    .option('-o, --output <imagePath>', 'output image file', './output.png')
    .action(async (manifestPath, options) => {
      console.log("Create image...");

      const template = await loadLocalTemplate(manifestPath);
      const paramValues = parseParameters(template.parameters, options.params || []);
      await compileTemplate(template, paramValues, options.output, path.resolve(path.dirname(manifestPath)));

      console.log("Done!");
    });

  program.parse(process.argv);
};

runCompiler();
