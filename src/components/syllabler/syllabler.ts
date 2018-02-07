// this is designed to work with English

class Syllabler {
  // "y" is sometimes vowel and sometimes consonant,
  // for simplicity I assume it's always the latter
  private static readonly vowels: string[] = ["a", "e", "i", "o", "u"];
  private static readonly prefixes: string[] = [
    "ab",
    "dis",
    "down",
    "il",
    "im",
    "in",
    "ir",
    "mega",
    "mid",
    "mis",
    "non",
    "out",
    "over",
    "post",
    "pre",
    "pro",
    "re",
    "semi",
    "sub",
    "tele",
    "un",
    "up"
  ];
  private static readonly suffixes: string[] = [
    "dom",
    "ee",
    "er",
    "ful",
    "hood",
    "ing",
    "ism",
    "ist",
    "less",
    "ment",
    "ness",
    "ship",
    "ty",
    "ward",
    "wards",
    "wise"
  ];
  private static readonly sameSoundConsonants: string[] = [
    "ch",
    "ph",
    "sh",
    "th",
    "th",
    "wh"
  ];

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
    chunks.forEach((chunk: string, index: number) => {
      // skip chunks that are prefixes or suffixes
      if (
        Syllabler.prefixes.indexOf(chunk) === -1 &&
        Syllabler.suffixes.indexOf(chunk) === -1
      ) {
        // STEP 2A. split 1st and 2nd consonant for multiple in row
        let consonantInRow = 0;
        // we start at the end and go backwards (to insert characters and not
        // break the loop)
        for (let i = chunk.length - 1; i >= 0; i--) {
          const letter = chunk[i];
          if (this.isConsonant(letter)) {
            consonantInRow++;
          }

          if (consonantInRow >= 2 && this.isVowel(letter)) {
            const left = chunk.substring(0, i + 2);
            const right = chunk.substring(i + 2);
            chunks.splice(index, 1, left, right);
          }

          // reset counter, because vowel brakes in-row (obviously)
          if (this.isVowel(letter)) {
            consonantInRow = 0;
          }
        }
      }
    });

    // 2. Are two (or more) consonants next to each other?
    // Divide between the 1st and 2nd consonants.
    // examples:  buf-fet, des-sert, ob-ject, ber-ry, & pil-grim
    // Never split 2 consonants that make only 1 sound when pronounced together and aren't the same letter (i.e., 'ff').
    // examples:  th, sh, ph, th, ch, & wh

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

  public isVowel(letter: string): boolean {
    return letter.length === 1 && Syllabler.vowels.indexOf(letter) !== -1;
  }

  public isConsonant(letter: string): boolean {
    return letter.length === 1 && !this.isVowel(letter);
  }

  private insertCharsAt(source: string, index: number, chars: string): string {
    const tempArray = source.split("");
    tempArray.splice(index, 0, chars);
    return tempArray.join("");
  }

  private splitPrefix(word: string): string[] {
    let workWord = word;
    const stripped = [];

    for (const prefix of Syllabler.prefixes) {
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

    for (const suffix of Syllabler.suffixes) {
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
}

export const syllabler = new Syllabler();
