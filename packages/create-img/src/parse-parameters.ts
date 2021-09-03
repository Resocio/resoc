import { ParamValues, TemplateParam } from "@resoc/core";

export const parseParameters = (specs: TemplateParam[], args: string[]): ParamValues => {
  const values: ParamValues = {};

  args.forEach(arg => {
    const equal = arg.indexOf('=');
    if (equal <= 0) {
      throw(`Invalid parameter name/value: ${arg}. Expected format is <name>=<value>`); 
    }
    values[arg.substr(0, equal)] = arg.substr(equal + 1);
  });

  return values;
};
