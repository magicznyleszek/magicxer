"use strict";
// this is designed to work with English
// inspired by https://www.howmanysyllables.com/divideintosyllables
Object.defineProperty(exports, "__esModule", { value: true });
var writing_1 = require("./writing");
var writing = new writing_1.Writing();
var Syllabler = /** @class */ (function () {
    function Syllabler() {
    }
    /** Splits a word into an ordered array of syllables. */
    Syllabler.prototype.split = function (word) {
        // we start with a single chunk
        var chunks = [word];
        // NOTE: order of these is probably important and delicate
        chunks = this.splitPrefix(chunks);
        chunks = this.splitCkleLeSuffix(chunks);
        chunks = this.splitGeneralSuffix(chunks);
        chunks = this.splitByMultipleConsonantsInRow(chunks);
        chunks = this.splitBySurroundedConsonants(chunks);
        return chunks;
    };
    /** Splits prefix from first word. */
    Syllabler.prototype.splitPrefix = function (chunks) {
        var workWord = chunks[0];
        for (var _i = 0, _a = writing.getPrefixes(); _i < _a.length; _i++) {
            var prefix = _a[_i];
            if (workWord.indexOf(prefix) === 0) {
                chunks.shift();
                chunks.unshift(workWord.slice(0, prefix.length), workWord.slice(prefix.length));
                break;
            }
        }
        return chunks;
    };
    /** Splits suffix from last word. */
    Syllabler.prototype.splitGeneralSuffix = function (chunks) {
        var workWord = chunks[chunks.length - 1];
        if (workWord) {
            for (var _i = 0, _a = writing.getSuffixes(); _i < _a.length; _i++) {
                var suffix = _a[_i];
                if (workWord.indexOf(suffix) !== -1 &&
                    // check it is the end of string
                    workWord.indexOf(suffix) === workWord.length - suffix.length &&
                    // check if whole word is not suffix already
                    workWord !== suffix) {
                    chunks.pop();
                    chunks.push(workWord.slice(0, workWord.indexOf(suffix)));
                    chunks.push(workWord.slice(workWord.indexOf(suffix)));
                    break;
                }
            }
        }
        return chunks;
    };
    /** Splits "ckle" and "le" suffixes by some simple logic. */
    Syllabler.prototype.splitCkleLeSuffix = function (chunks) {
        var workWord = chunks[chunks.length - 1];
        // we're only interested in words ending with -le
        if (workWord && workWord.slice(workWord.length - "le".length) === "le") {
            var lettersToCut = 0;
            // for -ckle we cut "le"
            if (workWord.slice(workWord.length - "ckle".length) === "ckle") {
                lettersToCut = 2;
            }
            else if (workWord.length >= 3 &&
                writing.isConsonant(workWord[workWord.length - 3])) {
                lettersToCut = 3;
            }
            if (lettersToCut) {
                chunks.pop();
                chunks.push(workWord.slice(0, workWord.length - lettersToCut));
                chunks.push(workWord.slice(workWord.length - lettersToCut));
            }
        }
        return chunks;
    };
    /** Splits 1st and 2nd consonant for multiple in row. */
    Syllabler.prototype.splitByMultipleConsonantsInRow = function (chunks) {
        chunks.forEach(function (chunk, index) {
            // skip chunks that are prefixes or suffixes
            if (writing.isPrefix(chunk) || writing.isSuffix(chunk)) {
                return;
            }
            var consonantsInRow = 0;
            var lettersSinceSplit = 0;
            // we start at the end and go backwards (to split without breaking loop)
            for (var i = chunk.length - 1; i >= 0; i--) {
                var letter = chunk[i];
                if (writing.isConsonant(letter)) {
                    consonantsInRow++;
                }
                lettersSinceSplit++;
                if (consonantsInRow >= 2 && (writing.isVowel(letter) || i === 0)) {
                    // we should split between 1st and 2nd consonant in whole group,
                    // but if current letter is a vowel, we need to move the split
                    var splitIndex = i + 1;
                    if (writing.isVowel(letter)) {
                        splitIndex += 1;
                    }
                    // split current chunk
                    var left = chunk.substring(0, splitIndex);
                    var right = chunk.substring(splitIndex, splitIndex + lettersSinceSplit);
                    // check if both parts are valid to be split
                    if (writing.isValidSyllable(left) &&
                        writing.isValidSyllable(right) &&
                        !writing.isSingleSoundPair(left[left.length - 1], right[0])) {
                        chunks.splice(index, 1, left, right);
                        lettersSinceSplit = 0;
                    }
                }
                // reset counter, because vowel brakes in-row-count (obviously)
                if (writing.isVowel(letter)) {
                    consonantsInRow = 0;
                }
            }
        });
        return chunks;
    };
    /** Splits words on consonants surrounded by vowels. */
    Syllabler.prototype.splitBySurroundedConsonants = function (chunks) {
        chunks.forEach(function (chunk, index) {
            // skip chunks that are prefixes or suffixes
            if (writing.isPrefix(chunk) || writing.isSuffix(chunk)) {
                return;
            }
            var lettersSinceSplit = 0;
            // we start at the end and go backwards (to split without breaking loop)
            for (var i = chunk.length - 1; i >= 0; i--) {
                var letter = chunk[i];
                lettersSinceSplit++;
                if (
                // we omit first and last letters, as the can't be surrounded :)
                i !== 0 &&
                    i !== chunk.length - 1 &&
                    writing.isConsonant(letter) &&
                    writing.isVowel(chunk[i - 1]) &&
                    writing.isVowel(chunk[i + 1])) {
                    // split current chunk
                    var left = chunk.substring(0, i);
                    var right = chunk.substring(i, i + lettersSinceSplit);
                    // check if both parts are valid to be split
                    if (writing.isValidSyllable(left) &&
                        writing.isValidSyllable(right) &&
                        !writing.isSingleSoundPair(left[left.length - 1], right[0])) {
                        chunks.splice(index, 1, left, right);
                        lettersSinceSplit = 0;
                    }
                }
            }
        });
        return chunks;
    };
    return Syllabler;
}());
exports.Syllabler = Syllabler;
