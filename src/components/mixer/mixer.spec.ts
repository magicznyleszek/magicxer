import { Mixer } from "./mixer";

const mixer = new Mixer();

describe("mixer", () => {
  it("should mix special pairs", () => {
    expect(mixer.mix("magic", "mixer")).toEqual(
      expect.arrayContaining(["magicxer"])
    );
  });

  it("should twine words syllables nicely", () => {
    expect(mixer.mix("squirrelled", "murderer")).toEqual(
      expect.arrayContaining(["squirdeled"])
    );
    expect(mixer.mix("murderer", "squirrelled")).toEqual(
      expect.arrayContaining(["murrelrer"])
    );
  });

  it("should not contain duplicated source words", () => {
    expect(mixer.mix("snow", "white")).not.toEqual(
      expect.arrayContaining(["snowsnow"])
    );
  });

  it("should cleanup source words", () => {
    expect(mixer.mix("one", "two")).not.toEqual(
      expect.arrayContaining(["one"])
    );
  });

  it("should cleanup short words", () => {
    expect(mixer.mix("snow", "white")).not.toEqual(
      expect.arrayContaining(["w"])
    );
  });

  it("should cleanup simple word concating", () => {
    expect(mixer.mix("snow", "white")).not.toEqual(
      expect.arrayContaining(["snowwhite"])
    );
  });

  it("should not contain words made out of only one of words", () => {
    expect(mixer.mix("error", "human")).not.toEqual(
      expect.arrayContaining(["uman"])
    );
  });
});
