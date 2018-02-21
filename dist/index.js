// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped, ModuleConfig) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(ModuleConfig);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(){}return e.prototype.isVowel=function(n){return 1===n.length&&-1!==e.vowels.indexOf(n)},e.prototype.isConsonant=function(e){return 1===e.length&&!this.isVowel(e)},e.prototype.isPrefix=function(n){return-1!==e.prefixes.indexOf(n)},e.prototype.getPrefixes=function(){return e.prefixes},e.prototype.isSuffix=function(n){return-1!==e.suffixes.indexOf(n)},e.prototype.getSuffixes=function(){return e.suffixes},e.prototype.isSingleSoundPair=function(n,t){if(1!==n.length||1!==t.length)throw new Error("UGH! This function requires letters!");return-1!==e.singleSoundConsonantPairs.indexOf(n+t)},e.prototype.hasVowels=function(e){for(var n=0,t=e;n<t.length;n++){var i=t[n];if(this.isVowel(i))return!0}return!1},e.prototype.isValidSyllable=function(e){return e.length>1&&(this.hasVowels(e)||-1!==e.indexOf("y"))},e.vowels=["a","e","i","o","u"],e.prefixes=["ab","dis","down","il","im","in","ir","mega","mid","mis","non","out","over","post","pre","pro","re","semi","sub","tele","un","up"],e.suffixes=["dom","ee","er","ful","hood","ing","ism","ist","less","ment","ness","ship","ty","ward","wards","wise"],e.singleSoundConsonantPairs=["ch","cx","ck","gh","gz","ks","ng","ph","rz","sh","st","sz","th","ts","xs"],e}(),n=exports.writing=new e;
},{}],4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.syllabler=void 0;var i=require("./writing"),n=function(){function n(){}return n.prototype.split=function(i){var n=[i];return n=this.splitPrefix(n),n=this.splitCkleLeSuffix(n),n=this.splitGeneralSuffix(n),n=this.splitByMultipleConsonantsInRow(n),n=this.splitBySurroundedConsonants(n)},n.prototype.splitPrefix=function(n){for(var t=n[0],e=0,r=i.writing.getPrefixes();e<r.length;e++){var l=r[e];if(0===t.indexOf(l)){n.shift(),n.unshift(t.slice(0,l.length),t.slice(l.length));break}}return n},n.prototype.splitGeneralSuffix=function(n){var t=n[n.length-1];if(t)for(var e=0,r=i.writing.getSuffixes();e<r.length;e++){var l=r[e];if(-1!==t.indexOf(l)&&t.indexOf(l)===t.length-l.length&&t!==l){n.pop(),n.push(t.slice(0,t.indexOf(l))),n.push(t.slice(t.indexOf(l)));break}}return n},n.prototype.splitCkleLeSuffix=function(n){var t=n[n.length-1];if(t&&"le"===t.slice(t.length-"le".length)){var e=0;"ckle"===t.slice(t.length-"ckle".length)?e=2:t.length>=3&&i.writing.isConsonant(t[t.length-3])&&(e=3),e&&(n.pop(),n.push(t.slice(0,t.length-e)),n.push(t.slice(t.length-e)))}return n},n.prototype.splitByMultipleConsonantsInRow=function(n){return n.forEach(function(t,e){if(!i.writing.isPrefix(t)&&!i.writing.isSuffix(t))for(var r=0,l=0,s=t.length-1;s>=0;s--){var o=t[s];if(i.writing.isConsonant(o)&&r++,l++,r>=2&&(i.writing.isVowel(o)||0===s)){var f=s+1;i.writing.isVowel(o)&&(f+=1);var g=t.substring(0,f),u=t.substring(f,f+l);i.writing.isValidSyllable(g)&&i.writing.isValidSyllable(u)&&!i.writing.isSingleSoundPair(g[g.length-1],u[0])&&(n.splice(e,1,g,u),l=0)}i.writing.isVowel(o)&&(r=0)}}),n},n.prototype.splitBySurroundedConsonants=function(n){return n.forEach(function(t,e){if(!i.writing.isPrefix(t)&&!i.writing.isSuffix(t))for(var r=0,l=t.length-1;l>=0;l--){var s=t[l];if(r++,0!==l&&l!==t.length-1&&i.writing.isConsonant(s)&&i.writing.isVowel(t[l-1])&&i.writing.isVowel(t[l+1])){var o=t.substring(0,l),f=t.substring(l,l+r);i.writing.isValidSyllable(o)&&i.writing.isValidSyllable(f)&&!i.writing.isSingleSoundPair(o[o.length-1],f[0])&&(n.splice(e,1,o,f),r=0)}}}),n},n}(),t=exports.syllabler=new n;
},{"./writing":5}],3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mixer=void 0;var l=require("../syllabler/syllabler"),e=require("../syllabler/writing"),t=function(){function t(){}return t.prototype.mix=function(l,e){var t=[];return t=(t=(t=(t=(t=t.concat(this.mixBySyllablesJoin(l,e))).concat(this.mixBySyllablesWrap(l,e))).concat(this.mixBySyllablesTwine(l,e))).concat(this.mixBySimilarLetters(l,e))).concat(this.mixByCoolPairs(l,e)),t=this.cleanup(l,e,t)},t.prototype.cleanup=function(l,e,t){for(var r=[],i=0,n=t;i<n.length;i++){var o=n[i];o.length>2&&o.length!==(l+e).length&&o!==l&&o!==e&&r.push(o)}return r},t.prototype.mixBySyllablesJoin=function(e,t){for(var r=[],i=l.syllabler.split(e),n=l.syllabler.split(t),o=0;o<i.length;o++){i[o];for(var s=0;s<n.length;s++){n[s];r.push([i.slice(0,o+1).join(""),n.slice(s).join("")].join(""))}}return r},t.prototype.mixBySyllablesWrap=function(e,t){var r=[],i=l.syllabler.split(e),n=l.syllabler.split(t);return i.length>=3&&n.length>=3&&r.push([i[0],n.slice(1,n.length-2).join(""),i[i.length-1]].join("")),r},t.prototype.mixBySyllablesTwine=function(e,t){var r=[],i=l.syllabler.split(e),n=l.syllabler.split(t);if(i.length>=2&&n.length>=2){for(var o=[],s=0;s<i.length;s++)s%2==0?o.push(i[s]):o.push(n[s]);r.push(o.join(""))}return r},t.prototype.mixBySimilarLetters=function(l,t){for(var r=[],i=0;i<l.length;i++)for(var n=l[i],o=0;o<t.length;o++){var s=t[o];(n===s||e.writing.isVowel(n)&&e.writing.isVowel(s))&&r.push(l.slice(0,i)+t.slice(o,t.length))}return r},t.prototype.mixByCoolPairs=function(l,t){for(var r=[],i=0;i<l.length;i++){l[i];for(var n=0;n<t.length;n++){t[n];e.writing.isSingleSoundPair(l[i],t[n])&&r.push(l.slice(0,i+1)+t.slice(n))}}return r},t}(),r=exports.mixer=new t;
},{"../syllabler/syllabler":4,"../syllabler/writing":5}],1:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.magicxer=void 0;var e=require("./components/mixer/mixer"),r=exports.magicxer=e.mixer;
},{"./components/mixer/mixer":3}]},{},[1])