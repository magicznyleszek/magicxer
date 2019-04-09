export declare class Mixer {
    /** Returns array of mixes for two given words. */
    mix(stWord: string, ndWord: string): string[];
    /** Removes bad mixes. */
    private cleanup;
    /** Mixes second word syllables into the beginning of first word. */
    private mixBySyllablesJoin;
    /** Wraps first word edge syllables with second word center syllables. */
    private mixBySyllablesWrap;
    /** Twines syllables even/odd. */
    private mixBySyllablesTwine;
    /** Mixes two words by same letters or vowels. */
    private mixBySimilarLetters;
    /** Mixes words by finding single sounding pairs. */
    private mixByCoolPairs;
}
