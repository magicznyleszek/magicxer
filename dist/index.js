// a set og small writing-system related helpers
define("src/components/syllabler/writing", ["require", "exports"], function (require, exports) {
    "use strict";
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
});
// this is designed to work with English
// inspired by https://www.howmanysyllables.com/divideintosyllables
define("src/components/syllabler/syllabler", ["require", "exports", "src/components/syllabler/writing"], function (require, exports, writing_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
});
define("src/components/mixer/mixer", ["require", "exports", "src/components/syllabler/syllabler", "src/components/syllabler/writing"], function (require, exports, syllabler_1, writing_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var syllabler = new syllabler_1.Syllabler();
    var writing = new writing_2.Writing();
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
});
define("lib/index", ["require", "exports", "src/components/mixer/mixer"], function (require, exports, mixer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.magicxer = new mixer_1.Mixer();
});
