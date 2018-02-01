import { mixer } from "./mixer";

describe("mixer", () => {
  it("should return array of mixes", () => {
    expect(mixer.mixWords("one", "two")).toEqual(["ono"]);
  });
});
