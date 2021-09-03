import { paramLabel, ParamType, parseTemplateManifestParams, renderTemplate, validateParamValue } from './template'

test('renderTemplate', () => {
  expect(renderTemplate('# {{> content }} *', { partials: { content: 'Hello {{name}}' }, parameters: [] }, { name: 'world' }))
    .toEqual('# Hello world *');
});

test('parseTemplateManifestParams', () => {
  expect(parseTemplateManifestParams({
    parameters: []
  })).toEqual([]);
  expect(parseTemplateManifestParams({
    parameters: [{
      label: 'P 1',
      name: 'p1',
      type: 'string',
      demoValue: 'Value of P1'
    }]
  })).toEqual([{
    label: 'P 1',
    name: 'p1',
    type: ParamType.String,
    demoValue: 'Value of P1'
  }]);
});

test('validateParamValue', () => {
  validateParamValue({
    name: 'someText', type: ParamType.String, demoValue: 'Foo'
  }, 'Lorem ipsum');

  validateParamValue({
    name: 'theColor', type: ParamType.Color, demoValue: '#456789'
  }, '#abcdef');

  validateParamValue({
    name: 'country', type: ParamType.Choice, values: [{ value: 'Spain' }, { value: 'France' }], demoValue: 'Spain'
  }, 'France');

  expect(() => validateParamValue({
    name: 'country', type: ParamType.Choice, values: [{ value: 'Spain' }, { value: 'France' }], demoValue: 'Spain'
  }, 'Wakanda')).toThrowError();
});

test('paramLabel', () => {
  expect(paramLabel({
    name: 'someName', type: ParamType.String, demoValue: 'Foo'
  })).toEqual('Some Name')

  expect(paramLabel({
    label: 'Some Label', name: 'someName', type: ParamType.String, demoValue: 'Foo'
  })).toEqual('Some Label')
});
