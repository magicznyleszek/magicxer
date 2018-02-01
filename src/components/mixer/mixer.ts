class Mixer {
  private static readonly vovels: string[] = ["a", "e", "i", "o", "u", "y"];

  public mixWords(firstWord: string, secondWord: string): string[] {
    const finalMixes = [];

    for (let stIndex = 0; stIndex < firstWord.length; stIndex++) {
      const stLetter = firstWord[stIndex];

      for (let ndIndex = 0; ndIndex < secondWord.length; ndIndex++) {
        const ndLetter = secondWord[ndIndex];

        // we're want to glue togeter parts with the same letter
        // or if both are vovels
        if (
          stLetter === ndLetter ||
          (this.isVovel(stLetter) && this.isVovel(ndLetter))
        ) {
          const beginningPart = firstWord.slice(0, stIndex);
          const endingPart = secondWord.slice(ndIndex, secondWord.length);

          // avoid two letter mixes and duplicates
          const merged = beginningPart + endingPart;
          if (merged.length > 2 && finalMixes.indexOf(merged) === -1) {
            finalMixes.push(merged);
          }
        }
      }
    }
    return finalMixes;
  }

  private isVovel(letter: string): boolean {
    return Mixer.vovels.indexOf(letter) !== -1;
  }
}

export const mixer = new Mixer();
