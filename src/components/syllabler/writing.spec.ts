import { writing } from "./writing";

describe("writing", () => {
  it("should identify vowels", () => {
    for (const vowel of ["a", "e", "i", "o", "u"]) {
      expect(writing.isVowel(vowel)).toBeTruthy();
      expect(writing.isConsonant(vowel)).toBeFalsy();
    }
  });

  it("should identify words with vowels", () => {
    expect(writing.hasVowels("church")).toBeTruthy();
    expect(writing.hasVowels("sequoia")).toBeTruthy();
    expect(writing.hasVowels("dry")).toBeFalsy();
    expect(writing.hasVowels("syzygy")).toBeFalsy();
    expect(writing.hasVowels("nth")).toBeFalsy();
    expect(writing.hasVowels("tsktsks")).toBeFalsy();
    expect(writing.hasVowels("pfft")).toBeFalsy();
  });

  it("should identify consonants", () => {
    for (const consonant of [
      "b",
      "c",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "m",
      "n",
      "p",
      "q",
      "r",
      "s",
      "t",
      "v",
      "w",
      "x",
      "y",
      "z"
    ]) {
      expect(writing.isConsonant(consonant)).toBeTruthy();
      expect(writing.isVowel(consonant)).toBeFalsy();
    }
  });

  it("should require syllables to have vowels and at least 2 letters", () => {
    expect(writing.isValidSyllable("au")).toBeTruthy();
    expect(writing.isValidSyllable("low")).toBeTruthy();
    expect(writing.isValidSyllable("t")).toBeFalsy();
    expect(writing.isValidSyllable("rsh")).toBeFalsy();
  });

  it("should be able to return array of predefined prefixes", () => {
    expect(writing.getPrefixes()).toEqual(expect.arrayContaining(["post"]));
  });

  it("should be able to return array of predefined suffixes", () => {
    expect(writing.getSuffixes()).toEqual(expect.arrayContaining(["ing"]));
  });
});
