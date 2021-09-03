import { parseParameters } from "./parse-parameters";

test('parseParameters', () => {
  expect(parseParameters([], ['a=X', 'b=Y'])).toEqual({
    a: 'X', b: 'Y'
  });
  expect(parseParameters([], ['a=', 'b=Y'])).toEqual({
    a: '', b: 'Y'
  });

  expect(() => parseParameters([], ['a=X', 'dummy'])).toThrow();
  expect(() => parseParameters([], ['=X', 'b=Y'])).toThrow();
});
