import React from 'react'
import { Form } from 'react-bootstrap';
import { ParamType, ParamValue, ParamValues, TemplateParam } from '@resoc/core';
import ParamInput from './ParamInput';

export type TemplateParametersProps = {
  parameters: TemplateParam[];
  values: ParamValues;
  onChange: (newValues: ParamValues) => void;
};

const valueToString = (param: TemplateParam, value: ParamValue): string => (
  (param.type === ParamType.ObjectList) ? JSON.stringify(value) : value.toString()
);

const TemplateParameters = (props: TemplateParametersProps) => {
  return (
    <Form>
      {props.parameters.map(param => (
        <div key={param.name} className="mb-3">
          <ParamInput
            param={param}
            value={valueToString(param, props.values[param.name])}
            onChange={(v) => {
              const newValues = Object.assign({}, props.values);
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
