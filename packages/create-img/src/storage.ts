import { ImageTemplate, ParamValues } from "@resoc/core"
import { promises as fs } from 'fs'
import { fileExists } from './compile';

export const initParamValuesStorage = async(storagePath: string): Promise<void> => {
  await fs.writeFile(storagePath, JSON.stringify({}));
}

export const storeParamValues = async (storagePath: string, slug: string, values: ParamValues): Promise<void> => {
  if (!await fileExists(storagePath)) {
    initParamValuesStorage(storagePath);
  }

  const storageContent = await fs.readFile(storagePath);
  const storage = JSON.parse(storageContent.toString());

  storage[slug] = values;

  fs.writeFile(storagePath, JSON.stringify(storage));
}

export const getParamValues = async (storagePath: string, slug: string): Promise<ParamValues | null> => {
  const storageContent = await fs.readFile(storagePath);
  const storage = JSON.parse(storageContent.toString());

  return storage[slug];
}
