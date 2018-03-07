import * as packageJsonData from "../../package.json";

const version = (packageJsonData as any).version;

export const state: IState = {
  version: version,
  words: [],
  mixes: []
};
