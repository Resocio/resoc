import React from 'react';
import { Story, Meta } from '@storybook/react';

import Netlify from './Netlify';

export default {
  title: 'create/Netlify',
  component: Netlify,
} as Meta;

const Template: Story = (args) => (
  <Netlify {...args} />
);

export const Default = Template.bind({});
