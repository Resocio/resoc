import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import ScaledElement from './ScaledElement';

export default {
  title: 'ScaledElement',
  component: ScaledElement,
} as ComponentMeta<typeof ScaledElement>;

const Template: ComponentStory<typeof ScaledElement> = (args) => (
  <div style={{ width: 700 }}>
    <ScaledElement {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <div style={{
      width: 1200,
      height: 630,
      backgroundColor: '#abcdef',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontSize: '100px'
      }}>
        This is some big content!
      </h1>
    </div>
  )
};
