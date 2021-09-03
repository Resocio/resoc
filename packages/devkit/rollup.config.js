import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

import packageJson from "./package.json";

export default {
  input: "./src/cli/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true
    }
  ],
  plugins: [peerDepsExternal(), commonjs(), typescript(), json(), preserveShebangs()]
};
