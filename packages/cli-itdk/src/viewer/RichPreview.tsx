import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import ScaledElement from './ScaledElement';
import TemplatePreview, { TemplatePreviewProps } from './TemplatePreview';
import TransparentOverlay from './TransparentOverlay';

export type RichPreviewProps = {
  backgroundImageUrl?: string;
} & TemplatePreviewProps;

const RichPreview = (props: RichPreviewProps) => {
  const [ opacity, setOpacity ] = useState<number>(1);

  return (
    <div>
      {props.backgroundImageUrl && (
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col md={12}>
            <Form.Label>Model</Form.Label>
          </Col>
          <Col md={12}>
            <Form.Range
              value={opacity}
              onChange={e => setOpacity(parseFloat(e.target.value))}
              min={0.0} max={1.0} step={0.02}
            />
          </Col>
          <Col md={12}>
            <Form.Label>Template</Form.Label>
          </Col>
        </Row>
      )}
      <div className="border">
        <ScaledElement>
          <TransparentOverlay {...props} opacity={opacity} backgroundImageUrl={props.backgroundImageUrl}>
            <TemplatePreview {...props} />
          </TransparentOverlay>
        </ScaledElement>
      </div>
    </div>
  )
};

export default RichPreview;
