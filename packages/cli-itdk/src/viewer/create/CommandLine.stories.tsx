import React from 'react';
import { Story, Meta } from '@storybook/react';

import CommandLine, { CommandLineProps } from './CommandLine';
import { ParamType } from '@resoc/core';

export default {
  title: 'create/CommandLine',
  component: CommandLine,
} as Meta;

const Template: Story<CommandLineProps> = (args) => (
  <CommandLine {...args} />
);

export const Default = Template.bind({});
Default.args = {
  manifestPath: 'path/to/manifest.json',
  parameters: [
    { name: 'txt', type: ParamType.String, demoValue: 'Foo' },
    { name: 'obj', type: ParamType.ObjectList, demoValue: '[ { "a": "1", "b": "2"} ]' }
  ],
  values: {
    txt: 'The first parameter',
    obj: [ { x: "1", y: "2"}, { a: "98", b: "99"} ]
  }
};
