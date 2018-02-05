import { syllabler } from "./syllabler";

const examples = [
  { in: "mountainous", out: ["moun", "tain", "ous"] },
  { in: "villainous", out: ["vil", "lain", "ous"] },
  { in: "betrayal", out: ["be", "tray", "al"] },
  { in: "defrayal", out: ["de", "fray", "al"] },
  { in: "portrayal", out: ["por", "tray", "al"] },
  { in: "hearken", out: ["hear", "ken"] },
  { in: "extremely", out: ["ex", "treme", "ly"] },
  { in: "supremely", out: ["su", "preme", "ly"] },
  { in: "toothaches", out: ["tooth", "aches"] },
  { in: "bachelor", out: ["bach", "e", "lor"] },
  { in: "echelon", out: ["ech", "e", "lon"] },
  { in: "riffraff", out: ["riff", "raff"] },
  { in: "analogous", out: ["anal", "o", "gous"] },
  { in: "homologous", out: ["ho", "mol", "o", "gous"] },
  { in: "genuine", out: ["gen", "u", "ine"] },
  { in: "anyplace", out: ["any", "place"] },
  { in: "coalesce", out: ["co", "a", "lesce"] },
  { in: "forewarn", out: ["fore", "warn"] },
  { in: "foreword", out: ["fore", "word"] },
  { in: "despair", out: ["de", "spair"] },
  { in: "antarctic", out: ["ant", "arc", "tic"] },
  { in: "cornstarch", out: ["corn", "starch"] },
  { in: "mastodon", out: ["mast", "odon"] },
  { in: "squirmed", out: ["squirmed"] }
];

describe("syllabler", () => {
  describe("split method", () => {
    it("should separate prefixes from root word", () => {
      expect(syllabler.split("preview")).toEqual(["pre", "view"]);
      expect(syllabler.split("redo")).toEqual(["re", "do"]);
      expect(syllabler.split("able")).toEqual(["ab", "le"]);
      expect(syllabler.split("postproduction")).toEqual([
        "post",
        "pro",
        "duc",
        "tion"
      ]);
    });

    it("should separate suffixes from root word", () => {
      expect(syllabler.split("working")).toEqual(["work", "ing"]);
      expect(syllabler.split("outing")).toEqual(["out", "ing"]);
      expect(syllabler.split("endless")).toEqual(["end", "less"]);
      expect(syllabler.split("fullness")).toEqual(["full", "ness"]);
      expect(syllabler.split("weightlessness")).toEqual([
        "weight",
        "less",
        "ness"
      ]);
    });

    it("should split 1st and 2nd consonant for multiple in row", () => {
      expect(syllabler.split("buffet")).toEqual(["buf", "fet"]);
      expect(syllabler.split("dessert")).toEqual(["des", "sert"]);
      expect(syllabler.split("object")).toEqual(["ob", "ject"]);
      expect(syllabler.split("berry")).toEqual(["ber", "ry"]);
      expect(syllabler.split("pilgrim")).toEqual(["pil", "grim"]);
    });

    it("should never split 2 consonants that make single sound, unless same letter", () => {
      // ?
    });

    it("should divide before consonant if it is surrounded by vowels", () => {
      expect(syllabler.split("baby")).toEqual(["ba", "by"]);
      expect(syllabler.split("result")).toEqual(["re", "sult"]);
      expect(syllabler.split("ivy")).toEqual(["i", "vy"]);
      expect(syllabler.split("frozen")).toEqual(["fro", "zen"]);
      expect(syllabler.split("cupid")).toEqual(["cu", "pid"]);
    });

    it("xxx", () => {
      // ?
    });
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
  });

  describe("vowel consonant checking methods", () => {
    it("should identify vowels", () => {
      const vowels = ["a", "e", "i", "o", "u"];
      for (const vowel of vowels) {
        expect(syllabler.isVowel(vowel)).toBeTruthy();
      }
    });

    it("should identify consonants", () => {
      const consonants = [
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
      ];
      for (const consonant of consonants) {
        expect(syllabler.isConsonant(consonant)).toBeTruthy();
      }
    });
  });
});
