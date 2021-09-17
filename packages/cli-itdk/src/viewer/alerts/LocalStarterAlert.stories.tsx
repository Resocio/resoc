import React from 'react';
import { Story, Meta } from '@storybook/react';

import LocalStarterAlert, { LocalStarterAlertProps } from './LocalStarterAlert';
import { ParamType } from '@resoc/core';

export default {
  title: 'alerts/LocalStarterAlert',
  component: LocalStarterAlert,
  argTypes: {
    onChange: {
      action: 'clicked'
    }
  }
} as Meta;

const Template: Story<LocalStarterAlertProps> = (args) => <LocalStarterAlert {...args} />;

export const Default = Template.bind({});
Default.args = {
  templateDir: 'path/to/template',
  manifestPath: 'path/to/template/manifest.json'
};
