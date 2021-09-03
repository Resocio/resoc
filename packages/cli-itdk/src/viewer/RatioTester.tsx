import React, { useState } from 'react'
import TemplatePreview from './TemplatePreview';
import Form from 'react-bootstrap/Form';
import { ImageTemplate } from '@resoc/core';
import type { ParamValues } from '@resoc/core';

export type RatioTesterProps = {
  width: number;
  template: ImageTemplate;
  parameters: ParamValues;
}

const RatioTester = (props: RatioTesterProps) => {
  const [ratio, setRatio] = useState<number>(1.0);

  return (
    <div>
      <Form.Range
        onChange={e => {
          setRatio(parseFloat(e.target.value));
        }}
        min={0.5}
        max={3.0}
        step={0.1}
        value={ratio}
      />
      <TemplatePreview
        template={props.template}
        parameters={props.parameters}
        width={props.width}
        height={props.width / ratio}
      />
    </div>
  )
};

export default RatioTester;
