import { getImageDemoResolution, ImageDestination, ParamType, ParamValue, paramValueToString, TemplateParam } from '@resoc/core';
import React from 'react'
import CodeBlock from './CodeBlock';
import { CreateImageProps } from './CreateImage';

export type JavaScriptProps = CreateImageProps;

const paramValueToJS = (param: TemplateParam, value: ParamValue): string => {
  const v = paramValueToString(param, value);
  return param.type === ParamType.ObjectList ? v : `'${v.replaceAll("'", "\\'")}'`;
}

const JavaScript = (props: JavaScriptProps) => {
  let resolutionPackage = '';
  const resolution = getImageDemoResolution(props.imageSpecs);
  let resolutionParam = `{ width: ${resolution.width}, height: ${resolution.height} }`;
  if (props.imageSpecs.destination === ImageDestination.WebPageSocialImage) {
    resolutionPackage = "import { FacebookOpenGraph } from '@resoc/core'\n";
    resolutionParam = 'FacebookOpenGraph';
  }

  const code =
`${resolutionPackage}import { createImage } from '@resoc/create-img'

await createImage(
  '${props.manifestPath}', 
  {
${props.parameters.map(p => `    ${p.name}: ${paramValueToJS(p, props.values[p.name])}`).join(',\n')}
  },
  ${resolutionParam},
  'output-image.jpg'
);
`;

  return (
    <div>
      <p>Install Resoc and Puppeteer:</p>
      <CodeBlock commandLine code="npm install @resoc/core @resoc/create-img" />

      <p>Create an image:</p>
      <CodeBlock code={code} />

      <p>
        Use case: <a href="https://blog.philippebernard.dev/static-automated-social-images-with-nextjs">
          Static, automated social images with NextJS
        </a>
      </p>
    </div>
  );
}

export default JavaScript;
