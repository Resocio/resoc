import { ParamType, ParamValues, parseObjectListValue, TemplateParam } from "@resoc/core";

export const parseParameters = (specs: TemplateParam[], args: string[]): ParamValues => {
  const values: ParamValues = {};

  args.forEach(arg => {
    const equal = arg.indexOf('=');
    if (equal <= 0) {
      throw(`Invalid parameter name/value: ${arg}. Expected format is <name>=<value>`); 
    }
    const name = arg.substr(0, equal);
    const value = arg.substr(equal + 1);

    const spec = specs.find(p => p.name === name);
    if (!spec) {
      throw(`Unknown parameter ${name}`);
    }

    values[name] = spec.type === ParamType.ObjectList ? parseObjectListValue(value) : value;
  });

  return values;
};
