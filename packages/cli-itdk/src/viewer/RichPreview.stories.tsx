import React from 'react';
import { Story, Meta } from '@storybook/react';

import RichPreview, { RichPreviewProps } from './RichPreview';
import { DefaultManifestName, loadRemoteTemplate } from '@resoc/core';

export default {
  title: 'RichPreview',
  component: RichPreview
} as Meta;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & Story<RichPreviewProps>;

const Template: TemplateStory = (args: RichPreviewProps, { loaded: { template } }) => (
  <RichPreview {...args} template={template} />
);

export const Default = Template.bind({});
Default.loaders = [
  async () => ({
    template: await loadRemoteTemplate(`/${DefaultManifestName}`)
  }),
];
Default.args = {
  width: 500,
  height: 300,
  parameters: {
    mainImageUrl: 'https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg',
    textColor: '#ffffff',
    backgroundColor: '#654789',
    title: 'Some great content here',
    textDirection: 'ltr',
  },
  backgroundImageUrl: 'https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg'
};
