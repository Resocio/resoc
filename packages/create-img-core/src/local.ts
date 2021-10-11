import { promises as fs } from 'fs'
import path from 'path'
import { ImageTemplate, ParamType, TemplateParam } from "@resoc/core"

export const resolveRelativePath = (manifestPath: string, relativePath: string) => (
  path.resolve(path.dirname(manifestPath), relativePath)
);

export const loadLocalTemplate = async (manifestPath: string): Promise<ImageTemplate> => {
  const manifest = JSON.parse((await fs.readFile(manifestPath)).toString());
  const partials: { [ name: string ]: string } = {};
  for await (let partial of Object.keys(manifest['partials'])) {
    const patialpath = resolveRelativePath(manifestPath, manifest['partials'][partial]);
    partials[partial] = (await fs.readFile(patialpath)).toString();
  }

  const parameters: TemplateParam[] = [];
  manifest['parameters'].forEach((param: any) => {
    parameters.push(param);
  });

  return {
    partials, parameters
  };
};
