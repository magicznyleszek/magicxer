// this is designed to work with English

class Syllabler {
  // "y" is sometimes vowel and sometimes consonant,
  // for simplicity I assume it's always consonant
  private static readonly vowels: string[] = ["a", "e", "i", "o", "u"];
  private static readonly prefixes: string[] = ["pre", "re", "ab", "un", "in"];
  private static readonly suffixes: string[] = ["ing", "less", "ness"];

  public split(word: string): string[] {
    const syllables = [];

    // 1. Separate prefixes and suffixes from root words.
    // examples:  pre-view, work-ing, re-do, end-less, & out-ing

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

    syllables.push(word);

    return syllables;
  }

  public isVowel(letter: string): boolean {
    return letter.length === 1 && Syllabler.vowels.indexOf(letter) !== -1;
  }

  public isConsonant(letter: string): boolean {
    return letter.length === 1 && !this.isVowel(letter);
  }
}

export const syllabler = new Syllabler();
