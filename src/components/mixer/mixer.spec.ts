import { mixer } from "./mixer";

describe("mixer", () => {
  it("should return array of mixes", () => {
    expect(mixer.mixWords("one", "two")).toEqual(["ono"]);
  });

  it("should mix special pairs", () => {
    expect(
      mixer.mixWords("magic", "mixer").indexOf("magicxer") !== -1
    ).toBeTruthy();
  });
});
