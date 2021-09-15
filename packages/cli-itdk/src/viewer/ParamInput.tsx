import React, { ReactFragment } from 'react'
import { Form } from 'react-bootstrap';
import { paramLabel, ParamValue, parseObjectListValue, TemplateParam } from '@resoc/core';
import { ParamType } from '@resoc/core';

export type ParamInputProps = {
  param: TemplateParam;
  value: string;
  onChange: (value: ParamValue) => void;
};

const ParamInput = (props: ParamInputProps) => {
  let field: ReactFragment;

  switch(props.param.type) {
    case(ParamType.Choice):
      field = (
        <Form.Select
          aria-label={paramLabel(props.param)}
          value={props.value}
          onChange={(e) => {
            // Although e.target is not a FormControlElement, value field *does* exist
            const target: any = e.target;
            props.onChange(target.value);
          }}
        >
          {props.param.values?.map(v =>
            <option key={v.value} value={v.value}>
              {v.label || v.value}
            </option>
          )}
        </Form.Select>
      );
      break;
    case(ParamType.ObjectList):
      field = (
        <Form.Control
          type={toHtmlType(props.param.type)}
          placeholder={props.param.defaultValue?.toString()}
          onChange={(e) => {
            props.onChange(
              parseObjectListValue(e.target.value)
            )
          }}
          value={props.value}
        />
      );
      break;
    case(ParamType.ImageUrl):
    case(ParamType.Color):
    case(ParamType.String):
    default:
      field = (
        <Form.Control
          type={toHtmlType(props.param.type)}
          placeholder={props.param.defaultValue?.toString()}
          onChange={(e) => props.onChange(e.target.value)}
          value={props.value}
        />
      );
  }

  return (
    <Form.Group>
      <Form.Label>{paramLabel(props.param)}</Form.Label>
      {field}
    </Form.Group>
  );
};

const toHtmlType = (type: ParamType): string => {
  switch(type) {
    case(ParamType.ImageUrl):
      return 'url';
    case(ParamType.Color):
      return 'color';
    case(ParamType.String):
    case(ParamType.Choice):
    case(ParamType.ObjectList):
    default:
      return 'text';
  }
};

export default ParamInput;
