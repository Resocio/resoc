import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

import packageJson from "./package.json";

export default {
  input: "./src/cli.ts",
  output: [
    {
      file: packageJson.bin,
      format: "cjs",
      sourcemap: true
    }
  ],
  plugins: [peerDepsExternal(), commonjs(), typescript(), json(), preserveShebangs()]
};
