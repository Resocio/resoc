import clc from 'cli-color'

export const notice = (msg: string) => (
  clc.cyanBright(msg)
);

export const warn = (msg: string) => (
  clc.yellowBright(msg)
);

export const error = (msg: string) => (
  clc.redBright(msg)
);

export const success = (msg: string) => (
  clc.greenBright(msg)
);

export const logDone = () => {
  log(success(`Done!`));
};

export const newLine = () => { console.log() };

export const log = (msg: string) => {
  console.log(msg);
};
