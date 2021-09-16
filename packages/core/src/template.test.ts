import { assignResolutionToParamerters, demoParamValues, paramLabel, ParamType, paramValueToString, parseTemplateManifestParams, renderRawTemplate, stringToParamValue, validateParamValue } from './template'

test('renderRawTemplate', () => {
  expect(renderRawTemplate(
    '# {{> content }} *',{
      partials: { content: 'Hello {{name}}' }, parameters: []
    }, {
      name: 'world'
    }))
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

  validateParamValue({
    name: 'obj', type: ParamType.ObjectList, demoValue: '[ { "a": "1", "b": "2"} ]'
  }, '[ { "x": "1", "y": "2"}, { "a": "98", "b": "99"} ]');

  expect(() => validateParamValue({
    name: 'obj', type: ParamType.ObjectList, demoValue: '[ { "a": "1", "b": "2"} ]'
  }, 'Not JSON...')).toThrowError();
});

test('paramLabel', () => {
  expect(paramLabel({
    name: 'someName', type: ParamType.String, demoValue: 'Foo'
  })).toEqual('Some Name')

  expect(paramLabel({
    label: 'Some Label', name: 'someName', type: ParamType.String, demoValue: 'Foo'
  })).toEqual('Some Label')
});

test('assignResolutionToParamerters', () => {
  expect(assignResolutionToParamerters({
    title: 'Hello'
  }, {
    width: 123,
    height: 456
  })).toEqual({
    title: 'Hello',
    resoc_imageWidth: 123,
    resoc_imageHeight: 456
  });
});

test('stringToParamValue', () => {
  expect(stringToParamValue({
    name: 'someText', type: ParamType.String, demoValue: 'Foo'
  }, 'Lorem ipsum')).toEqual('Lorem ipsum');

  expect(stringToParamValue({
    name: 'theColor', type: ParamType.Color, demoValue: '#456789'
  }, '#abcdef')).toEqual('#abcdef');

  expect(stringToParamValue({
    name: 'country', type: ParamType.Choice, values: [{ value: 'Spain' }, { value: 'France' }], demoValue: 'Spain'
  }, 'France')).toEqual('France');

  expect(() => stringToParamValue({
    name: 'country', type: ParamType.Choice, values: [{ value: 'Spain' }, { value: 'France' }], demoValue: 'Spain'
  }, 'Wakanda')).toThrowError();

  expect(stringToParamValue({
    name: 'obj', type: ParamType.ObjectList, demoValue: '[ { "a": "1", "b": "2"} ]'
  }, '[ { "x": "1", "y": "2"}, { "a": "98", "b": "99"} ]')).toEqual([
    { x: "1", y: "2"}, { a: "98", b: "99"}
  ]);

  expect(() => stringToParamValue({
    name: 'obj', type: ParamType.ObjectList, demoValue: '[ { "a": "1", "b": "2"} ]'
  }, 'Not JSON...')).toThrowError();
});

test('paramValueToString', () => {
  expect(paramValueToString({
    name: 'someText', type: ParamType.String, demoValue: 'Foo'
  }, 'Lorem ipsum')).toEqual('Lorem ipsum');

  expect(paramValueToString({
    name: 'obj', type: ParamType.ObjectList, demoValue: '[ { "a": "1", "b": "2"} ]'
  }, [ { x: "1", y: "2"}, { a: "98", b: "99"} ])).toEqual(
    '[{"x":"1","y":"2"},{"a":"98","b":"99"}]'
  );
});


test('demoParamValues', () => {
  expect(demoParamValues([
    { name: 'obj', type: ParamType.ObjectList, demoValue: [ { a: "1", b: "2"} ] },
    { name: 'txt', type: ParamType.String, demoValue: 'Foo' }
  ])).toEqual({
    txt: 'Foo',
    obj: [ { a: "1", b: "2"} ]
  });
});
