import React from 'react';
import { Story, Meta } from '@storybook/react';

import TemplatePreview, { TemplatePreviewProps } from './TemplatePreview';
import { DefaultManifestName, loadRemoteTemplate } from '@resoc/core';

export default {
  title: 'TemplatePreview',
  component: TemplatePreview
} as Meta;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & Story<TemplatePreviewProps>;

const Template: TemplateStory = (args: TemplatePreviewProps, { loaded: { template } }) => (
  <TemplatePreview {...args} template={template} />
);

export const Default = Template.bind({});
Default.loaders = [
  async () => ({
    template: await loadRemoteTemplate(`/${DefaultManifestName}`)
  }),
];
Default.args = {
  width: 500,
  height: 262,
  parameters: {
    mainImageUrl: 'https://resoc.io/assets/img/demo/photos/pexels-photo-371589.jpeg',
    textColor: '#ffffff',
    backgroundColor: '#654789',
    title: 'Some great content here',
    textDirection: 'ltr',
  }
};
