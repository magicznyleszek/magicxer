export declare class Syllabler {
    /** Splits a word into an ordered array of syllables. */
    split(word: string): string[];
    /** Splits prefix from first word. */
    private splitPrefix;
    /** Splits suffix from last word. */
    private splitGeneralSuffix;
    /** Splits "ckle" and "le" suffixes by some simple logic. */
    private splitCkleLeSuffix;
    /** Splits 1st and 2nd consonant for multiple in row. */
    private splitByMultipleConsonantsInRow;
    /** Splits words on consonants surrounded by vowels. */
    private splitBySurroundedConsonants;
}
