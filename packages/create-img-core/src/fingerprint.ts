import { ParamValues } from '@resoc/core';
import { hashElement } from 'folder-hash';
import sha256 from 'sha256';

export const imageFingerprint = async (templateDir: string, values: ParamValues): Promise<string> => {
  const hash = await hashElement(templateDir);
  return await sha256(JSON.stringify(hash) + JSON.stringify(values));
};
