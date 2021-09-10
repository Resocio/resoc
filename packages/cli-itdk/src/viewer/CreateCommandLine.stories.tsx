import React from 'react';
import { Story, Meta } from '@storybook/react';

import CreateCommandLine, { CreateCommandLineProps } from './CreateCommandLine';

export default {
  title: 'CreateCommandLine',
  component: CreateCommandLine,
} as Meta;

const Template: Story<CreateCommandLineProps> = (args) => (
  <CreateCommandLine {...args} />
);

export const Default = Template.bind({});
Default.args = {
  manifestPath: 'path/to/manifest.json',
  values: {
    first: 'The first parameter',
    second: 'The second parameter'
  }
};
