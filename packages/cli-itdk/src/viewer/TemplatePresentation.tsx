import React, { useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { FacebookOpenGraph, ImageTemplate, ParamValues, TemplateParam, TwitterCard } from '@resoc/core';
import ParamInput from './ParamInput';
import styled from 'styled-components';
import TemplateParameters from './TemplateParameters';
import RichPreview from './RichPreview';
import CreateImage from './create/CreateImage';
import ImageSpecsBasedPreviews from './ImageSpecsBasedPreviews';

export type TemplatePresentationProps = {
  template: ImageTemplate;
  parameters?: TemplateParam[];
  baseUrl?: string;
  values: ParamValues;
  facebookModelUrl?: string;
  twitterModelUrl?: string;
  onChange: (newValues: ParamValues) => void;
};

const Wrapper = styled.div``;

const ParamsContainer = styled.div`
  flex: 1;
  height: 100%;
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
            <ImageSpecsBasedPreviews {...props} />
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
    </Wrapper>
  );
};

export default TemplatePresentation;
