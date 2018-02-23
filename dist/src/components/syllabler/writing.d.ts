export declare class Writing {
    private static readonly vowels;
    private static readonly prefixes;
    private static readonly suffixes;
    private static readonly singleSoundConsonantPairs;
    /** Returns true for vowels. */
    isVowel(letter: string): boolean;
    /** Returns true for consonants. */
    isConsonant(letter: string): boolean;
    /** Returns true for prefixes. */
    isPrefix(word: string): boolean;
    /** Returns an array of predefined prefixes. */
    getPrefixes(): string[];
    /** Returns true for suffixes. */
    isSuffix(word: string): boolean;
    /** Returns an array of predefined suffixes. */
    getSuffixes(): string[];
    /** Returns true for predefined single sound pairs. */
    isSingleSoundPair(letterA: string, letterB: string): boolean;
    /** Returns true if word contains any vowel. */
    hasVowels(word: string): boolean;
    /** Returns true for valid syllables (~long and with vowels). */
    isValidSyllable(word: string): boolean;
}
