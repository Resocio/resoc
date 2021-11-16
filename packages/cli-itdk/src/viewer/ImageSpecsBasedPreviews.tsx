import { FacebookOpenGraph, ImageTemplate, ParamValues, TwitterCard } from '@resoc/core';
import React from 'react'
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import RichPreview from './RichPreview';

export type ImageSpecsBasedPreviewsProps = {
  template: ImageTemplate;
  baseUrl?: string;
  values: ParamValues;
  facebookModelUrl?: string;
  twitterModelUrl?: string;
};

const PreviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

type PreviewProps = {
  title: string;
  template: ImageTemplate;
  parameters: ParamValues;
  baseUrl?: string;
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
      baseUrl={props.baseUrl}
      width={props.width}
      height={props.height}
      backgroundImageUrl={props.backgroundImageUrl}
    />
  </div>
);

const ImageSpecsBasedPreviews = (props: ImageSpecsBasedPreviewsProps) => {
  return (
    <Card.Body>
      <Card.Title>Previews</Card.Title>

      <PreviewsWrapper>
        <Preview
          title="Facebook"
          template={props.template}
          parameters={props.values}
          baseUrl={props.baseUrl}
          width={FacebookOpenGraph.width}
          height={FacebookOpenGraph.height}
          backgroundImageUrl={props.facebookModelUrl}
        />

        <Preview
          title="Twitter Card"
          template={props.template}
          parameters={props.values}
          baseUrl={props.baseUrl}
          width={TwitterCard.width}
          height={TwitterCard.height}
          backgroundImageUrl={props.twitterModelUrl}
        />
      </PreviewsWrapper>
    </Card.Body>
  );
};

export default ImageSpecsBasedPreviews;
