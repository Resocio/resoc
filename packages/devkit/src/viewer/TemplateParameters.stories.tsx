import React from 'react';
import { Story, Meta } from '@storybook/react';

import TemplateParameters, { TemplateParametersProps } from './TemplateParameters';
import { ParamType } from '@resoc/core';

export default {
  title: 'TemplateParameters',
  component: TemplateParameters,
  argTypes: {
    onChange: {
      action: 'change'
    }
  }
} as Meta;

const Template: Story<TemplateParametersProps> = (args) => (
  <TemplateParameters {...args} />
);

export const String = Template.bind({});
String.args = {
  parameters: [
    {
      name: 'myParam',
      type: ParamType.String,
      demoValue: "This is some text"
    },
    {
      name: 'myChoiceParam',
      type: ParamType.Choice,
      values: [
        { value: 'first', label: 'First!!' }, { value: 'second', label: 'Second...' }
      ],
      demoValue: "First"
    }    
  ],
  values: {
    myParam: 'Hello!',
    myChoiceParam: 'second'
  }
};
