import { mixer } from "./mixer";

describe("mixer", () => {
  it("should mix special pairs", () => {
    expect(mixer.mixWords("magic", "mixer")).toEqual(
      expect.arrayContaining(["magicxer"])
    );
  });

  it("should twine words syllables nicely", () => {
    expect(mixer.mixWords("squirrelled", "murderer")).toEqual(
      expect.arrayContaining(["squirdeled"])
    );
    expect(mixer.mixWords("murderer", "squirrelled")).toEqual(
      expect.arrayContaining(["murrelrer"])
    );
  });

  it("should not contain duplicated source words", () => {
    expect(mixer.mixWords("snow", "white")).not.toEqual(
      expect.arrayContaining(["snowsnow"])
    );
  });

  it("should cleanup source words", () => {
    expect(mixer.mixWords("one", "two")).not.toEqual(
      expect.arrayContaining(["one"])
    );
  });

  it("should cleanup short words", () => {
    expect(mixer.mixWords("snow", "white")).not.toEqual(
      expect.arrayContaining(["w"])
    );
  });

  it("should cleanup simple word concating", () => {
    expect(mixer.mixWords("snow", "white")).not.toEqual(
      expect.arrayContaining(["snowwhite"])
    );
  });
});
