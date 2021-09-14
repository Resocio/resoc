#!/usr/bin/env node

import path from 'path'
import { program } from 'commander'
import { cachedImageName, createImageFromTemplate, fileExists, loadLocalTemplate, parseParameters } from '@resoc/create-img';
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
    .option('-c, --cache', 'Create the image only if needed. When using this option, use an output file name such as "my-image-{{ hash }}.png"', false)
    .action(async (manifestPath, options) => {
      console.log("Create image...");

      const template = await loadLocalTemplate(manifestPath);
      const paramValues = parseParameters(template.parameters, options.params || []);
      const templateDir = path.resolve(path.dirname(manifestPath));

      let imagePath = options.output;

      if (options.cache) {
        imagePath = await cachedImageName(templateDir, paramValues, imagePath);
        if (await fileExists(imagePath)) {
          console.log(`Image ${imagePath} already exists, do nothing`);
          return;
        }
      }

      await createImageFromTemplate(
        template,
        paramValues,
        { width: options.width, height: options.height },
        imagePath,
        templateDir
      );

      console.log("Done!");
    });

  program.parse(process.argv);
};

runCompiler();
