import React, { useState } from 'react';
import { ImageTemplate, ParamValues, FacebookOpenGraph, TwitterCard, TemplateParam, paramValueToString, getImageDemoResolution } from '@resoc/core';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import copy from 'copy-text-to-clipboard';
import { CreateImageProps } from './CreateImage';
import CodeBlock from './CodeBlock';

export type CommandLineProps = CreateImageProps;

export const paramValuesToCommandLine = (parameters: TemplateParam[], values: ParamValues): string => (
  parameters.map(p => `${p.name}="${paramValueToString(p, values[p.name]).replaceAll('"', '\\"')}"`).join(' ')
);

const CommandLine = (props: CommandLineProps) => {
  const outputFile = 'output-image.jpg';
  const dims = getImageDemoResolution(props.imageSpecs);

  const commandLine =
    `npx create-img ${props.manifestPath} -o ${outputFile} --params ${paramValuesToCommandLine(props.parameters, props.values)} -w ${dims.width} -h ${dims.height}`;

  return (
    <div>
      <p>Open a shell and run:</p>
      <CodeBlock commandLine code={commandLine} />

      <p>
        Use case: <a href="https://blog.philippebernard.dev/replace-imagemagick-with-html-and-css">
          Replace ImageMagick with HTML &amp; CSS
        </a>
      </p>
    </div>
  );
};

export default CommandLine;
