import React from 'react'
import { Form } from 'react-bootstrap';
import { ParamType, ParamValue, ParamValues, TemplateParam } from '@resoc/core';
import ParamInput from './ParamInput';

export type TemplateParametersProps = {
  parameters: TemplateParam[];
  values: ParamValues;
  onChange: (newValues: ParamValues) => void;
};

const TemplateParameters = (props: TemplateParametersProps) => {
  return (
    <Form>
      {props.parameters.map(param => (
        <div key={param.name} className="mb-3">
          <ParamInput
            param={param}
            value={props.values[param.name]}
            onChange={(v) => {
              const newValues: ParamValues = Object.assign({}, props.values);
              newValues[param.name] = v;
              props.onChange(newValues);
            }}
          />
        </div>
      ))}
    </Form>
  );
}

export default TemplateParameters;
