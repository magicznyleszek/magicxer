// a set og small writing-system related helpers

// this is designed to work with English

class Writing {
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
    "sh",
    "th",
    "ts",
    "xs"
  ];

  public isVowel(letter: string): boolean {
    return letter.length === 1 && Writing.vowels.indexOf(letter) !== -1;
  }

  public isConsonant(letter: string): boolean {
    return letter.length === 1 && !this.isVowel(letter);
  }

  public isPrefix(word: string): boolean {
    return Writing.prefixes.indexOf(word) !== -1;
  }

  public getPrefixes(): string[] {
    return Writing.prefixes;
  }

  public isSuffix(word: string): boolean {
    return Writing.suffixes.indexOf(word) !== -1;
  }

  public getSuffixes(): string[] {
    return Writing.suffixes;
  }

  public isSingleSoundPair(letterA: string, letterB: string): boolean {
    if (letterA.length !== 1 || letterB.length !== 1) {
      throw new Error("UGH! This function requires letters!");
    }
    return Writing.singleSoundConsonantPairs.indexOf(letterA + letterB) !== -1;
  }

  public hasVowels(word: string): boolean {
    for (const letter of word) {
      if (this.isVowel(letter)) {
        return true;
      }
    }
    return false;
  }

  public isValidSyllable(word: string): boolean {
    // "y" is sometimes a vowel, and in this particular case we can accept that
    return (
      word.length > 1 && (this.hasVowels(word) || word.indexOf("y") !== -1)
    );
  }
}

export const writing = new Writing();
