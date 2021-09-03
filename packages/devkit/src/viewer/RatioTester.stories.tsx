import React from 'react';
import { Story, Meta } from '@storybook/react';

import RatioTester, { RatioTesterProps } from './RatioTester';
import { DefaultManifestName, loadRemoteTemplate } from '@resoc/core';

export default {
  title: 'RatioTester',
  component: RatioTester
} as Meta;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & Story<RatioTesterProps>;

const Template: TemplateStory = (args, { loaded: { template } }) => (
  <RatioTester {...args} template={template} />
);

export const Default = Template.bind({});
Default.loaders = [
  async () => ({
    template: await loadRemoteTemplate(`/${DefaultManifestName}`)
  }),
];
Default.args = {
  width: 500,
  parameters: {
    mainImageUrl: 'https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg',
    textColor: '#ffffff',
    backgroundColor: '#654789',
    title: 'Some great content here',
    textDirection: 'ltr',
  }
};
