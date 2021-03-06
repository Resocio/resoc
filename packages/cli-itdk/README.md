# Resoc Image Template Development Kit

Generate personalized, content-rich, branded images for social media and other purposes:

- You create an image template using HTML and CSS, *once for all*
- Resoc generates *thousands* of images based on this template

Resoc uses Puppeteer/Chromium to turn your template into regular JPG/PNG images.

## Quick start

    npx itdk init my-new-resoc-template
    # ... and follow the white rabbit

## Features

The features you need to get the job done easily:

- Viewer for OpenGraph/Facebook and Twitter Card images, with auto-reload
- Integrate Resoc to your CI/CD via command line or from your JS code
- Parameter declaration so you clearly define what your template is expecting: a post title, an author profile picture...

## Image templates

Image templates are made of HTML and CSS, with a little bit of Mustache.
Mustache is a simple templating language you use to handle parameters.
For example, if you build a template to create the social images of a blog,
you might take parameters for the title, featured image URL, author's name, etc.

An image template is made of:
- A manifest, named `resoc.manifest.json` by default. This file declares the template parameters.
It also lists the ressources that will be run through Mustache to set parameter values.
- An HTML file, which will be rendered as an image. This file can access parameters via Mustache.
- All other files you need: CSS, JS...

Browse the [starter template](https://github.com/Resocio/resoc/tree/main/packages/cli-itdk/starter-templates/basic) as an example.

## View and debug

You can view a template in action with:

    npx itdk view path/to/resoc.manifest.json

The command opens a browser with the viewer:

![Viewer](./assets/doc/viewer-basic-template.png)

It parses your image template manifest and shows a form, matching the template's parameters.
Edit the values to see the result.

At the bottom of the viewer, a sample command line lets you generate the corresponding image:

![Command line](./assets/doc/generate.png)

## Generate

### Command line

Create images from the command line with `create-img`:

    npm install -g create-img
    create-img path/top/resoc.manifest.json -o output-image.jpg --params title="A picture is worth a thousand words" mainImageUrl="https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg" textColor="#ffffff" backgroundColor="#20552a" -w 1200 -h 630

Note that the viewer displays a sample command line you can copy and edit.

### API

You can call the image generation right from your code. Install the package:

    npm install @resoc/create-img

Then:

    import { compileLocalTemplate } from "@resoc/create-img"

    await compileLocalTemplate(
        'path/to/resoc.manifest.json',
        {
            title: 'A picture is worth a thousand words',
            mainImageUrl: 'https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg',
            textColor: '#ffffff',
            backgroundColor: '#20552a',
            resoc_imageWidth: '1200',
            resoc_imageHeight: '630'
        },
        'output.jpg');
