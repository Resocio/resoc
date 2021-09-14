import { getParamValues, initParamValuesStorage, storeParamValues } from "./storage";
import os from 'os'

test('Storage', async () => {
  const sp = `${os.tmpdir()}/the_test_sorage.json`;
  const firstPageValues = { a: '1', b: '2' };
  const secondPageValues = { c: '8', d: '9' };

  await initParamValuesStorage(sp);
  expect(await getParamValues(sp, 'first-page')).toBeFalsy();
  expect(await getParamValues(sp, 'second-page')).toBeFalsy();
  
  await storeParamValues(sp, 'first-page', firstPageValues);
  expect(await getParamValues(sp, 'first-page')).toEqual(firstPageValues);
  expect(await getParamValues(sp, 'second-page')).toBeFalsy();

  await storeParamValues(sp, 'second-page', secondPageValues);
  expect(await getParamValues(sp, 'first-page')).toEqual(firstPageValues);
  expect(await getParamValues(sp, 'second-page')).toEqual(secondPageValues);

  await initParamValuesStorage(sp);
  expect(await getParamValues(sp, 'first-page')).toBeFalsy();
  expect(await getParamValues(sp, 'second-page')).toBeFalsy();
});
