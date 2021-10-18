import { ParamType, ParamValue, paramValueToString, TemplateParam } from '@resoc/core';
import React from 'react'
import CodeBlock from './CodeBlock';
import { CreateImageProps } from './CreateImage';

export type JavaScriptProps = CreateImageProps;

const paramValueToJS = (param: TemplateParam, value: ParamValue): string => {
  const v = paramValueToString(param, value);
  return param.type === ParamType.ObjectList ? v : `'${v.replaceAll("'", "\\'")}'`;
}

const JavaScript = (props: JavaScriptProps) => {
  const code =
`import { FacebookOpenGraph } from '@resoc/core'
import { createImage } from '@resoc/create-img'

createImage(
  '${props.manifestPath}', 
  {
${props.parameters.map(p => `    ${p.name}: ${paramValueToJS(p, props.values[p.name])}`).join(',\n')}
  },
  FacebookOpenGraph,
  'output-image.jpg'
);
`;

  return (
    <div>
      <p>Install Resoc and Puppeteer:</p>
      <CodeBlock commandLine code="npm install @resoc/core @resoc/create-img puppeteer" />

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
