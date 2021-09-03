#!/usr/bin/env node

import { program } from 'commander'
import { compileTemplate } from './compile';

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
      await compileTemplate(manifestPath, options.params || [], options.output);
      console.log("Done!");
    });

  program.parse(process.argv);
};

runCompiler();
