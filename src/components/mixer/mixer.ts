import { syllabler } from "../syllabler/syllabler";
import { writing } from "../syllabler/writing";

class Mixer {
  public mixWords(stWord: string, ndWord: string): string[] {
    let finalMixes: string[] = [];
    finalMixes = finalMixes.concat(this.mixBySyllables(stWord, ndWord));
    finalMixes = finalMixes.concat(this.mixBySimilarLetters(stWord, ndWord));
    finalMixes = finalMixes.concat(this.mixByCoolPairs(stWord, ndWord));
    finalMixes = this.cleanup(stWord, ndWord, finalMixes);
    return finalMixes;
  }

  // after everything is done, cleanup bad things
  private cleanup(stWord: string, ndWord: string, mixes: string[]): string[] {
    const cleanMixes = [];
    for (const mix of mixes) {
      // two letters are bad
      // just glueing whole words is bad
      if (mix.length > 2 && mix.length !== (stWord + ndWord).length) {
        cleanMixes.push(mix);
      }
    }
    return cleanMixes;
  }

  private mixBySyllables(stWord: string, ndWord: string): string[] {
    const mixes = [];
    const stSyllables = syllabler.split(stWord);
    const ndSyllables = syllabler.split(ndWord);

    for (let stIndex = 0; stIndex < stSyllables.length; stIndex++) {
      const stSyllable = stSyllables[stIndex];
      for (let ndIndex = 0; ndIndex < ndSyllables.length; ndIndex++) {
        const ndSyllable = ndSyllables[ndIndex];
        mixes.push(
          [
            stSyllables.slice(0, stIndex + 1).join(""),
            ndSyllables.slice(ndIndex).join("")
          ].join("")
        );
      }
    }
    return mixes;
  }

  // we're want to glue togeter parts with the same letter
  // or if both are vovels
  private mixBySimilarLetters(stWord: string, ndWord: string): string[] {
    const mixes = [];
    for (let stIndex = 0; stIndex < stWord.length; stIndex++) {
      const stLetter = stWord[stIndex];
      for (let ndIndex = 0; ndIndex < ndWord.length; ndIndex++) {
        const ndLetter = ndWord[ndIndex];
        if (
          stLetter === ndLetter ||
          (writing.isVowel(stLetter) && writing.isVowel(ndLetter))
        ) {
          mixes.push(
            stWord.slice(0, stIndex) + ndWord.slice(ndIndex, ndWord.length)
          );
        }
      }
    }
    return mixes;
  }

  private mixByCoolPairs(stWord: string, ndWord: string): string[] {
    const mixes = [];
    for (let stIndex = 0; stIndex < stWord.length; stIndex++) {
      const stLetter = stWord[stIndex];
      for (let ndIndex = 0; ndIndex < ndWord.length; ndIndex++) {
        const ndLetter = ndWord[ndIndex];
        if (writing.isSingleSoundPair(stWord[stIndex], ndWord[ndIndex])) {
          mixes.push(stWord.slice(0, stIndex + 1) + ndWord.slice(ndIndex));
        }
      }
    }
    return mixes;
  }
}

export const mixer = new Mixer();
