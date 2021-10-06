import Mustache from 'mustache'

export const DefaultManifestName = 'resoc.manifest.json';

const PartialContent = 'content';
const PartialStyles = 'styles';

const HtmlTemplate = `
<html>
  <head>
    <meta name="viewport" content="width={{ resoc_imageWidth }}, initial-scale=1">
  </head>
  <body>
    <style>
      html {
        width: {{ resoc_imageWidth }}px;
        height: {{ resoc_imageHeight }}px;
        font-size: 3vw;
        display: flex;
        align-items: stretch;
        background-color: white;
      }

      body {
        flex: 1 1 0;
        min-width: 0;
        margin: 0;
        display: flex;
        align-items: stretch;
      }

      body > div {
        flex: 1 1 0;
        min-width: 0;
      }
    </style>
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
  Choice = 'choice',
  ObjectList = 'objectList'
};

export type ParamChoice = {
  value: string;
  label?: string;
};

export type ParamValue = string | Object[];

export type TemplateParam = {
  name: string;
  label?: string;
  type: ParamType;
  values?: ParamChoice[];
  demoValue: ParamValue;
  defaultValue?: ParamValue;
};

export interface ImageTemplate {
  partials: { [ name: string ]: string };
  parameters: TemplateParam[];
};

export type ParamValues = { [ name: string ]: ParamValue };

export type ImageResolution = {
  width: number;
  height: number;
};

export const FacebookOpenGraph: ImageResolution = {
  width: 1200,
  height: 630
};

export const TwitterCard: ImageResolution = {
  width: 1500,
  height: 750
};

export const demoParamValues = (params: TemplateParam[]): ParamValues => {
  const values: ParamValues = {};
  params.forEach(param => {
    values[param.name] = param.demoValue;
  });
  return values;
};

export const assignResolutionToParamerters = (values: ParamValues, resolution: ImageResolution) => (
  Object.assign({}, values, {
    resoc_imageWidth: resolution.width,
    resoc_imageHeight: resolution.height
  })
);

export const renderRawTemplate = (
  mainTemplate: string,
  template: ImageTemplate,
  parameters: ParamValues
) => (
  Mustache.render(mainTemplate, parameters, template.partials)
);

export const renderTemplateToHtml = (template: ImageTemplate, parameters: ParamValues, resolution: ImageResolution) => (
  renderRawTemplate(HtmlTemplate, template, assignResolutionToParamerters(parameters, resolution))
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
export const validateParamValue = (param: TemplateParam, value: string) => {
  stringToParamValue(param, value);
};

export const paramLabel = (param: TemplateParam): string => (
  // See https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case#answer-4149393
  param.label || param.name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
);

export const stringToParamValue = (param: TemplateParam, value: string): ParamValue => {
  switch(param.type) {
    case(ParamType.Choice):
      if (param.values && !param.values.map(v => v.value).includes(value)) {
        throw `Invalid value "${value}" for ${param.label }. Must be one of ${param.values.join(', ')}`;
      }
      return value;

    case(ParamType.ObjectList):
      return JSON.parse(value);

    case(ParamType.String):
    case(ParamType.Color): // TODO: Check color format
    case(ParamType.ImageUrl): // TODO: Check basic format
    default:
      return value;
  }
};

export const paramValueToString = (param: TemplateParam, value: ParamValue): string => {
  switch(param.type) {
    case(ParamType.ObjectList):
      return JSON.stringify(value);

    default:
      return value.toString();
  }
};
