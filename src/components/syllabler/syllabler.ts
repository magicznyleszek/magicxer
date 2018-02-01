// this is designed to work with English

class Syllabler {
  private static readonly vovels: string[] = ["a", "e", "i", "o", "u", "y"];

  public split(word: string): string[] {
    const syllables = [];

    syllables.push(word);

    return syllables;
  }

  public isVovel(letter: string): boolean {
    return letter.length === 1 && Syllabler.vovels.indexOf(letter) !== -1;
  }

  public isConsonant(letter: string): boolean {
    return letter.length === 1 && Syllabler.vovels.indexOf(letter) === -1;
  }
}

export const syllabler = new Syllabler();
