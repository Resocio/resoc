import { resolveRelativeUrl } from './remote'

test('resolveRelativeUrl', () => {
  expect(resolveRelativeUrl('../target', 'http://example.com/path/to/page.html'))
    .toEqual('http://example.com/path/target');
  expect(resolveRelativeUrl('https://absolute.com/the/target', 'http://example.com/path/to/page.html'))
    .toEqual('https://absolute.com/the/target');
  /*
  // This test won't work without a jsdom environment. Just skip it for now.
  expect(resolveRelativeUrl('../target', '/path/to/page.html'))
    .toEqual('/path/target');
  */
});
