class Mixer {
  private static readonly vovels: string[] = ["a", "e", "i", "o", "u"];

  public mixWords(firstWord: string, secondWord: string): string[] {
    const finalMixes = [];

    for (let stIndex = 0; stIndex < firstWord.length; stIndex++) {
      const stLetter = firstWord[stIndex];

      for (let ndIndex = 0; ndIndex < secondWord.length; ndIndex++) {
        const ndLetter = secondWord[ndIndex];

        if (firstWord.indexOf(ndLetter) !== -1) {
          const beginningPart = firstWord.slice(0, stIndex);
          const endingPart = secondWord.slice(ndIndex, secondWord.length);
          finalMixes.push(beginningPart + endingPart);
        }
      }
    }
    return finalMixes;
  }
}

export const mixer = new Mixer();
