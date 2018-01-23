import { mixer } from "../components/mixer";

const buildMixes = (beginnings: string[], endings: string[]): string[] => {
  let finalMixes: string[] = [];
  for (const beginning of beginnings) {
    for (const ending of endings) {
      finalMixes = finalMixes.concat(mixer.mixWords(beginning, ending));
    }
  }
  console.log("buildMixes", beginnings, endings, finalMixes);
  return finalMixes;
};

export const mutations = {
  setBeginnings(state: IState, payload: string[]): void {
    state.beginnings = payload;
    state.mixes = buildMixes(state.beginnings, state.endings);
  },
  setEndings(state: IState, payload: string[]): void {
    state.endings = payload;
    state.mixes = buildMixes(state.beginnings, state.endings);
  }
};
