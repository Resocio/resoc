import { ParamValues, TemplateParam } from '@resoc/core';
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import CreateCommandLine from './CommandLine';
import JavaScript from './JavaScript';

export type CreateImageProps = {
  manifestPath: string;
  parameters: TemplateParam[];
  values: ParamValues;
};

const CreateImage = (props: CreateImageProps) => (
  <Tabs defaultActiveKey="command-line" id="image-creation-target" className="mb-3">
    <Tab eventKey="command-line" title="Command line">
      <CreateCommandLine {...props} />
    </Tab>
    <Tab eventKey="js" title="JavaScript">
      <JavaScript {...props} />
    </Tab>
  </Tabs>
);

export default CreateImage;
