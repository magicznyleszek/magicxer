export declare class Mixer {
    /** Returns array of mixes for two given words. */
    mix(stWord: string, ndWord: string): string[];
    /** Removes bad mixes. */
    private cleanup(stWord, ndWord, mixes);
    /** Mixes second word syllables into the beginning of first word. */
    private mixBySyllablesJoin(stWord, ndWord);
    /** Wraps first word edge syllables with second word center syllables. */
    private mixBySyllablesWrap(stWord, ndWord);
    /** Twines syllables even/odd. */
    private mixBySyllablesTwine(stWord, ndWord);
    /** Mixes two words by same letters or vowels. */
    private mixBySimilarLetters(stWord, ndWord);
    /** Mixes words by finding single sounding pairs. */
    private mixByCoolPairs(stWord, ndWord);
}
