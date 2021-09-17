import React from 'react';
import { Story, Meta } from '@storybook/react';

import JavaScript, { JavaScriptProps } from './JavaScript';
import { ParamType } from '@resoc/core';

export default {
  title: 'create/JavaScript',
  component: JavaScript,
} as Meta;

const Template: Story<JavaScriptProps> = (args) => (
  <JavaScript {...args} />
);

export const Default = Template.bind({});
Default.args = {
  manifestPath: 'path/to/manifest.json',
  parameters: [
    { name: 'txt', type: ParamType.String, demoValue: 'Foo' },
    { name: 'obj', type: ParamType.ObjectList, demoValue: '[ { "a": "1", "b": "2"} ]' }
  ],
  values: {
    txt: "The image's first parameter",
    obj: [ { x: "1", y: "2"}, { a: "98", b: "99"} ]
  }
};
