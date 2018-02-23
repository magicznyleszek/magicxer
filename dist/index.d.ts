declare module "src/components/syllabler/writing" {
    export class Writing {
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
}
declare module "src/components/syllabler/syllabler" {
    export class Syllabler {
        /** Splits a word into an ordered array of syllables. */
        split(word: string): string[];
        /** Splits prefix from first word. */
        private splitPrefix(chunks);
        /** Splits suffix from last word. */
        private splitGeneralSuffix(chunks);
        /** Splits "ckle" and "le" suffixes by some simple logic. */
        private splitCkleLeSuffix(chunks);
        /** Splits 1st and 2nd consonant for multiple in row. */
        private splitByMultipleConsonantsInRow(chunks);
        /** Splits words on consonants surrounded by vowels. */
        private splitBySurroundedConsonants(chunks);
    }
}
declare module "src/components/mixer/mixer" {
    export class Mixer {
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
}
declare module "lib/index" {
    import { Mixer } from "src/components/mixer/mixer";
    export const magicxer: Mixer;
}
