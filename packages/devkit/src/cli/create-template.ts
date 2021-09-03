import fs from 'fs/promises'
import copy from 'copy'

export const copyTemplate = async (dir: string): Promise<void> => {
  await fs.mkdir(dir, { recursive: true });

  const templateDir = `${__dirname}/../../starter-templates/basic`;

  return new Promise((accept, reject) => {
    copy(`${templateDir}/*`, dir, (err) => {
      if (err) {
        reject(err);
      }
      accept();
    });
  });
};

export const createTemplate = async (dir: string): Promise<void> => {
  await copyTemplate(dir);
};

export const directoryNotEmpty = async (dir: string): Promise<boolean> => {
  try {
    const stats = await fs.stat(dir);
    if (stats.isDirectory()) {
      const files = await fs.readdir(dir);
      return files.length > 0;
    } else {
      // BEST This is not exactly a directory... maybe this function could be more specific
      return true;
    }
  }
  catch (err) {
    return false;
  }
};
