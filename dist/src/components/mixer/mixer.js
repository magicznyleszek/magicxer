"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var syllabler_1 = require("../syllabler/syllabler");
var writing_1 = require("../syllabler/writing");
var syllabler = new syllabler_1.Syllabler();
var writing = new writing_1.Writing();
var Mixer = /** @class */ (function () {
    function Mixer() {
    }
    /** Returns array of mixes for two given words. */
    Mixer.prototype.mix = function (stWord, ndWord) {
        var finalMixes = [];
        finalMixes = finalMixes.concat(this.mixBySyllablesJoin(stWord, ndWord));
        finalMixes = finalMixes.concat(this.mixBySyllablesWrap(stWord, ndWord));
        finalMixes = finalMixes.concat(this.mixBySyllablesTwine(stWord, ndWord));
        finalMixes = finalMixes.concat(this.mixBySimilarLetters(stWord, ndWord));
        finalMixes = finalMixes.concat(this.mixByCoolPairs(stWord, ndWord));
        finalMixes = this.cleanup(stWord, ndWord, finalMixes);
        return finalMixes;
    };
    /** Removes bad mixes. */
    Mixer.prototype.cleanup = function (stWord, ndWord, mixes) {
        var cleanMixes = [];
        for (var _i = 0, mixes_1 = mixes; _i < mixes_1.length; _i++) {
            var mix = mixes_1[_i];
            // two letters are bad
            // just glueing whole words is bad
            // source words are bad, duplicated too
            if (mix.length > 2 &&
                mix.length !== (stWord + ndWord).length &&
                mix !== stWord &&
                mix !== ndWord) {
                cleanMixes.push(mix);
            }
        }
        return cleanMixes;
    };
    /** Mixes second word syllables into the beginning of first word. */
    Mixer.prototype.mixBySyllablesJoin = function (stWord, ndWord) {
        var mixes = [];
        var stSyllables = syllabler.split(stWord);
        var ndSyllables = syllabler.split(ndWord);
        for (var stIndex = 0; stIndex < stSyllables.length; stIndex++) {
            var stSyllable = stSyllables[stIndex];
            for (var ndIndex = 0; ndIndex < ndSyllables.length; ndIndex++) {
                var ndSyllable = ndSyllables[ndIndex];
                mixes.push([
                    stSyllables.slice(0, stIndex + 1).join(""),
                    ndSyllables.slice(ndIndex).join("")
                ].join(""));
            }
        }
        return mixes;
    };
    /** Wraps first word edge syllables with second word center syllables. */
    Mixer.prototype.mixBySyllablesWrap = function (stWord, ndWord) {
        var mixes = [];
        var stSyllables = syllabler.split(stWord);
        var ndSyllables = syllabler.split(ndWord);
        if (stSyllables.length >= 3 && ndSyllables.length >= 3) {
            mixes.push([
                stSyllables[0],
                ndSyllables.slice(1, ndSyllables.length - 2).join(""),
                stSyllables[stSyllables.length - 1]
            ].join(""));
        }
        return mixes;
    };
    /** Twines syllables even/odd. */
    Mixer.prototype.mixBySyllablesTwine = function (stWord, ndWord) {
        var mixes = [];
        var stSyllables = syllabler.split(stWord);
        var ndSyllables = syllabler.split(ndWord);
        if (stSyllables.length >= 2 && ndSyllables.length >= 2) {
            var twine = [];
            for (var index = 0; index < stSyllables.length; index++) {
                if (index % 2 === 0) {
                    twine.push(stSyllables[index]);
                }
                else {
                    twine.push(ndSyllables[index]);
                }
            }
            mixes.push(twine.join(""));
        }
        return mixes;
    };
    /** Mixes two words by same letters or vowels. */
    Mixer.prototype.mixBySimilarLetters = function (stWord, ndWord) {
        var mixes = [];
        for (var stIndex = 0; stIndex < stWord.length; stIndex++) {
            var stLetter = stWord[stIndex];
            for (var ndIndex = 0; ndIndex < ndWord.length; ndIndex++) {
                var ndLetter = ndWord[ndIndex];
                if (stLetter === ndLetter ||
                    (writing.isVowel(stLetter) && writing.isVowel(ndLetter))) {
                    mixes.push(stWord.slice(0, stIndex) + ndWord.slice(ndIndex, ndWord.length));
                }
            }
        }
        return mixes;
    };
    /** Mixes words by finding single sounding pairs. */
    Mixer.prototype.mixByCoolPairs = function (stWord, ndWord) {
        var mixes = [];
        for (var stIndex = 0; stIndex < stWord.length; stIndex++) {
            var stLetter = stWord[stIndex];
            for (var ndIndex = 0; ndIndex < ndWord.length; ndIndex++) {
                var ndLetter = ndWord[ndIndex];
                if (writing.isSingleSoundPair(stWord[stIndex], ndWord[ndIndex])) {
                    mixes.push(stWord.slice(0, stIndex + 1) + ndWord.slice(ndIndex));
                }
            }
        }
        return mixes;
    };
    return Mixer;
}());
exports.Mixer = Mixer;
