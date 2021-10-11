import { isLocalResource } from './compile'

test('isLocalResource', () => {
  expect(isLocalResource('http://example.com/image.png')).toBeFalsy();
  expect(isLocalResource('HTTPS://example.com/image.png')).toBeFalsy();
  expect(isLocalResource('my/image.png')).toBeTruthy();
  expect(isLocalResource('../image.png')).toBeTruthy();
  expect(isLocalResource('C:\\docs\\image.png')).toBeTruthy();
  expect(isLocalResource('/home/me/image.png')).toBeTruthy();
  expect(isLocalResource('/home/me/image.png')).toBeTruthy();
  expect(isLocalResource('data:image/jpeg;base64,abcdef')).toBeFalsy();
});
