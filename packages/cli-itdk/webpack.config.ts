import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration & { static: string};
}

const configuration: Configuration = {
  entry: "./src/viewer/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "viewer"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
  },
  plugins: [new ForkTsCheckerWebpackPlugin()]
};

export default configuration;
