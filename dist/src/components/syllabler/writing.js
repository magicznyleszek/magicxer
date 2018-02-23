"use strict";
// a set og small writing-system related helpers
Object.defineProperty(exports, "__esModule", { value: true });
// this is designed to work with English
var Writing = /** @class */ (function () {
    function Writing() {
    }
    /** Returns true for vowels. */
    Writing.prototype.isVowel = function (letter) {
        return letter.length === 1 && Writing.vowels.indexOf(letter) !== -1;
    };
    /** Returns true for consonants. */
    Writing.prototype.isConsonant = function (letter) {
        return letter.length === 1 && !this.isVowel(letter);
    };
    /** Returns true for prefixes. */
    Writing.prototype.isPrefix = function (word) {
        return Writing.prefixes.indexOf(word) !== -1;
    };
    /** Returns an array of predefined prefixes. */
    Writing.prototype.getPrefixes = function () {
        return Writing.prefixes;
    };
    /** Returns true for suffixes. */
    Writing.prototype.isSuffix = function (word) {
        return Writing.suffixes.indexOf(word) !== -1;
    };
    /** Returns an array of predefined suffixes. */
    Writing.prototype.getSuffixes = function () {
        return Writing.suffixes;
    };
    /** Returns true for predefined single sound pairs. */
    Writing.prototype.isSingleSoundPair = function (letterA, letterB) {
        if (letterA.length !== 1 || letterB.length !== 1) {
            throw new Error("UGH! This function requires letters!");
        }
        return Writing.singleSoundConsonantPairs.indexOf(letterA + letterB) !== -1;
    };
    /** Returns true if word contains any vowel. */
    Writing.prototype.hasVowels = function (word) {
        for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
            var letter = word_1[_i];
            if (this.isVowel(letter)) {
                return true;
            }
        }
        return false;
    };
    /** Returns true for valid syllables (~long and with vowels). */
    Writing.prototype.isValidSyllable = function (word) {
        // "y" is sometimes a vowel, and in this particular case we can accept that
        return (word.length > 1 && (this.hasVowels(word) || word.indexOf("y") !== -1));
    };
    // "y" is sometimes vowel and sometimes consonant,
    // for simplicity I assume it's always the latter
    Writing.vowels = ["a", "e", "i", "o", "u"];
    Writing.prefixes = [
        "ab",
        "dis",
        "down",
        "il",
        "im",
        "in",
        "ir",
        "mega",
        "mid",
        "mis",
        "non",
        "out",
        "over",
        "post",
        "pre",
        "pro",
        "re",
        "semi",
        "sub",
        "tele",
        "un",
        "up"
    ];
    Writing.suffixes = [
        "dom",
        "ee",
        "er",
        "ful",
        "hood",
        "ing",
        "ism",
        "ist",
        "less",
        "ment",
        "ness",
        "ship",
        "ty",
        "ward",
        "wards",
        "wise"
    ];
    Writing.singleSoundConsonantPairs = [
        "ch",
        "cx",
        "ck",
        "gh",
        "gz",
        "ks",
        "ng",
        "ph",
        "rz",
        "sh",
        "st",
        "sz",
        "th",
        "ts",
        "xs"
    ];
    return Writing;
}());
exports.Writing = Writing;
