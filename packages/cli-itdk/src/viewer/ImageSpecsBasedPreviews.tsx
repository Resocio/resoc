import { FacebookOpenGraph, getImageRatio, getImageSpecs, ImageDestination, ImageTemplate, ParamValues, TwitterCard } from '@resoc/core';
import React, { ReactFragment } from 'react'
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
  title?: string;
  template: ImageTemplate;
  parameters: ParamValues;
  baseUrl?: string;
  backgroundImageUrl?: string;
  width: number;
  height: number;
};

const Preview = (props: PreviewProps) => (
  <div>
    {props.title && (
      <Card.Subtitle>{props.title}</Card.Subtitle>
    )}
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
  const imageSpecs = getImageSpecs(props.template);

  let previews: ReactFragment;
  let mainTitle: string;

  if (imageSpecs.destination === ImageDestination.WebPageSocialImage) {
    mainTitle = 'Previews';
    previews = (
      <>
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
      </>
    );
  } else if (imageSpecs.destination === ImageDestination.TwitterBanner) {
    mainTitle = 'Twitter banner';
    const height = 600;
    previews = (
      <Preview
        template={props.template}
        parameters={props.values}
        baseUrl={props.baseUrl}
        width={height * (getImageRatio(imageSpecs) || 3.0)}
        height={height}
      />
    );
  } else {
    // TODO: Take real specs into account
    mainTitle = 'Preview';
    previews = (
      <Preview
        template={props.template}
        parameters={props.values}
        baseUrl={props.baseUrl}
        width={FacebookOpenGraph.width}
        height={FacebookOpenGraph.height}
        backgroundImageUrl={props.facebookModelUrl}
      />
    );
  }

  return (
    <Card.Body>
      <Card.Title>{mainTitle}</Card.Title>

      <PreviewsWrapper>
        {previews}
      </PreviewsWrapper>
    </Card.Body>
  );
};

export default ImageSpecsBasedPreviews;
