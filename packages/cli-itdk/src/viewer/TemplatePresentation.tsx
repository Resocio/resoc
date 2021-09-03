import React, { useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { ImageTemplate, ParamValues, TemplateParam } from '@resoc/core';
import ParamInput from './ParamInput';
import TemplatePreview from './TemplatePreview';
import styled from 'styled-components';
import CreateCommandLine from './CreateCommandLine';
import TemplateParameters from './TemplateParameters';

export type TemplatePresentationProps = {
  template: ImageTemplate;
  parameters?: TemplateParam[];
  values: ParamValues;
  onChange: (newValues: ParamValues) => void;
};

const RATIO_FACEBOOK = 1.91;
const RATIO_TWTTER = 2.0;

const WIDTH = 470;

type PreviewProps = {
  title: string;
  template: ImageTemplate;
  parameters: ParamValues;
  ratio: number;
};

const Preview = (props: PreviewProps) => (
  <div>
    <Card.Subtitle>{props.title}</Card.Subtitle>
    <TemplatePreview
      template={props.template}
      parameters={props.parameters}
      width={WIDTH}
      height={WIDTH / props.ratio}
    />
  </div>
);

const Wrapper = styled.div`
`;

const PreviewsParamsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ParamsContainer = styled.div`
  flex: 1;
`;

const PreviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PresCard = styled(Card)`
  height: 100%;
`;

const TemplatePresentation = (props: TemplatePresentationProps) => {
  const parameters = props.parameters || props.template.parameters;

  return (
    <Wrapper>
      <PreviewsParamsWrapper className="mb-3">
        <PresCard>
          <Card.Body>
            <Card.Title>Previews</Card.Title>

            <PreviewsWrapper>
              <Preview
                title="Facebook"
                template={props.template}
                parameters={props.values}
                ratio={RATIO_FACEBOOK}
              />

              <Preview
                title="Twitter Card"
                template={props.template}
                parameters={props.values}
                ratio={RATIO_TWTTER}
              />
            </PreviewsWrapper>
          </Card.Body>
        </PresCard>

        <ParamsContainer>
          <PresCard>
            <Card.Body>
              <Card.Title>Parameters</Card.Title>

              <TemplateParameters
                parameters={parameters}
                values={props.values}
                onChange={(newValues) => {
                  props.onChange(newValues);
                }}
              />
            </Card.Body>
          </PresCard>
        </ParamsContainer>
      </PreviewsParamsWrapper>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            Create an image
          </Card.Title>
          <CreateCommandLine
            template={props.template}
            values={props.values}
          />
        </Card.Body>
      </Card>
    </Wrapper>
  );
};

export default TemplatePresentation;
