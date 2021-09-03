import React from 'react';
import { Story, Meta } from '@storybook/react';

import ParamInput, { ParamInputProps } from './ParamInput';
import { ParamType } from '@resoc/core';

export default {
  title: 'ParamInput',
  component: ParamInput,
  argTypes: {
    onChange: {
      action: 'clicked'
    }
  }
} as Meta;

const Template: Story<ParamInputProps> = (args, { loaded: { template } }) => (
  <ParamInput {...args} />
);

export const String = Template.bind({});
String.args = {
  param: {
    name: 'myParam',
    type: ParamType.String,
    demoValue: "This is some text"
  }
};

export const Choice = Template.bind({});
Choice.args = {
  param: {
    name: 'myChoiceParam',
    type: ParamType.Choice,
    values: [
      { value: 'first', label: 'First!!' }, { value: 'second', label: 'Second...' }
    ],
    demoValue: "First"
  }
};
