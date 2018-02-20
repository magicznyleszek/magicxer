import { mixer } from "../components/mixer/mixer";

const buildMixes = (words: string[]): string[] => {
  let finalMixes: string[] = [];
  words.forEach((word1: string, index1: number) => {
    words.forEach((word2: string, index2: number) => {
      // don't mix word with itself
      if (index1 !== index2) {
        finalMixes = finalMixes.concat(mixer.mixWords(word1, word2));
      }
    });
  });
  return finalMixes;
};

export const mutations = {
  setWords(state: IState, payload: string[]): void {
    state.words = payload;
    state.mixes = buildMixes(state.words);
  }
};
