import React from 'react';
import { Story, Meta } from '@storybook/react';

import TemplatePresentation, { TemplatePresentationProps } from './TemplatePresentation';
import { DefaultManifestName, demoParamValues, loadRemoteTemplate } from '@resoc/core';

export default {
  title: 'TemplatePresentation',
  component: TemplatePresentation,
  argTypes: {
    onChange: {
      action: 'clicked'
    }
  }
} as Meta;

type TemplateStory = {
  loaders?: (() => Promise<any>)[];
} & Story<TemplatePresentationProps>;

const Template: TemplateStory = (args: TemplatePresentationProps, { loaded: { template, parameters, values } }) => (
  <TemplatePresentation {...args} template={template} parameters={parameters} values={values} />
);

export const Default = Template.bind({});
Default.loaders = [
  async () => {
    const template = await loadRemoteTemplate(`/${DefaultManifestName}`);
    const parameters = template.parameters;
    const values = demoParamValues(parameters);

    return {
      template,
      parameters,
      values
    };
  },
];
Default.args = {};
