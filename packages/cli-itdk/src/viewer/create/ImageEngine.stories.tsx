import React from 'react';
import { Story, Meta } from '@storybook/react';

import ImageEngine from './ImageEngine';

export default {
  title: 'create/ImageEngine',
  component: ImageEngine,
} as Meta;

const Template: Story = (args) => (
  <ImageEngine {...args} />
);

export const Default = Template.bind({});
