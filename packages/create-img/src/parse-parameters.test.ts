import { ParamType } from "@resoc/core";
import { parseParameters } from "./parse-parameters";

test('parseParameters', () => {
  // Regular
  expect(parseParameters([
    { name: "a", type: ParamType.String, demoValue: "A" },
    { name: "b", type: ParamType.String, demoValue: "B" }
  ], ['a=X', 'b=Y'])).toEqual({
    a: 'X', b: 'Y'
  });

  // Empty value is allowed
  expect(parseParameters([
    { name: "a", type: ParamType.String, demoValue: "A" },
    { name: "b", type: ParamType.String, demoValue: "B" }
  ], ['a=', 'b=Y'])).toEqual({
    a: '', b: 'Y'
  });

  // Json
  expect(parseParameters([
    { name: "str", type: ParamType.String, demoValue: "Hello" },
    { name: "jsn", type: ParamType.ObjectList, demoValue: [ { x: 'x1', y: 'Y2' } ] },
  ], ['str=Bonjour', 'jsn=[ {"a": "7", "b": "X"}, {"a": "2", "b": "9"} ]'])).toEqual({
    str: 'Bonjour', jsn: [
      { a: '7', b: 'X' },
      { a: '2', b: '9' }
    ]
  });

  // Invalid format
  expect(() => parseParameters([
    { name: "a", type: ParamType.String, demoValue: "A" },
    { name: "b", type: ParamType.String, demoValue: "B" }
  ], ['a=X', 'dummy'])).toThrow();
  expect(() => parseParameters([
    { name: "a", type: ParamType.String, demoValue: "A" },
    { name: "b", type: ParamType.String, demoValue: "B" }
  ], ['=X', 'b=Y'])).toThrow();

  // Unknown parameter
  expect(() => parseParameters([
    { name: "a", type: ParamType.String, demoValue: "A" },
    { name: "b", type: ParamType.String, demoValue: "B" }
  ], ['a=X', 'z=Y'])).toThrow();
});
