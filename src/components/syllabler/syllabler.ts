// this is designed to work with English
// inspired by https://www.howmanysyllables.com/divideintosyllables

import { writing } from "./writing";

class Syllabler {
  public split(word: string): string[] {
    // we start with a single chunk
    let chunks: string[] = [word];

    // STEP 1. split suffixes and prefixes (which are always syllables)
    // STEP 1a. prefixes
    chunks = this.splitPrefix(word);
    // STEP 1b. suffixes - we cut the last item from current syllables, and then
    // merge the result back
    const prefixesLeftover = chunks.pop() || "";
    chunks = chunks.concat(this.splitSuffix(prefixesLeftover));

    // STEP 2. apply multiple rules to all chunks
    chunks = this.splitByMultipleConsonantsInRow(chunks);
    chunks = this.splitBySurroundedConsonants(chunks);

    // 3. Is the consonant surrounded by vowels?
    // Does the vowel have a long sound?  (Like the 'i' in line)
    // Divide before the consonant.
    // examples:  ba-by, re-sult, i-vy, fro-zen, & Cu-pid
    // Does the vowel have a short sound?  (Like the 'i' in mill)
    // Divide after the consonant.
    // examples:  met-al, riv-er, mod-el, val-ue, & rav-age

    // 4. Does the word end with 'ckle'?
    // Divide right before the 'le.'
    // examples:  tack-le, freck-le, tick-le, & buck-le

    // 5. Does the word end with 'le' (not 'ckle')?
    // Is the letter before the 'le' a consonant?
    // Divide 1 letter before the 'le.'
    // examples:  ap-ple, rum-ble, fa-ble, & ta-ble
    // Is the letter before the 'le' a vowel?
    // Do nothing.
    // examples:  ale, scale, sale, file, & tile

    // ---

    // There are some syllabification rules that could be used:
    // V CV VC CVC CCV CCCV CVCC
    // *where V is a vowel and C is a consonant. E.g.,
    // pronunciation (5 pro-nun-ci-a-tion; CV-CVC-CV-V-CVC)

    return chunks;
  }

  private splitPrefix(word: string): string[] {
    let workWord = word;
    const stripped = [];

    for (const prefix of writing.getPrefixes()) {
      if (workWord.indexOf(prefix) === 0) {
        workWord = workWord.slice(prefix.length);
        stripped.push(prefix);
      }
    }

    stripped.push(workWord);

    return stripped;
  }

  private splitSuffix(word: string): string[] {
    let workWord = word;
    const stripped = [];

    for (const suffix of writing.getSuffixes()) {
      if (
        workWord.indexOf(suffix) !== -1 &&
        // check it is the end of string
        workWord.indexOf(suffix) === workWord.length - suffix.length &&
        // check if whole word is not suffix already
        workWord !== suffix
      ) {
        workWord = workWord.slice(0, workWord.indexOf(suffix));
        stripped.unshift(suffix);
      }
    }

    stripped.unshift(workWord);

    return stripped;
  }

  // split 1st and 2nd consonant for multiple in row
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
