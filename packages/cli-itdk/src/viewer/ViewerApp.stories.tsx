import React from 'react';
import { Story, Meta } from '@storybook/react';

import ViewerApp, { ViewerAppProps } from './ViewerApp';
import { DefaultManifestName } from '@resoc/core';

export default {
  title: 'ViewerApp',
  component: ViewerApp
} as Meta;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & Story<ViewerAppProps>;

const Template: Story<ViewerAppProps> = (args: ViewerAppProps) => (
  <ViewerApp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  manifestUrl: `/${DefaultManifestName}`
};

export const Broken01 = Template.bind({});
Broken01.args = {
  manifestUrl: '/no-such-manifest.json'
};
