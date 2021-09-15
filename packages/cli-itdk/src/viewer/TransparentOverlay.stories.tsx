import React from 'react';
import { Story, Meta } from '@storybook/react';

import TransparentOverlay, { TransparentOverlayProps } from './TransparentOverlay';
import { ParamType } from '@resoc/core';

export default {
  title: 'TransparentOverlay',
  component: TransparentOverlay,
} as Meta;

const Template: Story<TransparentOverlayProps> = (args, { loaded: { template } }) => (
  <TransparentOverlay {...args} />
);

export const Default = Template.bind({});
Default.args = {
  width: 300,
  height: 200,
  backgroundImageUrl: 'https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg',
  opacity: 0.7,
  children: (
    <div style={{ width: '300px', height: '200px', backgroundColor: '#abcdef' }} />
  )
};
