import React, { useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { FacebookOpenGraph, ImageTemplate, ParamValues, TemplateParam, TwitterCard } from '@resoc/core';
import ParamInput from './ParamInput';
import styled from 'styled-components';
import TemplateParameters from './TemplateParameters';
import RichPreview from './RichPreview';
import CreateImage from './create/CreateImage';

export type TemplatePresentationProps = {
  template: ImageTemplate;
  parameters?: TemplateParam[];
  values: ParamValues;
  manifestPath: string;
  facebookModelUrl?: string;
  twitterModelUrl?: string;
  onChange: (newValues: ParamValues) => void;
};

type PreviewProps = {
  title: string;
  template: ImageTemplate;
  parameters: ParamValues;
  backgroundImageUrl?: string;
  width: number;
  height: number;
};

const Preview = (props: PreviewProps) => (
  <div>
    <Card.Subtitle>{props.title}</Card.Subtitle>
    <RichPreview
      template={props.template}
      parameters={props.parameters}
      width={props.width}
      height={props.height}
      backgroundImageUrl={props.backgroundImageUrl}
    />
  </div>
);

const Wrapper = styled.div``;

const ParamsContainer = styled.div`
  flex: 1;
  height: 100%;
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
      <Row className="mb-3">
        <Col md={6}>
          <PresCard>
            <Card.Body>
              <Card.Title>Previews</Card.Title>

              <PreviewsWrapper>
                <Preview
                  title="Facebook"
                  template={props.template}
                  parameters={props.values}
                  width={FacebookOpenGraph.width}
                  height={FacebookOpenGraph.height}
                  backgroundImageUrl={props.facebookModelUrl}
                />

                <Preview
                  title="Twitter Card"
                  template={props.template}
                  parameters={props.values}
                  width={TwitterCard.width}
                  height={TwitterCard.height}
                  backgroundImageUrl={props.twitterModelUrl}
                />
              </PreviewsWrapper>
            </Card.Body>
          </PresCard>
        </Col>

        <Col md={6}>
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
        </Col>
      </Row>

      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            Create an image
          </Card.Title>
          <CreateImage
            parameters={parameters}
            values={props.values}
            manifestPath={props.manifestPath}
          />
        </Card.Body>
      </Card>
    </Wrapper>
  );
};

export default TemplatePresentation;
