import { Syllabler } from "../syllabler/syllabler";
import { Writing } from "../syllabler/writing";

const syllabler = new Syllabler();
const writing = new Writing();

export class Mixer {
  /** Returns array of mixes for two given words. */
  public mix(stWord: string, ndWord: string): string[] {
    let finalMixes: string[] = [];
    finalMixes = finalMixes.concat(this.mixBySyllablesJoin(stWord, ndWord));
    finalMixes = finalMixes.concat(this.mixBySyllablesWrap(stWord, ndWord));
    finalMixes = finalMixes.concat(this.mixBySyllablesTwine(stWord, ndWord));
    finalMixes = finalMixes.concat(this.mixBySimilarLetters(stWord, ndWord));
    finalMixes = finalMixes.concat(this.mixByCoolPairs(stWord, ndWord));
    finalMixes = this.cleanup(stWord, ndWord, finalMixes);
    return finalMixes;
  }

  /** Removes bad mixes. */
  private cleanup(stWord: string, ndWord: string, mixes: string[]): string[] {
    const cleanMixes = [];
    for (const mix of mixes) {
      // two letters are bad
      // just glueing whole words is bad
      // source words are bad, duplicated too
      if (
        mix.length > 2 &&
        mix.length !== (stWord + ndWord).length &&
        mix !== stWord &&
        mix !== ndWord
      ) {
        cleanMixes.push(mix);
      }
    }
    return cleanMixes;
  }

  /** Mixes second word syllables into the beginning of first word. */
  private mixBySyllablesJoin(stWord: string, ndWord: string): string[] {
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

  /** Wraps first word edge syllables with second word center syllables. */
  private mixBySyllablesWrap(stWord: string, ndWord: string): string[] {
    const mixes = [];
    const stSyllables = syllabler.split(stWord);
    const ndSyllables = syllabler.split(ndWord);

    if (stSyllables.length >= 3 && ndSyllables.length >= 3) {
      mixes.push(
        [
          stSyllables[0],
          ndSyllables.slice(1, ndSyllables.length - 2).join(""),
          stSyllables[stSyllables.length - 1]
        ].join("")
      );
    }

    return mixes;
  }

  /** Twines syllables even/odd. */
  private mixBySyllablesTwine(stWord: string, ndWord: string): string[] {
    const mixes = [];
    const stSyllables = syllabler.split(stWord);
    const ndSyllables = syllabler.split(ndWord);

    if (stSyllables.length >= 2 && ndSyllables.length >= 2) {
      const twine = [];
      for (let index = 0; index < stSyllables.length; index++) {
        if (index % 2 === 0) {
          twine.push(stSyllables[index]);
        } else {
          twine.push(ndSyllables[index]);
        }
      }
      mixes.push(twine.join(""));
    }

    return mixes;
  }

  /** Mixes two words by same letters or vowels. */
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

  /** Mixes words by finding single sounding pairs. */
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
