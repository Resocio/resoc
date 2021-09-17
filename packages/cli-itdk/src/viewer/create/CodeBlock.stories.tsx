import React from 'react';
import { Story, Meta } from '@storybook/react';

import CodeBlock, { CodeBlockProps } from './CodeBlock';

export default {
  title: 'create/CodeBlock',
  component: CodeBlock,
} as Meta;

const Template: Story<CodeBlockProps> = (args) => (
  <CodeBlock {...args} />
);

export const CommandLine = Template.bind({});
CommandLine.args = {
  code: 'ls -l',
  commandLine: true
};

export const Code = Template.bind({});
Code.args = {
  code: `const doNothing = () => {
  console.log("Done!");
}`
};
