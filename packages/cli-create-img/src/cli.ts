#!/usr/bin/env node

import path from 'path'
import { program } from 'commander'
import { compileTemplate, loadLocalTemplate, parseParameters } from '@resoc/create-img';
import { FacebookOpenGraph } from '@resoc/core';

const runCompiler = async () => {
  program
    .name('create-img')
    .description("Create an image based on a Resoc image template")
    .version(require('../package.json').version)
    .argument('[manifest-path]', 'path of the image template manifest', (v, p) => v, './image-template-manifest.json')
    .option('-w, --width <width>', 'output image width', FacebookOpenGraph.width.toString())
    .option('-h, --height <height>', 'output image height', FacebookOpenGraph.height.toString())
    .option('-p, --params <parameters...>', 'parameter values, with <name>=<value> format')
    .option('-o, --output <imagePath>', 'output image file', './output.png')
    .action(async (manifestPath, options) => {
      console.log("Create image...");

      const template = await loadLocalTemplate(manifestPath);
      const paramValues = parseParameters(template.parameters, options.params || []);
      await compileTemplate(
        template,
        paramValues,
        { width: options.width, height: options.height },
        options.output,
        path.resolve(path.dirname(manifestPath))
      );

      console.log("Done!");
    });

  program.parse(process.argv);
};

runCompiler();
