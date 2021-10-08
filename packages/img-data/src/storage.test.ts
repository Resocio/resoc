import { getImageData, initImageDateStorage, storeImageData } from "./storage";
import os from 'os'

test('Storage', async () => {
  const sp = `${os.tmpdir()}/the_test_sorage.json`;
  const firstPageValues = {
    template: 't1',
    values: { a: '1', b: '2' }
  };
  const secondPageValues = {
    template: 't1',
    values: { c: '8', d: '9' }
  };

  await initImageDateStorage(sp);
  expect(await getImageData(sp, 'first-page')).toBeFalsy();
  expect(await getImageData(sp, 'second-page')).toBeFalsy();
  
  await storeImageData(sp, 'first-page', firstPageValues);
  expect(await getImageData(sp, 'first-page')).toEqual(firstPageValues);
  expect(await getImageData(sp, 'second-page')).toBeFalsy();

  await storeImageData(sp, 'second-page', secondPageValues);
  expect(await getImageData(sp, 'first-page')).toEqual(firstPageValues);
  expect(await getImageData(sp, 'second-page')).toEqual(secondPageValues);

  await initImageDateStorage(sp);
  expect(await getImageData(sp, 'first-page')).toBeFalsy();
  expect(await getImageData(sp, 'second-page')).toBeFalsy();
});
