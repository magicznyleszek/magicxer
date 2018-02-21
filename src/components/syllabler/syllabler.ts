// this is designed to work with English
// inspired by https://www.howmanysyllables.com/divideintosyllables

import { writing } from "./writing";

class Syllabler {
  /** Splits a word into an ordered array of syllables. */
  public split(word: string): string[] {
    // we start with a single chunk
    let chunks: string[] = [word];

    // NOTE: order of these is probably important and delicate
    chunks = this.splitPrefix(chunks);
    chunks = this.splitCkleLeSuffix(chunks);
    chunks = this.splitGeneralSuffix(chunks);
    chunks = this.splitByMultipleConsonantsInRow(chunks);
    chunks = this.splitBySurroundedConsonants(chunks);

    return chunks;
  }

  /** Splits prefix from first word. */
  private splitPrefix(chunks: string[]): string[] {
    const workWord = chunks[0];
    for (const prefix of writing.getPrefixes()) {
      if (workWord.indexOf(prefix) === 0) {
        chunks.shift();
        chunks.unshift(
          workWord.slice(0, prefix.length),
          workWord.slice(prefix.length)
        );
        break;
      }
    }
    return chunks;
  }

  /** Splits suffix from last word. */
  private splitGeneralSuffix(chunks: string[]): string[] {
    const workWord = chunks[chunks.length - 1];
    if (workWord) {
      for (const suffix of writing.getSuffixes()) {
        if (
          workWord.indexOf(suffix) !== -1 &&
          // check it is the end of string
          workWord.indexOf(suffix) === workWord.length - suffix.length &&
          // check if whole word is not suffix already
          workWord !== suffix
        ) {
          chunks.pop();
          chunks.push(workWord.slice(0, workWord.indexOf(suffix)));
          chunks.push(workWord.slice(workWord.indexOf(suffix)));
          break;
        }
      }
    }
    return chunks;
  }

  /** Splits "ckle" and "le" suffixes by some simple logic. */
  private splitCkleLeSuffix(chunks: string[]): string[] {
    const workWord = chunks[chunks.length - 1];

    // we're only interested in words ending with -le
    if (workWord && workWord.slice(workWord.length - "le".length) === "le") {
      let lettersToCut = 0;
      // for -ckle we cut "le"
      if (workWord.slice(workWord.length - "ckle".length) === "ckle") {
        lettersToCut = 2;
      } else if (
        workWord.length >= 3 &&
        writing.isConsonant(workWord[workWord.length - 3])
      ) {
        lettersToCut = 3;
      }

      if (lettersToCut) {
        chunks.pop();
        chunks.push(workWord.slice(0, workWord.length - lettersToCut));
        chunks.push(workWord.slice(workWord.length - lettersToCut));
      }
    }
    return chunks;
  }

  /** Splits 1st and 2nd consonant for multiple in row. */
  private splitByMultipleConsonantsInRow(chunks: string[]): string[] {
    chunks.forEach((chunk: string, index: number) => {
      // skip chunks that are prefixes or suffixes
      if (writing.isPrefix(chunk) || writing.isSuffix(chunk)) {
        return;
      }

      let consonantsInRow = 0;
      let lettersSinceSplit = 0;
      // we start at the end and go backwards (to split without breaking loop)
      for (let i = chunk.length - 1; i >= 0; i--) {
        const letter = chunk[i];
        if (writing.isConsonant(letter)) {
          consonantsInRow++;
        }
        lettersSinceSplit++;

        if (consonantsInRow >= 2 && (writing.isVowel(letter) || i === 0)) {
          // we should split between 1st and 2nd consonant in whole group,
          // but if current letter is a vowel, we need to move the split
          let splitIndex = i + 1;
          if (writing.isVowel(letter)) {
            splitIndex += 1;
          }

          // split current chunk
          const left = chunk.substring(0, splitIndex);
          const right = chunk.substring(
            splitIndex,
            splitIndex + lettersSinceSplit
          );

          // check if both parts are valid to be split
          if (
            writing.isValidSyllable(left) &&
            writing.isValidSyllable(right) &&
            !writing.isSingleSoundPair(left[left.length - 1], right[0])
          ) {
            chunks.splice(index, 1, left, right);
            lettersSinceSplit = 0;
          }
        }

        // reset counter, because vowel brakes in-row-count (obviously)
        if (writing.isVowel(letter)) {
          consonantsInRow = 0;
        }
      }
    });
    return chunks;
  }

  /** Splits words on consonants surrounded by vowels. */
  private splitBySurroundedConsonants(chunks: string[]): string[] {
    chunks.forEach((chunk: string, index: number) => {
      // skip chunks that are prefixes or suffixes
      if (writing.isPrefix(chunk) || writing.isSuffix(chunk)) {
        return;
      }

      let lettersSinceSplit = 0;
      // we start at the end and go backwards (to split without breaking loop)
      for (let i = chunk.length - 1; i >= 0; i--) {
        const letter = chunk[i];
        lettersSinceSplit++;

        if (
          // we omit first and last letters, as the can't be surrounded :)
          i !== 0 &&
          i !== chunk.length - 1 &&
          writing.isConsonant(letter) &&
          writing.isVowel(chunk[i - 1]) &&
          writing.isVowel(chunk[i + 1])
        ) {
          // split current chunk
          const left = chunk.substring(0, i);
          const right = chunk.substring(i, i + lettersSinceSplit);

          // check if both parts are valid to be split
          if (
            writing.isValidSyllable(left) &&
            writing.isValidSyllable(right) &&
            !writing.isSingleSoundPair(left[left.length - 1], right[0])
          ) {
            chunks.splice(index, 1, left, right);
            lettersSinceSplit = 0;
          }
        }
      }
    });
    return chunks;
  }
}

export const syllabler = new Syllabler();
