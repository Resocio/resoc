import React from 'react';
import { Story, Meta } from '@storybook/react';

import StarterAlert, { StarterAlertProps } from './StarterAlert';
import { ParamType } from '@resoc/core';

export default {
  title: 'StarterAlert',
  component: StarterAlert,
  argTypes: {
    onChange: {
      action: 'clicked'
    }
  }
} as Meta;

const Template: Story<StarterAlertProps> = (args) => <StarterAlert {...args} />;

export const Default = Template.bind({});
Default.args = {
  templateDir: 'path/to/template',
  manifestPath: 'path/to/template/manifest.json'
};
