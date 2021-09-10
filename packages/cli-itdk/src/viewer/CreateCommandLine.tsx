import React, { useState } from 'react';
import { ImageTemplate, ParamValues, FacebookOpenGraph, TwitterCard } from '@resoc/core';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import styled from 'styled-components';
import copy from 'copy-text-to-clipboard';

export type CreateCommandLineProps = {
  manifestPath: string;
  values: ParamValues;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const CommandLineContainer = styled(Form)`
  flex: 1;
`;

const CommandLineBox = styled(Alert)`
  display: flex;
  align-items: flex-start;
`;

const CommandLine = styled.pre`
  white-space: pre-wrap;
  flex: 1;
`;

const CopyButton = styled(Button)`
`;

export const paramValuesToCommandLine = (paramValues: ParamValues): string => (
  Object.keys(paramValues).map(v => `${v}="${paramValues[v]}"`).join(' ')
);

const CreateCommandLine = (props: CreateCommandLineProps) => {
  const [ imageExt, setImageExt ] = useState<'jpg' | 'png'>('jpg');
  const [ platform, setPlatform ] = useState<'facebook' | 'twitter'>('facebook');

  const outputFile = `output-image.${imageExt}`;
  const dims = platform === 'facebook' ? FacebookOpenGraph : TwitterCard;
  const commandLine =
    `npx create-img ${props.manifestPath} -o ${outputFile} --params ${paramValuesToCommandLine(props.values)} -w ${dims.width} -h ${dims.height}`;

  return (
    <Wrapper>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="format">
            Output format
          </Form.Label>
          <Form.Select
            name="format"
            value={imageExt}
            onChange={(e) => {
              // Although e.target is not a FormControlElement, value field *does* exist
              const target: any = e.target;
              setImageExt(target.value);
            }}
          >
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="platform">
            Platform
          </Form.Label>
          <Form.Select
            name="platform"
            value={platform}
            onChange={(e) => {
              const target: any = e.target;
              setPlatform(target.value);
            }}
          >
            <option value="facebook">Facebook Open Graph</option>
            <option value="png">Twitter Card</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <CommandLineContainer>
        <Form.Label>
          Command line
        </Form.Label>
        <CommandLineBox
          className="p-3"
          variant="secondary"
        >
          <CommandLine className="m-0"><span className="text-primary">$</span> {commandLine}</CommandLine>
          <CopyButton
            variant="outline-primary"
            size="sm"
            onClick={() => copy(commandLine)}
          >
            Copy
          </CopyButton>
        </CommandLineBox>
      </CommandLineContainer>
    </Wrapper>
  );
};

export default CreateCommandLine;
