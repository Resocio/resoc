import { ParamValues } from "@resoc/core"
import { promises as fs } from 'fs'

export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  }
  catch (e) {
    return false;
  }
};

export type ImageData = {
  template: string;
  values: ParamValues;
};

export const initImageDateStorage = async(storagePath: string): Promise<void> => {
  await fs.writeFile(storagePath, JSON.stringify({}));
}

export const storeImageData = async (storagePath: string, slug: string, imageData: ImageData): Promise<void> => {
  if (!await fileExists(storagePath)) {
    await initImageDateStorage(storagePath);
  }

  const storageContent = await fs.readFile(storagePath);
  const storage = JSON.parse(storageContent.toString());

  storage[slug] = imageData;

  return fs.writeFile(storagePath, JSON.stringify(storage));
}

export const getImageData = async (storagePath: string, slug: string): Promise<ImageData | null> => {
  const storageContent = await fs.readFile(storagePath);
  const storage = JSON.parse(storageContent.toString());

  return storage[slug];
}
