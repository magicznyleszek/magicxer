import { Mixer } from "../components/mixer/mixer";
import { Syllabler } from "../components/syllabler/syllabler";

const mixer = new Mixer();
const syllabler = new Syllabler();

const buildMixes = (words: string[]): string[] => {
  let finalMixes: string[] = [];
  words.forEach((word1: string, index1: number) => {
    words.forEach((word2: string, index2: number) => {
      // don't mix word with itself or empty strings
      if (index1 !== index2 && word1.length * word2.length !== 0) {
        finalMixes = finalMixes.concat(mixer.mix(word1, word2));
      }
    });
  });
  return finalMixes;
};

const logInfo = (words: string[]): void => {
  const syllablesLog = [];
  for (const word of words) {
    syllablesLog.push(syllabler.split(word).join("•"));
  }
  console.debug("current syllables", syllablesLog);
};

export const mutations = {
  initializeStore(state: IState): void {
    const storeCache = window.localStorage.getItem("magicxer");
    const cachedStateData = JSON.parse(storeCache || "{}");
    // only load cached data for current version
    if (storeCache && cachedStateData.version === state.version) {
      console.debug("loading cached store…");
      state.words = cachedStateData.words;
      state.mixes = cachedStateData.mixes;
    }
  },
  setWords(state: IState, payload: string[]): void {
    state.words = payload;
    state.mixes = buildMixes(state.words);
    logInfo(state.words);
  }
};
