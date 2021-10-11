# @resoc/create-img-core

Use this package to turn a template and parameter values to an image.

Install:

```bash
npm install @resoc/create-img-core
```

Then, create an image:

```javascript
createImage(
  'path/to/resoc.manifest.json',
  {
    title: "A picture is worth a thousand words",
    textColor: "#ffffff"
  },
  {
    width: 1200,
    height: 630
  },
  'path/to/output.jpg'
);
```

## Configure Puppeteer

Puppeteer is used under the hood to generate images. You need to configure it depending on your environment.

### Most environments

In most environments, Puppeteer can be used directly. All you need is to install it:

```bash
npm install puppeteer
```

Resoc will just find it and use it.

### AWS Lambda & Netlify

Due to tight memory constraints, certain environments cannot use Puppeteer as is.

Install:

```bash
npm install puppeteer-core chrome-aws-lambda
```

Then, instanciate the browser yourself:

```javascript
const chromium = require('chrome-aws-lambda');

const browser = await chromium.puppeteer.launch({
  executablePath: await chromium.executablePath,
  args: chromium.args,
  headless: chromium.headless
});

createImage(
  'path/to/resoc.manifest.json',
  {
    title: "A picture is worth a thousand words",
    textColor: "#ffffff"
  },
  { width: 1200, height: 630 },
  'path/to/output.jpg',
  { browser }
);
```
