// NOTE: for building NPM module _only_

const path = require("path");

module.exports = {
  entry: "./lib/index.ts",
  module: {
    rules: [
      {
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.module.json"
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  output: {
    filename: "./dist/index.js",
    libraryTarget: "commonjs",
    library: "magicxer"
  }
};
