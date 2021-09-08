import axios from 'axios';
import Mustache from 'mustache'

export const DefaultManifestName = 'resoc.manifest.json';

const PartialContent = 'content';
const PartialStyles = 'styles';

const HtmlTemplate = `
<html style="width:{{ resoc_imageWidth }}px;height:{{ resoc_imageHeight }}px;font-size:3vw;display:flex;">
  <head>
    <meta name="viewport" content="width={{ resoc_imageWidth }}, initial-scale=1">
  </head>
  <body style="margin:0;display:flex;">
    <style>
      {{> ${PartialStyles}}}
    </style>
    {{> ${PartialContent}}}
  </body>
</html>`;

export enum ParamType {
  String = 'string',
  Color = 'color',
  ImageUrl = 'imageUrl',
  Choice = 'choice'
};

export type ParamChoice = {
  value: string;
  label?: string;
};

export type TemplateParam = {
  name: string;
  label?: string;
  type: ParamType;
  values?: ParamChoice[];
  demoValue: string;
  defaultValue?: string;
};

export interface ImageTemplate {
  partials: { [ name: string ]: string };
  parameters: TemplateParam[];
};

export type ParamValues = { [ name: string ]: string };

export const demoParamValues = (params: TemplateParam[]): ParamValues => {
  const values: ParamValues = {};
  params.forEach(param => {
    values[param.name] = param.demoValue;
  });
  return values;
};

export const renderTemplate = (
  mainTemplate: string,
  template: ImageTemplate,
  parameters: ParamValues,
) => {
  return Mustache.render(mainTemplate, parameters, template.partials);
};

export const renderTemplateToHtml = (template: ImageTemplate, parameters: ParamValues) => (
  renderTemplate(HtmlTemplate, template, parameters)
);

export const parseTemplateManifestParams = (manifest: any): TemplateParam[] => {
  const parameters: TemplateParam[] = [];
  // TODO: Handle error cases: no 'parameters' field, etc.
  manifest['parameters'].forEach((param: any) => {
    parameters.push(param);
  });
  return parameters;
};

/**
 * Throw an error when the value is not correct.
 */
export const validateParamValue = (paramSpec: TemplateParam, paramValue: string) => {
  switch(paramSpec.type) {
    case(ParamType.String):
      return;
    case(ParamType.Color):
      // TODO: Check color format
      return;
    case(ParamType.ImageUrl):
      // TODO: Check basic format
      return;
    case(ParamType.Choice):
      if (paramSpec.values && !paramSpec.values.map(v => v.value).includes(paramValue)) {
        throw `Invalid value "${paramValue}" for ${paramSpec.label }. Must be one of ${paramSpec.values.join(', ')}`;
      }
  }
};

export const paramLabel = (param: TemplateParam): string => (
  // See https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case#answer-4149393
  param.label || param.name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
);
