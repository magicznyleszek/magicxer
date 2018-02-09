import { syllabler } from "./syllabler";

const examples = [
  { in: "analogous", out: ["anal", "o", "gous"] },
  { in: "antarctic", out: ["ant", "arc", "tic"] },
  { in: "anyplace", out: ["any", "place"] },
  { in: "bachelor", out: ["bach", "e", "lor"] },
  { in: "betrayal", out: ["be", "tray", "al"] },
  { in: "coalesce", out: ["co", "a", "lesce"] },
  { in: "cornstarch", out: ["corn", "starch"] },
  { in: "defrayal", out: ["de", "fray", "al"] },
  { in: "despair", out: ["de", "spair"] },
  { in: "echelon", out: ["ech", "e", "lon"] },
  { in: "extremely", out: ["ex", "treme", "ly"] },
  { in: "forewarn", out: ["fore", "warn"] },
  { in: "foreword", out: ["fore", "word"] },
  { in: "genuine", out: ["gen", "u", "ine"] },
  { in: "hearken", out: ["hear", "ken"] },
  { in: "homologous", out: ["ho", "mol", "o", "gous"] },
  { in: "mastodon", out: ["mast", "odon"] },
  { in: "mountainous", out: ["moun", "tain", "ous"] },
  { in: "portrayal", out: ["por", "tray", "al"] },
  { in: "riffraff", out: ["riff", "raff"] },
  { in: "sophisticated", out: ["so", "phis", "ti", "cat", "ed"] },
  { in: "squirmed", out: ["squirmed"] },
  { in: "supremely", out: ["su", "preme", "ly"] },
  { in: "toothaches", out: ["tooth", "aches"] },
  { in: "villainous", out: ["vil", "lain", "ous"] },
  { in: "whimsical", out: ["whim", "si", "cal"] }
];

describe("syllabler", () => {
  describe("split method", () => {
    it("should separate prefixes from root word", () => {
      expect(syllabler.split("able")).toEqual(["ab", "le"]);
      expect(syllabler.split("poster")).toEqual(["post", "er"]);
      expect(syllabler.split("preview")).toEqual(["pre", "view"]);
      expect(syllabler.split("redo")).toEqual(["re", "do"]);
    });

    it("should separate suffixes from root word", () => {
      expect(syllabler.split("endless")).toEqual(["end", "less"]);
      expect(syllabler.split("fullness")).toEqual(["full", "ness"]);
      expect(syllabler.split("outing")).toEqual(["out", "ing"]);
      expect(syllabler.split("weightless")).toEqual(["weight", "less"]);
      expect(syllabler.split("working")).toEqual(["work", "ing"]);
    });

    it("should split 1st and 2nd consonant for multiple in row", () => {
      expect(syllabler.split("berry")).toEqual(["ber", "ry"]);
      expect(syllabler.split("buffet")).toEqual(["buf", "fet"]);
      expect(syllabler.split("dessert")).toEqual(["des", "sert"]);
      expect(syllabler.split("object")).toEqual(["ob", "ject"]);
      expect(syllabler.split("pilgrim")).toEqual(["pil", "grim"]);
      expect(syllabler.split("shriek")).toEqual(["shriek"]);
      expect(syllabler.split("squirrel")).toEqual(["squir", "rel"]);
    });

    it("should never split to invalid syllables", () => {
      // "gst" has no vowels
      expect(syllabler.split("angst")).toEqual(["angst"]);
      // "ry" has an allowed "y"-vowel
      expect(syllabler.split("berry")).toEqual(["ber", "ry"]);
    });

    it("should never split 2 consonants that make single sound", () => {
      expect(syllabler.split("butcher")).toEqual(["butch", "er"]);
      expect(syllabler.split("marshal")).toEqual(["mar", "shal"]);
      expect(syllabler.split("threshold")).toEqual(["tresh", "old"]);
      expect(syllabler.split("witchcraft")).toEqual(["witch", "craft"]);
    });

    // true syllables are somehow harder to do:
    // Does the vowel have a long sound? Divide before the consonant.
    // Does the vowel have a short sound? Divide after the consonant.
    it("should divide before consonant if it is surrounded by vowels", () => {
      expect(syllabler.split("cupid")).toEqual(["cu", "pid"]);
      expect(syllabler.split("frozen")).toEqual(["fro", "zen"]);
    });

    it("should divide properly -ckle endings", () => {
      expect(syllabler.split("buckle")).toEqual(["buck", "le"]);
      expect(syllabler.split("freckle")).toEqual(["freck", "le"]);
      expect(syllabler.split("tackle")).toEqual(["tack", "le"]);
      expect(syllabler.split("tickle")).toEqual(["tick", "le"]);
    });

    it("should divide properly -le (but not -ckle) endings", () => {
      // Is the letter before the 'le' a consonant?
      // Divide 1 letter before the 'le.'
      expect(syllabler.split("apple")).toEqual(["ap", "ple"]);
      expect(syllabler.split("fable")).toEqual(["fa", "ble"]);
      expect(syllabler.split("rumble")).toEqual(["rum", "ble"]);
      expect(syllabler.split("table")).toEqual(["ta", "ble"]);
      // Is the letter before the 'le' a vowel?
      // Do nothing.
      expect(syllabler.split("ale")).toEqual(["ale"]);
      expect(syllabler.split("file")).toEqual(["file"]);
      expect(syllabler.split("sale")).toEqual(["sale"]);
      expect(syllabler.split("scale")).toEqual(["scale"]);
      expect(syllabler.split("tile")).toEqual(["tile"]);
    });
  });
});
