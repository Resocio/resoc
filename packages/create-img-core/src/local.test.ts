import { resolveRelativePath } from "./local"
import path from 'path'

test('resolveRelativePath', () => {
  expect(resolveRelativePath(path.toNamespacedPath(`/path/to/manifest.json`), 'index.html'))
    .toEqual(path.toNamespacedPath('/path/to/index.html'));
});
