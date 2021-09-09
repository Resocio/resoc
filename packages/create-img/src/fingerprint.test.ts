import { imageFingerprint } from "./fingerprint";

test('templateFingerprint', async () => {
  const t1 = './assets/templates/t1';
  const t2 = './assets/templates/t2';
  const p1 = { a: 'A' };
  const p2 = { a: 'B' };

  const t1p1 = await imageFingerprint(t1, p1);
  expect(t1p1.length).toEqual(8);

  const t1p1Twice = await imageFingerprint(t1, p1);
  expect(t1p1Twice).toEqual(t1p1);

  const t2p1 = await imageFingerprint(t2, p1);
  expect(t2p1).not.toEqual(t1p1);

  const t1p2 = await imageFingerprint(t1, p2);
  expect(t1p2).not.toEqual(t1p1);
  expect(t1p2).not.toEqual(t2p1);
});
