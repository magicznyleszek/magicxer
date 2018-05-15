// A set of small writing-system related helpers.
// NOTE: this is designed to work with English.

export class Writing {
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
  private static readonly singleSoundConsonantPairs: string[] = [
    "ch",
    "cx",
    "ck",
    "gh",
    "gz",
    "ks",
    "ng",
    "ph",
    "rz",
    "sh",
    "st",
    "sz",
    "th",
    "ts",
    "xs"
  ];

  /** Returns true for vowels. */
  public isVowel(letter: string): boolean {
    return letter.length === 1 && Writing.vowels.indexOf(letter) !== -1;
  }

  /** Returns true for consonants. */
  public isConsonant(letter: string): boolean {
    return letter.length === 1 && !this.isVowel(letter);
  }

  /** Returns true for prefixes. */
  public isPrefix(word: string): boolean {
    return Writing.prefixes.indexOf(word) !== -1;
  }

  /** Returns an array of predefined prefixes. */
  public getPrefixes(): string[] {
    return Writing.prefixes;
  }

  /** Returns true for suffixes. */
  public isSuffix(word: string): boolean {
    return Writing.suffixes.indexOf(word) !== -1;
  }

  /** Returns an array of predefined suffixes. */
  public getSuffixes(): string[] {
    return Writing.suffixes;
  }

  /** Returns true for predefined single sound pairs. */
  public isSingleSoundPair(letterA: string, letterB: string): boolean {
    if (letterA.length !== 1 || letterB.length !== 1) {
      throw new Error("UGH! This function requires letters!");
    }
    return Writing.singleSoundConsonantPairs.indexOf(letterA + letterB) !== -1;
  }

  /** Returns true if word contains any vowel. */
  public hasVowels(word: string): boolean {
    for (const letter of word) {
      if (this.isVowel(letter)) {
        return true;
      }
    }
    return false;
  }

  /** Returns true for valid syllables (~long and with vowels). */
  public isValidSyllable(word: string): boolean {
    // "y" is sometimes a vowel, and in this particular case we can accept that
    return (
      word.length > 1 && (this.hasVowels(word) || word.indexOf("y") !== -1)
    );
  }
}
