/**
 * Copyright (c) 2011-2013 Fabien Cazenave, Mozilla.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
/*
  Additional modifications for PDF.js project:
    - Disables language initialization on page loading;
    - Removes consoleWarn and consoleLog and use console.log/warn directly.
    - Removes window._ assignment.
    - Remove compatibility code for OldIE.
*/

/*jshint browser: true, devel: true, es5: true, globalstrict: true */
'use strict';

document.webL10n = (function(window, document, undefined) {
  var gL10nData = {};
  var gTextData = '';
  var gTextProp = 'textContent';
  var gLanguage = '';
  var gMacros = {};
  var gReadyState = 'loading';


  /**
   * Synchronously loading l10n resources significantly minimizes flickering
   * from displaying the app with non-localized strings and then updating the
   * strings. Although this will block all script execution on this page, we
   * expect that the l10n resources are available locally on flash-storage.
   *
   * As synchronous XHR is generally considered as a bad idea, we're still
   * loading l10n resources asynchronously -- but we keep this in a setting,
   * just in case... and applications using this library should hide their
   * content until the `localized' event happens.
   */

  var gAsyncResourceLoading = true; // read-only


  /**
   * DOM helpers for the so-called "HTML API".
   *
   * These functions are written for modern browsers. For old versions of IE,
   * they're overridden in the 'startup' section at the end of this file.
   */

  function getL10nResourceLinks() {
    return document.querySelectorAll('link[type="application/l10n"]');
  }

  function getL10nDictionary() {
    var script = document.querySelector('script[type="application/l10n"]');
    // TODO: support multiple and external JSON dictionaries
    return script ? JSON.parse(script.innerHTML) : null;
  }

  function getTranslatableChildren(element) {
    return element ? element.querySelectorAll('*[data-l10n-id]') : [];
  }

  function getL10nAttributes(element) {
    if (!element)
      return {};

    var l10nId = element.getAttribute('data-l10n-id');
    var l10nArgs = element.getAttribute('data-l10n-args');
    var args = {};
    if (l10nArgs) {
      try {
        args = JSON.parse(l10nArgs);
      } catch (e) {
        console.warn('could not parse arguments for #' + l10nId);
      }
    }
    return { id: l10nId, args: args };
  }

  function fireL10nReadyEvent(lang) {
    var evtObject = document.createEvent('Event');
    evtObject.initEvent('localized', true, false);
    evtObject.language = lang;
    document.dispatchEvent(evtObject);
  }

  function xhrLoadText(url, onSuccess, onFailure) {
    onSuccess = onSuccess || function _onSuccess(data) {};
    onFailure = onFailure || function _onFailure() {};

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, gAsyncResourceLoading);
    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/plain; charset=utf-8');
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status === 0) {
          onSuccess(xhr.responseText);
        } else {
          onFailure();
        }
      }
    };
    xhr.onerror = onFailure;
    xhr.ontimeout = onFailure;

    // in Firefox OS with the app:// protocol, trying to XHR a non-existing
    // URL will raise an exception here -- hence this ugly try...catch.
    try {
      xhr.send(null);
    } catch (e) {
      onFailure();
    }
  }


  /**
   * l10n resource parser:
   *  - reads (async XHR) the l10n resource matching `lang';
   *  - imports linked resources (synchronously) when specified;
   *  - parses the text data (fills `gL10nData' and `gTextData');
   *  - triggers success/failure callbacks when done.
   *
   * @param {string} href
   *    URL of the l10n resource to parse.
   *
   * @param {string} lang
   *    locale (language) to parse. Must be a lowercase string.
   *
   * @param {Function} successCallback
   *    triggered when the l10n resource has been successully parsed.
   *
   * @param {Function} failureCallback
   *    triggered when the an error has occured.
   *
   * @return {void}
   *    uses the following global variables: gL10nData, gTextData, gTextProp.
   */

  function parseResource(href, lang, successCallback, failureCallback) {
    var baseURL = href.replace(/[^\/]*$/, '') || './';

    // handle escaped characters (backslashes) in a string
    function evalString(text) {
      if (text.lastIndexOf('\\') < 0)
        return text;
      return text.replace(/\\\\/g, '\\')
                 .replace(/\\n/g, '\n')
                 .replace(/\\r/g, '\r')
                 .replace(/\\t/g, '\t')
                 .replace(/\\b/g, '\b')
                 .replace(/\\f/g, '\f')
                 .replace(/\\{/g, '{')
                 .replace(/\\}/g, '}')
                 .replace(/\\"/g, '"')
                 .replace(/\\'/g, "'");
    }

    // parse *.properties text data into an l10n dictionary
    // If gAsyncResourceLoading is false, then the callback will be called
    // synchronously. Otherwise it is called asynchronously.
    function parseProperties(text, parsedPropertiesCallback) {
      var dictionary = {};

      // token expressions
      var reBlank = /^\s*|\s*$/;
      var reComment = /^\s*#|^\s*$/;
      var reSection = /^\s*\[(.*)\]\s*$/;
      var reImport = /^\s*@import\s+url\((.*)\)\s*$/i;
      var reSplit = /^([^=\s]*)\s*=\s*(.+)$/; // TODO: escape EOLs with '\'

      // parse the *.properties file into an associative array
      function parseRawLines(rawText, extendedSyntax, parsedRawLinesCallback) {
        var entries = rawText.replace(reBlank, '').split(/[\r\n]+/);
        var currentLang = '*';
        var genericLang = lang.split('-', 1)[0];
        var skipLang = false;
        var match = '';

        function nextEntry() {
          // Use infinite loop instead of recursion to avoid reaching the
          // maximum recursion limit for content with many lines.
          while (true) {
            if (!entries.length) {
              parsedRawLinesCallback();
              return;
            }
            var line = entries.shift();

            // comment or blank line?
            if (reComment.test(line))
              continue;

            // the extended syntax supports [lang] sections and @import rules
            if (extendedSyntax) {
              match = reSection.exec(line);
              if (match) { // section start?
                // RFC 4646, section 4.4, "All comparisons MUST be performed
                // in a case-insensitive manner."

                currentLang = match[1].toLowerCase();
                skipLang = (currentLang !== '*') &&
                    (currentLang !== lang) && (currentLang !== genericLang);
                continue;
              } else if (skipLang) {
                continue;
              }
              match = reImport.exec(line);
              if (match) { // @import rule?
                loadImport(baseURL + match[1], nextEntry);
                return;
              }
            }

            // key-value pair
            var tmp = line.match(reSplit);
            if (tmp && tmp.length == 3) {
              dictionary[tmp[1]] = evalString(tmp[2]);
            }
          }
        }
        nextEntry();
      }

      // import another *.properties file
      function loadImport(url, callback) {
        xhrLoadText(url, function(content) {
          parseRawLines(content, false, callback); // don't allow recursive imports
        }, function () {
          console.warn(url + ' not found.');
          callback();
        });
      }

      // fill the dictionary
      parseRawLines(text, true, function() {
        parsedPropertiesCallback(dictionary);
      });
    }

    // load and parse l10n data (warning: global variables are used here)
    xhrLoadText(href, function(response) {
      gTextData += response; // mostly for debug

      // parse *.properties text data into an l10n dictionary
      parseProperties(response, function(data) {

        // find attribute descriptions, if any
        for (var key in data) {
          var id, prop, index = key.lastIndexOf('.');
          if (index > 0) { // an attribute has been specified
            id = key.substring(0, index);
            prop = key.substr(index + 1);
          } else { // no attribute: assuming text content by default
            id = key;
            prop = gTextProp;
          }
          if (!gL10nData[id]) {
            gL10nData[id] = {};
          }
          gL10nData[id][prop] = data[key];
        }

        // trigger callback
        if (successCallback) {
          successCallback();
        }
      });
    }, failureCallback);
  }

  // load and parse all resources for the specified locale
  function loadLocale(lang, callback) {
    // RFC 4646, section 2.1 states that language tags have to be treated as
    // case-insensitive. Convert to lowercase for case-insensitive comparisons.
    if (lang) {
      lang = lang.toLowerCase();
    }

    callback = callback || function _callback() {};

    clear();
    gLanguage = lang;

    // check all <link type="application/l10n" href="..." /> nodes
    // and load the resource files
    var langLinks = getL10nResourceLinks();
    var langCount = langLinks.length;
    if (langCount === 0) {
      // we might have a pre-compiled dictionary instead
      var dict = getL10nDictionary();
      if (dict && dict.locales && dict.default_locale) {
        console.log('using the embedded JSON directory, early way out');
        gL10nData = dict.locales[lang];
        if (!gL10nData) {
          var defaultLocale = dict.default_locale.toLowerCase();
          for (var anyCaseLang in dict.locales) {
            anyCaseLang = anyCaseLang.toLowerCase();
            if (anyCaseLang === lang) {
              gL10nData = dict.locales[lang];
              break;
            } else if (anyCaseLang === defaultLocale) {
              gL10nData = dict.locales[defaultLocale];
            }
          }
        }
        callback();
      } else {
        console.log('no resource to load, early way out');
      }
      // early way out
      fireL10nReadyEvent(lang);
      gReadyState = 'complete';
      return;
    }

    // start the callback when all resources are loaded
    var onResourceLoaded = null;
    var gResourceCount = 0;
    onResourceLoaded = function() {
      gResourceCount++;
      if (gResourceCount >= langCount) {
        callback();
        fireL10nReadyEvent(lang);
        gReadyState = 'complete';
      }
    };

    // load all resource files
    function L10nResourceLink(link) {
      var href = link.href;
      // Note: If |gAsyncResourceLoading| is false, then the following callbacks
      // are synchronously called.
      this.load = function(lang, callback) {
        parseResource(href, lang, callback, function() {
          console.warn(href + ' not found.');
          // lang not found, used default resource instead
          console.warn('"' + lang + '" resource not found');
          gLanguage = '';
          // Resource not loaded, but we still need to call the callback.
          callback();
        });
      };
    }

    for (var i = 0; i < langCount; i++) {
      var resource = new L10nResourceLink(langLinks[i]);
      resource.load(lang, onResourceLoaded);
    }
  }

  // clear all l10n data
  function clear() {
    gL10nData = {};
    gTextData = '';
    gLanguage = '';
    // TODO: clear all non predefined macros.
    // There's no such macro /yet/ but we're planning to have some...
  }


  /**
   * Get rules for plural forms (shared with JetPack), see:
   * http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
   * https://github.com/mozilla/addon-sdk/blob/master/python-lib/plural-rules-generator.p
   *
   * @param {string} lang
   *    locale (language) used.
   *
   * @return {Function}
   *    returns a function that gives the plural form name for a given integer:
   *       var fun = getPluralRules('en');
   *       fun(1)    -> 'one'
   *       fun(0)    -> 'other'
   *       fun(1000) -> 'other'.
   */

  function getPluralRules(lang) {
    var locales2rules = {
      'af': 3,
      'ak': 4,
      'am': 4,
      'ar': 1,
      'asa': 3,
      'az': 0,
      'be': 11,
      'bem': 3,
      'bez': 3,
      'bg': 3,
      'bh': 4,
      'bm': 0,
      'bn': 3,
      'bo': 0,
      'br': 20,
      'brx': 3,
      'bs': 11,
      'ca': 3,
      'cgg': 3,
      'chr': 3,
      'cs': 12,
      'cy': 17,
      'da': 3,
      'de': 3,
      'dv': 3,
      'dz': 0,
      'ee': 3,
      'el': 3,
      'en': 3,
      'eo': 3,
      'es': 3,
      'et': 3,
      'eu': 3,
      'fa': 0,
      'ff': 5,
      'fi': 3,
      'fil': 4,
      'fo': 3,
      'fr': 5,
      'fur': 3,
      'fy': 3,
      'ga': 8,
      'gd': 24,
      'gl': 3,
      'gsw': 3,
      'gu': 3,
      'guw': 4,
      'gv': 23,
      'ha': 3,
      'haw': 3,
      'he': 2,
      'hi': 4,
      'hr': 11,
      'hu': 0,
      'id': 0,
      'ig': 0,
      'ii': 0,
      'is': 3,
      'it': 3,
      'iu': 7,
      'ja': 0,
      'jmc': 3,
      'jv': 0,
      'ka': 0,
      'kab': 5,
      'kaj': 3,
      'kcg': 3,
      'kde': 0,
      'kea': 0,
      'kk': 3,
      'kl': 3,
      'km': 0,
      'kn': 0,
      'ko': 0,
      'ksb': 3,
      'ksh': 21,
      'ku': 3,
      'kw': 7,
      'lag': 18,
      'lb': 3,
      'lg': 3,
      'ln': 4,
      'lo': 0,
      'lt': 10,
      'lv': 6,
      'mas': 3,
      'mg': 4,
      'mk': 16,
      'ml': 3,
      'mn': 3,
      'mo': 9,
      'mr': 3,
      'ms': 0,
      'mt': 15,
      'my': 0,
      'nah': 3,
      'naq': 7,
      'nb': 3,
      'nd': 3,
      'ne': 3,
      'nl': 3,
      'nn': 3,
      'no': 3,
      'nr': 3,
      'nso': 4,
      'ny': 3,
      'nyn': 3,
      'om': 3,
      'or': 3,
      'pa': 3,
      'pap': 3,
      'pl': 13,
      'ps': 3,
      'pt': 3,
      'rm': 3,
      'ro': 9,
      'rof': 3,
      'ru': 11,
      'rwk': 3,
      'sah': 0,
      'saq': 3,
      'se': 7,
      'seh': 3,
      'ses': 0,
      'sg': 0,
      'sh': 11,
      'shi': 19,
      'sk': 12,
      'sl': 14,
      'sma': 7,
      'smi': 7,
      'smj': 7,
      'smn': 7,
      'sms': 7,
      'sn': 3,
      'so': 3,
      'sq': 3,
      'sr': 11,
      'ss': 3,
      'ssy': 3,
      'st': 3,
      'sv': 3,
      'sw': 3,
      'syr': 3,
      'ta': 3,
      'te': 3,
      'teo': 3,
      'th': 0,
      'ti': 4,
      'tig': 3,
      'tk': 3,
      'tl': 4,
      'tn': 3,
      'to': 0,
      'tr': 0,
      'ts': 3,
      'tzm': 22,
      'uk': 11,
      'ur': 3,
      've': 3,
      'vi': 0,
      'vun': 3,
      'wa': 4,
      'wae': 3,
      'wo': 0,
      'xh': 3,
      'xog': 3,
      'yo': 0,
      'zh': 0,
      'zu': 3
    };

    // utility functions for plural rules methods
    function isIn(n, list) {
      return list.indexOf(n) !== -1;
    }
    function isBetween(n, start, end) {
      return start <= n && n <= end;
    }

    // list of all plural rules methods:
    // map an integer to the plural form name to use
    var pluralRules = {
      '0': function(n) {
        return 'other';
      },
      '1': function(n) {
        if ((isBetween((n % 100), 3, 10)))
          return 'few';
        if (n === 0)
          return 'zero';
        if ((isBetween((n % 100), 11, 99)))
          return 'many';
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '2': function(n) {
        if (n !== 0 && (n % 10) === 0)
          return 'many';
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '3': function(n) {
        if (n == 1)
          return 'one';
        return 'other';
      },
      '4': function(n) {
        if ((isBetween(n, 0, 1)))
          return 'one';
        return 'other';
      },
      '5': function(n) {
        if ((isBetween(n, 0, 2)) && n != 2)
          return 'one';
        return 'other';
      },
      '6': function(n) {
        if (n === 0)
          return 'zero';
        if ((n % 10) == 1 && (n % 100) != 11)
          return 'one';
        return 'other';
      },
      '7': function(n) {
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '8': function(n) {
        if ((isBetween(n, 3, 6)))
          return 'few';
        if ((isBetween(n, 7, 10)))
          return 'many';
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '9': function(n) {
        if (n === 0 || n != 1 && (isBetween((n % 100), 1, 19)))
          return 'few';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '10': function(n) {
        if ((isBetween((n % 10), 2, 9)) && !(isBetween((n % 100), 11, 19)))
          return 'few';
        if ((n % 10) == 1 && !(isBetween((n % 100), 11, 19)))
          return 'one';
        return 'other';
      },
      '11': function(n) {
        if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14)))
          return 'few';
        if ((n % 10) === 0 ||
            (isBetween((n % 10), 5, 9)) ||
            (isBetween((n % 100), 11, 14)))
          return 'many';
        if ((n % 10) == 1 && (n % 100) != 11)
          return 'one';
        return 'other';
      },
      '12': function(n) {
        if ((isBetween(n, 2, 4)))
          return 'few';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '13': function(n) {
        if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14)))
          return 'few';
        if (n != 1 && (isBetween((n % 10), 0, 1)) ||
            (isBetween((n % 10), 5, 9)) ||
            (isBetween((n % 100), 12, 14)))
          return 'many';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '14': function(n) {
        if ((isBetween((n % 100), 3, 4)))
          return 'few';
        if ((n % 100) == 2)
          return 'two';
        if ((n % 100) == 1)
          return 'one';
        return 'other';
      },
      '15': function(n) {
        if (n === 0 || (isBetween((n % 100), 2, 10)))
          return 'few';
        if ((isBetween((n % 100), 11, 19)))
          return 'many';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '16': function(n) {
        if ((n % 10) == 1 && n != 11)
          return 'one';
        return 'other';
      },
      '17': function(n) {
        if (n == 3)
          return 'few';
        if (n === 0)
          return 'zero';
        if (n == 6)
          return 'many';
        if (n == 2)
          return 'two';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '18': function(n) {
        if (n === 0)
          return 'zero';
        if ((isBetween(n, 0, 2)) && n !== 0 && n != 2)
          return 'one';
        return 'other';
      },
      '19': function(n) {
        if ((isBetween(n, 2, 10)))
          return 'few';
        if ((isBetween(n, 0, 1)))
          return 'one';
        return 'other';
      },
      '20': function(n) {
        if ((isBetween((n % 10), 3, 4) || ((n % 10) == 9)) && !(
            isBetween((n % 100), 10, 19) ||
            isBetween((n % 100), 70, 79) ||
            isBetween((n % 100), 90, 99)
            ))
          return 'few';
        if ((n % 1000000) === 0 && n !== 0)
          return 'many';
        if ((n % 10) == 2 && !isIn((n % 100), [12, 72, 92]))
          return 'two';
        if ((n % 10) == 1 && !isIn((n % 100), [11, 71, 91]))
          return 'one';
        return 'other';
      },
      '21': function(n) {
        if (n === 0)
          return 'zero';
        if (n == 1)
          return 'one';
        return 'other';
      },
      '22': function(n) {
        if ((isBetween(n, 0, 1)) || (isBetween(n, 11, 99)))
          return 'one';
        return 'other';
      },
      '23': function(n) {
        if ((isBetween((n % 10), 1, 2)) || (n % 20) === 0)
          return 'one';
        return 'other';
      },
      '24': function(n) {
        if ((isBetween(n, 3, 10) || isBetween(n, 13, 19)))
          return 'few';
        if (isIn(n, [2, 12]))
          return 'two';
        if (isIn(n, [1, 11]))
          return 'one';
        return 'other';
      }
    };

    // return a function that gives the plural form name for a given integer
    var index = locales2rules[lang.replace(/-.*$/, '')];
    if (!(index in pluralRules)) {
      console.warn('plural form unknown for [' + lang + ']');
      return function() { return 'other'; };
    }
    return pluralRules[index];
  }

  // pre-defined 'plural' macro
  gMacros.plural = function(str, param, key, prop) {
    var n = parseFloat(param);
    if (isNaN(n))
      return str;

    // TODO: support other properties (l20n still doesn't...)
    if (prop != gTextProp)
      return str;

    // initialize _pluralRules
    if (!gMacros._pluralRules) {
      gMacros._pluralRules = getPluralRules(gLanguage);
    }
    var index = '[' + gMacros._pluralRules(n) + ']';

    // try to find a [zero|one|two] key if it's defined
    if (n === 0 && (key + '[zero]') in gL10nData) {
      str = gL10nData[key + '[zero]'][prop];
    } else if (n == 1 && (key + '[one]') in gL10nData) {
      str = gL10nData[key + '[one]'][prop];
    } else if (n == 2 && (key + '[two]') in gL10nData) {
      str = gL10nData[key + '[two]'][prop];
    } else if ((key + index) in gL10nData) {
      str = gL10nData[key + index][prop];
    } else if ((key + '[other]') in gL10nData) {
      str = gL10nData[key + '[other]'][prop];
    }

    return str;
  };


  /**
   * l10n dictionary functions
   */

  // fetch an l10n object, warn if not found, apply `args' if possible
  function getL10nData(key, args, fallback) {
    var data = gL10nData[key];
    if (!data) {
      ///console.warn('#' + key + ' is undefined.'); /// patched
      // === patch start ===
      if (Object.keys(gL10nData).length > 0) {
        console.warn('#' + key + ' is undefined.');
      }
      // === patch end === 
      if (!fallback) {
        return null;
      }
      data = fallback;
    }

    /** This is where l10n expressions should be processed.
      * The plan is to support C-style expressions from the l20n project;
      * until then, only two kinds of simple expressions are supported:
      *   {[ index ]} and {{ arguments }}.
      */
    var rv = {};
    for (var prop in data) {
      var str = data[prop];
      str = substIndexes(str, args, key, prop);
      str = substArguments(str, args, key);
      rv[prop] = str;
    }
    return rv;
  }

  // replace {[macros]} with their values
  function substIndexes(str, args, key, prop) {
    var reIndex = /\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/;
    var reMatch = reIndex.exec(str);
    if (!reMatch || !reMatch.length)
      return str;

    // an index/macro has been found
    // Note: at the moment, only one parameter is supported
    var macroName = reMatch[1];
    var paramName = reMatch[2];
    var param;
    if (args && paramName in args) {
      param = args[paramName];
    } else if (paramName in gL10nData) {
      param = gL10nData[paramName];
    }

    // there's no macro parser yet: it has to be defined in gMacros
    if (macroName in gMacros) {
      var macro = gMacros[macroName];
      str = macro(str, param, key, prop);
    }
    return str;
  }

  // replace {{arguments}} with their values
  function substArguments(str, args, key) {
    var reArgs = /\{\{\s*(.+?)\s*\}\}/g;
    return str.replace(reArgs, function(matched_text, arg) {
      if (args && arg in args) {
        return args[arg];
      }
      if (arg in gL10nData) {
        return gL10nData[arg];
      }
      console.log('argument {{' + arg + '}} for #' + key + ' is undefined.');
      return matched_text;
    });
  }

  // translate an HTML element
  function translateElement(element) {
    var l10n = getL10nAttributes(element);
    if (!l10n.id)
      return;

    // get the related l10n object
    var data = getL10nData(l10n.id, l10n.args);
    if (!data) {
      console.warn('#' + l10n.id + ' is undefined.');
      return;
    }

    // translate element (TODO: security checks?)
    if (data[gTextProp]) { // XXX
      if (getChildElementCount(element) === 0) {
        element[gTextProp] = data[gTextProp];
      } else {
        // this element has element children: replace the content of the first
        // (non-empty) child textNode and clear other child textNodes
        var children = element.childNodes;
        var found = false;
        for (var i = 0, l = children.length; i < l; i++) {
          if (children[i].nodeType === 3 && /\S/.test(children[i].nodeValue)) {
            if (found) {
              children[i].nodeValue = '';
            } else {
              children[i].nodeValue = data[gTextProp];
              found = true;
            }
          }
        }
        // if no (non-empty) textNode is found, insert a textNode before the
        // first element child.
        if (!found) {
          var textNode = document.createTextNode(data[gTextProp]);
          element.insertBefore(textNode, element.firstChild);
        }
      }
      delete data[gTextProp];
    }

    for (var k in data) {
      element[k] = data[k];
    }
  }

  // webkit browsers don't currently support 'children' on SVG elements...
  function getChildElementCount(element) {
    if (element.children) {
      return element.children.length;
    }
    if (typeof element.childElementCount !== 'undefined') {
      return element.childElementCount;
    }
    var count = 0;
    for (var i = 0; i < element.childNodes.length; i++) {
      count += element.nodeType === 1 ? 1 : 0;
    }
    return count;
  }

  // translate an HTML subtree
  function translateFragment(element) {
    element = element || document.documentElement;

    // check all translatable children (= w/ a `data-l10n-id' attribute)
    var children = getTranslatableChildren(element);
    var elementCount = children.length;
    for (var i = 0; i < elementCount; i++) {
      translateElement(children[i]);
    }

    // translate element itself if necessary
    translateElement(element);
  }

  return {
    // get a localized string
    get: function(key, args, fallbackString) {
      var index = key.lastIndexOf('.');
      var prop = gTextProp;
      if (index > 0) { // An attribute has been specified
        prop = key.substr(index + 1);
        key = key.substring(0, index);
      }
      var fallback;
      if (fallbackString) {
        fallback = {};
        fallback[prop] = fallbackString;
      }
      var data = getL10nData(key, args, fallback);
      if (data && prop in data) {
        return data[prop];
      }
      return '{{' + key + '}}';
    },

    // debug
    getData: function() { return gL10nData; },
    getText: function() { return gTextData; },

    // get|set the document language
    getLanguage: function() { return gLanguage; },
    setLanguage: function(lang, callback) {
      loadLocale(lang, function() {
        if (callback)
          callback();
        translateFragment();
      });
    },

    // get the direction (ltr|rtl) of the current language
    getDirection: function() {
      // http://www.w3.org/International/questions/qa-scripts
      // Arabic, Hebrew, Farsi, Pashto, Urdu
      var rtlList = ['ar', 'he', 'fa', 'ps', 'ur'];
      var shortCode = gLanguage.split('-', 1)[0];
      return (rtlList.indexOf(shortCode) >= 0) ? 'rtl' : 'ltr';
    },

    // translate an element or document fragment
    translate: translateFragment,

    // this can be used to prevent race conditions
    getReadyState: function() { return gReadyState; },
    ready: function(callback) {
      if (!callback) {
        return;
      } else if (gReadyState == 'complete' || gReadyState == 'interactive') {
        window.setTimeout(function() {
          callback();
        });
      } else if (document.addEventListener) {
        document.addEventListener('localized', function once() {
          document.removeEventListener('localized', once);
          callback();
        });
      }
    }
  };
}) (window, document);
/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pdfjs-dist/build/pdf", [], factory);
	else if(typeof exports === 'object')
		exports["pdfjs-dist/build/pdf"] = factory();
	else
		root["pdfjs-dist/build/pdf"] = root.pdfjsDistBuildPdf = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __w_pdfjs_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __w_pdfjs_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__w_pdfjs_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__w_pdfjs_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__w_pdfjs_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__w_pdfjs_require__.d = function(exports, name, getter) {
/******/ 		if(!__w_pdfjs_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__w_pdfjs_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__w_pdfjs_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__w_pdfjs_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__w_pdfjs_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __w_pdfjs_require__(__w_pdfjs_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var compatibility = __w_pdfjs_require__(13);
var globalScope = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
var FONT_IDENTITY_MATRIX = [
 0.001,
 0,
 0,
 0.001,
 0,
 0
];
var TextRenderingMode = {
 FILL: 0,
 STROKE: 1,
 FILL_STROKE: 2,
 INVISIBLE: 3,
 FILL_ADD_TO_PATH: 4,
 STROKE_ADD_TO_PATH: 5,
 FILL_STROKE_ADD_TO_PATH: 6,
 ADD_TO_PATH: 7,
 FILL_STROKE_MASK: 3,
 ADD_TO_PATH_FLAG: 4
};
var ImageKind = {
 GRAYSCALE_1BPP: 1,
 RGB_24BPP: 2,
 RGBA_32BPP: 3
};
var AnnotationType = {
 TEXT: 1,
 LINK: 2,
 FREETEXT: 3,
 LINE: 4,
 SQUARE: 5,
 CIRCLE: 6,
 POLYGON: 7,
 POLYLINE: 8,
 HIGHLIGHT: 9,
 UNDERLINE: 10,
 SQUIGGLY: 11,
 STRIKEOUT: 12,
 STAMP: 13,
 CARET: 14,
 INK: 15,
 POPUP: 16,
 FILEATTACHMENT: 17,
 SOUND: 18,
 MOVIE: 19,
 WIDGET: 20,
 SCREEN: 21,
 PRINTERMARK: 22,
 TRAPNET: 23,
 WATERMARK: 24,
 THREED: 25,
 REDACT: 26
};
var AnnotationFlag = {
 INVISIBLE: 0x01,
 HIDDEN: 0x02,
 PRINT: 0x04,
 NOZOOM: 0x08,
 NOROTATE: 0x10,
 NOVIEW: 0x20,
 READONLY: 0x40,
 LOCKED: 0x80,
 TOGGLENOVIEW: 0x100,
 LOCKEDCONTENTS: 0x200
};
var AnnotationFieldFlag = {
 READONLY: 0x0000001,
 REQUIRED: 0x0000002,
 NOEXPORT: 0x0000004,
 MULTILINE: 0x0001000,
 PASSWORD: 0x0002000,
 NOTOGGLETOOFF: 0x0004000,
 RADIO: 0x0008000,
 PUSHBUTTON: 0x0010000,
 COMBO: 0x0020000,
 EDIT: 0x0040000,
 SORT: 0x0080000,
 FILESELECT: 0x0100000,
 MULTISELECT: 0x0200000,
 DONOTSPELLCHECK: 0x0400000,
 DONOTSCROLL: 0x0800000,
 COMB: 0x1000000,
 RICHTEXT: 0x2000000,
 RADIOSINUNISON: 0x2000000,
 COMMITONSELCHANGE: 0x4000000
};
var AnnotationBorderStyleType = {
 SOLID: 1,
 DASHED: 2,
 BEVELED: 3,
 INSET: 4,
 UNDERLINE: 5
};
var StreamType = {
 UNKNOWN: 0,
 FLATE: 1,
 LZW: 2,
 DCT: 3,
 JPX: 4,
 JBIG: 5,
 A85: 6,
 AHX: 7,
 CCF: 8,
 RL: 9
};
var FontType = {
 UNKNOWN: 0,
 TYPE1: 1,
 TYPE1C: 2,
 CIDFONTTYPE0: 3,
 CIDFONTTYPE0C: 4,
 TRUETYPE: 5,
 CIDFONTTYPE2: 6,
 TYPE3: 7,
 OPENTYPE: 8,
 TYPE0: 9,
 MMTYPE1: 10
};
var VERBOSITY_LEVELS = {
 errors: 0,
 warnings: 1,
 infos: 5
};
var CMapCompressionType = {
 NONE: 0,
 BINARY: 1,
 STREAM: 2
};
var OPS = {
 dependency: 1,
 setLineWidth: 2,
 setLineCap: 3,
 setLineJoin: 4,
 setMiterLimit: 5,
 setDash: 6,
 setRenderingIntent: 7,
 setFlatness: 8,
 setGState: 9,
 save: 10,
 restore: 11,
 transform: 12,
 moveTo: 13,
 lineTo: 14,
 curveTo: 15,
 curveTo2: 16,
 curveTo3: 17,
 closePath: 18,
 rectangle: 19,
 stroke: 20,
 closeStroke: 21,
 fill: 22,
 eoFill: 23,
 fillStroke: 24,
 eoFillStroke: 25,
 closeFillStroke: 26,
 closeEOFillStroke: 27,
 endPath: 28,
 clip: 29,
 eoClip: 30,
 beginText: 31,
 endText: 32,
 setCharSpacing: 33,
 setWordSpacing: 34,
 setHScale: 35,
 setLeading: 36,
 setFont: 37,
 setTextRenderingMode: 38,
 setTextRise: 39,
 moveText: 40,
 setLeadingMoveText: 41,
 setTextMatrix: 42,
 nextLine: 43,
 showText: 44,
 showSpacedText: 45,
 nextLineShowText: 46,
 nextLineSetSpacingShowText: 47,
 setCharWidth: 48,
 setCharWidthAndBounds: 49,
 setStrokeColorSpace: 50,
 setFillColorSpace: 51,
 setStrokeColor: 52,
 setStrokeColorN: 53,
 setFillColor: 54,
 setFillColorN: 55,
 setStrokeGray: 56,
 setFillGray: 57,
 setStrokeRGBColor: 58,
 setFillRGBColor: 59,
 setStrokeCMYKColor: 60,
 setFillCMYKColor: 61,
 shadingFill: 62,
 beginInlineImage: 63,
 beginImageData: 64,
 endInlineImage: 65,
 paintXObject: 66,
 markPoint: 67,
 markPointProps: 68,
 beginMarkedContent: 69,
 beginMarkedContentProps: 70,
 endMarkedContent: 71,
 beginCompat: 72,
 endCompat: 73,
 paintFormXObjectBegin: 74,
 paintFormXObjectEnd: 75,
 beginGroup: 76,
 endGroup: 77,
 beginAnnotations: 78,
 endAnnotations: 79,
 beginAnnotation: 80,
 endAnnotation: 81,
 paintJpegXObject: 82,
 paintImageMaskXObject: 83,
 paintImageMaskXObjectGroup: 84,
 paintImageXObject: 85,
 paintInlineImageXObject: 86,
 paintInlineImageXObjectGroup: 87,
 paintImageXObjectRepeat: 88,
 paintImageMaskXObjectRepeat: 89,
 paintSolidColorImageMask: 90,
 constructPath: 91
};
var verbosity = VERBOSITY_LEVELS.warnings;
function setVerbosityLevel(level) {
 verbosity = level;
}
function getVerbosityLevel() {
 return verbosity;
}
function info(msg) {
 if (verbosity >= VERBOSITY_LEVELS.infos) {
  console.log('Info: ' + msg);
 }
}
function warn(msg) {
 if (verbosity >= VERBOSITY_LEVELS.warnings) {
  console.log('Warning: ' + msg);
 }
}
function deprecated(details) {
 console.log('Deprecated API usage: ' + details);
}
function error(msg) {
 if (verbosity >= VERBOSITY_LEVELS.errors) {
  console.log('Error: ' + msg);
  console.log(backtrace());
 }
 throw new Error(msg);
}
function backtrace() {
 try {
  throw new Error();
 } catch (e) {
  return e.stack ? e.stack.split('\n').slice(2).join('\n') : '';
 }
}
function assert(cond, msg) {
 if (!cond) {
  error(msg);
 }
}
var UNSUPPORTED_FEATURES = {
 unknown: 'unknown',
 forms: 'forms',
 javaScript: 'javaScript',
 smask: 'smask',
 shadingPattern: 'shadingPattern',
 font: 'font'
};
function isSameOrigin(baseUrl, otherUrl) {
 try {
  var base = new URL(baseUrl);
  if (!base.origin || base.origin === 'null') {
   return false;
  }
 } catch (e) {
  return false;
 }
 var other = new URL(otherUrl, base);
 return base.origin === other.origin;
}
function isValidProtocol(url) {
 if (!url) {
  return false;
 }
 switch (url.protocol) {
 case 'http:':
 case 'https:':
 case 'ftp:':
 case 'mailto:':
 case 'tel:':
  return true;
 default:
  return false;
 }
}
function createValidAbsoluteUrl(url, baseUrl) {
 if (!url) {
  return null;
 }
 try {
  var absoluteUrl = baseUrl ? new URL(url, baseUrl) : new URL(url);
  if (isValidProtocol(absoluteUrl)) {
   return absoluteUrl;
  }
 } catch (ex) {
 }
 return null;
}
function shadow(obj, prop, value) {
 Object.defineProperty(obj, prop, {
  value: value,
  enumerable: true,
  configurable: true,
  writable: false
 });
 return value;
}
function getLookupTableFactory(initializer) {
 var lookup;
 return function () {
  if (initializer) {
   lookup = Object.create(null);
   initializer(lookup);
   initializer = null;
  }
  return lookup;
 };
}
var PasswordResponses = {
 NEED_PASSWORD: 1,
 INCORRECT_PASSWORD: 2
};
var PasswordException = function PasswordExceptionClosure() {
 function PasswordException(msg, code) {
  this.name = 'PasswordException';
  this.message = msg;
  this.code = code;
 }
 PasswordException.prototype = new Error();
 PasswordException.constructor = PasswordException;
 return PasswordException;
}();
var UnknownErrorException = function UnknownErrorExceptionClosure() {
 function UnknownErrorException(msg, details) {
  this.name = 'UnknownErrorException';
  this.message = msg;
  this.details = details;
 }
 UnknownErrorException.prototype = new Error();
 UnknownErrorException.constructor = UnknownErrorException;
 return UnknownErrorException;
}();
var InvalidPDFException = function InvalidPDFExceptionClosure() {
 function InvalidPDFException(msg) {
  this.name = 'InvalidPDFException';
  this.message = msg;
 }
 InvalidPDFException.prototype = new Error();
 InvalidPDFException.constructor = InvalidPDFException;
 return InvalidPDFException;
}();
var MissingPDFException = function MissingPDFExceptionClosure() {
 function MissingPDFException(msg) {
  this.name = 'MissingPDFException';
  this.message = msg;
 }
 MissingPDFException.prototype = new Error();
 MissingPDFException.constructor = MissingPDFException;
 return MissingPDFException;
}();
var UnexpectedResponseException = function UnexpectedResponseExceptionClosure() {
 function UnexpectedResponseException(msg, status) {
  this.name = 'UnexpectedResponseException';
  this.message = msg;
  this.status = status;
 }
 UnexpectedResponseException.prototype = new Error();
 UnexpectedResponseException.constructor = UnexpectedResponseException;
 return UnexpectedResponseException;
}();
var NotImplementedException = function NotImplementedExceptionClosure() {
 function NotImplementedException(msg) {
  this.message = msg;
 }
 NotImplementedException.prototype = new Error();
 NotImplementedException.prototype.name = 'NotImplementedException';
 NotImplementedException.constructor = NotImplementedException;
 return NotImplementedException;
}();
var MissingDataException = function MissingDataExceptionClosure() {
 function MissingDataException(begin, end) {
  this.begin = begin;
  this.end = end;
  this.message = 'Missing data [' + begin + ', ' + end + ')';
 }
 MissingDataException.prototype = new Error();
 MissingDataException.prototype.name = 'MissingDataException';
 MissingDataException.constructor = MissingDataException;
 return MissingDataException;
}();
var XRefParseException = function XRefParseExceptionClosure() {
 function XRefParseException(msg) {
  this.message = msg;
 }
 XRefParseException.prototype = new Error();
 XRefParseException.prototype.name = 'XRefParseException';
 XRefParseException.constructor = XRefParseException;
 return XRefParseException;
}();
var NullCharactersRegExp = /\x00/g;
function removeNullCharacters(str) {
 if (typeof str !== 'string') {
  warn('The argument for removeNullCharacters must be a string.');
  return str;
 }
 return str.replace(NullCharactersRegExp, '');
}
function bytesToString(bytes) {
 assert(bytes !== null && typeof bytes === 'object' && bytes.length !== undefined, 'Invalid argument for bytesToString');
 var length = bytes.length;
 var MAX_ARGUMENT_COUNT = 8192;
 if (length < MAX_ARGUMENT_COUNT) {
  return String.fromCharCode.apply(null, bytes);
 }
 var strBuf = [];
 for (var i = 0; i < length; i += MAX_ARGUMENT_COUNT) {
  var chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);
  var chunk = bytes.subarray(i, chunkEnd);
  strBuf.push(String.fromCharCode.apply(null, chunk));
 }
 return strBuf.join('');
}
function stringToBytes(str) {
 assert(typeof str === 'string', 'Invalid argument for stringToBytes');
 var length = str.length;
 var bytes = new Uint8Array(length);
 for (var i = 0; i < length; ++i) {
  bytes[i] = str.charCodeAt(i) & 0xFF;
 }
 return bytes;
}
function arrayByteLength(arr) {
 if (arr.length !== undefined) {
  return arr.length;
 }
 assert(arr.byteLength !== undefined);
 return arr.byteLength;
}
function arraysToBytes(arr) {
 if (arr.length === 1 && arr[0] instanceof Uint8Array) {
  return arr[0];
 }
 var resultLength = 0;
 var i, ii = arr.length;
 var item, itemLength;
 for (i = 0; i < ii; i++) {
  item = arr[i];
  itemLength = arrayByteLength(item);
  resultLength += itemLength;
 }
 var pos = 0;
 var data = new Uint8Array(resultLength);
 for (i = 0; i < ii; i++) {
  item = arr[i];
  if (!(item instanceof Uint8Array)) {
   if (typeof item === 'string') {
    item = stringToBytes(item);
   } else {
    item = new Uint8Array(item);
   }
  }
  itemLength = item.byteLength;
  data.set(item, pos);
  pos += itemLength;
 }
 return data;
}
function string32(value) {
 return String.fromCharCode(value >> 24 & 0xff, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff);
}
function log2(x) {
 var n = 1, i = 0;
 while (x > n) {
  n <<= 1;
  i++;
 }
 return i;
}
function readInt8(data, start) {
 return data[start] << 24 >> 24;
}
function readUint16(data, offset) {
 return data[offset] << 8 | data[offset + 1];
}
function readUint32(data, offset) {
 return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
}
function isLittleEndian() {
 var buffer8 = new Uint8Array(2);
 buffer8[0] = 1;
 var buffer16 = new Uint16Array(buffer8.buffer);
 return buffer16[0] === 1;
}
function isEvalSupported() {
 try {
  new Function('');
  return true;
 } catch (e) {
  return false;
 }
}
var Uint32ArrayView = function Uint32ArrayViewClosure() {
 function Uint32ArrayView(buffer, length) {
  this.buffer = buffer;
  this.byteLength = buffer.length;
  this.length = length === undefined ? this.byteLength >> 2 : length;
  ensureUint32ArrayViewProps(this.length);
 }
 Uint32ArrayView.prototype = Object.create(null);
 var uint32ArrayViewSetters = 0;
 function createUint32ArrayProp(index) {
  return {
   get: function () {
    var buffer = this.buffer, offset = index << 2;
    return (buffer[offset] | buffer[offset + 1] << 8 | buffer[offset + 2] << 16 | buffer[offset + 3] << 24) >>> 0;
   },
   set: function (value) {
    var buffer = this.buffer, offset = index << 2;
    buffer[offset] = value & 255;
    buffer[offset + 1] = value >> 8 & 255;
    buffer[offset + 2] = value >> 16 & 255;
    buffer[offset + 3] = value >>> 24 & 255;
   }
  };
 }
 function ensureUint32ArrayViewProps(length) {
  while (uint32ArrayViewSetters < length) {
   Object.defineProperty(Uint32ArrayView.prototype, uint32ArrayViewSetters, createUint32ArrayProp(uint32ArrayViewSetters));
   uint32ArrayViewSetters++;
  }
 }
 return Uint32ArrayView;
}();
exports.Uint32ArrayView = Uint32ArrayView;
var IDENTITY_MATRIX = [
 1,
 0,
 0,
 1,
 0,
 0
];
var Util = function UtilClosure() {
 function Util() {
 }
 var rgbBuf = [
  'rgb(',
  0,
  ',',
  0,
  ',',
  0,
  ')'
 ];
 Util.makeCssRgb = function Util_makeCssRgb(r, g, b) {
  rgbBuf[1] = r;
  rgbBuf[3] = g;
  rgbBuf[5] = b;
  return rgbBuf.join('');
 };
 Util.transform = function Util_transform(m1, m2) {
  return [
   m1[0] * m2[0] + m1[2] * m2[1],
   m1[1] * m2[0] + m1[3] * m2[1],
   m1[0] * m2[2] + m1[2] * m2[3],
   m1[1] * m2[2] + m1[3] * m2[3],
   m1[0] * m2[4] + m1[2] * m2[5] + m1[4],
   m1[1] * m2[4] + m1[3] * m2[5] + m1[5]
  ];
 };
 Util.applyTransform = function Util_applyTransform(p, m) {
  var xt = p[0] * m[0] + p[1] * m[2] + m[4];
  var yt = p[0] * m[1] + p[1] * m[3] + m[5];
  return [
   xt,
   yt
  ];
 };
 Util.applyInverseTransform = function Util_applyInverseTransform(p, m) {
  var d = m[0] * m[3] - m[1] * m[2];
  var xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
  var yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
  return [
   xt,
   yt
  ];
 };
 Util.getAxialAlignedBoundingBox = function Util_getAxialAlignedBoundingBox(r, m) {
  var p1 = Util.applyTransform(r, m);
  var p2 = Util.applyTransform(r.slice(2, 4), m);
  var p3 = Util.applyTransform([
   r[0],
   r[3]
  ], m);
  var p4 = Util.applyTransform([
   r[2],
   r[1]
  ], m);
  return [
   Math.min(p1[0], p2[0], p3[0], p4[0]),
   Math.min(p1[1], p2[1], p3[1], p4[1]),
   Math.max(p1[0], p2[0], p3[0], p4[0]),
   Math.max(p1[1], p2[1], p3[1], p4[1])
  ];
 };
 Util.inverseTransform = function Util_inverseTransform(m) {
  var d = m[0] * m[3] - m[1] * m[2];
  return [
   m[3] / d,
   -m[1] / d,
   -m[2] / d,
   m[0] / d,
   (m[2] * m[5] - m[4] * m[3]) / d,
   (m[4] * m[1] - m[5] * m[0]) / d
  ];
 };
 Util.apply3dTransform = function Util_apply3dTransform(m, v) {
  return [
   m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
   m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
   m[6] * v[0] + m[7] * v[1] + m[8] * v[2]
  ];
 };
 Util.singularValueDecompose2dScale = function Util_singularValueDecompose2dScale(m) {
  var transpose = [
   m[0],
   m[2],
   m[1],
   m[3]
  ];
  var a = m[0] * transpose[0] + m[1] * transpose[2];
  var b = m[0] * transpose[1] + m[1] * transpose[3];
  var c = m[2] * transpose[0] + m[3] * transpose[2];
  var d = m[2] * transpose[1] + m[3] * transpose[3];
  var first = (a + d) / 2;
  var second = Math.sqrt((a + d) * (a + d) - 4 * (a * d - c * b)) / 2;
  var sx = first + second || 1;
  var sy = first - second || 1;
  return [
   Math.sqrt(sx),
   Math.sqrt(sy)
  ];
 };
 Util.normalizeRect = function Util_normalizeRect(rect) {
  var r = rect.slice(0);
  if (rect[0] > rect[2]) {
   r[0] = rect[2];
   r[2] = rect[0];
  }
  if (rect[1] > rect[3]) {
   r[1] = rect[3];
   r[3] = rect[1];
  }
  return r;
 };
 Util.intersect = function Util_intersect(rect1, rect2) {
  function compare(a, b) {
   return a - b;
  }
  var orderedX = [
    rect1[0],
    rect1[2],
    rect2[0],
    rect2[2]
   ].sort(compare), orderedY = [
    rect1[1],
    rect1[3],
    rect2[1],
    rect2[3]
   ].sort(compare), result = [];
  rect1 = Util.normalizeRect(rect1);
  rect2 = Util.normalizeRect(rect2);
  if (orderedX[0] === rect1[0] && orderedX[1] === rect2[0] || orderedX[0] === rect2[0] && orderedX[1] === rect1[0]) {
   result[0] = orderedX[1];
   result[2] = orderedX[2];
  } else {
   return false;
  }
  if (orderedY[0] === rect1[1] && orderedY[1] === rect2[1] || orderedY[0] === rect2[1] && orderedY[1] === rect1[1]) {
   result[1] = orderedY[1];
   result[3] = orderedY[2];
  } else {
   return false;
  }
  return result;
 };
 Util.sign = function Util_sign(num) {
  return num < 0 ? -1 : 1;
 };
 var ROMAN_NUMBER_MAP = [
  '',
  'C',
  'CC',
  'CCC',
  'CD',
  'D',
  'DC',
  'DCC',
  'DCCC',
  'CM',
  '',
  'X',
  'XX',
  'XXX',
  'XL',
  'L',
  'LX',
  'LXX',
  'LXXX',
  'XC',
  '',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX'
 ];
 Util.toRoman = function Util_toRoman(number, lowerCase) {
  assert(isInt(number) && number > 0, 'The number should be a positive integer.');
  var pos, romanBuf = [];
  while (number >= 1000) {
   number -= 1000;
   romanBuf.push('M');
  }
  pos = number / 100 | 0;
  number %= 100;
  romanBuf.push(ROMAN_NUMBER_MAP[pos]);
  pos = number / 10 | 0;
  number %= 10;
  romanBuf.push(ROMAN_NUMBER_MAP[10 + pos]);
  romanBuf.push(ROMAN_NUMBER_MAP[20 + number]);
  var romanStr = romanBuf.join('');
  return lowerCase ? romanStr.toLowerCase() : romanStr;
 };
 Util.appendToArray = function Util_appendToArray(arr1, arr2) {
  Array.prototype.push.apply(arr1, arr2);
 };
 Util.prependToArray = function Util_prependToArray(arr1, arr2) {
  Array.prototype.unshift.apply(arr1, arr2);
 };
 Util.extendObj = function extendObj(obj1, obj2) {
  for (var key in obj2) {
   obj1[key] = obj2[key];
  }
 };
 Util.getInheritableProperty = function Util_getInheritableProperty(dict, name, getArray) {
  while (dict && !dict.has(name)) {
   dict = dict.get('Parent');
  }
  if (!dict) {
   return null;
  }
  return getArray ? dict.getArray(name) : dict.get(name);
 };
 Util.inherit = function Util_inherit(sub, base, prototype) {
  sub.prototype = Object.create(base.prototype);
  sub.prototype.constructor = sub;
  for (var prop in prototype) {
   sub.prototype[prop] = prototype[prop];
  }
 };
 Util.loadScript = function Util_loadScript(src, callback) {
  var script = document.createElement('script');
  var loaded = false;
  script.setAttribute('src', src);
  if (callback) {
   script.onload = function () {
    if (!loaded) {
     callback();
    }
    loaded = true;
   };
  }
  document.getElementsByTagName('head')[0].appendChild(script);
 };
 return Util;
}();
var PageViewport = function PageViewportClosure() {
 function PageViewport(viewBox, scale, rotation, offsetX, offsetY, dontFlip) {
  this.viewBox = viewBox;
  this.scale = scale;
  this.rotation = rotation;
  this.offsetX = offsetX;
  this.offsetY = offsetY;
  var centerX = (viewBox[2] + viewBox[0]) / 2;
  var centerY = (viewBox[3] + viewBox[1]) / 2;
  var rotateA, rotateB, rotateC, rotateD;
  rotation = rotation % 360;
  rotation = rotation < 0 ? rotation + 360 : rotation;
  switch (rotation) {
  case 180:
   rotateA = -1;
   rotateB = 0;
   rotateC = 0;
   rotateD = 1;
   break;
  case 90:
   rotateA = 0;
   rotateB = 1;
   rotateC = 1;
   rotateD = 0;
   break;
  case 270:
   rotateA = 0;
   rotateB = -1;
   rotateC = -1;
   rotateD = 0;
   break;
  default:
   rotateA = 1;
   rotateB = 0;
   rotateC = 0;
   rotateD = -1;
   break;
  }
  if (dontFlip) {
   rotateC = -rotateC;
   rotateD = -rotateD;
  }
  var offsetCanvasX, offsetCanvasY;
  var width, height;
  if (rotateA === 0) {
   offsetCanvasX = Math.abs(centerY - viewBox[1]) * scale + offsetX;
   offsetCanvasY = Math.abs(centerX - viewBox[0]) * scale + offsetY;
   width = Math.abs(viewBox[3] - viewBox[1]) * scale;
   height = Math.abs(viewBox[2] - viewBox[0]) * scale;
  } else {
   offsetCanvasX = Math.abs(centerX - viewBox[0]) * scale + offsetX;
   offsetCanvasY = Math.abs(centerY - viewBox[1]) * scale + offsetY;
   width = Math.abs(viewBox[2] - viewBox[0]) * scale;
   height = Math.abs(viewBox[3] - viewBox[1]) * scale;
  }
  this.transform = [
   rotateA * scale,
   rotateB * scale,
   rotateC * scale,
   rotateD * scale,
   offsetCanvasX - rotateA * scale * centerX - rotateC * scale * centerY,
   offsetCanvasY - rotateB * scale * centerX - rotateD * scale * centerY
  ];
  this.width = width;
  this.height = height;
  this.fontScale = scale;
 }
 PageViewport.prototype = {
  clone: function PageViewPort_clone(args) {
   args = args || {};
   var scale = 'scale' in args ? args.scale : this.scale;
   var rotation = 'rotation' in args ? args.rotation : this.rotation;
   return new PageViewport(this.viewBox.slice(), scale, rotation, this.offsetX, this.offsetY, args.dontFlip);
  },
  convertToViewportPoint: function PageViewport_convertToViewportPoint(x, y) {
   return Util.applyTransform([
    x,
    y
   ], this.transform);
  },
  convertToViewportRectangle: function PageViewport_convertToViewportRectangle(rect) {
   var tl = Util.applyTransform([
    rect[0],
    rect[1]
   ], this.transform);
   var br = Util.applyTransform([
    rect[2],
    rect[3]
   ], this.transform);
   return [
    tl[0],
    tl[1],
    br[0],
    br[1]
   ];
  },
  convertToPdfPoint: function PageViewport_convertToPdfPoint(x, y) {
   return Util.applyInverseTransform([
    x,
    y
   ], this.transform);
  }
 };
 return PageViewport;
}();
var PDFStringTranslateTable = [
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0x2D8,
 0x2C7,
 0x2C6,
 0x2D9,
 0x2DD,
 0x2DB,
 0x2DA,
 0x2DC,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0,
 0x2022,
 0x2020,
 0x2021,
 0x2026,
 0x2014,
 0x2013,
 0x192,
 0x2044,
 0x2039,
 0x203A,
 0x2212,
 0x2030,
 0x201E,
 0x201C,
 0x201D,
 0x2018,
 0x2019,
 0x201A,
 0x2122,
 0xFB01,
 0xFB02,
 0x141,
 0x152,
 0x160,
 0x178,
 0x17D,
 0x131,
 0x142,
 0x153,
 0x161,
 0x17E,
 0,
 0x20AC
];
function stringToPDFString(str) {
 var i, n = str.length, strBuf = [];
 if (str[0] === '\xFE' && str[1] === '\xFF') {
  for (i = 2; i < n; i += 2) {
   strBuf.push(String.fromCharCode(str.charCodeAt(i) << 8 | str.charCodeAt(i + 1)));
  }
 } else {
  for (i = 0; i < n; ++i) {
   var code = PDFStringTranslateTable[str.charCodeAt(i)];
   strBuf.push(code ? String.fromCharCode(code) : str.charAt(i));
  }
 }
 return strBuf.join('');
}
function stringToUTF8String(str) {
 return decodeURIComponent(escape(str));
}
function utf8StringToString(str) {
 return unescape(encodeURIComponent(str));
}
function isEmptyObj(obj) {
 for (var key in obj) {
  return false;
 }
 return true;
}
function isBool(v) {
 return typeof v === 'boolean';
}
function isInt(v) {
 return typeof v === 'number' && (v | 0) === v;
}
function isNum(v) {
 return typeof v === 'number';
}
function isString(v) {
 return typeof v === 'string';
}
function isArray(v) {
 return v instanceof Array;
}
function isArrayBuffer(v) {
 return typeof v === 'object' && v !== null && v.byteLength !== undefined;
}
function isSpace(ch) {
 return ch === 0x20 || ch === 0x09 || ch === 0x0D || ch === 0x0A;
}
function isNodeJS() {
 if (typeof __pdfjsdev_webpack__ === 'undefined') {
  return typeof process === 'object' && process + '' === '[object process]';
 }
 return false;
}
function createPromiseCapability() {
 var capability = {};
 capability.promise = new Promise(function (resolve, reject) {
  capability.resolve = resolve;
  capability.reject = reject;
 });
 return capability;
}
var StatTimer = function StatTimerClosure() {
 function rpad(str, pad, length) {
  while (str.length < length) {
   str += pad;
  }
  return str;
 }
 function StatTimer() {
  this.started = Object.create(null);
  this.times = [];
  this.enabled = true;
 }
 StatTimer.prototype = {
  time: function StatTimer_time(name) {
   if (!this.enabled) {
    return;
   }
   if (name in this.started) {
    warn('Timer is already running for ' + name);
   }
   this.started[name] = Date.now();
  },
  timeEnd: function StatTimer_timeEnd(name) {
   if (!this.enabled) {
    return;
   }
   if (!(name in this.started)) {
    warn('Timer has not been started for ' + name);
   }
   this.times.push({
    'name': name,
    'start': this.started[name],
    'end': Date.now()
   });
   delete this.started[name];
  },
  toString: function StatTimer_toString() {
   var i, ii;
   var times = this.times;
   var out = '';
   var longest = 0;
   for (i = 0, ii = times.length; i < ii; ++i) {
    var name = times[i]['name'];
    if (name.length > longest) {
     longest = name.length;
    }
   }
   for (i = 0, ii = times.length; i < ii; ++i) {
    var span = times[i];
    var duration = span.end - span.start;
    out += rpad(span['name'], ' ', longest) + ' ' + duration + 'ms\n';
   }
   return out;
  }
 };
 return StatTimer;
}();
var createBlob = function createBlob(data, contentType) {
 if (typeof Blob !== 'undefined') {
  return new Blob([data], { type: contentType });
 }
 warn('The "Blob" constructor is not supported.');
};
var createObjectURL = function createObjectURLClosure() {
 var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
 return function createObjectURL(data, contentType, forceDataSchema) {
  if (!forceDataSchema && typeof URL !== 'undefined' && URL.createObjectURL) {
   var blob = createBlob(data, contentType);
   return URL.createObjectURL(blob);
  }
  var buffer = 'data:' + contentType + ';base64,';
  for (var i = 0, ii = data.length; i < ii; i += 3) {
   var b1 = data[i] & 0xFF;
   var b2 = data[i + 1] & 0xFF;
   var b3 = data[i + 2] & 0xFF;
   var d1 = b1 >> 2, d2 = (b1 & 3) << 4 | b2 >> 4;
   var d3 = i + 1 < ii ? (b2 & 0xF) << 2 | b3 >> 6 : 64;
   var d4 = i + 2 < ii ? b3 & 0x3F : 64;
   buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
  }
  return buffer;
 };
}();
function MessageHandler(sourceName, targetName, comObj) {
 this.sourceName = sourceName;
 this.targetName = targetName;
 this.comObj = comObj;
 this.callbackIndex = 1;
 this.postMessageTransfers = true;
 var callbacksCapabilities = this.callbacksCapabilities = Object.create(null);
 var ah = this.actionHandler = Object.create(null);
 this._onComObjOnMessage = function messageHandlerComObjOnMessage(event) {
  var data = event.data;
  if (data.targetName !== this.sourceName) {
   return;
  }
  if (data.isReply) {
   var callbackId = data.callbackId;
   if (data.callbackId in callbacksCapabilities) {
    var callback = callbacksCapabilities[callbackId];
    delete callbacksCapabilities[callbackId];
    if ('error' in data) {
     callback.reject(data.error);
    } else {
     callback.resolve(data.data);
    }
   } else {
    error('Cannot resolve callback ' + callbackId);
   }
  } else if (data.action in ah) {
   var action = ah[data.action];
   if (data.callbackId) {
    var sourceName = this.sourceName;
    var targetName = data.sourceName;
    Promise.resolve().then(function () {
     return action[0].call(action[1], data.data);
    }).then(function (result) {
     comObj.postMessage({
      sourceName: sourceName,
      targetName: targetName,
      isReply: true,
      callbackId: data.callbackId,
      data: result
     });
    }, function (reason) {
     if (reason instanceof Error) {
      reason = reason + '';
     }
     comObj.postMessage({
      sourceName: sourceName,
      targetName: targetName,
      isReply: true,
      callbackId: data.callbackId,
      error: reason
     });
    });
   } else {
    action[0].call(action[1], data.data);
   }
  } else {
   error('Unknown action from worker: ' + data.action);
  }
 }.bind(this);
 comObj.addEventListener('message', this._onComObjOnMessage);
}
MessageHandler.prototype = {
 on: function messageHandlerOn(actionName, handler, scope) {
  var ah = this.actionHandler;
  if (ah[actionName]) {
   error('There is already an actionName called "' + actionName + '"');
  }
  ah[actionName] = [
   handler,
   scope
  ];
 },
 send: function messageHandlerSend(actionName, data, transfers) {
  var message = {
   sourceName: this.sourceName,
   targetName: this.targetName,
   action: actionName,
   data: data
  };
  this.postMessage(message, transfers);
 },
 sendWithPromise: function messageHandlerSendWithPromise(actionName, data, transfers) {
  var callbackId = this.callbackIndex++;
  var message = {
   sourceName: this.sourceName,
   targetName: this.targetName,
   action: actionName,
   data: data,
   callbackId: callbackId
  };
  var capability = createPromiseCapability();
  this.callbacksCapabilities[callbackId] = capability;
  try {
   this.postMessage(message, transfers);
  } catch (e) {
   capability.reject(e);
  }
  return capability.promise;
 },
 postMessage: function (message, transfers) {
  if (transfers && this.postMessageTransfers) {
   this.comObj.postMessage(message, transfers);
  } else {
   this.comObj.postMessage(message);
  }
 },
 destroy: function () {
  this.comObj.removeEventListener('message', this._onComObjOnMessage);
 }
};
function loadJpegStream(id, imageUrl, objs) {
 var img = new Image();
 img.onload = function loadJpegStream_onloadClosure() {
  objs.resolve(id, img);
 };
 img.onerror = function loadJpegStream_onerrorClosure() {
  objs.resolve(id, null);
  warn('Error during JPEG image loading');
 };
 img.src = imageUrl;
}
exports.FONT_IDENTITY_MATRIX = FONT_IDENTITY_MATRIX;
exports.IDENTITY_MATRIX = IDENTITY_MATRIX;
exports.OPS = OPS;
exports.VERBOSITY_LEVELS = VERBOSITY_LEVELS;
exports.UNSUPPORTED_FEATURES = UNSUPPORTED_FEATURES;
exports.AnnotationBorderStyleType = AnnotationBorderStyleType;
exports.AnnotationFieldFlag = AnnotationFieldFlag;
exports.AnnotationFlag = AnnotationFlag;
exports.AnnotationType = AnnotationType;
exports.FontType = FontType;
exports.ImageKind = ImageKind;
exports.CMapCompressionType = CMapCompressionType;
exports.InvalidPDFException = InvalidPDFException;
exports.MessageHandler = MessageHandler;
exports.MissingDataException = MissingDataException;
exports.MissingPDFException = MissingPDFException;
exports.NotImplementedException = NotImplementedException;
exports.PageViewport = PageViewport;
exports.PasswordException = PasswordException;
exports.PasswordResponses = PasswordResponses;
exports.StatTimer = StatTimer;
exports.StreamType = StreamType;
exports.TextRenderingMode = TextRenderingMode;
exports.UnexpectedResponseException = UnexpectedResponseException;
exports.UnknownErrorException = UnknownErrorException;
exports.Util = Util;
exports.XRefParseException = XRefParseException;
exports.arrayByteLength = arrayByteLength;
exports.arraysToBytes = arraysToBytes;
exports.assert = assert;
exports.bytesToString = bytesToString;
exports.createBlob = createBlob;
exports.createPromiseCapability = createPromiseCapability;
exports.createObjectURL = createObjectURL;
exports.deprecated = deprecated;
exports.error = error;
exports.getLookupTableFactory = getLookupTableFactory;
exports.getVerbosityLevel = getVerbosityLevel;
exports.globalScope = globalScope;
exports.info = info;
exports.isArray = isArray;
exports.isArrayBuffer = isArrayBuffer;
exports.isBool = isBool;
exports.isEmptyObj = isEmptyObj;
exports.isInt = isInt;
exports.isNum = isNum;
exports.isString = isString;
exports.isSpace = isSpace;
exports.isNodeJS = isNodeJS;
exports.isSameOrigin = isSameOrigin;
exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
exports.isLittleEndian = isLittleEndian;
exports.isEvalSupported = isEvalSupported;
exports.loadJpegStream = loadJpegStream;
exports.log2 = log2;
exports.readInt8 = readInt8;
exports.readUint16 = readUint16;
exports.readUint32 = readUint32;
exports.removeNullCharacters = removeNullCharacters;
exports.setVerbosityLevel = setVerbosityLevel;
exports.shadow = shadow;
exports.string32 = string32;
exports.stringToBytes = stringToBytes;
exports.stringToPDFString = stringToPDFString;
exports.stringToUTF8String = stringToUTF8String;
exports.utf8StringToString = utf8StringToString;
exports.warn = warn;
/* WEBPACK VAR INJECTION */}.call(exports, __w_pdfjs_require__(6)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var assert = sharedUtil.assert;
var removeNullCharacters = sharedUtil.removeNullCharacters;
var warn = sharedUtil.warn;
var deprecated = sharedUtil.deprecated;
var createValidAbsoluteUrl = sharedUtil.createValidAbsoluteUrl;
var stringToBytes = sharedUtil.stringToBytes;
var CMapCompressionType = sharedUtil.CMapCompressionType;
var DEFAULT_LINK_REL = 'noopener noreferrer nofollow';
function DOMCanvasFactory() {
}
DOMCanvasFactory.prototype = {
 create: function DOMCanvasFactory_create(width, height) {
  assert(width > 0 && height > 0, 'invalid canvas size');
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  return {
   canvas: canvas,
   context: context
  };
 },
 reset: function DOMCanvasFactory_reset(canvasAndContextPair, width, height) {
  assert(canvasAndContextPair.canvas, 'canvas is not specified');
  assert(width > 0 && height > 0, 'invalid canvas size');
  canvasAndContextPair.canvas.width = width;
  canvasAndContextPair.canvas.height = height;
 },
 destroy: function DOMCanvasFactory_destroy(canvasAndContextPair) {
  assert(canvasAndContextPair.canvas, 'canvas is not specified');
  canvasAndContextPair.canvas.width = 0;
  canvasAndContextPair.canvas.height = 0;
  canvasAndContextPair.canvas = null;
  canvasAndContextPair.context = null;
 }
};
var DOMCMapReaderFactory = function DOMCMapReaderFactoryClosure() {
 function DOMCMapReaderFactory(params) {
  this.baseUrl = params.baseUrl || null;
  this.isCompressed = params.isCompressed || false;
 }
 DOMCMapReaderFactory.prototype = {
  fetch: function (params) {
   if (!params.name) {
    return Promise.reject(new Error('CMap name must be specified.'));
   }
   return new Promise(function (resolve, reject) {
    var url = this.baseUrl + params.name;
    var request = new XMLHttpRequest();
    if (this.isCompressed) {
     url += '.bcmap';
     request.responseType = 'arraybuffer';
    }
    request.onreadystatechange = function () {
     if (request.readyState === XMLHttpRequest.DONE && (request.status === 200 || request.status === 0)) {
      var data;
      if (this.isCompressed && request.response) {
       data = new Uint8Array(request.response);
      } else if (!this.isCompressed && request.responseText) {
       data = stringToBytes(request.responseText);
      }
      if (data) {
       resolve({
        cMapData: data,
        compressionType: this.isCompressed ? CMapCompressionType.BINARY : CMapCompressionType.NONE
       });
       return;
      }
      reject(new Error('Unable to load ' + (this.isCompressed ? 'binary' : '') + ' CMap at: ' + url));
     }
    }.bind(this);
    request.open('GET', url, true);
    request.send(null);
   }.bind(this));
  }
 };
 return DOMCMapReaderFactory;
}();
var CustomStyle = function CustomStyleClosure() {
 var prefixes = [
  'ms',
  'Moz',
  'Webkit',
  'O'
 ];
 var _cache = Object.create(null);
 function CustomStyle() {
 }
 CustomStyle.getProp = function get(propName, element) {
  if (arguments.length === 1 && typeof _cache[propName] === 'string') {
   return _cache[propName];
  }
  element = element || document.documentElement;
  var style = element.style, prefixed, uPropName;
  if (typeof style[propName] === 'string') {
   return _cache[propName] = propName;
  }
  uPropName = propName.charAt(0).toUpperCase() + propName.slice(1);
  for (var i = 0, l = prefixes.length; i < l; i++) {
   prefixed = prefixes[i] + uPropName;
   if (typeof style[prefixed] === 'string') {
    return _cache[propName] = prefixed;
   }
  }
  return _cache[propName] = 'undefined';
 };
 CustomStyle.setProp = function set(propName, element, str) {
  var prop = this.getProp(propName);
  if (prop !== 'undefined') {
   element.style[prop] = str;
  }
 };
 return CustomStyle;
}();
var hasCanvasTypedArrays;
hasCanvasTypedArrays = function hasCanvasTypedArrays() {
 var canvas = document.createElement('canvas');
 canvas.width = canvas.height = 1;
 var ctx = canvas.getContext('2d');
 var imageData = ctx.createImageData(1, 1);
 return typeof imageData.data.buffer !== 'undefined';
};
var LinkTarget = {
 NONE: 0,
 SELF: 1,
 BLANK: 2,
 PARENT: 3,
 TOP: 4
};
var LinkTargetStringMap = [
 '',
 '_self',
 '_blank',
 '_parent',
 '_top'
];
function addLinkAttributes(link, params) {
 var url = params && params.url;
 link.href = link.title = url ? removeNullCharacters(url) : '';
 if (url) {
  var target = params.target;
  if (typeof target === 'undefined') {
   target = getDefaultSetting('externalLinkTarget');
  }
  link.target = LinkTargetStringMap[target];
  var rel = params.rel;
  if (typeof rel === 'undefined') {
   rel = getDefaultSetting('externalLinkRel');
  }
  link.rel = rel;
 }
}
function getFilenameFromUrl(url) {
 var anchor = url.indexOf('#');
 var query = url.indexOf('?');
 var end = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
 return url.substring(url.lastIndexOf('/', end) + 1, end);
}
function getDefaultSetting(id) {
 var globalSettings = sharedUtil.globalScope.PDFJS;
 switch (id) {
 case 'pdfBug':
  return globalSettings ? globalSettings.pdfBug : false;
 case 'disableAutoFetch':
  return globalSettings ? globalSettings.disableAutoFetch : false;
 case 'disableStream':
  return globalSettings ? globalSettings.disableStream : false;
 case 'disableRange':
  return globalSettings ? globalSettings.disableRange : false;
 case 'disableFontFace':
  return globalSettings ? globalSettings.disableFontFace : false;
 case 'disableCreateObjectURL':
  return globalSettings ? globalSettings.disableCreateObjectURL : false;
 case 'disableWebGL':
  return globalSettings ? globalSettings.disableWebGL : true;
 case 'cMapUrl':
  return globalSettings ? globalSettings.cMapUrl : null;
 case 'cMapPacked':
  return globalSettings ? globalSettings.cMapPacked : false;
 case 'postMessageTransfers':
  return globalSettings ? globalSettings.postMessageTransfers : true;
 case 'workerPort':
  return globalSettings ? globalSettings.workerPort : null;
 case 'workerSrc':
  return globalSettings ? globalSettings.workerSrc : null;
 case 'disableWorker':
  return globalSettings ? globalSettings.disableWorker : false;
 case 'maxImageSize':
  return globalSettings ? globalSettings.maxImageSize : -1;
 case 'imageResourcesPath':
  return globalSettings ? globalSettings.imageResourcesPath : '';
 case 'isEvalSupported':
  return globalSettings ? globalSettings.isEvalSupported : true;
 case 'externalLinkTarget':
  if (!globalSettings) {
   return LinkTarget.NONE;
  }
  switch (globalSettings.externalLinkTarget) {
  case LinkTarget.NONE:
  case LinkTarget.SELF:
  case LinkTarget.BLANK:
  case LinkTarget.PARENT:
  case LinkTarget.TOP:
   return globalSettings.externalLinkTarget;
  }
  warn('PDFJS.externalLinkTarget is invalid: ' + globalSettings.externalLinkTarget);
  globalSettings.externalLinkTarget = LinkTarget.NONE;
  return LinkTarget.NONE;
 case 'externalLinkRel':
  return globalSettings ? globalSettings.externalLinkRel : DEFAULT_LINK_REL;
 case 'enableStats':
  return !!(globalSettings && globalSettings.enableStats);
 default:
  throw new Error('Unknown default setting: ' + id);
 }
}
function isExternalLinkTargetSet() {
 var externalLinkTarget = getDefaultSetting('externalLinkTarget');
 switch (externalLinkTarget) {
 case LinkTarget.NONE:
  return false;
 case LinkTarget.SELF:
 case LinkTarget.BLANK:
 case LinkTarget.PARENT:
 case LinkTarget.TOP:
  return true;
 }
}
function isValidUrl(url, allowRelative) {
 deprecated('isValidUrl(), please use createValidAbsoluteUrl() instead.');
 var baseUrl = allowRelative ? 'http://example.com' : null;
 return createValidAbsoluteUrl(url, baseUrl) !== null;
}
exports.CustomStyle = CustomStyle;
exports.addLinkAttributes = addLinkAttributes;
exports.isExternalLinkTargetSet = isExternalLinkTargetSet;
exports.isValidUrl = isValidUrl;
exports.getFilenameFromUrl = getFilenameFromUrl;
exports.LinkTarget = LinkTarget;
exports.hasCanvasTypedArrays = hasCanvasTypedArrays;
exports.getDefaultSetting = getDefaultSetting;
exports.DEFAULT_LINK_REL = DEFAULT_LINK_REL;
exports.DOMCanvasFactory = DOMCanvasFactory;
exports.DOMCMapReaderFactory = DOMCMapReaderFactory;

/***/ }),
/* 2 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var displayDOMUtils = __w_pdfjs_require__(1);
var AnnotationBorderStyleType = sharedUtil.AnnotationBorderStyleType;
var AnnotationType = sharedUtil.AnnotationType;
var stringToPDFString = sharedUtil.stringToPDFString;
var Util = sharedUtil.Util;
var addLinkAttributes = displayDOMUtils.addLinkAttributes;
var LinkTarget = displayDOMUtils.LinkTarget;
var getFilenameFromUrl = displayDOMUtils.getFilenameFromUrl;
var warn = sharedUtil.warn;
var CustomStyle = displayDOMUtils.CustomStyle;
var getDefaultSetting = displayDOMUtils.getDefaultSetting;
function AnnotationElementFactory() {
}
AnnotationElementFactory.prototype = {
 create: function AnnotationElementFactory_create(parameters) {
  var subtype = parameters.data.annotationType;
  switch (subtype) {
  case AnnotationType.LINK:
   return new LinkAnnotationElement(parameters);
  case AnnotationType.TEXT:
   return new TextAnnotationElement(parameters);
  case AnnotationType.WIDGET:
   var fieldType = parameters.data.fieldType;
   switch (fieldType) {
   case 'Tx':
    return new TextWidgetAnnotationElement(parameters);
   case 'Btn':
    if (parameters.data.radioButton) {
     return new RadioButtonWidgetAnnotationElement(parameters);
    } else if (parameters.data.checkBox) {
     return new CheckboxWidgetAnnotationElement(parameters);
    }
    warn('Unimplemented button widget annotation: pushbutton');
    break;
   case 'Ch':
    return new ChoiceWidgetAnnotationElement(parameters);
   }
   return new WidgetAnnotationElement(parameters);
  case AnnotationType.POPUP:
   return new PopupAnnotationElement(parameters);
  case AnnotationType.HIGHLIGHT:
   return new HighlightAnnotationElement(parameters);
  case AnnotationType.UNDERLINE:
   return new UnderlineAnnotationElement(parameters);
  case AnnotationType.SQUIGGLY:
   return new SquigglyAnnotationElement(parameters);
  case AnnotationType.STRIKEOUT:
   return new StrikeOutAnnotationElement(parameters);
  case AnnotationType.FILEATTACHMENT:
   return new FileAttachmentAnnotationElement(parameters);
  default:
   return new AnnotationElement(parameters);
  }
 }
};
var AnnotationElement = function AnnotationElementClosure() {
 function AnnotationElement(parameters, isRenderable) {
  this.isRenderable = isRenderable || false;
  this.data = parameters.data;
  this.layer = parameters.layer;
  this.page = parameters.page;
  this.viewport = parameters.viewport;
  this.linkService = parameters.linkService;
  this.downloadManager = parameters.downloadManager;
  this.imageResourcesPath = parameters.imageResourcesPath;
  this.renderInteractiveForms = parameters.renderInteractiveForms;
  if (isRenderable) {
   this.container = this._createContainer();
  }
 }
 AnnotationElement.prototype = {
  _createContainer: function AnnotationElement_createContainer() {
   var data = this.data, page = this.page, viewport = this.viewport;
   var container = document.createElement('section');
   var width = data.rect[2] - data.rect[0];
   var height = data.rect[3] - data.rect[1];
   container.setAttribute('data-annotation-id', data.id);
   var rect = Util.normalizeRect([
    data.rect[0],
    page.view[3] - data.rect[1] + page.view[1],
    data.rect[2],
    page.view[3] - data.rect[3] + page.view[1]
   ]);
   CustomStyle.setProp('transform', container, 'matrix(' + viewport.transform.join(',') + ')');
   CustomStyle.setProp('transformOrigin', container, -rect[0] + 'px ' + -rect[1] + 'px');
   if (data.borderStyle.width > 0) {
    container.style.borderWidth = data.borderStyle.width + 'px';
    if (data.borderStyle.style !== AnnotationBorderStyleType.UNDERLINE) {
     width = width - 2 * data.borderStyle.width;
     height = height - 2 * data.borderStyle.width;
    }
    var horizontalRadius = data.borderStyle.horizontalCornerRadius;
    var verticalRadius = data.borderStyle.verticalCornerRadius;
    if (horizontalRadius > 0 || verticalRadius > 0) {
     var radius = horizontalRadius + 'px / ' + verticalRadius + 'px';
     CustomStyle.setProp('borderRadius', container, radius);
    }
    switch (data.borderStyle.style) {
    case AnnotationBorderStyleType.SOLID:
     container.style.borderStyle = 'solid';
     break;
    case AnnotationBorderStyleType.DASHED:
     container.style.borderStyle = 'dashed';
     break;
    case AnnotationBorderStyleType.BEVELED:
     warn('Unimplemented border style: beveled');
     break;
    case AnnotationBorderStyleType.INSET:
     warn('Unimplemented border style: inset');
     break;
    case AnnotationBorderStyleType.UNDERLINE:
     container.style.borderBottomStyle = 'solid';
     break;
    default:
     break;
    }
    if (data.color) {
     container.style.borderColor = Util.makeCssRgb(data.color[0] | 0, data.color[1] | 0, data.color[2] | 0);
    } else {
     container.style.borderWidth = 0;
    }
   }
   container.style.left = rect[0] + 'px';
   container.style.top = rect[1] + 'px';
   container.style.width = width + 'px';
   container.style.height = height + 'px';
   return container;
  },
  _createPopup: function AnnotationElement_createPopup(container, trigger, data) {
   if (!trigger) {
    trigger = document.createElement('div');
    trigger.style.height = container.style.height;
    trigger.style.width = container.style.width;
    container.appendChild(trigger);
   }
   var popupElement = new PopupElement({
    container: container,
    trigger: trigger,
    color: data.color,
    title: data.title,
    contents: data.contents,
    hideWrapper: true
   });
   var popup = popupElement.render();
   popup.style.left = container.style.width;
   container.appendChild(popup);
  },
  render: function AnnotationElement_render() {
   throw new Error('Abstract method AnnotationElement.render called');
  }
 };
 return AnnotationElement;
}();
var LinkAnnotationElement = function LinkAnnotationElementClosure() {
 function LinkAnnotationElement(parameters) {
  AnnotationElement.call(this, parameters, true);
 }
 Util.inherit(LinkAnnotationElement, AnnotationElement, {
  render: function LinkAnnotationElement_render() {
   this.container.className = 'linkAnnotation';
   var link = document.createElement('a');
   addLinkAttributes(link, {
    url: this.data.url,
    target: this.data.newWindow ? LinkTarget.BLANK : undefined
   });
   if (!this.data.url) {
    if (this.data.action) {
     this._bindNamedAction(link, this.data.action);
    } else {
     this._bindLink(link, this.data.dest);
    }
   }
   this.container.appendChild(link);
   return this.container;
  },
  _bindLink: function LinkAnnotationElement_bindLink(link, destination) {
   var self = this;
   link.href = this.linkService.getDestinationHash(destination);
   link.onclick = function () {
    if (destination) {
     self.linkService.navigateTo(destination);
    }
    return false;
   };
   if (destination) {
    link.className = 'internalLink';
   }
  },
  _bindNamedAction: function LinkAnnotationElement_bindNamedAction(link, action) {
   var self = this;
   link.href = this.linkService.getAnchorUrl('');
   link.onclick = function () {
    self.linkService.executeNamedAction(action);
    return false;
   };
   link.className = 'internalLink';
  }
 });
 return LinkAnnotationElement;
}();
var TextAnnotationElement = function TextAnnotationElementClosure() {
 function TextAnnotationElement(parameters) {
  var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
  AnnotationElement.call(this, parameters, isRenderable);
 }
 Util.inherit(TextAnnotationElement, AnnotationElement, {
  render: function TextAnnotationElement_render() {
   this.container.className = 'textAnnotation';
   var image = document.createElement('img');
   image.style.height = this.container.style.height;
   image.style.width = this.container.style.width;
   image.src = this.imageResourcesPath + 'annotation-' + this.data.name.toLowerCase() + '.svg';
   image.alt = '[{{type}} Annotation]';
   image.dataset.l10nId = 'text_annotation_type';
   image.dataset.l10nArgs = JSON.stringify({ type: this.data.name });
   if (!this.data.hasPopup) {
    this._createPopup(this.container, image, this.data);
   }
   this.container.appendChild(image);
   return this.container;
  }
 });
 return TextAnnotationElement;
}();
var WidgetAnnotationElement = function WidgetAnnotationElementClosure() {
 function WidgetAnnotationElement(parameters, isRenderable) {
  AnnotationElement.call(this, parameters, isRenderable);
 }
 Util.inherit(WidgetAnnotationElement, AnnotationElement, {
  render: function WidgetAnnotationElement_render() {
   return this.container;
  }
 });
 return WidgetAnnotationElement;
}();
var TextWidgetAnnotationElement = function TextWidgetAnnotationElementClosure() {
 var TEXT_ALIGNMENT = [
  'left',
  'center',
  'right'
 ];
 function TextWidgetAnnotationElement(parameters) {
  var isRenderable = parameters.renderInteractiveForms || !parameters.data.hasAppearance && !!parameters.data.fieldValue;
  WidgetAnnotationElement.call(this, parameters, isRenderable);
 }
 Util.inherit(TextWidgetAnnotationElement, WidgetAnnotationElement, {
  render: function TextWidgetAnnotationElement_render() {
   this.container.className = 'textWidgetAnnotation';
   var element = null;
   if (this.renderInteractiveForms) {
    if (this.data.multiLine) {
     element = document.createElement('textarea');
     element.textContent = this.data.fieldValue;
    } else {
     element = document.createElement('input');
     element.type = 'text';
     element.setAttribute('value', this.data.fieldValue);
    }
    element.disabled = this.data.readOnly;
    if (this.data.maxLen !== null) {
     element.maxLength = this.data.maxLen;
    }
    if (this.data.comb) {
     var fieldWidth = this.data.rect[2] - this.data.rect[0];
     var combWidth = fieldWidth / this.data.maxLen;
     element.classList.add('comb');
     element.style.letterSpacing = 'calc(' + combWidth + 'px - 1ch)';
    }
   } else {
    element = document.createElement('div');
    element.textContent = this.data.fieldValue;
    element.style.verticalAlign = 'middle';
    element.style.display = 'table-cell';
    var font = null;
    if (this.data.fontRefName) {
     font = this.page.commonObjs.getData(this.data.fontRefName);
    }
    this._setTextStyle(element, font);
   }
   if (this.data.textAlignment !== null) {
    element.style.textAlign = TEXT_ALIGNMENT[this.data.textAlignment];
   }
   this.container.appendChild(element);
   return this.container;
  },
  _setTextStyle: function TextWidgetAnnotationElement_setTextStyle(element, font) {
   var style = element.style;
   style.fontSize = this.data.fontSize + 'px';
   style.direction = this.data.fontDirection < 0 ? 'rtl' : 'ltr';
   if (!font) {
    return;
   }
   style.fontWeight = font.black ? font.bold ? '900' : 'bold' : font.bold ? 'bold' : 'normal';
   style.fontStyle = font.italic ? 'italic' : 'normal';
   var fontFamily = font.loadedName ? '"' + font.loadedName + '", ' : '';
   var fallbackName = font.fallbackName || 'Helvetica, sans-serif';
   style.fontFamily = fontFamily + fallbackName;
  }
 });
 return TextWidgetAnnotationElement;
}();
var CheckboxWidgetAnnotationElement = function CheckboxWidgetAnnotationElementClosure() {
 function CheckboxWidgetAnnotationElement(parameters) {
  WidgetAnnotationElement.call(this, parameters, parameters.renderInteractiveForms);
 }
 Util.inherit(CheckboxWidgetAnnotationElement, WidgetAnnotationElement, {
  render: function CheckboxWidgetAnnotationElement_render() {
   this.container.className = 'buttonWidgetAnnotation checkBox';
   var element = document.createElement('input');
   element.disabled = this.data.readOnly;
   element.type = 'checkbox';
   if (this.data.fieldValue && this.data.fieldValue !== 'Off') {
    element.setAttribute('checked', true);
   }
   this.container.appendChild(element);
   return this.container;
  }
 });
 return CheckboxWidgetAnnotationElement;
}();
var RadioButtonWidgetAnnotationElement = function RadioButtonWidgetAnnotationElementClosure() {
 function RadioButtonWidgetAnnotationElement(parameters) {
  WidgetAnnotationElement.call(this, parameters, parameters.renderInteractiveForms);
 }
 Util.inherit(RadioButtonWidgetAnnotationElement, WidgetAnnotationElement, {
  render: function RadioButtonWidgetAnnotationElement_render() {
   this.container.className = 'buttonWidgetAnnotation radioButton';
   var element = document.createElement('input');
   element.disabled = this.data.readOnly;
   element.type = 'radio';
   element.name = this.data.fieldName;
   if (this.data.fieldValue === this.data.buttonValue) {
    element.setAttribute('checked', true);
   }
   this.container.appendChild(element);
   return this.container;
  }
 });
 return RadioButtonWidgetAnnotationElement;
}();
var ChoiceWidgetAnnotationElement = function ChoiceWidgetAnnotationElementClosure() {
 function ChoiceWidgetAnnotationElement(parameters) {
  WidgetAnnotationElement.call(this, parameters, parameters.renderInteractiveForms);
 }
 Util.inherit(ChoiceWidgetAnnotationElement, WidgetAnnotationElement, {
  render: function ChoiceWidgetAnnotationElement_render() {
   this.container.className = 'choiceWidgetAnnotation';
   var selectElement = document.createElement('select');
   selectElement.disabled = this.data.readOnly;
   if (!this.data.combo) {
    selectElement.size = this.data.options.length;
    if (this.data.multiSelect) {
     selectElement.multiple = true;
    }
   }
   for (var i = 0, ii = this.data.options.length; i < ii; i++) {
    var option = this.data.options[i];
    var optionElement = document.createElement('option');
    optionElement.textContent = option.displayValue;
    optionElement.value = option.exportValue;
    if (this.data.fieldValue.indexOf(option.displayValue) >= 0) {
     optionElement.setAttribute('selected', true);
    }
    selectElement.appendChild(optionElement);
   }
   this.container.appendChild(selectElement);
   return this.container;
  }
 });
 return ChoiceWidgetAnnotationElement;
}();
var PopupAnnotationElement = function PopupAnnotationElementClosure() {
 function PopupAnnotationElement(parameters) {
  var isRenderable = !!(parameters.data.title || parameters.data.contents);
  AnnotationElement.call(this, parameters, isRenderable);
 }
 Util.inherit(PopupAnnotationElement, AnnotationElement, {
  render: function PopupAnnotationElement_render() {
   this.container.className = 'popupAnnotation';
   var selector = '[data-annotation-id="' + this.data.parentId + '"]';
   var parentElement = this.layer.querySelector(selector);
   if (!parentElement) {
    return this.container;
   }
   var popup = new PopupElement({
    container: this.container,
    trigger: parentElement,
    color: this.data.color,
    title: this.data.title,
    contents: this.data.contents
   });
   var parentLeft = parseFloat(parentElement.style.left);
   var parentWidth = parseFloat(parentElement.style.width);
   CustomStyle.setProp('transformOrigin', this.container, -(parentLeft + parentWidth) + 'px -' + parentElement.style.top);
   this.container.style.left = parentLeft + parentWidth + 'px';
   this.container.appendChild(popup.render());
   return this.container;
  }
 });
 return PopupAnnotationElement;
}();
var PopupElement = function PopupElementClosure() {
 var BACKGROUND_ENLIGHT = 0.7;
 function PopupElement(parameters) {
  this.container = parameters.container;
  this.trigger = parameters.trigger;
  this.color = parameters.color;
  this.title = parameters.title;
  this.contents = parameters.contents;
  this.hideWrapper = parameters.hideWrapper || false;
  this.pinned = false;
 }
 PopupElement.prototype = {
  render: function PopupElement_render() {
   var wrapper = document.createElement('div');
   wrapper.className = 'popupWrapper';
   this.hideElement = this.hideWrapper ? wrapper : this.container;
   this.hideElement.setAttribute('hidden', true);
   var popup = document.createElement('div');
   popup.className = 'popup';
   var color = this.color;
   if (color) {
    var r = BACKGROUND_ENLIGHT * (255 - color[0]) + color[0];
    var g = BACKGROUND_ENLIGHT * (255 - color[1]) + color[1];
    var b = BACKGROUND_ENLIGHT * (255 - color[2]) + color[2];
    popup.style.backgroundColor = Util.makeCssRgb(r | 0, g | 0, b | 0);
   }
   var contents = this._formatContents(this.contents);
   var title = document.createElement('h1');
   title.textContent = this.title;
   this.trigger.addEventListener('click', this._toggle.bind(this));
   this.trigger.addEventListener('mouseover', this._show.bind(this, false));
   this.trigger.addEventListener('mouseout', this._hide.bind(this, false));
   popup.addEventListener('click', this._hide.bind(this, true));
   popup.appendChild(title);
   popup.appendChild(contents);
   wrapper.appendChild(popup);
   return wrapper;
  },
  _formatContents: function PopupElement_formatContents(contents) {
   var p = document.createElement('p');
   var lines = contents.split(/(?:\r\n?|\n)/);
   for (var i = 0, ii = lines.length; i < ii; ++i) {
    var line = lines[i];
    p.appendChild(document.createTextNode(line));
    if (i < ii - 1) {
     p.appendChild(document.createElement('br'));
    }
   }
   return p;
  },
  _toggle: function PopupElement_toggle() {
   if (this.pinned) {
    this._hide(true);
   } else {
    this._show(true);
   }
  },
  _show: function PopupElement_show(pin) {
   if (pin) {
    this.pinned = true;
   }
   if (this.hideElement.hasAttribute('hidden')) {
    this.hideElement.removeAttribute('hidden');
    this.container.style.zIndex += 1;
   }
  },
  _hide: function PopupElement_hide(unpin) {
   if (unpin) {
    this.pinned = false;
   }
   if (!this.hideElement.hasAttribute('hidden') && !this.pinned) {
    this.hideElement.setAttribute('hidden', true);
    this.container.style.zIndex -= 1;
   }
  }
 };
 return PopupElement;
}();
var HighlightAnnotationElement = function HighlightAnnotationElementClosure() {
 function HighlightAnnotationElement(parameters) {
  var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
  AnnotationElement.call(this, parameters, isRenderable);
 }
 Util.inherit(HighlightAnnotationElement, AnnotationElement, {
  render: function HighlightAnnotationElement_render() {
   this.container.className = 'highlightAnnotation';
   if (!this.data.hasPopup) {
    this._createPopup(this.container, null, this.data);
   }
   return this.container;
  }
 });
 return HighlightAnnotationElement;
}();
var UnderlineAnnotationElement = function UnderlineAnnotationElementClosure() {
 function UnderlineAnnotationElement(parameters) {
  var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
  AnnotationElement.call(this, parameters, isRenderable);
 }
 Util.inherit(UnderlineAnnotationElement, AnnotationElement, {
  render: function UnderlineAnnotationElement_render() {
   this.container.className = 'underlineAnnotation';
   if (!this.data.hasPopup) {
    this._createPopup(this.container, null, this.data);
   }
   return this.container;
  }
 });
 return UnderlineAnnotationElement;
}();
var SquigglyAnnotationElement = function SquigglyAnnotationElementClosure() {
 function SquigglyAnnotationElement(parameters) {
  var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
  AnnotationElement.call(this, parameters, isRenderable);
 }
 Util.inherit(SquigglyAnnotationElement, AnnotationElement, {
  render: function SquigglyAnnotationElement_render() {
   this.container.className = 'squigglyAnnotation';
   if (!this.data.hasPopup) {
    this._createPopup(this.container, null, this.data);
   }
   return this.container;
  }
 });
 return SquigglyAnnotationElement;
}();
var StrikeOutAnnotationElement = function StrikeOutAnnotationElementClosure() {
 function StrikeOutAnnotationElement(parameters) {
  var isRenderable = !!(parameters.data.hasPopup || parameters.data.title || parameters.data.contents);
  AnnotationElement.call(this, parameters, isRenderable);
 }
 Util.inherit(StrikeOutAnnotationElement, AnnotationElement, {
  render: function StrikeOutAnnotationElement_render() {
   this.container.className = 'strikeoutAnnotation';
   if (!this.data.hasPopup) {
    this._createPopup(this.container, null, this.data);
   }
   return this.container;
  }
 });
 return StrikeOutAnnotationElement;
}();
var FileAttachmentAnnotationElement = function FileAttachmentAnnotationElementClosure() {
 function FileAttachmentAnnotationElement(parameters) {
  AnnotationElement.call(this, parameters, true);
  var file = this.data.file;
  this.filename = getFilenameFromUrl(file.filename);
  this.content = file.content;
  this.linkService.onFileAttachmentAnnotation({
   id: stringToPDFString(file.filename),
   filename: file.filename,
   content: file.content
  });
 }
 Util.inherit(FileAttachmentAnnotationElement, AnnotationElement, {
  render: function FileAttachmentAnnotationElement_render() {
   this.container.className = 'fileAttachmentAnnotation';
   var trigger = document.createElement('div');
   trigger.style.height = this.container.style.height;
   trigger.style.width = this.container.style.width;
   trigger.addEventListener('dblclick', this._download.bind(this));
   if (!this.data.hasPopup && (this.data.title || this.data.contents)) {
    this._createPopup(this.container, trigger, this.data);
   }
   this.container.appendChild(trigger);
   return this.container;
  },
  _download: function FileAttachmentAnnotationElement_download() {
   if (!this.downloadManager) {
    warn('Download cannot be started due to unavailable download manager');
    return;
   }
   this.downloadManager.downloadData(this.content, this.filename, '');
  }
 });
 return FileAttachmentAnnotationElement;
}();
var AnnotationLayer = function AnnotationLayerClosure() {
 return {
  render: function AnnotationLayer_render(parameters) {
   var annotationElementFactory = new AnnotationElementFactory();
   for (var i = 0, ii = parameters.annotations.length; i < ii; i++) {
    var data = parameters.annotations[i];
    if (!data) {
     continue;
    }
    var element = annotationElementFactory.create({
     data: data,
     layer: parameters.div,
     page: parameters.page,
     viewport: parameters.viewport,
     linkService: parameters.linkService,
     downloadManager: parameters.downloadManager,
     imageResourcesPath: parameters.imageResourcesPath || getDefaultSetting('imageResourcesPath'),
     renderInteractiveForms: parameters.renderInteractiveForms || false
    });
    if (element.isRenderable) {
     parameters.div.appendChild(element.render());
    }
   }
  },
  update: function AnnotationLayer_update(parameters) {
   for (var i = 0, ii = parameters.annotations.length; i < ii; i++) {
    var data = parameters.annotations[i];
    var element = parameters.div.querySelector('[data-annotation-id="' + data.id + '"]');
    if (element) {
     CustomStyle.setProp('transform', element, 'matrix(' + parameters.viewport.transform.join(',') + ')');
    }
   }
   parameters.div.removeAttribute('hidden');
  }
 };
}();
exports.AnnotationLayer = AnnotationLayer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var displayFontLoader = __w_pdfjs_require__(11);
var displayCanvas = __w_pdfjs_require__(10);
var displayMetadata = __w_pdfjs_require__(7);
var displayDOMUtils = __w_pdfjs_require__(1);
var amdRequire;
var InvalidPDFException = sharedUtil.InvalidPDFException;
var MessageHandler = sharedUtil.MessageHandler;
var MissingPDFException = sharedUtil.MissingPDFException;
var PageViewport = sharedUtil.PageViewport;
var PasswordException = sharedUtil.PasswordException;
var StatTimer = sharedUtil.StatTimer;
var UnexpectedResponseException = sharedUtil.UnexpectedResponseException;
var UnknownErrorException = sharedUtil.UnknownErrorException;
var Util = sharedUtil.Util;
var createPromiseCapability = sharedUtil.createPromiseCapability;
var error = sharedUtil.error;
var deprecated = sharedUtil.deprecated;
var getVerbosityLevel = sharedUtil.getVerbosityLevel;
var info = sharedUtil.info;
var isInt = sharedUtil.isInt;
var isArray = sharedUtil.isArray;
var isArrayBuffer = sharedUtil.isArrayBuffer;
var isSameOrigin = sharedUtil.isSameOrigin;
var loadJpegStream = sharedUtil.loadJpegStream;
var stringToBytes = sharedUtil.stringToBytes;
var globalScope = sharedUtil.globalScope;
var warn = sharedUtil.warn;
var FontFaceObject = displayFontLoader.FontFaceObject;
var FontLoader = displayFontLoader.FontLoader;
var CanvasGraphics = displayCanvas.CanvasGraphics;
var Metadata = displayMetadata.Metadata;
var getDefaultSetting = displayDOMUtils.getDefaultSetting;
var DOMCanvasFactory = displayDOMUtils.DOMCanvasFactory;
var DOMCMapReaderFactory = displayDOMUtils.DOMCMapReaderFactory;
var DEFAULT_RANGE_CHUNK_SIZE = 65536;
var isWorkerDisabled = false;
var workerSrc;
var isPostMessageTransfersDisabled = false;
var pdfjsFilePath = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : null;
var fakeWorkerFilesLoader = null;
var useRequireEnsure = false;
if (typeof __pdfjsdev_webpack__ === 'undefined') {
 if (typeof window === 'undefined') {
  isWorkerDisabled = true;
  if (typeof require.ensure === 'undefined') {
   require.ensure = require('node-ensure');
  }
  useRequireEnsure = true;
 } else if (typeof require !== 'undefined' && typeof require.ensure === 'function') {
  useRequireEnsure = true;
 }
 if (typeof requirejs !== 'undefined' && requirejs.toUrl) {
  workerSrc = requirejs.toUrl('pdfjs-dist/build/pdf.worker.js');
 }
 var dynamicLoaderSupported = typeof requirejs !== 'undefined' && requirejs.load;
 fakeWorkerFilesLoader = useRequireEnsure ? function (callback) {
  require.ensure([], function () {
   var worker = require('./pdf.worker.js');
   callback(worker.WorkerMessageHandler);
  });
 } : dynamicLoaderSupported ? function (callback) {
  requirejs(['pdfjs-dist/build/pdf.worker'], function (worker) {
   callback(worker.WorkerMessageHandler);
  });
 } : null;
}
function getDocument(src, pdfDataRangeTransport, passwordCallback, progressCallback) {
 var task = new PDFDocumentLoadingTask();
 if (arguments.length > 1) {
  deprecated('getDocument is called with pdfDataRangeTransport, ' + 'passwordCallback or progressCallback argument');
 }
 if (pdfDataRangeTransport) {
  if (!(pdfDataRangeTransport instanceof PDFDataRangeTransport)) {
   pdfDataRangeTransport = Object.create(pdfDataRangeTransport);
   pdfDataRangeTransport.length = src.length;
   pdfDataRangeTransport.initialData = src.initialData;
   if (!pdfDataRangeTransport.abort) {
    pdfDataRangeTransport.abort = function () {
    };
   }
  }
  src = Object.create(src);
  src.range = pdfDataRangeTransport;
 }
 task.onPassword = passwordCallback || null;
 task.onProgress = progressCallback || null;
 var source;
 if (typeof src === 'string') {
  source = { url: src };
 } else if (isArrayBuffer(src)) {
  source = { data: src };
 } else if (src instanceof PDFDataRangeTransport) {
  source = { range: src };
 } else {
  if (typeof src !== 'object') {
   error('Invalid parameter in getDocument, need either Uint8Array, ' + 'string or a parameter object');
  }
  if (!src.url && !src.data && !src.range) {
   error('Invalid parameter object: need either .data, .range or .url');
  }
  source = src;
 }
 var params = {};
 var rangeTransport = null;
 var worker = null;
 for (var key in source) {
  if (key === 'url' && typeof window !== 'undefined') {
   params[key] = new URL(source[key], window.location).href;
   continue;
  } else if (key === 'range') {
   rangeTransport = source[key];
   continue;
  } else if (key === 'worker') {
   worker = source[key];
   continue;
  } else if (key === 'data' && !(source[key] instanceof Uint8Array)) {
   var pdfBytes = source[key];
   if (typeof pdfBytes === 'string') {
    params[key] = stringToBytes(pdfBytes);
   } else if (typeof pdfBytes === 'object' && pdfBytes !== null && !isNaN(pdfBytes.length)) {
    params[key] = new Uint8Array(pdfBytes);
   } else if (isArrayBuffer(pdfBytes)) {
    params[key] = new Uint8Array(pdfBytes);
   } else {
    error('Invalid PDF binary data: either typed array, string or ' + 'array-like object is expected in the data property.');
   }
   continue;
  }
  params[key] = source[key];
 }
 params.rangeChunkSize = params.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE;
 params.disableNativeImageDecoder = params.disableNativeImageDecoder === true;
 var CMapReaderFactory = params.CMapReaderFactory || DOMCMapReaderFactory;
 if (!worker) {
  var workerPort = getDefaultSetting('workerPort');
  worker = workerPort ? new PDFWorker(null, workerPort) : new PDFWorker();
  task._worker = worker;
 }
 var docId = task.docId;
 worker.promise.then(function () {
  if (task.destroyed) {
   throw new Error('Loading aborted');
  }
  return _fetchDocument(worker, params, rangeTransport, docId).then(function (workerId) {
   if (task.destroyed) {
    throw new Error('Loading aborted');
   }
   var messageHandler = new MessageHandler(docId, workerId, worker.port);
   var transport = new WorkerTransport(messageHandler, task, rangeTransport, CMapReaderFactory);
   task._transport = transport;
   messageHandler.send('Ready', null);
  });
 }).catch(task._capability.reject);
 return task;
}
function _fetchDocument(worker, source, pdfDataRangeTransport, docId) {
 if (worker.destroyed) {
  return Promise.reject(new Error('Worker was destroyed'));
 }
 source.disableAutoFetch = getDefaultSetting('disableAutoFetch');
 source.disableStream = getDefaultSetting('disableStream');
 source.chunkedViewerLoading = !!pdfDataRangeTransport;
 if (pdfDataRangeTransport) {
  source.length = pdfDataRangeTransport.length;
  source.initialData = pdfDataRangeTransport.initialData;
 }
 return worker.messageHandler.sendWithPromise('GetDocRequest', {
  docId: docId,
  source: source,
  disableRange: getDefaultSetting('disableRange'),
  maxImageSize: getDefaultSetting('maxImageSize'),
  disableFontFace: getDefaultSetting('disableFontFace'),
  disableCreateObjectURL: getDefaultSetting('disableCreateObjectURL'),
  postMessageTransfers: getDefaultSetting('postMessageTransfers') && !isPostMessageTransfersDisabled,
  docBaseUrl: source.docBaseUrl,
  disableNativeImageDecoder: source.disableNativeImageDecoder
 }).then(function (workerId) {
  if (worker.destroyed) {
   throw new Error('Worker was destroyed');
  }
  return workerId;
 });
}
var PDFDocumentLoadingTask = function PDFDocumentLoadingTaskClosure() {
 var nextDocumentId = 0;
 function PDFDocumentLoadingTask() {
  this._capability = createPromiseCapability();
  this._transport = null;
  this._worker = null;
  this.docId = 'd' + nextDocumentId++;
  this.destroyed = false;
  this.onPassword = null;
  this.onProgress = null;
  this.onUnsupportedFeature = null;
 }
 PDFDocumentLoadingTask.prototype = {
  get promise() {
   return this._capability.promise;
  },
  destroy: function () {
   this.destroyed = true;
   var transportDestroyed = !this._transport ? Promise.resolve() : this._transport.destroy();
   return transportDestroyed.then(function () {
    this._transport = null;
    if (this._worker) {
     this._worker.destroy();
     this._worker = null;
    }
   }.bind(this));
  },
  then: function PDFDocumentLoadingTask_then(onFulfilled, onRejected) {
   return this.promise.then.apply(this.promise, arguments);
  }
 };
 return PDFDocumentLoadingTask;
}();
var PDFDataRangeTransport = function pdfDataRangeTransportClosure() {
 function PDFDataRangeTransport(length, initialData) {
  this.length = length;
  this.initialData = initialData;
  this._rangeListeners = [];
  this._progressListeners = [];
  this._progressiveReadListeners = [];
  this._readyCapability = createPromiseCapability();
 }
 PDFDataRangeTransport.prototype = {
  addRangeListener: function PDFDataRangeTransport_addRangeListener(listener) {
   this._rangeListeners.push(listener);
  },
  addProgressListener: function PDFDataRangeTransport_addProgressListener(listener) {
   this._progressListeners.push(listener);
  },
  addProgressiveReadListener: function PDFDataRangeTransport_addProgressiveReadListener(listener) {
   this._progressiveReadListeners.push(listener);
  },
  onDataRange: function PDFDataRangeTransport_onDataRange(begin, chunk) {
   var listeners = this._rangeListeners;
   for (var i = 0, n = listeners.length; i < n; ++i) {
    listeners[i](begin, chunk);
   }
  },
  onDataProgress: function PDFDataRangeTransport_onDataProgress(loaded) {
   this._readyCapability.promise.then(function () {
    var listeners = this._progressListeners;
    for (var i = 0, n = listeners.length; i < n; ++i) {
     listeners[i](loaded);
    }
   }.bind(this));
  },
  onDataProgressiveRead: function PDFDataRangeTransport_onDataProgress(chunk) {
   this._readyCapability.promise.then(function () {
    var listeners = this._progressiveReadListeners;
    for (var i = 0, n = listeners.length; i < n; ++i) {
     listeners[i](chunk);
    }
   }.bind(this));
  },
  transportReady: function PDFDataRangeTransport_transportReady() {
   this._readyCapability.resolve();
  },
  requestDataRange: function PDFDataRangeTransport_requestDataRange(begin, end) {
   throw new Error('Abstract method PDFDataRangeTransport.requestDataRange');
  },
  abort: function PDFDataRangeTransport_abort() {
  }
 };
 return PDFDataRangeTransport;
}();
var PDFDocumentProxy = function PDFDocumentProxyClosure() {
 function PDFDocumentProxy(pdfInfo, transport, loadingTask) {
  this.pdfInfo = pdfInfo;
  this.transport = transport;
  this.loadingTask = loadingTask;
 }
 PDFDocumentProxy.prototype = {
  get numPages() {
   return this.pdfInfo.numPages;
  },
  get fingerprint() {
   return this.pdfInfo.fingerprint;
  },
  getPage: function PDFDocumentProxy_getPage(pageNumber) {
   return this.transport.getPage(pageNumber);
  },
  getPageIndex: function PDFDocumentProxy_getPageIndex(ref) {
   return this.transport.getPageIndex(ref);
  },
  getDestinations: function PDFDocumentProxy_getDestinations() {
   return this.transport.getDestinations();
  },
  getDestination: function PDFDocumentProxy_getDestination(id) {
   return this.transport.getDestination(id);
  },
  getPageLabels: function PDFDocumentProxy_getPageLabels() {
   return this.transport.getPageLabels();
  },
  getAttachments: function PDFDocumentProxy_getAttachments() {
   return this.transport.getAttachments();
  },
  getJavaScript: function PDFDocumentProxy_getJavaScript() {
   return this.transport.getJavaScript();
  },
  getOutline: function PDFDocumentProxy_getOutline() {
   return this.transport.getOutline();
  },
  getMetadata: function PDFDocumentProxy_getMetadata() {
   return this.transport.getMetadata();
  },
  getData: function PDFDocumentProxy_getData() {
   return this.transport.getData();
  },
  getDownloadInfo: function PDFDocumentProxy_getDownloadInfo() {
   return this.transport.downloadInfoCapability.promise;
  },
  getStats: function PDFDocumentProxy_getStats() {
   return this.transport.getStats();
  },
  cleanup: function PDFDocumentProxy_cleanup() {
   this.transport.startCleanup();
  },
  destroy: function PDFDocumentProxy_destroy() {
   return this.loadingTask.destroy();
  }
 };
 return PDFDocumentProxy;
}();
var PDFPageProxy = function PDFPageProxyClosure() {
 function PDFPageProxy(pageIndex, pageInfo, transport) {
  this.pageIndex = pageIndex;
  this.pageInfo = pageInfo;
  this.transport = transport;
  this.stats = new StatTimer();
  this.stats.enabled = getDefaultSetting('enableStats');
  this.commonObjs = transport.commonObjs;
  this.objs = new PDFObjects();
  this.cleanupAfterRender = false;
  this.pendingCleanup = false;
  this.intentStates = Object.create(null);
  this.destroyed = false;
 }
 PDFPageProxy.prototype = {
  get pageNumber() {
   return this.pageIndex + 1;
  },
  get rotate() {
   return this.pageInfo.rotate;
  },
  get ref() {
   return this.pageInfo.ref;
  },
  get userUnit() {
   return this.pageInfo.userUnit;
  },
  get view() {
   return this.pageInfo.view;
  },
  getViewport: function PDFPageProxy_getViewport(scale, rotate) {
   if (arguments.length < 2) {
    rotate = this.rotate;
   }
   return new PageViewport(this.view, scale, rotate, 0, 0);
  },
  getAnnotations: function PDFPageProxy_getAnnotations(params) {
   var intent = params && params.intent || null;
   if (!this.annotationsPromise || this.annotationsIntent !== intent) {
    this.annotationsPromise = this.transport.getAnnotations(this.pageIndex, intent);
    this.annotationsIntent = intent;
   }
   return this.annotationsPromise;
  },
  render: function PDFPageProxy_render(params) {
   var stats = this.stats;
   stats.time('Overall');
   this.pendingCleanup = false;
   var renderingIntent = params.intent === 'print' ? 'print' : 'display';
   var renderInteractiveForms = params.renderInteractiveForms === true ? true : false;
   var canvasFactory = params.canvasFactory || new DOMCanvasFactory();
   if (!this.intentStates[renderingIntent]) {
    this.intentStates[renderingIntent] = Object.create(null);
   }
   var intentState = this.intentStates[renderingIntent];
   if (!intentState.displayReadyCapability) {
    intentState.receivingOperatorList = true;
    intentState.displayReadyCapability = createPromiseCapability();
    intentState.operatorList = {
     fnArray: [],
     argsArray: [],
     lastChunk: false
    };
    this.stats.time('Page Request');
    this.transport.messageHandler.send('RenderPageRequest', {
     pageIndex: this.pageNumber - 1,
     intent: renderingIntent,
     renderInteractiveForms: renderInteractiveForms
    });
   }
   var internalRenderTask = new InternalRenderTask(complete, params, this.objs, this.commonObjs, intentState.operatorList, this.pageNumber, canvasFactory);
   internalRenderTask.useRequestAnimationFrame = renderingIntent !== 'print';
   if (!intentState.renderTasks) {
    intentState.renderTasks = [];
   }
   intentState.renderTasks.push(internalRenderTask);
   var renderTask = internalRenderTask.task;
   if (params.continueCallback) {
    deprecated('render is used with continueCallback parameter');
    renderTask.onContinue = params.continueCallback;
   }
   var self = this;
   intentState.displayReadyCapability.promise.then(function pageDisplayReadyPromise(transparency) {
    if (self.pendingCleanup) {
     complete();
     return;
    }
    stats.time('Rendering');
    internalRenderTask.initializeGraphics(transparency);
    internalRenderTask.operatorListChanged();
   }, function pageDisplayReadPromiseError(reason) {
    complete(reason);
   });
   function complete(error) {
    var i = intentState.renderTasks.indexOf(internalRenderTask);
    if (i >= 0) {
     intentState.renderTasks.splice(i, 1);
    }
    if (self.cleanupAfterRender) {
     self.pendingCleanup = true;
    }
    self._tryCleanup();
    if (error) {
     internalRenderTask.capability.reject(error);
    } else {
     internalRenderTask.capability.resolve();
    }
    stats.timeEnd('Rendering');
    stats.timeEnd('Overall');
   }
   return renderTask;
  },
  getOperatorList: function PDFPageProxy_getOperatorList() {
   function operatorListChanged() {
    if (intentState.operatorList.lastChunk) {
     intentState.opListReadCapability.resolve(intentState.operatorList);
     var i = intentState.renderTasks.indexOf(opListTask);
     if (i >= 0) {
      intentState.renderTasks.splice(i, 1);
     }
    }
   }
   var renderingIntent = 'oplist';
   if (!this.intentStates[renderingIntent]) {
    this.intentStates[renderingIntent] = Object.create(null);
   }
   var intentState = this.intentStates[renderingIntent];
   var opListTask;
   if (!intentState.opListReadCapability) {
    opListTask = {};
    opListTask.operatorListChanged = operatorListChanged;
    intentState.receivingOperatorList = true;
    intentState.opListReadCapability = createPromiseCapability();
    intentState.renderTasks = [];
    intentState.renderTasks.push(opListTask);
    intentState.operatorList = {
     fnArray: [],
     argsArray: [],
     lastChunk: false
    };
    this.transport.messageHandler.send('RenderPageRequest', {
     pageIndex: this.pageIndex,
     intent: renderingIntent
    });
   }
   return intentState.opListReadCapability.promise;
  },
  getTextContent: function PDFPageProxy_getTextContent(params) {
   return this.transport.messageHandler.sendWithPromise('GetTextContent', {
    pageIndex: this.pageNumber - 1,
    normalizeWhitespace: params && params.normalizeWhitespace === true ? true : false,
    combineTextItems: params && params.disableCombineTextItems === true ? false : true
   });
  },
  _destroy: function PDFPageProxy_destroy() {
   this.destroyed = true;
   this.transport.pageCache[this.pageIndex] = null;
   var waitOn = [];
   Object.keys(this.intentStates).forEach(function (intent) {
    if (intent === 'oplist') {
     return;
    }
    var intentState = this.intentStates[intent];
    intentState.renderTasks.forEach(function (renderTask) {
     var renderCompleted = renderTask.capability.promise.catch(function () {
     });
     waitOn.push(renderCompleted);
     renderTask.cancel();
    });
   }, this);
   this.objs.clear();
   this.annotationsPromise = null;
   this.pendingCleanup = false;
   return Promise.all(waitOn);
  },
  destroy: function () {
   deprecated('page destroy method, use cleanup() instead');
   this.cleanup();
  },
  cleanup: function PDFPageProxy_cleanup() {
   this.pendingCleanup = true;
   this._tryCleanup();
  },
  _tryCleanup: function PDFPageProxy_tryCleanup() {
   if (!this.pendingCleanup || Object.keys(this.intentStates).some(function (intent) {
     var intentState = this.intentStates[intent];
     return intentState.renderTasks.length !== 0 || intentState.receivingOperatorList;
    }, this)) {
    return;
   }
   Object.keys(this.intentStates).forEach(function (intent) {
    delete this.intentStates[intent];
   }, this);
   this.objs.clear();
   this.annotationsPromise = null;
   this.pendingCleanup = false;
  },
  _startRenderPage: function PDFPageProxy_startRenderPage(transparency, intent) {
   var intentState = this.intentStates[intent];
   if (intentState.displayReadyCapability) {
    intentState.displayReadyCapability.resolve(transparency);
   }
  },
  _renderPageChunk: function PDFPageProxy_renderPageChunk(operatorListChunk, intent) {
   var intentState = this.intentStates[intent];
   var i, ii;
   for (i = 0, ii = operatorListChunk.length; i < ii; i++) {
    intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
    intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
   }
   intentState.operatorList.lastChunk = operatorListChunk.lastChunk;
   for (i = 0; i < intentState.renderTasks.length; i++) {
    intentState.renderTasks[i].operatorListChanged();
   }
   if (operatorListChunk.lastChunk) {
    intentState.receivingOperatorList = false;
    this._tryCleanup();
   }
  }
 };
 return PDFPageProxy;
}();
var PDFWorker = function PDFWorkerClosure() {
 var nextFakeWorkerId = 0;
 function getWorkerSrc() {
  if (typeof workerSrc !== 'undefined') {
   return workerSrc;
  }
  if (getDefaultSetting('workerSrc')) {
   return getDefaultSetting('workerSrc');
  }
  if (pdfjsFilePath) {
   return pdfjsFilePath.replace(/\.js$/i, '.worker.js');
  }
  error('No PDFJS.workerSrc specified');
 }
 var fakeWorkerFilesLoadedCapability;
 function setupFakeWorkerGlobal() {
  var WorkerMessageHandler;
  if (fakeWorkerFilesLoadedCapability) {
   return fakeWorkerFilesLoadedCapability.promise;
  }
  fakeWorkerFilesLoadedCapability = createPromiseCapability();
  var loader = fakeWorkerFilesLoader || function (callback) {
   Util.loadScript(getWorkerSrc(), function () {
    callback(window.pdfjsDistBuildPdfWorker.WorkerMessageHandler);
   });
  };
  loader(fakeWorkerFilesLoadedCapability.resolve);
  return fakeWorkerFilesLoadedCapability.promise;
 }
 function FakeWorkerPort(defer) {
  this._listeners = [];
  this._defer = defer;
  this._deferred = Promise.resolve(undefined);
 }
 FakeWorkerPort.prototype = {
  postMessage: function (obj, transfers) {
   function cloneValue(value) {
    if (typeof value !== 'object' || value === null) {
     return value;
    }
    if (cloned.has(value)) {
     return cloned.get(value);
    }
    var result;
    var buffer;
    if ((buffer = value.buffer) && isArrayBuffer(buffer)) {
     var transferable = transfers && transfers.indexOf(buffer) >= 0;
     if (value === buffer) {
      result = value;
     } else if (transferable) {
      result = new value.constructor(buffer, value.byteOffset, value.byteLength);
     } else {
      result = new value.constructor(value);
     }
     cloned.set(value, result);
     return result;
    }
    result = isArray(value) ? [] : {};
    cloned.set(value, result);
    for (var i in value) {
     var desc, p = value;
     while (!(desc = Object.getOwnPropertyDescriptor(p, i))) {
      p = Object.getPrototypeOf(p);
     }
     if (typeof desc.value === 'undefined' || typeof desc.value === 'function') {
      continue;
     }
     result[i] = cloneValue(desc.value);
    }
    return result;
   }
   if (!this._defer) {
    this._listeners.forEach(function (listener) {
     listener.call(this, { data: obj });
    }, this);
    return;
   }
   var cloned = new WeakMap();
   var e = { data: cloneValue(obj) };
   this._deferred.then(function () {
    this._listeners.forEach(function (listener) {
     listener.call(this, e);
    }, this);
   }.bind(this));
  },
  addEventListener: function (name, listener) {
   this._listeners.push(listener);
  },
  removeEventListener: function (name, listener) {
   var i = this._listeners.indexOf(listener);
   this._listeners.splice(i, 1);
  },
  terminate: function () {
   this._listeners = [];
  }
 };
 function createCDNWrapper(url) {
  var wrapper = 'importScripts(\'' + url + '\');';
  return URL.createObjectURL(new Blob([wrapper]));
 }
 function PDFWorker(name, port) {
  this.name = name;
  this.destroyed = false;
  this._readyCapability = createPromiseCapability();
  this._port = null;
  this._webWorker = null;
  this._messageHandler = null;
  if (port) {
   this._initializeFromPort(port);
   return;
  }
  this._initialize();
 }
 PDFWorker.prototype = {
  get promise() {
   return this._readyCapability.promise;
  },
  get port() {
   return this._port;
  },
  get messageHandler() {
   return this._messageHandler;
  },
  _initializeFromPort: function PDFWorker_initializeFromPort(port) {
   this._port = port;
   this._messageHandler = new MessageHandler('main', 'worker', port);
   this._messageHandler.on('ready', function () {
   });
   this._readyCapability.resolve();
  },
  _initialize: function PDFWorker_initialize() {
   if (!isWorkerDisabled && !getDefaultSetting('disableWorker') && typeof Worker !== 'undefined') {
    var workerSrc = getWorkerSrc();
    try {
     if (!isSameOrigin(window.location.href, workerSrc)) {
      workerSrc = createCDNWrapper(new URL(workerSrc, window.location).href);
     }
     var worker = new Worker(workerSrc);
     var messageHandler = new MessageHandler('main', 'worker', worker);
     var terminateEarly = function () {
      worker.removeEventListener('error', onWorkerError);
      messageHandler.destroy();
      worker.terminate();
      if (this.destroyed) {
       this._readyCapability.reject(new Error('Worker was destroyed'));
      } else {
       this._setupFakeWorker();
      }
     }.bind(this);
     var onWorkerError = function (event) {
      if (!this._webWorker) {
       terminateEarly();
      }
     }.bind(this);
     worker.addEventListener('error', onWorkerError);
     messageHandler.on('test', function PDFWorker_test(data) {
      worker.removeEventListener('error', onWorkerError);
      if (this.destroyed) {
       terminateEarly();
       return;
      }
      var supportTypedArray = data && data.supportTypedArray;
      if (supportTypedArray) {
       this._messageHandler = messageHandler;
       this._port = worker;
       this._webWorker = worker;
       if (!data.supportTransfers) {
        isPostMessageTransfersDisabled = true;
       }
       this._readyCapability.resolve();
       messageHandler.send('configure', { verbosity: getVerbosityLevel() });
      } else {
       this._setupFakeWorker();
       messageHandler.destroy();
       worker.terminate();
      }
     }.bind(this));
     messageHandler.on('console_log', function (data) {
      console.log.apply(console, data);
     });
     messageHandler.on('console_error', function (data) {
      console.error.apply(console, data);
     });
     messageHandler.on('ready', function (data) {
      worker.removeEventListener('error', onWorkerError);
      if (this.destroyed) {
       terminateEarly();
       return;
      }
      try {
       sendTest();
      } catch (e) {
       this._setupFakeWorker();
      }
     }.bind(this));
     var sendTest = function () {
      var postMessageTransfers = getDefaultSetting('postMessageTransfers') && !isPostMessageTransfersDisabled;
      var testObj = new Uint8Array([postMessageTransfers ? 255 : 0]);
      try {
       messageHandler.send('test', testObj, [testObj.buffer]);
      } catch (ex) {
       info('Cannot use postMessage transfers');
       testObj[0] = 0;
       messageHandler.send('test', testObj);
      }
     };
     sendTest();
     return;
    } catch (e) {
     info('The worker has been disabled.');
    }
   }
   this._setupFakeWorker();
  },
  _setupFakeWorker: function PDFWorker_setupFakeWorker() {
   if (!isWorkerDisabled && !getDefaultSetting('disableWorker')) {
    warn('Setting up fake worker.');
    isWorkerDisabled = true;
   }
   setupFakeWorkerGlobal().then(function (WorkerMessageHandler) {
    if (this.destroyed) {
     this._readyCapability.reject(new Error('Worker was destroyed'));
     return;
    }
    var isTypedArraysPresent = Uint8Array !== Float32Array;
    var port = new FakeWorkerPort(isTypedArraysPresent);
    this._port = port;
    var id = 'fake' + nextFakeWorkerId++;
    var workerHandler = new MessageHandler(id + '_worker', id, port);
    WorkerMessageHandler.setup(workerHandler, port);
    var messageHandler = new MessageHandler(id, id + '_worker', port);
    this._messageHandler = messageHandler;
    this._readyCapability.resolve();
   }.bind(this));
  },
  destroy: function PDFWorker_destroy() {
   this.destroyed = true;
   if (this._webWorker) {
    this._webWorker.terminate();
    this._webWorker = null;
   }
   this._port = null;
   if (this._messageHandler) {
    this._messageHandler.destroy();
    this._messageHandler = null;
   }
  }
 };
 return PDFWorker;
}();
var WorkerTransport = function WorkerTransportClosure() {
 function WorkerTransport(messageHandler, loadingTask, pdfDataRangeTransport, CMapReaderFactory) {
  this.messageHandler = messageHandler;
  this.loadingTask = loadingTask;
  this.pdfDataRangeTransport = pdfDataRangeTransport;
  this.commonObjs = new PDFObjects();
  this.fontLoader = new FontLoader(loadingTask.docId);
  this.CMapReaderFactory = new CMapReaderFactory({
   baseUrl: getDefaultSetting('cMapUrl'),
   isCompressed: getDefaultSetting('cMapPacked')
  });
  this.destroyed = false;
  this.destroyCapability = null;
  this._passwordCapability = null;
  this.pageCache = [];
  this.pagePromises = [];
  this.downloadInfoCapability = createPromiseCapability();
  this.setupMessageHandler();
 }
 WorkerTransport.prototype = {
  destroy: function WorkerTransport_destroy() {
   if (this.destroyCapability) {
    return this.destroyCapability.promise;
   }
   this.destroyed = true;
   this.destroyCapability = createPromiseCapability();
   if (this._passwordCapability) {
    this._passwordCapability.reject(new Error('Worker was destroyed during onPassword callback'));
   }
   var waitOn = [];
   this.pageCache.forEach(function (page) {
    if (page) {
     waitOn.push(page._destroy());
    }
   });
   this.pageCache = [];
   this.pagePromises = [];
   var self = this;
   var terminated = this.messageHandler.sendWithPromise('Terminate', null);
   waitOn.push(terminated);
   Promise.all(waitOn).then(function () {
    self.fontLoader.clear();
    if (self.pdfDataRangeTransport) {
     self.pdfDataRangeTransport.abort();
     self.pdfDataRangeTransport = null;
    }
    if (self.messageHandler) {
     self.messageHandler.destroy();
     self.messageHandler = null;
    }
    self.destroyCapability.resolve();
   }, this.destroyCapability.reject);
   return this.destroyCapability.promise;
  },
  setupMessageHandler: function WorkerTransport_setupMessageHandler() {
   var messageHandler = this.messageHandler;
   var loadingTask = this.loadingTask;
   var pdfDataRangeTransport = this.pdfDataRangeTransport;
   if (pdfDataRangeTransport) {
    pdfDataRangeTransport.addRangeListener(function (begin, chunk) {
     messageHandler.send('OnDataRange', {
      begin: begin,
      chunk: chunk
     });
    });
    pdfDataRangeTransport.addProgressListener(function (loaded) {
     messageHandler.send('OnDataProgress', { loaded: loaded });
    });
    pdfDataRangeTransport.addProgressiveReadListener(function (chunk) {
     messageHandler.send('OnDataRange', { chunk: chunk });
    });
    messageHandler.on('RequestDataRange', function transportDataRange(data) {
     pdfDataRangeTransport.requestDataRange(data.begin, data.end);
    }, this);
   }
   messageHandler.on('GetDoc', function transportDoc(data) {
    var pdfInfo = data.pdfInfo;
    this.numPages = data.pdfInfo.numPages;
    var loadingTask = this.loadingTask;
    var pdfDocument = new PDFDocumentProxy(pdfInfo, this, loadingTask);
    this.pdfDocument = pdfDocument;
    loadingTask._capability.resolve(pdfDocument);
   }, this);
   messageHandler.on('PasswordRequest', function transportPasswordRequest(exception) {
    this._passwordCapability = createPromiseCapability();
    if (loadingTask.onPassword) {
     var updatePassword = function (password) {
      this._passwordCapability.resolve({ password: password });
     }.bind(this);
     loadingTask.onPassword(updatePassword, exception.code);
    } else {
     this._passwordCapability.reject(new PasswordException(exception.message, exception.code));
    }
    return this._passwordCapability.promise;
   }, this);
   messageHandler.on('PasswordException', function transportPasswordException(exception) {
    loadingTask._capability.reject(new PasswordException(exception.message, exception.code));
   }, this);
   messageHandler.on('InvalidPDF', function transportInvalidPDF(exception) {
    this.loadingTask._capability.reject(new InvalidPDFException(exception.message));
   }, this);
   messageHandler.on('MissingPDF', function transportMissingPDF(exception) {
    this.loadingTask._capability.reject(new MissingPDFException(exception.message));
   }, this);
   messageHandler.on('UnexpectedResponse', function transportUnexpectedResponse(exception) {
    this.loadingTask._capability.reject(new UnexpectedResponseException(exception.message, exception.status));
   }, this);
   messageHandler.on('UnknownError', function transportUnknownError(exception) {
    this.loadingTask._capability.reject(new UnknownErrorException(exception.message, exception.details));
   }, this);
   messageHandler.on('DataLoaded', function transportPage(data) {
    this.downloadInfoCapability.resolve(data);
   }, this);
   messageHandler.on('PDFManagerReady', function transportPage(data) {
    if (this.pdfDataRangeTransport) {
     this.pdfDataRangeTransport.transportReady();
    }
   }, this);
   messageHandler.on('StartRenderPage', function transportRender(data) {
    if (this.destroyed) {
     return;
    }
    var page = this.pageCache[data.pageIndex];
    page.stats.timeEnd('Page Request');
    page._startRenderPage(data.transparency, data.intent);
   }, this);
   messageHandler.on('RenderPageChunk', function transportRender(data) {
    if (this.destroyed) {
     return;
    }
    var page = this.pageCache[data.pageIndex];
    page._renderPageChunk(data.operatorList, data.intent);
   }, this);
   messageHandler.on('commonobj', function transportObj(data) {
    if (this.destroyed) {
     return;
    }
    var id = data[0];
    var type = data[1];
    if (this.commonObjs.hasData(id)) {
     return;
    }
    switch (type) {
    case 'Font':
     var exportedData = data[2];
     if ('error' in exportedData) {
      var exportedError = exportedData.error;
      warn('Error during font loading: ' + exportedError);
      this.commonObjs.resolve(id, exportedError);
      break;
     }
     var fontRegistry = null;
     if (getDefaultSetting('pdfBug') && globalScope.FontInspector && globalScope['FontInspector'].enabled) {
      fontRegistry = {
       registerFont: function (font, url) {
        globalScope['FontInspector'].fontAdded(font, url);
       }
      };
     }
     var font = new FontFaceObject(exportedData, {
      isEvalSuported: getDefaultSetting('isEvalSupported'),
      disableFontFace: getDefaultSetting('disableFontFace'),
      fontRegistry: fontRegistry
     });
     this.fontLoader.bind([font], function fontReady(fontObjs) {
      this.commonObjs.resolve(id, font);
     }.bind(this));
     break;
    case 'FontPath':
     this.commonObjs.resolve(id, data[2]);
     break;
    default:
     error('Got unknown common object type ' + type);
    }
   }, this);
   messageHandler.on('obj', function transportObj(data) {
    if (this.destroyed) {
     return;
    }
    var id = data[0];
    var pageIndex = data[1];
    var type = data[2];
    var pageProxy = this.pageCache[pageIndex];
    var imageData;
    if (pageProxy.objs.hasData(id)) {
     return;
    }
    switch (type) {
    case 'JpegStream':
     imageData = data[3];
     loadJpegStream(id, imageData, pageProxy.objs);
     break;
    case 'Image':
     imageData = data[3];
     pageProxy.objs.resolve(id, imageData);
     var MAX_IMAGE_SIZE_TO_STORE = 8000000;
     if (imageData && 'data' in imageData && imageData.data.length > MAX_IMAGE_SIZE_TO_STORE) {
      pageProxy.cleanupAfterRender = true;
     }
     break;
    default:
     error('Got unknown object type ' + type);
    }
   }, this);
   messageHandler.on('DocProgress', function transportDocProgress(data) {
    if (this.destroyed) {
     return;
    }
    var loadingTask = this.loadingTask;
    if (loadingTask.onProgress) {
     loadingTask.onProgress({
      loaded: data.loaded,
      total: data.total
     });
    }
   }, this);
   messageHandler.on('PageError', function transportError(data) {
    if (this.destroyed) {
     return;
    }
    var page = this.pageCache[data.pageNum - 1];
    var intentState = page.intentStates[data.intent];
    if (intentState.displayReadyCapability) {
     intentState.displayReadyCapability.reject(data.error);
    } else {
     error(data.error);
    }
    if (intentState.operatorList) {
     intentState.operatorList.lastChunk = true;
     for (var i = 0; i < intentState.renderTasks.length; i++) {
      intentState.renderTasks[i].operatorListChanged();
     }
    }
   }, this);
   messageHandler.on('UnsupportedFeature', function transportUnsupportedFeature(data) {
    if (this.destroyed) {
     return;
    }
    var featureId = data.featureId;
    var loadingTask = this.loadingTask;
    if (loadingTask.onUnsupportedFeature) {
     loadingTask.onUnsupportedFeature(featureId);
    }
    _UnsupportedManager.notify(featureId);
   }, this);
   messageHandler.on('JpegDecode', function (data) {
    if (this.destroyed) {
     return Promise.reject(new Error('Worker was destroyed'));
    }
    if (typeof document === 'undefined') {
     return Promise.reject(new Error('"document" is not defined.'));
    }
    var imageUrl = data[0];
    var components = data[1];
    if (components !== 3 && components !== 1) {
     return Promise.reject(new Error('Only 3 components or 1 component can be returned'));
    }
    return new Promise(function (resolve, reject) {
     var img = new Image();
     img.onload = function () {
      var width = img.width;
      var height = img.height;
      var size = width * height;
      var rgbaLength = size * 4;
      var buf = new Uint8Array(size * components);
      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = width;
      tmpCanvas.height = height;
      var tmpCtx = tmpCanvas.getContext('2d');
      tmpCtx.drawImage(img, 0, 0);
      var data = tmpCtx.getImageData(0, 0, width, height).data;
      var i, j;
      if (components === 3) {
       for (i = 0, j = 0; i < rgbaLength; i += 4, j += 3) {
        buf[j] = data[i];
        buf[j + 1] = data[i + 1];
        buf[j + 2] = data[i + 2];
       }
      } else if (components === 1) {
       for (i = 0, j = 0; i < rgbaLength; i += 4, j++) {
        buf[j] = data[i];
       }
      }
      resolve({
       data: buf,
       width: width,
       height: height
      });
     };
     img.onerror = function () {
      reject(new Error('JpegDecode failed to load image'));
     };
     img.src = imageUrl;
    });
   }, this);
   messageHandler.on('FetchBuiltInCMap', function (data) {
    if (this.destroyed) {
     return Promise.reject(new Error('Worker was destroyed'));
    }
    return this.CMapReaderFactory.fetch({ name: data.name });
   }, this);
  },
  getData: function WorkerTransport_getData() {
   return this.messageHandler.sendWithPromise('GetData', null);
  },
  getPage: function WorkerTransport_getPage(pageNumber, capability) {
   if (!isInt(pageNumber) || pageNumber <= 0 || pageNumber > this.numPages) {
    return Promise.reject(new Error('Invalid page request'));
   }
   var pageIndex = pageNumber - 1;
   if (pageIndex in this.pagePromises) {
    return this.pagePromises[pageIndex];
   }
   var promise = this.messageHandler.sendWithPromise('GetPage', { pageIndex: pageIndex }).then(function (pageInfo) {
    if (this.destroyed) {
     throw new Error('Transport destroyed');
    }
    var page = new PDFPageProxy(pageIndex, pageInfo, this);
    this.pageCache[pageIndex] = page;
    return page;
   }.bind(this));
   this.pagePromises[pageIndex] = promise;
   return promise;
  },
  getPageIndex: function WorkerTransport_getPageIndexByRef(ref) {
   return this.messageHandler.sendWithPromise('GetPageIndex', { ref: ref }).catch(function (reason) {
    return Promise.reject(new Error(reason));
   });
  },
  getAnnotations: function WorkerTransport_getAnnotations(pageIndex, intent) {
   return this.messageHandler.sendWithPromise('GetAnnotations', {
    pageIndex: pageIndex,
    intent: intent
   });
  },
  getDestinations: function WorkerTransport_getDestinations() {
   return this.messageHandler.sendWithPromise('GetDestinations', null);
  },
  getDestination: function WorkerTransport_getDestination(id) {
   return this.messageHandler.sendWithPromise('GetDestination', { id: id });
  },
  getPageLabels: function WorkerTransport_getPageLabels() {
   return this.messageHandler.sendWithPromise('GetPageLabels', null);
  },
  getAttachments: function WorkerTransport_getAttachments() {
   return this.messageHandler.sendWithPromise('GetAttachments', null);
  },
  getJavaScript: function WorkerTransport_getJavaScript() {
   return this.messageHandler.sendWithPromise('GetJavaScript', null);
  },
  getOutline: function WorkerTransport_getOutline() {
   return this.messageHandler.sendWithPromise('GetOutline', null);
  },
  getMetadata: function WorkerTransport_getMetadata() {
   return this.messageHandler.sendWithPromise('GetMetadata', null).then(function transportMetadata(results) {
    return {
     info: results[0],
     metadata: results[1] ? new Metadata(results[1]) : null
    };
   });
  },
  getStats: function WorkerTransport_getStats() {
   return this.messageHandler.sendWithPromise('GetStats', null);
  },
  startCleanup: function WorkerTransport_startCleanup() {
   this.messageHandler.sendWithPromise('Cleanup', null).then(function endCleanup() {
    for (var i = 0, ii = this.pageCache.length; i < ii; i++) {
     var page = this.pageCache[i];
     if (page) {
      page.cleanup();
     }
    }
    this.commonObjs.clear();
    this.fontLoader.clear();
   }.bind(this));
  }
 };
 return WorkerTransport;
}();
var PDFObjects = function PDFObjectsClosure() {
 function PDFObjects() {
  this.objs = Object.create(null);
 }
 PDFObjects.prototype = {
  ensureObj: function PDFObjects_ensureObj(objId) {
   if (this.objs[objId]) {
    return this.objs[objId];
   }
   var obj = {
    capability: createPromiseCapability(),
    data: null,
    resolved: false
   };
   this.objs[objId] = obj;
   return obj;
  },
  get: function PDFObjects_get(objId, callback) {
   if (callback) {
    this.ensureObj(objId).capability.promise.then(callback);
    return null;
   }
   var obj = this.objs[objId];
   if (!obj || !obj.resolved) {
    error('Requesting object that isn\'t resolved yet ' + objId);
   }
   return obj.data;
  },
  resolve: function PDFObjects_resolve(objId, data) {
   var obj = this.ensureObj(objId);
   obj.resolved = true;
   obj.data = data;
   obj.capability.resolve(data);
  },
  isResolved: function PDFObjects_isResolved(objId) {
   var objs = this.objs;
   if (!objs[objId]) {
    return false;
   }
   return objs[objId].resolved;
  },
  hasData: function PDFObjects_hasData(objId) {
   return this.isResolved(objId);
  },
  getData: function PDFObjects_getData(objId) {
   var objs = this.objs;
   if (!objs[objId] || !objs[objId].resolved) {
    return null;
   }
   return objs[objId].data;
  },
  clear: function PDFObjects_clear() {
   this.objs = Object.create(null);
  }
 };
 return PDFObjects;
}();
var RenderTask = function RenderTaskClosure() {
 function RenderTask(internalRenderTask) {
  this._internalRenderTask = internalRenderTask;
  this.onContinue = null;
 }
 RenderTask.prototype = {
  get promise() {
   return this._internalRenderTask.capability.promise;
  },
  cancel: function RenderTask_cancel() {
   this._internalRenderTask.cancel();
  },
  then: function RenderTask_then(onFulfilled, onRejected) {
   return this.promise.then.apply(this.promise, arguments);
  }
 };
 return RenderTask;
}();
var InternalRenderTask = function InternalRenderTaskClosure() {
 function InternalRenderTask(callback, params, objs, commonObjs, operatorList, pageNumber, canvasFactory) {
  this.callback = callback;
  this.params = params;
  this.objs = objs;
  this.commonObjs = commonObjs;
  this.operatorListIdx = null;
  this.operatorList = operatorList;
  this.pageNumber = pageNumber;
  this.canvasFactory = canvasFactory;
  this.running = false;
  this.graphicsReadyCallback = null;
  this.graphicsReady = false;
  this.useRequestAnimationFrame = false;
  this.cancelled = false;
  this.capability = createPromiseCapability();
  this.task = new RenderTask(this);
  this._continueBound = this._continue.bind(this);
  this._scheduleNextBound = this._scheduleNext.bind(this);
  this._nextBound = this._next.bind(this);
 }
 InternalRenderTask.prototype = {
  initializeGraphics: function InternalRenderTask_initializeGraphics(transparency) {
   if (this.cancelled) {
    return;
   }
   if (getDefaultSetting('pdfBug') && globalScope.StepperManager && globalScope.StepperManager.enabled) {
    this.stepper = globalScope.StepperManager.create(this.pageNumber - 1);
    this.stepper.init(this.operatorList);
    this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
   }
   var params = this.params;
   this.gfx = new CanvasGraphics(params.canvasContext, this.commonObjs, this.objs, this.canvasFactory, params.imageLayer);
   this.gfx.beginDrawing(params.transform, params.viewport, transparency);
   this.operatorListIdx = 0;
   this.graphicsReady = true;
   if (this.graphicsReadyCallback) {
    this.graphicsReadyCallback();
   }
  },
  cancel: function InternalRenderTask_cancel() {
   this.running = false;
   this.cancelled = true;
   this.callback('cancelled');
  },
  operatorListChanged: function InternalRenderTask_operatorListChanged() {
   if (!this.graphicsReady) {
    if (!this.graphicsReadyCallback) {
     this.graphicsReadyCallback = this._continueBound;
    }
    return;
   }
   if (this.stepper) {
    this.stepper.updateOperatorList(this.operatorList);
   }
   if (this.running) {
    return;
   }
   this._continue();
  },
  _continue: function InternalRenderTask__continue() {
   this.running = true;
   if (this.cancelled) {
    return;
   }
   if (this.task.onContinue) {
    this.task.onContinue(this._scheduleNextBound);
   } else {
    this._scheduleNext();
   }
  },
  _scheduleNext: function InternalRenderTask__scheduleNext() {
   if (this.useRequestAnimationFrame && typeof window !== 'undefined') {
    window.requestAnimationFrame(this._nextBound);
   } else {
    Promise.resolve(undefined).then(this._nextBound);
   }
  },
  _next: function InternalRenderTask__next() {
   if (this.cancelled) {
    return;
   }
   this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);
   if (this.operatorListIdx === this.operatorList.argsArray.length) {
    this.running = false;
    if (this.operatorList.lastChunk) {
     this.gfx.endDrawing();
     this.callback();
    }
   }
  }
 };
 return InternalRenderTask;
}();
var _UnsupportedManager = function UnsupportedManagerClosure() {
 var listeners = [];
 return {
  listen: function (cb) {
   deprecated('Global UnsupportedManager.listen is used: ' + ' use PDFDocumentLoadingTask.onUnsupportedFeature instead');
   listeners.push(cb);
  },
  notify: function (featureId) {
   for (var i = 0, ii = listeners.length; i < ii; i++) {
    listeners[i](featureId);
   }
  }
 };
}();
exports.version = '1.7.354';
exports.build = '0f7548ba';
exports.getDocument = getDocument;
exports.PDFDataRangeTransport = PDFDataRangeTransport;
exports.PDFWorker = PDFWorker;
exports.PDFDocumentProxy = PDFDocumentProxy;
exports.PDFPageProxy = PDFPageProxy;
exports._UnsupportedManager = _UnsupportedManager;

/***/ }),
/* 4 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var FONT_IDENTITY_MATRIX = sharedUtil.FONT_IDENTITY_MATRIX;
var IDENTITY_MATRIX = sharedUtil.IDENTITY_MATRIX;
var ImageKind = sharedUtil.ImageKind;
var OPS = sharedUtil.OPS;
var Util = sharedUtil.Util;
var isNum = sharedUtil.isNum;
var isArray = sharedUtil.isArray;
var warn = sharedUtil.warn;
var createObjectURL = sharedUtil.createObjectURL;
var SVG_DEFAULTS = {
 fontStyle: 'normal',
 fontWeight: 'normal',
 fillColor: '#000000'
};
var convertImgDataToPng = function convertImgDataToPngClosure() {
 var PNG_HEADER = new Uint8Array([
  0x89,
  0x50,
  0x4e,
  0x47,
  0x0d,
  0x0a,
  0x1a,
  0x0a
 ]);
 var CHUNK_WRAPPER_SIZE = 12;
 var crcTable = new Int32Array(256);
 for (var i = 0; i < 256; i++) {
  var c = i;
  for (var h = 0; h < 8; h++) {
   if (c & 1) {
    c = 0xedB88320 ^ c >> 1 & 0x7fffffff;
   } else {
    c = c >> 1 & 0x7fffffff;
   }
  }
  crcTable[i] = c;
 }
 function crc32(data, start, end) {
  var crc = -1;
  for (var i = start; i < end; i++) {
   var a = (crc ^ data[i]) & 0xff;
   var b = crcTable[a];
   crc = crc >>> 8 ^ b;
  }
  return crc ^ -1;
 }
 function writePngChunk(type, body, data, offset) {
  var p = offset;
  var len = body.length;
  data[p] = len >> 24 & 0xff;
  data[p + 1] = len >> 16 & 0xff;
  data[p + 2] = len >> 8 & 0xff;
  data[p + 3] = len & 0xff;
  p += 4;
  data[p] = type.charCodeAt(0) & 0xff;
  data[p + 1] = type.charCodeAt(1) & 0xff;
  data[p + 2] = type.charCodeAt(2) & 0xff;
  data[p + 3] = type.charCodeAt(3) & 0xff;
  p += 4;
  data.set(body, p);
  p += body.length;
  var crc = crc32(data, offset + 4, p);
  data[p] = crc >> 24 & 0xff;
  data[p + 1] = crc >> 16 & 0xff;
  data[p + 2] = crc >> 8 & 0xff;
  data[p + 3] = crc & 0xff;
 }
 function adler32(data, start, end) {
  var a = 1;
  var b = 0;
  for (var i = start; i < end; ++i) {
   a = (a + (data[i] & 0xff)) % 65521;
   b = (b + a) % 65521;
  }
  return b << 16 | a;
 }
 function encode(imgData, kind, forceDataSchema) {
  var width = imgData.width;
  var height = imgData.height;
  var bitDepth, colorType, lineSize;
  var bytes = imgData.data;
  switch (kind) {
  case ImageKind.GRAYSCALE_1BPP:
   colorType = 0;
   bitDepth = 1;
   lineSize = width + 7 >> 3;
   break;
  case ImageKind.RGB_24BPP:
   colorType = 2;
   bitDepth = 8;
   lineSize = width * 3;
   break;
  case ImageKind.RGBA_32BPP:
   colorType = 6;
   bitDepth = 8;
   lineSize = width * 4;
   break;
  default:
   throw new Error('invalid format');
  }
  var literals = new Uint8Array((1 + lineSize) * height);
  var offsetLiterals = 0, offsetBytes = 0;
  var y, i;
  for (y = 0; y < height; ++y) {
   literals[offsetLiterals++] = 0;
   literals.set(bytes.subarray(offsetBytes, offsetBytes + lineSize), offsetLiterals);
   offsetBytes += lineSize;
   offsetLiterals += lineSize;
  }
  if (kind === ImageKind.GRAYSCALE_1BPP) {
   offsetLiterals = 0;
   for (y = 0; y < height; y++) {
    offsetLiterals++;
    for (i = 0; i < lineSize; i++) {
     literals[offsetLiterals++] ^= 0xFF;
    }
   }
  }
  var ihdr = new Uint8Array([
   width >> 24 & 0xff,
   width >> 16 & 0xff,
   width >> 8 & 0xff,
   width & 0xff,
   height >> 24 & 0xff,
   height >> 16 & 0xff,
   height >> 8 & 0xff,
   height & 0xff,
   bitDepth,
   colorType,
   0x00,
   0x00,
   0x00
  ]);
  var len = literals.length;
  var maxBlockLength = 0xFFFF;
  var deflateBlocks = Math.ceil(len / maxBlockLength);
  var idat = new Uint8Array(2 + len + deflateBlocks * 5 + 4);
  var pi = 0;
  idat[pi++] = 0x78;
  idat[pi++] = 0x9c;
  var pos = 0;
  while (len > maxBlockLength) {
   idat[pi++] = 0x00;
   idat[pi++] = 0xff;
   idat[pi++] = 0xff;
   idat[pi++] = 0x00;
   idat[pi++] = 0x00;
   idat.set(literals.subarray(pos, pos + maxBlockLength), pi);
   pi += maxBlockLength;
   pos += maxBlockLength;
   len -= maxBlockLength;
  }
  idat[pi++] = 0x01;
  idat[pi++] = len & 0xff;
  idat[pi++] = len >> 8 & 0xff;
  idat[pi++] = ~len & 0xffff & 0xff;
  idat[pi++] = (~len & 0xffff) >> 8 & 0xff;
  idat.set(literals.subarray(pos), pi);
  pi += literals.length - pos;
  var adler = adler32(literals, 0, literals.length);
  idat[pi++] = adler >> 24 & 0xff;
  idat[pi++] = adler >> 16 & 0xff;
  idat[pi++] = adler >> 8 & 0xff;
  idat[pi++] = adler & 0xff;
  var pngLength = PNG_HEADER.length + CHUNK_WRAPPER_SIZE * 3 + ihdr.length + idat.length;
  var data = new Uint8Array(pngLength);
  var offset = 0;
  data.set(PNG_HEADER, offset);
  offset += PNG_HEADER.length;
  writePngChunk('IHDR', ihdr, data, offset);
  offset += CHUNK_WRAPPER_SIZE + ihdr.length;
  writePngChunk('IDATA', idat, data, offset);
  offset += CHUNK_WRAPPER_SIZE + idat.length;
  writePngChunk('IEND', new Uint8Array(0), data, offset);
  return createObjectURL(data, 'image/png', forceDataSchema);
 }
 return function convertImgDataToPng(imgData, forceDataSchema) {
  var kind = imgData.kind === undefined ? ImageKind.GRAYSCALE_1BPP : imgData.kind;
  return encode(imgData, kind, forceDataSchema);
 };
}();
var SVGExtraState = function SVGExtraStateClosure() {
 function SVGExtraState() {
  this.fontSizeScale = 1;
  this.fontWeight = SVG_DEFAULTS.fontWeight;
  this.fontSize = 0;
  this.textMatrix = IDENTITY_MATRIX;
  this.fontMatrix = FONT_IDENTITY_MATRIX;
  this.leading = 0;
  this.x = 0;
  this.y = 0;
  this.lineX = 0;
  this.lineY = 0;
  this.charSpacing = 0;
  this.wordSpacing = 0;
  this.textHScale = 1;
  this.textRise = 0;
  this.fillColor = SVG_DEFAULTS.fillColor;
  this.strokeColor = '#000000';
  this.fillAlpha = 1;
  this.strokeAlpha = 1;
  this.lineWidth = 1;
  this.lineJoin = '';
  this.lineCap = '';
  this.miterLimit = 0;
  this.dashArray = [];
  this.dashPhase = 0;
  this.dependencies = [];
  this.activeClipUrl = null;
  this.clipGroup = null;
  this.maskId = '';
 }
 SVGExtraState.prototype = {
  clone: function SVGExtraState_clone() {
   return Object.create(this);
  },
  setCurrentPoint: function SVGExtraState_setCurrentPoint(x, y) {
   this.x = x;
   this.y = y;
  }
 };
 return SVGExtraState;
}();
var SVGGraphics = function SVGGraphicsClosure() {
 function opListToTree(opList) {
  var opTree = [];
  var tmp = [];
  var opListLen = opList.length;
  for (var x = 0; x < opListLen; x++) {
   if (opList[x].fn === 'save') {
    opTree.push({
     'fnId': 92,
     'fn': 'group',
     'items': []
    });
    tmp.push(opTree);
    opTree = opTree[opTree.length - 1].items;
    continue;
   }
   if (opList[x].fn === 'restore') {
    opTree = tmp.pop();
   } else {
    opTree.push(opList[x]);
   }
  }
  return opTree;
 }
 function pf(value) {
  if (value === (value | 0)) {
   return value.toString();
  }
  var s = value.toFixed(10);
  var i = s.length - 1;
  if (s[i] !== '0') {
   return s;
  }
  do {
   i--;
  } while (s[i] === '0');
  return s.substr(0, s[i] === '.' ? i : i + 1);
 }
 function pm(m) {
  if (m[4] === 0 && m[5] === 0) {
   if (m[1] === 0 && m[2] === 0) {
    if (m[0] === 1 && m[3] === 1) {
     return '';
    }
    return 'scale(' + pf(m[0]) + ' ' + pf(m[3]) + ')';
   }
   if (m[0] === m[3] && m[1] === -m[2]) {
    var a = Math.acos(m[0]) * 180 / Math.PI;
    return 'rotate(' + pf(a) + ')';
   }
  } else {
   if (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1) {
    return 'translate(' + pf(m[4]) + ' ' + pf(m[5]) + ')';
   }
  }
  return 'matrix(' + pf(m[0]) + ' ' + pf(m[1]) + ' ' + pf(m[2]) + ' ' + pf(m[3]) + ' ' + pf(m[4]) + ' ' + pf(m[5]) + ')';
 }
 function SVGGraphics(commonObjs, objs, forceDataSchema) {
  this.current = new SVGExtraState();
  this.transformMatrix = IDENTITY_MATRIX;
  this.transformStack = [];
  this.extraStack = [];
  this.commonObjs = commonObjs;
  this.objs = objs;
  this.pendingEOFill = false;
  this.embedFonts = false;
  this.embeddedFonts = Object.create(null);
  this.cssStyle = null;
  this.forceDataSchema = !!forceDataSchema;
 }
 var NS = 'http://www.w3.org/2000/svg';
 var XML_NS = 'http://www.w3.org/XML/1998/namespace';
 var XLINK_NS = 'http://www.w3.org/1999/xlink';
 var LINE_CAP_STYLES = [
  'butt',
  'round',
  'square'
 ];
 var LINE_JOIN_STYLES = [
  'miter',
  'round',
  'bevel'
 ];
 var clipCount = 0;
 var maskCount = 0;
 SVGGraphics.prototype = {
  save: function SVGGraphics_save() {
   this.transformStack.push(this.transformMatrix);
   var old = this.current;
   this.extraStack.push(old);
   this.current = old.clone();
  },
  restore: function SVGGraphics_restore() {
   this.transformMatrix = this.transformStack.pop();
   this.current = this.extraStack.pop();
   this.tgrp = null;
  },
  group: function SVGGraphics_group(items) {
   this.save();
   this.executeOpTree(items);
   this.restore();
  },
  loadDependencies: function SVGGraphics_loadDependencies(operatorList) {
   var fnArray = operatorList.fnArray;
   var fnArrayLen = fnArray.length;
   var argsArray = operatorList.argsArray;
   var self = this;
   for (var i = 0; i < fnArrayLen; i++) {
    if (OPS.dependency === fnArray[i]) {
     var deps = argsArray[i];
     for (var n = 0, nn = deps.length; n < nn; n++) {
      var obj = deps[n];
      var common = obj.substring(0, 2) === 'g_';
      var promise;
      if (common) {
       promise = new Promise(function (resolve) {
        self.commonObjs.get(obj, resolve);
       });
      } else {
       promise = new Promise(function (resolve) {
        self.objs.get(obj, resolve);
       });
      }
      this.current.dependencies.push(promise);
     }
    }
   }
   return Promise.all(this.current.dependencies);
  },
  transform: function SVGGraphics_transform(a, b, c, d, e, f) {
   var transformMatrix = [
    a,
    b,
    c,
    d,
    e,
    f
   ];
   this.transformMatrix = Util.transform(this.transformMatrix, transformMatrix);
   this.tgrp = null;
  },
  getSVG: function SVGGraphics_getSVG(operatorList, viewport) {
   this.viewport = viewport;
   var svgElement = this._initialize(viewport);
   return this.loadDependencies(operatorList).then(function () {
    this.transformMatrix = IDENTITY_MATRIX;
    var opTree = this.convertOpList(operatorList);
    this.executeOpTree(opTree);
    return svgElement;
   }.bind(this));
  },
  convertOpList: function SVGGraphics_convertOpList(operatorList) {
   var argsArray = operatorList.argsArray;
   var fnArray = operatorList.fnArray;
   var fnArrayLen = fnArray.length;
   var REVOPS = [];
   var opList = [];
   for (var op in OPS) {
    REVOPS[OPS[op]] = op;
   }
   for (var x = 0; x < fnArrayLen; x++) {
    var fnId = fnArray[x];
    opList.push({
     'fnId': fnId,
     'fn': REVOPS[fnId],
     'args': argsArray[x]
    });
   }
   return opListToTree(opList);
  },
  executeOpTree: function SVGGraphics_executeOpTree(opTree) {
   var opTreeLen = opTree.length;
   for (var x = 0; x < opTreeLen; x++) {
    var fn = opTree[x].fn;
    var fnId = opTree[x].fnId;
    var args = opTree[x].args;
    switch (fnId | 0) {
    case OPS.beginText:
     this.beginText();
     break;
    case OPS.setLeading:
     this.setLeading(args);
     break;
    case OPS.setLeadingMoveText:
     this.setLeadingMoveText(args[0], args[1]);
     break;
    case OPS.setFont:
     this.setFont(args);
     break;
    case OPS.showText:
     this.showText(args[0]);
     break;
    case OPS.showSpacedText:
     this.showText(args[0]);
     break;
    case OPS.endText:
     this.endText();
     break;
    case OPS.moveText:
     this.moveText(args[0], args[1]);
     break;
    case OPS.setCharSpacing:
     this.setCharSpacing(args[0]);
     break;
    case OPS.setWordSpacing:
     this.setWordSpacing(args[0]);
     break;
    case OPS.setHScale:
     this.setHScale(args[0]);
     break;
    case OPS.setTextMatrix:
     this.setTextMatrix(args[0], args[1], args[2], args[3], args[4], args[5]);
     break;
    case OPS.setLineWidth:
     this.setLineWidth(args[0]);
     break;
    case OPS.setLineJoin:
     this.setLineJoin(args[0]);
     break;
    case OPS.setLineCap:
     this.setLineCap(args[0]);
     break;
    case OPS.setMiterLimit:
     this.setMiterLimit(args[0]);
     break;
    case OPS.setFillRGBColor:
     this.setFillRGBColor(args[0], args[1], args[2]);
     break;
    case OPS.setStrokeRGBColor:
     this.setStrokeRGBColor(args[0], args[1], args[2]);
     break;
    case OPS.setDash:
     this.setDash(args[0], args[1]);
     break;
    case OPS.setGState:
     this.setGState(args[0]);
     break;
    case OPS.fill:
     this.fill();
     break;
    case OPS.eoFill:
     this.eoFill();
     break;
    case OPS.stroke:
     this.stroke();
     break;
    case OPS.fillStroke:
     this.fillStroke();
     break;
    case OPS.eoFillStroke:
     this.eoFillStroke();
     break;
    case OPS.clip:
     this.clip('nonzero');
     break;
    case OPS.eoClip:
     this.clip('evenodd');
     break;
    case OPS.paintSolidColorImageMask:
     this.paintSolidColorImageMask();
     break;
    case OPS.paintJpegXObject:
     this.paintJpegXObject(args[0], args[1], args[2]);
     break;
    case OPS.paintImageXObject:
     this.paintImageXObject(args[0]);
     break;
    case OPS.paintInlineImageXObject:
     this.paintInlineImageXObject(args[0]);
     break;
    case OPS.paintImageMaskXObject:
     this.paintImageMaskXObject(args[0]);
     break;
    case OPS.paintFormXObjectBegin:
     this.paintFormXObjectBegin(args[0], args[1]);
     break;
    case OPS.paintFormXObjectEnd:
     this.paintFormXObjectEnd();
     break;
    case OPS.closePath:
     this.closePath();
     break;
    case OPS.closeStroke:
     this.closeStroke();
     break;
    case OPS.closeFillStroke:
     this.closeFillStroke();
     break;
    case OPS.nextLine:
     this.nextLine();
     break;
    case OPS.transform:
     this.transform(args[0], args[1], args[2], args[3], args[4], args[5]);
     break;
    case OPS.constructPath:
     this.constructPath(args[0], args[1]);
     break;
    case OPS.endPath:
     this.endPath();
     break;
    case 92:
     this.group(opTree[x].items);
     break;
    default:
     warn('Unimplemented operator ' + fn);
     break;
    }
   }
  },
  setWordSpacing: function SVGGraphics_setWordSpacing(wordSpacing) {
   this.current.wordSpacing = wordSpacing;
  },
  setCharSpacing: function SVGGraphics_setCharSpacing(charSpacing) {
   this.current.charSpacing = charSpacing;
  },
  nextLine: function SVGGraphics_nextLine() {
   this.moveText(0, this.current.leading);
  },
  setTextMatrix: function SVGGraphics_setTextMatrix(a, b, c, d, e, f) {
   var current = this.current;
   this.current.textMatrix = this.current.lineMatrix = [
    a,
    b,
    c,
    d,
    e,
    f
   ];
   this.current.x = this.current.lineX = 0;
   this.current.y = this.current.lineY = 0;
   current.xcoords = [];
   current.tspan = document.createElementNS(NS, 'svg:tspan');
   current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);
   current.tspan.setAttributeNS(null, 'font-size', pf(current.fontSize) + 'px');
   current.tspan.setAttributeNS(null, 'y', pf(-current.y));
   current.txtElement = document.createElementNS(NS, 'svg:text');
   current.txtElement.appendChild(current.tspan);
  },
  beginText: function SVGGraphics_beginText() {
   this.current.x = this.current.lineX = 0;
   this.current.y = this.current.lineY = 0;
   this.current.textMatrix = IDENTITY_MATRIX;
   this.current.lineMatrix = IDENTITY_MATRIX;
   this.current.tspan = document.createElementNS(NS, 'svg:tspan');
   this.current.txtElement = document.createElementNS(NS, 'svg:text');
   this.current.txtgrp = document.createElementNS(NS, 'svg:g');
   this.current.xcoords = [];
  },
  moveText: function SVGGraphics_moveText(x, y) {
   var current = this.current;
   this.current.x = this.current.lineX += x;
   this.current.y = this.current.lineY += y;
   current.xcoords = [];
   current.tspan = document.createElementNS(NS, 'svg:tspan');
   current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);
   current.tspan.setAttributeNS(null, 'font-size', pf(current.fontSize) + 'px');
   current.tspan.setAttributeNS(null, 'y', pf(-current.y));
  },
  showText: function SVGGraphics_showText(glyphs) {
   var current = this.current;
   var font = current.font;
   var fontSize = current.fontSize;
   if (fontSize === 0) {
    return;
   }
   var charSpacing = current.charSpacing;
   var wordSpacing = current.wordSpacing;
   var fontDirection = current.fontDirection;
   var textHScale = current.textHScale * fontDirection;
   var glyphsLength = glyphs.length;
   var vertical = font.vertical;
   var widthAdvanceScale = fontSize * current.fontMatrix[0];
   var x = 0, i;
   for (i = 0; i < glyphsLength; ++i) {
    var glyph = glyphs[i];
    if (glyph === null) {
     x += fontDirection * wordSpacing;
     continue;
    } else if (isNum(glyph)) {
     x += -glyph * fontSize * 0.001;
     continue;
    }
    current.xcoords.push(current.x + x * textHScale);
    var width = glyph.width;
    var character = glyph.fontChar;
    var charWidth = width * widthAdvanceScale + charSpacing * fontDirection;
    x += charWidth;
    current.tspan.textContent += character;
   }
   if (vertical) {
    current.y -= x * textHScale;
   } else {
    current.x += x * textHScale;
   }
   current.tspan.setAttributeNS(null, 'x', current.xcoords.map(pf).join(' '));
   current.tspan.setAttributeNS(null, 'y', pf(-current.y));
   current.tspan.setAttributeNS(null, 'font-family', current.fontFamily);
   current.tspan.setAttributeNS(null, 'font-size', pf(current.fontSize) + 'px');
   if (current.fontStyle !== SVG_DEFAULTS.fontStyle) {
    current.tspan.setAttributeNS(null, 'font-style', current.fontStyle);
   }
   if (current.fontWeight !== SVG_DEFAULTS.fontWeight) {
    current.tspan.setAttributeNS(null, 'font-weight', current.fontWeight);
   }
   if (current.fillColor !== SVG_DEFAULTS.fillColor) {
    current.tspan.setAttributeNS(null, 'fill', current.fillColor);
   }
   current.txtElement.setAttributeNS(null, 'transform', pm(current.textMatrix) + ' scale(1, -1)');
   current.txtElement.setAttributeNS(XML_NS, 'xml:space', 'preserve');
   current.txtElement.appendChild(current.tspan);
   current.txtgrp.appendChild(current.txtElement);
   this._ensureTransformGroup().appendChild(current.txtElement);
  },
  setLeadingMoveText: function SVGGraphics_setLeadingMoveText(x, y) {
   this.setLeading(-y);
   this.moveText(x, y);
  },
  addFontStyle: function SVGGraphics_addFontStyle(fontObj) {
   if (!this.cssStyle) {
    this.cssStyle = document.createElementNS(NS, 'svg:style');
    this.cssStyle.setAttributeNS(null, 'type', 'text/css');
    this.defs.appendChild(this.cssStyle);
   }
   var url = createObjectURL(fontObj.data, fontObj.mimetype, this.forceDataSchema);
   this.cssStyle.textContent += '@font-face { font-family: "' + fontObj.loadedName + '";' + ' src: url(' + url + '); }\n';
  },
  setFont: function SVGGraphics_setFont(details) {
   var current = this.current;
   var fontObj = this.commonObjs.get(details[0]);
   var size = details[1];
   this.current.font = fontObj;
   if (this.embedFonts && fontObj.data && !this.embeddedFonts[fontObj.loadedName]) {
    this.addFontStyle(fontObj);
    this.embeddedFonts[fontObj.loadedName] = fontObj;
   }
   current.fontMatrix = fontObj.fontMatrix ? fontObj.fontMatrix : FONT_IDENTITY_MATRIX;
   var bold = fontObj.black ? fontObj.bold ? 'bolder' : 'bold' : fontObj.bold ? 'bold' : 'normal';
   var italic = fontObj.italic ? 'italic' : 'normal';
   if (size < 0) {
    size = -size;
    current.fontDirection = -1;
   } else {
    current.fontDirection = 1;
   }
   current.fontSize = size;
   current.fontFamily = fontObj.loadedName;
   current.fontWeight = bold;
   current.fontStyle = italic;
   current.tspan = document.createElementNS(NS, 'svg:tspan');
   current.tspan.setAttributeNS(null, 'y', pf(-current.y));
   current.xcoords = [];
  },
  endText: function SVGGraphics_endText() {
  },
  setLineWidth: function SVGGraphics_setLineWidth(width) {
   this.current.lineWidth = width;
  },
  setLineCap: function SVGGraphics_setLineCap(style) {
   this.current.lineCap = LINE_CAP_STYLES[style];
  },
  setLineJoin: function SVGGraphics_setLineJoin(style) {
   this.current.lineJoin = LINE_JOIN_STYLES[style];
  },
  setMiterLimit: function SVGGraphics_setMiterLimit(limit) {
   this.current.miterLimit = limit;
  },
  setStrokeRGBColor: function SVGGraphics_setStrokeRGBColor(r, g, b) {
   var color = Util.makeCssRgb(r, g, b);
   this.current.strokeColor = color;
  },
  setFillRGBColor: function SVGGraphics_setFillRGBColor(r, g, b) {
   var color = Util.makeCssRgb(r, g, b);
   this.current.fillColor = color;
   this.current.tspan = document.createElementNS(NS, 'svg:tspan');
   this.current.xcoords = [];
  },
  setDash: function SVGGraphics_setDash(dashArray, dashPhase) {
   this.current.dashArray = dashArray;
   this.current.dashPhase = dashPhase;
  },
  constructPath: function SVGGraphics_constructPath(ops, args) {
   var current = this.current;
   var x = current.x, y = current.y;
   current.path = document.createElementNS(NS, 'svg:path');
   var d = [];
   var opLength = ops.length;
   for (var i = 0, j = 0; i < opLength; i++) {
    switch (ops[i] | 0) {
    case OPS.rectangle:
     x = args[j++];
     y = args[j++];
     var width = args[j++];
     var height = args[j++];
     var xw = x + width;
     var yh = y + height;
     d.push('M', pf(x), pf(y), 'L', pf(xw), pf(y), 'L', pf(xw), pf(yh), 'L', pf(x), pf(yh), 'Z');
     break;
    case OPS.moveTo:
     x = args[j++];
     y = args[j++];
     d.push('M', pf(x), pf(y));
     break;
    case OPS.lineTo:
     x = args[j++];
     y = args[j++];
     d.push('L', pf(x), pf(y));
     break;
    case OPS.curveTo:
     x = args[j + 4];
     y = args[j + 5];
     d.push('C', pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]), pf(x), pf(y));
     j += 6;
     break;
    case OPS.curveTo2:
     x = args[j + 2];
     y = args[j + 3];
     d.push('C', pf(x), pf(y), pf(args[j]), pf(args[j + 1]), pf(args[j + 2]), pf(args[j + 3]));
     j += 4;
     break;
    case OPS.curveTo3:
     x = args[j + 2];
     y = args[j + 3];
     d.push('C', pf(args[j]), pf(args[j + 1]), pf(x), pf(y), pf(x), pf(y));
     j += 4;
     break;
    case OPS.closePath:
     d.push('Z');
     break;
    }
   }
   current.path.setAttributeNS(null, 'd', d.join(' '));
   current.path.setAttributeNS(null, 'stroke-miterlimit', pf(current.miterLimit));
   current.path.setAttributeNS(null, 'stroke-linecap', current.lineCap);
   current.path.setAttributeNS(null, 'stroke-linejoin', current.lineJoin);
   current.path.setAttributeNS(null, 'stroke-width', pf(current.lineWidth) + 'px');
   current.path.setAttributeNS(null, 'stroke-dasharray', current.dashArray.map(pf).join(' '));
   current.path.setAttributeNS(null, 'stroke-dashoffset', pf(current.dashPhase) + 'px');
   current.path.setAttributeNS(null, 'fill', 'none');
   this._ensureTransformGroup().appendChild(current.path);
   current.element = current.path;
   current.setCurrentPoint(x, y);
  },
  endPath: function SVGGraphics_endPath() {
  },
  clip: function SVGGraphics_clip(type) {
   var current = this.current;
   var clipId = 'clippath' + clipCount;
   clipCount++;
   var clipPath = document.createElementNS(NS, 'svg:clipPath');
   clipPath.setAttributeNS(null, 'id', clipId);
   clipPath.setAttributeNS(null, 'transform', pm(this.transformMatrix));
   var clipElement = current.element.cloneNode();
   if (type === 'evenodd') {
    clipElement.setAttributeNS(null, 'clip-rule', 'evenodd');
   } else {
    clipElement.setAttributeNS(null, 'clip-rule', 'nonzero');
   }
   clipPath.appendChild(clipElement);
   this.defs.appendChild(clipPath);
   if (current.activeClipUrl) {
    current.clipGroup = null;
    this.extraStack.forEach(function (prev) {
     prev.clipGroup = null;
    });
   }
   current.activeClipUrl = 'url(#' + clipId + ')';
   this.tgrp = null;
  },
  closePath: function SVGGraphics_closePath() {
   var current = this.current;
   var d = current.path.getAttributeNS(null, 'd');
   d += 'Z';
   current.path.setAttributeNS(null, 'd', d);
  },
  setLeading: function SVGGraphics_setLeading(leading) {
   this.current.leading = -leading;
  },
  setTextRise: function SVGGraphics_setTextRise(textRise) {
   this.current.textRise = textRise;
  },
  setHScale: function SVGGraphics_setHScale(scale) {
   this.current.textHScale = scale / 100;
  },
  setGState: function SVGGraphics_setGState(states) {
   for (var i = 0, ii = states.length; i < ii; i++) {
    var state = states[i];
    var key = state[0];
    var value = state[1];
    switch (key) {
    case 'LW':
     this.setLineWidth(value);
     break;
    case 'LC':
     this.setLineCap(value);
     break;
    case 'LJ':
     this.setLineJoin(value);
     break;
    case 'ML':
     this.setMiterLimit(value);
     break;
    case 'D':
     this.setDash(value[0], value[1]);
     break;
    case 'Font':
     this.setFont(value);
     break;
    default:
     warn('Unimplemented graphic state ' + key);
     break;
    }
   }
  },
  fill: function SVGGraphics_fill() {
   var current = this.current;
   current.element.setAttributeNS(null, 'fill', current.fillColor);
  },
  stroke: function SVGGraphics_stroke() {
   var current = this.current;
   current.element.setAttributeNS(null, 'stroke', current.strokeColor);
   current.element.setAttributeNS(null, 'fill', 'none');
  },
  eoFill: function SVGGraphics_eoFill() {
   var current = this.current;
   current.element.setAttributeNS(null, 'fill', current.fillColor);
   current.element.setAttributeNS(null, 'fill-rule', 'evenodd');
  },
  fillStroke: function SVGGraphics_fillStroke() {
   this.stroke();
   this.fill();
  },
  eoFillStroke: function SVGGraphics_eoFillStroke() {
   this.current.element.setAttributeNS(null, 'fill-rule', 'evenodd');
   this.fillStroke();
  },
  closeStroke: function SVGGraphics_closeStroke() {
   this.closePath();
   this.stroke();
  },
  closeFillStroke: function SVGGraphics_closeFillStroke() {
   this.closePath();
   this.fillStroke();
  },
  paintSolidColorImageMask: function SVGGraphics_paintSolidColorImageMask() {
   var current = this.current;
   var rect = document.createElementNS(NS, 'svg:rect');
   rect.setAttributeNS(null, 'x', '0');
   rect.setAttributeNS(null, 'y', '0');
   rect.setAttributeNS(null, 'width', '1px');
   rect.setAttributeNS(null, 'height', '1px');
   rect.setAttributeNS(null, 'fill', current.fillColor);
   this._ensureTransformGroup().appendChild(rect);
  },
  paintJpegXObject: function SVGGraphics_paintJpegXObject(objId, w, h) {
   var imgObj = this.objs.get(objId);
   var imgEl = document.createElementNS(NS, 'svg:image');
   imgEl.setAttributeNS(XLINK_NS, 'xlink:href', imgObj.src);
   imgEl.setAttributeNS(null, 'width', imgObj.width + 'px');
   imgEl.setAttributeNS(null, 'height', imgObj.height + 'px');
   imgEl.setAttributeNS(null, 'x', '0');
   imgEl.setAttributeNS(null, 'y', pf(-h));
   imgEl.setAttributeNS(null, 'transform', 'scale(' + pf(1 / w) + ' ' + pf(-1 / h) + ')');
   this._ensureTransformGroup().appendChild(imgEl);
  },
  paintImageXObject: function SVGGraphics_paintImageXObject(objId) {
   var imgData = this.objs.get(objId);
   if (!imgData) {
    warn('Dependent image isn\'t ready yet');
    return;
   }
   this.paintInlineImageXObject(imgData);
  },
  paintInlineImageXObject: function SVGGraphics_paintInlineImageXObject(imgData, mask) {
   var width = imgData.width;
   var height = imgData.height;
   var imgSrc = convertImgDataToPng(imgData, this.forceDataSchema);
   var cliprect = document.createElementNS(NS, 'svg:rect');
   cliprect.setAttributeNS(null, 'x', '0');
   cliprect.setAttributeNS(null, 'y', '0');
   cliprect.setAttributeNS(null, 'width', pf(width));
   cliprect.setAttributeNS(null, 'height', pf(height));
   this.current.element = cliprect;
   this.clip('nonzero');
   var imgEl = document.createElementNS(NS, 'svg:image');
   imgEl.setAttributeNS(XLINK_NS, 'xlink:href', imgSrc);
   imgEl.setAttributeNS(null, 'x', '0');
   imgEl.setAttributeNS(null, 'y', pf(-height));
   imgEl.setAttributeNS(null, 'width', pf(width) + 'px');
   imgEl.setAttributeNS(null, 'height', pf(height) + 'px');
   imgEl.setAttributeNS(null, 'transform', 'scale(' + pf(1 / width) + ' ' + pf(-1 / height) + ')');
   if (mask) {
    mask.appendChild(imgEl);
   } else {
    this._ensureTransformGroup().appendChild(imgEl);
   }
  },
  paintImageMaskXObject: function SVGGraphics_paintImageMaskXObject(imgData) {
   var current = this.current;
   var width = imgData.width;
   var height = imgData.height;
   var fillColor = current.fillColor;
   current.maskId = 'mask' + maskCount++;
   var mask = document.createElementNS(NS, 'svg:mask');
   mask.setAttributeNS(null, 'id', current.maskId);
   var rect = document.createElementNS(NS, 'svg:rect');
   rect.setAttributeNS(null, 'x', '0');
   rect.setAttributeNS(null, 'y', '0');
   rect.setAttributeNS(null, 'width', pf(width));
   rect.setAttributeNS(null, 'height', pf(height));
   rect.setAttributeNS(null, 'fill', fillColor);
   rect.setAttributeNS(null, 'mask', 'url(#' + current.maskId + ')');
   this.defs.appendChild(mask);
   this._ensureTransformGroup().appendChild(rect);
   this.paintInlineImageXObject(imgData, mask);
  },
  paintFormXObjectBegin: function SVGGraphics_paintFormXObjectBegin(matrix, bbox) {
   if (isArray(matrix) && matrix.length === 6) {
    this.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
   }
   if (isArray(bbox) && bbox.length === 4) {
    var width = bbox[2] - bbox[0];
    var height = bbox[3] - bbox[1];
    var cliprect = document.createElementNS(NS, 'svg:rect');
    cliprect.setAttributeNS(null, 'x', bbox[0]);
    cliprect.setAttributeNS(null, 'y', bbox[1]);
    cliprect.setAttributeNS(null, 'width', pf(width));
    cliprect.setAttributeNS(null, 'height', pf(height));
    this.current.element = cliprect;
    this.clip('nonzero');
    this.endPath();
   }
  },
  paintFormXObjectEnd: function SVGGraphics_paintFormXObjectEnd() {
  },
  _initialize: function SVGGraphics_initialize(viewport) {
   var svg = document.createElementNS(NS, 'svg:svg');
   svg.setAttributeNS(null, 'version', '1.1');
   svg.setAttributeNS(null, 'width', viewport.width + 'px');
   svg.setAttributeNS(null, 'height', viewport.height + 'px');
   svg.setAttributeNS(null, 'preserveAspectRatio', 'none');
   svg.setAttributeNS(null, 'viewBox', '0 0 ' + viewport.width + ' ' + viewport.height);
   var definitions = document.createElementNS(NS, 'svg:defs');
   svg.appendChild(definitions);
   this.defs = definitions;
   var rootGroup = document.createElementNS(NS, 'svg:g');
   rootGroup.setAttributeNS(null, 'transform', pm(viewport.transform));
   svg.appendChild(rootGroup);
   this.svg = rootGroup;
   return svg;
  },
  _ensureClipGroup: function SVGGraphics_ensureClipGroup() {
   if (!this.current.clipGroup) {
    var clipGroup = document.createElementNS(NS, 'svg:g');
    clipGroup.setAttributeNS(null, 'clip-path', this.current.activeClipUrl);
    this.svg.appendChild(clipGroup);
    this.current.clipGroup = clipGroup;
   }
   return this.current.clipGroup;
  },
  _ensureTransformGroup: function SVGGraphics_ensureTransformGroup() {
   if (!this.tgrp) {
    this.tgrp = document.createElementNS(NS, 'svg:g');
    this.tgrp.setAttributeNS(null, 'transform', pm(this.transformMatrix));
    if (this.current.activeClipUrl) {
     this._ensureClipGroup().appendChild(this.tgrp);
    } else {
     this.svg.appendChild(this.tgrp);
    }
   }
   return this.tgrp;
  }
 };
 return SVGGraphics;
}();
exports.SVGGraphics = SVGGraphics;

/***/ }),
/* 5 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var displayDOMUtils = __w_pdfjs_require__(1);
var Util = sharedUtil.Util;
var createPromiseCapability = sharedUtil.createPromiseCapability;
var CustomStyle = displayDOMUtils.CustomStyle;
var getDefaultSetting = displayDOMUtils.getDefaultSetting;
var renderTextLayer = function renderTextLayerClosure() {
 var MAX_TEXT_DIVS_TO_RENDER = 100000;
 var NonWhitespaceRegexp = /\S/;
 function isAllWhitespace(str) {
  return !NonWhitespaceRegexp.test(str);
 }
 var styleBuf = [
  'left: ',
  0,
  'px; top: ',
  0,
  'px; font-size: ',
  0,
  'px; font-family: ',
  '',
  ';'
 ];
 function appendText(task, geom, styles) {
  var textDiv = document.createElement('div');
  var textDivProperties = {
   style: null,
   angle: 0,
   canvasWidth: 0,
   isWhitespace: false,
   originalTransform: null,
   paddingBottom: 0,
   paddingLeft: 0,
   paddingRight: 0,
   paddingTop: 0,
   scale: 1
  };
  task._textDivs.push(textDiv);
  if (isAllWhitespace(geom.str)) {
   textDivProperties.isWhitespace = true;
   task._textDivProperties.set(textDiv, textDivProperties);
   return;
  }
  var tx = Util.transform(task._viewport.transform, geom.transform);
  var angle = Math.atan2(tx[1], tx[0]);
  var style = styles[geom.fontName];
  if (style.vertical) {
   angle += Math.PI / 2;
  }
  var fontHeight = Math.sqrt(tx[2] * tx[2] + tx[3] * tx[3]);
  var fontAscent = fontHeight;
  if (style.ascent) {
   fontAscent = style.ascent * fontAscent;
  } else if (style.descent) {
   fontAscent = (1 + style.descent) * fontAscent;
  }
  var left;
  var top;
  if (angle === 0) {
   left = tx[4];
   top = tx[5] - fontAscent;
  } else {
   left = tx[4] + fontAscent * Math.sin(angle);
   top = tx[5] - fontAscent * Math.cos(angle);
  }
  styleBuf[1] = left;
  styleBuf[3] = top;
  styleBuf[5] = fontHeight;
  styleBuf[7] = style.fontFamily;
  textDivProperties.style = styleBuf.join('');
  textDiv.setAttribute('style', textDivProperties.style);
  textDiv.textContent = geom.str;
  if (getDefaultSetting('pdfBug')) {
   textDiv.dataset.fontName = geom.fontName;
  }
  if (angle !== 0) {
   textDivProperties.angle = angle * (180 / Math.PI);
  }
  if (geom.str.length > 1) {
   if (style.vertical) {
    textDivProperties.canvasWidth = geom.height * task._viewport.scale;
   } else {
    textDivProperties.canvasWidth = geom.width * task._viewport.scale;
   }
  }
  task._textDivProperties.set(textDiv, textDivProperties);
  if (task._enhanceTextSelection) {
   var angleCos = 1, angleSin = 0;
   if (angle !== 0) {
    angleCos = Math.cos(angle);
    angleSin = Math.sin(angle);
   }
   var divWidth = (style.vertical ? geom.height : geom.width) * task._viewport.scale;
   var divHeight = fontHeight;
   var m, b;
   if (angle !== 0) {
    m = [
     angleCos,
     angleSin,
     -angleSin,
     angleCos,
     left,
     top
    ];
    b = Util.getAxialAlignedBoundingBox([
     0,
     0,
     divWidth,
     divHeight
    ], m);
   } else {
    b = [
     left,
     top,
     left + divWidth,
     top + divHeight
    ];
   }
   task._bounds.push({
    left: b[0],
    top: b[1],
    right: b[2],
    bottom: b[3],
    div: textDiv,
    size: [
     divWidth,
     divHeight
    ],
    m: m
   });
  }
 }
 function render(task) {
  if (task._canceled) {
   return;
  }
  var textLayerFrag = task._container;
  var textDivs = task._textDivs;
  var capability = task._capability;
  var textDivsLength = textDivs.length;
  if (textDivsLength > MAX_TEXT_DIVS_TO_RENDER) {
   task._renderingDone = true;
   capability.resolve();
   return;
  }
  var canvas = document.createElement('canvas');
  canvas.mozOpaque = true;
  var ctx = canvas.getContext('2d', { alpha: false });
  var lastFontSize;
  var lastFontFamily;
  for (var i = 0; i < textDivsLength; i++) {
   var textDiv = textDivs[i];
   var textDivProperties = task._textDivProperties.get(textDiv);
   if (textDivProperties.isWhitespace) {
    continue;
   }
   var fontSize = textDiv.style.fontSize;
   var fontFamily = textDiv.style.fontFamily;
   if (fontSize !== lastFontSize || fontFamily !== lastFontFamily) {
    ctx.font = fontSize + ' ' + fontFamily;
    lastFontSize = fontSize;
    lastFontFamily = fontFamily;
   }
   var width = ctx.measureText(textDiv.textContent).width;
   textLayerFrag.appendChild(textDiv);
   var transform = '';
   if (textDivProperties.canvasWidth !== 0 && width > 0) {
    textDivProperties.scale = textDivProperties.canvasWidth / width;
    transform = 'scaleX(' + textDivProperties.scale + ')';
   }
   if (textDivProperties.angle !== 0) {
    transform = 'rotate(' + textDivProperties.angle + 'deg) ' + transform;
   }
   if (transform !== '') {
    textDivProperties.originalTransform = transform;
    CustomStyle.setProp('transform', textDiv, transform);
   }
   task._textDivProperties.set(textDiv, textDivProperties);
  }
  task._renderingDone = true;
  capability.resolve();
 }
 function expand(task) {
  var bounds = task._bounds;
  var viewport = task._viewport;
  var expanded = expandBounds(viewport.width, viewport.height, bounds);
  for (var i = 0; i < expanded.length; i++) {
   var div = bounds[i].div;
   var divProperties = task._textDivProperties.get(div);
   if (divProperties.angle === 0) {
    divProperties.paddingLeft = bounds[i].left - expanded[i].left;
    divProperties.paddingTop = bounds[i].top - expanded[i].top;
    divProperties.paddingRight = expanded[i].right - bounds[i].right;
    divProperties.paddingBottom = expanded[i].bottom - bounds[i].bottom;
    task._textDivProperties.set(div, divProperties);
    continue;
   }
   var e = expanded[i], b = bounds[i];
   var m = b.m, c = m[0], s = m[1];
   var points = [
    [
     0,
     0
    ],
    [
     0,
     b.size[1]
    ],
    [
     b.size[0],
     0
    ],
    b.size
   ];
   var ts = new Float64Array(64);
   points.forEach(function (p, i) {
    var t = Util.applyTransform(p, m);
    ts[i + 0] = c && (e.left - t[0]) / c;
    ts[i + 4] = s && (e.top - t[1]) / s;
    ts[i + 8] = c && (e.right - t[0]) / c;
    ts[i + 12] = s && (e.bottom - t[1]) / s;
    ts[i + 16] = s && (e.left - t[0]) / -s;
    ts[i + 20] = c && (e.top - t[1]) / c;
    ts[i + 24] = s && (e.right - t[0]) / -s;
    ts[i + 28] = c && (e.bottom - t[1]) / c;
    ts[i + 32] = c && (e.left - t[0]) / -c;
    ts[i + 36] = s && (e.top - t[1]) / -s;
    ts[i + 40] = c && (e.right - t[0]) / -c;
    ts[i + 44] = s && (e.bottom - t[1]) / -s;
    ts[i + 48] = s && (e.left - t[0]) / s;
    ts[i + 52] = c && (e.top - t[1]) / -c;
    ts[i + 56] = s && (e.right - t[0]) / s;
    ts[i + 60] = c && (e.bottom - t[1]) / -c;
   });
   var findPositiveMin = function (ts, offset, count) {
    var result = 0;
    for (var i = 0; i < count; i++) {
     var t = ts[offset++];
     if (t > 0) {
      result = result ? Math.min(t, result) : t;
     }
    }
    return result;
   };
   var boxScale = 1 + Math.min(Math.abs(c), Math.abs(s));
   divProperties.paddingLeft = findPositiveMin(ts, 32, 16) / boxScale;
   divProperties.paddingTop = findPositiveMin(ts, 48, 16) / boxScale;
   divProperties.paddingRight = findPositiveMin(ts, 0, 16) / boxScale;
   divProperties.paddingBottom = findPositiveMin(ts, 16, 16) / boxScale;
   task._textDivProperties.set(div, divProperties);
  }
 }
 function expandBounds(width, height, boxes) {
  var bounds = boxes.map(function (box, i) {
   return {
    x1: box.left,
    y1: box.top,
    x2: box.right,
    y2: box.bottom,
    index: i,
    x1New: undefined,
    x2New: undefined
   };
  });
  expandBoundsLTR(width, bounds);
  var expanded = new Array(boxes.length);
  bounds.forEach(function (b) {
   var i = b.index;
   expanded[i] = {
    left: b.x1New,
    top: 0,
    right: b.x2New,
    bottom: 0
   };
  });
  boxes.map(function (box, i) {
   var e = expanded[i], b = bounds[i];
   b.x1 = box.top;
   b.y1 = width - e.right;
   b.x2 = box.bottom;
   b.y2 = width - e.left;
   b.index = i;
   b.x1New = undefined;
   b.x2New = undefined;
  });
  expandBoundsLTR(height, bounds);
  bounds.forEach(function (b) {
   var i = b.index;
   expanded[i].top = b.x1New;
   expanded[i].bottom = b.x2New;
  });
  return expanded;
 }
 function expandBoundsLTR(width, bounds) {
  bounds.sort(function (a, b) {
   return a.x1 - b.x1 || a.index - b.index;
  });
  var fakeBoundary = {
   x1: -Infinity,
   y1: -Infinity,
   x2: 0,
   y2: Infinity,
   index: -1,
   x1New: 0,
   x2New: 0
  };
  var horizon = [{
    start: -Infinity,
    end: Infinity,
    boundary: fakeBoundary
   }];
  bounds.forEach(function (boundary) {
   var i = 0;
   while (i < horizon.length && horizon[i].end <= boundary.y1) {
    i++;
   }
   var j = horizon.length - 1;
   while (j >= 0 && horizon[j].start >= boundary.y2) {
    j--;
   }
   var horizonPart, affectedBoundary;
   var q, k, maxXNew = -Infinity;
   for (q = i; q <= j; q++) {
    horizonPart = horizon[q];
    affectedBoundary = horizonPart.boundary;
    var xNew;
    if (affectedBoundary.x2 > boundary.x1) {
     xNew = affectedBoundary.index > boundary.index ? affectedBoundary.x1New : boundary.x1;
    } else if (affectedBoundary.x2New === undefined) {
     xNew = (affectedBoundary.x2 + boundary.x1) / 2;
    } else {
     xNew = affectedBoundary.x2New;
    }
    if (xNew > maxXNew) {
     maxXNew = xNew;
    }
   }
   boundary.x1New = maxXNew;
   for (q = i; q <= j; q++) {
    horizonPart = horizon[q];
    affectedBoundary = horizonPart.boundary;
    if (affectedBoundary.x2New === undefined) {
     if (affectedBoundary.x2 > boundary.x1) {
      if (affectedBoundary.index > boundary.index) {
       affectedBoundary.x2New = affectedBoundary.x2;
      }
     } else {
      affectedBoundary.x2New = maxXNew;
     }
    } else if (affectedBoundary.x2New > maxXNew) {
     affectedBoundary.x2New = Math.max(maxXNew, affectedBoundary.x2);
    }
   }
   var changedHorizon = [], lastBoundary = null;
   for (q = i; q <= j; q++) {
    horizonPart = horizon[q];
    affectedBoundary = horizonPart.boundary;
    var useBoundary = affectedBoundary.x2 > boundary.x2 ? affectedBoundary : boundary;
    if (lastBoundary === useBoundary) {
     changedHorizon[changedHorizon.length - 1].end = horizonPart.end;
    } else {
     changedHorizon.push({
      start: horizonPart.start,
      end: horizonPart.end,
      boundary: useBoundary
     });
     lastBoundary = useBoundary;
    }
   }
   if (horizon[i].start < boundary.y1) {
    changedHorizon[0].start = boundary.y1;
    changedHorizon.unshift({
     start: horizon[i].start,
     end: boundary.y1,
     boundary: horizon[i].boundary
    });
   }
   if (boundary.y2 < horizon[j].end) {
    changedHorizon[changedHorizon.length - 1].end = boundary.y2;
    changedHorizon.push({
     start: boundary.y2,
     end: horizon[j].end,
     boundary: horizon[j].boundary
    });
   }
   for (q = i; q <= j; q++) {
    horizonPart = horizon[q];
    affectedBoundary = horizonPart.boundary;
    if (affectedBoundary.x2New !== undefined) {
     continue;
    }
    var used = false;
    for (k = i - 1; !used && k >= 0 && horizon[k].start >= affectedBoundary.y1; k--) {
     used = horizon[k].boundary === affectedBoundary;
    }
    for (k = j + 1; !used && k < horizon.length && horizon[k].end <= affectedBoundary.y2; k++) {
     used = horizon[k].boundary === affectedBoundary;
    }
    for (k = 0; !used && k < changedHorizon.length; k++) {
     used = changedHorizon[k].boundary === affectedBoundary;
    }
    if (!used) {
     affectedBoundary.x2New = maxXNew;
    }
   }
   Array.prototype.splice.apply(horizon, [
    i,
    j - i + 1
   ].concat(changedHorizon));
  });
  horizon.forEach(function (horizonPart) {
   var affectedBoundary = horizonPart.boundary;
   if (affectedBoundary.x2New === undefined) {
    affectedBoundary.x2New = Math.max(width, affectedBoundary.x2);
   }
  });
 }
 function TextLayerRenderTask(textContent, container, viewport, textDivs, enhanceTextSelection) {
  this._textContent = textContent;
  this._container = container;
  this._viewport = viewport;
  this._textDivs = textDivs || [];
  this._textDivProperties = new WeakMap();
  this._renderingDone = false;
  this._canceled = false;
  this._capability = createPromiseCapability();
  this._renderTimer = null;
  this._bounds = [];
  this._enhanceTextSelection = !!enhanceTextSelection;
 }
 TextLayerRenderTask.prototype = {
  get promise() {
   return this._capability.promise;
  },
  cancel: function TextLayer_cancel() {
   this._canceled = true;
   if (this._renderTimer !== null) {
    clearTimeout(this._renderTimer);
    this._renderTimer = null;
   }
   this._capability.reject('canceled');
  },
  _render: function TextLayer_render(timeout) {
   var textItems = this._textContent.items;
   var textStyles = this._textContent.styles;
   for (var i = 0, len = textItems.length; i < len; i++) {
    appendText(this, textItems[i], textStyles);
   }
   if (!timeout) {
    render(this);
   } else {
    var self = this;
    this._renderTimer = setTimeout(function () {
     render(self);
     self._renderTimer = null;
    }, timeout);
   }
  },
  expandTextDivs: function TextLayer_expandTextDivs(expandDivs) {
   if (!this._enhanceTextSelection || !this._renderingDone) {
    return;
   }
   if (this._bounds !== null) {
    expand(this);
    this._bounds = null;
   }
   for (var i = 0, ii = this._textDivs.length; i < ii; i++) {
    var div = this._textDivs[i];
    var divProperties = this._textDivProperties.get(div);
    if (divProperties.isWhitespace) {
     continue;
    }
    if (expandDivs) {
     var transform = '', padding = '';
     if (divProperties.scale !== 1) {
      transform = 'scaleX(' + divProperties.scale + ')';
     }
     if (divProperties.angle !== 0) {
      transform = 'rotate(' + divProperties.angle + 'deg) ' + transform;
     }
     if (divProperties.paddingLeft !== 0) {
      padding += ' padding-left: ' + divProperties.paddingLeft / divProperties.scale + 'px;';
      transform += ' translateX(' + -divProperties.paddingLeft / divProperties.scale + 'px)';
     }
     if (divProperties.paddingTop !== 0) {
      padding += ' padding-top: ' + divProperties.paddingTop + 'px;';
      transform += ' translateY(' + -divProperties.paddingTop + 'px)';
     }
     if (divProperties.paddingRight !== 0) {
      padding += ' padding-right: ' + divProperties.paddingRight / divProperties.scale + 'px;';
     }
     if (divProperties.paddingBottom !== 0) {
      padding += ' padding-bottom: ' + divProperties.paddingBottom + 'px;';
     }
     if (padding !== '') {
      div.setAttribute('style', divProperties.style + padding);
     }
     if (transform !== '') {
      CustomStyle.setProp('transform', div, transform);
     }
    } else {
     div.style.padding = 0;
     CustomStyle.setProp('transform', div, divProperties.originalTransform || '');
    }
   }
  }
 };
 function renderTextLayer(renderParameters) {
  var task = new TextLayerRenderTask(renderParameters.textContent, renderParameters.container, renderParameters.viewport, renderParameters.textDivs, renderParameters.enhanceTextSelection);
  task._render(renderParameters.timeout);
  return task;
 }
 return renderTextLayer;
}();
exports.renderTextLayer = renderTextLayer;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;
g = function () {
 return this;
}();
try {
 g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
 if (typeof window === "object")
  g = window;
}
module.exports = g;

/***/ }),
/* 7 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var error = sharedUtil.error;
function fixMetadata(meta) {
 return meta.replace(/>\\376\\377([^<]+)/g, function (all, codes) {
  var bytes = codes.replace(/\\([0-3])([0-7])([0-7])/g, function (code, d1, d2, d3) {
   return String.fromCharCode(d1 * 64 + d2 * 8 + d3 * 1);
  });
  var chars = '';
  for (var i = 0; i < bytes.length; i += 2) {
   var code = bytes.charCodeAt(i) * 256 + bytes.charCodeAt(i + 1);
   chars += code >= 32 && code < 127 && code !== 60 && code !== 62 && code !== 38 ? String.fromCharCode(code) : '&#x' + (0x10000 + code).toString(16).substring(1) + ';';
  }
  return '>' + chars;
 });
}
function Metadata(meta) {
 if (typeof meta === 'string') {
  meta = fixMetadata(meta);
  var parser = new DOMParser();
  meta = parser.parseFromString(meta, 'application/xml');
 } else if (!(meta instanceof Document)) {
  error('Metadata: Invalid metadata object');
 }
 this.metaDocument = meta;
 this.metadata = Object.create(null);
 this.parse();
}
Metadata.prototype = {
 parse: function Metadata_parse() {
  var doc = this.metaDocument;
  var rdf = doc.documentElement;
  if (rdf.nodeName.toLowerCase() !== 'rdf:rdf') {
   rdf = rdf.firstChild;
   while (rdf && rdf.nodeName.toLowerCase() !== 'rdf:rdf') {
    rdf = rdf.nextSibling;
   }
  }
  var nodeName = rdf ? rdf.nodeName.toLowerCase() : null;
  if (!rdf || nodeName !== 'rdf:rdf' || !rdf.hasChildNodes()) {
   return;
  }
  var children = rdf.childNodes, desc, entry, name, i, ii, length, iLength;
  for (i = 0, length = children.length; i < length; i++) {
   desc = children[i];
   if (desc.nodeName.toLowerCase() !== 'rdf:description') {
    continue;
   }
   for (ii = 0, iLength = desc.childNodes.length; ii < iLength; ii++) {
    if (desc.childNodes[ii].nodeName.toLowerCase() !== '#text') {
     entry = desc.childNodes[ii];
     name = entry.nodeName.toLowerCase();
     this.metadata[name] = entry.textContent.trim();
    }
   }
  }
 },
 get: function Metadata_get(name) {
  return this.metadata[name] || null;
 },
 has: function Metadata_has(name) {
  return typeof this.metadata[name] !== 'undefined';
 }
};
exports.Metadata = Metadata;

/***/ }),
/* 8 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var displayDOMUtils = __w_pdfjs_require__(1);
var shadow = sharedUtil.shadow;
var getDefaultSetting = displayDOMUtils.getDefaultSetting;
var WebGLUtils = function WebGLUtilsClosure() {
 function loadShader(gl, code, shaderType) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, code);
  gl.compileShader(shader);
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
   var errorMsg = gl.getShaderInfoLog(shader);
   throw new Error('Error during shader compilation: ' + errorMsg);
  }
  return shader;
 }
 function createVertexShader(gl, code) {
  return loadShader(gl, code, gl.VERTEX_SHADER);
 }
 function createFragmentShader(gl, code) {
  return loadShader(gl, code, gl.FRAGMENT_SHADER);
 }
 function createProgram(gl, shaders) {
  var program = gl.createProgram();
  for (var i = 0, ii = shaders.length; i < ii; ++i) {
   gl.attachShader(program, shaders[i]);
  }
  gl.linkProgram(program);
  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
   var errorMsg = gl.getProgramInfoLog(program);
   throw new Error('Error during program linking: ' + errorMsg);
  }
  return program;
 }
 function createTexture(gl, image, textureId) {
  gl.activeTexture(textureId);
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  return texture;
 }
 var currentGL, currentCanvas;
 function generateGL() {
  if (currentGL) {
   return;
  }
  currentCanvas = document.createElement('canvas');
  currentGL = currentCanvas.getContext('webgl', { premultipliedalpha: false });
 }
 var smaskVertexShaderCode = '\
  attribute vec2 a_position;                                    \
  attribute vec2 a_texCoord;                                    \
                                                                \
  uniform vec2 u_resolution;                                    \
                                                                \
  varying vec2 v_texCoord;                                      \
                                                                \
  void main() {                                                 \
    vec2 clipSpace = (a_position / u_resolution) * 2.0 - 1.0;   \
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);          \
                                                                \
    v_texCoord = a_texCoord;                                    \
  }                                                             ';
 var smaskFragmentShaderCode = '\
  precision mediump float;                                      \
                                                                \
  uniform vec4 u_backdrop;                                      \
  uniform int u_subtype;                                        \
  uniform sampler2D u_image;                                    \
  uniform sampler2D u_mask;                                     \
                                                                \
  varying vec2 v_texCoord;                                      \
                                                                \
  void main() {                                                 \
    vec4 imageColor = texture2D(u_image, v_texCoord);           \
    vec4 maskColor = texture2D(u_mask, v_texCoord);             \
    if (u_backdrop.a > 0.0) {                                   \
      maskColor.rgb = maskColor.rgb * maskColor.a +             \
                      u_backdrop.rgb * (1.0 - maskColor.a);     \
    }                                                           \
    float lum;                                                  \
    if (u_subtype == 0) {                                       \
      lum = maskColor.a;                                        \
    } else {                                                    \
      lum = maskColor.r * 0.3 + maskColor.g * 0.59 +            \
            maskColor.b * 0.11;                                 \
    }                                                           \
    imageColor.a *= lum;                                        \
    imageColor.rgb *= imageColor.a;                             \
    gl_FragColor = imageColor;                                  \
  }                                                             ';
 var smaskCache = null;
 function initSmaskGL() {
  var canvas, gl;
  generateGL();
  canvas = currentCanvas;
  currentCanvas = null;
  gl = currentGL;
  currentGL = null;
  var vertexShader = createVertexShader(gl, smaskVertexShaderCode);
  var fragmentShader = createFragmentShader(gl, smaskFragmentShaderCode);
  var program = createProgram(gl, [
   vertexShader,
   fragmentShader
  ]);
  gl.useProgram(program);
  var cache = {};
  cache.gl = gl;
  cache.canvas = canvas;
  cache.resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  cache.positionLocation = gl.getAttribLocation(program, 'a_position');
  cache.backdropLocation = gl.getUniformLocation(program, 'u_backdrop');
  cache.subtypeLocation = gl.getUniformLocation(program, 'u_subtype');
  var texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
  var texLayerLocation = gl.getUniformLocation(program, 'u_image');
  var texMaskLocation = gl.getUniformLocation(program, 'u_mask');
  var texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
   0.0,
   0.0,
   1.0,
   0.0,
   0.0,
   1.0,
   0.0,
   1.0,
   1.0,
   0.0,
   1.0,
   1.0
  ]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
  gl.uniform1i(texLayerLocation, 0);
  gl.uniform1i(texMaskLocation, 1);
  smaskCache = cache;
 }
 function composeSMask(layer, mask, properties) {
  var width = layer.width, height = layer.height;
  if (!smaskCache) {
   initSmaskGL();
  }
  var cache = smaskCache, canvas = cache.canvas, gl = cache.gl;
  canvas.width = width;
  canvas.height = height;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.uniform2f(cache.resolutionLocation, width, height);
  if (properties.backdrop) {
   gl.uniform4f(cache.resolutionLocation, properties.backdrop[0], properties.backdrop[1], properties.backdrop[2], 1);
  } else {
   gl.uniform4f(cache.resolutionLocation, 0, 0, 0, 0);
  }
  gl.uniform1i(cache.subtypeLocation, properties.subtype === 'Luminosity' ? 1 : 0);
  var texture = createTexture(gl, layer, gl.TEXTURE0);
  var maskTexture = createTexture(gl, mask, gl.TEXTURE1);
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
   0,
   0,
   width,
   0,
   0,
   height,
   0,
   height,
   width,
   0,
   width,
   height
  ]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(cache.positionLocation);
  gl.vertexAttribPointer(cache.positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.flush();
  gl.deleteTexture(texture);
  gl.deleteTexture(maskTexture);
  gl.deleteBuffer(buffer);
  return canvas;
 }
 var figuresVertexShaderCode = '\
  attribute vec2 a_position;                                    \
  attribute vec3 a_color;                                       \
                                                                \
  uniform vec2 u_resolution;                                    \
  uniform vec2 u_scale;                                         \
  uniform vec2 u_offset;                                        \
                                                                \
  varying vec4 v_color;                                         \
                                                                \
  void main() {                                                 \
    vec2 position = (a_position + u_offset) * u_scale;          \
    vec2 clipSpace = (position / u_resolution) * 2.0 - 1.0;     \
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);          \
                                                                \
    v_color = vec4(a_color / 255.0, 1.0);                       \
  }                                                             ';
 var figuresFragmentShaderCode = '\
  precision mediump float;                                      \
                                                                \
  varying vec4 v_color;                                         \
                                                                \
  void main() {                                                 \
    gl_FragColor = v_color;                                     \
  }                                                             ';
 var figuresCache = null;
 function initFiguresGL() {
  var canvas, gl;
  generateGL();
  canvas = currentCanvas;
  currentCanvas = null;
  gl = currentGL;
  currentGL = null;
  var vertexShader = createVertexShader(gl, figuresVertexShaderCode);
  var fragmentShader = createFragmentShader(gl, figuresFragmentShaderCode);
  var program = createProgram(gl, [
   vertexShader,
   fragmentShader
  ]);
  gl.useProgram(program);
  var cache = {};
  cache.gl = gl;
  cache.canvas = canvas;
  cache.resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  cache.scaleLocation = gl.getUniformLocation(program, 'u_scale');
  cache.offsetLocation = gl.getUniformLocation(program, 'u_offset');
  cache.positionLocation = gl.getAttribLocation(program, 'a_position');
  cache.colorLocation = gl.getAttribLocation(program, 'a_color');
  figuresCache = cache;
 }
 function drawFigures(width, height, backgroundColor, figures, context) {
  if (!figuresCache) {
   initFiguresGL();
  }
  var cache = figuresCache, canvas = cache.canvas, gl = cache.gl;
  canvas.width = width;
  canvas.height = height;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.uniform2f(cache.resolutionLocation, width, height);
  var count = 0;
  var i, ii, rows;
  for (i = 0, ii = figures.length; i < ii; i++) {
   switch (figures[i].type) {
   case 'lattice':
    rows = figures[i].coords.length / figures[i].verticesPerRow | 0;
    count += (rows - 1) * (figures[i].verticesPerRow - 1) * 6;
    break;
   case 'triangles':
    count += figures[i].coords.length;
    break;
   }
  }
  var coords = new Float32Array(count * 2);
  var colors = new Uint8Array(count * 3);
  var coordsMap = context.coords, colorsMap = context.colors;
  var pIndex = 0, cIndex = 0;
  for (i = 0, ii = figures.length; i < ii; i++) {
   var figure = figures[i], ps = figure.coords, cs = figure.colors;
   switch (figure.type) {
   case 'lattice':
    var cols = figure.verticesPerRow;
    rows = ps.length / cols | 0;
    for (var row = 1; row < rows; row++) {
     var offset = row * cols + 1;
     for (var col = 1; col < cols; col++, offset++) {
      coords[pIndex] = coordsMap[ps[offset - cols - 1]];
      coords[pIndex + 1] = coordsMap[ps[offset - cols - 1] + 1];
      coords[pIndex + 2] = coordsMap[ps[offset - cols]];
      coords[pIndex + 3] = coordsMap[ps[offset - cols] + 1];
      coords[pIndex + 4] = coordsMap[ps[offset - 1]];
      coords[pIndex + 5] = coordsMap[ps[offset - 1] + 1];
      colors[cIndex] = colorsMap[cs[offset - cols - 1]];
      colors[cIndex + 1] = colorsMap[cs[offset - cols - 1] + 1];
      colors[cIndex + 2] = colorsMap[cs[offset - cols - 1] + 2];
      colors[cIndex + 3] = colorsMap[cs[offset - cols]];
      colors[cIndex + 4] = colorsMap[cs[offset - cols] + 1];
      colors[cIndex + 5] = colorsMap[cs[offset - cols] + 2];
      colors[cIndex + 6] = colorsMap[cs[offset - 1]];
      colors[cIndex + 7] = colorsMap[cs[offset - 1] + 1];
      colors[cIndex + 8] = colorsMap[cs[offset - 1] + 2];
      coords[pIndex + 6] = coords[pIndex + 2];
      coords[pIndex + 7] = coords[pIndex + 3];
      coords[pIndex + 8] = coords[pIndex + 4];
      coords[pIndex + 9] = coords[pIndex + 5];
      coords[pIndex + 10] = coordsMap[ps[offset]];
      coords[pIndex + 11] = coordsMap[ps[offset] + 1];
      colors[cIndex + 9] = colors[cIndex + 3];
      colors[cIndex + 10] = colors[cIndex + 4];
      colors[cIndex + 11] = colors[cIndex + 5];
      colors[cIndex + 12] = colors[cIndex + 6];
      colors[cIndex + 13] = colors[cIndex + 7];
      colors[cIndex + 14] = colors[cIndex + 8];
      colors[cIndex + 15] = colorsMap[cs[offset]];
      colors[cIndex + 16] = colorsMap[cs[offset] + 1];
      colors[cIndex + 17] = colorsMap[cs[offset] + 2];
      pIndex += 12;
      cIndex += 18;
     }
    }
    break;
   case 'triangles':
    for (var j = 0, jj = ps.length; j < jj; j++) {
     coords[pIndex] = coordsMap[ps[j]];
     coords[pIndex + 1] = coordsMap[ps[j] + 1];
     colors[cIndex] = colorsMap[cs[j]];
     colors[cIndex + 1] = colorsMap[cs[j] + 1];
     colors[cIndex + 2] = colorsMap[cs[j] + 2];
     pIndex += 2;
     cIndex += 3;
    }
    break;
   }
  }
  if (backgroundColor) {
   gl.clearColor(backgroundColor[0] / 255, backgroundColor[1] / 255, backgroundColor[2] / 255, 1.0);
  } else {
   gl.clearColor(0, 0, 0, 0);
  }
  gl.clear(gl.COLOR_BUFFER_BIT);
  var coordsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, coordsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, coords, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(cache.positionLocation);
  gl.vertexAttribPointer(cache.positionLocation, 2, gl.FLOAT, false, 0, 0);
  var colorsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(cache.colorLocation);
  gl.vertexAttribPointer(cache.colorLocation, 3, gl.UNSIGNED_BYTE, false, 0, 0);
  gl.uniform2f(cache.scaleLocation, context.scaleX, context.scaleY);
  gl.uniform2f(cache.offsetLocation, context.offsetX, context.offsetY);
  gl.drawArrays(gl.TRIANGLES, 0, count);
  gl.flush();
  gl.deleteBuffer(coordsBuffer);
  gl.deleteBuffer(colorsBuffer);
  return canvas;
 }
 function cleanup() {
  if (smaskCache && smaskCache.canvas) {
   smaskCache.canvas.width = 0;
   smaskCache.canvas.height = 0;
  }
  if (figuresCache && figuresCache.canvas) {
   figuresCache.canvas.width = 0;
   figuresCache.canvas.height = 0;
  }
  smaskCache = null;
  figuresCache = null;
 }
 return {
  get isEnabled() {
   if (getDefaultSetting('disableWebGL')) {
    return false;
   }
   var enabled = false;
   try {
    generateGL();
    enabled = !!currentGL;
   } catch (e) {
   }
   return shadow(this, 'isEnabled', enabled);
  },
  composeSMask: composeSMask,
  drawFigures: drawFigures,
  clear: cleanup
 };
}();
exports.WebGLUtils = WebGLUtils;

/***/ }),
/* 9 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var displayDOMUtils = __w_pdfjs_require__(1);
var displayAPI = __w_pdfjs_require__(3);
var displayAnnotationLayer = __w_pdfjs_require__(2);
var displayTextLayer = __w_pdfjs_require__(5);
var displayMetadata = __w_pdfjs_require__(7);
var displaySVG = __w_pdfjs_require__(4);
var globalScope = sharedUtil.globalScope;
var deprecated = sharedUtil.deprecated;
var warn = sharedUtil.warn;
var LinkTarget = displayDOMUtils.LinkTarget;
var DEFAULT_LINK_REL = displayDOMUtils.DEFAULT_LINK_REL;
var isWorker = typeof window === 'undefined';
if (!globalScope.PDFJS) {
 globalScope.PDFJS = {};
}
var PDFJS = globalScope.PDFJS;
PDFJS.version = '1.7.354';
PDFJS.build = '0f7548ba';
PDFJS.pdfBug = false;
if (PDFJS.verbosity !== undefined) {
 sharedUtil.setVerbosityLevel(PDFJS.verbosity);
}
delete PDFJS.verbosity;
Object.defineProperty(PDFJS, 'verbosity', {
 get: function () {
  return sharedUtil.getVerbosityLevel();
 },
 set: function (level) {
  sharedUtil.setVerbosityLevel(level);
 },
 enumerable: true,
 configurable: true
});
PDFJS.VERBOSITY_LEVELS = sharedUtil.VERBOSITY_LEVELS;
PDFJS.OPS = sharedUtil.OPS;
PDFJS.UNSUPPORTED_FEATURES = sharedUtil.UNSUPPORTED_FEATURES;
PDFJS.isValidUrl = displayDOMUtils.isValidUrl;
PDFJS.shadow = sharedUtil.shadow;
PDFJS.createBlob = sharedUtil.createBlob;
PDFJS.createObjectURL = function PDFJS_createObjectURL(data, contentType) {
 return sharedUtil.createObjectURL(data, contentType, PDFJS.disableCreateObjectURL);
};
Object.defineProperty(PDFJS, 'isLittleEndian', {
 configurable: true,
 get: function PDFJS_isLittleEndian() {
  var value = sharedUtil.isLittleEndian();
  return sharedUtil.shadow(PDFJS, 'isLittleEndian', value);
 }
});
PDFJS.removeNullCharacters = sharedUtil.removeNullCharacters;
PDFJS.PasswordResponses = sharedUtil.PasswordResponses;
PDFJS.PasswordException = sharedUtil.PasswordException;
PDFJS.UnknownErrorException = sharedUtil.UnknownErrorException;
PDFJS.InvalidPDFException = sharedUtil.InvalidPDFException;
PDFJS.MissingPDFException = sharedUtil.MissingPDFException;
PDFJS.UnexpectedResponseException = sharedUtil.UnexpectedResponseException;
PDFJS.Util = sharedUtil.Util;
PDFJS.PageViewport = sharedUtil.PageViewport;
PDFJS.createPromiseCapability = sharedUtil.createPromiseCapability;
PDFJS.maxImageSize = PDFJS.maxImageSize === undefined ? -1 : PDFJS.maxImageSize;
PDFJS.cMapUrl = PDFJS.cMapUrl === undefined ? null : PDFJS.cMapUrl;
PDFJS.cMapPacked = PDFJS.cMapPacked === undefined ? false : PDFJS.cMapPacked;
PDFJS.disableFontFace = PDFJS.disableFontFace === undefined ? false : PDFJS.disableFontFace;
PDFJS.imageResourcesPath = PDFJS.imageResourcesPath === undefined ? '' : PDFJS.imageResourcesPath;
PDFJS.disableWorker = PDFJS.disableWorker === undefined ? false : PDFJS.disableWorker;
PDFJS.workerSrc = PDFJS.workerSrc === undefined ? null : PDFJS.workerSrc;
PDFJS.workerPort = PDFJS.workerPort === undefined ? null : PDFJS.workerPort;
PDFJS.disableRange = PDFJS.disableRange === undefined ? false : PDFJS.disableRange;
PDFJS.disableStream = PDFJS.disableStream === undefined ? false : PDFJS.disableStream;
PDFJS.disableAutoFetch = PDFJS.disableAutoFetch === undefined ? false : PDFJS.disableAutoFetch;
PDFJS.pdfBug = PDFJS.pdfBug === undefined ? false : PDFJS.pdfBug;
PDFJS.postMessageTransfers = PDFJS.postMessageTransfers === undefined ? true : PDFJS.postMessageTransfers;
PDFJS.disableCreateObjectURL = PDFJS.disableCreateObjectURL === undefined ? false : PDFJS.disableCreateObjectURL;
PDFJS.disableWebGL = PDFJS.disableWebGL === undefined ? true : PDFJS.disableWebGL;
PDFJS.externalLinkTarget = PDFJS.externalLinkTarget === undefined ? LinkTarget.NONE : PDFJS.externalLinkTarget;
PDFJS.externalLinkRel = PDFJS.externalLinkRel === undefined ? DEFAULT_LINK_REL : PDFJS.externalLinkRel;
PDFJS.isEvalSupported = PDFJS.isEvalSupported === undefined ? true : PDFJS.isEvalSupported;
var savedOpenExternalLinksInNewWindow = PDFJS.openExternalLinksInNewWindow;
delete PDFJS.openExternalLinksInNewWindow;
Object.defineProperty(PDFJS, 'openExternalLinksInNewWindow', {
 get: function () {
  return PDFJS.externalLinkTarget === LinkTarget.BLANK;
 },
 set: function (value) {
  if (value) {
   deprecated('PDFJS.openExternalLinksInNewWindow, please use ' + '"PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK" instead.');
  }
  if (PDFJS.externalLinkTarget !== LinkTarget.NONE) {
   warn('PDFJS.externalLinkTarget is already initialized');
   return;
  }
  PDFJS.externalLinkTarget = value ? LinkTarget.BLANK : LinkTarget.NONE;
 },
 enumerable: true,
 configurable: true
});
if (savedOpenExternalLinksInNewWindow) {
 PDFJS.openExternalLinksInNewWindow = savedOpenExternalLinksInNewWindow;
}
PDFJS.getDocument = displayAPI.getDocument;
PDFJS.PDFDataRangeTransport = displayAPI.PDFDataRangeTransport;
PDFJS.PDFWorker = displayAPI.PDFWorker;
Object.defineProperty(PDFJS, 'hasCanvasTypedArrays', {
 configurable: true,
 get: function PDFJS_hasCanvasTypedArrays() {
  var value = displayDOMUtils.hasCanvasTypedArrays();
  return sharedUtil.shadow(PDFJS, 'hasCanvasTypedArrays', value);
 }
});
PDFJS.CustomStyle = displayDOMUtils.CustomStyle;
PDFJS.LinkTarget = LinkTarget;
PDFJS.addLinkAttributes = displayDOMUtils.addLinkAttributes;
PDFJS.getFilenameFromUrl = displayDOMUtils.getFilenameFromUrl;
PDFJS.isExternalLinkTargetSet = displayDOMUtils.isExternalLinkTargetSet;
PDFJS.AnnotationLayer = displayAnnotationLayer.AnnotationLayer;
PDFJS.renderTextLayer = displayTextLayer.renderTextLayer;
PDFJS.Metadata = displayMetadata.Metadata;
PDFJS.SVGGraphics = displaySVG.SVGGraphics;
PDFJS.UnsupportedManager = displayAPI._UnsupportedManager;
exports.globalScope = globalScope;
exports.isWorker = isWorker;
exports.PDFJS = globalScope.PDFJS;

/***/ }),
/* 10 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var displayDOMUtils = __w_pdfjs_require__(1);
var displayPatternHelper = __w_pdfjs_require__(12);
var displayWebGL = __w_pdfjs_require__(8);
var FONT_IDENTITY_MATRIX = sharedUtil.FONT_IDENTITY_MATRIX;
var IDENTITY_MATRIX = sharedUtil.IDENTITY_MATRIX;
var ImageKind = sharedUtil.ImageKind;
var OPS = sharedUtil.OPS;
var TextRenderingMode = sharedUtil.TextRenderingMode;
var Uint32ArrayView = sharedUtil.Uint32ArrayView;
var Util = sharedUtil.Util;
var assert = sharedUtil.assert;
var info = sharedUtil.info;
var isNum = sharedUtil.isNum;
var isArray = sharedUtil.isArray;
var isLittleEndian = sharedUtil.isLittleEndian;
var error = sharedUtil.error;
var shadow = sharedUtil.shadow;
var warn = sharedUtil.warn;
var TilingPattern = displayPatternHelper.TilingPattern;
var getShadingPatternFromIR = displayPatternHelper.getShadingPatternFromIR;
var WebGLUtils = displayWebGL.WebGLUtils;
var hasCanvasTypedArrays = displayDOMUtils.hasCanvasTypedArrays;
var MIN_FONT_SIZE = 16;
var MAX_FONT_SIZE = 100;
var MAX_GROUP_SIZE = 4096;
var MIN_WIDTH_FACTOR = 0.65;
var COMPILE_TYPE3_GLYPHS = true;
var MAX_SIZE_TO_COMPILE = 1000;
var FULL_CHUNK_HEIGHT = 16;
var HasCanvasTypedArraysCached = {
 get value() {
  return shadow(HasCanvasTypedArraysCached, 'value', hasCanvasTypedArrays());
 }
};
var IsLittleEndianCached = {
 get value() {
  return shadow(IsLittleEndianCached, 'value', isLittleEndian());
 }
};
function addContextCurrentTransform(ctx) {
 if (!ctx.mozCurrentTransform) {
  ctx._originalSave = ctx.save;
  ctx._originalRestore = ctx.restore;
  ctx._originalRotate = ctx.rotate;
  ctx._originalScale = ctx.scale;
  ctx._originalTranslate = ctx.translate;
  ctx._originalTransform = ctx.transform;
  ctx._originalSetTransform = ctx.setTransform;
  ctx._transformMatrix = ctx._transformMatrix || [
   1,
   0,
   0,
   1,
   0,
   0
  ];
  ctx._transformStack = [];
  Object.defineProperty(ctx, 'mozCurrentTransform', {
   get: function getCurrentTransform() {
    return this._transformMatrix;
   }
  });
  Object.defineProperty(ctx, 'mozCurrentTransformInverse', {
   get: function getCurrentTransformInverse() {
    var m = this._transformMatrix;
    var a = m[0], b = m[1], c = m[2], d = m[3], e = m[4], f = m[5];
    var ad_bc = a * d - b * c;
    var bc_ad = b * c - a * d;
    return [
     d / ad_bc,
     b / bc_ad,
     c / bc_ad,
     a / ad_bc,
     (d * e - c * f) / bc_ad,
     (b * e - a * f) / ad_bc
    ];
   }
  });
  ctx.save = function ctxSave() {
   var old = this._transformMatrix;
   this._transformStack.push(old);
   this._transformMatrix = old.slice(0, 6);
   this._originalSave();
  };
  ctx.restore = function ctxRestore() {
   var prev = this._transformStack.pop();
   if (prev) {
    this._transformMatrix = prev;
    this._originalRestore();
   }
  };
  ctx.translate = function ctxTranslate(x, y) {
   var m = this._transformMatrix;
   m[4] = m[0] * x + m[2] * y + m[4];
   m[5] = m[1] * x + m[3] * y + m[5];
   this._originalTranslate(x, y);
  };
  ctx.scale = function ctxScale(x, y) {
   var m = this._transformMatrix;
   m[0] = m[0] * x;
   m[1] = m[1] * x;
   m[2] = m[2] * y;
   m[3] = m[3] * y;
   this._originalScale(x, y);
  };
  ctx.transform = function ctxTransform(a, b, c, d, e, f) {
   var m = this._transformMatrix;
   this._transformMatrix = [
    m[0] * a + m[2] * b,
    m[1] * a + m[3] * b,
    m[0] * c + m[2] * d,
    m[1] * c + m[3] * d,
    m[0] * e + m[2] * f + m[4],
    m[1] * e + m[3] * f + m[5]
   ];
   ctx._originalTransform(a, b, c, d, e, f);
  };
  ctx.setTransform = function ctxSetTransform(a, b, c, d, e, f) {
   this._transformMatrix = [
    a,
    b,
    c,
    d,
    e,
    f
   ];
   ctx._originalSetTransform(a, b, c, d, e, f);
  };
  ctx.rotate = function ctxRotate(angle) {
   var cosValue = Math.cos(angle);
   var sinValue = Math.sin(angle);
   var m = this._transformMatrix;
   this._transformMatrix = [
    m[0] * cosValue + m[2] * sinValue,
    m[1] * cosValue + m[3] * sinValue,
    m[0] * -sinValue + m[2] * cosValue,
    m[1] * -sinValue + m[3] * cosValue,
    m[4],
    m[5]
   ];
   this._originalRotate(angle);
  };
 }
}
var CachedCanvases = function CachedCanvasesClosure() {
 function CachedCanvases(canvasFactory) {
  this.canvasFactory = canvasFactory;
  this.cache = Object.create(null);
 }
 CachedCanvases.prototype = {
  getCanvas: function CachedCanvases_getCanvas(id, width, height, trackTransform) {
   var canvasEntry;
   if (this.cache[id] !== undefined) {
    canvasEntry = this.cache[id];
    this.canvasFactory.reset(canvasEntry, width, height);
    canvasEntry.context.setTransform(1, 0, 0, 1, 0, 0);
   } else {
    canvasEntry = this.canvasFactory.create(width, height);
    this.cache[id] = canvasEntry;
   }
   if (trackTransform) {
    addContextCurrentTransform(canvasEntry.context);
   }
   return canvasEntry;
  },
  clear: function () {
   for (var id in this.cache) {
    var canvasEntry = this.cache[id];
    this.canvasFactory.destroy(canvasEntry);
    delete this.cache[id];
   }
  }
 };
 return CachedCanvases;
}();
function compileType3Glyph(imgData) {
 var POINT_TO_PROCESS_LIMIT = 1000;
 var width = imgData.width, height = imgData.height;
 var i, j, j0, width1 = width + 1;
 var points = new Uint8Array(width1 * (height + 1));
 var POINT_TYPES = new Uint8Array([
  0,
  2,
  4,
  0,
  1,
  0,
  5,
  4,
  8,
  10,
  0,
  8,
  0,
  2,
  1,
  0
 ]);
 var lineSize = width + 7 & ~7, data0 = imgData.data;
 var data = new Uint8Array(lineSize * height), pos = 0, ii;
 for (i = 0, ii = data0.length; i < ii; i++) {
  var mask = 128, elem = data0[i];
  while (mask > 0) {
   data[pos++] = elem & mask ? 0 : 255;
   mask >>= 1;
  }
 }
 var count = 0;
 pos = 0;
 if (data[pos] !== 0) {
  points[0] = 1;
  ++count;
 }
 for (j = 1; j < width; j++) {
  if (data[pos] !== data[pos + 1]) {
   points[j] = data[pos] ? 2 : 1;
   ++count;
  }
  pos++;
 }
 if (data[pos] !== 0) {
  points[j] = 2;
  ++count;
 }
 for (i = 1; i < height; i++) {
  pos = i * lineSize;
  j0 = i * width1;
  if (data[pos - lineSize] !== data[pos]) {
   points[j0] = data[pos] ? 1 : 8;
   ++count;
  }
  var sum = (data[pos] ? 4 : 0) + (data[pos - lineSize] ? 8 : 0);
  for (j = 1; j < width; j++) {
   sum = (sum >> 2) + (data[pos + 1] ? 4 : 0) + (data[pos - lineSize + 1] ? 8 : 0);
   if (POINT_TYPES[sum]) {
    points[j0 + j] = POINT_TYPES[sum];
    ++count;
   }
   pos++;
  }
  if (data[pos - lineSize] !== data[pos]) {
   points[j0 + j] = data[pos] ? 2 : 4;
   ++count;
  }
  if (count > POINT_TO_PROCESS_LIMIT) {
   return null;
  }
 }
 pos = lineSize * (height - 1);
 j0 = i * width1;
 if (data[pos] !== 0) {
  points[j0] = 8;
  ++count;
 }
 for (j = 1; j < width; j++) {
  if (data[pos] !== data[pos + 1]) {
   points[j0 + j] = data[pos] ? 4 : 8;
   ++count;
  }
  pos++;
 }
 if (data[pos] !== 0) {
  points[j0 + j] = 4;
  ++count;
 }
 if (count > POINT_TO_PROCESS_LIMIT) {
  return null;
 }
 var steps = new Int32Array([
  0,
  width1,
  -1,
  0,
  -width1,
  0,
  0,
  0,
  1
 ]);
 var outlines = [];
 for (i = 0; count && i <= height; i++) {
  var p = i * width1;
  var end = p + width;
  while (p < end && !points[p]) {
   p++;
  }
  if (p === end) {
   continue;
  }
  var coords = [
   p % width1,
   i
  ];
  var type = points[p], p0 = p, pp;
  do {
   var step = steps[type];
   do {
    p += step;
   } while (!points[p]);
   pp = points[p];
   if (pp !== 5 && pp !== 10) {
    type = pp;
    points[p] = 0;
   } else {
    type = pp & 0x33 * type >> 4;
    points[p] &= type >> 2 | type << 2;
   }
   coords.push(p % width1);
   coords.push(p / width1 | 0);
   --count;
  } while (p0 !== p);
  outlines.push(coords);
  --i;
 }
 var drawOutline = function (c) {
  c.save();
  c.scale(1 / width, -1 / height);
  c.translate(0, -height);
  c.beginPath();
  for (var i = 0, ii = outlines.length; i < ii; i++) {
   var o = outlines[i];
   c.moveTo(o[0], o[1]);
   for (var j = 2, jj = o.length; j < jj; j += 2) {
    c.lineTo(o[j], o[j + 1]);
   }
  }
  c.fill();
  c.beginPath();
  c.restore();
 };
 return drawOutline;
}
var CanvasExtraState = function CanvasExtraStateClosure() {
 function CanvasExtraState(old) {
  this.alphaIsShape = false;
  this.fontSize = 0;
  this.fontSizeScale = 1;
  this.textMatrix = IDENTITY_MATRIX;
  this.textMatrixScale = 1;
  this.fontMatrix = FONT_IDENTITY_MATRIX;
  this.leading = 0;
  this.x = 0;
  this.y = 0;
  this.lineX = 0;
  this.lineY = 0;
  this.charSpacing = 0;
  this.wordSpacing = 0;
  this.textHScale = 1;
  this.textRenderingMode = TextRenderingMode.FILL;
  this.textRise = 0;
  this.fillColor = '#000000';
  this.strokeColor = '#000000';
  this.patternFill = false;
  this.fillAlpha = 1;
  this.strokeAlpha = 1;
  this.lineWidth = 1;
  this.activeSMask = null;
  this.resumeSMaskCtx = null;
  this.old = old;
 }
 CanvasExtraState.prototype = {
  clone: function CanvasExtraState_clone() {
   return Object.create(this);
  },
  setCurrentPoint: function CanvasExtraState_setCurrentPoint(x, y) {
   this.x = x;
   this.y = y;
  }
 };
 return CanvasExtraState;
}();
var CanvasGraphics = function CanvasGraphicsClosure() {
 var EXECUTION_TIME = 15;
 var EXECUTION_STEPS = 10;
 function CanvasGraphics(canvasCtx, commonObjs, objs, canvasFactory, imageLayer) {
  this.ctx = canvasCtx;
  this.current = new CanvasExtraState();
  this.stateStack = [];
  this.pendingClip = null;
  this.pendingEOFill = false;
  this.res = null;
  this.xobjs = null;
  this.commonObjs = commonObjs;
  this.objs = objs;
  this.canvasFactory = canvasFactory;
  this.imageLayer = imageLayer;
  this.groupStack = [];
  this.processingType3 = null;
  this.baseTransform = null;
  this.baseTransformStack = [];
  this.groupLevel = 0;
  this.smaskStack = [];
  this.smaskCounter = 0;
  this.tempSMask = null;
  this.cachedCanvases = new CachedCanvases(this.canvasFactory);
  if (canvasCtx) {
   addContextCurrentTransform(canvasCtx);
  }
  this.cachedGetSinglePixelWidth = null;
 }
 function putBinaryImageData(ctx, imgData) {
  if (typeof ImageData !== 'undefined' && imgData instanceof ImageData) {
   ctx.putImageData(imgData, 0, 0);
   return;
  }
  var height = imgData.height, width = imgData.width;
  var partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  var fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  var totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  var chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  var srcPos = 0, destPos;
  var src = imgData.data;
  var dest = chunkImgData.data;
  var i, j, thisChunkHeight, elemsInThisChunk;
  if (imgData.kind === ImageKind.GRAYSCALE_1BPP) {
   var srcLength = src.byteLength;
   var dest32 = HasCanvasTypedArraysCached.value ? new Uint32Array(dest.buffer) : new Uint32ArrayView(dest);
   var dest32DataLength = dest32.length;
   var fullSrcDiff = width + 7 >> 3;
   var white = 0xFFFFFFFF;
   var black = IsLittleEndianCached.value || !HasCanvasTypedArraysCached.value ? 0xFF000000 : 0x000000FF;
   for (i = 0; i < totalChunks; i++) {
    thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
    destPos = 0;
    for (j = 0; j < thisChunkHeight; j++) {
     var srcDiff = srcLength - srcPos;
     var k = 0;
     var kEnd = srcDiff > fullSrcDiff ? width : srcDiff * 8 - 7;
     var kEndUnrolled = kEnd & ~7;
     var mask = 0;
     var srcByte = 0;
     for (; k < kEndUnrolled; k += 8) {
      srcByte = src[srcPos++];
      dest32[destPos++] = srcByte & 128 ? white : black;
      dest32[destPos++] = srcByte & 64 ? white : black;
      dest32[destPos++] = srcByte & 32 ? white : black;
      dest32[destPos++] = srcByte & 16 ? white : black;
      dest32[destPos++] = srcByte & 8 ? white : black;
      dest32[destPos++] = srcByte & 4 ? white : black;
      dest32[destPos++] = srcByte & 2 ? white : black;
      dest32[destPos++] = srcByte & 1 ? white : black;
     }
     for (; k < kEnd; k++) {
      if (mask === 0) {
       srcByte = src[srcPos++];
       mask = 128;
      }
      dest32[destPos++] = srcByte & mask ? white : black;
      mask >>= 1;
     }
    }
    while (destPos < dest32DataLength) {
     dest32[destPos++] = 0;
    }
    ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
   }
  } else if (imgData.kind === ImageKind.RGBA_32BPP) {
   j = 0;
   elemsInThisChunk = width * FULL_CHUNK_HEIGHT * 4;
   for (i = 0; i < fullChunks; i++) {
    dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
    srcPos += elemsInThisChunk;
    ctx.putImageData(chunkImgData, 0, j);
    j += FULL_CHUNK_HEIGHT;
   }
   if (i < totalChunks) {
    elemsInThisChunk = width * partialChunkHeight * 4;
    dest.set(src.subarray(srcPos, srcPos + elemsInThisChunk));
    ctx.putImageData(chunkImgData, 0, j);
   }
  } else if (imgData.kind === ImageKind.RGB_24BPP) {
   thisChunkHeight = FULL_CHUNK_HEIGHT;
   elemsInThisChunk = width * thisChunkHeight;
   for (i = 0; i < totalChunks; i++) {
    if (i >= fullChunks) {
     thisChunkHeight = partialChunkHeight;
     elemsInThisChunk = width * thisChunkHeight;
    }
    destPos = 0;
    for (j = elemsInThisChunk; j--;) {
     dest[destPos++] = src[srcPos++];
     dest[destPos++] = src[srcPos++];
     dest[destPos++] = src[srcPos++];
     dest[destPos++] = 255;
    }
    ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
   }
  } else {
   error('bad image kind: ' + imgData.kind);
  }
 }
 function putBinaryImageMask(ctx, imgData) {
  var height = imgData.height, width = imgData.width;
  var partialChunkHeight = height % FULL_CHUNK_HEIGHT;
  var fullChunks = (height - partialChunkHeight) / FULL_CHUNK_HEIGHT;
  var totalChunks = partialChunkHeight === 0 ? fullChunks : fullChunks + 1;
  var chunkImgData = ctx.createImageData(width, FULL_CHUNK_HEIGHT);
  var srcPos = 0;
  var src = imgData.data;
  var dest = chunkImgData.data;
  for (var i = 0; i < totalChunks; i++) {
   var thisChunkHeight = i < fullChunks ? FULL_CHUNK_HEIGHT : partialChunkHeight;
   var destPos = 3;
   for (var j = 0; j < thisChunkHeight; j++) {
    var mask = 0;
    for (var k = 0; k < width; k++) {
     if (!mask) {
      var elem = src[srcPos++];
      mask = 128;
     }
     dest[destPos] = elem & mask ? 0 : 255;
     destPos += 4;
     mask >>= 1;
    }
   }
   ctx.putImageData(chunkImgData, 0, i * FULL_CHUNK_HEIGHT);
  }
 }
 function copyCtxState(sourceCtx, destCtx) {
  var properties = [
   'strokeStyle',
   'fillStyle',
   'fillRule',
   'globalAlpha',
   'lineWidth',
   'lineCap',
   'lineJoin',
   'miterLimit',
   'globalCompositeOperation',
   'font'
  ];
  for (var i = 0, ii = properties.length; i < ii; i++) {
   var property = properties[i];
   if (sourceCtx[property] !== undefined) {
    destCtx[property] = sourceCtx[property];
   }
  }
  if (sourceCtx.setLineDash !== undefined) {
   destCtx.setLineDash(sourceCtx.getLineDash());
   destCtx.lineDashOffset = sourceCtx.lineDashOffset;
  }
 }
 function composeSMaskBackdrop(bytes, r0, g0, b0) {
  var length = bytes.length;
  for (var i = 3; i < length; i += 4) {
   var alpha = bytes[i];
   if (alpha === 0) {
    bytes[i - 3] = r0;
    bytes[i - 2] = g0;
    bytes[i - 1] = b0;
   } else if (alpha < 255) {
    var alpha_ = 255 - alpha;
    bytes[i - 3] = bytes[i - 3] * alpha + r0 * alpha_ >> 8;
    bytes[i - 2] = bytes[i - 2] * alpha + g0 * alpha_ >> 8;
    bytes[i - 1] = bytes[i - 1] * alpha + b0 * alpha_ >> 8;
   }
  }
 }
 function composeSMaskAlpha(maskData, layerData, transferMap) {
  var length = maskData.length;
  var scale = 1 / 255;
  for (var i = 3; i < length; i += 4) {
   var alpha = transferMap ? transferMap[maskData[i]] : maskData[i];
   layerData[i] = layerData[i] * alpha * scale | 0;
  }
 }
 function composeSMaskLuminosity(maskData, layerData, transferMap) {
  var length = maskData.length;
  for (var i = 3; i < length; i += 4) {
   var y = maskData[i - 3] * 77 + maskData[i - 2] * 152 + maskData[i - 1] * 28;
   layerData[i] = transferMap ? layerData[i] * transferMap[y >> 8] >> 8 : layerData[i] * y >> 16;
  }
 }
 function genericComposeSMask(maskCtx, layerCtx, width, height, subtype, backdrop, transferMap) {
  var hasBackdrop = !!backdrop;
  var r0 = hasBackdrop ? backdrop[0] : 0;
  var g0 = hasBackdrop ? backdrop[1] : 0;
  var b0 = hasBackdrop ? backdrop[2] : 0;
  var composeFn;
  if (subtype === 'Luminosity') {
   composeFn = composeSMaskLuminosity;
  } else {
   composeFn = composeSMaskAlpha;
  }
  var PIXELS_TO_PROCESS = 1048576;
  var chunkSize = Math.min(height, Math.ceil(PIXELS_TO_PROCESS / width));
  for (var row = 0; row < height; row += chunkSize) {
   var chunkHeight = Math.min(chunkSize, height - row);
   var maskData = maskCtx.getImageData(0, row, width, chunkHeight);
   var layerData = layerCtx.getImageData(0, row, width, chunkHeight);
   if (hasBackdrop) {
    composeSMaskBackdrop(maskData.data, r0, g0, b0);
   }
   composeFn(maskData.data, layerData.data, transferMap);
   maskCtx.putImageData(layerData, 0, row);
  }
 }
 function composeSMask(ctx, smask, layerCtx) {
  var mask = smask.canvas;
  var maskCtx = smask.context;
  ctx.setTransform(smask.scaleX, 0, 0, smask.scaleY, smask.offsetX, smask.offsetY);
  var backdrop = smask.backdrop || null;
  if (!smask.transferMap && WebGLUtils.isEnabled) {
   var composed = WebGLUtils.composeSMask(layerCtx.canvas, mask, {
    subtype: smask.subtype,
    backdrop: backdrop
   });
   ctx.setTransform(1, 0, 0, 1, 0, 0);
   ctx.drawImage(composed, smask.offsetX, smask.offsetY);
   return;
  }
  genericComposeSMask(maskCtx, layerCtx, mask.width, mask.height, smask.subtype, backdrop, smask.transferMap);
  ctx.drawImage(mask, 0, 0);
 }
 var LINE_CAP_STYLES = [
  'butt',
  'round',
  'square'
 ];
 var LINE_JOIN_STYLES = [
  'miter',
  'round',
  'bevel'
 ];
 var NORMAL_CLIP = {};
 var EO_CLIP = {};
 CanvasGraphics.prototype = {
  beginDrawing: function CanvasGraphics_beginDrawing(transform, viewport, transparency) {
   var width = this.ctx.canvas.width;
   var height = this.ctx.canvas.height;
   this.ctx.save();
   this.ctx.fillStyle = 'rgb(255, 255, 255)';
   this.ctx.fillRect(0, 0, width, height);
   this.ctx.restore();
   if (transparency) {
    var transparentCanvas = this.cachedCanvases.getCanvas('transparent', width, height, true);
    this.compositeCtx = this.ctx;
    this.transparentCanvas = transparentCanvas.canvas;
    this.ctx = transparentCanvas.context;
    this.ctx.save();
    this.ctx.transform.apply(this.ctx, this.compositeCtx.mozCurrentTransform);
   }
   this.ctx.save();
   if (transform) {
    this.ctx.transform.apply(this.ctx, transform);
   }
   this.ctx.transform.apply(this.ctx, viewport.transform);
   this.baseTransform = this.ctx.mozCurrentTransform.slice();
   if (this.imageLayer) {
    this.imageLayer.beginLayout();
   }
  },
  executeOperatorList: function CanvasGraphics_executeOperatorList(operatorList, executionStartIdx, continueCallback, stepper) {
   var argsArray = operatorList.argsArray;
   var fnArray = operatorList.fnArray;
   var i = executionStartIdx || 0;
   var argsArrayLen = argsArray.length;
   if (argsArrayLen === i) {
    return i;
   }
   var chunkOperations = argsArrayLen - i > EXECUTION_STEPS && typeof continueCallback === 'function';
   var endTime = chunkOperations ? Date.now() + EXECUTION_TIME : 0;
   var steps = 0;
   var commonObjs = this.commonObjs;
   var objs = this.objs;
   var fnId;
   while (true) {
    if (stepper !== undefined && i === stepper.nextBreakPoint) {
     stepper.breakIt(i, continueCallback);
     return i;
    }
    fnId = fnArray[i];
    if (fnId !== OPS.dependency) {
     this[fnId].apply(this, argsArray[i]);
    } else {
     var deps = argsArray[i];
     for (var n = 0, nn = deps.length; n < nn; n++) {
      var depObjId = deps[n];
      var common = depObjId[0] === 'g' && depObjId[1] === '_';
      var objsPool = common ? commonObjs : objs;
      if (!objsPool.isResolved(depObjId)) {
       objsPool.get(depObjId, continueCallback);
       return i;
      }
     }
    }
    i++;
    if (i === argsArrayLen) {
     return i;
    }
    if (chunkOperations && ++steps > EXECUTION_STEPS) {
     if (Date.now() > endTime) {
      continueCallback();
      return i;
     }
     steps = 0;
    }
   }
  },
  endDrawing: function CanvasGraphics_endDrawing() {
   if (this.current.activeSMask !== null) {
    this.endSMaskGroup();
   }
   this.ctx.restore();
   if (this.transparentCanvas) {
    this.ctx = this.compositeCtx;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.drawImage(this.transparentCanvas, 0, 0);
    this.ctx.restore();
    this.transparentCanvas = null;
   }
   this.cachedCanvases.clear();
   WebGLUtils.clear();
   if (this.imageLayer) {
    this.imageLayer.endLayout();
   }
  },
  setLineWidth: function CanvasGraphics_setLineWidth(width) {
   this.current.lineWidth = width;
   this.ctx.lineWidth = width;
  },
  setLineCap: function CanvasGraphics_setLineCap(style) {
   this.ctx.lineCap = LINE_CAP_STYLES[style];
  },
  setLineJoin: function CanvasGraphics_setLineJoin(style) {
   this.ctx.lineJoin = LINE_JOIN_STYLES[style];
  },
  setMiterLimit: function CanvasGraphics_setMiterLimit(limit) {
   this.ctx.miterLimit = limit;
  },
  setDash: function CanvasGraphics_setDash(dashArray, dashPhase) {
   var ctx = this.ctx;
   if (ctx.setLineDash !== undefined) {
    ctx.setLineDash(dashArray);
    ctx.lineDashOffset = dashPhase;
   }
  },
  setRenderingIntent: function CanvasGraphics_setRenderingIntent(intent) {
  },
  setFlatness: function CanvasGraphics_setFlatness(flatness) {
  },
  setGState: function CanvasGraphics_setGState(states) {
   for (var i = 0, ii = states.length; i < ii; i++) {
    var state = states[i];
    var key = state[0];
    var value = state[1];
    switch (key) {
    case 'LW':
     this.setLineWidth(value);
     break;
    case 'LC':
     this.setLineCap(value);
     break;
    case 'LJ':
     this.setLineJoin(value);
     break;
    case 'ML':
     this.setMiterLimit(value);
     break;
    case 'D':
     this.setDash(value[0], value[1]);
     break;
    case 'RI':
     this.setRenderingIntent(value);
     break;
    case 'FL':
     this.setFlatness(value);
     break;
    case 'Font':
     this.setFont(value[0], value[1]);
     break;
    case 'CA':
     this.current.strokeAlpha = state[1];
     break;
    case 'ca':
     this.current.fillAlpha = state[1];
     this.ctx.globalAlpha = state[1];
     break;
    case 'BM':
     if (value && value.name && value.name !== 'Normal') {
      var mode = value.name.replace(/([A-Z])/g, function (c) {
       return '-' + c.toLowerCase();
      }).substring(1);
      this.ctx.globalCompositeOperation = mode;
      if (this.ctx.globalCompositeOperation !== mode) {
       warn('globalCompositeOperation "' + mode + '" is not supported');
      }
     } else {
      this.ctx.globalCompositeOperation = 'source-over';
     }
     break;
    case 'SMask':
     if (this.current.activeSMask) {
      if (this.stateStack.length > 0 && this.stateStack[this.stateStack.length - 1].activeSMask === this.current.activeSMask) {
       this.suspendSMaskGroup();
      } else {
       this.endSMaskGroup();
      }
     }
     this.current.activeSMask = value ? this.tempSMask : null;
     if (this.current.activeSMask) {
      this.beginSMaskGroup();
     }
     this.tempSMask = null;
     break;
    }
   }
  },
  beginSMaskGroup: function CanvasGraphics_beginSMaskGroup() {
   var activeSMask = this.current.activeSMask;
   var drawnWidth = activeSMask.canvas.width;
   var drawnHeight = activeSMask.canvas.height;
   var cacheId = 'smaskGroupAt' + this.groupLevel;
   var scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
   var currentCtx = this.ctx;
   var currentTransform = currentCtx.mozCurrentTransform;
   this.ctx.save();
   var groupCtx = scratchCanvas.context;
   groupCtx.scale(1 / activeSMask.scaleX, 1 / activeSMask.scaleY);
   groupCtx.translate(-activeSMask.offsetX, -activeSMask.offsetY);
   groupCtx.transform.apply(groupCtx, currentTransform);
   activeSMask.startTransformInverse = groupCtx.mozCurrentTransformInverse;
   copyCtxState(currentCtx, groupCtx);
   this.ctx = groupCtx;
   this.setGState([
    [
     'BM',
     'Normal'
    ],
    [
     'ca',
     1
    ],
    [
     'CA',
     1
    ]
   ]);
   this.groupStack.push(currentCtx);
   this.groupLevel++;
  },
  suspendSMaskGroup: function CanvasGraphics_endSMaskGroup() {
   var groupCtx = this.ctx;
   this.groupLevel--;
   this.ctx = this.groupStack.pop();
   composeSMask(this.ctx, this.current.activeSMask, groupCtx);
   this.ctx.restore();
   this.ctx.save();
   copyCtxState(groupCtx, this.ctx);
   this.current.resumeSMaskCtx = groupCtx;
   var deltaTransform = Util.transform(this.current.activeSMask.startTransformInverse, groupCtx.mozCurrentTransform);
   this.ctx.transform.apply(this.ctx, deltaTransform);
   groupCtx.save();
   groupCtx.setTransform(1, 0, 0, 1, 0, 0);
   groupCtx.clearRect(0, 0, groupCtx.canvas.width, groupCtx.canvas.height);
   groupCtx.restore();
  },
  resumeSMaskGroup: function CanvasGraphics_endSMaskGroup() {
   var groupCtx = this.current.resumeSMaskCtx;
   var currentCtx = this.ctx;
   this.ctx = groupCtx;
   this.groupStack.push(currentCtx);
   this.groupLevel++;
  },
  endSMaskGroup: function CanvasGraphics_endSMaskGroup() {
   var groupCtx = this.ctx;
   this.groupLevel--;
   this.ctx = this.groupStack.pop();
   composeSMask(this.ctx, this.current.activeSMask, groupCtx);
   this.ctx.restore();
   copyCtxState(groupCtx, this.ctx);
   var deltaTransform = Util.transform(this.current.activeSMask.startTransformInverse, groupCtx.mozCurrentTransform);
   this.ctx.transform.apply(this.ctx, deltaTransform);
  },
  save: function CanvasGraphics_save() {
   this.ctx.save();
   var old = this.current;
   this.stateStack.push(old);
   this.current = old.clone();
   this.current.resumeSMaskCtx = null;
  },
  restore: function CanvasGraphics_restore() {
   if (this.current.resumeSMaskCtx) {
    this.resumeSMaskGroup();
   }
   if (this.current.activeSMask !== null && (this.stateStack.length === 0 || this.stateStack[this.stateStack.length - 1].activeSMask !== this.current.activeSMask)) {
    this.endSMaskGroup();
   }
   if (this.stateStack.length !== 0) {
    this.current = this.stateStack.pop();
    this.ctx.restore();
    this.pendingClip = null;
    this.cachedGetSinglePixelWidth = null;
   }
  },
  transform: function CanvasGraphics_transform(a, b, c, d, e, f) {
   this.ctx.transform(a, b, c, d, e, f);
   this.cachedGetSinglePixelWidth = null;
  },
  constructPath: function CanvasGraphics_constructPath(ops, args) {
   var ctx = this.ctx;
   var current = this.current;
   var x = current.x, y = current.y;
   for (var i = 0, j = 0, ii = ops.length; i < ii; i++) {
    switch (ops[i] | 0) {
    case OPS.rectangle:
     x = args[j++];
     y = args[j++];
     var width = args[j++];
     var height = args[j++];
     if (width === 0) {
      width = this.getSinglePixelWidth();
     }
     if (height === 0) {
      height = this.getSinglePixelWidth();
     }
     var xw = x + width;
     var yh = y + height;
     this.ctx.moveTo(x, y);
     this.ctx.lineTo(xw, y);
     this.ctx.lineTo(xw, yh);
     this.ctx.lineTo(x, yh);
     this.ctx.lineTo(x, y);
     this.ctx.closePath();
     break;
    case OPS.moveTo:
     x = args[j++];
     y = args[j++];
     ctx.moveTo(x, y);
     break;
    case OPS.lineTo:
     x = args[j++];
     y = args[j++];
     ctx.lineTo(x, y);
     break;
    case OPS.curveTo:
     x = args[j + 4];
     y = args[j + 5];
     ctx.bezierCurveTo(args[j], args[j + 1], args[j + 2], args[j + 3], x, y);
     j += 6;
     break;
    case OPS.curveTo2:
     ctx.bezierCurveTo(x, y, args[j], args[j + 1], args[j + 2], args[j + 3]);
     x = args[j + 2];
     y = args[j + 3];
     j += 4;
     break;
    case OPS.curveTo3:
     x = args[j + 2];
     y = args[j + 3];
     ctx.bezierCurveTo(args[j], args[j + 1], x, y, x, y);
     j += 4;
     break;
    case OPS.closePath:
     ctx.closePath();
     break;
    }
   }
   current.setCurrentPoint(x, y);
  },
  closePath: function CanvasGraphics_closePath() {
   this.ctx.closePath();
  },
  stroke: function CanvasGraphics_stroke(consumePath) {
   consumePath = typeof consumePath !== 'undefined' ? consumePath : true;
   var ctx = this.ctx;
   var strokeColor = this.current.strokeColor;
   ctx.lineWidth = Math.max(this.getSinglePixelWidth() * MIN_WIDTH_FACTOR, this.current.lineWidth);
   ctx.globalAlpha = this.current.strokeAlpha;
   if (strokeColor && strokeColor.hasOwnProperty('type') && strokeColor.type === 'Pattern') {
    ctx.save();
    ctx.strokeStyle = strokeColor.getPattern(ctx, this);
    ctx.stroke();
    ctx.restore();
   } else {
    ctx.stroke();
   }
   if (consumePath) {
    this.consumePath();
   }
   ctx.globalAlpha = this.current.fillAlpha;
  },
  closeStroke: function CanvasGraphics_closeStroke() {
   this.closePath();
   this.stroke();
  },
  fill: function CanvasGraphics_fill(consumePath) {
   consumePath = typeof consumePath !== 'undefined' ? consumePath : true;
   var ctx = this.ctx;
   var fillColor = this.current.fillColor;
   var isPatternFill = this.current.patternFill;
   var needRestore = false;
   if (isPatternFill) {
    ctx.save();
    if (this.baseTransform) {
     ctx.setTransform.apply(ctx, this.baseTransform);
    }
    ctx.fillStyle = fillColor.getPattern(ctx, this);
    needRestore = true;
   }
   if (this.pendingEOFill) {
    ctx.fill('evenodd');
    this.pendingEOFill = false;
   } else {
    ctx.fill();
   }
   if (needRestore) {
    ctx.restore();
   }
   if (consumePath) {
    this.consumePath();
   }
  },
  eoFill: function CanvasGraphics_eoFill() {
   this.pendingEOFill = true;
   this.fill();
  },
  fillStroke: function CanvasGraphics_fillStroke() {
   this.fill(false);
   this.stroke(false);
   this.consumePath();
  },
  eoFillStroke: function CanvasGraphics_eoFillStroke() {
   this.pendingEOFill = true;
   this.fillStroke();
  },
  closeFillStroke: function CanvasGraphics_closeFillStroke() {
   this.closePath();
   this.fillStroke();
  },
  closeEOFillStroke: function CanvasGraphics_closeEOFillStroke() {
   this.pendingEOFill = true;
   this.closePath();
   this.fillStroke();
  },
  endPath: function CanvasGraphics_endPath() {
   this.consumePath();
  },
  clip: function CanvasGraphics_clip() {
   this.pendingClip = NORMAL_CLIP;
  },
  eoClip: function CanvasGraphics_eoClip() {
   this.pendingClip = EO_CLIP;
  },
  beginText: function CanvasGraphics_beginText() {
   this.current.textMatrix = IDENTITY_MATRIX;
   this.current.textMatrixScale = 1;
   this.current.x = this.current.lineX = 0;
   this.current.y = this.current.lineY = 0;
  },
  endText: function CanvasGraphics_endText() {
   var paths = this.pendingTextPaths;
   var ctx = this.ctx;
   if (paths === undefined) {
    ctx.beginPath();
    return;
   }
   ctx.save();
   ctx.beginPath();
   for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    ctx.setTransform.apply(ctx, path.transform);
    ctx.translate(path.x, path.y);
    path.addToPath(ctx, path.fontSize);
   }
   ctx.restore();
   ctx.clip();
   ctx.beginPath();
   delete this.pendingTextPaths;
  },
  setCharSpacing: function CanvasGraphics_setCharSpacing(spacing) {
   this.current.charSpacing = spacing;
  },
  setWordSpacing: function CanvasGraphics_setWordSpacing(spacing) {
   this.current.wordSpacing = spacing;
  },
  setHScale: function CanvasGraphics_setHScale(scale) {
   this.current.textHScale = scale / 100;
  },
  setLeading: function CanvasGraphics_setLeading(leading) {
   this.current.leading = -leading;
  },
  setFont: function CanvasGraphics_setFont(fontRefName, size) {
   var fontObj = this.commonObjs.get(fontRefName);
   var current = this.current;
   if (!fontObj) {
    error('Can\'t find font for ' + fontRefName);
   }
   current.fontMatrix = fontObj.fontMatrix ? fontObj.fontMatrix : FONT_IDENTITY_MATRIX;
   if (current.fontMatrix[0] === 0 || current.fontMatrix[3] === 0) {
    warn('Invalid font matrix for font ' + fontRefName);
   }
   if (size < 0) {
    size = -size;
    current.fontDirection = -1;
   } else {
    current.fontDirection = 1;
   }
   this.current.font = fontObj;
   this.current.fontSize = size;
   if (fontObj.isType3Font) {
    return;
   }
   var name = fontObj.loadedName || 'sans-serif';
   var bold = fontObj.black ? '900' : fontObj.bold ? 'bold' : 'normal';
   var italic = fontObj.italic ? 'italic' : 'normal';
   var typeface = '"' + name + '", ' + fontObj.fallbackName;
   var browserFontSize = size < MIN_FONT_SIZE ? MIN_FONT_SIZE : size > MAX_FONT_SIZE ? MAX_FONT_SIZE : size;
   this.current.fontSizeScale = size / browserFontSize;
   var rule = italic + ' ' + bold + ' ' + browserFontSize + 'px ' + typeface;
   this.ctx.font = rule;
  },
  setTextRenderingMode: function CanvasGraphics_setTextRenderingMode(mode) {
   this.current.textRenderingMode = mode;
  },
  setTextRise: function CanvasGraphics_setTextRise(rise) {
   this.current.textRise = rise;
  },
  moveText: function CanvasGraphics_moveText(x, y) {
   this.current.x = this.current.lineX += x;
   this.current.y = this.current.lineY += y;
  },
  setLeadingMoveText: function CanvasGraphics_setLeadingMoveText(x, y) {
   this.setLeading(-y);
   this.moveText(x, y);
  },
  setTextMatrix: function CanvasGraphics_setTextMatrix(a, b, c, d, e, f) {
   this.current.textMatrix = [
    a,
    b,
    c,
    d,
    e,
    f
   ];
   this.current.textMatrixScale = Math.sqrt(a * a + b * b);
   this.current.x = this.current.lineX = 0;
   this.current.y = this.current.lineY = 0;
  },
  nextLine: function CanvasGraphics_nextLine() {
   this.moveText(0, this.current.leading);
  },
  paintChar: function CanvasGraphics_paintChar(character, x, y) {
   var ctx = this.ctx;
   var current = this.current;
   var font = current.font;
   var textRenderingMode = current.textRenderingMode;
   var fontSize = current.fontSize / current.fontSizeScale;
   var fillStrokeMode = textRenderingMode & TextRenderingMode.FILL_STROKE_MASK;
   var isAddToPathSet = !!(textRenderingMode & TextRenderingMode.ADD_TO_PATH_FLAG);
   var addToPath;
   if (font.disableFontFace || isAddToPathSet) {
    addToPath = font.getPathGenerator(this.commonObjs, character);
   }
   if (font.disableFontFace) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    addToPath(ctx, fontSize);
    if (fillStrokeMode === TextRenderingMode.FILL || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
     ctx.fill();
    }
    if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
     ctx.stroke();
    }
    ctx.restore();
   } else {
    if (fillStrokeMode === TextRenderingMode.FILL || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
     ctx.fillText(character, x, y);
    }
    if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
     ctx.strokeText(character, x, y);
    }
   }
   if (isAddToPathSet) {
    var paths = this.pendingTextPaths || (this.pendingTextPaths = []);
    paths.push({
     transform: ctx.mozCurrentTransform,
     x: x,
     y: y,
     fontSize: fontSize,
     addToPath: addToPath
    });
   }
  },
  get isFontSubpixelAAEnabled() {
   var ctx = this.canvasFactory.create(10, 10).context;
   ctx.scale(1.5, 1);
   ctx.fillText('I', 0, 10);
   var data = ctx.getImageData(0, 0, 10, 10).data;
   var enabled = false;
   for (var i = 3; i < data.length; i += 4) {
    if (data[i] > 0 && data[i] < 255) {
     enabled = true;
     break;
    }
   }
   return shadow(this, 'isFontSubpixelAAEnabled', enabled);
  },
  showText: function CanvasGraphics_showText(glyphs) {
   var current = this.current;
   var font = current.font;
   if (font.isType3Font) {
    return this.showType3Text(glyphs);
   }
   var fontSize = current.fontSize;
   if (fontSize === 0) {
    return;
   }
   var ctx = this.ctx;
   var fontSizeScale = current.fontSizeScale;
   var charSpacing = current.charSpacing;
   var wordSpacing = current.wordSpacing;
   var fontDirection = current.fontDirection;
   var textHScale = current.textHScale * fontDirection;
   var glyphsLength = glyphs.length;
   var vertical = font.vertical;
   var spacingDir = vertical ? 1 : -1;
   var defaultVMetrics = font.defaultVMetrics;
   var widthAdvanceScale = fontSize * current.fontMatrix[0];
   var simpleFillText = current.textRenderingMode === TextRenderingMode.FILL && !font.disableFontFace;
   ctx.save();
   ctx.transform.apply(ctx, current.textMatrix);
   ctx.translate(current.x, current.y + current.textRise);
   if (current.patternFill) {
    ctx.fillStyle = current.fillColor.getPattern(ctx, this);
   }
   if (fontDirection > 0) {
    ctx.scale(textHScale, -1);
   } else {
    ctx.scale(textHScale, 1);
   }
   var lineWidth = current.lineWidth;
   var scale = current.textMatrixScale;
   if (scale === 0 || lineWidth === 0) {
    var fillStrokeMode = current.textRenderingMode & TextRenderingMode.FILL_STROKE_MASK;
    if (fillStrokeMode === TextRenderingMode.STROKE || fillStrokeMode === TextRenderingMode.FILL_STROKE) {
     this.cachedGetSinglePixelWidth = null;
     lineWidth = this.getSinglePixelWidth() * MIN_WIDTH_FACTOR;
    }
   } else {
    lineWidth /= scale;
   }
   if (fontSizeScale !== 1.0) {
    ctx.scale(fontSizeScale, fontSizeScale);
    lineWidth /= fontSizeScale;
   }
   ctx.lineWidth = lineWidth;
   var x = 0, i;
   for (i = 0; i < glyphsLength; ++i) {
    var glyph = glyphs[i];
    if (isNum(glyph)) {
     x += spacingDir * glyph * fontSize / 1000;
     continue;
    }
    var restoreNeeded = false;
    var spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
    var character = glyph.fontChar;
    var accent = glyph.accent;
    var scaledX, scaledY, scaledAccentX, scaledAccentY;
    var width = glyph.width;
    if (vertical) {
     var vmetric, vx, vy;
     vmetric = glyph.vmetric || defaultVMetrics;
     vx = glyph.vmetric ? vmetric[1] : width * 0.5;
     vx = -vx * widthAdvanceScale;
     vy = vmetric[2] * widthAdvanceScale;
     width = vmetric ? -vmetric[0] : width;
     scaledX = vx / fontSizeScale;
     scaledY = (x + vy) / fontSizeScale;
    } else {
     scaledX = x / fontSizeScale;
     scaledY = 0;
    }
    if (font.remeasure && width > 0) {
     var measuredWidth = ctx.measureText(character).width * 1000 / fontSize * fontSizeScale;
     if (width < measuredWidth && this.isFontSubpixelAAEnabled) {
      var characterScaleX = width / measuredWidth;
      restoreNeeded = true;
      ctx.save();
      ctx.scale(characterScaleX, 1);
      scaledX /= characterScaleX;
     } else if (width !== measuredWidth) {
      scaledX += (width - measuredWidth) / 2000 * fontSize / fontSizeScale;
     }
    }
    if (glyph.isInFont || font.missingFile) {
     if (simpleFillText && !accent) {
      ctx.fillText(character, scaledX, scaledY);
     } else {
      this.paintChar(character, scaledX, scaledY);
      if (accent) {
       scaledAccentX = scaledX + accent.offset.x / fontSizeScale;
       scaledAccentY = scaledY - accent.offset.y / fontSizeScale;
       this.paintChar(accent.fontChar, scaledAccentX, scaledAccentY);
      }
     }
    }
    var charWidth = width * widthAdvanceScale + spacing * fontDirection;
    x += charWidth;
    if (restoreNeeded) {
     ctx.restore();
    }
   }
   if (vertical) {
    current.y -= x * textHScale;
   } else {
    current.x += x * textHScale;
   }
   ctx.restore();
  },
  showType3Text: function CanvasGraphics_showType3Text(glyphs) {
   var ctx = this.ctx;
   var current = this.current;
   var font = current.font;
   var fontSize = current.fontSize;
   var fontDirection = current.fontDirection;
   var spacingDir = font.vertical ? 1 : -1;
   var charSpacing = current.charSpacing;
   var wordSpacing = current.wordSpacing;
   var textHScale = current.textHScale * fontDirection;
   var fontMatrix = current.fontMatrix || FONT_IDENTITY_MATRIX;
   var glyphsLength = glyphs.length;
   var isTextInvisible = current.textRenderingMode === TextRenderingMode.INVISIBLE;
   var i, glyph, width, spacingLength;
   if (isTextInvisible || fontSize === 0) {
    return;
   }
   this.cachedGetSinglePixelWidth = null;
   ctx.save();
   ctx.transform.apply(ctx, current.textMatrix);
   ctx.translate(current.x, current.y);
   ctx.scale(textHScale, fontDirection);
   for (i = 0; i < glyphsLength; ++i) {
    glyph = glyphs[i];
    if (isNum(glyph)) {
     spacingLength = spacingDir * glyph * fontSize / 1000;
     this.ctx.translate(spacingLength, 0);
     current.x += spacingLength * textHScale;
     continue;
    }
    var spacing = (glyph.isSpace ? wordSpacing : 0) + charSpacing;
    var operatorList = font.charProcOperatorList[glyph.operatorListId];
    if (!operatorList) {
     warn('Type3 character \"' + glyph.operatorListId + '\" is not available');
     continue;
    }
    this.processingType3 = glyph;
    this.save();
    ctx.scale(fontSize, fontSize);
    ctx.transform.apply(ctx, fontMatrix);
    this.executeOperatorList(operatorList);
    this.restore();
    var transformed = Util.applyTransform([
     glyph.width,
     0
    ], fontMatrix);
    width = transformed[0] * fontSize + spacing;
    ctx.translate(width, 0);
    current.x += width * textHScale;
   }
   ctx.restore();
   this.processingType3 = null;
  },
  setCharWidth: function CanvasGraphics_setCharWidth(xWidth, yWidth) {
  },
  setCharWidthAndBounds: function CanvasGraphics_setCharWidthAndBounds(xWidth, yWidth, llx, lly, urx, ury) {
   this.ctx.rect(llx, lly, urx - llx, ury - lly);
   this.clip();
   this.endPath();
  },
  getColorN_Pattern: function CanvasGraphics_getColorN_Pattern(IR) {
   var pattern;
   if (IR[0] === 'TilingPattern') {
    var color = IR[1];
    var baseTransform = this.baseTransform || this.ctx.mozCurrentTransform.slice();
    var self = this;
    var canvasGraphicsFactory = {
     createCanvasGraphics: function (ctx) {
      return new CanvasGraphics(ctx, self.commonObjs, self.objs, self.canvasFactory);
     }
    };
    pattern = new TilingPattern(IR, color, this.ctx, canvasGraphicsFactory, baseTransform);
   } else {
    pattern = getShadingPatternFromIR(IR);
   }
   return pattern;
  },
  setStrokeColorN: function CanvasGraphics_setStrokeColorN() {
   this.current.strokeColor = this.getColorN_Pattern(arguments);
  },
  setFillColorN: function CanvasGraphics_setFillColorN() {
   this.current.fillColor = this.getColorN_Pattern(arguments);
   this.current.patternFill = true;
  },
  setStrokeRGBColor: function CanvasGraphics_setStrokeRGBColor(r, g, b) {
   var color = Util.makeCssRgb(r, g, b);
   this.ctx.strokeStyle = color;
   this.current.strokeColor = color;
  },
  setFillRGBColor: function CanvasGraphics_setFillRGBColor(r, g, b) {
   var color = Util.makeCssRgb(r, g, b);
   this.ctx.fillStyle = color;
   this.current.fillColor = color;
   this.current.patternFill = false;
  },
  shadingFill: function CanvasGraphics_shadingFill(patternIR) {
   var ctx = this.ctx;
   this.save();
   var pattern = getShadingPatternFromIR(patternIR);
   ctx.fillStyle = pattern.getPattern(ctx, this, true);
   var inv = ctx.mozCurrentTransformInverse;
   if (inv) {
    var canvas = ctx.canvas;
    var width = canvas.width;
    var height = canvas.height;
    var bl = Util.applyTransform([
     0,
     0
    ], inv);
    var br = Util.applyTransform([
     0,
     height
    ], inv);
    var ul = Util.applyTransform([
     width,
     0
    ], inv);
    var ur = Util.applyTransform([
     width,
     height
    ], inv);
    var x0 = Math.min(bl[0], br[0], ul[0], ur[0]);
    var y0 = Math.min(bl[1], br[1], ul[1], ur[1]);
    var x1 = Math.max(bl[0], br[0], ul[0], ur[0]);
    var y1 = Math.max(bl[1], br[1], ul[1], ur[1]);
    this.ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
   } else {
    this.ctx.fillRect(-1e10, -1e10, 2e10, 2e10);
   }
   this.restore();
  },
  beginInlineImage: function CanvasGraphics_beginInlineImage() {
   error('Should not call beginInlineImage');
  },
  beginImageData: function CanvasGraphics_beginImageData() {
   error('Should not call beginImageData');
  },
  paintFormXObjectBegin: function CanvasGraphics_paintFormXObjectBegin(matrix, bbox) {
   this.save();
   this.baseTransformStack.push(this.baseTransform);
   if (isArray(matrix) && matrix.length === 6) {
    this.transform.apply(this, matrix);
   }
   this.baseTransform = this.ctx.mozCurrentTransform;
   if (isArray(bbox) && bbox.length === 4) {
    var width = bbox[2] - bbox[0];
    var height = bbox[3] - bbox[1];
    this.ctx.rect(bbox[0], bbox[1], width, height);
    this.clip();
    this.endPath();
   }
  },
  paintFormXObjectEnd: function CanvasGraphics_paintFormXObjectEnd() {
   this.restore();
   this.baseTransform = this.baseTransformStack.pop();
  },
  beginGroup: function CanvasGraphics_beginGroup(group) {
   this.save();
   var currentCtx = this.ctx;
   if (!group.isolated) {
    info('TODO: Support non-isolated groups.');
   }
   if (group.knockout) {
    warn('Knockout groups not supported.');
   }
   var currentTransform = currentCtx.mozCurrentTransform;
   if (group.matrix) {
    currentCtx.transform.apply(currentCtx, group.matrix);
   }
   assert(group.bbox, 'Bounding box is required.');
   var bounds = Util.getAxialAlignedBoundingBox(group.bbox, currentCtx.mozCurrentTransform);
   var canvasBounds = [
    0,
    0,
    currentCtx.canvas.width,
    currentCtx.canvas.height
   ];
   bounds = Util.intersect(bounds, canvasBounds) || [
    0,
    0,
    0,
    0
   ];
   var offsetX = Math.floor(bounds[0]);
   var offsetY = Math.floor(bounds[1]);
   var drawnWidth = Math.max(Math.ceil(bounds[2]) - offsetX, 1);
   var drawnHeight = Math.max(Math.ceil(bounds[3]) - offsetY, 1);
   var scaleX = 1, scaleY = 1;
   if (drawnWidth > MAX_GROUP_SIZE) {
    scaleX = drawnWidth / MAX_GROUP_SIZE;
    drawnWidth = MAX_GROUP_SIZE;
   }
   if (drawnHeight > MAX_GROUP_SIZE) {
    scaleY = drawnHeight / MAX_GROUP_SIZE;
    drawnHeight = MAX_GROUP_SIZE;
   }
   var cacheId = 'groupAt' + this.groupLevel;
   if (group.smask) {
    cacheId += '_smask_' + this.smaskCounter++ % 2;
   }
   var scratchCanvas = this.cachedCanvases.getCanvas(cacheId, drawnWidth, drawnHeight, true);
   var groupCtx = scratchCanvas.context;
   groupCtx.scale(1 / scaleX, 1 / scaleY);
   groupCtx.translate(-offsetX, -offsetY);
   groupCtx.transform.apply(groupCtx, currentTransform);
   if (group.smask) {
    this.smaskStack.push({
     canvas: scratchCanvas.canvas,
     context: groupCtx,
     offsetX: offsetX,
     offsetY: offsetY,
     scaleX: scaleX,
     scaleY: scaleY,
     subtype: group.smask.subtype,
     backdrop: group.smask.backdrop,
     transferMap: group.smask.transferMap || null,
     startTransformInverse: null
    });
   } else {
    currentCtx.setTransform(1, 0, 0, 1, 0, 0);
    currentCtx.translate(offsetX, offsetY);
    currentCtx.scale(scaleX, scaleY);
   }
   copyCtxState(currentCtx, groupCtx);
   this.ctx = groupCtx;
   this.setGState([
    [
     'BM',
     'Normal'
    ],
    [
     'ca',
     1
    ],
    [
     'CA',
     1
    ]
   ]);
   this.groupStack.push(currentCtx);
   this.groupLevel++;
   this.current.activeSMask = null;
  },
  endGroup: function CanvasGraphics_endGroup(group) {
   this.groupLevel--;
   var groupCtx = this.ctx;
   this.ctx = this.groupStack.pop();
   if (this.ctx.imageSmoothingEnabled !== undefined) {
    this.ctx.imageSmoothingEnabled = false;
   } else {
    this.ctx.mozImageSmoothingEnabled = false;
   }
   if (group.smask) {
    this.tempSMask = this.smaskStack.pop();
   } else {
    this.ctx.drawImage(groupCtx.canvas, 0, 0);
   }
   this.restore();
  },
  beginAnnotations: function CanvasGraphics_beginAnnotations() {
   this.save();
   this.current = new CanvasExtraState();
   if (this.baseTransform) {
    this.ctx.setTransform.apply(this.ctx, this.baseTransform);
   }
  },
  endAnnotations: function CanvasGraphics_endAnnotations() {
   this.restore();
  },
  beginAnnotation: function CanvasGraphics_beginAnnotation(rect, transform, matrix) {
   this.save();
   if (isArray(rect) && rect.length === 4) {
    var width = rect[2] - rect[0];
    var height = rect[3] - rect[1];
    this.ctx.rect(rect[0], rect[1], width, height);
    this.clip();
    this.endPath();
   }
   this.transform.apply(this, transform);
   this.transform.apply(this, matrix);
  },
  endAnnotation: function CanvasGraphics_endAnnotation() {
   this.restore();
  },
  paintJpegXObject: function CanvasGraphics_paintJpegXObject(objId, w, h) {
   var domImage = this.objs.get(objId);
   if (!domImage) {
    warn('Dependent image isn\'t ready yet');
    return;
   }
   this.save();
   var ctx = this.ctx;
   ctx.scale(1 / w, -1 / h);
   ctx.drawImage(domImage, 0, 0, domImage.width, domImage.height, 0, -h, w, h);
   if (this.imageLayer) {
    var currentTransform = ctx.mozCurrentTransformInverse;
    var position = this.getCanvasPosition(0, 0);
    this.imageLayer.appendImage({
     objId: objId,
     left: position[0],
     top: position[1],
     width: w / currentTransform[0],
     height: h / currentTransform[3]
    });
   }
   this.restore();
  },
  paintImageMaskXObject: function CanvasGraphics_paintImageMaskXObject(img) {
   var ctx = this.ctx;
   var width = img.width, height = img.height;
   var fillColor = this.current.fillColor;
   var isPatternFill = this.current.patternFill;
   var glyph = this.processingType3;
   if (COMPILE_TYPE3_GLYPHS && glyph && glyph.compiled === undefined) {
    if (width <= MAX_SIZE_TO_COMPILE && height <= MAX_SIZE_TO_COMPILE) {
     glyph.compiled = compileType3Glyph({
      data: img.data,
      width: width,
      height: height
     });
    } else {
     glyph.compiled = null;
    }
   }
   if (glyph && glyph.compiled) {
    glyph.compiled(ctx);
    return;
   }
   var maskCanvas = this.cachedCanvases.getCanvas('maskCanvas', width, height);
   var maskCtx = maskCanvas.context;
   maskCtx.save();
   putBinaryImageMask(maskCtx, img);
   maskCtx.globalCompositeOperation = 'source-in';
   maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
   maskCtx.fillRect(0, 0, width, height);
   maskCtx.restore();
   this.paintInlineImageXObject(maskCanvas.canvas);
  },
  paintImageMaskXObjectRepeat: function CanvasGraphics_paintImageMaskXObjectRepeat(imgData, scaleX, scaleY, positions) {
   var width = imgData.width;
   var height = imgData.height;
   var fillColor = this.current.fillColor;
   var isPatternFill = this.current.patternFill;
   var maskCanvas = this.cachedCanvases.getCanvas('maskCanvas', width, height);
   var maskCtx = maskCanvas.context;
   maskCtx.save();
   putBinaryImageMask(maskCtx, imgData);
   maskCtx.globalCompositeOperation = 'source-in';
   maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
   maskCtx.fillRect(0, 0, width, height);
   maskCtx.restore();
   var ctx = this.ctx;
   for (var i = 0, ii = positions.length; i < ii; i += 2) {
    ctx.save();
    ctx.transform(scaleX, 0, 0, scaleY, positions[i], positions[i + 1]);
    ctx.scale(1, -1);
    ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
    ctx.restore();
   }
  },
  paintImageMaskXObjectGroup: function CanvasGraphics_paintImageMaskXObjectGroup(images) {
   var ctx = this.ctx;
   var fillColor = this.current.fillColor;
   var isPatternFill = this.current.patternFill;
   for (var i = 0, ii = images.length; i < ii; i++) {
    var image = images[i];
    var width = image.width, height = image.height;
    var maskCanvas = this.cachedCanvases.getCanvas('maskCanvas', width, height);
    var maskCtx = maskCanvas.context;
    maskCtx.save();
    putBinaryImageMask(maskCtx, image);
    maskCtx.globalCompositeOperation = 'source-in';
    maskCtx.fillStyle = isPatternFill ? fillColor.getPattern(maskCtx, this) : fillColor;
    maskCtx.fillRect(0, 0, width, height);
    maskCtx.restore();
    ctx.save();
    ctx.transform.apply(ctx, image.transform);
    ctx.scale(1, -1);
    ctx.drawImage(maskCanvas.canvas, 0, 0, width, height, 0, -1, 1, 1);
    ctx.restore();
   }
  },
  paintImageXObject: function CanvasGraphics_paintImageXObject(objId) {
   var imgData = this.objs.get(objId);
   if (!imgData) {
    warn('Dependent image isn\'t ready yet');
    return;
   }
   this.paintInlineImageXObject(imgData);
  },
  paintImageXObjectRepeat: function CanvasGraphics_paintImageXObjectRepeat(objId, scaleX, scaleY, positions) {
   var imgData = this.objs.get(objId);
   if (!imgData) {
    warn('Dependent image isn\'t ready yet');
    return;
   }
   var width = imgData.width;
   var height = imgData.height;
   var map = [];
   for (var i = 0, ii = positions.length; i < ii; i += 2) {
    map.push({
     transform: [
      scaleX,
      0,
      0,
      scaleY,
      positions[i],
      positions[i + 1]
     ],
     x: 0,
     y: 0,
     w: width,
     h: height
    });
   }
   this.paintInlineImageXObjectGroup(imgData, map);
  },
  paintInlineImageXObject: function CanvasGraphics_paintInlineImageXObject(imgData) {
   var width = imgData.width;
   var height = imgData.height;
   var ctx = this.ctx;
   this.save();
   ctx.scale(1 / width, -1 / height);
   var currentTransform = ctx.mozCurrentTransformInverse;
   var a = currentTransform[0], b = currentTransform[1];
   var widthScale = Math.max(Math.sqrt(a * a + b * b), 1);
   var c = currentTransform[2], d = currentTransform[3];
   var heightScale = Math.max(Math.sqrt(c * c + d * d), 1);
   var imgToPaint, tmpCanvas;
   if (imgData instanceof HTMLElement || !imgData.data) {
    imgToPaint = imgData;
   } else {
    tmpCanvas = this.cachedCanvases.getCanvas('inlineImage', width, height);
    var tmpCtx = tmpCanvas.context;
    putBinaryImageData(tmpCtx, imgData);
    imgToPaint = tmpCanvas.canvas;
   }
   var paintWidth = width, paintHeight = height;
   var tmpCanvasId = 'prescale1';
   while (widthScale > 2 && paintWidth > 1 || heightScale > 2 && paintHeight > 1) {
    var newWidth = paintWidth, newHeight = paintHeight;
    if (widthScale > 2 && paintWidth > 1) {
     newWidth = Math.ceil(paintWidth / 2);
     widthScale /= paintWidth / newWidth;
    }
    if (heightScale > 2 && paintHeight > 1) {
     newHeight = Math.ceil(paintHeight / 2);
     heightScale /= paintHeight / newHeight;
    }
    tmpCanvas = this.cachedCanvases.getCanvas(tmpCanvasId, newWidth, newHeight);
    tmpCtx = tmpCanvas.context;
    tmpCtx.clearRect(0, 0, newWidth, newHeight);
    tmpCtx.drawImage(imgToPaint, 0, 0, paintWidth, paintHeight, 0, 0, newWidth, newHeight);
    imgToPaint = tmpCanvas.canvas;
    paintWidth = newWidth;
    paintHeight = newHeight;
    tmpCanvasId = tmpCanvasId === 'prescale1' ? 'prescale2' : 'prescale1';
   }
   ctx.drawImage(imgToPaint, 0, 0, paintWidth, paintHeight, 0, -height, width, height);
   if (this.imageLayer) {
    var position = this.getCanvasPosition(0, -height);
    this.imageLayer.appendImage({
     imgData: imgData,
     left: position[0],
     top: position[1],
     width: width / currentTransform[0],
     height: height / currentTransform[3]
    });
   }
   this.restore();
  },
  paintInlineImageXObjectGroup: function CanvasGraphics_paintInlineImageXObjectGroup(imgData, map) {
   var ctx = this.ctx;
   var w = imgData.width;
   var h = imgData.height;
   var tmpCanvas = this.cachedCanvases.getCanvas('inlineImage', w, h);
   var tmpCtx = tmpCanvas.context;
   putBinaryImageData(tmpCtx, imgData);
   for (var i = 0, ii = map.length; i < ii; i++) {
    var entry = map[i];
    ctx.save();
    ctx.transform.apply(ctx, entry.transform);
    ctx.scale(1, -1);
    ctx.drawImage(tmpCanvas.canvas, entry.x, entry.y, entry.w, entry.h, 0, -1, 1, 1);
    if (this.imageLayer) {
     var position = this.getCanvasPosition(entry.x, entry.y);
     this.imageLayer.appendImage({
      imgData: imgData,
      left: position[0],
      top: position[1],
      width: w,
      height: h
     });
    }
    ctx.restore();
   }
  },
  paintSolidColorImageMask: function CanvasGraphics_paintSolidColorImageMask() {
   this.ctx.fillRect(0, 0, 1, 1);
  },
  paintXObject: function CanvasGraphics_paintXObject() {
   warn('Unsupported \'paintXObject\' command.');
  },
  markPoint: function CanvasGraphics_markPoint(tag) {
  },
  markPointProps: function CanvasGraphics_markPointProps(tag, properties) {
  },
  beginMarkedContent: function CanvasGraphics_beginMarkedContent(tag) {
  },
  beginMarkedContentProps: function CanvasGraphics_beginMarkedContentProps(tag, properties) {
  },
  endMarkedContent: function CanvasGraphics_endMarkedContent() {
  },
  beginCompat: function CanvasGraphics_beginCompat() {
  },
  endCompat: function CanvasGraphics_endCompat() {
  },
  consumePath: function CanvasGraphics_consumePath() {
   var ctx = this.ctx;
   if (this.pendingClip) {
    if (this.pendingClip === EO_CLIP) {
     ctx.clip('evenodd');
    } else {
     ctx.clip();
    }
    this.pendingClip = null;
   }
   ctx.beginPath();
  },
  getSinglePixelWidth: function CanvasGraphics_getSinglePixelWidth(scale) {
   if (this.cachedGetSinglePixelWidth === null) {
    this.ctx.save();
    var inverse = this.ctx.mozCurrentTransformInverse;
    this.ctx.restore();
    this.cachedGetSinglePixelWidth = Math.sqrt(Math.max(inverse[0] * inverse[0] + inverse[1] * inverse[1], inverse[2] * inverse[2] + inverse[3] * inverse[3]));
   }
   return this.cachedGetSinglePixelWidth;
  },
  getCanvasPosition: function CanvasGraphics_getCanvasPosition(x, y) {
   var transform = this.ctx.mozCurrentTransform;
   return [
    transform[0] * x + transform[2] * y + transform[4],
    transform[1] * x + transform[3] * y + transform[5]
   ];
  }
 };
 for (var op in OPS) {
  CanvasGraphics.prototype[OPS[op]] = CanvasGraphics.prototype[op];
 }
 return CanvasGraphics;
}();
exports.CanvasGraphics = CanvasGraphics;

/***/ }),
/* 11 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var assert = sharedUtil.assert;
var bytesToString = sharedUtil.bytesToString;
var string32 = sharedUtil.string32;
var shadow = sharedUtil.shadow;
var warn = sharedUtil.warn;
function FontLoader(docId) {
 this.docId = docId;
 this.styleElement = null;
 this.nativeFontFaces = [];
 this.loadTestFontId = 0;
 this.loadingContext = {
  requests: [],
  nextRequestId: 0
 };
}
FontLoader.prototype = {
 insertRule: function fontLoaderInsertRule(rule) {
  var styleElement = this.styleElement;
  if (!styleElement) {
   styleElement = this.styleElement = document.createElement('style');
   styleElement.id = 'PDFJS_FONT_STYLE_TAG_' + this.docId;
   document.documentElement.getElementsByTagName('head')[0].appendChild(styleElement);
  }
  var styleSheet = styleElement.sheet;
  styleSheet.insertRule(rule, styleSheet.cssRules.length);
 },
 clear: function fontLoaderClear() {
  if (this.styleElement) {
   this.styleElement.remove();
   this.styleElement = null;
  }
  this.nativeFontFaces.forEach(function (nativeFontFace) {
   document.fonts.delete(nativeFontFace);
  });
  this.nativeFontFaces.length = 0;
 }
};
var getLoadTestFont = function () {
 return atob('T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQAFQ' + 'AABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAAALwA' + 'AAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgAAAAGbm' + 'FtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1AAsD6AAA' + 'AADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD6AAAAAAD6A' + 'ABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACMAooCvAAAAeAA' + 'MQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4DIP84AFoDIQAAAA' + 'AAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAAAAEAAQAAAAEAAAAA' + 'AAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUAAQAAAAEAAAAAAAYAAQ' + 'AAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgABAAMAAQQJAAMAAgABAAMA' + 'AQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABYAAAAAAAAAwAAAAMAAAAcAA' + 'EAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAAAC7////TAAEAAAAAAAABBgAA' + 'AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAA' + 'AAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAAAAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgc' + 'A/gXBIwMAYuL+nz5tQXkD5j3CBLnEQACAQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWF' + 'hYWFhYWFhYAAABAQAADwACAQEEE/t3Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQA' + 'AAAAAAABAAAAAMmJbzEAAAAAzgTjFQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAg' + 'ABAAAAAAAAAAAD6AAAAAAAAA==');
};
Object.defineProperty(FontLoader.prototype, 'loadTestFont', {
 get: function () {
  return shadow(this, 'loadTestFont', getLoadTestFont());
 },
 configurable: true
});
FontLoader.prototype.addNativeFontFace = function fontLoader_addNativeFontFace(nativeFontFace) {
 this.nativeFontFaces.push(nativeFontFace);
 document.fonts.add(nativeFontFace);
};
FontLoader.prototype.bind = function fontLoaderBind(fonts, callback) {
 var rules = [];
 var fontsToLoad = [];
 var fontLoadPromises = [];
 var getNativeFontPromise = function (nativeFontFace) {
  return nativeFontFace.loaded.catch(function (e) {
   warn('Failed to load font "' + nativeFontFace.family + '": ' + e);
  });
 };
 var isFontLoadingAPISupported = FontLoader.isFontLoadingAPISupported && !FontLoader.isSyncFontLoadingSupported;
 for (var i = 0, ii = fonts.length; i < ii; i++) {
  var font = fonts[i];
  if (font.attached || font.loading === false) {
   continue;
  }
  font.attached = true;
  if (isFontLoadingAPISupported) {
   var nativeFontFace = font.createNativeFontFace();
   if (nativeFontFace) {
    this.addNativeFontFace(nativeFontFace);
    fontLoadPromises.push(getNativeFontPromise(nativeFontFace));
   }
  } else {
   var rule = font.createFontFaceRule();
   if (rule) {
    this.insertRule(rule);
    rules.push(rule);
    fontsToLoad.push(font);
   }
  }
 }
 var request = this.queueLoadingCallback(callback);
 if (isFontLoadingAPISupported) {
  Promise.all(fontLoadPromises).then(function () {
   request.complete();
  });
 } else if (rules.length > 0 && !FontLoader.isSyncFontLoadingSupported) {
  this.prepareFontLoadEvent(rules, fontsToLoad, request);
 } else {
  request.complete();
 }
};
FontLoader.prototype.queueLoadingCallback = function FontLoader_queueLoadingCallback(callback) {
 function LoadLoader_completeRequest() {
  assert(!request.end, 'completeRequest() cannot be called twice');
  request.end = Date.now();
  while (context.requests.length > 0 && context.requests[0].end) {
   var otherRequest = context.requests.shift();
   setTimeout(otherRequest.callback, 0);
  }
 }
 var context = this.loadingContext;
 var requestId = 'pdfjs-font-loading-' + context.nextRequestId++;
 var request = {
  id: requestId,
  complete: LoadLoader_completeRequest,
  callback: callback,
  started: Date.now()
 };
 context.requests.push(request);
 return request;
};
FontLoader.prototype.prepareFontLoadEvent = function fontLoaderPrepareFontLoadEvent(rules, fonts, request) {
 function int32(data, offset) {
  return data.charCodeAt(offset) << 24 | data.charCodeAt(offset + 1) << 16 | data.charCodeAt(offset + 2) << 8 | data.charCodeAt(offset + 3) & 0xff;
 }
 function spliceString(s, offset, remove, insert) {
  var chunk1 = s.substr(0, offset);
  var chunk2 = s.substr(offset + remove);
  return chunk1 + insert + chunk2;
 }
 var i, ii;
 var canvas = document.createElement('canvas');
 canvas.width = 1;
 canvas.height = 1;
 var ctx = canvas.getContext('2d');
 var called = 0;
 function isFontReady(name, callback) {
  called++;
  if (called > 30) {
   warn('Load test font never loaded.');
   callback();
   return;
  }
  ctx.font = '30px ' + name;
  ctx.fillText('.', 0, 20);
  var imageData = ctx.getImageData(0, 0, 1, 1);
  if (imageData.data[3] > 0) {
   callback();
   return;
  }
  setTimeout(isFontReady.bind(null, name, callback));
 }
 var loadTestFontId = 'lt' + Date.now() + this.loadTestFontId++;
 var data = this.loadTestFont;
 var COMMENT_OFFSET = 976;
 data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
 var CFF_CHECKSUM_OFFSET = 16;
 var XXXX_VALUE = 0x58585858;
 var checksum = int32(data, CFF_CHECKSUM_OFFSET);
 for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {
  checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i) | 0;
 }
 if (i < loadTestFontId.length) {
  checksum = checksum - XXXX_VALUE + int32(loadTestFontId + 'XXX', i) | 0;
 }
 data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, string32(checksum));
 var url = 'url(data:font/opentype;base64,' + btoa(data) + ');';
 var rule = '@font-face { font-family:"' + loadTestFontId + '";src:' + url + '}';
 this.insertRule(rule);
 var names = [];
 for (i = 0, ii = fonts.length; i < ii; i++) {
  names.push(fonts[i].loadedName);
 }
 names.push(loadTestFontId);
 var div = document.createElement('div');
 div.setAttribute('style', 'visibility: hidden;' + 'width: 10px; height: 10px;' + 'position: absolute; top: 0px; left: 0px;');
 for (i = 0, ii = names.length; i < ii; ++i) {
  var span = document.createElement('span');
  span.textContent = 'Hi';
  span.style.fontFamily = names[i];
  div.appendChild(span);
 }
 document.body.appendChild(div);
 isFontReady(loadTestFontId, function () {
  document.body.removeChild(div);
  request.complete();
 });
};
FontLoader.isFontLoadingAPISupported = typeof document !== 'undefined' && !!document.fonts;
var isSyncFontLoadingSupported = function isSyncFontLoadingSupported() {
 if (typeof navigator === 'undefined') {
  return true;
 }
 var supported = false;
 var m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);
 if (m && m[1] >= 14) {
  supported = true;
 }
 return supported;
};
Object.defineProperty(FontLoader, 'isSyncFontLoadingSupported', {
 get: function () {
  return shadow(FontLoader, 'isSyncFontLoadingSupported', isSyncFontLoadingSupported());
 },
 enumerable: true,
 configurable: true
});
var IsEvalSupportedCached = {
 get value() {
  return shadow(this, 'value', sharedUtil.isEvalSupported());
 }
};
var FontFaceObject = function FontFaceObjectClosure() {
 function FontFaceObject(translatedData, options) {
  this.compiledGlyphs = Object.create(null);
  for (var i in translatedData) {
   this[i] = translatedData[i];
  }
  this.options = options;
 }
 FontFaceObject.prototype = {
  createNativeFontFace: function FontFaceObject_createNativeFontFace() {
   if (!this.data) {
    return null;
   }
   if (this.options.disableFontFace) {
    this.disableFontFace = true;
    return null;
   }
   var nativeFontFace = new FontFace(this.loadedName, this.data, {});
   if (this.options.fontRegistry) {
    this.options.fontRegistry.registerFont(this);
   }
   return nativeFontFace;
  },
  createFontFaceRule: function FontFaceObject_createFontFaceRule() {
   if (!this.data) {
    return null;
   }
   if (this.options.disableFontFace) {
    this.disableFontFace = true;
    return null;
   }
   var data = bytesToString(new Uint8Array(this.data));
   var fontName = this.loadedName;
   var url = 'url(data:' + this.mimetype + ';base64,' + btoa(data) + ');';
   var rule = '@font-face { font-family:"' + fontName + '";src:' + url + '}';
   if (this.options.fontRegistry) {
    this.options.fontRegistry.registerFont(this, url);
   }
   return rule;
  },
  getPathGenerator: function FontFaceObject_getPathGenerator(objs, character) {
   if (!(character in this.compiledGlyphs)) {
    var cmds = objs.get(this.loadedName + '_path_' + character);
    var current, i, len;
    if (this.options.isEvalSupported && IsEvalSupportedCached.value) {
     var args, js = '';
     for (i = 0, len = cmds.length; i < len; i++) {
      current = cmds[i];
      if (current.args !== undefined) {
       args = current.args.join(',');
      } else {
       args = '';
      }
      js += 'c.' + current.cmd + '(' + args + ');\n';
     }
     this.compiledGlyphs[character] = new Function('c', 'size', js);
    } else {
     this.compiledGlyphs[character] = function (c, size) {
      for (i = 0, len = cmds.length; i < len; i++) {
       current = cmds[i];
       if (current.cmd === 'scale') {
        current.args = [
         size,
         -size
        ];
       }
       c[current.cmd].apply(c, current.args);
      }
     };
    }
   }
   return this.compiledGlyphs[character];
  }
 };
 return FontFaceObject;
}();
exports.FontFaceObject = FontFaceObject;
exports.FontLoader = FontLoader;

/***/ }),
/* 12 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var sharedUtil = __w_pdfjs_require__(0);
var displayWebGL = __w_pdfjs_require__(8);
var Util = sharedUtil.Util;
var info = sharedUtil.info;
var isArray = sharedUtil.isArray;
var error = sharedUtil.error;
var WebGLUtils = displayWebGL.WebGLUtils;
var ShadingIRs = {};
ShadingIRs.RadialAxial = {
 fromIR: function RadialAxial_fromIR(raw) {
  var type = raw[1];
  var colorStops = raw[2];
  var p0 = raw[3];
  var p1 = raw[4];
  var r0 = raw[5];
  var r1 = raw[6];
  return {
   type: 'Pattern',
   getPattern: function RadialAxial_getPattern(ctx) {
    var grad;
    if (type === 'axial') {
     grad = ctx.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
    } else if (type === 'radial') {
     grad = ctx.createRadialGradient(p0[0], p0[1], r0, p1[0], p1[1], r1);
    }
    for (var i = 0, ii = colorStops.length; i < ii; ++i) {
     var c = colorStops[i];
     grad.addColorStop(c[0], c[1]);
    }
    return grad;
   }
  };
 }
};
var createMeshCanvas = function createMeshCanvasClosure() {
 function drawTriangle(data, context, p1, p2, p3, c1, c2, c3) {
  var coords = context.coords, colors = context.colors;
  var bytes = data.data, rowSize = data.width * 4;
  var tmp;
  if (coords[p1 + 1] > coords[p2 + 1]) {
   tmp = p1;
   p1 = p2;
   p2 = tmp;
   tmp = c1;
   c1 = c2;
   c2 = tmp;
  }
  if (coords[p2 + 1] > coords[p3 + 1]) {
   tmp = p2;
   p2 = p3;
   p3 = tmp;
   tmp = c2;
   c2 = c3;
   c3 = tmp;
  }
  if (coords[p1 + 1] > coords[p2 + 1]) {
   tmp = p1;
   p1 = p2;
   p2 = tmp;
   tmp = c1;
   c1 = c2;
   c2 = tmp;
  }
  var x1 = (coords[p1] + context.offsetX) * context.scaleX;
  var y1 = (coords[p1 + 1] + context.offsetY) * context.scaleY;
  var x2 = (coords[p2] + context.offsetX) * context.scaleX;
  var y2 = (coords[p2 + 1] + context.offsetY) * context.scaleY;
  var x3 = (coords[p3] + context.offsetX) * context.scaleX;
  var y3 = (coords[p3 + 1] + context.offsetY) * context.scaleY;
  if (y1 >= y3) {
   return;
  }
  var c1r = colors[c1], c1g = colors[c1 + 1], c1b = colors[c1 + 2];
  var c2r = colors[c2], c2g = colors[c2 + 1], c2b = colors[c2 + 2];
  var c3r = colors[c3], c3g = colors[c3 + 1], c3b = colors[c3 + 2];
  var minY = Math.round(y1), maxY = Math.round(y3);
  var xa, car, cag, cab;
  var xb, cbr, cbg, cbb;
  var k;
  for (var y = minY; y <= maxY; y++) {
   if (y < y2) {
    k = y < y1 ? 0 : y1 === y2 ? 1 : (y1 - y) / (y1 - y2);
    xa = x1 - (x1 - x2) * k;
    car = c1r - (c1r - c2r) * k;
    cag = c1g - (c1g - c2g) * k;
    cab = c1b - (c1b - c2b) * k;
   } else {
    k = y > y3 ? 1 : y2 === y3 ? 0 : (y2 - y) / (y2 - y3);
    xa = x2 - (x2 - x3) * k;
    car = c2r - (c2r - c3r) * k;
    cag = c2g - (c2g - c3g) * k;
    cab = c2b - (c2b - c3b) * k;
   }
   k = y < y1 ? 0 : y > y3 ? 1 : (y1 - y) / (y1 - y3);
   xb = x1 - (x1 - x3) * k;
   cbr = c1r - (c1r - c3r) * k;
   cbg = c1g - (c1g - c3g) * k;
   cbb = c1b - (c1b - c3b) * k;
   var x1_ = Math.round(Math.min(xa, xb));
   var x2_ = Math.round(Math.max(xa, xb));
   var j = rowSize * y + x1_ * 4;
   for (var x = x1_; x <= x2_; x++) {
    k = (xa - x) / (xa - xb);
    k = k < 0 ? 0 : k > 1 ? 1 : k;
    bytes[j++] = car - (car - cbr) * k | 0;
    bytes[j++] = cag - (cag - cbg) * k | 0;
    bytes[j++] = cab - (cab - cbb) * k | 0;
    bytes[j++] = 255;
   }
  }
 }
 function drawFigure(data, figure, context) {
  var ps = figure.coords;
  var cs = figure.colors;
  var i, ii;
  switch (figure.type) {
  case 'lattice':
   var verticesPerRow = figure.verticesPerRow;
   var rows = Math.floor(ps.length / verticesPerRow) - 1;
   var cols = verticesPerRow - 1;
   for (i = 0; i < rows; i++) {
    var q = i * verticesPerRow;
    for (var j = 0; j < cols; j++, q++) {
     drawTriangle(data, context, ps[q], ps[q + 1], ps[q + verticesPerRow], cs[q], cs[q + 1], cs[q + verticesPerRow]);
     drawTriangle(data, context, ps[q + verticesPerRow + 1], ps[q + 1], ps[q + verticesPerRow], cs[q + verticesPerRow + 1], cs[q + 1], cs[q + verticesPerRow]);
    }
   }
   break;
  case 'triangles':
   for (i = 0, ii = ps.length; i < ii; i += 3) {
    drawTriangle(data, context, ps[i], ps[i + 1], ps[i + 2], cs[i], cs[i + 1], cs[i + 2]);
   }
   break;
  default:
   error('illigal figure');
   break;
  }
 }
 function createMeshCanvas(bounds, combinesScale, coords, colors, figures, backgroundColor, cachedCanvases) {
  var EXPECTED_SCALE = 1.1;
  var MAX_PATTERN_SIZE = 3000;
  var BORDER_SIZE = 2;
  var offsetX = Math.floor(bounds[0]);
  var offsetY = Math.floor(bounds[1]);
  var boundsWidth = Math.ceil(bounds[2]) - offsetX;
  var boundsHeight = Math.ceil(bounds[3]) - offsetY;
  var width = Math.min(Math.ceil(Math.abs(boundsWidth * combinesScale[0] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
  var height = Math.min(Math.ceil(Math.abs(boundsHeight * combinesScale[1] * EXPECTED_SCALE)), MAX_PATTERN_SIZE);
  var scaleX = boundsWidth / width;
  var scaleY = boundsHeight / height;
  var context = {
   coords: coords,
   colors: colors,
   offsetX: -offsetX,
   offsetY: -offsetY,
   scaleX: 1 / scaleX,
   scaleY: 1 / scaleY
  };
  var paddedWidth = width + BORDER_SIZE * 2;
  var paddedHeight = height + BORDER_SIZE * 2;
  var canvas, tmpCanvas, i, ii;
  if (WebGLUtils.isEnabled) {
   canvas = WebGLUtils.drawFigures(width, height, backgroundColor, figures, context);
   tmpCanvas = cachedCanvases.getCanvas('mesh', paddedWidth, paddedHeight, false);
   tmpCanvas.context.drawImage(canvas, BORDER_SIZE, BORDER_SIZE);
   canvas = tmpCanvas.canvas;
  } else {
   tmpCanvas = cachedCanvases.getCanvas('mesh', paddedWidth, paddedHeight, false);
   var tmpCtx = tmpCanvas.context;
   var data = tmpCtx.createImageData(width, height);
   if (backgroundColor) {
    var bytes = data.data;
    for (i = 0, ii = bytes.length; i < ii; i += 4) {
     bytes[i] = backgroundColor[0];
     bytes[i + 1] = backgroundColor[1];
     bytes[i + 2] = backgroundColor[2];
     bytes[i + 3] = 255;
    }
   }
   for (i = 0; i < figures.length; i++) {
    drawFigure(data, figures[i], context);
   }
   tmpCtx.putImageData(data, BORDER_SIZE, BORDER_SIZE);
   canvas = tmpCanvas.canvas;
  }
  return {
   canvas: canvas,
   offsetX: offsetX - BORDER_SIZE * scaleX,
   offsetY: offsetY - BORDER_SIZE * scaleY,
   scaleX: scaleX,
   scaleY: scaleY
  };
 }
 return createMeshCanvas;
}();
ShadingIRs.Mesh = {
 fromIR: function Mesh_fromIR(raw) {
  var coords = raw[2];
  var colors = raw[3];
  var figures = raw[4];
  var bounds = raw[5];
  var matrix = raw[6];
  var background = raw[8];
  return {
   type: 'Pattern',
   getPattern: function Mesh_getPattern(ctx, owner, shadingFill) {
    var scale;
    if (shadingFill) {
     scale = Util.singularValueDecompose2dScale(ctx.mozCurrentTransform);
    } else {
     scale = Util.singularValueDecompose2dScale(owner.baseTransform);
     if (matrix) {
      var matrixScale = Util.singularValueDecompose2dScale(matrix);
      scale = [
       scale[0] * matrixScale[0],
       scale[1] * matrixScale[1]
      ];
     }
    }
    var temporaryPatternCanvas = createMeshCanvas(bounds, scale, coords, colors, figures, shadingFill ? null : background, owner.cachedCanvases);
    if (!shadingFill) {
     ctx.setTransform.apply(ctx, owner.baseTransform);
     if (matrix) {
      ctx.transform.apply(ctx, matrix);
     }
    }
    ctx.translate(temporaryPatternCanvas.offsetX, temporaryPatternCanvas.offsetY);
    ctx.scale(temporaryPatternCanvas.scaleX, temporaryPatternCanvas.scaleY);
    return ctx.createPattern(temporaryPatternCanvas.canvas, 'no-repeat');
   }
  };
 }
};
ShadingIRs.Dummy = {
 fromIR: function Dummy_fromIR() {
  return {
   type: 'Pattern',
   getPattern: function Dummy_fromIR_getPattern() {
    return 'hotpink';
   }
  };
 }
};
function getShadingPatternFromIR(raw) {
 var shadingIR = ShadingIRs[raw[0]];
 if (!shadingIR) {
  error('Unknown IR type: ' + raw[0]);
 }
 return shadingIR.fromIR(raw);
}
var TilingPattern = function TilingPatternClosure() {
 var PaintType = {
  COLORED: 1,
  UNCOLORED: 2
 };
 var MAX_PATTERN_SIZE = 3000;
 function TilingPattern(IR, color, ctx, canvasGraphicsFactory, baseTransform) {
  this.operatorList = IR[2];
  this.matrix = IR[3] || [
   1,
   0,
   0,
   1,
   0,
   0
  ];
  this.bbox = IR[4];
  this.xstep = IR[5];
  this.ystep = IR[6];
  this.paintType = IR[7];
  this.tilingType = IR[8];
  this.color = color;
  this.canvasGraphicsFactory = canvasGraphicsFactory;
  this.baseTransform = baseTransform;
  this.type = 'Pattern';
  this.ctx = ctx;
 }
 TilingPattern.prototype = {
  createPatternCanvas: function TilinPattern_createPatternCanvas(owner) {
   var operatorList = this.operatorList;
   var bbox = this.bbox;
   var xstep = this.xstep;
   var ystep = this.ystep;
   var paintType = this.paintType;
   var tilingType = this.tilingType;
   var color = this.color;
   var canvasGraphicsFactory = this.canvasGraphicsFactory;
   info('TilingType: ' + tilingType);
   var x0 = bbox[0], y0 = bbox[1], x1 = bbox[2], y1 = bbox[3];
   var topLeft = [
    x0,
    y0
   ];
   var botRight = [
    x0 + xstep,
    y0 + ystep
   ];
   var width = botRight[0] - topLeft[0];
   var height = botRight[1] - topLeft[1];
   var matrixScale = Util.singularValueDecompose2dScale(this.matrix);
   var curMatrixScale = Util.singularValueDecompose2dScale(this.baseTransform);
   var combinedScale = [
    matrixScale[0] * curMatrixScale[0],
    matrixScale[1] * curMatrixScale[1]
   ];
   width = Math.min(Math.ceil(Math.abs(width * combinedScale[0])), MAX_PATTERN_SIZE);
   height = Math.min(Math.ceil(Math.abs(height * combinedScale[1])), MAX_PATTERN_SIZE);
   var tmpCanvas = owner.cachedCanvases.getCanvas('pattern', width, height, true);
   var tmpCtx = tmpCanvas.context;
   var graphics = canvasGraphicsFactory.createCanvasGraphics(tmpCtx);
   graphics.groupLevel = owner.groupLevel;
   this.setFillAndStrokeStyleToContext(tmpCtx, paintType, color);
   this.setScale(width, height, xstep, ystep);
   this.transformToScale(graphics);
   var tmpTranslate = [
    1,
    0,
    0,
    1,
    -topLeft[0],
    -topLeft[1]
   ];
   graphics.transform.apply(graphics, tmpTranslate);
   this.clipBbox(graphics, bbox, x0, y0, x1, y1);
   graphics.executeOperatorList(operatorList);
   return tmpCanvas.canvas;
  },
  setScale: function TilingPattern_setScale(width, height, xstep, ystep) {
   this.scale = [
    width / xstep,
    height / ystep
   ];
  },
  transformToScale: function TilingPattern_transformToScale(graphics) {
   var scale = this.scale;
   var tmpScale = [
    scale[0],
    0,
    0,
    scale[1],
    0,
    0
   ];
   graphics.transform.apply(graphics, tmpScale);
  },
  scaleToContext: function TilingPattern_scaleToContext() {
   var scale = this.scale;
   this.ctx.scale(1 / scale[0], 1 / scale[1]);
  },
  clipBbox: function clipBbox(graphics, bbox, x0, y0, x1, y1) {
   if (bbox && isArray(bbox) && bbox.length === 4) {
    var bboxWidth = x1 - x0;
    var bboxHeight = y1 - y0;
    graphics.ctx.rect(x0, y0, bboxWidth, bboxHeight);
    graphics.clip();
    graphics.endPath();
   }
  },
  setFillAndStrokeStyleToContext: function setFillAndStrokeStyleToContext(context, paintType, color) {
   switch (paintType) {
   case PaintType.COLORED:
    var ctx = this.ctx;
    context.fillStyle = ctx.fillStyle;
    context.strokeStyle = ctx.strokeStyle;
    break;
   case PaintType.UNCOLORED:
    var cssColor = Util.makeCssRgb(color[0], color[1], color[2]);
    context.fillStyle = cssColor;
    context.strokeStyle = cssColor;
    break;
   default:
    error('Unsupported paint type: ' + paintType);
   }
  },
  getPattern: function TilingPattern_getPattern(ctx, owner) {
   var temporaryPatternCanvas = this.createPatternCanvas(owner);
   ctx = this.ctx;
   ctx.setTransform.apply(ctx, this.baseTransform);
   ctx.transform.apply(ctx, this.matrix);
   this.scaleToContext();
   return ctx.createPattern(temporaryPatternCanvas, 'repeat');
  }
 };
 return TilingPattern;
}();
exports.getShadingPatternFromIR = getShadingPatternFromIR;
exports.TilingPattern = TilingPattern;

/***/ }),
/* 13 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
if (typeof PDFJS === 'undefined' || !PDFJS.compatibilityChecked) {
 var globalScope = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this;
 var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || '';
 var isAndroid = /Android/.test(userAgent);
 var isAndroidPre3 = /Android\s[0-2][^\d]/.test(userAgent);
 var isAndroidPre5 = /Android\s[0-4][^\d]/.test(userAgent);
 var isChrome = userAgent.indexOf('Chrom') >= 0;
 var isChromeWithRangeBug = /Chrome\/(39|40)\./.test(userAgent);
 var isIOSChrome = userAgent.indexOf('CriOS') >= 0;
 var isIE = userAgent.indexOf('Trident') >= 0;
 var isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent);
 var isOpera = userAgent.indexOf('Opera') >= 0;
 var isSafari = /Safari\//.test(userAgent) && !/(Chrome\/|Android\s)/.test(userAgent);
 var hasDOM = typeof window === 'object' && typeof document === 'object';
 if (typeof PDFJS === 'undefined') {
  globalScope.PDFJS = {};
 }
 PDFJS.compatibilityChecked = true;
 (function checkTypedArrayCompatibility() {
  if (typeof Uint8Array !== 'undefined') {
   if (typeof Uint8Array.prototype.subarray === 'undefined') {
    Uint8Array.prototype.subarray = function subarray(start, end) {
     return new Uint8Array(this.slice(start, end));
    };
    Float32Array.prototype.subarray = function subarray(start, end) {
     return new Float32Array(this.slice(start, end));
    };
   }
   if (typeof Float64Array === 'undefined') {
    globalScope.Float64Array = Float32Array;
   }
   return;
  }
  function subarray(start, end) {
   return new TypedArray(this.slice(start, end));
  }
  function setArrayOffset(array, offset) {
   if (arguments.length < 2) {
    offset = 0;
   }
   for (var i = 0, n = array.length; i < n; ++i, ++offset) {
    this[offset] = array[i] & 0xFF;
   }
  }
  function TypedArray(arg1) {
   var result, i, n;
   if (typeof arg1 === 'number') {
    result = [];
    for (i = 0; i < arg1; ++i) {
     result[i] = 0;
    }
   } else if ('slice' in arg1) {
    result = arg1.slice(0);
   } else {
    result = [];
    for (i = 0, n = arg1.length; i < n; ++i) {
     result[i] = arg1[i];
    }
   }
   result.subarray = subarray;
   result.buffer = result;
   result.byteLength = result.length;
   result.set = setArrayOffset;
   if (typeof arg1 === 'object' && arg1.buffer) {
    result.buffer = arg1.buffer;
   }
   return result;
  }
  globalScope.Uint8Array = TypedArray;
  globalScope.Int8Array = TypedArray;
  globalScope.Uint32Array = TypedArray;
  globalScope.Int32Array = TypedArray;
  globalScope.Uint16Array = TypedArray;
  globalScope.Float32Array = TypedArray;
  globalScope.Float64Array = TypedArray;
 }());
 (function normalizeURLObject() {
  if (!globalScope.URL) {
   globalScope.URL = globalScope.webkitURL;
  }
 }());
 (function checkObjectDefinePropertyCompatibility() {
  if (typeof Object.defineProperty !== 'undefined') {
   var definePropertyPossible = true;
   try {
    if (hasDOM) {
     Object.defineProperty(new Image(), 'id', { value: 'test' });
    }
    var Test = function Test() {
    };
    Test.prototype = {
     get id() {
     }
    };
    Object.defineProperty(new Test(), 'id', {
     value: '',
     configurable: true,
     enumerable: true,
     writable: false
    });
   } catch (e) {
    definePropertyPossible = false;
   }
   if (definePropertyPossible) {
    return;
   }
  }
  Object.defineProperty = function objectDefineProperty(obj, name, def) {
   delete obj[name];
   if ('get' in def) {
    obj.__defineGetter__(name, def['get']);
   }
   if ('set' in def) {
    obj.__defineSetter__(name, def['set']);
   }
   if ('value' in def) {
    obj.__defineSetter__(name, function objectDefinePropertySetter(value) {
     this.__defineGetter__(name, function objectDefinePropertyGetter() {
      return value;
     });
     return value;
    });
    obj[name] = def.value;
   }
  };
 }());
 (function checkXMLHttpRequestResponseCompatibility() {
  if (typeof XMLHttpRequest === 'undefined') {
   return;
  }
  var xhrPrototype = XMLHttpRequest.prototype;
  var xhr = new XMLHttpRequest();
  if (!('overrideMimeType' in xhr)) {
   Object.defineProperty(xhrPrototype, 'overrideMimeType', {
    value: function xmlHttpRequestOverrideMimeType(mimeType) {
    }
   });
  }
  if ('responseType' in xhr) {
   return;
  }
  Object.defineProperty(xhrPrototype, 'responseType', {
   get: function xmlHttpRequestGetResponseType() {
    return this._responseType || 'text';
   },
   set: function xmlHttpRequestSetResponseType(value) {
    if (value === 'text' || value === 'arraybuffer') {
     this._responseType = value;
     if (value === 'arraybuffer' && typeof this.overrideMimeType === 'function') {
      this.overrideMimeType('text/plain; charset=x-user-defined');
     }
    }
   }
  });
  if (typeof VBArray !== 'undefined') {
   Object.defineProperty(xhrPrototype, 'response', {
    get: function xmlHttpRequestResponseGet() {
     if (this.responseType === 'arraybuffer') {
      return new Uint8Array(new VBArray(this.responseBody).toArray());
     }
     return this.responseText;
    }
   });
   return;
  }
  Object.defineProperty(xhrPrototype, 'response', {
   get: function xmlHttpRequestResponseGet() {
    if (this.responseType !== 'arraybuffer') {
     return this.responseText;
    }
    var text = this.responseText;
    var i, n = text.length;
    var result = new Uint8Array(n);
    for (i = 0; i < n; ++i) {
     result[i] = text.charCodeAt(i) & 0xFF;
    }
    return result.buffer;
   }
  });
 }());
 (function checkWindowBtoaCompatibility() {
  if ('btoa' in globalScope) {
   return;
  }
  var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  globalScope.btoa = function (chars) {
   var buffer = '';
   var i, n;
   for (i = 0, n = chars.length; i < n; i += 3) {
    var b1 = chars.charCodeAt(i) & 0xFF;
    var b2 = chars.charCodeAt(i + 1) & 0xFF;
    var b3 = chars.charCodeAt(i + 2) & 0xFF;
    var d1 = b1 >> 2, d2 = (b1 & 3) << 4 | b2 >> 4;
    var d3 = i + 1 < n ? (b2 & 0xF) << 2 | b3 >> 6 : 64;
    var d4 = i + 2 < n ? b3 & 0x3F : 64;
    buffer += digits.charAt(d1) + digits.charAt(d2) + digits.charAt(d3) + digits.charAt(d4);
   }
   return buffer;
  };
 }());
 (function checkWindowAtobCompatibility() {
  if ('atob' in globalScope) {
   return;
  }
  var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  globalScope.atob = function (input) {
   input = input.replace(/=+$/, '');
   if (input.length % 4 === 1) {
    throw new Error('bad atob input');
   }
   for (var bc = 0, bs, buffer, idx = 0, output = ''; buffer = input.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
    buffer = digits.indexOf(buffer);
   }
   return output;
  };
 }());
 (function checkFunctionPrototypeBindCompatibility() {
  if (typeof Function.prototype.bind !== 'undefined') {
   return;
  }
  Function.prototype.bind = function functionPrototypeBind(obj) {
   var fn = this, headArgs = Array.prototype.slice.call(arguments, 1);
   var bound = function functionPrototypeBindBound() {
    var args = headArgs.concat(Array.prototype.slice.call(arguments));
    return fn.apply(obj, args);
   };
   return bound;
  };
 }());
 (function checkDatasetProperty() {
  if (!hasDOM) {
   return;
  }
  var div = document.createElement('div');
  if ('dataset' in div) {
   return;
  }
  Object.defineProperty(HTMLElement.prototype, 'dataset', {
   get: function () {
    if (this._dataset) {
     return this._dataset;
    }
    var dataset = {};
    for (var j = 0, jj = this.attributes.length; j < jj; j++) {
     var attribute = this.attributes[j];
     if (attribute.name.substring(0, 5) !== 'data-') {
      continue;
     }
     var key = attribute.name.substring(5).replace(/\-([a-z])/g, function (all, ch) {
      return ch.toUpperCase();
     });
     dataset[key] = attribute.value;
    }
    Object.defineProperty(this, '_dataset', {
     value: dataset,
     writable: false,
     enumerable: false
    });
    return dataset;
   },
   enumerable: true
  });
 }());
 (function checkClassListProperty() {
  function changeList(element, itemName, add, remove) {
   var s = element.className || '';
   var list = s.split(/\s+/g);
   if (list[0] === '') {
    list.shift();
   }
   var index = list.indexOf(itemName);
   if (index < 0 && add) {
    list.push(itemName);
   }
   if (index >= 0 && remove) {
    list.splice(index, 1);
   }
   element.className = list.join(' ');
   return index >= 0;
  }
  if (!hasDOM) {
   return;
  }
  var div = document.createElement('div');
  if ('classList' in div) {
   return;
  }
  var classListPrototype = {
   add: function (name) {
    changeList(this.element, name, true, false);
   },
   contains: function (name) {
    return changeList(this.element, name, false, false);
   },
   remove: function (name) {
    changeList(this.element, name, false, true);
   },
   toggle: function (name) {
    changeList(this.element, name, true, true);
   }
  };
  Object.defineProperty(HTMLElement.prototype, 'classList', {
   get: function () {
    if (this._classList) {
     return this._classList;
    }
    var classList = Object.create(classListPrototype, {
     element: {
      value: this,
      writable: false,
      enumerable: true
     }
    });
    Object.defineProperty(this, '_classList', {
     value: classList,
     writable: false,
     enumerable: false
    });
    return classList;
   },
   enumerable: true
  });
 }());
 (function checkWorkerConsoleCompatibility() {
  if (typeof importScripts === 'undefined' || 'console' in globalScope) {
   return;
  }
  var consoleTimer = {};
  var workerConsole = {
   log: function log() {
    var args = Array.prototype.slice.call(arguments);
    globalScope.postMessage({
     targetName: 'main',
     action: 'console_log',
     data: args
    });
   },
   error: function error() {
    var args = Array.prototype.slice.call(arguments);
    globalScope.postMessage({
     targetName: 'main',
     action: 'console_error',
     data: args
    });
   },
   time: function time(name) {
    consoleTimer[name] = Date.now();
   },
   timeEnd: function timeEnd(name) {
    var time = consoleTimer[name];
    if (!time) {
     throw new Error('Unknown timer name ' + name);
    }
    this.log('Timer:', name, Date.now() - time);
   }
  };
  globalScope.console = workerConsole;
 }());
 (function checkConsoleCompatibility() {
  if (!hasDOM) {
   return;
  }
  if (!('console' in window)) {
   window.console = {
    log: function () {
    },
    error: function () {
    },
    warn: function () {
    }
   };
   return;
  }
  if (!('bind' in console.log)) {
   console.log = function (fn) {
    return function (msg) {
     return fn(msg);
    };
   }(console.log);
   console.error = function (fn) {
    return function (msg) {
     return fn(msg);
    };
   }(console.error);
   console.warn = function (fn) {
    return function (msg) {
     return fn(msg);
    };
   }(console.warn);
   return;
  }
 }());
 (function checkOnClickCompatibility() {
  function ignoreIfTargetDisabled(event) {
   if (isDisabled(event.target)) {
    event.stopPropagation();
   }
  }
  function isDisabled(node) {
   return node.disabled || node.parentNode && isDisabled(node.parentNode);
  }
  if (isOpera) {
   document.addEventListener('click', ignoreIfTargetDisabled, true);
  }
 }());
 (function checkOnBlobSupport() {
  if (isIE || isIOSChrome) {
   PDFJS.disableCreateObjectURL = true;
  }
 }());
 (function checkNavigatorLanguage() {
  if (typeof navigator === 'undefined') {
   return;
  }
  if ('language' in navigator) {
   return;
  }
  PDFJS.locale = navigator.userLanguage || 'en-US';
 }());
 (function checkRangeRequests() {
  if (isSafari || isAndroidPre3 || isChromeWithRangeBug || isIOS) {
   PDFJS.disableRange = true;
   PDFJS.disableStream = true;
  }
 }());
 (function checkHistoryManipulation() {
  if (!hasDOM) {
   return;
  }
  if (!history.pushState || isAndroidPre3) {
   PDFJS.disableHistory = true;
  }
 }());
 (function checkSetPresenceInImageData() {
  if (!hasDOM) {
   return;
  }
  if (window.CanvasPixelArray) {
   if (typeof window.CanvasPixelArray.prototype.set !== 'function') {
    window.CanvasPixelArray.prototype.set = function (arr) {
     for (var i = 0, ii = this.length; i < ii; i++) {
      this[i] = arr[i];
     }
    };
   }
  } else {
   var polyfill = false, versionMatch;
   if (isChrome) {
    versionMatch = userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    polyfill = versionMatch && parseInt(versionMatch[2]) < 21;
   } else if (isAndroid) {
    polyfill = isAndroidPre5;
   } else if (isSafari) {
    versionMatch = userAgent.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//);
    polyfill = versionMatch && parseInt(versionMatch[1]) < 6;
   }
   if (polyfill) {
    var contextPrototype = window.CanvasRenderingContext2D.prototype;
    var createImageData = contextPrototype.createImageData;
    contextPrototype.createImageData = function (w, h) {
     var imageData = createImageData.call(this, w, h);
     imageData.data.set = function (arr) {
      for (var i = 0, ii = this.length; i < ii; i++) {
       this[i] = arr[i];
      }
     };
     return imageData;
    };
    contextPrototype = null;
   }
  }
 }());
 (function checkRequestAnimationFrame() {
  function fakeRequestAnimationFrame(callback) {
   window.setTimeout(callback, 20);
  }
  if (!hasDOM) {
   return;
  }
  if (isIOS) {
   window.requestAnimationFrame = fakeRequestAnimationFrame;
   return;
  }
  if ('requestAnimationFrame' in window) {
   return;
  }
  window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || fakeRequestAnimationFrame;
 }());
 (function checkCanvasSizeLimitation() {
  if (isIOS || isAndroid) {
   PDFJS.maxCanvasPixels = 5242880;
  }
 }());
 (function checkFullscreenSupport() {
  if (!hasDOM) {
   return;
  }
  if (isIE && window.parent !== window) {
   PDFJS.disableFullscreen = true;
  }
 }());
 (function checkCurrentScript() {
  if (!hasDOM) {
   return;
  }
  if ('currentScript' in document) {
   return;
  }
  Object.defineProperty(document, 'currentScript', {
   get: function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
   },
   enumerable: true,
   configurable: true
  });
 }());
 (function checkInputTypeNumberAssign() {
  if (!hasDOM) {
   return;
  }
  var el = document.createElement('input');
  try {
   el.type = 'number';
  } catch (ex) {
   var inputProto = el.constructor.prototype;
   var typeProperty = Object.getOwnPropertyDescriptor(inputProto, 'type');
   Object.defineProperty(inputProto, 'type', {
    get: function () {
     return typeProperty.get.call(this);
    },
    set: function (value) {
     typeProperty.set.call(this, value === 'number' ? 'text' : value);
    },
    enumerable: true,
    configurable: true
   });
  }
 }());
 (function checkDocumentReadyState() {
  if (!hasDOM) {
   return;
  }
  if (!document.attachEvent) {
   return;
  }
  var documentProto = document.constructor.prototype;
  var readyStateProto = Object.getOwnPropertyDescriptor(documentProto, 'readyState');
  Object.defineProperty(documentProto, 'readyState', {
   get: function () {
    var value = readyStateProto.get.call(this);
    return value === 'interactive' ? 'loading' : value;
   },
   set: function (value) {
    readyStateProto.set.call(this, value);
   },
   enumerable: true,
   configurable: true
  });
 }());
 (function checkChildNodeRemove() {
  if (!hasDOM) {
   return;
  }
  if (typeof Element.prototype.remove !== 'undefined') {
   return;
  }
  Element.prototype.remove = function () {
   if (this.parentNode) {
    this.parentNode.removeChild(this);
   }
  };
 }());
 (function checkPromise() {
  if (globalScope.Promise) {
   if (typeof globalScope.Promise.all !== 'function') {
    globalScope.Promise.all = function (iterable) {
     var count = 0, results = [], resolve, reject;
     var promise = new globalScope.Promise(function (resolve_, reject_) {
      resolve = resolve_;
      reject = reject_;
     });
     iterable.forEach(function (p, i) {
      count++;
      p.then(function (result) {
       results[i] = result;
       count--;
       if (count === 0) {
        resolve(results);
       }
      }, reject);
     });
     if (count === 0) {
      resolve(results);
     }
     return promise;
    };
   }
   if (typeof globalScope.Promise.resolve !== 'function') {
    globalScope.Promise.resolve = function (value) {
     return new globalScope.Promise(function (resolve) {
      resolve(value);
     });
    };
   }
   if (typeof globalScope.Promise.reject !== 'function') {
    globalScope.Promise.reject = function (reason) {
     return new globalScope.Promise(function (resolve, reject) {
      reject(reason);
     });
    };
   }
   if (typeof globalScope.Promise.prototype.catch !== 'function') {
    globalScope.Promise.prototype.catch = function (onReject) {
     return globalScope.Promise.prototype.then(undefined, onReject);
    };
   }
   return;
  }
  var STATUS_PENDING = 0;
  var STATUS_RESOLVED = 1;
  var STATUS_REJECTED = 2;
  var REJECTION_TIMEOUT = 500;
  var HandlerManager = {
   handlers: [],
   running: false,
   unhandledRejections: [],
   pendingRejectionCheck: false,
   scheduleHandlers: function scheduleHandlers(promise) {
    if (promise._status === STATUS_PENDING) {
     return;
    }
    this.handlers = this.handlers.concat(promise._handlers);
    promise._handlers = [];
    if (this.running) {
     return;
    }
    this.running = true;
    setTimeout(this.runHandlers.bind(this), 0);
   },
   runHandlers: function runHandlers() {
    var RUN_TIMEOUT = 1;
    var timeoutAt = Date.now() + RUN_TIMEOUT;
    while (this.handlers.length > 0) {
     var handler = this.handlers.shift();
     var nextStatus = handler.thisPromise._status;
     var nextValue = handler.thisPromise._value;
     try {
      if (nextStatus === STATUS_RESOLVED) {
       if (typeof handler.onResolve === 'function') {
        nextValue = handler.onResolve(nextValue);
       }
      } else if (typeof handler.onReject === 'function') {
       nextValue = handler.onReject(nextValue);
       nextStatus = STATUS_RESOLVED;
       if (handler.thisPromise._unhandledRejection) {
        this.removeUnhandeledRejection(handler.thisPromise);
       }
      }
     } catch (ex) {
      nextStatus = STATUS_REJECTED;
      nextValue = ex;
     }
     handler.nextPromise._updateStatus(nextStatus, nextValue);
     if (Date.now() >= timeoutAt) {
      break;
     }
    }
    if (this.handlers.length > 0) {
     setTimeout(this.runHandlers.bind(this), 0);
     return;
    }
    this.running = false;
   },
   addUnhandledRejection: function addUnhandledRejection(promise) {
    this.unhandledRejections.push({
     promise: promise,
     time: Date.now()
    });
    this.scheduleRejectionCheck();
   },
   removeUnhandeledRejection: function removeUnhandeledRejection(promise) {
    promise._unhandledRejection = false;
    for (var i = 0; i < this.unhandledRejections.length; i++) {
     if (this.unhandledRejections[i].promise === promise) {
      this.unhandledRejections.splice(i);
      i--;
     }
    }
   },
   scheduleRejectionCheck: function scheduleRejectionCheck() {
    if (this.pendingRejectionCheck) {
     return;
    }
    this.pendingRejectionCheck = true;
    setTimeout(function rejectionCheck() {
     this.pendingRejectionCheck = false;
     var now = Date.now();
     for (var i = 0; i < this.unhandledRejections.length; i++) {
      if (now - this.unhandledRejections[i].time > REJECTION_TIMEOUT) {
       var unhandled = this.unhandledRejections[i].promise._value;
       var msg = 'Unhandled rejection: ' + unhandled;
       if (unhandled.stack) {
        msg += '\n' + unhandled.stack;
       }
       try {
        throw new Error(msg);
       } catch (_) {
        console.warn(msg);
       }
       this.unhandledRejections.splice(i);
       i--;
      }
     }
     if (this.unhandledRejections.length) {
      this.scheduleRejectionCheck();
     }
    }.bind(this), REJECTION_TIMEOUT);
   }
  };
  var Promise = function Promise(resolver) {
   this._status = STATUS_PENDING;
   this._handlers = [];
   try {
    resolver.call(this, this._resolve.bind(this), this._reject.bind(this));
   } catch (e) {
    this._reject(e);
   }
  };
  Promise.all = function Promise_all(promises) {
   var resolveAll, rejectAll;
   var deferred = new Promise(function (resolve, reject) {
    resolveAll = resolve;
    rejectAll = reject;
   });
   var unresolved = promises.length;
   var results = [];
   if (unresolved === 0) {
    resolveAll(results);
    return deferred;
   }
   function reject(reason) {
    if (deferred._status === STATUS_REJECTED) {
     return;
    }
    results = [];
    rejectAll(reason);
   }
   for (var i = 0, ii = promises.length; i < ii; ++i) {
    var promise = promises[i];
    var resolve = function (i) {
     return function (value) {
      if (deferred._status === STATUS_REJECTED) {
       return;
      }
      results[i] = value;
      unresolved--;
      if (unresolved === 0) {
       resolveAll(results);
      }
     };
    }(i);
    if (Promise.isPromise(promise)) {
     promise.then(resolve, reject);
    } else {
     resolve(promise);
    }
   }
   return deferred;
  };
  Promise.isPromise = function Promise_isPromise(value) {
   return value && typeof value.then === 'function';
  };
  Promise.resolve = function Promise_resolve(value) {
   return new Promise(function (resolve) {
    resolve(value);
   });
  };
  Promise.reject = function Promise_reject(reason) {
   return new Promise(function (resolve, reject) {
    reject(reason);
   });
  };
  Promise.prototype = {
   _status: null,
   _value: null,
   _handlers: null,
   _unhandledRejection: null,
   _updateStatus: function Promise__updateStatus(status, value) {
    if (this._status === STATUS_RESOLVED || this._status === STATUS_REJECTED) {
     return;
    }
    if (status === STATUS_RESOLVED && Promise.isPromise(value)) {
     value.then(this._updateStatus.bind(this, STATUS_RESOLVED), this._updateStatus.bind(this, STATUS_REJECTED));
     return;
    }
    this._status = status;
    this._value = value;
    if (status === STATUS_REJECTED && this._handlers.length === 0) {
     this._unhandledRejection = true;
     HandlerManager.addUnhandledRejection(this);
    }
    HandlerManager.scheduleHandlers(this);
   },
   _resolve: function Promise_resolve(value) {
    this._updateStatus(STATUS_RESOLVED, value);
   },
   _reject: function Promise_reject(reason) {
    this._updateStatus(STATUS_REJECTED, reason);
   },
   then: function Promise_then(onResolve, onReject) {
    var nextPromise = new Promise(function (resolve, reject) {
     this.resolve = resolve;
     this.reject = reject;
    });
    this._handlers.push({
     thisPromise: this,
     onResolve: onResolve,
     onReject: onReject,
     nextPromise: nextPromise
    });
    HandlerManager.scheduleHandlers(this);
    return nextPromise;
   },
   catch: function Promise_catch(onReject) {
    return this.then(undefined, onReject);
   }
  };
  globalScope.Promise = Promise;
 }());
 (function checkWeakMap() {
  if (globalScope.WeakMap) {
   return;
  }
  var id = 0;
  function WeakMap() {
   this.id = '$weakmap' + id++;
  }
  WeakMap.prototype = {
   has: function (obj) {
    return !!Object.getOwnPropertyDescriptor(obj, this.id);
   },
   get: function (obj, defaultValue) {
    return this.has(obj) ? obj[this.id] : defaultValue;
   },
   set: function (obj, value) {
    Object.defineProperty(obj, this.id, {
     value: value,
     enumerable: false,
     configurable: true
    });
   },
   delete: function (obj) {
    delete obj[this.id];
   }
  };
  globalScope.WeakMap = WeakMap;
 }());
 (function checkURLConstructor() {
  var hasWorkingUrl = false;
  try {
   if (typeof URL === 'function' && typeof URL.prototype === 'object' && 'origin' in URL.prototype) {
    var u = new URL('b', 'http://a');
    u.pathname = 'c%20d';
    hasWorkingUrl = u.href === 'http://a/c%20d';
   }
  } catch (e) {
  }
  if (hasWorkingUrl) {
   return;
  }
  var relative = Object.create(null);
  relative['ftp'] = 21;
  relative['file'] = 0;
  relative['gopher'] = 70;
  relative['http'] = 80;
  relative['https'] = 443;
  relative['ws'] = 80;
  relative['wss'] = 443;
  var relativePathDotMapping = Object.create(null);
  relativePathDotMapping['%2e'] = '.';
  relativePathDotMapping['.%2e'] = '..';
  relativePathDotMapping['%2e.'] = '..';
  relativePathDotMapping['%2e%2e'] = '..';
  function isRelativeScheme(scheme) {
   return relative[scheme] !== undefined;
  }
  function invalid() {
   clear.call(this);
   this._isInvalid = true;
  }
  function IDNAToASCII(h) {
   if (h === '') {
    invalid.call(this);
   }
   return h.toLowerCase();
  }
  function percentEscape(c) {
   var unicode = c.charCodeAt(0);
   if (unicode > 0x20 && unicode < 0x7F && [
     0x22,
     0x23,
     0x3C,
     0x3E,
     0x3F,
     0x60
    ].indexOf(unicode) === -1) {
    return c;
   }
   return encodeURIComponent(c);
  }
  function percentEscapeQuery(c) {
   var unicode = c.charCodeAt(0);
   if (unicode > 0x20 && unicode < 0x7F && [
     0x22,
     0x23,
     0x3C,
     0x3E,
     0x60
    ].indexOf(unicode) === -1) {
    return c;
   }
   return encodeURIComponent(c);
  }
  var EOF, ALPHA = /[a-zA-Z]/, ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;
  function parse(input, stateOverride, base) {
   function err(message) {
    errors.push(message);
   }
   var state = stateOverride || 'scheme start', cursor = 0, buffer = '', seenAt = false, seenBracket = false, errors = [];
   loop:
    while ((input[cursor - 1] !== EOF || cursor === 0) && !this._isInvalid) {
     var c = input[cursor];
     switch (state) {
     case 'scheme start':
      if (c && ALPHA.test(c)) {
       buffer += c.toLowerCase();
       state = 'scheme';
      } else if (!stateOverride) {
       buffer = '';
       state = 'no scheme';
       continue;
      } else {
       err('Invalid scheme.');
       break loop;
      }
      break;
     case 'scheme':
      if (c && ALPHANUMERIC.test(c)) {
       buffer += c.toLowerCase();
      } else if (c === ':') {
       this._scheme = buffer;
       buffer = '';
       if (stateOverride) {
        break loop;
       }
       if (isRelativeScheme(this._scheme)) {
        this._isRelative = true;
       }
       if (this._scheme === 'file') {
        state = 'relative';
       } else if (this._isRelative && base && base._scheme === this._scheme) {
        state = 'relative or authority';
       } else if (this._isRelative) {
        state = 'authority first slash';
       } else {
        state = 'scheme data';
       }
      } else if (!stateOverride) {
       buffer = '';
       cursor = 0;
       state = 'no scheme';
       continue;
      } else if (EOF === c) {
       break loop;
      } else {
       err('Code point not allowed in scheme: ' + c);
       break loop;
      }
      break;
     case 'scheme data':
      if (c === '?') {
       this._query = '?';
       state = 'query';
      } else if (c === '#') {
       this._fragment = '#';
       state = 'fragment';
      } else {
       if (EOF !== c && '\t' !== c && '\n' !== c && '\r' !== c) {
        this._schemeData += percentEscape(c);
       }
      }
      break;
     case 'no scheme':
      if (!base || !isRelativeScheme(base._scheme)) {
       err('Missing scheme.');
       invalid.call(this);
      } else {
       state = 'relative';
       continue;
      }
      break;
     case 'relative or authority':
      if (c === '/' && input[cursor + 1] === '/') {
       state = 'authority ignore slashes';
      } else {
       err('Expected /, got: ' + c);
       state = 'relative';
       continue;
      }
      break;
     case 'relative':
      this._isRelative = true;
      if ('file' !== this._scheme) {
       this._scheme = base._scheme;
      }
      if (EOF === c) {
       this._host = base._host;
       this._port = base._port;
       this._path = base._path.slice();
       this._query = base._query;
       this._username = base._username;
       this._password = base._password;
       break loop;
      } else if (c === '/' || c === '\\') {
       if (c === '\\') {
        err('\\ is an invalid code point.');
       }
       state = 'relative slash';
      } else if (c === '?') {
       this._host = base._host;
       this._port = base._port;
       this._path = base._path.slice();
       this._query = '?';
       this._username = base._username;
       this._password = base._password;
       state = 'query';
      } else if (c === '#') {
       this._host = base._host;
       this._port = base._port;
       this._path = base._path.slice();
       this._query = base._query;
       this._fragment = '#';
       this._username = base._username;
       this._password = base._password;
       state = 'fragment';
      } else {
       var nextC = input[cursor + 1];
       var nextNextC = input[cursor + 2];
       if ('file' !== this._scheme || !ALPHA.test(c) || nextC !== ':' && nextC !== '|' || EOF !== nextNextC && '/' !== nextNextC && '\\' !== nextNextC && '?' !== nextNextC && '#' !== nextNextC) {
        this._host = base._host;
        this._port = base._port;
        this._username = base._username;
        this._password = base._password;
        this._path = base._path.slice();
        this._path.pop();
       }
       state = 'relative path';
       continue;
      }
      break;
     case 'relative slash':
      if (c === '/' || c === '\\') {
       if (c === '\\') {
        err('\\ is an invalid code point.');
       }
       if (this._scheme === 'file') {
        state = 'file host';
       } else {
        state = 'authority ignore slashes';
       }
      } else {
       if ('file' !== this._scheme) {
        this._host = base._host;
        this._port = base._port;
        this._username = base._username;
        this._password = base._password;
       }
       state = 'relative path';
       continue;
      }
      break;
     case 'authority first slash':
      if (c === '/') {
       state = 'authority second slash';
      } else {
       err('Expected \'/\', got: ' + c);
       state = 'authority ignore slashes';
       continue;
      }
      break;
     case 'authority second slash':
      state = 'authority ignore slashes';
      if ('/' !== c) {
       err('Expected \'/\', got: ' + c);
       continue;
      }
      break;
     case 'authority ignore slashes':
      if ('/' !== c && '\\' !== c) {
       state = 'authority';
       continue;
      } else {
       err('Expected authority, got: ' + c);
      }
      break;
     case 'authority':
      if (c === '@') {
       if (seenAt) {
        err('@ already seen.');
        buffer += '%40';
       }
       seenAt = true;
       for (var i = 0; i < buffer.length; i++) {
        var cp = buffer[i];
        if (cp === '\t' || cp === '\n' || cp === '\r') {
         err('Invalid whitespace in authority.');
         continue;
        }
        if (cp === ':' && this._password === null) {
         this._password = '';
         continue;
        }
        var tempC = percentEscape(cp);
        if (null !== this._password) {
         this._password += tempC;
        } else {
         this._username += tempC;
        }
       }
       buffer = '';
      } else if (c === EOF || c === '/' || c === '\\' || c === '?' || c === '#') {
       cursor -= buffer.length;
       buffer = '';
       state = 'host';
       continue;
      } else {
       buffer += c;
      }
      break;
     case 'file host':
      if (c === EOF || c === '/' || c === '\\' || c === '?' || c === '#') {
       if (buffer.length === 2 && ALPHA.test(buffer[0]) && (buffer[1] === ':' || buffer[1] === '|')) {
        state = 'relative path';
       } else if (buffer.length === 0) {
        state = 'relative path start';
       } else {
        this._host = IDNAToASCII.call(this, buffer);
        buffer = '';
        state = 'relative path start';
       }
       continue;
      } else if (c === '\t' || c === '\n' || c === '\r') {
       err('Invalid whitespace in file host.');
      } else {
       buffer += c;
      }
      break;
     case 'host':
     case 'hostname':
      if (c === ':' && !seenBracket) {
       this._host = IDNAToASCII.call(this, buffer);
       buffer = '';
       state = 'port';
       if (stateOverride === 'hostname') {
        break loop;
       }
      } else if (c === EOF || c === '/' || c === '\\' || c === '?' || c === '#') {
       this._host = IDNAToASCII.call(this, buffer);
       buffer = '';
       state = 'relative path start';
       if (stateOverride) {
        break loop;
       }
       continue;
      } else if ('\t' !== c && '\n' !== c && '\r' !== c) {
       if (c === '[') {
        seenBracket = true;
       } else if (c === ']') {
        seenBracket = false;
       }
       buffer += c;
      } else {
       err('Invalid code point in host/hostname: ' + c);
      }
      break;
     case 'port':
      if (/[0-9]/.test(c)) {
       buffer += c;
      } else if (c === EOF || c === '/' || c === '\\' || c === '?' || c === '#' || stateOverride) {
       if ('' !== buffer) {
        var temp = parseInt(buffer, 10);
        if (temp !== relative[this._scheme]) {
         this._port = temp + '';
        }
        buffer = '';
       }
       if (stateOverride) {
        break loop;
       }
       state = 'relative path start';
       continue;
      } else if (c === '\t' || c === '\n' || c === '\r') {
       err('Invalid code point in port: ' + c);
      } else {
       invalid.call(this);
      }
      break;
     case 'relative path start':
      if (c === '\\') {
       err('\'\\\' not allowed in path.');
      }
      state = 'relative path';
      if ('/' !== c && '\\' !== c) {
       continue;
      }
      break;
     case 'relative path':
      if (c === EOF || c === '/' || c === '\\' || !stateOverride && (c === '?' || c === '#')) {
       if (c === '\\') {
        err('\\ not allowed in relative path.');
       }
       var tmp;
       if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
        buffer = tmp;
       }
       if (buffer === '..') {
        this._path.pop();
        if ('/' !== c && '\\' !== c) {
         this._path.push('');
        }
       } else if (buffer === '.' && '/' !== c && '\\' !== c) {
        this._path.push('');
       } else if ('.' !== buffer) {
        if (this._scheme === 'file' && this._path.length === 0 && buffer.length === 2 && ALPHA.test(buffer[0]) && buffer[1] === '|') {
         buffer = buffer[0] + ':';
        }
        this._path.push(buffer);
       }
       buffer = '';
       if (c === '?') {
        this._query = '?';
        state = 'query';
       } else if (c === '#') {
        this._fragment = '#';
        state = 'fragment';
       }
      } else if ('\t' !== c && '\n' !== c && '\r' !== c) {
       buffer += percentEscape(c);
      }
      break;
     case 'query':
      if (!stateOverride && c === '#') {
       this._fragment = '#';
       state = 'fragment';
      } else if (EOF !== c && '\t' !== c && '\n' !== c && '\r' !== c) {
       this._query += percentEscapeQuery(c);
      }
      break;
     case 'fragment':
      if (EOF !== c && '\t' !== c && '\n' !== c && '\r' !== c) {
       this._fragment += c;
      }
      break;
     }
     cursor++;
    }
  }
  function clear() {
   this._scheme = '';
   this._schemeData = '';
   this._username = '';
   this._password = null;
   this._host = '';
   this._port = '';
   this._path = [];
   this._query = '';
   this._fragment = '';
   this._isInvalid = false;
   this._isRelative = false;
  }
  function JURL(url, base) {
   if (base !== undefined && !(base instanceof JURL)) {
    base = new JURL(String(base));
   }
   this._url = url;
   clear.call(this);
   var input = url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, '');
   parse.call(this, input, null, base);
  }
  JURL.prototype = {
   toString: function () {
    return this.href;
   },
   get href() {
    if (this._isInvalid) {
     return this._url;
    }
    var authority = '';
    if ('' !== this._username || null !== this._password) {
     authority = this._username + (null !== this._password ? ':' + this._password : '') + '@';
    }
    return this.protocol + (this._isRelative ? '//' + authority + this.host : '') + this.pathname + this._query + this._fragment;
   },
   set href(href) {
    clear.call(this);
    parse.call(this, href);
   },
   get protocol() {
    return this._scheme + ':';
   },
   set protocol(protocol) {
    if (this._isInvalid) {
     return;
    }
    parse.call(this, protocol + ':', 'scheme start');
   },
   get host() {
    return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
   },
   set host(host) {
    if (this._isInvalid || !this._isRelative) {
     return;
    }
    parse.call(this, host, 'host');
   },
   get hostname() {
    return this._host;
   },
   set hostname(hostname) {
    if (this._isInvalid || !this._isRelative) {
     return;
    }
    parse.call(this, hostname, 'hostname');
   },
   get port() {
    return this._port;
   },
   set port(port) {
    if (this._isInvalid || !this._isRelative) {
     return;
    }
    parse.call(this, port, 'port');
   },
   get pathname() {
    return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
   },
   set pathname(pathname) {
    if (this._isInvalid || !this._isRelative) {
     return;
    }
    this._path = [];
    parse.call(this, pathname, 'relative path start');
   },
   get search() {
    return this._isInvalid || !this._query || this._query === '?' ? '' : this._query;
   },
   set search(search) {
    if (this._isInvalid || !this._isRelative) {
     return;
    }
    this._query = '?';
    if (search[0] === '?') {
     search = search.slice(1);
    }
    parse.call(this, search, 'query');
   },
   get hash() {
    return this._isInvalid || !this._fragment || this._fragment === '#' ? '' : this._fragment;
   },
   set hash(hash) {
    if (this._isInvalid) {
     return;
    }
    this._fragment = '#';
    if (hash[0] === '#') {
     hash = hash.slice(1);
    }
    parse.call(this, hash, 'fragment');
   },
   get origin() {
    var host;
    if (this._isInvalid || !this._scheme) {
     return '';
    }
    switch (this._scheme) {
    case 'data':
    case 'file':
    case 'javascript':
    case 'mailto':
     return 'null';
    }
    host = this.host;
    if (!host) {
     return '';
    }
    return this._scheme + '://' + host;
   }
  };
  var OriginalURL = globalScope.URL;
  if (OriginalURL) {
   JURL.createObjectURL = function (blob) {
    return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
   };
   JURL.revokeObjectURL = function (url) {
    OriginalURL.revokeObjectURL(url);
   };
  }
  globalScope.URL = JURL;
 }());
}
/* WEBPACK VAR INJECTION */}.call(exports, __w_pdfjs_require__(6)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var pdfjsVersion = '1.7.354';
var pdfjsBuild = '0f7548ba';
var pdfjsSharedUtil = __w_pdfjs_require__(0);
var pdfjsDisplayGlobal = __w_pdfjs_require__(9);
var pdfjsDisplayAPI = __w_pdfjs_require__(3);
var pdfjsDisplayTextLayer = __w_pdfjs_require__(5);
var pdfjsDisplayAnnotationLayer = __w_pdfjs_require__(2);
var pdfjsDisplayDOMUtils = __w_pdfjs_require__(1);
var pdfjsDisplaySVG = __w_pdfjs_require__(4);
exports.PDFJS = pdfjsDisplayGlobal.PDFJS;
exports.build = pdfjsDisplayAPI.build;
exports.version = pdfjsDisplayAPI.version;
exports.getDocument = pdfjsDisplayAPI.getDocument;
exports.PDFDataRangeTransport = pdfjsDisplayAPI.PDFDataRangeTransport;
exports.PDFWorker = pdfjsDisplayAPI.PDFWorker;
exports.renderTextLayer = pdfjsDisplayTextLayer.renderTextLayer;
exports.AnnotationLayer = pdfjsDisplayAnnotationLayer.AnnotationLayer;
exports.CustomStyle = pdfjsDisplayDOMUtils.CustomStyle;
exports.createPromiseCapability = pdfjsSharedUtil.createPromiseCapability;
exports.PasswordResponses = pdfjsSharedUtil.PasswordResponses;
exports.InvalidPDFException = pdfjsSharedUtil.InvalidPDFException;
exports.MissingPDFException = pdfjsSharedUtil.MissingPDFException;
exports.SVGGraphics = pdfjsDisplaySVG.SVGGraphics;
exports.UnexpectedResponseException = pdfjsSharedUtil.UnexpectedResponseException;
exports.OPS = pdfjsSharedUtil.OPS;
exports.UNSUPPORTED_FEATURES = pdfjsSharedUtil.UNSUPPORTED_FEATURES;
exports.isValidUrl = pdfjsDisplayDOMUtils.isValidUrl;
exports.createValidAbsoluteUrl = pdfjsSharedUtil.createValidAbsoluteUrl;
exports.createObjectURL = pdfjsSharedUtil.createObjectURL;
exports.removeNullCharacters = pdfjsSharedUtil.removeNullCharacters;
exports.shadow = pdfjsSharedUtil.shadow;
exports.createBlob = pdfjsSharedUtil.createBlob;
exports.getFilenameFromUrl = pdfjsDisplayDOMUtils.getFilenameFromUrl;
exports.addLinkAttributes = pdfjsDisplayDOMUtils.addLinkAttributes;

/***/ })
/******/ ]);
});/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var FontInspector = (function FontInspectorClosure() {
  var fonts;
  var active = false;
  var fontAttribute = 'data-font-name';
  function removeSelection() {
    var divs = document.querySelectorAll('div[' + fontAttribute + ']');
    for (var i = 0, ii = divs.length; i < ii; ++i) {
      var div = divs[i];
      div.className = '';
    }
  }
  function resetSelection() {
    var divs = document.querySelectorAll('div[' + fontAttribute + ']');
    for (var i = 0, ii = divs.length; i < ii; ++i) {
      var div = divs[i];
      div.className = 'debuggerHideText';
    }
  }
  function selectFont(fontName, show) {
    var divs = document.querySelectorAll('div[' + fontAttribute + '=' +
                                         fontName + ']');
    for (var i = 0, ii = divs.length; i < ii; ++i) {
      var div = divs[i];
      div.className = show ? 'debuggerShowText' : 'debuggerHideText';
    }
  }
  function textLayerClick(e) {
    if (!e.target.dataset.fontName ||
        e.target.tagName.toUpperCase() !== 'DIV') {
      return;
    }
    var fontName = e.target.dataset.fontName;
    var selects = document.getElementsByTagName('input');
    for (var i = 0; i < selects.length; ++i) {
      var select = selects[i];
      if (select.dataset.fontName !== fontName) {
        continue;
      }
      select.checked = !select.checked;
      selectFont(fontName, select.checked);
      select.scrollIntoView();
    }
  }
  return {
    // Properties/functions needed by PDFBug.
    id: 'FontInspector',
    name: 'Font Inspector',
    panel: null,
    manager: null,
    init: function init(pdfjsLib) {
      var panel = this.panel;
      panel.setAttribute('style', 'padding: 5px;');
      var tmp = document.createElement('button');
      tmp.addEventListener('click', resetSelection);
      tmp.textContent = 'Refresh';
      panel.appendChild(tmp);

      fonts = document.createElement('div');
      panel.appendChild(fonts);
    },
    cleanup: function cleanup() {
      fonts.textContent = '';
    },
    enabled: false,
    get active() {
      return active;
    },
    set active(value) {
      active = value;
      if (active) {
        document.body.addEventListener('click', textLayerClick, true);
        resetSelection();
      } else {
        document.body.removeEventListener('click', textLayerClick, true);
        removeSelection();
      }
    },
    // FontInspector specific functions.
    fontAdded: function fontAdded(fontObj, url) {
      function properties(obj, list) {
        var moreInfo = document.createElement('table');
        for (var i = 0; i < list.length; i++) {
          var tr = document.createElement('tr');
          var td1 = document.createElement('td');
          td1.textContent = list[i];
          tr.appendChild(td1);
          var td2 = document.createElement('td');
          td2.textContent = obj[list[i]].toString();
          tr.appendChild(td2);
          moreInfo.appendChild(tr);
        }
        return moreInfo;
      }
      var moreInfo = properties(fontObj, ['name', 'type']);
      var fontName = fontObj.loadedName;
      var font = document.createElement('div');
      var name = document.createElement('span');
      name.textContent = fontName;
      var download = document.createElement('a');
      if (url) {
        url = /url\(['"]?([^\)"']+)/.exec(url);
        download.href = url[1];
      } else if (fontObj.data) {
        url = URL.createObjectURL(new Blob([fontObj.data], {
          type: fontObj.mimeType
        }));
        download.href = url;
      }
      download.textContent = 'Download';
      var logIt = document.createElement('a');
      logIt.href = '';
      logIt.textContent = 'Log';
      logIt.addEventListener('click', function(event) {
        event.preventDefault();
        console.log(fontObj);
      });
      var select = document.createElement('input');
      select.setAttribute('type', 'checkbox');
      select.dataset.fontName = fontName;
      select.addEventListener('click', (function(select, fontName) {
        return (function() {
           selectFont(fontName, select.checked);
        });
      })(select, fontName));
      font.appendChild(select);
      font.appendChild(name);
      font.appendChild(document.createTextNode(' '));
      font.appendChild(download);
      font.appendChild(document.createTextNode(' '));
      font.appendChild(logIt);
      font.appendChild(moreInfo);
      fonts.appendChild(font);
      // Somewhat of a hack, should probably add a hook for when the text layer
      // is done rendering.
      setTimeout(function() {
        if (this.active) {
          resetSelection();
        }
      }.bind(this), 2000);
    }
  };
})();

var opMap;

// Manages all the page steppers.
var StepperManager = (function StepperManagerClosure() {
  var steppers = [];
  var stepperDiv = null;
  var stepperControls = null;
  var stepperChooser = null;
  var breakPoints = Object.create(null);
  return {
    // Properties/functions needed by PDFBug.
    id: 'Stepper',
    name: 'Stepper',
    panel: null,
    manager: null,
    init: function init(pdfjsLib) {
      var self = this;
      this.panel.setAttribute('style', 'padding: 5px;');
      stepperControls = document.createElement('div');
      stepperChooser = document.createElement('select');
      stepperChooser.addEventListener('change', function(event) {
        self.selectStepper(this.value);
      });
      stepperControls.appendChild(stepperChooser);
      stepperDiv = document.createElement('div');
      this.panel.appendChild(stepperControls);
      this.panel.appendChild(stepperDiv);
      if (sessionStorage.getItem('pdfjsBreakPoints')) {
        breakPoints = JSON.parse(sessionStorage.getItem('pdfjsBreakPoints'));
      }

      opMap = Object.create(null);
      for (var key in pdfjsLib.OPS) {
        opMap[pdfjsLib.OPS[key]] = key;
      }
    },
    cleanup: function cleanup() {
      stepperChooser.textContent = '';
      stepperDiv.textContent = '';
      steppers = [];
    },
    enabled: false,
    active: false,
    // Stepper specific functions.
    create: function create(pageIndex) {
      var debug = document.createElement('div');
      debug.id = 'stepper' + pageIndex;
      debug.setAttribute('hidden', true);
      debug.className = 'stepper';
      stepperDiv.appendChild(debug);
      var b = document.createElement('option');
      b.textContent = 'Page ' + (pageIndex + 1);
      b.value = pageIndex;
      stepperChooser.appendChild(b);
      var initBreakPoints = breakPoints[pageIndex] || [];
      var stepper = new Stepper(debug, pageIndex, initBreakPoints);
      steppers.push(stepper);
      if (steppers.length === 1) {
        this.selectStepper(pageIndex, false);
      }
      return stepper;
    },
    selectStepper: function selectStepper(pageIndex, selectPanel) {
      var i;
      pageIndex = pageIndex | 0;
      if (selectPanel) {
        this.manager.selectPanel(this);
      }
      for (i = 0; i < steppers.length; ++i) {
        var stepper = steppers[i];
        if (stepper.pageIndex === pageIndex) {
          stepper.panel.removeAttribute('hidden');
        } else {
          stepper.panel.setAttribute('hidden', true);
        }
      }
      var options = stepperChooser.options;
      for (i = 0; i < options.length; ++i) {
        var option = options[i];
        option.selected = (option.value | 0) === pageIndex;
      }
    },
    saveBreakPoints: function saveBreakPoints(pageIndex, bps) {
      breakPoints[pageIndex] = bps;
      sessionStorage.setItem('pdfjsBreakPoints', JSON.stringify(breakPoints));
    }
  };
})();

// The stepper for each page's IRQueue.
var Stepper = (function StepperClosure() {
  // Shorter way to create element and optionally set textContent.
  function c(tag, textContent) {
    var d = document.createElement(tag);
    if (textContent) {
      d.textContent = textContent;
    }
    return d;
  }

  function simplifyArgs(args) {
    if (typeof args === 'string') {
      var MAX_STRING_LENGTH = 75;
      return args.length <= MAX_STRING_LENGTH ? args :
        args.substr(0, MAX_STRING_LENGTH) + '...';
    }
    if (typeof args !== 'object' || args === null) {
      return args;
    }
    if ('length' in args) { // array
      var simpleArgs = [], i, ii;
      var MAX_ITEMS = 10;
      for (i = 0, ii = Math.min(MAX_ITEMS, args.length); i < ii; i++) {
        simpleArgs.push(simplifyArgs(args[i]));
      }
      if (i < args.length) {
        simpleArgs.push('...');
      }
      return simpleArgs;
    }
    var simpleObj = {};
    for (var key in args) {
      simpleObj[key] = simplifyArgs(args[key]);
    }
    return simpleObj;
  }

  function Stepper(panel, pageIndex, initialBreakPoints) {
    this.panel = panel;
    this.breakPoint = 0;
    this.nextBreakPoint = null;
    this.pageIndex = pageIndex;
    this.breakPoints = initialBreakPoints;
    this.currentIdx = -1;
    this.operatorListIdx = 0;
  }
  Stepper.prototype = {
    init: function init(operatorList) {
      var panel = this.panel;
      var content = c('div', 'c=continue, s=step');
      var table = c('table');
      content.appendChild(table);
      table.cellSpacing = 0;
      var headerRow = c('tr');
      table.appendChild(headerRow);
      headerRow.appendChild(c('th', 'Break'));
      headerRow.appendChild(c('th', 'Idx'));
      headerRow.appendChild(c('th', 'fn'));
      headerRow.appendChild(c('th', 'args'));
      panel.appendChild(content);
      this.table = table;
      this.updateOperatorList(operatorList);
    },
    updateOperatorList: function updateOperatorList(operatorList) {
      var self = this;

      function cboxOnClick() {
        var x = +this.dataset.idx;
        if (this.checked) {
          self.breakPoints.push(x);
        } else {
          self.breakPoints.splice(self.breakPoints.indexOf(x), 1);
        }
        StepperManager.saveBreakPoints(self.pageIndex, self.breakPoints);
      }

      var MAX_OPERATORS_COUNT = 15000;
      if (this.operatorListIdx > MAX_OPERATORS_COUNT) {
        return;
      }

      var chunk = document.createDocumentFragment();
      var operatorsToDisplay = Math.min(MAX_OPERATORS_COUNT,
                                        operatorList.fnArray.length);
      for (var i = this.operatorListIdx; i < operatorsToDisplay; i++) {
        var line = c('tr');
        line.className = 'line';
        line.dataset.idx = i;
        chunk.appendChild(line);
        var checked = this.breakPoints.indexOf(i) !== -1;
        var args = operatorList.argsArray[i] || [];

        var breakCell = c('td');
        var cbox = c('input');
        cbox.type = 'checkbox';
        cbox.className = 'points';
        cbox.checked = checked;
        cbox.dataset.idx = i;
        cbox.onclick = cboxOnClick;

        breakCell.appendChild(cbox);
        line.appendChild(breakCell);
        line.appendChild(c('td', i.toString()));
        var fn = opMap[operatorList.fnArray[i]];
        var decArgs = args;
        if (fn === 'showText') {
          var glyphs = args[0];
          var newArgs = [];
          var str = [];
          for (var j = 0; j < glyphs.length; j++) {
            var glyph = glyphs[j];
            if (typeof glyph === 'object' && glyph !== null) {
              str.push(glyph.fontChar);
            } else {
              if (str.length > 0) {
                newArgs.push(str.join(''));
                str = [];
              }
              newArgs.push(glyph); // null or number
            }
          }
          if (str.length > 0) {
            newArgs.push(str.join(''));
          }
          decArgs = [newArgs];
        }
        line.appendChild(c('td', fn));
        line.appendChild(c('td', JSON.stringify(simplifyArgs(decArgs))));
      }
      if (operatorsToDisplay < operatorList.fnArray.length) {
        line = c('tr');
        var lastCell = c('td', '...');
        lastCell.colspan = 4;
        chunk.appendChild(lastCell);
      }
      this.operatorListIdx = operatorList.fnArray.length;
      this.table.appendChild(chunk);
    },
    getNextBreakPoint: function getNextBreakPoint() {
      this.breakPoints.sort(function(a, b) {
        return a - b;
      });
      for (var i = 0; i < this.breakPoints.length; i++) {
        if (this.breakPoints[i] > this.currentIdx) {
          return this.breakPoints[i];
        }
      }
      return null;
    },
    breakIt: function breakIt(idx, callback) {
      StepperManager.selectStepper(this.pageIndex, true);
      var self = this;
      var dom = document;
      self.currentIdx = idx;
      var listener = function(e) {
        switch (e.keyCode) {
          case 83: // step
            dom.removeEventListener('keydown', listener);
            self.nextBreakPoint = self.currentIdx + 1;
            self.goTo(-1);
            callback();
            break;
          case 67: // continue
            dom.removeEventListener('keydown', listener);
            var breakPoint = self.getNextBreakPoint();
            self.nextBreakPoint = breakPoint;
            self.goTo(-1);
            callback();
            break;
        }
      };
      dom.addEventListener('keydown', listener);
      self.goTo(idx);
    },
    goTo: function goTo(idx) {
      var allRows = this.panel.getElementsByClassName('line');
      for (var x = 0, xx = allRows.length; x < xx; ++x) {
        var row = allRows[x];
        if ((row.dataset.idx | 0) === idx) {
          row.style.backgroundColor = 'rgb(251,250,207)';
          row.scrollIntoView();
        } else {
          row.style.backgroundColor = null;
        }
      }
    }
  };
  return Stepper;
})();

var Stats = (function Stats() {
  var stats = [];
  function clear(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }
  function getStatIndex(pageNumber) {
    for (var i = 0, ii = stats.length; i < ii; ++i) {
      if (stats[i].pageNumber === pageNumber) {
        return i;
      }
    }
    return false;
  }
  return {
    // Properties/functions needed by PDFBug.
    id: 'Stats',
    name: 'Stats',
    panel: null,
    manager: null,
    init: function init(pdfjsLib) {
      this.panel.setAttribute('style', 'padding: 5px;');
      pdfjsLib.PDFJS.enableStats = true;
    },
    enabled: false,
    active: false,
    // Stats specific functions.
    add: function(pageNumber, stat) {
      if (!stat) {
        return;
      }
      var statsIndex = getStatIndex(pageNumber);
      if (statsIndex !== false) {
        var b = stats[statsIndex];
        this.panel.removeChild(b.div);
        stats.splice(statsIndex, 1);
      }
      var wrapper = document.createElement('div');
      wrapper.className = 'stats';
      var title = document.createElement('div');
      title.className = 'title';
      title.textContent = 'Page: ' + pageNumber;
      var statsDiv = document.createElement('div');
      statsDiv.textContent = stat.toString();
      wrapper.appendChild(title);
      wrapper.appendChild(statsDiv);
      stats.push({ pageNumber: pageNumber, div: wrapper });
      stats.sort(function(a, b) {
        return a.pageNumber - b.pageNumber;
      });
      clear(this.panel);
      for (var i = 0, ii = stats.length; i < ii; ++i) {
        this.panel.appendChild(stats[i].div);
      }
    },
    cleanup: function () {
      stats = [];
      clear(this.panel);
    }
  };
})();

// Manages all the debugging tools.
var PDFBug = (function PDFBugClosure() {
  var panelWidth = 300;
  var buttons = [];
  var activePanel = null;

  return {
    tools: [
      FontInspector,
      StepperManager,
      Stats
    ],
    enable: function(ids) {
      var all = false, tools = this.tools;
      if (ids.length === 1 && ids[0] === 'all') {
        all = true;
      }
      for (var i = 0; i < tools.length; ++i) {
        var tool = tools[i];
        if (all || ids.indexOf(tool.id) !== -1) {
          tool.enabled = true;
        }
      }
      if (!all) {
        // Sort the tools by the order they are enabled.
        tools.sort(function(a, b) {
          var indexA = ids.indexOf(a.id);
          indexA = indexA < 0 ? tools.length : indexA;
          var indexB = ids.indexOf(b.id);
          indexB = indexB < 0 ? tools.length : indexB;
          return indexA - indexB;
        });
      }
    },
    init: function init(pdfjsLib, container) {
      /*
       * Basic Layout:
       * PDFBug
       *  Controls
       *  Panels
       *    Panel
       *    Panel
       *    ...
       */
      var ui = document.createElement('div');
      ui.id = 'PDFBug';

      var controls = document.createElement('div');
      controls.setAttribute('class', 'controls');
      ui.appendChild(controls);

      var panels = document.createElement('div');
      panels.setAttribute('class', 'panels');
      ui.appendChild(panels);

      container.appendChild(ui);
      container.style.right = panelWidth + 'px';

      // Initialize all the debugging tools.
      var tools = this.tools;
      var self = this;
      for (var i = 0; i < tools.length; ++i) {
        var tool = tools[i];
        var panel = document.createElement('div');
        var panelButton = document.createElement('button');
        panelButton.textContent = tool.name;
        panelButton.addEventListener('click', (function(selected) {
          return function(event) {
            event.preventDefault();
            self.selectPanel(selected);
          };
        })(i));
        controls.appendChild(panelButton);
        panels.appendChild(panel);
        tool.panel = panel;
        tool.manager = this;
        if (tool.enabled) {
          tool.init(pdfjsLib);
        } else {
          panel.textContent = tool.name + ' is disabled. To enable add ' +
                              ' "' + tool.id + '" to the pdfBug parameter ' +
                              'and refresh (separate multiple by commas).';
        }
        buttons.push(panelButton);
      }
      this.selectPanel(0);
    },
    cleanup: function cleanup() {
      for (var i = 0, ii = this.tools.length; i < ii; i++) {
        if (this.tools[i].enabled) {
          this.tools[i].cleanup();
        }
      }
    },
    selectPanel: function selectPanel(index) {
      if (typeof index !== 'number') {
        index = this.tools.indexOf(index);
      }
      if (index === activePanel) {
        return;
      }
      activePanel = index;
      var tools = this.tools;
      for (var j = 0; j < tools.length; ++j) {
        if (j === index) {
          buttons[j].setAttribute('class', 'active');
          tools[j].active = true;
          tools[j].panel.removeAttribute('hidden');
        } else {
          buttons[j].setAttribute('class', '');
          tools[j].active = false;
          tools[j].panel.setAttribute('hidden', 'true');
        }
      }
    }
  };
})();
/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var pdfjsLib = __webpack_require__(1);
var CSS_UNITS = 96.0 / 72.0;
var DEFAULT_SCALE_VALUE = 'auto';
var DEFAULT_SCALE = 1.0;
var MIN_SCALE = 0.25;
var MAX_SCALE = 10.0;
var UNKNOWN_SCALE = 0;
var MAX_AUTO_SCALE = 1.25;
var SCROLLBAR_PADDING = 40;
var VERTICAL_PADDING = 5;
var RendererType = {
 CANVAS: 'canvas',
 SVG: 'svg'
};
var mozL10n = document.mozL10n || document.webL10n;
var PDFJS = pdfjsLib.PDFJS;
PDFJS.disableFullscreen = PDFJS.disableFullscreen === undefined ? false : PDFJS.disableFullscreen;
PDFJS.useOnlyCssZoom = PDFJS.useOnlyCssZoom === undefined ? false : PDFJS.useOnlyCssZoom;
PDFJS.maxCanvasPixels = PDFJS.maxCanvasPixels === undefined ? 16777216 : PDFJS.maxCanvasPixels;
PDFJS.disableHistory = PDFJS.disableHistory === undefined ? false : PDFJS.disableHistory;
PDFJS.disableTextLayer = PDFJS.disableTextLayer === undefined ? false : PDFJS.disableTextLayer;
PDFJS.ignoreCurrentPositionOnZoom = PDFJS.ignoreCurrentPositionOnZoom === undefined ? false : PDFJS.ignoreCurrentPositionOnZoom;
PDFJS.locale = PDFJS.locale === undefined ? navigator.language : PDFJS.locale;
function getOutputScale(ctx) {
 var devicePixelRatio = window.devicePixelRatio || 1;
 var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
 var pixelRatio = devicePixelRatio / backingStoreRatio;
 return {
  sx: pixelRatio,
  sy: pixelRatio,
  scaled: pixelRatio !== 1
 };
}
function scrollIntoView(element, spot, skipOverflowHiddenElements) {
 var parent = element.offsetParent;
 if (!parent) {
  console.error('offsetParent is not set -- cannot scroll');
  return;
 }
 var checkOverflow = skipOverflowHiddenElements || false;
 var offsetY = element.offsetTop + element.clientTop;
 var offsetX = element.offsetLeft + element.clientLeft;
 while (parent.clientHeight === parent.scrollHeight || checkOverflow && getComputedStyle(parent).overflow === 'hidden') {
  if (parent.dataset._scaleY) {
   offsetY /= parent.dataset._scaleY;
   offsetX /= parent.dataset._scaleX;
  }
  offsetY += parent.offsetTop;
  offsetX += parent.offsetLeft;
  parent = parent.offsetParent;
  if (!parent) {
   return;
  }
 }
 if (spot) {
  if (spot.top !== undefined) {
   offsetY += spot.top;
  }
  if (spot.left !== undefined) {
   offsetX += spot.left;
   parent.scrollLeft = offsetX;
  }
 }
 parent.scrollTop = offsetY;
}
function watchScroll(viewAreaElement, callback) {
 var debounceScroll = function debounceScroll(evt) {
  if (rAF) {
   return;
  }
  rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
   rAF = null;
   var currentY = viewAreaElement.scrollTop;
   var lastY = state.lastY;
   if (currentY !== lastY) {
    state.down = currentY > lastY;
   }
   state.lastY = currentY;
   callback(state);
  });
 };
 var state = {
  down: true,
  lastY: viewAreaElement.scrollTop,
  _eventHandler: debounceScroll
 };
 var rAF = null;
 viewAreaElement.addEventListener('scroll', debounceScroll, true);
 return state;
}
function parseQueryString(query) {
 var parts = query.split('&');
 var params = {};
 for (var i = 0, ii = parts.length; i < ii; ++i) {
  var param = parts[i].split('=');
  var key = param[0].toLowerCase();
  var value = param.length > 1 ? param[1] : null;
  params[decodeURIComponent(key)] = decodeURIComponent(value);
 }
 return params;
}
function binarySearchFirstItem(items, condition) {
 var minIndex = 0;
 var maxIndex = items.length - 1;
 if (items.length === 0 || !condition(items[maxIndex])) {
  return items.length;
 }
 if (condition(items[minIndex])) {
  return minIndex;
 }
 while (minIndex < maxIndex) {
  var currentIndex = minIndex + maxIndex >> 1;
  var currentItem = items[currentIndex];
  if (condition(currentItem)) {
   maxIndex = currentIndex;
  } else {
   minIndex = currentIndex + 1;
  }
 }
 return minIndex;
}
function approximateFraction(x) {
 if (Math.floor(x) === x) {
  return [
   x,
   1
  ];
 }
 var xinv = 1 / x;
 var limit = 8;
 if (xinv > limit) {
  return [
   1,
   limit
  ];
 } else if (Math.floor(xinv) === xinv) {
  return [
   1,
   xinv
  ];
 }
 var x_ = x > 1 ? xinv : x;
 var a = 0, b = 1, c = 1, d = 1;
 while (true) {
  var p = a + c, q = b + d;
  if (q > limit) {
   break;
  }
  if (x_ <= p / q) {
   c = p;
   d = q;
  } else {
   a = p;
   b = q;
  }
 }
 var result;
 if (x_ - a / b < c / d - x_) {
  result = x_ === x ? [
   a,
   b
  ] : [
   b,
   a
  ];
 } else {
  result = x_ === x ? [
   c,
   d
  ] : [
   d,
   c
  ];
 }
 return result;
}
function roundToDivide(x, div) {
 var r = x % div;
 return r === 0 ? x : Math.round(x - r + div);
}
function getVisibleElements(scrollEl, views, sortByVisibility) {
 var top = scrollEl.scrollTop, bottom = top + scrollEl.clientHeight;
 var left = scrollEl.scrollLeft, right = left + scrollEl.clientWidth;
 function isElementBottomBelowViewTop(view) {
  var element = view.div;
  var elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
  return elementBottom > top;
 }
 var visible = [], view, element;
 var currentHeight, viewHeight, hiddenHeight, percentHeight;
 var currentWidth, viewWidth;
 var firstVisibleElementInd = views.length === 0 ? 0 : binarySearchFirstItem(views, isElementBottomBelowViewTop);
 for (var i = firstVisibleElementInd, ii = views.length; i < ii; i++) {
  view = views[i];
  element = view.div;
  currentHeight = element.offsetTop + element.clientTop;
  viewHeight = element.clientHeight;
  if (currentHeight > bottom) {
   break;
  }
  currentWidth = element.offsetLeft + element.clientLeft;
  viewWidth = element.clientWidth;
  if (currentWidth + viewWidth < left || currentWidth > right) {
   continue;
  }
  hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, currentHeight + viewHeight - bottom);
  percentHeight = (viewHeight - hiddenHeight) * 100 / viewHeight | 0;
  visible.push({
   id: view.id,
   x: currentWidth,
   y: currentHeight,
   view: view,
   percent: percentHeight
  });
 }
 var first = visible[0];
 var last = visible[visible.length - 1];
 if (sortByVisibility) {
  visible.sort(function (a, b) {
   var pc = a.percent - b.percent;
   if (Math.abs(pc) > 0.001) {
    return -pc;
   }
   return a.id - b.id;
  });
 }
 return {
  first: first,
  last: last,
  views: visible
 };
}
function noContextMenuHandler(e) {
 e.preventDefault();
}
function getPDFFileNameFromURL(url, defaultFilename) {
 if (typeof defaultFilename === 'undefined') {
  defaultFilename = 'document.pdf';
 }
 var reURI = /^(?:(?:[^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
 var reFilename = /[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
 var splitURI = reURI.exec(url);
 var suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);
 if (suggestedFilename) {
  suggestedFilename = suggestedFilename[0];
  if (suggestedFilename.indexOf('%') !== -1) {
   try {
    suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
   } catch (e) {
   }
  }
 }
 return suggestedFilename || defaultFilename;
}
function normalizeWheelEventDelta(evt) {
 var delta = Math.sqrt(evt.deltaX * evt.deltaX + evt.deltaY * evt.deltaY);
 var angle = Math.atan2(evt.deltaY, evt.deltaX);
 if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
  delta = -delta;
 }
 var MOUSE_DOM_DELTA_PIXEL_MODE = 0;
 var MOUSE_DOM_DELTA_LINE_MODE = 1;
 var MOUSE_PIXELS_PER_LINE = 30;
 var MOUSE_LINES_PER_PAGE = 30;
 if (evt.deltaMode === MOUSE_DOM_DELTA_PIXEL_MODE) {
  delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
 } else if (evt.deltaMode === MOUSE_DOM_DELTA_LINE_MODE) {
  delta /= MOUSE_LINES_PER_PAGE;
 }
 return delta;
}
var animationStarted = new Promise(function (resolve) {
 window.requestAnimationFrame(resolve);
});
var localized = new Promise(function (resolve, reject) {
 if (!mozL10n) {
  resolve();
  return;
 }
 if (mozL10n.getReadyState() !== 'loading') {
  resolve();
  return;
 }
 window.addEventListener('localized', function localized(evt) {
  resolve();
 });
});
var EventBus = function EventBusClosure() {
 function EventBus() {
  this._listeners = Object.create(null);
 }
 EventBus.prototype = {
  on: function EventBus_on(eventName, listener) {
   var eventListeners = this._listeners[eventName];
   if (!eventListeners) {
    eventListeners = [];
    this._listeners[eventName] = eventListeners;
   }
   eventListeners.push(listener);
  },
  off: function EventBus_on(eventName, listener) {
   var eventListeners = this._listeners[eventName];
   var i;
   if (!eventListeners || (i = eventListeners.indexOf(listener)) < 0) {
    return;
   }
   eventListeners.splice(i, 1);
  },
  dispatch: function EventBus_dispath(eventName) {
   var eventListeners = this._listeners[eventName];
   if (!eventListeners || eventListeners.length === 0) {
    return;
   }
   var args = Array.prototype.slice.call(arguments, 1);
   eventListeners.slice(0).forEach(function (listener) {
    listener.apply(null, args);
   });
  }
 };
 return EventBus;
}();
var ProgressBar = function ProgressBarClosure() {
 function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
 }
 function ProgressBar(id, opts) {
  this.visible = true;
  this.div = document.querySelector(id + ' .progress');
  this.bar = this.div.parentNode;
  this.height = opts.height || 100;
  this.width = opts.width || 100;
  this.units = opts.units || '%';
  this.div.style.height = this.height + this.units;
  this.percent = 0;
 }
 ProgressBar.prototype = {
  updateBar: function ProgressBar_updateBar() {
   if (this._indeterminate) {
    this.div.classList.add('indeterminate');
    this.div.style.width = this.width + this.units;
    return;
   }
   this.div.classList.remove('indeterminate');
   var progressSize = this.width * this._percent / 100;
   this.div.style.width = progressSize + this.units;
  },
  get percent() {
   return this._percent;
  },
  set percent(val) {
   this._indeterminate = isNaN(val);
   this._percent = clamp(val, 0, 100);
   this.updateBar();
  },
  setWidth: function ProgressBar_setWidth(viewer) {
   if (viewer) {
    var container = viewer.parentNode;
    var scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
    if (scrollbarWidth > 0) {
     this.bar.setAttribute('style', 'width: calc(100% - ' + scrollbarWidth + 'px);');
    }
   }
  },
  hide: function ProgressBar_hide() {
   if (!this.visible) {
    return;
   }
   this.visible = false;
   this.bar.classList.add('hidden');
   document.body.classList.remove('loadingInProgress');
  },
  show: function ProgressBar_show() {
   if (this.visible) {
    return;
   }
   this.visible = true;
   document.body.classList.add('loadingInProgress');
   this.bar.classList.remove('hidden');
  }
 };
 return ProgressBar;
}();
exports.CSS_UNITS = CSS_UNITS;
exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
exports.DEFAULT_SCALE = DEFAULT_SCALE;
exports.MIN_SCALE = MIN_SCALE;
exports.MAX_SCALE = MAX_SCALE;
exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
exports.VERTICAL_PADDING = VERTICAL_PADDING;
exports.RendererType = RendererType;
exports.mozL10n = mozL10n;
exports.EventBus = EventBus;
exports.ProgressBar = ProgressBar;
exports.getPDFFileNameFromURL = getPDFFileNameFromURL;
exports.noContextMenuHandler = noContextMenuHandler;
exports.parseQueryString = parseQueryString;
exports.getVisibleElements = getVisibleElements;
exports.roundToDivide = roundToDivide;
exports.approximateFraction = approximateFraction;
exports.getOutputScale = getOutputScale;
exports.scrollIntoView = scrollIntoView;
exports.watchScroll = watchScroll;
exports.binarySearchFirstItem = binarySearchFirstItem;
exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
exports.animationStarted = animationStarted;
exports.localized = localized;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

{
 var pdfjsLib;
 if (typeof __pdfjsdev_webpack__ === 'undefined') {
  if (typeof require === 'function') {
   pdfjsLib = require('../build/pdf.js');
  } else {
   pdfjsLib = window['pdfjs-dist/build/pdf'];
  }
 }
 module.exports = pdfjsLib;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var EventBus = uiUtils.EventBus;
function attachDOMEventsToEventBus(eventBus) {
 eventBus.on('documentload', function () {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('documentload', true, true, {});
  window.dispatchEvent(event);
 });
 eventBus.on('pagerendered', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('pagerendered', true, true, {
   pageNumber: e.pageNumber,
   cssTransform: e.cssTransform
  });
  e.source.div.dispatchEvent(event);
 });
 eventBus.on('textlayerrendered', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('textlayerrendered', true, true, { pageNumber: e.pageNumber });
  e.source.textLayerDiv.dispatchEvent(event);
 });
 eventBus.on('pagechange', function (e) {
  var event = document.createEvent('UIEvents');
  event.initUIEvent('pagechange', true, true, window, 0);
  event.pageNumber = e.pageNumber;
  e.source.container.dispatchEvent(event);
 });
 eventBus.on('pagesinit', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('pagesinit', true, true, null);
  e.source.container.dispatchEvent(event);
 });
 eventBus.on('pagesloaded', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('pagesloaded', true, true, { pagesCount: e.pagesCount });
  e.source.container.dispatchEvent(event);
 });
 eventBus.on('scalechange', function (e) {
  var event = document.createEvent('UIEvents');
  event.initUIEvent('scalechange', true, true, window, 0);
  event.scale = e.scale;
  event.presetValue = e.presetValue;
  e.source.container.dispatchEvent(event);
 });
 eventBus.on('updateviewarea', function (e) {
  var event = document.createEvent('UIEvents');
  event.initUIEvent('updateviewarea', true, true, window, 0);
  event.location = e.location;
  e.source.container.dispatchEvent(event);
 });
 eventBus.on('find', function (e) {
  if (e.source === window) {
   return;
  }
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('find' + e.type, true, true, {
   query: e.query,
   phraseSearch: e.phraseSearch,
   caseSensitive: e.caseSensitive,
   highlightAll: e.highlightAll,
   findPrevious: e.findPrevious
  });
  window.dispatchEvent(event);
 });
 eventBus.on('attachmentsloaded', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('attachmentsloaded', true, true, { attachmentsCount: e.attachmentsCount });
  e.source.container.dispatchEvent(event);
 });
 eventBus.on('sidebarviewchanged', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('sidebarviewchanged', true, true, { view: e.view });
  e.source.outerContainer.dispatchEvent(event);
 });
 eventBus.on('pagemode', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('pagemode', true, true, { mode: e.mode });
  e.source.pdfViewer.container.dispatchEvent(event);
 });
 eventBus.on('namedaction', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('namedaction', true, true, { action: e.action });
  e.source.pdfViewer.container.dispatchEvent(event);
 });
 eventBus.on('presentationmodechanged', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('presentationmodechanged', true, true, {
   active: e.active,
   switchInProgress: e.switchInProgress
  });
  window.dispatchEvent(event);
 });
 eventBus.on('outlineloaded', function (e) {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('outlineloaded', true, true, { outlineCount: e.outlineCount });
  e.source.container.dispatchEvent(event);
 });
}
var globalEventBus = null;
function getGlobalEventBus() {
 if (globalEventBus) {
  return globalEventBus;
 }
 globalEventBus = new EventBus();
 attachDOMEventsToEventBus(globalEventBus);
 return globalEventBus;
}
exports.attachDOMEventsToEventBus = attachDOMEventsToEventBus;
exports.getGlobalEventBus = getGlobalEventBus;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var CLEANUP_TIMEOUT = 30000;
var RenderingStates = {
 INITIAL: 0,
 RUNNING: 1,
 PAUSED: 2,
 FINISHED: 3
};
var PDFRenderingQueue = function PDFRenderingQueueClosure() {
 function PDFRenderingQueue() {
  this.pdfViewer = null;
  this.pdfThumbnailViewer = null;
  this.onIdle = null;
  this.highestPriorityPage = null;
  this.idleTimeout = null;
  this.printing = false;
  this.isThumbnailViewEnabled = false;
 }
 PDFRenderingQueue.prototype = {
  setViewer: function PDFRenderingQueue_setViewer(pdfViewer) {
   this.pdfViewer = pdfViewer;
  },
  setThumbnailViewer: function PDFRenderingQueue_setThumbnailViewer(pdfThumbnailViewer) {
   this.pdfThumbnailViewer = pdfThumbnailViewer;
  },
  isHighestPriority: function PDFRenderingQueue_isHighestPriority(view) {
   return this.highestPriorityPage === view.renderingId;
  },
  renderHighestPriority: function PDFRenderingQueue_renderHighestPriority(currentlyVisiblePages) {
   if (this.idleTimeout) {
    clearTimeout(this.idleTimeout);
    this.idleTimeout = null;
   }
   if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
    return;
   }
   if (this.pdfThumbnailViewer && this.isThumbnailViewEnabled) {
    if (this.pdfThumbnailViewer.forceRendering()) {
     return;
    }
   }
   if (this.printing) {
    return;
   }
   if (this.onIdle) {
    this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
   }
  },
  getHighestPriority: function PDFRenderingQueue_getHighestPriority(visible, views, scrolledDown) {
   var visibleViews = visible.views;
   var numVisible = visibleViews.length;
   if (numVisible === 0) {
    return false;
   }
   for (var i = 0; i < numVisible; ++i) {
    var view = visibleViews[i].view;
    if (!this.isViewFinished(view)) {
     return view;
    }
   }
   if (scrolledDown) {
    var nextPageIndex = visible.last.id;
    if (views[nextPageIndex] && !this.isViewFinished(views[nextPageIndex])) {
     return views[nextPageIndex];
    }
   } else {
    var previousPageIndex = visible.first.id - 2;
    if (views[previousPageIndex] && !this.isViewFinished(views[previousPageIndex])) {
     return views[previousPageIndex];
    }
   }
   return null;
  },
  isViewFinished: function PDFRenderingQueue_isViewFinished(view) {
   return view.renderingState === RenderingStates.FINISHED;
  },
  renderView: function PDFRenderingQueue_renderView(view) {
   var state = view.renderingState;
   switch (state) {
   case RenderingStates.FINISHED:
    return false;
   case RenderingStates.PAUSED:
    this.highestPriorityPage = view.renderingId;
    view.resume();
    break;
   case RenderingStates.RUNNING:
    this.highestPriorityPage = view.renderingId;
    break;
   case RenderingStates.INITIAL:
    this.highestPriorityPage = view.renderingId;
    var continueRendering = function () {
     this.renderHighestPriority();
    }.bind(this);
    view.draw().then(continueRendering, continueRendering);
    break;
   }
   return true;
  }
 };
 return PDFRenderingQueue;
}();
exports.RenderingStates = RenderingStates;
exports.PDFRenderingQueue = PDFRenderingQueue;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var OverlayManager = {
 overlays: {},
 active: null,
 register: function overlayManagerRegister(name, element, callerCloseMethod, canForceClose) {
  return new Promise(function (resolve) {
   var container;
   if (!name || !element || !(container = element.parentNode)) {
    throw new Error('Not enough parameters.');
   } else if (this.overlays[name]) {
    if (this.active !== name) {
     this.unregister(name);
    } else {
     throw new Error('The overlay is already registered and active.');
    }
   }
   this.overlays[name] = {
    element: element,
    container: container,
    callerCloseMethod: callerCloseMethod || null,
    canForceClose: canForceClose || false
   };
   resolve();
  }.bind(this));
 },
 unregister: function overlayManagerUnregister(name) {
  return new Promise(function (resolve) {
   if (!this.overlays[name]) {
    throw new Error('The overlay does not exist.');
   } else if (this.active === name) {
    throw new Error('The overlay cannot be removed while it is active.');
   }
   delete this.overlays[name];
   resolve();
  }.bind(this));
 },
 open: function overlayManagerOpen(name) {
  return new Promise(function (resolve) {
   if (!this.overlays[name]) {
    throw new Error('The overlay does not exist.');
   } else if (this.active) {
    if (this.overlays[name].canForceClose) {
     this._closeThroughCaller();
    } else if (this.active === name) {
     throw new Error('The overlay is already active.');
    } else {
     throw new Error('Another overlay is currently active.');
    }
   }
   this.active = name;
   this.overlays[this.active].element.classList.remove('hidden');
   this.overlays[this.active].container.classList.remove('hidden');
   window.addEventListener('keydown', this._keyDown);
   resolve();
  }.bind(this));
 },
 close: function overlayManagerClose(name) {
  return new Promise(function (resolve) {
   if (!this.overlays[name]) {
    throw new Error('The overlay does not exist.');
   } else if (!this.active) {
    throw new Error('The overlay is currently not active.');
   } else if (this.active !== name) {
    throw new Error('Another overlay is currently active.');
   }
   this.overlays[this.active].container.classList.add('hidden');
   this.overlays[this.active].element.classList.add('hidden');
   this.active = null;
   window.removeEventListener('keydown', this._keyDown);
   resolve();
  }.bind(this));
 },
 _keyDown: function overlayManager_keyDown(evt) {
  var self = OverlayManager;
  if (self.active && evt.keyCode === 27) {
   self._closeThroughCaller();
   evt.preventDefault();
  }
 },
 _closeThroughCaller: function overlayManager_closeThroughCaller() {
  if (this.overlays[this.active].callerCloseMethod) {
   this.overlays[this.active].callerCloseMethod();
  }
  if (this.active) {
   this.close(this.active);
  }
 }
};
exports.OverlayManager = OverlayManager;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var domEvents = __webpack_require__(2);
var parseQueryString = uiUtils.parseQueryString;
var PageNumberRegExp = /^\d+$/;
function isPageNumber(str) {
 return PageNumberRegExp.test(str);
}
var PDFLinkService = function PDFLinkServiceClosure() {
 function PDFLinkService(options) {
  options = options || {};
  this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
  this.baseUrl = null;
  this.pdfDocument = null;
  this.pdfViewer = null;
  this.pdfHistory = null;
  this._pagesRefCache = null;
 }
 PDFLinkService.prototype = {
  setDocument: function PDFLinkService_setDocument(pdfDocument, baseUrl) {
   this.baseUrl = baseUrl;
   this.pdfDocument = pdfDocument;
   this._pagesRefCache = Object.create(null);
  },
  setViewer: function PDFLinkService_setViewer(pdfViewer) {
   this.pdfViewer = pdfViewer;
  },
  setHistory: function PDFLinkService_setHistory(pdfHistory) {
   this.pdfHistory = pdfHistory;
  },
  get pagesCount() {
   return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },
  get page() {
   return this.pdfViewer.currentPageNumber;
  },
  set page(value) {
   this.pdfViewer.currentPageNumber = value;
  },
  navigateTo: function PDFLinkService_navigateTo(dest) {
   var destString = '';
   var self = this;
   var goToDestination = function (destRef) {
    var pageNumber;
    if (destRef instanceof Object) {
     pageNumber = self._cachedPageNumber(destRef);
    } else if ((destRef | 0) === destRef) {
     pageNumber = destRef + 1;
    } else {
     console.error('PDFLinkService_navigateTo: "' + destRef + '" is not a valid destination reference.');
     return;
    }
    if (pageNumber) {
     if (pageNumber < 1 || pageNumber > self.pagesCount) {
      console.error('PDFLinkService_navigateTo: "' + pageNumber + '" is a non-existent page number.');
      return;
     }
     self.pdfViewer.scrollPageIntoView({
      pageNumber: pageNumber,
      destArray: dest
     });
     if (self.pdfHistory) {
      self.pdfHistory.push({
       dest: dest,
       hash: destString,
       page: pageNumber
      });
     }
    } else {
     self.pdfDocument.getPageIndex(destRef).then(function (pageIndex) {
      self.cachePageRef(pageIndex + 1, destRef);
      goToDestination(destRef);
     }).catch(function () {
      console.error('PDFLinkService_navigateTo: "' + destRef + '" is not a valid page reference.');
     });
    }
   };
   var destinationPromise;
   if (typeof dest === 'string') {
    destString = dest;
    destinationPromise = this.pdfDocument.getDestination(dest);
   } else {
    destinationPromise = Promise.resolve(dest);
   }
   destinationPromise.then(function (destination) {
    dest = destination;
    if (!(destination instanceof Array)) {
     console.error('PDFLinkService_navigateTo: "' + destination + '" is not a valid destination array.');
     return;
    }
    goToDestination(destination[0]);
   });
  },
  getDestinationHash: function PDFLinkService_getDestinationHash(dest) {
   if (typeof dest === 'string') {
    return this.getAnchorUrl('#' + (isPageNumber(dest) ? 'nameddest=' : '') + escape(dest));
   }
   if (dest instanceof Array) {
    var str = JSON.stringify(dest);
    return this.getAnchorUrl('#' + escape(str));
   }
   return this.getAnchorUrl('');
  },
  getAnchorUrl: function PDFLinkService_getAnchorUrl(anchor) {
   return (this.baseUrl || '') + anchor;
  },
  setHash: function PDFLinkService_setHash(hash) {
   var pageNumber, dest;
   if (hash.indexOf('=') >= 0) {
    var params = parseQueryString(hash);
    if ('search' in params) {
     this.eventBus.dispatch('findfromurlhash', {
      source: this,
      query: params['search'].replace(/"/g, ''),
      phraseSearch: params['phrase'] === 'true'
     });
    }
    if ('nameddest' in params) {
     if (this.pdfHistory) {
      this.pdfHistory.updateNextHashParam(params.nameddest);
     }
     this.navigateTo(params.nameddest);
     return;
    }
    if ('page' in params) {
     pageNumber = params.page | 0 || 1;
    }
    if ('zoom' in params) {
     var zoomArgs = params.zoom.split(',');
     var zoomArg = zoomArgs[0];
     var zoomArgNumber = parseFloat(zoomArg);
     if (zoomArg.indexOf('Fit') === -1) {
      dest = [
       null,
       { name: 'XYZ' },
       zoomArgs.length > 1 ? zoomArgs[1] | 0 : null,
       zoomArgs.length > 2 ? zoomArgs[2] | 0 : null,
       zoomArgNumber ? zoomArgNumber / 100 : zoomArg
      ];
     } else {
      if (zoomArg === 'Fit' || zoomArg === 'FitB') {
       dest = [
        null,
        { name: zoomArg }
       ];
      } else if (zoomArg === 'FitH' || zoomArg === 'FitBH' || (zoomArg === 'FitV' || zoomArg === 'FitBV')) {
       dest = [
        null,
        { name: zoomArg },
        zoomArgs.length > 1 ? zoomArgs[1] | 0 : null
       ];
      } else if (zoomArg === 'FitR') {
       if (zoomArgs.length !== 5) {
        console.error('PDFLinkService_setHash: ' + 'Not enough parameters for \'FitR\'.');
       } else {
        dest = [
         null,
         { name: zoomArg },
         zoomArgs[1] | 0,
         zoomArgs[2] | 0,
         zoomArgs[3] | 0,
         zoomArgs[4] | 0
        ];
       }
      } else {
       console.error('PDFLinkService_setHash: \'' + zoomArg + '\' is not a valid zoom value.');
      }
     }
    }
    if (dest) {
     this.pdfViewer.scrollPageIntoView({
      pageNumber: pageNumber || this.page,
      destArray: dest,
      allowNegativeOffset: true
     });
    } else if (pageNumber) {
     this.page = pageNumber;
    }
    if ('pagemode' in params) {
     this.eventBus.dispatch('pagemode', {
      source: this,
      mode: params.pagemode
     });
    }
   } else {
    if (isPageNumber(hash) && hash <= this.pagesCount) {
     console.warn('PDFLinkService_setHash: specifying a page number ' + 'directly after the hash symbol (#) is deprecated, ' + 'please use the "#page=' + hash + '" form instead.');
     this.page = hash | 0;
    }
    dest = unescape(hash);
    try {
     dest = JSON.parse(dest);
     if (!(dest instanceof Array)) {
      dest = dest.toString();
     }
    } catch (ex) {
    }
    if (typeof dest === 'string' || isValidExplicitDestination(dest)) {
     if (this.pdfHistory) {
      this.pdfHistory.updateNextHashParam(dest);
     }
     this.navigateTo(dest);
     return;
    }
    console.error('PDFLinkService_setHash: \'' + unescape(hash) + '\' is not a valid destination.');
   }
  },
  executeNamedAction: function PDFLinkService_executeNamedAction(action) {
   switch (action) {
   case 'GoBack':
    if (this.pdfHistory) {
     this.pdfHistory.back();
    }
    break;
   case 'GoForward':
    if (this.pdfHistory) {
     this.pdfHistory.forward();
    }
    break;
   case 'NextPage':
    if (this.page < this.pagesCount) {
     this.page++;
    }
    break;
   case 'PrevPage':
    if (this.page > 1) {
     this.page--;
    }
    break;
   case 'LastPage':
    this.page = this.pagesCount;
    break;
   case 'FirstPage':
    this.page = 1;
    break;
   default:
    break;
   }
   this.eventBus.dispatch('namedaction', {
    source: this,
    action: action
   });
  },
  onFileAttachmentAnnotation: function (params) {
   this.eventBus.dispatch('fileattachmentannotation', {
    source: this,
    id: params.id,
    filename: params.filename,
    content: params.content
   });
  },
  cachePageRef: function PDFLinkService_cachePageRef(pageNum, pageRef) {
   var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
   this._pagesRefCache[refStr] = pageNum;
  },
  _cachedPageNumber: function PDFLinkService_cachedPageNumber(pageRef) {
   var refStr = pageRef.num + ' ' + pageRef.gen + ' R';
   return this._pagesRefCache && this._pagesRefCache[refStr] || null;
  }
 };
 function isValidExplicitDestination(dest) {
  if (!(dest instanceof Array)) {
   return false;
  }
  var destLength = dest.length, allowNull = true;
  if (destLength < 2) {
   return false;
  }
  var page = dest[0];
  if (!(typeof page === 'object' && typeof page.num === 'number' && (page.num | 0) === page.num && typeof page.gen === 'number' && (page.gen | 0) === page.gen) && !(typeof page === 'number' && (page | 0) === page && page >= 0)) {
   return false;
  }
  var zoom = dest[1];
  if (!(typeof zoom === 'object' && typeof zoom.name === 'string')) {
   return false;
  }
  switch (zoom.name) {
  case 'XYZ':
   if (destLength !== 5) {
    return false;
   }
   break;
  case 'Fit':
  case 'FitB':
   return destLength === 2;
  case 'FitH':
  case 'FitBH':
  case 'FitV':
  case 'FitBV':
   if (destLength !== 3) {
    return false;
   }
   break;
  case 'FitR':
   if (destLength !== 6) {
    return false;
   }
   allowNull = false;
   break;
  default:
   return false;
  }
  for (var i = 2; i < destLength; i++) {
   var param = dest[i];
   if (!(typeof param === 'number' || allowNull && param === null)) {
    return false;
   }
  }
  return true;
 }
 return PDFLinkService;
}();
var SimpleLinkService = function SimpleLinkServiceClosure() {
 function SimpleLinkService() {
 }
 SimpleLinkService.prototype = {
  get page() {
   return 0;
  },
  set page(value) {
  },
  navigateTo: function (dest) {
  },
  getDestinationHash: function (dest) {
   return '#';
  },
  getAnchorUrl: function (hash) {
   return '#';
  },
  setHash: function (hash) {
  },
  executeNamedAction: function (action) {
  },
  onFileAttachmentAnnotation: function (params) {
  },
  cachePageRef: function (pageNum, pageRef) {
  }
 };
 return SimpleLinkService;
}();
exports.PDFLinkService = PDFLinkService;
exports.SimpleLinkService = SimpleLinkService;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtilsLib = __webpack_require__(0);
var downloadManagerLib = __webpack_require__(11);
var pdfHistoryLib = __webpack_require__(18);
var preferencesLib = __webpack_require__(8);
var pdfSidebarLib = __webpack_require__(22);
var viewHistoryLib = __webpack_require__(29);
var pdfThumbnailViewerLib = __webpack_require__(24);
var toolbarLib = __webpack_require__(28);
var secondaryToolbarLib = __webpack_require__(26);
var passwordPromptLib = __webpack_require__(14);
var pdfPresentationModeLib = __webpack_require__(21);
var pdfDocumentPropertiesLib = __webpack_require__(16);
var handToolLib = __webpack_require__(13);
var pdfViewerLib = __webpack_require__(25);
var pdfRenderingQueueLib = __webpack_require__(3);
var pdfLinkServiceLib = __webpack_require__(5);
var pdfOutlineViewerLib = __webpack_require__(19);
var overlayManagerLib = __webpack_require__(4);
var pdfAttachmentViewerLib = __webpack_require__(15);
var pdfFindControllerLib = __webpack_require__(7);
var pdfFindBarLib = __webpack_require__(17);
var domEventsLib = __webpack_require__(2);
var pdfjsLib = __webpack_require__(1);
var UNKNOWN_SCALE = uiUtilsLib.UNKNOWN_SCALE;
var DEFAULT_SCALE_VALUE = uiUtilsLib.DEFAULT_SCALE_VALUE;
var MIN_SCALE = uiUtilsLib.MIN_SCALE;
var MAX_SCALE = uiUtilsLib.MAX_SCALE;
var ProgressBar = uiUtilsLib.ProgressBar;
var getPDFFileNameFromURL = uiUtilsLib.getPDFFileNameFromURL;
var noContextMenuHandler = uiUtilsLib.noContextMenuHandler;
var mozL10n = uiUtilsLib.mozL10n;
var parseQueryString = uiUtilsLib.parseQueryString;
var PDFHistory = pdfHistoryLib.PDFHistory;
var Preferences = preferencesLib.Preferences;
var SidebarView = pdfSidebarLib.SidebarView;
var PDFSidebar = pdfSidebarLib.PDFSidebar;
var ViewHistory = viewHistoryLib.ViewHistory;
var PDFThumbnailViewer = pdfThumbnailViewerLib.PDFThumbnailViewer;
var Toolbar = toolbarLib.Toolbar;
var SecondaryToolbar = secondaryToolbarLib.SecondaryToolbar;
var PasswordPrompt = passwordPromptLib.PasswordPrompt;
var PDFPresentationMode = pdfPresentationModeLib.PDFPresentationMode;
var PDFDocumentProperties = pdfDocumentPropertiesLib.PDFDocumentProperties;
var HandTool = handToolLib.HandTool;
var PresentationModeState = pdfViewerLib.PresentationModeState;
var PDFViewer = pdfViewerLib.PDFViewer;
var RenderingStates = pdfRenderingQueueLib.RenderingStates;
var PDFRenderingQueue = pdfRenderingQueueLib.PDFRenderingQueue;
var PDFLinkService = pdfLinkServiceLib.PDFLinkService;
var PDFOutlineViewer = pdfOutlineViewerLib.PDFOutlineViewer;
var OverlayManager = overlayManagerLib.OverlayManager;
var PDFAttachmentViewer = pdfAttachmentViewerLib.PDFAttachmentViewer;
var PDFFindController = pdfFindControllerLib.PDFFindController;
var PDFFindBar = pdfFindBarLib.PDFFindBar;
var getGlobalEventBus = domEventsLib.getGlobalEventBus;
var normalizeWheelEventDelta = uiUtilsLib.normalizeWheelEventDelta;
var animationStarted = uiUtilsLib.animationStarted;
var localized = uiUtilsLib.localized;
var RendererType = uiUtilsLib.RendererType;
var DEFAULT_SCALE_DELTA = 1.1;
var DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
function configure(PDFJS) {
 PDFJS.cMapPacked = true;
 var scriptTagContainer = document.body || document.getElementsByTagName('head')[0];
 var pdfjsSrc = scriptTagContainer.lastChild.src;
 if (pdfjsSrc) {
  PDFJS.imageResourcesPath = pdfjsSrc.replace(/pdf\.js$/i, 'images/');
  PDFJS.workerSrc = pdfjsSrc.replace(/pdf\.js$/i, 'pdf.worker.js');
  PDFJS.cMapUrl = pdfjsSrc.replace(/pdf\.js$/i, 'cmaps/');
 }
}
var DefaultExernalServices = {
 updateFindControlState: function (data) {
 },
 initPassiveLoading: function (callbacks) {
 },
 fallback: function (data, callback) {
 },
 reportTelemetry: function (data) {
 },
 createDownloadManager: function () {
  return new downloadManagerLib.DownloadManager();
 },
 supportsIntegratedFind: false,
 supportsDocumentFonts: true,
 supportsDocumentColors: true,
 supportedMouseWheelZoomModifierKeys: {
  ctrlKey: true,
  metaKey: true
 }
};
var PDFViewerApplication = {
 initialBookmark: document.location.hash.substring(1),
 initialDestination: null,
 initialized: false,
 fellback: false,
 appConfig: null,
 pdfDocument: null,
 pdfLoadingTask: null,
 printService: null,
 pdfViewer: null,
 pdfThumbnailViewer: null,
 pdfRenderingQueue: null,
 pdfPresentationMode: null,
 pdfDocumentProperties: null,
 pdfLinkService: null,
 pdfHistory: null,
 pdfSidebar: null,
 pdfOutlineViewer: null,
 pdfAttachmentViewer: null,
 store: null,
 downloadManager: null,
 toolbar: null,
 secondaryToolbar: null,
 eventBus: null,
 pageRotation: 0,
 isInitialViewSet: false,
 viewerPrefs: {
  sidebarViewOnLoad: SidebarView.NONE,
  pdfBugEnabled: false,
  showPreviousViewOnLoad: true,
  defaultZoomValue: '',
  disablePageLabels: false,
  renderer: 'canvas',
  enhanceTextSelection: false,
  renderInteractiveForms: false,
  enablePrintAutoRotate: false
 },
 isViewerEmbedded: window.parent !== window,
 url: '',
 baseUrl: '',
 externalServices: DefaultExernalServices,
 initialize: function pdfViewInitialize(appConfig) {
  var self = this;
  var PDFJS = pdfjsLib.PDFJS;
  Preferences.initialize();
  this.preferences = Preferences;
  configure(PDFJS);
  this.appConfig = appConfig;
  return this._readPreferences().then(function () {
   return self._initializeViewerComponents();
  }).then(function () {
   self.bindEvents();
   self.bindWindowEvents();
   localized.then(function () {
    self.eventBus.dispatch('localized');
   });
   if (self.isViewerEmbedded && !PDFJS.isExternalLinkTargetSet()) {
    PDFJS.externalLinkTarget = PDFJS.LinkTarget.TOP;
   }
   self.initialized = true;
  });
 },
 _readPreferences: function () {
  var self = this;
  var PDFJS = pdfjsLib.PDFJS;
  return Promise.all([
   Preferences.get('enableWebGL').then(function resolved(value) {
    PDFJS.disableWebGL = !value;
   }),
   Preferences.get('sidebarViewOnLoad').then(function resolved(value) {
    self.viewerPrefs['sidebarViewOnLoad'] = value;
   }),
   Preferences.get('pdfBugEnabled').then(function resolved(value) {
    self.viewerPrefs['pdfBugEnabled'] = value;
   }),
   Preferences.get('showPreviousViewOnLoad').then(function resolved(value) {
    self.viewerPrefs['showPreviousViewOnLoad'] = value;
   }),
   Preferences.get('defaultZoomValue').then(function resolved(value) {
    self.viewerPrefs['defaultZoomValue'] = value;
   }),
   Preferences.get('enhanceTextSelection').then(function resolved(value) {
    self.viewerPrefs['enhanceTextSelection'] = value;
   }),
   Preferences.get('disableTextLayer').then(function resolved(value) {
    if (PDFJS.disableTextLayer === true) {
     return;
    }
    PDFJS.disableTextLayer = value;
   }),
   Preferences.get('disableRange').then(function resolved(value) {
    if (PDFJS.disableRange === true) {
     return;
    }
    PDFJS.disableRange = value;
   }),
   Preferences.get('disableStream').then(function resolved(value) {
    if (PDFJS.disableStream === true) {
     return;
    }
    PDFJS.disableStream = value;
   }),
   Preferences.get('disableAutoFetch').then(function resolved(value) {
    PDFJS.disableAutoFetch = value;
   }),
   Preferences.get('disableFontFace').then(function resolved(value) {
    if (PDFJS.disableFontFace === true) {
     return;
    }
    PDFJS.disableFontFace = value;
   }),
   Preferences.get('useOnlyCssZoom').then(function resolved(value) {
    PDFJS.useOnlyCssZoom = value;
   }),
   Preferences.get('externalLinkTarget').then(function resolved(value) {
    if (PDFJS.isExternalLinkTargetSet()) {
     return;
    }
    PDFJS.externalLinkTarget = value;
   }),
   Preferences.get('renderer').then(function resolved(value) {
    self.viewerPrefs['renderer'] = value;
   }),
   Preferences.get('renderInteractiveForms').then(function resolved(value) {
    self.viewerPrefs['renderInteractiveForms'] = value;
   }),
   Preferences.get('disablePageLabels').then(function resolved(value) {
    self.viewerPrefs['disablePageLabels'] = value;
   }),
   Preferences.get('enablePrintAutoRotate').then(function resolved(value) {
    self.viewerPrefs['enablePrintAutoRotate'] = value;
   })
  ]).catch(function (reason) {
  });
 },
 _initializeViewerComponents: function () {
  var self = this;
  var appConfig = this.appConfig;
  return new Promise(function (resolve, reject) {
   var eventBus = appConfig.eventBus || getGlobalEventBus();
   self.eventBus = eventBus;
   var pdfRenderingQueue = new PDFRenderingQueue();
   pdfRenderingQueue.onIdle = self.cleanup.bind(self);
   self.pdfRenderingQueue = pdfRenderingQueue;
   var pdfLinkService = new PDFLinkService({ eventBus: eventBus });
   self.pdfLinkService = pdfLinkService;
   var downloadManager = self.externalServices.createDownloadManager();
   self.downloadManager = downloadManager;
   var container = appConfig.mainContainer;
   var viewer = appConfig.viewerContainer;
   self.pdfViewer = new PDFViewer({
    container: container,
    viewer: viewer,
    eventBus: eventBus,
    renderingQueue: pdfRenderingQueue,
    linkService: pdfLinkService,
    downloadManager: downloadManager,
    renderer: self.viewerPrefs['renderer'],
    enhanceTextSelection: self.viewerPrefs['enhanceTextSelection'],
    renderInteractiveForms: self.viewerPrefs['renderInteractiveForms'],
    enablePrintAutoRotate: self.viewerPrefs['enablePrintAutoRotate']
   });
   pdfRenderingQueue.setViewer(self.pdfViewer);
   pdfLinkService.setViewer(self.pdfViewer);
   var thumbnailContainer = appConfig.sidebar.thumbnailView;
   self.pdfThumbnailViewer = new PDFThumbnailViewer({
    container: thumbnailContainer,
    renderingQueue: pdfRenderingQueue,
    linkService: pdfLinkService
   });
   pdfRenderingQueue.setThumbnailViewer(self.pdfThumbnailViewer);
   self.pdfHistory = new PDFHistory({
    linkService: pdfLinkService,
    eventBus: eventBus
   });
   pdfLinkService.setHistory(self.pdfHistory);
   self.findController = new PDFFindController({ pdfViewer: self.pdfViewer });
   self.findController.onUpdateResultsCount = function (matchCount) {
    if (self.supportsIntegratedFind) {
     return;
    }
    self.findBar.updateResultsCount(matchCount);
   };
   self.findController.onUpdateState = function (state, previous, matchCount) {
    if (self.supportsIntegratedFind) {
     self.externalServices.updateFindControlState({
      result: state,
      findPrevious: previous
     });
    } else {
     self.findBar.updateUIState(state, previous, matchCount);
    }
   };
   self.pdfViewer.setFindController(self.findController);
   var findBarConfig = Object.create(appConfig.findBar);
   findBarConfig.findController = self.findController;
   findBarConfig.eventBus = eventBus;
   self.findBar = new PDFFindBar(findBarConfig);
   self.overlayManager = OverlayManager;
   self.handTool = new HandTool({
    container: container,
    eventBus: eventBus
   });
   self.pdfDocumentProperties = new PDFDocumentProperties(appConfig.documentProperties);
   self.toolbar = new Toolbar(appConfig.toolbar, container, eventBus);
   self.secondaryToolbar = new SecondaryToolbar(appConfig.secondaryToolbar, container, eventBus);
   if (self.supportsFullscreen) {
    self.pdfPresentationMode = new PDFPresentationMode({
     container: container,
     viewer: viewer,
     pdfViewer: self.pdfViewer,
     eventBus: eventBus,
     contextMenuItems: appConfig.fullscreen
    });
   }
   self.passwordPrompt = new PasswordPrompt(appConfig.passwordOverlay);
   self.pdfOutlineViewer = new PDFOutlineViewer({
    container: appConfig.sidebar.outlineView,
    eventBus: eventBus,
    linkService: pdfLinkService
   });
   self.pdfAttachmentViewer = new PDFAttachmentViewer({
    container: appConfig.sidebar.attachmentsView,
    eventBus: eventBus,
    downloadManager: downloadManager
   });
   var sidebarConfig = Object.create(appConfig.sidebar);
   sidebarConfig.pdfViewer = self.pdfViewer;
   sidebarConfig.pdfThumbnailViewer = self.pdfThumbnailViewer;
   sidebarConfig.pdfOutlineViewer = self.pdfOutlineViewer;
   sidebarConfig.eventBus = eventBus;
   self.pdfSidebar = new PDFSidebar(sidebarConfig);
   self.pdfSidebar.onToggled = self.forceRendering.bind(self);
   resolve(undefined);
  });
 },
 run: function pdfViewRun(config) {
  this.initialize(config).then(webViewerInitialized);
 },
 zoomIn: function pdfViewZoomIn(ticks) {
  var newScale = this.pdfViewer.currentScale;
  do {
   newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
   newScale = Math.ceil(newScale * 10) / 10;
   newScale = Math.min(MAX_SCALE, newScale);
  } while (--ticks > 0 && newScale < MAX_SCALE);
  this.pdfViewer.currentScaleValue = newScale;
 },
 zoomOut: function pdfViewZoomOut(ticks) {
  var newScale = this.pdfViewer.currentScale;
  do {
   newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
   newScale = Math.floor(newScale * 10) / 10;
   newScale = Math.max(MIN_SCALE, newScale);
  } while (--ticks > 0 && newScale > MIN_SCALE);
  this.pdfViewer.currentScaleValue = newScale;
 },
 get pagesCount() {
  return this.pdfDocument ? this.pdfDocument.numPages : 0;
 },
 set page(val) {
  this.pdfViewer.currentPageNumber = val;
 },
 get page() {
  return this.pdfViewer.currentPageNumber;
 },
 get printing() {
  return !!this.printService;
 },
 get supportsPrinting() {
  return PDFPrintServiceFactory.instance.supportsPrinting;
 },
 get supportsFullscreen() {
  var support;
  var doc = document.documentElement;
  support = !!(doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullScreen || doc.msRequestFullscreen);
  if (document.fullscreenEnabled === false || document.mozFullScreenEnabled === false || document.webkitFullscreenEnabled === false || document.msFullscreenEnabled === false) {
   support = false;
  }
  if (support && pdfjsLib.PDFJS.disableFullscreen === true) {
   support = false;
  }
  return pdfjsLib.shadow(this, 'supportsFullscreen', support);
 },
 get supportsIntegratedFind() {
  return this.externalServices.supportsIntegratedFind;
 },
 get supportsDocumentFonts() {
  return this.externalServices.supportsDocumentFonts;
 },
 get supportsDocumentColors() {
  return this.externalServices.supportsDocumentColors;
 },
 get loadingBar() {
  var bar = new ProgressBar('#loadingBar', {});
  return pdfjsLib.shadow(this, 'loadingBar', bar);
 },
 get supportedMouseWheelZoomModifierKeys() {
  return this.externalServices.supportedMouseWheelZoomModifierKeys;
 },
 initPassiveLoading: function pdfViewInitPassiveLoading() {
  throw new Error('Not implemented: initPassiveLoading');
 },
 setTitleUsingUrl: function pdfViewSetTitleUsingUrl(url) {
  this.url = url;
  this.baseUrl = url.split('#')[0];
  var title = getPDFFileNameFromURL(url, '');
  if (!title) {
   try {
    title = decodeURIComponent(pdfjsLib.getFilenameFromUrl(url)) || url;
   } catch (e) {
    title = url;
   }
  }
  this.setTitle(title);
 },
 setTitle: function pdfViewSetTitle(title) {
  if (this.isViewerEmbedded) {
   return;
  }
  document.title = title;
 },
 close: function pdfViewClose() {
  var errorWrapper = this.appConfig.errorWrapper.container;
  errorWrapper.setAttribute('hidden', 'true');
  if (!this.pdfLoadingTask) {
   return Promise.resolve();
  }
  var promise = this.pdfLoadingTask.destroy();
  this.pdfLoadingTask = null;
  if (this.pdfDocument) {
   this.pdfDocument = null;
   this.pdfThumbnailViewer.setDocument(null);
   this.pdfViewer.setDocument(null);
   this.pdfLinkService.setDocument(null, null);
  }
  this.store = null;
  this.isInitialViewSet = false;
  this.pdfSidebar.reset();
  this.pdfOutlineViewer.reset();
  this.pdfAttachmentViewer.reset();
  this.findController.reset();
  this.findBar.reset();
  this.toolbar.reset();
  this.secondaryToolbar.reset();
  if (typeof PDFBug !== 'undefined') {
   PDFBug.cleanup();
  }
  return promise;
 },
 open: function pdfViewOpen(file, args) {
  if (arguments.length > 2 || typeof args === 'number') {
   return Promise.reject(new Error('Call of open() with obsolete signature.'));
  }
  if (this.pdfLoadingTask) {
   return this.close().then(function () {
    Preferences.reload();
    return this.open(file, args);
   }.bind(this));
  }
  var parameters = Object.create(null), scale;
  if (typeof file === 'string') {
   this.setTitleUsingUrl(file);
   parameters.url = file;
  } else if (file && 'byteLength' in file) {
   parameters.data = file;
  } else if (file.url && file.originalUrl) {
   this.setTitleUsingUrl(file.originalUrl);
   parameters.url = file.url;
  }
  if (args) {
   for (var prop in args) {
    parameters[prop] = args[prop];
   }
   if (args.scale) {
    scale = args.scale;
   }
   if (args.length) {
    this.pdfDocumentProperties.setFileSize(args.length);
   }
  }
  var self = this;
  self.downloadComplete = false;
  var loadingTask = pdfjsLib.getDocument(parameters);
  this.pdfLoadingTask = loadingTask;
  loadingTask.onPassword = function passwordNeeded(updateCallback, reason) {
   self.passwordPrompt.setUpdateCallback(updateCallback, reason);
   self.passwordPrompt.open();
  };
  loadingTask.onProgress = function getDocumentProgress(progressData) {
   self.progress(progressData.loaded / progressData.total);
  };
  loadingTask.onUnsupportedFeature = this.fallback.bind(this);
  return loadingTask.promise.then(function getDocumentCallback(pdfDocument) {
   self.load(pdfDocument, scale);
  }, function getDocumentError(exception) {
   var message = exception && exception.message;
   var loadingErrorMessage = mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.');
   if (exception instanceof pdfjsLib.InvalidPDFException) {
    loadingErrorMessage = mozL10n.get('invalid_file_error', null, 'Invalid or corrupted PDF file.');
   } else if (exception instanceof pdfjsLib.MissingPDFException) {
    loadingErrorMessage = mozL10n.get('missing_file_error', null, 'Missing PDF file.');
   } else if (exception instanceof pdfjsLib.UnexpectedResponseException) {
    loadingErrorMessage = mozL10n.get('unexpected_response_error', null, 'Unexpected server response.');
   }
   var moreInfo = { message: message };
   self.error(loadingErrorMessage, moreInfo);
   throw new Error(loadingErrorMessage);
  });
 },
 download: function pdfViewDownload() {
  function downloadByUrl() {
   downloadManager.downloadUrl(url, filename);
  }
  var url = this.baseUrl;
  var filename = getPDFFileNameFromURL(this.url);
  var downloadManager = this.downloadManager;
  downloadManager.onerror = function (err) {
   PDFViewerApplication.error('PDF failed to download.');
  };
  if (!this.pdfDocument) {
   downloadByUrl();
   return;
  }
  if (!this.downloadComplete) {
   downloadByUrl();
   return;
  }
  this.pdfDocument.getData().then(function getDataSuccess(data) {
   var blob = pdfjsLib.createBlob(data, 'application/pdf');
   downloadManager.download(blob, url, filename);
  }, downloadByUrl).then(null, downloadByUrl);
 },
 fallback: function pdfViewFallback(featureId) {
 },
 error: function pdfViewError(message, moreInfo) {
  var moreInfoText = mozL10n.get('error_version_info', {
   version: pdfjsLib.version || '?',
   build: pdfjsLib.build || '?'
  }, 'PDF.js v{{version}} (build: {{build}})') + '\n';
  if (moreInfo) {
   moreInfoText += mozL10n.get('error_message', { message: moreInfo.message }, 'Message: {{message}}');
   if (moreInfo.stack) {
    moreInfoText += '\n' + mozL10n.get('error_stack', { stack: moreInfo.stack }, 'Stack: {{stack}}');
   } else {
    if (moreInfo.filename) {
     moreInfoText += '\n' + mozL10n.get('error_file', { file: moreInfo.filename }, 'File: {{file}}');
    }
    if (moreInfo.lineNumber) {
     moreInfoText += '\n' + mozL10n.get('error_line', { line: moreInfo.lineNumber }, 'Line: {{line}}');
    }
   }
  }
  var errorWrapperConfig = this.appConfig.errorWrapper;
  var errorWrapper = errorWrapperConfig.container;
  errorWrapper.removeAttribute('hidden');
  var errorMessage = errorWrapperConfig.errorMessage;
  errorMessage.textContent = message;
  var closeButton = errorWrapperConfig.closeButton;
  closeButton.onclick = function () {
   errorWrapper.setAttribute('hidden', 'true');
  };
  var errorMoreInfo = errorWrapperConfig.errorMoreInfo;
  var moreInfoButton = errorWrapperConfig.moreInfoButton;
  var lessInfoButton = errorWrapperConfig.lessInfoButton;
  moreInfoButton.onclick = function () {
   errorMoreInfo.removeAttribute('hidden');
   moreInfoButton.setAttribute('hidden', 'true');
   lessInfoButton.removeAttribute('hidden');
   errorMoreInfo.style.height = errorMoreInfo.scrollHeight + 'px';
  };
  lessInfoButton.onclick = function () {
   errorMoreInfo.setAttribute('hidden', 'true');
   moreInfoButton.removeAttribute('hidden');
   lessInfoButton.setAttribute('hidden', 'true');
  };
  moreInfoButton.oncontextmenu = noContextMenuHandler;
  lessInfoButton.oncontextmenu = noContextMenuHandler;
  closeButton.oncontextmenu = noContextMenuHandler;
  moreInfoButton.removeAttribute('hidden');
  lessInfoButton.setAttribute('hidden', 'true');
  errorMoreInfo.value = moreInfoText;
 },
 progress: function pdfViewProgress(level) {
  var percent = Math.round(level * 100);
  if (percent > this.loadingBar.percent || isNaN(percent)) {
   this.loadingBar.percent = percent;
   if (pdfjsLib.PDFJS.disableAutoFetch && percent) {
    if (this.disableAutoFetchLoadingBarTimeout) {
     clearTimeout(this.disableAutoFetchLoadingBarTimeout);
     this.disableAutoFetchLoadingBarTimeout = null;
    }
    this.loadingBar.show();
    this.disableAutoFetchLoadingBarTimeout = setTimeout(function () {
     this.loadingBar.hide();
     this.disableAutoFetchLoadingBarTimeout = null;
    }.bind(this), DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
   }
  }
 },
 load: function pdfViewLoad(pdfDocument, scale) {
  var self = this;
  scale = scale || UNKNOWN_SCALE;
  this.pdfDocument = pdfDocument;
  this.pdfDocumentProperties.setDocumentAndUrl(pdfDocument, this.url);
  var downloadedPromise = pdfDocument.getDownloadInfo().then(function () {
   self.downloadComplete = true;
   self.loadingBar.hide();
  });
  this.toolbar.setPagesCount(pdfDocument.numPages, false);
  this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
  var id = this.documentFingerprint = pdfDocument.fingerprint;
  var store = this.store = new ViewHistory(id);
  var baseDocumentUrl;
  baseDocumentUrl = null;
  this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
  var pdfViewer = this.pdfViewer;
  pdfViewer.currentScale = scale;
  pdfViewer.setDocument(pdfDocument);
  var firstPagePromise = pdfViewer.firstPagePromise;
  var pagesPromise = pdfViewer.pagesPromise;
  var onePageRendered = pdfViewer.onePageRendered;
  this.pageRotation = 0;
  var pdfThumbnailViewer = this.pdfThumbnailViewer;
  pdfThumbnailViewer.setDocument(pdfDocument);
  firstPagePromise.then(function (pdfPage) {
   downloadedPromise.then(function () {
    self.eventBus.dispatch('documentload', { source: self });
   });
   self.loadingBar.setWidth(self.appConfig.viewerContainer);
   if (!pdfjsLib.PDFJS.disableHistory && !self.isViewerEmbedded) {
    if (!self.viewerPrefs['showPreviousViewOnLoad']) {
     self.pdfHistory.clearHistoryState();
    }
    self.pdfHistory.initialize(self.documentFingerprint);
    if (self.pdfHistory.initialDestination) {
     self.initialDestination = self.pdfHistory.initialDestination;
    } else if (self.pdfHistory.initialBookmark) {
     self.initialBookmark = self.pdfHistory.initialBookmark;
    }
   }
   var initialParams = {
    destination: self.initialDestination,
    bookmark: self.initialBookmark,
    hash: null
   };
   store.initializedPromise.then(function resolved() {
    var storedHash = null, sidebarView = null;
    if (self.viewerPrefs['showPreviousViewOnLoad'] && store.get('exists', false)) {
     var pageNum = store.get('page', '1');
     var zoom = self.viewerPrefs['defaultZoomValue'] || store.get('zoom', DEFAULT_SCALE_VALUE);
     var left = store.get('scrollLeft', '0');
     var top = store.get('scrollTop', '0');
     storedHash = 'page=' + pageNum + '&zoom=' + zoom + ',' + left + ',' + top;
     sidebarView = store.get('sidebarView', SidebarView.NONE);
    } else if (self.viewerPrefs['defaultZoomValue']) {
     storedHash = 'page=1&zoom=' + self.viewerPrefs['defaultZoomValue'];
    }
    self.setInitialView(storedHash, {
     scale: scale,
     sidebarView: sidebarView
    });
    initialParams.hash = storedHash;
    if (!self.isViewerEmbedded) {
     self.pdfViewer.focus();
    }
   }, function rejected(reason) {
    console.error(reason);
    self.setInitialView(null, { scale: scale });
   });
   pagesPromise.then(function resolved() {
    if (!initialParams.destination && !initialParams.bookmark && !initialParams.hash) {
     return;
    }
    if (self.hasEqualPageSizes) {
     return;
    }
    self.initialDestination = initialParams.destination;
    self.initialBookmark = initialParams.bookmark;
    self.pdfViewer.currentScaleValue = self.pdfViewer.currentScaleValue;
    self.setInitialView(initialParams.hash);
   });
  });
  pdfDocument.getPageLabels().then(function (labels) {
   if (!labels || self.viewerPrefs['disablePageLabels']) {
    return;
   }
   var i = 0, numLabels = labels.length;
   if (numLabels !== self.pagesCount) {
    console.error('The number of Page Labels does not match ' + 'the number of pages in the document.');
    return;
   }
   while (i < numLabels && labels[i] === (i + 1).toString()) {
    i++;
   }
   if (i === numLabels) {
    return;
   }
   pdfViewer.setPageLabels(labels);
   pdfThumbnailViewer.setPageLabels(labels);
   self.toolbar.setPagesCount(pdfDocument.numPages, true);
   self.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  });
  pagesPromise.then(function () {
   if (self.supportsPrinting) {
    pdfDocument.getJavaScript().then(function (javaScript) {
     if (javaScript.length) {
      console.warn('Warning: JavaScript is not supported');
      self.fallback(pdfjsLib.UNSUPPORTED_FEATURES.javaScript);
     }
     var regex = /\bprint\s*\(/;
     for (var i = 0, ii = javaScript.length; i < ii; i++) {
      var js = javaScript[i];
      if (js && regex.test(js)) {
       setTimeout(function () {
        window.print();
       });
       return;
      }
     }
    });
   }
  });
  Promise.all([
   onePageRendered,
   animationStarted
  ]).then(function () {
   pdfDocument.getOutline().then(function (outline) {
    self.pdfOutlineViewer.render({ outline: outline });
   });
   pdfDocument.getAttachments().then(function (attachments) {
    self.pdfAttachmentViewer.render({ attachments: attachments });
   });
  });
  pdfDocument.getMetadata().then(function (data) {
   var info = data.info, metadata = data.metadata;
   self.documentInfo = info;
   self.metadata = metadata;
   console.log('PDF ' + pdfDocument.fingerprint + ' [' + info.PDFFormatVersion + ' ' + (info.Producer || '-').trim() + ' / ' + (info.Creator || '-').trim() + ']' + ' (PDF.js: ' + (pdfjsLib.version || '-') + (!pdfjsLib.PDFJS.disableWebGL ? ' [WebGL]' : '') + ')');
   var pdfTitle;
   if (metadata && metadata.has('dc:title')) {
    var title = metadata.get('dc:title');
    if (title !== 'Untitled') {
     pdfTitle = title;
    }
   }
   if (!pdfTitle && info && info['Title']) {
    pdfTitle = info['Title'];
   }
   if (pdfTitle) {
    self.setTitle(pdfTitle + ' - ' + document.title);
   }
   if (info.IsAcroFormPresent) {
    console.warn('Warning: AcroForm/XFA is not supported');
    self.fallback(pdfjsLib.UNSUPPORTED_FEATURES.forms);
   }
  });
 },
 setInitialView: function pdfViewSetInitialView(storedHash, options) {
  var scale = options && options.scale;
  var sidebarView = options && options.sidebarView;
  this.isInitialViewSet = true;
  this.pdfSidebar.setInitialView(this.viewerPrefs['sidebarViewOnLoad'] || sidebarView | 0);
  if (this.initialDestination) {
   this.pdfLinkService.navigateTo(this.initialDestination);
   this.initialDestination = null;
  } else if (this.initialBookmark) {
   this.pdfLinkService.setHash(this.initialBookmark);
   this.pdfHistory.push({ hash: this.initialBookmark }, true);
   this.initialBookmark = null;
  } else if (storedHash) {
   this.pdfLinkService.setHash(storedHash);
  } else if (scale) {
   this.pdfViewer.currentScaleValue = scale;
   this.page = 1;
  }
  this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
  this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);
  if (!this.pdfViewer.currentScaleValue) {
   this.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
  }
 },
 cleanup: function pdfViewCleanup() {
  if (!this.pdfDocument) {
   return;
  }
  this.pdfViewer.cleanup();
  this.pdfThumbnailViewer.cleanup();
  if (this.pdfViewer.renderer !== RendererType.SVG) {
   if (this.pdfDocument) {
    this.pdfDocument.cleanup();
   }
  }
 },
 forceRendering: function pdfViewForceRendering() {
  this.pdfRenderingQueue.printing = this.printing;
  this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible;
  this.pdfRenderingQueue.renderHighestPriority();
 },
 beforePrint: function pdfViewSetupBeforePrint() {
  if (this.printService) {
   return;
  }
  if (!this.supportsPrinting) {
   var printMessage = mozL10n.get('printing_not_supported', null, 'Warning: Printing is not fully supported by this browser.');
   this.error(printMessage);
   return;
  }
  if (!this.pdfViewer.pageViewsReady) {
   var notReadyMessage = mozL10n.get('printing_not_ready', null, 'Warning: The PDF is not fully loaded for printing.');
   window.alert(notReadyMessage);
   return;
  }
  var pagesOverview = this.pdfViewer.getPagesOverview();
  var printContainer = this.appConfig.printContainer;
  var printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer);
  this.printService = printService;
  this.forceRendering();
  printService.layout();
 },
 get hasEqualPageSizes() {
  var firstPage = this.pdfViewer.getPageView(0);
  for (var i = 1, ii = this.pagesCount; i < ii; ++i) {
   var pageView = this.pdfViewer.getPageView(i);
   if (pageView.width !== firstPage.width || pageView.height !== firstPage.height) {
    return false;
   }
  }
  return true;
 },
 afterPrint: function pdfViewSetupAfterPrint() {
  if (this.printService) {
   this.printService.destroy();
   this.printService = null;
  }
  this.forceRendering();
 },
 rotatePages: function pdfViewRotatePages(delta) {
  var pageNumber = this.page;
  this.pageRotation = (this.pageRotation + 360 + delta) % 360;
  this.pdfViewer.pagesRotation = this.pageRotation;
  this.pdfThumbnailViewer.pagesRotation = this.pageRotation;
  this.forceRendering();
  this.pdfViewer.currentPageNumber = pageNumber;
 },
 requestPresentationMode: function pdfViewRequestPresentationMode() {
  if (!this.pdfPresentationMode) {
   return;
  }
  this.pdfPresentationMode.request();
 },
 bindEvents: function pdfViewBindEvents() {
  var eventBus = this.eventBus;
  eventBus.on('resize', webViewerResize);
  eventBus.on('hashchange', webViewerHashchange);
  eventBus.on('beforeprint', this.beforePrint.bind(this));
  eventBus.on('afterprint', this.afterPrint.bind(this));
  eventBus.on('pagerendered', webViewerPageRendered);
  eventBus.on('textlayerrendered', webViewerTextLayerRendered);
  eventBus.on('updateviewarea', webViewerUpdateViewarea);
  eventBus.on('pagechanging', webViewerPageChanging);
  eventBus.on('scalechanging', webViewerScaleChanging);
  eventBus.on('sidebarviewchanged', webViewerSidebarViewChanged);
  eventBus.on('pagemode', webViewerPageMode);
  eventBus.on('namedaction', webViewerNamedAction);
  eventBus.on('presentationmodechanged', webViewerPresentationModeChanged);
  eventBus.on('presentationmode', webViewerPresentationMode);
  eventBus.on('openfile', webViewerOpenFile);
  eventBus.on('print', webViewerPrint);
  eventBus.on('download', webViewerDownload);
  eventBus.on('firstpage', webViewerFirstPage);
  eventBus.on('lastpage', webViewerLastPage);
  eventBus.on('nextpage', webViewerNextPage);
  eventBus.on('previouspage', webViewerPreviousPage);
  eventBus.on('zoomin', webViewerZoomIn);
  eventBus.on('zoomout', webViewerZoomOut);
  eventBus.on('pagenumberchanged', webViewerPageNumberChanged);
  eventBus.on('scalechanged', webViewerScaleChanged);
  eventBus.on('rotatecw', webViewerRotateCw);
  eventBus.on('rotateccw', webViewerRotateCcw);
  eventBus.on('documentproperties', webViewerDocumentProperties);
  eventBus.on('find', webViewerFind);
  eventBus.on('findfromurlhash', webViewerFindFromUrlHash);
  eventBus.on('fileinputchange', webViewerFileInputChange);
 },
 bindWindowEvents: function pdfViewBindWindowEvents() {
  var eventBus = this.eventBus;
  window.addEventListener('wheel', webViewerWheel);
  window.addEventListener('click', webViewerClick);
  window.addEventListener('keydown', webViewerKeyDown);
  window.addEventListener('resize', function windowResize() {
   eventBus.dispatch('resize');
  });
  window.addEventListener('hashchange', function windowHashChange() {
   eventBus.dispatch('hashchange', { hash: document.location.hash.substring(1) });
  });
  window.addEventListener('beforeprint', function windowBeforePrint() {
   eventBus.dispatch('beforeprint');
  });
  window.addEventListener('afterprint', function windowAfterPrint() {
   eventBus.dispatch('afterprint');
  });
  window.addEventListener('change', function windowChange(evt) {
   var files = evt.target.files;
   if (!files || files.length === 0) {
    return;
   }
   if (evt.target.id == PDFViewerApplication.appConfig.openFileInputName)
    eventBus.dispatch('fileinputchange', { fileInput: evt.target });
  });
 }
};
var validateFileURL;
var HOSTED_VIEWER_ORIGINS = [
 'null',
 'http://mozilla.github.io',
 'https://mozilla.github.io'
];
validateFileURL = function validateFileURL(file) {
 try {
  var viewerOrigin = new URL(window.location.href).origin || 'null';
  if (HOSTED_VIEWER_ORIGINS.indexOf(viewerOrigin) >= 0) {
   return;
  }
  var fileOrigin = new URL(file, window.location.href).origin;
  if (fileOrigin !== viewerOrigin) {
   throw new Error('file origin does not match viewer\'s');
  }
 } catch (e) {
  var message = e && e.message;
  var loadingErrorMessage = mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.');
  var moreInfo = { message: message };
  PDFViewerApplication.error(loadingErrorMessage, moreInfo);
  throw e;
 }
};
function loadAndEnablePDFBug(enabledTabs) {
 return new Promise(function (resolve, reject) {
  var appConfig = PDFViewerApplication.appConfig;
  var script = document.createElement('script');
  script.src = appConfig.debuggerScriptPath;
  script.onload = function () {
   PDFBug.enable(enabledTabs);
   PDFBug.init(pdfjsLib, appConfig.mainContainer);
   resolve();
  };
  script.onerror = function () {
   reject(new Error('Cannot load debugger at ' + script.src));
  };
  (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
 });
}
function webViewerInitialized() {
 var appConfig = PDFViewerApplication.appConfig;
 var file;
 var queryString = document.location.search.substring(1);
 var params = parseQueryString(queryString);
 file = 'file' in params ? params.file : appConfig.defaultUrl;
 validateFileURL(file);
 var waitForBeforeOpening = [];
 var fileInput = document.createElement('input');
 fileInput.id = appConfig.openFileInputName;
 fileInput.className = 'fileInput';
 fileInput.setAttribute('type', 'file');
 fileInput.oncontextmenu = noContextMenuHandler;
 document.body.appendChild(fileInput);
 if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
  appConfig.toolbar.openFile.setAttribute('hidden', 'true');
  appConfig.secondaryToolbar.openFileButton.setAttribute('hidden', 'true');
 } else {
  fileInput.value = null;
 }
 var PDFJS = pdfjsLib.PDFJS;
 if (PDFViewerApplication.viewerPrefs['pdfBugEnabled']) {
  var hash = document.location.hash.substring(1);
  var hashParams = parseQueryString(hash);
  if ('disableworker' in hashParams) {
   PDFJS.disableWorker = hashParams['disableworker'] === 'true';
  }
  if ('disablerange' in hashParams) {
   PDFJS.disableRange = hashParams['disablerange'] === 'true';
  }
  if ('disablestream' in hashParams) {
   PDFJS.disableStream = hashParams['disablestream'] === 'true';
  }
  if ('disableautofetch' in hashParams) {
   PDFJS.disableAutoFetch = hashParams['disableautofetch'] === 'true';
  }
  if ('disablefontface' in hashParams) {
   PDFJS.disableFontFace = hashParams['disablefontface'] === 'true';
  }
  if ('disablehistory' in hashParams) {
   PDFJS.disableHistory = hashParams['disablehistory'] === 'true';
  }
  if ('webgl' in hashParams) {
   PDFJS.disableWebGL = hashParams['webgl'] !== 'true';
  }
  if ('useonlycsszoom' in hashParams) {
   PDFJS.useOnlyCssZoom = hashParams['useonlycsszoom'] === 'true';
  }
  if ('verbosity' in hashParams) {
   PDFJS.verbosity = hashParams['verbosity'] | 0;
  }
  if ('ignorecurrentpositiononzoom' in hashParams) {
   PDFJS.ignoreCurrentPositionOnZoom = hashParams['ignorecurrentpositiononzoom'] === 'true';
  }
  if ('locale' in hashParams) {
   PDFJS.locale = hashParams['locale'];
  }
  if ('textlayer' in hashParams) {
   switch (hashParams['textlayer']) {
   case 'off':
    PDFJS.disableTextLayer = true;
    break;
   case 'visible':
   case 'shadow':
   case 'hover':
    var viewer = appConfig.viewerContainer;
    viewer.classList.add('textLayer-' + hashParams['textlayer']);
    break;
   }
  }
  if ('pdfbug' in hashParams) {
   PDFJS.pdfBug = true;
   var pdfBug = hashParams['pdfbug'];
   var enabled = pdfBug.split(',');
   waitForBeforeOpening.push(loadAndEnablePDFBug(enabled));
  }
 }
 mozL10n.setLanguage(PDFJS.locale);
 if (!PDFViewerApplication.supportsPrinting) {
  appConfig.toolbar.print.classList.add('hidden');
  appConfig.secondaryToolbar.printButton.classList.add('hidden');
 }
 if (!PDFViewerApplication.supportsFullscreen) {
  appConfig.toolbar.presentationModeButton.classList.add('hidden');
  appConfig.secondaryToolbar.presentationModeButton.classList.add('hidden');
 }
 if (PDFViewerApplication.supportsIntegratedFind) {
  appConfig.toolbar.viewFind.classList.add('hidden');
 }
 appConfig.sidebar.mainContainer.addEventListener('transitionend', function (e) {
  if (e.target === this) {
   PDFViewerApplication.eventBus.dispatch('resize');
  }
 }, true);
 appConfig.sidebar.toggleButton.addEventListener('click', function () {
  PDFViewerApplication.pdfSidebar.toggle();
 });
 Promise.all(waitForBeforeOpening).then(function () {
  webViewerOpenFileViaURL(file);
 }).catch(function (reason) {
  PDFViewerApplication.error(mozL10n.get('loading_error', null, 'An error occurred while opening.'), reason);
 });
}
var webViewerOpenFileViaURL;
webViewerOpenFileViaURL = function webViewerOpenFileViaURL(file) {
 if (file && file.lastIndexOf('file:', 0) === 0) {
  PDFViewerApplication.setTitleUsingUrl(file);
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
   PDFViewerApplication.open(new Uint8Array(xhr.response));
  };
  try {
   xhr.open('GET', file);
   xhr.responseType = 'arraybuffer';
   xhr.send();
  } catch (e) {
   PDFViewerApplication.error(mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.'), e);
  }
  return;
 }
 if (file) {
  PDFViewerApplication.open(file);
 }
};
function webViewerPageRendered(e) {
 var pageNumber = e.pageNumber;
 var pageIndex = pageNumber - 1;
 var pageView = PDFViewerApplication.pdfViewer.getPageView(pageIndex);
 if (pageNumber === PDFViewerApplication.page) {
  PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
 }
 if (!pageView) {
  return;
 }
 if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
  var thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(pageIndex);
  thumbnailView.setImage(pageView);
 }
 if (pdfjsLib.PDFJS.pdfBug && Stats.enabled && pageView.stats) {
  Stats.add(pageNumber, pageView.stats);
 }
 if (pageView.error) {
  PDFViewerApplication.error(mozL10n.get('rendering_error', null, 'An error occurred while rendering the page.'), pageView.error);
 }
}
function webViewerTextLayerRendered(e) {
}
function webViewerPageMode(e) {
 var mode = e.mode, view;
 switch (mode) {
 case 'thumbs':
  view = SidebarView.THUMBS;
  break;
 case 'bookmarks':
 case 'outline':
  view = SidebarView.OUTLINE;
  break;
 case 'attachments':
  view = SidebarView.ATTACHMENTS;
  break;
 case 'none':
  view = SidebarView.NONE;
  break;
 default:
  console.error('Invalid "pagemode" hash parameter: ' + mode);
  return;
 }
 PDFViewerApplication.pdfSidebar.switchView(view, true);
}
function webViewerNamedAction(e) {
 var action = e.action;
 switch (action) {
 case 'GoToPage':
  PDFViewerApplication.appConfig.toolbar.pageNumber.select();
  break;
 case 'Find':
  if (!PDFViewerApplication.supportsIntegratedFind) {
   PDFViewerApplication.findBar.toggle();
  }
  break;
 }
}
function webViewerPresentationModeChanged(e) {
 var active = e.active;
 var switchInProgress = e.switchInProgress;
 PDFViewerApplication.pdfViewer.presentationModeState = switchInProgress ? PresentationModeState.CHANGING : active ? PresentationModeState.FULLSCREEN : PresentationModeState.NORMAL;
}
function webViewerSidebarViewChanged(e) {
 PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;
 var store = PDFViewerApplication.store;
 if (!store || !PDFViewerApplication.isInitialViewSet) {
  return;
 }
 store.initializedPromise.then(function () {
  store.set('sidebarView', e.view).catch(function () {
  });
 });
}
function webViewerUpdateViewarea(e) {
 var location = e.location, store = PDFViewerApplication.store;
 if (store) {
  store.initializedPromise.then(function () {
   store.setMultiple({
    'exists': true,
    'page': location.pageNumber,
    'zoom': location.scale,
    'scrollLeft': location.left,
    'scrollTop': location.top
   }).catch(function () {
   });
  });
 }
 var href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
 PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
 PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;
 PDFViewerApplication.pdfHistory.updateCurrentBookmark(location.pdfOpenParams, location.pageNumber);
 var currentPage = PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page - 1);
 var loading = currentPage.renderingState !== RenderingStates.FINISHED;
 PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}
function webViewerResize() {
 var currentScaleValue = PDFViewerApplication.pdfViewer.currentScaleValue;
 if (currentScaleValue === 'auto' || currentScaleValue === 'page-fit' || currentScaleValue === 'page-width') {
  PDFViewerApplication.pdfViewer.currentScaleValue = currentScaleValue;
 } else if (!currentScaleValue) {
  PDFViewerApplication.pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
 }
 PDFViewerApplication.pdfViewer.update();
}
function webViewerHashchange(e) {
 if (PDFViewerApplication.pdfHistory.isHashChangeUnlocked) {
  var hash = e.hash;
  if (!hash) {
   return;
  }
  if (!PDFViewerApplication.isInitialViewSet) {
   PDFViewerApplication.initialBookmark = hash;
  } else {
   PDFViewerApplication.pdfLinkService.setHash(hash);
  }
 }
}
var webViewerFileInputChange;
webViewerFileInputChange = function webViewerFileInputChange(e) {
 var file = e.fileInput.files[0];
 if (!pdfjsLib.PDFJS.disableCreateObjectURL && typeof URL !== 'undefined' && URL.createObjectURL) {
  PDFViewerApplication.open(URL.createObjectURL(file));
 } else {
  var fileReader = new FileReader();
  fileReader.onload = function webViewerChangeFileReaderOnload(evt) {
   var buffer = evt.target.result;
   var uint8Array = new Uint8Array(buffer);
   PDFViewerApplication.open(uint8Array);
  };
  fileReader.readAsArrayBuffer(file);
 }
 PDFViewerApplication.setTitleUsingUrl(file.name);
 var appConfig = PDFViewerApplication.appConfig;
 appConfig.toolbar.viewBookmark.setAttribute('hidden', 'true');
 appConfig.secondaryToolbar.viewBookmarkButton.setAttribute('hidden', 'true');
 appConfig.toolbar.download.setAttribute('hidden', 'true');
 appConfig.secondaryToolbar.downloadButton.setAttribute('hidden', 'true');
};
function webViewerPresentationMode() {
 PDFViewerApplication.requestPresentationMode();
}
function webViewerOpenFile() {
 var openFileInputName = PDFViewerApplication.appConfig.openFileInputName;
 document.getElementById(openFileInputName).click();
}
function webViewerPrint() {
 window.print();
}
function webViewerDownload() {
 PDFViewerApplication.download();
}
function webViewerFirstPage() {
 if (PDFViewerApplication.pdfDocument) {
  PDFViewerApplication.page = 1;
 }
}
function webViewerLastPage() {
 if (PDFViewerApplication.pdfDocument) {
  PDFViewerApplication.page = PDFViewerApplication.pagesCount;
 }
}
function webViewerNextPage() {
 PDFViewerApplication.page++;
}
function webViewerPreviousPage() {
 PDFViewerApplication.page--;
}
function webViewerZoomIn() {
 PDFViewerApplication.zoomIn();
}
function webViewerZoomOut() {
 PDFViewerApplication.zoomOut();
}
function webViewerPageNumberChanged(e) {
 var pdfViewer = PDFViewerApplication.pdfViewer;
 pdfViewer.currentPageLabel = e.value;
 if (e.value !== pdfViewer.currentPageNumber.toString() && e.value !== pdfViewer.currentPageLabel) {
  PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
 }
}
function webViewerScaleChanged(e) {
 PDFViewerApplication.pdfViewer.currentScaleValue = e.value;
}
function webViewerRotateCw() {
 PDFViewerApplication.rotatePages(90);
}
function webViewerRotateCcw() {
 PDFViewerApplication.rotatePages(-90);
}
function webViewerDocumentProperties() {
 PDFViewerApplication.pdfDocumentProperties.open();
}
function webViewerFind(e) {
 PDFViewerApplication.findController.executeCommand('find' + e.type, {
  query: e.query,
  phraseSearch: e.phraseSearch,
  caseSensitive: e.caseSensitive,
  highlightAll: e.highlightAll,
  findPrevious: e.findPrevious
 });
}
function webViewerFindFromUrlHash(e) {
 PDFViewerApplication.findController.executeCommand('find', {
  query: e.query,
  phraseSearch: e.phraseSearch,
  caseSensitive: false,
  highlightAll: true,
  findPrevious: false
 });
}
function webViewerScaleChanging(e) {
 PDFViewerApplication.toolbar.setPageScale(e.presetValue, e.scale);
 PDFViewerApplication.pdfViewer.update();
}
function webViewerPageChanging(e) {
 var page = e.pageNumber;
 PDFViewerApplication.toolbar.setPageNumber(page, e.pageLabel || null);
 PDFViewerApplication.secondaryToolbar.setPageNumber(page);
 if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
  PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(page);
 }
 if (pdfjsLib.PDFJS.pdfBug && Stats.enabled) {
  var pageView = PDFViewerApplication.pdfViewer.getPageView(page - 1);
  if (pageView.stats) {
   Stats.add(page, pageView.stats);
  }
 }
}
var zoomDisabled = false, zoomDisabledTimeout;
function webViewerWheel(evt) {
 var pdfViewer = PDFViewerApplication.pdfViewer;
 if (pdfViewer.isInPresentationMode) {
  return;
 }
 if (evt.ctrlKey || evt.metaKey) {
  var support = PDFViewerApplication.supportedMouseWheelZoomModifierKeys;
  if (evt.ctrlKey && !support.ctrlKey || evt.metaKey && !support.metaKey) {
   return;
  }
  evt.preventDefault();
  if (zoomDisabled) {
   return;
  }
  var previousScale = pdfViewer.currentScale;
  var delta = normalizeWheelEventDelta(evt);
  var MOUSE_WHEEL_DELTA_PER_PAGE_SCALE = 3.0;
  var ticks = delta * MOUSE_WHEEL_DELTA_PER_PAGE_SCALE;
  if (ticks < 0) {
   PDFViewerApplication.zoomOut(-ticks);
  } else {
   PDFViewerApplication.zoomIn(ticks);
  }
  var currentScale = pdfViewer.currentScale;
  if (previousScale !== currentScale) {
   var scaleCorrectionFactor = currentScale / previousScale - 1;
   var rect = pdfViewer.container.getBoundingClientRect();
   var dx = evt.clientX - rect.left;
   var dy = evt.clientY - rect.top;
   pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
   pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
  }
 } else {
  zoomDisabled = true;
  clearTimeout(zoomDisabledTimeout);
  zoomDisabledTimeout = setTimeout(function () {
   zoomDisabled = false;
  }, 1000);
 }
}
function webViewerClick(evt) {
 if (!PDFViewerApplication.secondaryToolbar.isOpen) {
  return;
 }
 var appConfig = PDFViewerApplication.appConfig;
 if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) && evt.target !== appConfig.secondaryToolbar.toggleButton) {
  PDFViewerApplication.secondaryToolbar.close();
 }
}
function webViewerKeyDown(evt) {
 if (OverlayManager.active) {
  return;
 }
 var handled = false, ensureViewerFocused = false;
 var cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);
 var pdfViewer = PDFViewerApplication.pdfViewer;
 var isViewerInPresentationMode = pdfViewer && pdfViewer.isInPresentationMode;
 if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
  switch (evt.keyCode) {
  case 70:
   if (!PDFViewerApplication.supportsIntegratedFind) {
    PDFViewerApplication.findBar.open();
    handled = true;
   }
   break;
  case 71:
   if (!PDFViewerApplication.supportsIntegratedFind) {
    var findState = PDFViewerApplication.findController.state;
    if (findState) {
     PDFViewerApplication.findController.executeCommand('findagain', {
      query: findState.query,
      phraseSearch: findState.phraseSearch,
      caseSensitive: findState.caseSensitive,
      highlightAll: findState.highlightAll,
      findPrevious: cmd === 5 || cmd === 12
     });
    }
    handled = true;
   }
   break;
  case 61:
  case 107:
  case 187:
  case 171:
   if (!isViewerInPresentationMode) {
    PDFViewerApplication.zoomIn();
   }
   handled = true;
   break;
  case 173:
  case 109:
  case 189:
   if (!isViewerInPresentationMode) {
    PDFViewerApplication.zoomOut();
   }
   handled = true;
   break;
  case 48:
  case 96:
   if (!isViewerInPresentationMode) {
    setTimeout(function () {
     pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
    });
    handled = false;
   }
   break;
  case 38:
   if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
    PDFViewerApplication.page = 1;
    handled = true;
    ensureViewerFocused = true;
   }
   break;
  case 40:
   if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
    handled = true;
    ensureViewerFocused = true;
   }
   break;
  }
 }
 if (cmd === 1 || cmd === 8) {
  switch (evt.keyCode) {
  case 83:
   PDFViewerApplication.download();
   handled = true;
   break;
  }
 }
 if (cmd === 3 || cmd === 10) {
  switch (evt.keyCode) {
  case 80:
   PDFViewerApplication.requestPresentationMode();
   handled = true;
   break;
  case 71:
   PDFViewerApplication.appConfig.toolbar.pageNumber.select();
   handled = true;
   break;
  }
 }
 if (handled) {
  if (ensureViewerFocused && !isViewerInPresentationMode) {
   pdfViewer.focus();
  }
  evt.preventDefault();
  return;
 }
 var curElement = document.activeElement || document.querySelector(':focus');
 var curElementTagName = curElement && curElement.tagName.toUpperCase();
 if (curElementTagName === 'INPUT' || curElementTagName === 'TEXTAREA' || curElementTagName === 'SELECT') {
  if (evt.keyCode !== 27) {
   return;
  }
 }
 if (cmd === 0) {
  switch (evt.keyCode) {
  case 38:
  case 33:
  case 8:
   if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
    break;
   }
  case 37:
   if (pdfViewer.isHorizontalScrollbarEnabled) {
    break;
   }
  case 75:
  case 80:
   if (PDFViewerApplication.page > 1) {
    PDFViewerApplication.page--;
   }
   handled = true;
   break;
  case 27:
   if (PDFViewerApplication.secondaryToolbar.isOpen) {
    PDFViewerApplication.secondaryToolbar.close();
    handled = true;
   }
   if (!PDFViewerApplication.supportsIntegratedFind && PDFViewerApplication.findBar.opened) {
    PDFViewerApplication.findBar.close();
    handled = true;
   }
   break;
  case 40:
  case 34:
  case 32:
   if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
    break;
   }
  case 39:
   if (pdfViewer.isHorizontalScrollbarEnabled) {
    break;
   }
  case 74:
  case 78:
   if (PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
    PDFViewerApplication.page++;
   }
   handled = true;
   break;
  case 36:
   if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
    PDFViewerApplication.page = 1;
    handled = true;
    ensureViewerFocused = true;
   }
   break;
  case 35:
   if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
    handled = true;
    ensureViewerFocused = true;
   }
   break;
  case 72:
   if (!isViewerInPresentationMode) {
    PDFViewerApplication.handTool.toggle();
   }
   break;
  case 82:
   PDFViewerApplication.rotatePages(90);
   break;
  }
 }
 if (cmd === 4) {
  switch (evt.keyCode) {
  case 32:
   if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
    break;
   }
   if (PDFViewerApplication.page > 1) {
    PDFViewerApplication.page--;
   }
   handled = true;
   break;
  case 82:
   PDFViewerApplication.rotatePages(-90);
   break;
  }
 }
 if (!handled && !isViewerInPresentationMode) {
  if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== 'BUTTON') {
   ensureViewerFocused = true;
  }
 }
 if (cmd === 2) {
  switch (evt.keyCode) {
  case 37:
   if (isViewerInPresentationMode) {
    PDFViewerApplication.pdfHistory.back();
    handled = true;
   }
   break;
  case 39:
   if (isViewerInPresentationMode) {
    PDFViewerApplication.pdfHistory.forward();
    handled = true;
   }
   break;
  }
 }
 if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
  pdfViewer.focus();
 }
 if (handled) {
  evt.preventDefault();
 }
}
localized.then(function webViewerLocalized() {
 document.getElementsByTagName('html')[0].dir = mozL10n.getDirection();
});
var PDFPrintServiceFactory = {
 instance: {
  supportsPrinting: false,
  createPrintService: function () {
   throw new Error('Not implemented: createPrintService');
  }
 }
};
exports.PDFViewerApplication = PDFViewerApplication;
exports.DefaultExernalServices = DefaultExernalServices;
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var scrollIntoView = uiUtils.scrollIntoView;
var FindStates = {
 FIND_FOUND: 0,
 FIND_NOTFOUND: 1,
 FIND_WRAPPED: 2,
 FIND_PENDING: 3
};
var FIND_SCROLL_OFFSET_TOP = -50;
var FIND_SCROLL_OFFSET_LEFT = -400;
var CHARACTERS_TO_NORMALIZE = {
 '\u2018': '\'',
 '\u2019': '\'',
 '\u201A': '\'',
 '\u201B': '\'',
 '\u201C': '"',
 '\u201D': '"',
 '\u201E': '"',
 '\u201F': '"',
 '\u00BC': '1/4',
 '\u00BD': '1/2',
 '\u00BE': '3/4'
};
var PDFFindController = function PDFFindControllerClosure() {
 function PDFFindController(options) {
  this.pdfViewer = options.pdfViewer || null;
  this.onUpdateResultsCount = null;
  this.onUpdateState = null;
  this.reset();
  var replace = Object.keys(CHARACTERS_TO_NORMALIZE).join('');
  this.normalizationRegex = new RegExp('[' + replace + ']', 'g');
 }
 PDFFindController.prototype = {
  reset: function PDFFindController_reset() {
   this.startedTextExtraction = false;
   this.extractTextPromises = [];
   this.pendingFindMatches = Object.create(null);
   this.active = false;
   this.pageContents = [];
   this.pageMatches = [];
   this.pageMatchesLength = null;
   this.matchCount = 0;
   this.selected = {
    pageIdx: -1,
    matchIdx: -1
   };
   this.offset = {
    pageIdx: null,
    matchIdx: null
   };
   this.pagesToSearch = null;
   this.resumePageIdx = null;
   this.state = null;
   this.dirtyMatch = false;
   this.findTimeout = null;
   this.firstPagePromise = new Promise(function (resolve) {
    this.resolveFirstPage = resolve;
   }.bind(this));
  },
  normalize: function PDFFindController_normalize(text) {
   return text.replace(this.normalizationRegex, function (ch) {
    return CHARACTERS_TO_NORMALIZE[ch];
   });
  },
  _prepareMatches: function PDFFindController_prepareMatches(matchesWithLength, matches, matchesLength) {
   function isSubTerm(matchesWithLength, currentIndex) {
    var currentElem, prevElem, nextElem;
    currentElem = matchesWithLength[currentIndex];
    nextElem = matchesWithLength[currentIndex + 1];
    if (currentIndex < matchesWithLength.length - 1 && currentElem.match === nextElem.match) {
     currentElem.skipped = true;
     return true;
    }
    for (var i = currentIndex - 1; i >= 0; i--) {
     prevElem = matchesWithLength[i];
     if (prevElem.skipped) {
      continue;
     }
     if (prevElem.match + prevElem.matchLength < currentElem.match) {
      break;
     }
     if (prevElem.match + prevElem.matchLength >= currentElem.match + currentElem.matchLength) {
      currentElem.skipped = true;
      return true;
     }
    }
    return false;
   }
   var i, len;
   matchesWithLength.sort(function (a, b) {
    return a.match === b.match ? a.matchLength - b.matchLength : a.match - b.match;
   });
   for (i = 0, len = matchesWithLength.length; i < len; i++) {
    if (isSubTerm(matchesWithLength, i)) {
     continue;
    }
    matches.push(matchesWithLength[i].match);
    matchesLength.push(matchesWithLength[i].matchLength);
   }
  },
  calcFindPhraseMatch: function PDFFindController_calcFindPhraseMatch(query, pageIndex, pageContent) {
   var matches = [];
   var queryLen = query.length;
   var matchIdx = -queryLen;
   while (true) {
    matchIdx = pageContent.indexOf(query, matchIdx + queryLen);
    if (matchIdx === -1) {
     break;
    }
    matches.push(matchIdx);
   }
   this.pageMatches[pageIndex] = matches;
  },
  calcFindWordMatch: function PDFFindController_calcFindWordMatch(query, pageIndex, pageContent) {
   var matchesWithLength = [];
   var queryArray = query.match(/\S+/g);
   var subquery, subqueryLen, matchIdx;
   for (var i = 0, len = queryArray.length; i < len; i++) {
    subquery = queryArray[i];
    subqueryLen = subquery.length;
    matchIdx = -subqueryLen;
    while (true) {
     matchIdx = pageContent.indexOf(subquery, matchIdx + subqueryLen);
     if (matchIdx === -1) {
      break;
     }
     matchesWithLength.push({
      match: matchIdx,
      matchLength: subqueryLen,
      skipped: false
     });
    }
   }
   if (!this.pageMatchesLength) {
    this.pageMatchesLength = [];
   }
   this.pageMatchesLength[pageIndex] = [];
   this.pageMatches[pageIndex] = [];
   this._prepareMatches(matchesWithLength, this.pageMatches[pageIndex], this.pageMatchesLength[pageIndex]);
  },
  calcFindMatch: function PDFFindController_calcFindMatch(pageIndex) {
   var pageContent = this.normalize(this.pageContents[pageIndex]);
   var query = this.normalize(this.state.query);
   var caseSensitive = this.state.caseSensitive;
   var phraseSearch = this.state.phraseSearch;
   var queryLen = query.length;
   if (queryLen === 0) {
    return;
   }
   if (!caseSensitive) {
    pageContent = pageContent.toLowerCase();
    query = query.toLowerCase();
   }
   if (phraseSearch) {
    this.calcFindPhraseMatch(query, pageIndex, pageContent);
   } else {
    this.calcFindWordMatch(query, pageIndex, pageContent);
   }
   this.updatePage(pageIndex);
   if (this.resumePageIdx === pageIndex) {
    this.resumePageIdx = null;
    this.nextPageMatch();
   }
   if (this.pageMatches[pageIndex].length > 0) {
    this.matchCount += this.pageMatches[pageIndex].length;
    this.updateUIResultsCount();
   }
  },
  extractText: function PDFFindController_extractText() {
   if (this.startedTextExtraction) {
    return;
   }
   this.startedTextExtraction = true;
   this.pageContents = [];
   var extractTextPromisesResolves = [];
   var numPages = this.pdfViewer.pagesCount;
   for (var i = 0; i < numPages; i++) {
    this.extractTextPromises.push(new Promise(function (resolve) {
     extractTextPromisesResolves.push(resolve);
    }));
   }
   var self = this;
   function extractPageText(pageIndex) {
    self.pdfViewer.getPageTextContent(pageIndex).then(function textContentResolved(textContent) {
     var textItems = textContent.items;
     var str = [];
     for (var i = 0, len = textItems.length; i < len; i++) {
      str.push(textItems[i].str);
     }
     self.pageContents.push(str.join(''));
     extractTextPromisesResolves[pageIndex](pageIndex);
     if (pageIndex + 1 < self.pdfViewer.pagesCount) {
      extractPageText(pageIndex + 1);
     }
    });
   }
   extractPageText(0);
  },
  executeCommand: function PDFFindController_executeCommand(cmd, state) {
   if (this.state === null || cmd !== 'findagain') {
    this.dirtyMatch = true;
   }
   this.state = state;
   this.updateUIState(FindStates.FIND_PENDING);
   this.firstPagePromise.then(function () {
    this.extractText();
    clearTimeout(this.findTimeout);
    if (cmd === 'find') {
     this.findTimeout = setTimeout(this.nextMatch.bind(this), 250);
    } else {
     this.nextMatch();
    }
   }.bind(this));
  },
  updatePage: function PDFFindController_updatePage(index) {
   if (this.selected.pageIdx === index) {
    this.pdfViewer.currentPageNumber = index + 1;
   }
   var page = this.pdfViewer.getPageView(index);
   if (page.textLayer) {
    page.textLayer.updateMatches();
   }
  },
  nextMatch: function PDFFindController_nextMatch() {
   var previous = this.state.findPrevious;
   var currentPageIndex = this.pdfViewer.currentPageNumber - 1;
   var numPages = this.pdfViewer.pagesCount;
   this.active = true;
   if (this.dirtyMatch) {
    this.dirtyMatch = false;
    this.selected.pageIdx = this.selected.matchIdx = -1;
    this.offset.pageIdx = currentPageIndex;
    this.offset.matchIdx = null;
    this.hadMatch = false;
    this.resumePageIdx = null;
    this.pageMatches = [];
    this.matchCount = 0;
    this.pageMatchesLength = null;
    var self = this;
    for (var i = 0; i < numPages; i++) {
     this.updatePage(i);
     if (!(i in this.pendingFindMatches)) {
      this.pendingFindMatches[i] = true;
      this.extractTextPromises[i].then(function (pageIdx) {
       delete self.pendingFindMatches[pageIdx];
       self.calcFindMatch(pageIdx);
      });
     }
    }
   }
   if (this.state.query === '') {
    this.updateUIState(FindStates.FIND_FOUND);
    return;
   }
   if (this.resumePageIdx) {
    return;
   }
   var offset = this.offset;
   this.pagesToSearch = numPages;
   if (offset.matchIdx !== null) {
    var numPageMatches = this.pageMatches[offset.pageIdx].length;
    if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
     this.hadMatch = true;
     offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
     this.updateMatch(true);
     return;
    }
    this.advanceOffsetPage(previous);
   }
   this.nextPageMatch();
  },
  matchesReady: function PDFFindController_matchesReady(matches) {
   var offset = this.offset;
   var numMatches = matches.length;
   var previous = this.state.findPrevious;
   if (numMatches) {
    this.hadMatch = true;
    offset.matchIdx = previous ? numMatches - 1 : 0;
    this.updateMatch(true);
    return true;
   }
   this.advanceOffsetPage(previous);
   if (offset.wrapped) {
    offset.matchIdx = null;
    if (this.pagesToSearch < 0) {
     this.updateMatch(false);
     return true;
    }
   }
   return false;
  },
  updateMatchPosition: function PDFFindController_updateMatchPosition(pageIndex, index, elements, beginIdx) {
   if (this.selected.matchIdx === index && this.selected.pageIdx === pageIndex) {
    var spot = {
     top: FIND_SCROLL_OFFSET_TOP,
     left: FIND_SCROLL_OFFSET_LEFT
    };
    scrollIntoView(elements[beginIdx], spot, true);
   }
  },
  nextPageMatch: function PDFFindController_nextPageMatch() {
   if (this.resumePageIdx !== null) {
    console.error('There can only be one pending page.');
   }
   do {
    var pageIdx = this.offset.pageIdx;
    var matches = this.pageMatches[pageIdx];
    if (!matches) {
     this.resumePageIdx = pageIdx;
     break;
    }
   } while (!this.matchesReady(matches));
  },
  advanceOffsetPage: function PDFFindController_advanceOffsetPage(previous) {
   var offset = this.offset;
   var numPages = this.extractTextPromises.length;
   offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
   offset.matchIdx = null;
   this.pagesToSearch--;
   if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
    offset.pageIdx = previous ? numPages - 1 : 0;
    offset.wrapped = true;
   }
  },
  updateMatch: function PDFFindController_updateMatch(found) {
   var state = FindStates.FIND_NOTFOUND;
   var wrapped = this.offset.wrapped;
   this.offset.wrapped = false;
   if (found) {
    var previousPage = this.selected.pageIdx;
    this.selected.pageIdx = this.offset.pageIdx;
    this.selected.matchIdx = this.offset.matchIdx;
    state = wrapped ? FindStates.FIND_WRAPPED : FindStates.FIND_FOUND;
    if (previousPage !== -1 && previousPage !== this.selected.pageIdx) {
     this.updatePage(previousPage);
    }
   }
   this.updateUIState(state, this.state.findPrevious);
   if (this.selected.pageIdx !== -1) {
    this.updatePage(this.selected.pageIdx);
   }
  },
  updateUIResultsCount: function PDFFindController_updateUIResultsCount() {
   if (this.onUpdateResultsCount) {
    this.onUpdateResultsCount(this.matchCount);
   }
  },
  updateUIState: function PDFFindController_updateUIState(state, previous) {
   if (this.onUpdateState) {
    this.onUpdateState(state, previous, this.matchCount);
   }
  }
 };
 return PDFFindController;
}();
exports.FindStates = FindStates;
exports.PDFFindController = PDFFindController;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defaultPreferences = null;
function getDefaultPreferences() {
 if (!defaultPreferences) {
  defaultPreferences = Promise.resolve({
   "showPreviousViewOnLoad": true,
   "defaultZoomValue": "",
   "sidebarViewOnLoad": 0,
   "enableHandToolOnLoad": false,
   "enableWebGL": false,
   "pdfBugEnabled": false,
   "disableRange": false,
   "disableStream": false,
   "disableAutoFetch": false,
   "disableFontFace": false,
   "disableTextLayer": false,
   "useOnlyCssZoom": false,
   "externalLinkTarget": 0,
   "enhanceTextSelection": false,
   "renderer": "canvas",
   "renderInteractiveForms": false,
   "enablePrintAutoRotate": false,
   "disablePageLabels": false
  });
 }
 return defaultPreferences;
}
function cloneObj(obj) {
 var result = {};
 for (var i in obj) {
  if (Object.prototype.hasOwnProperty.call(obj, i)) {
   result[i] = obj[i];
  }
 }
 return result;
}
var Preferences = {
 prefs: null,
 isInitializedPromiseResolved: false,
 initializedPromise: null,
 initialize: function preferencesInitialize() {
  return this.initializedPromise = getDefaultPreferences().then(function (defaults) {
   Object.defineProperty(this, 'defaults', {
    value: Object.freeze(defaults),
    writable: false,
    enumerable: true,
    configurable: false
   });
   this.prefs = cloneObj(defaults);
   return this._readFromStorage(defaults);
  }.bind(this)).then(function (prefObj) {
   this.isInitializedPromiseResolved = true;
   if (prefObj) {
    this.prefs = prefObj;
   }
  }.bind(this));
 },
 _writeToStorage: function preferences_writeToStorage(prefObj) {
  return Promise.resolve();
 },
 _readFromStorage: function preferences_readFromStorage(prefObj) {
  return Promise.resolve();
 },
 reset: function preferencesReset() {
  return this.initializedPromise.then(function () {
   this.prefs = cloneObj(this.defaults);
   return this._writeToStorage(this.defaults);
  }.bind(this));
 },
 reload: function preferencesReload() {
  return this.initializedPromise.then(function () {
   this._readFromStorage(this.defaults).then(function (prefObj) {
    if (prefObj) {
     this.prefs = prefObj;
    }
   }.bind(this));
  }.bind(this));
 },
 set: function preferencesSet(name, value) {
  return this.initializedPromise.then(function () {
   if (this.defaults[name] === undefined) {
    throw new Error('preferencesSet: \'' + name + '\' is undefined.');
   } else if (value === undefined) {
    throw new Error('preferencesSet: no value is specified.');
   }
   var valueType = typeof value;
   var defaultType = typeof this.defaults[name];
   if (valueType !== defaultType) {
    if (valueType === 'number' && defaultType === 'string') {
     value = value.toString();
    } else {
     throw new Error('Preferences_set: \'' + value + '\' is a \"' + valueType + '\", expected \"' + defaultType + '\".');
    }
   } else {
    if (valueType === 'number' && (value | 0) !== value) {
     throw new Error('Preferences_set: \'' + value + '\' must be an \"integer\".');
    }
   }
   this.prefs[name] = value;
   return this._writeToStorage(this.prefs);
  }.bind(this));
 },
 get: function preferencesGet(name) {
  return this.initializedPromise.then(function () {
   var defaultValue = this.defaults[name];
   if (defaultValue === undefined) {
    throw new Error('preferencesGet: \'' + name + '\' is undefined.');
   } else {
    var prefValue = this.prefs[name];
    if (prefValue !== undefined) {
     return prefValue;
    }
   }
   return defaultValue;
  }.bind(this));
 }
};
Preferences._writeToStorage = function (prefObj) {
 return new Promise(function (resolve) {
  localStorage.setItem('pdfjs.preferences', JSON.stringify(prefObj));
  resolve();
 });
};
Preferences._readFromStorage = function (prefObj) {
 return new Promise(function (resolve) {
  var readPrefs = JSON.parse(localStorage.getItem('pdfjs.preferences'));
  resolve(readPrefs);
 });
};
exports.Preferences = Preferences;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var overlayManager = __webpack_require__(4);
var app = __webpack_require__(6);
var pdfjsLib = __webpack_require__(1);
var mozL10n = uiUtils.mozL10n;
var CSS_UNITS = uiUtils.CSS_UNITS;
var PDFPrintServiceFactory = app.PDFPrintServiceFactory;
var OverlayManager = overlayManager.OverlayManager;
var activeService = null;
function renderPage(activeServiceOnEntry, pdfDocument, pageNumber, size) {
 var scratchCanvas = activeService.scratchCanvas;
 var PRINT_RESOLUTION = 150;
 var PRINT_UNITS = PRINT_RESOLUTION / 72.0;
 scratchCanvas.width = Math.floor(size.width * PRINT_UNITS);
 scratchCanvas.height = Math.floor(size.height * PRINT_UNITS);
 var width = Math.floor(size.width * CSS_UNITS) + 'px';
 var height = Math.floor(size.height * CSS_UNITS) + 'px';
 var ctx = scratchCanvas.getContext('2d');
 ctx.save();
 ctx.fillStyle = 'rgb(255, 255, 255)';
 ctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
 ctx.restore();
 return pdfDocument.getPage(pageNumber).then(function (pdfPage) {
  var renderContext = {
   canvasContext: ctx,
   transform: [
    PRINT_UNITS,
    0,
    0,
    PRINT_UNITS,
    0,
    0
   ],
   viewport: pdfPage.getViewport(1, size.rotation),
   intent: 'print'
  };
  return pdfPage.render(renderContext).promise;
 }).then(function () {
  return {
   width: width,
   height: height
  };
 });
}
function PDFPrintService(pdfDocument, pagesOverview, printContainer) {
 this.pdfDocument = pdfDocument;
 this.pagesOverview = pagesOverview;
 this.printContainer = printContainer;
 this.currentPage = -1;
 this.scratchCanvas = document.createElement('canvas');
}
PDFPrintService.prototype = {
 layout: function () {
  this.throwIfInactive();
  var body = document.querySelector('body');
  body.setAttribute('data-pdfjsprinting', true);
  var hasEqualPageSizes = this.pagesOverview.every(function (size) {
   return size.width === this.pagesOverview[0].width && size.height === this.pagesOverview[0].height;
  }, this);
  if (!hasEqualPageSizes) {
   console.warn('Not all pages have the same size. The printed ' + 'result may be incorrect!');
  }
  this.pageStyleSheet = document.createElement('style');
  var pageSize = this.pagesOverview[0];
  this.pageStyleSheet.textContent = '@supports ((size:A4) and (size:1pt 1pt)) {' + '@page { size: ' + pageSize.width + 'pt ' + pageSize.height + 'pt;}' + '}';
  body.appendChild(this.pageStyleSheet);
 },
 destroy: function () {
  if (activeService !== this) {
   return;
  }
  this.printContainer.textContent = '';
  if (this.pageStyleSheet && this.pageStyleSheet.parentNode) {
   this.pageStyleSheet.parentNode.removeChild(this.pageStyleSheet);
   this.pageStyleSheet = null;
  }
  this.scratchCanvas.width = this.scratchCanvas.height = 0;
  this.scratchCanvas = null;
  activeService = null;
  ensureOverlay().then(function () {
   if (OverlayManager.active !== 'printServiceOverlay') {
    return;
   }
   OverlayManager.close('printServiceOverlay');
  });
 },
 renderPages: function () {
  var pageCount = this.pagesOverview.length;
  var renderNextPage = function (resolve, reject) {
   this.throwIfInactive();
   if (++this.currentPage >= pageCount) {
    renderProgress(pageCount, pageCount);
    resolve();
    return;
   }
   var index = this.currentPage;
   renderProgress(index, pageCount);
   renderPage(this, this.pdfDocument, index + 1, this.pagesOverview[index]).then(this.useRenderedPage.bind(this)).then(function () {
    renderNextPage(resolve, reject);
   }, reject);
  }.bind(this);
  return new Promise(renderNextPage);
 },
 useRenderedPage: function (printItem) {
  this.throwIfInactive();
  var img = document.createElement('img');
  img.style.width = printItem.width;
  img.style.height = printItem.height;
  var scratchCanvas = this.scratchCanvas;
  if ('toBlob' in scratchCanvas && !pdfjsLib.PDFJS.disableCreateObjectURL) {
   scratchCanvas.toBlob(function (blob) {
    img.src = URL.createObjectURL(blob);
   });
  } else {
   img.src = scratchCanvas.toDataURL();
  }
  var wrapper = document.createElement('div');
  wrapper.appendChild(img);
  this.printContainer.appendChild(wrapper);
  return new Promise(function (resolve, reject) {
   img.onload = resolve;
   img.onerror = reject;
  });
 },
 performPrint: function () {
  this.throwIfInactive();
  return new Promise(function (resolve) {
   setTimeout(function () {
    if (!this.active) {
     resolve();
     return;
    }
    print.call(window);
    setTimeout(resolve, 20);
   }.bind(this), 0);
  }.bind(this));
 },
 get active() {
  return this === activeService;
 },
 throwIfInactive: function () {
  if (!this.active) {
   throw new Error('This print request was cancelled or completed.');
  }
 }
};
var print = window.print;
window.print = function print() {
 if (activeService) {
  console.warn('Ignored window.print() because of a pending print job.');
  return;
 }
 ensureOverlay().then(function () {
  if (activeService) {
   OverlayManager.open('printServiceOverlay');
  }
 });
 try {
  dispatchEvent('beforeprint');
 } finally {
  if (!activeService) {
   console.error('Expected print service to be initialized.');
   if (OverlayManager.active === 'printServiceOverlay') {
    OverlayManager.close('printServiceOverlay');
   }
   return;
  }
  var activeServiceOnEntry = activeService;
  activeService.renderPages().then(function () {
   return activeServiceOnEntry.performPrint();
  }).catch(function () {
  }).then(function () {
   if (activeServiceOnEntry.active) {
    abort();
   }
  });
 }
};
function dispatchEvent(eventType) {
 var event = document.createEvent('CustomEvent');
 event.initCustomEvent(eventType, false, false, 'custom');
 window.dispatchEvent(event);
}
function abort() {
 if (activeService) {
  activeService.destroy();
  dispatchEvent('afterprint');
 }
}
function renderProgress(index, total) {
 var progressContainer = document.getElementById('printServiceOverlay');
 var progress = Math.round(100 * index / total);
 var progressBar = progressContainer.querySelector('progress');
 var progressPerc = progressContainer.querySelector('.relative-progress');
 progressBar.value = progress;
 progressPerc.textContent = mozL10n.get('print_progress_percent', { progress: progress }, progress + '%');
}
var hasAttachEvent = !!document.attachEvent;
window.addEventListener('keydown', function (event) {
 if (event.keyCode === 80 && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
  window.print();
  if (hasAttachEvent) {
   return;
  }
  event.preventDefault();
  if (event.stopImmediatePropagation) {
   event.stopImmediatePropagation();
  } else {
   event.stopPropagation();
  }
  return;
 }
}, true);
if (hasAttachEvent) {
 document.attachEvent('onkeydown', function (event) {
  event = event || window.event;
  if (event.keyCode === 80 && event.ctrlKey) {
   event.keyCode = 0;
   return false;
  }
 });
}
if ('onbeforeprint' in window) {
 var stopPropagationIfNeeded = function (event) {
  if (event.detail !== 'custom' && event.stopImmediatePropagation) {
   event.stopImmediatePropagation();
  }
 };
 window.addEventListener('beforeprint', stopPropagationIfNeeded);
 window.addEventListener('afterprint', stopPropagationIfNeeded);
}
var overlayPromise;
function ensureOverlay() {
 if (!overlayPromise) {
  overlayPromise = OverlayManager.register('printServiceOverlay', document.getElementById('printServiceOverlay'), abort, true);
  document.getElementById('printCancel').onclick = abort;
 }
 return overlayPromise;
}
PDFPrintServiceFactory.instance = {
 supportsPrinting: true,
 createPrintService: function (pdfDocument, pagesOverview, printContainer) {
  if (activeService) {
   throw new Error('The print service is created and active.');
  }
  activeService = new PDFPrintService(pdfDocument, pagesOverview, printContainer);
  return activeService;
 }
};
exports.PDFPrintService = PDFPrintService;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var pdfLinkService = __webpack_require__(5);
var pdfjsLib = __webpack_require__(1);
var mozL10n = uiUtils.mozL10n;
var SimpleLinkService = pdfLinkService.SimpleLinkService;
var AnnotationLayerBuilder = function AnnotationLayerBuilderClosure() {
 function AnnotationLayerBuilder(options) {
  this.pageDiv = options.pageDiv;
  this.pdfPage = options.pdfPage;
  this.renderInteractiveForms = options.renderInteractiveForms;
  this.linkService = options.linkService;
  this.downloadManager = options.downloadManager;
  this.div = null;
 }
 AnnotationLayerBuilder.prototype = {
  render: function AnnotationLayerBuilder_render(viewport, intent) {
   var self = this;
   var parameters = { intent: intent === undefined ? 'display' : intent };
   this.pdfPage.getAnnotations(parameters).then(function (annotations) {
    viewport = viewport.clone({ dontFlip: true });
    parameters = {
     viewport: viewport,
     div: self.div,
     annotations: annotations,
     page: self.pdfPage,
     renderInteractiveForms: self.renderInteractiveForms,
     linkService: self.linkService,
     downloadManager: self.downloadManager
    };
    if (self.div) {
     pdfjsLib.AnnotationLayer.update(parameters);
    } else {
     if (annotations.length === 0) {
      return;
     }
     self.div = document.createElement('div');
     self.div.className = 'annotationLayer';
     self.pageDiv.appendChild(self.div);
     parameters.div = self.div;
     pdfjsLib.AnnotationLayer.render(parameters);
     if (typeof mozL10n !== 'undefined') {
      mozL10n.translate(self.div);
     }
    }
   });
  },
  hide: function AnnotationLayerBuilder_hide() {
   if (!this.div) {
    return;
   }
   this.div.setAttribute('hidden', 'true');
  }
 };
 return AnnotationLayerBuilder;
}();
function DefaultAnnotationLayerFactory() {
}
DefaultAnnotationLayerFactory.prototype = {
 createAnnotationLayerBuilder: function (pageDiv, pdfPage, renderInteractiveForms) {
  return new AnnotationLayerBuilder({
   pageDiv: pageDiv,
   pdfPage: pdfPage,
   renderInteractiveForms: renderInteractiveForms,
   linkService: new SimpleLinkService()
  });
 }
};
exports.AnnotationLayerBuilder = AnnotationLayerBuilder;
exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var pdfjsLib = __webpack_require__(1);
function download(blobUrl, filename) {
 var a = document.createElement('a');
 if (a.click) {
  a.href = blobUrl;
  a.target = '_parent';
  if ('download' in a) {
   a.download = filename;
  }
  (document.body || document.documentElement).appendChild(a);
  a.click();
  a.parentNode.removeChild(a);
 } else {
  if (window.top === window && blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
   var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
   blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
  }
  window.open(blobUrl, '_parent');
 }
}
function DownloadManager() {
}
DownloadManager.prototype = {
 downloadUrl: function DownloadManager_downloadUrl(url, filename) {
  if (!pdfjsLib.createValidAbsoluteUrl(url, 'http://example.com')) {
   return;
  }
  download(url + '#pdfjs.action=download', filename);
 },
 downloadData: function DownloadManager_downloadData(data, filename, contentType) {
  if (navigator.msSaveBlob) {
   return navigator.msSaveBlob(new Blob([data], { type: contentType }), filename);
  }
  var blobUrl = pdfjsLib.createObjectURL(data, contentType, pdfjsLib.PDFJS.disableCreateObjectURL);
  download(blobUrl, filename);
 },
 download: function DownloadManager_download(blob, url, filename) {
  if (navigator.msSaveBlob) {
   if (!navigator.msSaveBlob(blob, filename)) {
    this.downloadUrl(url, filename);
   }
   return;
  }
  if (pdfjsLib.PDFJS.disableCreateObjectURL) {
   this.downloadUrl(url, filename);
   return;
  }
  var blobUrl = URL.createObjectURL(blob);
  download(blobUrl, filename);
 }
};
exports.DownloadManager = DownloadManager;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function GrabToPan(options) {
 this.element = options.element;
 this.document = options.element.ownerDocument;
 if (typeof options.ignoreTarget === 'function') {
  this.ignoreTarget = options.ignoreTarget;
 }
 this.onActiveChanged = options.onActiveChanged;
 this.activate = this.activate.bind(this);
 this.deactivate = this.deactivate.bind(this);
 this.toggle = this.toggle.bind(this);
 this._onmousedown = this._onmousedown.bind(this);
 this._onmousemove = this._onmousemove.bind(this);
 this._endPan = this._endPan.bind(this);
 var overlay = this.overlay = document.createElement('div');
 overlay.className = 'grab-to-pan-grabbing';
}
GrabToPan.prototype = {
 CSS_CLASS_GRAB: 'grab-to-pan-grab',
 activate: function GrabToPan_activate() {
  if (!this.active) {
   this.active = true;
   this.element.addEventListener('mousedown', this._onmousedown, true);
   this.element.classList.add(this.CSS_CLASS_GRAB);
   if (this.onActiveChanged) {
    this.onActiveChanged(true);
   }
  }
 },
 deactivate: function GrabToPan_deactivate() {
  if (this.active) {
   this.active = false;
   this.element.removeEventListener('mousedown', this._onmousedown, true);
   this._endPan();
   this.element.classList.remove(this.CSS_CLASS_GRAB);
   if (this.onActiveChanged) {
    this.onActiveChanged(false);
   }
  }
 },
 toggle: function GrabToPan_toggle() {
  if (this.active) {
   this.deactivate();
  } else {
   this.activate();
  }
 },
 ignoreTarget: function GrabToPan_ignoreTarget(node) {
  return node[matchesSelector]('a[href], a[href] *, input, textarea, button, button *, select, option');
 },
 _onmousedown: function GrabToPan__onmousedown(event) {
  if (event.button !== 0 || this.ignoreTarget(event.target)) {
   return;
  }
  if (event.originalTarget) {
   try {
    event.originalTarget.tagName;
   } catch (e) {
    return;
   }
  }
  this.scrollLeftStart = this.element.scrollLeft;
  this.scrollTopStart = this.element.scrollTop;
  this.clientXStart = event.clientX;
  this.clientYStart = event.clientY;
  this.document.addEventListener('mousemove', this._onmousemove, true);
  this.document.addEventListener('mouseup', this._endPan, true);
  this.element.addEventListener('scroll', this._endPan, true);
  event.preventDefault();
  event.stopPropagation();
  var focusedElement = document.activeElement;
  if (focusedElement && !focusedElement.contains(event.target)) {
   focusedElement.blur();
  }
 },
 _onmousemove: function GrabToPan__onmousemove(event) {
  this.element.removeEventListener('scroll', this._endPan, true);
  if (isLeftMouseReleased(event)) {
   this._endPan();
   return;
  }
  var xDiff = event.clientX - this.clientXStart;
  var yDiff = event.clientY - this.clientYStart;
  var scrollTop = this.scrollTopStart - yDiff;
  var scrollLeft = this.scrollLeftStart - xDiff;
  if (this.element.scrollTo) {
   this.element.scrollTo({
    top: scrollTop,
    left: scrollLeft,
    behavior: 'instant'
   });
  } else {
   this.element.scrollTop = scrollTop;
   this.element.scrollLeft = scrollLeft;
  }
  if (!this.overlay.parentNode) {
   document.body.appendChild(this.overlay);
  }
 },
 _endPan: function GrabToPan__endPan() {
  this.element.removeEventListener('scroll', this._endPan, true);
  this.document.removeEventListener('mousemove', this._onmousemove, true);
  this.document.removeEventListener('mouseup', this._endPan, true);
  this.overlay.remove();
 }
};
var matchesSelector;
[
 'webkitM',
 'mozM',
 'msM',
 'oM',
 'm'
].some(function (prefix) {
 var name = prefix + 'atches';
 if (name in document.documentElement) {
  matchesSelector = name;
 }
 name += 'Selector';
 if (name in document.documentElement) {
  matchesSelector = name;
 }
 return matchesSelector;
});
var isNotIEorIsIE10plus = !document.documentMode || document.documentMode > 9;
var chrome = window.chrome;
var isChrome15OrOpera15plus = chrome && (chrome.webstore || chrome.app);
var isSafari6plus = /Apple/.test(navigator.vendor) && /Version\/([6-9]\d*|[1-5]\d+)/.test(navigator.userAgent);
function isLeftMouseReleased(event) {
 if ('buttons' in event && isNotIEorIsIE10plus) {
  return !(event.buttons & 1);
 }
 if (isChrome15OrOpera15plus || isSafari6plus) {
  return event.which === 0;
 }
}
exports.GrabToPan = GrabToPan;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var grabToPan = __webpack_require__(12);
var preferences = __webpack_require__(8);
var uiUtils = __webpack_require__(0);
var GrabToPan = grabToPan.GrabToPan;
var Preferences = preferences.Preferences;
var localized = uiUtils.localized;
var HandTool = function HandToolClosure() {
 function HandTool(options) {
  this.container = options.container;
  this.eventBus = options.eventBus;
  this.wasActive = false;
  this.handTool = new GrabToPan({
   element: this.container,
   onActiveChanged: function (isActive) {
    this.eventBus.dispatch('handtoolchanged', { isActive: isActive });
   }.bind(this)
  });
  this.eventBus.on('togglehandtool', this.toggle.bind(this));
  Promise.all([
   localized,
   Preferences.get('enableHandToolOnLoad')
  ]).then(function resolved(values) {
   if (values[1] === true) {
    this.handTool.activate();
   }
  }.bind(this)).catch(function rejected(reason) {
  });
  this.eventBus.on('presentationmodechanged', function (e) {
   if (e.switchInProgress) {
    return;
   }
   if (e.active) {
    this.enterPresentationMode();
   } else {
    this.exitPresentationMode();
   }
  }.bind(this));
 }
 HandTool.prototype = {
  get isActive() {
   return !!this.handTool.active;
  },
  toggle: function HandTool_toggle() {
   this.handTool.toggle();
  },
  enterPresentationMode: function HandTool_enterPresentationMode() {
   if (this.isActive) {
    this.wasActive = true;
    this.handTool.deactivate();
   }
  },
  exitPresentationMode: function HandTool_exitPresentationMode() {
   if (this.wasActive) {
    this.wasActive = false;
    this.handTool.activate();
   }
  }
 };
 return HandTool;
}();
exports.HandTool = HandTool;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var overlayManager = __webpack_require__(4);
var pdfjsLib = __webpack_require__(1);
var mozL10n = uiUtils.mozL10n;
var OverlayManager = overlayManager.OverlayManager;
var PasswordPrompt = function PasswordPromptClosure() {
 function PasswordPrompt(options) {
  this.overlayName = options.overlayName;
  this.container = options.container;
  this.label = options.label;
  this.input = options.input;
  this.submitButton = options.submitButton;
  this.cancelButton = options.cancelButton;
  this.updateCallback = null;
  this.reason = null;
  this.submitButton.addEventListener('click', this.verify.bind(this));
  this.cancelButton.addEventListener('click', this.close.bind(this));
  this.input.addEventListener('keydown', function (e) {
   if (e.keyCode === 13) {
    this.verify();
   }
  }.bind(this));
  OverlayManager.register(this.overlayName, this.container, this.close.bind(this), true);
 }
 PasswordPrompt.prototype = {
  open: function PasswordPrompt_open() {
   OverlayManager.open(this.overlayName).then(function () {
    this.input.type = 'password';
    this.input.focus();
    var promptString = mozL10n.get('password_label', null, 'Enter the password to open this PDF file.');
    if (this.reason === pdfjsLib.PasswordResponses.INCORRECT_PASSWORD) {
     promptString = mozL10n.get('password_invalid', null, 'Invalid password. Please try again.');
    }
    this.label.textContent = promptString;
   }.bind(this));
  },
  close: function PasswordPrompt_close() {
   OverlayManager.close(this.overlayName).then(function () {
    this.input.value = '';
    this.input.type = '';
   }.bind(this));
  },
  verify: function PasswordPrompt_verify() {
   var password = this.input.value;
   if (password && password.length > 0) {
    this.close();
    return this.updateCallback(password);
   }
  },
  setUpdateCallback: function PasswordPrompt_setUpdateCallback(updateCallback, reason) {
   this.updateCallback = updateCallback;
   this.reason = reason;
  }
 };
 return PasswordPrompt;
}();
exports.PasswordPrompt = PasswordPrompt;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var pdfjsLib = __webpack_require__(1);
var PDFAttachmentViewer = function PDFAttachmentViewerClosure() {
 function PDFAttachmentViewer(options) {
  this.attachments = null;
  this.container = options.container;
  this.eventBus = options.eventBus;
  this.downloadManager = options.downloadManager;
  this._renderedCapability = pdfjsLib.createPromiseCapability();
  this.eventBus.on('fileattachmentannotation', this._appendAttachment.bind(this));
 }
 PDFAttachmentViewer.prototype = {
  reset: function PDFAttachmentViewer_reset(keepRenderedCapability) {
   this.attachments = null;
   this.container.textContent = '';
   if (!keepRenderedCapability) {
    this._renderedCapability = pdfjsLib.createPromiseCapability();
   }
  },
  _dispatchEvent: function PDFAttachmentViewer_dispatchEvent(attachmentsCount) {
   this.eventBus.dispatch('attachmentsloaded', {
    source: this,
    attachmentsCount: attachmentsCount
   });
   this._renderedCapability.resolve();
  },
  _bindPdfLink: function PDFAttachmentViewer_bindPdfLink(button, content, filename) {
   var blobUrl;
   button.onclick = function () {
    if (!blobUrl) {
     blobUrl = pdfjsLib.createObjectURL(content, 'application/pdf', pdfjsLib.PDFJS.disableCreateObjectURL);
    }
    var viewerUrl;
    viewerUrl = '?file=' + encodeURIComponent(blobUrl + '#' + filename);
    window.open(viewerUrl);
    return false;
   };
  },
  _bindLink: function PDFAttachmentViewer_bindLink(button, content, filename) {
   button.onclick = function downloadFile(e) {
    this.downloadManager.downloadData(content, filename, '');
    return false;
   }.bind(this);
  },
  render: function PDFAttachmentViewer_render(params) {
   params = params || {};
   var attachments = params.attachments || null;
   var attachmentsCount = 0;
   if (this.attachments) {
    var keepRenderedCapability = params.keepRenderedCapability === true;
    this.reset(keepRenderedCapability);
   }
   this.attachments = attachments;
   if (!attachments) {
    this._dispatchEvent(attachmentsCount);
    return;
   }
   var names = Object.keys(attachments).sort(function (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
   });
   attachmentsCount = names.length;
   for (var i = 0; i < attachmentsCount; i++) {
    var item = attachments[names[i]];
    var filename = pdfjsLib.getFilenameFromUrl(item.filename);
    filename = pdfjsLib.removeNullCharacters(filename);
    var div = document.createElement('div');
    div.className = 'attachmentsItem';
    var button = document.createElement('button');
    button.textContent = filename;
    if (/\.pdf$/i.test(filename)) {
     this._bindPdfLink(button, item.content, filename);
    } else {
     this._bindLink(button, item.content, filename);
    }
    div.appendChild(button);
    this.container.appendChild(div);
   }
   this._dispatchEvent(attachmentsCount);
  },
  _appendAttachment: function PDFAttachmentViewer_appendAttachment(item) {
   this._renderedCapability.promise.then(function (id, filename, content) {
    var attachments = this.attachments;
    if (!attachments) {
     attachments = Object.create(null);
    } else {
     for (var name in attachments) {
      if (id === name) {
       return;
      }
     }
    }
    attachments[id] = {
     filename: filename,
     content: content
    };
    this.render({
     attachments: attachments,
     keepRenderedCapability: true
    });
   }.bind(this, item.id, item.filename, item.content));
  }
 };
 return PDFAttachmentViewer;
}();
exports.PDFAttachmentViewer = PDFAttachmentViewer;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var overlayManager = __webpack_require__(4);
var getPDFFileNameFromURL = uiUtils.getPDFFileNameFromURL;
var mozL10n = uiUtils.mozL10n;
var OverlayManager = overlayManager.OverlayManager;
var PDFDocumentProperties = function PDFDocumentPropertiesClosure() {
 function PDFDocumentProperties(options) {
  this.fields = options.fields;
  this.overlayName = options.overlayName;
  this.container = options.container;
  this.rawFileSize = 0;
  this.url = null;
  this.pdfDocument = null;
  if (options.closeButton) {
   options.closeButton.addEventListener('click', this.close.bind(this));
  }
  this.dataAvailablePromise = new Promise(function (resolve) {
   this.resolveDataAvailable = resolve;
  }.bind(this));
  OverlayManager.register(this.overlayName, this.container, this.close.bind(this));
 }
 PDFDocumentProperties.prototype = {
  open: function PDFDocumentProperties_open() {
   Promise.all([
    OverlayManager.open(this.overlayName),
    this.dataAvailablePromise
   ]).then(function () {
    this._getProperties();
   }.bind(this));
  },
  close: function PDFDocumentProperties_close() {
   OverlayManager.close(this.overlayName);
  },
  setFileSize: function PDFDocumentProperties_setFileSize(fileSize) {
   if (fileSize > 0) {
    this.rawFileSize = fileSize;
   }
  },
  setDocumentAndUrl: function PDFDocumentProperties_setDocumentAndUrl(pdfDocument, url) {
   this.pdfDocument = pdfDocument;
   this.url = url;
   this.resolveDataAvailable();
  },
  _getProperties: function PDFDocumentProperties_getProperties() {
   if (!OverlayManager.active) {
    return;
   }
   this.pdfDocument.getDownloadInfo().then(function (data) {
    if (data.length === this.rawFileSize) {
     return;
    }
    this.setFileSize(data.length);
    this._updateUI(this.fields['fileSize'], this._parseFileSize());
   }.bind(this));
   this.pdfDocument.getMetadata().then(function (data) {
    var content = {
     'fileName': getPDFFileNameFromURL(this.url),
     'fileSize': this._parseFileSize(),
     'title': data.info.Title,
     'author': data.info.Author,
     'subject': data.info.Subject,
     'keywords': data.info.Keywords,
     'creationDate': this._parseDate(data.info.CreationDate),
     'modificationDate': this._parseDate(data.info.ModDate),
     'creator': data.info.Creator,
     'producer': data.info.Producer,
     'version': data.info.PDFFormatVersion,
     'pageCount': this.pdfDocument.numPages
    };
    for (var identifier in content) {
     this._updateUI(this.fields[identifier], content[identifier]);
    }
   }.bind(this));
  },
  _updateUI: function PDFDocumentProperties_updateUI(field, content) {
   if (field && content !== undefined && content !== '') {
    field.textContent = content;
   }
  },
  _parseFileSize: function PDFDocumentProperties_parseFileSize() {
   var fileSize = this.rawFileSize, kb = fileSize / 1024;
   if (!kb) {
    return;
   } else if (kb < 1024) {
    return mozL10n.get('document_properties_kb', {
     size_kb: (+kb.toPrecision(3)).toLocaleString(),
     size_b: fileSize.toLocaleString()
    }, '{{size_kb}} KB ({{size_b}} bytes)');
   }
   return mozL10n.get('document_properties_mb', {
    size_mb: (+(kb / 1024).toPrecision(3)).toLocaleString(),
    size_b: fileSize.toLocaleString()
   }, '{{size_mb}} MB ({{size_b}} bytes)');
  },
  _parseDate: function PDFDocumentProperties_parseDate(inputDate) {
   var dateToParse = inputDate;
   if (dateToParse === undefined) {
    return '';
   }
   if (dateToParse.substring(0, 2) === 'D:') {
    dateToParse = dateToParse.substring(2);
   }
   var year = parseInt(dateToParse.substring(0, 4), 10);
   var month = parseInt(dateToParse.substring(4, 6), 10) - 1;
   var day = parseInt(dateToParse.substring(6, 8), 10);
   var hours = parseInt(dateToParse.substring(8, 10), 10);
   var minutes = parseInt(dateToParse.substring(10, 12), 10);
   var seconds = parseInt(dateToParse.substring(12, 14), 10);
   var utRel = dateToParse.substring(14, 15);
   var offsetHours = parseInt(dateToParse.substring(15, 17), 10);
   var offsetMinutes = parseInt(dateToParse.substring(18, 20), 10);
   if (utRel === '-') {
    hours += offsetHours;
    minutes += offsetMinutes;
   } else if (utRel === '+') {
    hours -= offsetHours;
    minutes -= offsetMinutes;
   }
   var date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
   var dateString = date.toLocaleDateString();
   var timeString = date.toLocaleTimeString();
   return mozL10n.get('document_properties_date_string', {
    date: dateString,
    time: timeString
   }, '{{date}}, {{time}}');
  }
 };
 return PDFDocumentProperties;
}();
exports.PDFDocumentProperties = PDFDocumentProperties;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var pdfFindController = __webpack_require__(7);
var mozL10n = uiUtils.mozL10n;
var FindStates = pdfFindController.FindStates;
var PDFFindBar = function PDFFindBarClosure() {
 function PDFFindBar(options) {
  this.opened = false;
  this.bar = options.bar || null;
  this.toggleButton = options.toggleButton || null;
  this.findField = options.findField || null;
  this.highlightAll = options.highlightAllCheckbox || null;
  this.caseSensitive = options.caseSensitiveCheckbox || null;
  this.findMsg = options.findMsg || null;
  this.findResultsCount = options.findResultsCount || null;
  this.findStatusIcon = options.findStatusIcon || null;
  this.findPreviousButton = options.findPreviousButton || null;
  this.findNextButton = options.findNextButton || null;
  this.findController = options.findController || null;
  this.eventBus = options.eventBus;
  if (this.findController === null) {
   throw new Error('PDFFindBar cannot be used without a ' + 'PDFFindController instance.');
  }
  var self = this;
  this.toggleButton.addEventListener('click', function () {
   self.toggle();
  });
  this.findField.addEventListener('input', function () {
   self.dispatchEvent('');
  });
  this.bar.addEventListener('keydown', function (evt) {
   switch (evt.keyCode) {
   case 13:
    if (evt.target === self.findField) {
     self.dispatchEvent('again', evt.shiftKey);
    }
    break;
   case 27:
    self.close();
    break;
   }
  });
  this.findPreviousButton.addEventListener('click', function () {
   self.dispatchEvent('again', true);
  });
  this.findNextButton.addEventListener('click', function () {
   self.dispatchEvent('again', false);
  });
  this.highlightAll.addEventListener('click', function () {
   self.dispatchEvent('highlightallchange');
  });
  this.caseSensitive.addEventListener('click', function () {
   self.dispatchEvent('casesensitivitychange');
  });
 }
 PDFFindBar.prototype = {
  reset: function PDFFindBar_reset() {
   this.updateUIState();
  },
  dispatchEvent: function PDFFindBar_dispatchEvent(type, findPrev) {
   this.eventBus.dispatch('find', {
    source: this,
    type: type,
    query: this.findField.value,
    caseSensitive: this.caseSensitive.checked,
    phraseSearch: true,
    highlightAll: this.highlightAll.checked,
    findPrevious: findPrev
   });
  },
  updateUIState: function PDFFindBar_updateUIState(state, previous, matchCount) {
   var notFound = false;
   var findMsg = '';
   var status = '';
   switch (state) {
   case FindStates.FIND_FOUND:
    break;
   case FindStates.FIND_PENDING:
    status = 'pending';
    break;
   case FindStates.FIND_NOTFOUND:
    findMsg = mozL10n.get('find_not_found', null, 'Phrase not found');
    notFound = true;
    break;
   case FindStates.FIND_WRAPPED:
    if (previous) {
     findMsg = mozL10n.get('find_reached_top', null, 'Reached top of document, continued from bottom');
    } else {
     findMsg = mozL10n.get('find_reached_bottom', null, 'Reached end of document, continued from top');
    }
    break;
   }
   if (notFound) {
    this.findField.classList.add('notFound');
   } else {
    this.findField.classList.remove('notFound');
   }
   this.findField.setAttribute('data-status', status);
   this.findMsg.textContent = findMsg;
   this.updateResultsCount(matchCount);
  },
  updateResultsCount: function (matchCount) {
   if (!this.findResultsCount) {
    return;
   }
   if (!matchCount) {
    this.findResultsCount.classList.add('hidden');
    return;
   }
   this.findResultsCount.textContent = matchCount.toLocaleString();
   this.findResultsCount.classList.remove('hidden');
  },
  open: function PDFFindBar_open() {
   if (!this.opened) {
    this.opened = true;
    this.toggleButton.classList.add('toggled');
    this.bar.classList.remove('hidden');
   }
   this.findField.select();
   this.findField.focus();
  },
  close: function PDFFindBar_close() {
   if (!this.opened) {
    return;
   }
   this.opened = false;
   this.toggleButton.classList.remove('toggled');
   this.bar.classList.add('hidden');
   this.findController.active = false;
  },
  toggle: function PDFFindBar_toggle() {
   if (this.opened) {
    this.close();
   } else {
    this.open();
   }
  }
 };
 return PDFFindBar;
}();
exports.PDFFindBar = PDFFindBar;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var domEvents = __webpack_require__(2);
function PDFHistory(options) {
 this.linkService = options.linkService;
 this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
 this.initialized = false;
 this.initialDestination = null;
 this.initialBookmark = null;
}
PDFHistory.prototype = {
 initialize: function pdfHistoryInitialize(fingerprint) {
  this.initialized = true;
  this.reInitialized = false;
  this.allowHashChange = true;
  this.historyUnlocked = true;
  this.isViewerInPresentationMode = false;
  this.previousHash = window.location.hash.substring(1);
  this.currentBookmark = '';
  this.currentPage = 0;
  this.updatePreviousBookmark = false;
  this.previousBookmark = '';
  this.previousPage = 0;
  this.nextHashParam = '';
  this.fingerprint = fingerprint;
  this.currentUid = this.uid = 0;
  this.current = {};
  var state = window.history.state;
  if (this._isStateObjectDefined(state)) {
   if (state.target.dest) {
    this.initialDestination = state.target.dest;
   } else {
    this.initialBookmark = state.target.hash;
   }
   this.currentUid = state.uid;
   this.uid = state.uid + 1;
   this.current = state.target;
  } else {
   if (state && state.fingerprint && this.fingerprint !== state.fingerprint) {
    this.reInitialized = true;
   }
   this._pushOrReplaceState({ fingerprint: this.fingerprint }, true);
  }
  var self = this;
  window.addEventListener('popstate', function pdfHistoryPopstate(evt) {
   if (!self.historyUnlocked) {
    return;
   }
   if (evt.state) {
    self._goTo(evt.state);
    return;
   }
   if (self.uid === 0) {
    var previousParams = self.previousHash && self.currentBookmark && self.previousHash !== self.currentBookmark ? {
     hash: self.currentBookmark,
     page: self.currentPage
    } : { page: 1 };
    replacePreviousHistoryState(previousParams, function () {
     updateHistoryWithCurrentHash();
    });
   } else {
    updateHistoryWithCurrentHash();
   }
  });
  function updateHistoryWithCurrentHash() {
   self.previousHash = window.location.hash.slice(1);
   self._pushToHistory({ hash: self.previousHash }, false, true);
   self._updatePreviousBookmark();
  }
  function replacePreviousHistoryState(params, callback) {
   self.historyUnlocked = false;
   self.allowHashChange = false;
   window.addEventListener('popstate', rewriteHistoryAfterBack);
   history.back();
   function rewriteHistoryAfterBack() {
    window.removeEventListener('popstate', rewriteHistoryAfterBack);
    window.addEventListener('popstate', rewriteHistoryAfterForward);
    self._pushToHistory(params, false, true);
    history.forward();
   }
   function rewriteHistoryAfterForward() {
    window.removeEventListener('popstate', rewriteHistoryAfterForward);
    self.allowHashChange = true;
    self.historyUnlocked = true;
    callback();
   }
  }
  function pdfHistoryBeforeUnload() {
   var previousParams = self._getPreviousParams(null, true);
   if (previousParams) {
    var replacePrevious = !self.current.dest && self.current.hash !== self.previousHash;
    self._pushToHistory(previousParams, false, replacePrevious);
    self._updatePreviousBookmark();
   }
   window.removeEventListener('beforeunload', pdfHistoryBeforeUnload);
  }
  window.addEventListener('beforeunload', pdfHistoryBeforeUnload);
  window.addEventListener('pageshow', function pdfHistoryPageShow(evt) {
   window.addEventListener('beforeunload', pdfHistoryBeforeUnload);
  });
  self.eventBus.on('presentationmodechanged', function (e) {
   self.isViewerInPresentationMode = e.active;
  });
 },
 clearHistoryState: function pdfHistory_clearHistoryState() {
  this._pushOrReplaceState(null, true);
 },
 _isStateObjectDefined: function pdfHistory_isStateObjectDefined(state) {
  return state && state.uid >= 0 && state.fingerprint && this.fingerprint === state.fingerprint && state.target && state.target.hash ? true : false;
 },
 _pushOrReplaceState: function pdfHistory_pushOrReplaceState(stateObj, replace) {
  if (replace) {
   window.history.replaceState(stateObj, '', document.URL);
  } else {
   window.history.pushState(stateObj, '', document.URL);
  }
 },
 get isHashChangeUnlocked() {
  if (!this.initialized) {
   return true;
  }
  return this.allowHashChange;
 },
 _updatePreviousBookmark: function pdfHistory_updatePreviousBookmark() {
  if (this.updatePreviousBookmark && this.currentBookmark && this.currentPage) {
   this.previousBookmark = this.currentBookmark;
   this.previousPage = this.currentPage;
   this.updatePreviousBookmark = false;
  }
 },
 updateCurrentBookmark: function pdfHistoryUpdateCurrentBookmark(bookmark, pageNum) {
  if (this.initialized) {
   this.currentBookmark = bookmark.substring(1);
   this.currentPage = pageNum | 0;
   this._updatePreviousBookmark();
  }
 },
 updateNextHashParam: function pdfHistoryUpdateNextHashParam(param) {
  if (this.initialized) {
   this.nextHashParam = param;
  }
 },
 push: function pdfHistoryPush(params, isInitialBookmark) {
  if (!(this.initialized && this.historyUnlocked)) {
   return;
  }
  if (params.dest && !params.hash) {
   params.hash = this.current.hash && this.current.dest && this.current.dest === params.dest ? this.current.hash : this.linkService.getDestinationHash(params.dest).split('#')[1];
  }
  if (params.page) {
   params.page |= 0;
  }
  if (isInitialBookmark) {
   var target = window.history.state.target;
   if (!target) {
    this._pushToHistory(params, false);
    this.previousHash = window.location.hash.substring(1);
   }
   this.updatePreviousBookmark = this.nextHashParam ? false : true;
   if (target) {
    this._updatePreviousBookmark();
   }
   return;
  }
  if (this.nextHashParam) {
   if (this.nextHashParam === params.hash) {
    this.nextHashParam = null;
    this.updatePreviousBookmark = true;
    return;
   }
   this.nextHashParam = null;
  }
  if (params.hash) {
   if (this.current.hash) {
    if (this.current.hash !== params.hash) {
     this._pushToHistory(params, true);
    } else {
     if (!this.current.page && params.page) {
      this._pushToHistory(params, false, true);
     }
     this.updatePreviousBookmark = true;
    }
   } else {
    this._pushToHistory(params, true);
   }
  } else if (this.current.page && params.page && this.current.page !== params.page) {
   this._pushToHistory(params, true);
  }
 },
 _getPreviousParams: function pdfHistory_getPreviousParams(onlyCheckPage, beforeUnload) {
  if (!(this.currentBookmark && this.currentPage)) {
   return null;
  } else if (this.updatePreviousBookmark) {
   this.updatePreviousBookmark = false;
  }
  if (this.uid > 0 && !(this.previousBookmark && this.previousPage)) {
   return null;
  }
  if (!this.current.dest && !onlyCheckPage || beforeUnload) {
   if (this.previousBookmark === this.currentBookmark) {
    return null;
   }
  } else if (this.current.page || onlyCheckPage) {
   if (this.previousPage === this.currentPage) {
    return null;
   }
  } else {
   return null;
  }
  var params = {
   hash: this.currentBookmark,
   page: this.currentPage
  };
  if (this.isViewerInPresentationMode) {
   params.hash = null;
  }
  return params;
 },
 _stateObj: function pdfHistory_stateObj(params) {
  return {
   fingerprint: this.fingerprint,
   uid: this.uid,
   target: params
  };
 },
 _pushToHistory: function pdfHistory_pushToHistory(params, addPrevious, overwrite) {
  if (!this.initialized) {
   return;
  }
  if (!params.hash && params.page) {
   params.hash = 'page=' + params.page;
  }
  if (addPrevious && !overwrite) {
   var previousParams = this._getPreviousParams();
   if (previousParams) {
    var replacePrevious = !this.current.dest && this.current.hash !== this.previousHash;
    this._pushToHistory(previousParams, false, replacePrevious);
   }
  }
  this._pushOrReplaceState(this._stateObj(params), overwrite || this.uid === 0);
  this.currentUid = this.uid++;
  this.current = params;
  this.updatePreviousBookmark = true;
 },
 _goTo: function pdfHistory_goTo(state) {
  if (!(this.initialized && this.historyUnlocked && this._isStateObjectDefined(state))) {
   return;
  }
  if (!this.reInitialized && state.uid < this.currentUid) {
   var previousParams = this._getPreviousParams(true);
   if (previousParams) {
    this._pushToHistory(this.current, false);
    this._pushToHistory(previousParams, false);
    this.currentUid = state.uid;
    window.history.back();
    return;
   }
  }
  this.historyUnlocked = false;
  if (state.target.dest) {
   this.linkService.navigateTo(state.target.dest);
  } else {
   this.linkService.setHash(state.target.hash);
  }
  this.currentUid = state.uid;
  if (state.uid > this.uid) {
   this.uid = state.uid;
  }
  this.current = state.target;
  this.updatePreviousBookmark = true;
  var currentHash = window.location.hash.substring(1);
  if (this.previousHash !== currentHash) {
   this.allowHashChange = false;
  }
  this.previousHash = currentHash;
  this.historyUnlocked = true;
 },
 back: function pdfHistoryBack() {
  this.go(-1);
 },
 forward: function pdfHistoryForward() {
  this.go(1);
 },
 go: function pdfHistoryGo(direction) {
  if (this.initialized && this.historyUnlocked) {
   var state = window.history.state;
   if (direction === -1 && state && state.uid > 0) {
    window.history.back();
   } else if (direction === 1 && state && state.uid < this.uid - 1) {
    window.history.forward();
   }
  }
 }
};
exports.PDFHistory = PDFHistory;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var pdfjsLib = __webpack_require__(1);
var PDFJS = pdfjsLib.PDFJS;
var DEFAULT_TITLE = '\u2013';
var PDFOutlineViewer = function PDFOutlineViewerClosure() {
 function PDFOutlineViewer(options) {
  this.outline = null;
  this.lastToggleIsShow = true;
  this.container = options.container;
  this.linkService = options.linkService;
  this.eventBus = options.eventBus;
 }
 PDFOutlineViewer.prototype = {
  reset: function PDFOutlineViewer_reset() {
   this.outline = null;
   this.lastToggleIsShow = true;
   this.container.textContent = '';
   this.container.classList.remove('outlineWithDeepNesting');
  },
  _dispatchEvent: function PDFOutlineViewer_dispatchEvent(outlineCount) {
   this.eventBus.dispatch('outlineloaded', {
    source: this,
    outlineCount: outlineCount
   });
  },
  _bindLink: function PDFOutlineViewer_bindLink(element, item) {
   if (item.url) {
    pdfjsLib.addLinkAttributes(element, {
     url: item.url,
     target: item.newWindow ? PDFJS.LinkTarget.BLANK : undefined
    });
    return;
   }
   var self = this, destination = item.dest;
   element.href = self.linkService.getDestinationHash(destination);
   element.onclick = function () {
    if (destination) {
     self.linkService.navigateTo(destination);
    }
    return false;
   };
  },
  _setStyles: function PDFOutlineViewer_setStyles(element, item) {
   var styleStr = '';
   if (item.bold) {
    styleStr += 'font-weight: bold;';
   }
   if (item.italic) {
    styleStr += 'font-style: italic;';
   }
   if (styleStr) {
    element.setAttribute('style', styleStr);
   }
  },
  _addToggleButton: function PDFOutlineViewer_addToggleButton(div) {
   var toggler = document.createElement('div');
   toggler.className = 'outlineItemToggler';
   toggler.onclick = function (event) {
    event.stopPropagation();
    toggler.classList.toggle('outlineItemsHidden');
    if (event.shiftKey) {
     var shouldShowAll = !toggler.classList.contains('outlineItemsHidden');
     this._toggleOutlineItem(div, shouldShowAll);
    }
   }.bind(this);
   div.insertBefore(toggler, div.firstChild);
  },
  _toggleOutlineItem: function PDFOutlineViewer_toggleOutlineItem(root, show) {
   this.lastToggleIsShow = show;
   var togglers = root.querySelectorAll('.outlineItemToggler');
   for (var i = 0, ii = togglers.length; i < ii; ++i) {
    togglers[i].classList[show ? 'remove' : 'add']('outlineItemsHidden');
   }
  },
  toggleOutlineTree: function PDFOutlineViewer_toggleOutlineTree() {
   if (!this.outline) {
    return;
   }
   this._toggleOutlineItem(this.container, !this.lastToggleIsShow);
  },
  render: function PDFOutlineViewer_render(params) {
   var outline = params && params.outline || null;
   var outlineCount = 0;
   if (this.outline) {
    this.reset();
   }
   this.outline = outline;
   if (!outline) {
    this._dispatchEvent(outlineCount);
    return;
   }
   var fragment = document.createDocumentFragment();
   var queue = [{
     parent: fragment,
     items: this.outline
    }];
   var hasAnyNesting = false;
   while (queue.length > 0) {
    var levelData = queue.shift();
    for (var i = 0, len = levelData.items.length; i < len; i++) {
     var item = levelData.items[i];
     var div = document.createElement('div');
     div.className = 'outlineItem';
     var element = document.createElement('a');
     this._bindLink(element, item);
     this._setStyles(element, item);
     element.textContent = pdfjsLib.removeNullCharacters(item.title) || DEFAULT_TITLE;
     div.appendChild(element);
     if (item.items.length > 0) {
      hasAnyNesting = true;
      this._addToggleButton(div);
      var itemsDiv = document.createElement('div');
      itemsDiv.className = 'outlineItems';
      div.appendChild(itemsDiv);
      queue.push({
       parent: itemsDiv,
       items: item.items
      });
     }
     levelData.parent.appendChild(div);
     outlineCount++;
    }
   }
   if (hasAnyNesting) {
    this.container.classList.add('outlineWithDeepNesting');
   }
   this.container.appendChild(fragment);
   this._dispatchEvent(outlineCount);
  }
 };
 return PDFOutlineViewer;
}();
exports.PDFOutlineViewer = PDFOutlineViewer;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var pdfRenderingQueue = __webpack_require__(3);
var domEvents = __webpack_require__(2);
var pdfjsLib = __webpack_require__(1);
var CSS_UNITS = uiUtils.CSS_UNITS;
var DEFAULT_SCALE = uiUtils.DEFAULT_SCALE;
var getOutputScale = uiUtils.getOutputScale;
var approximateFraction = uiUtils.approximateFraction;
var roundToDivide = uiUtils.roundToDivide;
var RendererType = uiUtils.RendererType;
var RenderingStates = pdfRenderingQueue.RenderingStates;
var TEXT_LAYER_RENDER_DELAY = 200;
var PDFPageView = function PDFPageViewClosure() {
 function PDFPageView(options) {
  var container = options.container;
  var id = options.id;
  var scale = options.scale;
  var defaultViewport = options.defaultViewport;
  var renderingQueue = options.renderingQueue;
  var textLayerFactory = options.textLayerFactory;
  var annotationLayerFactory = options.annotationLayerFactory;
  var enhanceTextSelection = options.enhanceTextSelection || false;
  var renderInteractiveForms = options.renderInteractiveForms || false;
  this.id = id;
  this.renderingId = 'page' + id;
  this.pageLabel = null;
  this.rotation = 0;
  this.scale = scale || DEFAULT_SCALE;
  this.viewport = defaultViewport;
  this.pdfPageRotate = defaultViewport.rotation;
  this.hasRestrictedScaling = false;
  this.enhanceTextSelection = enhanceTextSelection;
  this.renderInteractiveForms = renderInteractiveForms;
  this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
  this.renderingQueue = renderingQueue;
  this.textLayerFactory = textLayerFactory;
  this.annotationLayerFactory = annotationLayerFactory;
  this.renderer = options.renderer || RendererType.CANVAS;
  this.paintTask = null;
  this.paintedViewportMap = new WeakMap();
  this.renderingState = RenderingStates.INITIAL;
  this.resume = null;
  this.error = null;
  this.onBeforeDraw = null;
  this.onAfterDraw = null;
  this.textLayer = null;
  this.zoomLayer = null;
  this.annotationLayer = null;
  var div = document.createElement('div');
  div.className = 'page';
  div.style.width = Math.floor(this.viewport.width) + 'px';
  div.style.height = Math.floor(this.viewport.height) + 'px';
  div.setAttribute('data-page-number', this.id);
  this.div = div;
  container.appendChild(div);
 }
 PDFPageView.prototype = {
  setPdfPage: function PDFPageView_setPdfPage(pdfPage) {
   this.pdfPage = pdfPage;
   this.pdfPageRotate = pdfPage.rotate;
   var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
   this.viewport = pdfPage.getViewport(this.scale * CSS_UNITS, totalRotation);
   this.stats = pdfPage.stats;
   this.reset();
  },
  destroy: function PDFPageView_destroy() {
   this.zoomLayer = null;
   this.reset();
   if (this.pdfPage) {
    this.pdfPage.cleanup();
   }
  },
  reset: function PDFPageView_reset(keepZoomLayer, keepAnnotations) {
   this.cancelRendering();
   var div = this.div;
   div.style.width = Math.floor(this.viewport.width) + 'px';
   div.style.height = Math.floor(this.viewport.height) + 'px';
   var childNodes = div.childNodes;
   var currentZoomLayerNode = keepZoomLayer && this.zoomLayer || null;
   var currentAnnotationNode = keepAnnotations && this.annotationLayer && this.annotationLayer.div || null;
   for (var i = childNodes.length - 1; i >= 0; i--) {
    var node = childNodes[i];
    if (currentZoomLayerNode === node || currentAnnotationNode === node) {
     continue;
    }
    div.removeChild(node);
   }
   div.removeAttribute('data-loaded');
   if (currentAnnotationNode) {
    this.annotationLayer.hide();
   } else {
    this.annotationLayer = null;
   }
   if (this.canvas && !currentZoomLayerNode) {
    this.paintedViewportMap.delete(this.canvas);
    this.canvas.width = 0;
    this.canvas.height = 0;
    delete this.canvas;
   }
   if (this.svg) {
    this.paintedViewportMap.delete(this.svg);
    delete this.svg;
   }
   this.loadingIconDiv = document.createElement('div');
   this.loadingIconDiv.className = 'loadingIcon';
   div.appendChild(this.loadingIconDiv);
  },
  update: function PDFPageView_update(scale, rotation) {
   this.scale = scale || this.scale;
   if (typeof rotation !== 'undefined') {
    this.rotation = rotation;
   }
   var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
   this.viewport = this.viewport.clone({
    scale: this.scale * CSS_UNITS,
    rotation: totalRotation
   });
   if (this.svg) {
    this.cssTransform(this.svg, true);
    this.eventBus.dispatch('pagerendered', {
     source: this,
     pageNumber: this.id,
     cssTransform: true
    });
    return;
   }
   var isScalingRestricted = false;
   if (this.canvas && pdfjsLib.PDFJS.maxCanvasPixels > 0) {
    var outputScale = this.outputScale;
    if ((Math.floor(this.viewport.width) * outputScale.sx | 0) * (Math.floor(this.viewport.height) * outputScale.sy | 0) > pdfjsLib.PDFJS.maxCanvasPixels) {
     isScalingRestricted = true;
    }
   }
   if (this.canvas) {
    if (pdfjsLib.PDFJS.useOnlyCssZoom || this.hasRestrictedScaling && isScalingRestricted) {
     this.cssTransform(this.canvas, true);
     this.eventBus.dispatch('pagerendered', {
      source: this,
      pageNumber: this.id,
      cssTransform: true
     });
     return;
    }
    if (!this.zoomLayer) {
     this.zoomLayer = this.canvas.parentNode;
     this.zoomLayer.style.position = 'absolute';
    }
   }
   if (this.zoomLayer) {
    this.cssTransform(this.zoomLayer.firstChild);
   }
   this.reset(true, true);
  },
  cancelRendering: function PDFPageView_cancelRendering() {
   if (this.paintTask) {
    this.paintTask.cancel();
    this.paintTask = null;
   }
   this.renderingState = RenderingStates.INITIAL;
   this.resume = null;
   if (this.textLayer) {
    this.textLayer.cancel();
    this.textLayer = null;
   }
  },
  updatePosition: function PDFPageView_updatePosition() {
   if (this.textLayer) {
    this.textLayer.render(TEXT_LAYER_RENDER_DELAY);
   }
  },
  cssTransform: function PDFPageView_transform(target, redrawAnnotations) {
   var CustomStyle = pdfjsLib.CustomStyle;
   var width = this.viewport.width;
   var height = this.viewport.height;
   var div = this.div;
   target.style.width = target.parentNode.style.width = div.style.width = Math.floor(width) + 'px';
   target.style.height = target.parentNode.style.height = div.style.height = Math.floor(height) + 'px';
   var relativeRotation = this.viewport.rotation - this.paintedViewportMap.get(target).rotation;
   var absRotation = Math.abs(relativeRotation);
   var scaleX = 1, scaleY = 1;
   if (absRotation === 90 || absRotation === 270) {
    scaleX = height / width;
    scaleY = width / height;
   }
   var cssTransform = 'rotate(' + relativeRotation + 'deg) ' + 'scale(' + scaleX + ',' + scaleY + ')';
   CustomStyle.setProp('transform', target, cssTransform);
   if (this.textLayer) {
    var textLayerViewport = this.textLayer.viewport;
    var textRelativeRotation = this.viewport.rotation - textLayerViewport.rotation;
    var textAbsRotation = Math.abs(textRelativeRotation);
    var scale = width / textLayerViewport.width;
    if (textAbsRotation === 90 || textAbsRotation === 270) {
     scale = width / textLayerViewport.height;
    }
    var textLayerDiv = this.textLayer.textLayerDiv;
    var transX, transY;
    switch (textAbsRotation) {
    case 0:
     transX = transY = 0;
     break;
    case 90:
     transX = 0;
     transY = '-' + textLayerDiv.style.height;
     break;
    case 180:
     transX = '-' + textLayerDiv.style.width;
     transY = '-' + textLayerDiv.style.height;
     break;
    case 270:
     transX = '-' + textLayerDiv.style.width;
     transY = 0;
     break;
    default:
     console.error('Bad rotation value.');
     break;
    }
    CustomStyle.setProp('transform', textLayerDiv, 'rotate(' + textAbsRotation + 'deg) ' + 'scale(' + scale + ', ' + scale + ') ' + 'translate(' + transX + ', ' + transY + ')');
    CustomStyle.setProp('transformOrigin', textLayerDiv, '0% 0%');
   }
   if (redrawAnnotations && this.annotationLayer) {
    this.annotationLayer.render(this.viewport, 'display');
   }
  },
  get width() {
   return this.viewport.width;
  },
  get height() {
   return this.viewport.height;
  },
  getPagePoint: function PDFPageView_getPagePoint(x, y) {
   return this.viewport.convertToPdfPoint(x, y);
  },
  draw: function PDFPageView_draw() {
   if (this.renderingState !== RenderingStates.INITIAL) {
    console.error('Must be in new state before drawing');
    this.reset();
   }
   this.renderingState = RenderingStates.RUNNING;
   var self = this;
   var pdfPage = this.pdfPage;
   var div = this.div;
   var canvasWrapper = document.createElement('div');
   canvasWrapper.style.width = div.style.width;
   canvasWrapper.style.height = div.style.height;
   canvasWrapper.classList.add('canvasWrapper');
   if (this.annotationLayer && this.annotationLayer.div) {
    div.insertBefore(canvasWrapper, this.annotationLayer.div);
   } else {
    div.appendChild(canvasWrapper);
   }
   var textLayerDiv = null;
   var textLayer = null;
   if (this.textLayerFactory) {
    textLayerDiv = document.createElement('div');
    textLayerDiv.className = 'textLayer';
    textLayerDiv.style.width = canvasWrapper.style.width;
    textLayerDiv.style.height = canvasWrapper.style.height;
    if (this.annotationLayer && this.annotationLayer.div) {
     div.insertBefore(textLayerDiv, this.annotationLayer.div);
    } else {
     div.appendChild(textLayerDiv);
    }
    textLayer = this.textLayerFactory.createTextLayerBuilder(textLayerDiv, this.id - 1, this.viewport, this.enhanceTextSelection);
   }
   this.textLayer = textLayer;
   var renderContinueCallback = null;
   if (this.renderingQueue) {
    renderContinueCallback = function renderContinueCallback(cont) {
     if (!self.renderingQueue.isHighestPriority(self)) {
      self.renderingState = RenderingStates.PAUSED;
      self.resume = function resumeCallback() {
       self.renderingState = RenderingStates.RUNNING;
       cont();
      };
      return;
     }
     cont();
    };
   }
   var finishPaintTask = function finishPaintTask(error) {
    if (paintTask === self.paintTask) {
     self.paintTask = null;
    }
    if (error === 'cancelled') {
     self.error = null;
     return Promise.resolve(undefined);
    }
    self.renderingState = RenderingStates.FINISHED;
    if (self.loadingIconDiv) {
     div.removeChild(self.loadingIconDiv);
     delete self.loadingIconDiv;
    }
    if (self.zoomLayer) {
     var zoomLayerCanvas = self.zoomLayer.firstChild;
     self.paintedViewportMap.delete(zoomLayerCanvas);
     zoomLayerCanvas.width = 0;
     zoomLayerCanvas.height = 0;
     if (div.contains(self.zoomLayer)) {
      div.removeChild(self.zoomLayer);
     }
     self.zoomLayer = null;
    }
    self.error = error;
    self.stats = pdfPage.stats;
    if (self.onAfterDraw) {
     self.onAfterDraw();
    }
    self.eventBus.dispatch('pagerendered', {
     source: self,
     pageNumber: self.id,
     cssTransform: false
    });
    if (error) {
     return Promise.reject(error);
    }
    return Promise.resolve(undefined);
   };
   var paintTask = this.renderer === RendererType.SVG ? this.paintOnSvg(canvasWrapper) : this.paintOnCanvas(canvasWrapper);
   paintTask.onRenderContinue = renderContinueCallback;
   this.paintTask = paintTask;
   var resultPromise = paintTask.promise.then(function () {
    return finishPaintTask(null).then(function () {
     if (textLayer) {
      pdfPage.getTextContent({ normalizeWhitespace: true }).then(function textContentResolved(textContent) {
       textLayer.setTextContent(textContent);
       textLayer.render(TEXT_LAYER_RENDER_DELAY);
      });
     }
    });
   }, function (reason) {
    return finishPaintTask(reason);
   });
   if (this.annotationLayerFactory) {
    if (!this.annotationLayer) {
     this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(div, pdfPage, this.renderInteractiveForms);
    }
    this.annotationLayer.render(this.viewport, 'display');
   }
   div.setAttribute('data-loaded', true);
   if (this.onBeforeDraw) {
    this.onBeforeDraw();
   }
   return resultPromise;
  },
  paintOnCanvas: function (canvasWrapper) {
   var resolveRenderPromise, rejectRenderPromise;
   var promise = new Promise(function (resolve, reject) {
    resolveRenderPromise = resolve;
    rejectRenderPromise = reject;
   });
   var result = {
    promise: promise,
    onRenderContinue: function (cont) {
     cont();
    },
    cancel: function () {
     renderTask.cancel();
    }
   };
   var viewport = this.viewport;
   var canvas = document.createElement('canvas');
   canvas.id = 'page' + this.id;
   canvas.setAttribute('hidden', 'hidden');
   var isCanvasHidden = true;
   var showCanvas = function () {
    if (isCanvasHidden) {
     canvas.removeAttribute('hidden');
     isCanvasHidden = false;
    }
   };
   canvasWrapper.appendChild(canvas);
   this.canvas = canvas;
   canvas.mozOpaque = true;
   var ctx = canvas.getContext('2d', { alpha: false });
   var outputScale = getOutputScale(ctx);
   this.outputScale = outputScale;
   if (pdfjsLib.PDFJS.useOnlyCssZoom) {
    var actualSizeViewport = viewport.clone({ scale: CSS_UNITS });
    outputScale.sx *= actualSizeViewport.width / viewport.width;
    outputScale.sy *= actualSizeViewport.height / viewport.height;
    outputScale.scaled = true;
   }
   if (pdfjsLib.PDFJS.maxCanvasPixels > 0) {
    var pixelsInViewport = viewport.width * viewport.height;
    var maxScale = Math.sqrt(pdfjsLib.PDFJS.maxCanvasPixels / pixelsInViewport);
    if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
     outputScale.sx = maxScale;
     outputScale.sy = maxScale;
     outputScale.scaled = true;
     this.hasRestrictedScaling = true;
    } else {
     this.hasRestrictedScaling = false;
    }
   }
   var sfx = approximateFraction(outputScale.sx);
   var sfy = approximateFraction(outputScale.sy);
   canvas.width = roundToDivide(viewport.width * outputScale.sx, sfx[0]);
   canvas.height = roundToDivide(viewport.height * outputScale.sy, sfy[0]);
   canvas.style.width = roundToDivide(viewport.width, sfx[1]) + 'px';
   canvas.style.height = roundToDivide(viewport.height, sfy[1]) + 'px';
   this.paintedViewportMap.set(canvas, viewport);
   var transform = !outputScale.scaled ? null : [
    outputScale.sx,
    0,
    0,
    outputScale.sy,
    0,
    0
   ];
   var renderContext = {
    canvasContext: ctx,
    transform: transform,
    viewport: this.viewport,
    renderInteractiveForms: this.renderInteractiveForms
   };
   var renderTask = this.pdfPage.render(renderContext);
   renderTask.onContinue = function (cont) {
    showCanvas();
    if (result.onRenderContinue) {
     result.onRenderContinue(cont);
    } else {
     cont();
    }
   };
   renderTask.promise.then(function pdfPageRenderCallback() {
    showCanvas();
    resolveRenderPromise(undefined);
   }, function pdfPageRenderError(error) {
    showCanvas();
    rejectRenderPromise(error);
   });
   return result;
  },
  paintOnSvg: function PDFPageView_paintOnSvg(wrapper) {
   var cancelled = false;
   var ensureNotCancelled = function () {
    if (cancelled) {
     throw 'cancelled';
    }
   };
   var self = this;
   var pdfPage = this.pdfPage;
   var SVGGraphics = pdfjsLib.SVGGraphics;
   var actualSizeViewport = this.viewport.clone({ scale: CSS_UNITS });
   var promise = pdfPage.getOperatorList().then(function (opList) {
    ensureNotCancelled();
    var svgGfx = new SVGGraphics(pdfPage.commonObjs, pdfPage.objs);
    return svgGfx.getSVG(opList, actualSizeViewport).then(function (svg) {
     ensureNotCancelled();
     self.svg = svg;
     self.paintedViewportMap.set(svg, actualSizeViewport);
     svg.style.width = wrapper.style.width;
     svg.style.height = wrapper.style.height;
     self.renderingState = RenderingStates.FINISHED;
     wrapper.appendChild(svg);
    });
   });
   return {
    promise: promise,
    onRenderContinue: function (cont) {
     cont();
    },
    cancel: function () {
     cancelled = true;
    }
   };
  },
  setPageLabel: function PDFView_setPageLabel(label) {
   this.pageLabel = typeof label === 'string' ? label : null;
   if (this.pageLabel !== null) {
    this.div.setAttribute('data-page-label', this.pageLabel);
   } else {
    this.div.removeAttribute('data-page-label');
   }
  }
 };
 return PDFPageView;
}();
exports.PDFPageView = PDFPageView;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var normalizeWheelEventDelta = uiUtils.normalizeWheelEventDelta;
var DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS = 1500;
var DELAY_BEFORE_HIDING_CONTROLS = 3000;
var ACTIVE_SELECTOR = 'pdfPresentationMode';
var CONTROLS_SELECTOR = 'pdfPresentationModeControls';
var PDFPresentationMode = function PDFPresentationModeClosure() {
 function PDFPresentationMode(options) {
  this.container = options.container;
  this.viewer = options.viewer || options.container.firstElementChild;
  this.pdfViewer = options.pdfViewer;
  this.eventBus = options.eventBus;
  var contextMenuItems = options.contextMenuItems || null;
  this.active = false;
  this.args = null;
  this.contextMenuOpen = false;
  this.mouseScrollTimeStamp = 0;
  this.mouseScrollDelta = 0;
  this.touchSwipeState = null;
  if (contextMenuItems) {
   contextMenuItems.contextFirstPage.addEventListener('click', function PDFPresentationMode_contextFirstPageClick(e) {
    this.contextMenuOpen = false;
    this.eventBus.dispatch('firstpage');
   }.bind(this));
   contextMenuItems.contextLastPage.addEventListener('click', function PDFPresentationMode_contextLastPageClick(e) {
    this.contextMenuOpen = false;
    this.eventBus.dispatch('lastpage');
   }.bind(this));
   contextMenuItems.contextPageRotateCw.addEventListener('click', function PDFPresentationMode_contextPageRotateCwClick(e) {
    this.contextMenuOpen = false;
    this.eventBus.dispatch('rotatecw');
   }.bind(this));
   contextMenuItems.contextPageRotateCcw.addEventListener('click', function PDFPresentationMode_contextPageRotateCcwClick(e) {
    this.contextMenuOpen = false;
    this.eventBus.dispatch('rotateccw');
   }.bind(this));
  }
 }
 PDFPresentationMode.prototype = {
  request: function PDFPresentationMode_request() {
   if (this.switchInProgress || this.active || !this.viewer.hasChildNodes()) {
    return false;
   }
   this._addFullscreenChangeListeners();
   this._setSwitchInProgress();
   this._notifyStateChange();
   if (this.container.requestFullscreen) {
    this.container.requestFullscreen();
   } else if (this.container.mozRequestFullScreen) {
    this.container.mozRequestFullScreen();
   } else if (this.container.webkitRequestFullscreen) {
    this.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
   } else if (this.container.msRequestFullscreen) {
    this.container.msRequestFullscreen();
   } else {
    return false;
   }
   this.args = {
    page: this.pdfViewer.currentPageNumber,
    previousScale: this.pdfViewer.currentScaleValue
   };
   return true;
  },
  _mouseWheel: function PDFPresentationMode_mouseWheel(evt) {
   if (!this.active) {
    return;
   }
   evt.preventDefault();
   var delta = normalizeWheelEventDelta(evt);
   var MOUSE_SCROLL_COOLDOWN_TIME = 50;
   var PAGE_SWITCH_THRESHOLD = 0.1;
   var currentTime = new Date().getTime();
   var storedTime = this.mouseScrollTimeStamp;
   if (currentTime > storedTime && currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME) {
    return;
   }
   if (this.mouseScrollDelta > 0 && delta < 0 || this.mouseScrollDelta < 0 && delta > 0) {
    this._resetMouseScrollState();
   }
   this.mouseScrollDelta += delta;
   if (Math.abs(this.mouseScrollDelta) >= PAGE_SWITCH_THRESHOLD) {
    var totalDelta = this.mouseScrollDelta;
    this._resetMouseScrollState();
    var success = totalDelta > 0 ? this._goToPreviousPage() : this._goToNextPage();
    if (success) {
     this.mouseScrollTimeStamp = currentTime;
    }
   }
  },
  get isFullscreen() {
   return !!(document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement);
  },
  _goToPreviousPage: function PDFPresentationMode_goToPreviousPage() {
   var page = this.pdfViewer.currentPageNumber;
   if (page <= 1) {
    return false;
   }
   this.pdfViewer.currentPageNumber = page - 1;
   return true;
  },
  _goToNextPage: function PDFPresentationMode_goToNextPage() {
   var page = this.pdfViewer.currentPageNumber;
   if (page >= this.pdfViewer.pagesCount) {
    return false;
   }
   this.pdfViewer.currentPageNumber = page + 1;
   return true;
  },
  _notifyStateChange: function PDFPresentationMode_notifyStateChange() {
   this.eventBus.dispatch('presentationmodechanged', {
    source: this,
    active: this.active,
    switchInProgress: !!this.switchInProgress
   });
  },
  _setSwitchInProgress: function PDFPresentationMode_setSwitchInProgress() {
   if (this.switchInProgress) {
    clearTimeout(this.switchInProgress);
   }
   this.switchInProgress = setTimeout(function switchInProgressTimeout() {
    this._removeFullscreenChangeListeners();
    delete this.switchInProgress;
    this._notifyStateChange();
   }.bind(this), DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS);
  },
  _resetSwitchInProgress: function PDFPresentationMode_resetSwitchInProgress() {
   if (this.switchInProgress) {
    clearTimeout(this.switchInProgress);
    delete this.switchInProgress;
   }
  },
  _enter: function PDFPresentationMode_enter() {
   this.active = true;
   this._resetSwitchInProgress();
   this._notifyStateChange();
   this.container.classList.add(ACTIVE_SELECTOR);
   setTimeout(function enterPresentationModeTimeout() {
    this.pdfViewer.currentPageNumber = this.args.page;
    this.pdfViewer.currentScaleValue = 'page-fit';
   }.bind(this), 0);
   this._addWindowListeners();
   this._showControls();
   this.contextMenuOpen = false;
   this.container.setAttribute('contextmenu', 'viewerContextMenu');
   window.getSelection().removeAllRanges();
  },
  _exit: function PDFPresentationMode_exit() {
   var page = this.pdfViewer.currentPageNumber;
   this.container.classList.remove(ACTIVE_SELECTOR);
   setTimeout(function exitPresentationModeTimeout() {
    this.active = false;
    this._removeFullscreenChangeListeners();
    this._notifyStateChange();
    this.pdfViewer.currentScaleValue = this.args.previousScale;
    this.pdfViewer.currentPageNumber = page;
    this.args = null;
   }.bind(this), 0);
   this._removeWindowListeners();
   this._hideControls();
   this._resetMouseScrollState();
   this.container.removeAttribute('contextmenu');
   this.contextMenuOpen = false;
  },
  _mouseDown: function PDFPresentationMode_mouseDown(evt) {
   if (this.contextMenuOpen) {
    this.contextMenuOpen = false;
    evt.preventDefault();
    return;
   }
   if (evt.button === 0) {
    var isInternalLink = evt.target.href && evt.target.classList.contains('internalLink');
    if (!isInternalLink) {
     evt.preventDefault();
     this.pdfViewer.currentPageNumber += evt.shiftKey ? -1 : 1;
    }
   }
  },
  _contextMenu: function PDFPresentationMode_contextMenu() {
   this.contextMenuOpen = true;
  },
  _showControls: function PDFPresentationMode_showControls() {
   if (this.controlsTimeout) {
    clearTimeout(this.controlsTimeout);
   } else {
    this.container.classList.add(CONTROLS_SELECTOR);
   }
   this.controlsTimeout = setTimeout(function showControlsTimeout() {
    this.container.classList.remove(CONTROLS_SELECTOR);
    delete this.controlsTimeout;
   }.bind(this), DELAY_BEFORE_HIDING_CONTROLS);
  },
  _hideControls: function PDFPresentationMode_hideControls() {
   if (!this.controlsTimeout) {
    return;
   }
   clearTimeout(this.controlsTimeout);
   this.container.classList.remove(CONTROLS_SELECTOR);
   delete this.controlsTimeout;
  },
  _resetMouseScrollState: function PDFPresentationMode_resetMouseScrollState() {
   this.mouseScrollTimeStamp = 0;
   this.mouseScrollDelta = 0;
  },
  _touchSwipe: function PDFPresentationMode_touchSwipe(evt) {
   if (!this.active) {
    return;
   }
   var SWIPE_MIN_DISTANCE_THRESHOLD = 50;
   var SWIPE_ANGLE_THRESHOLD = Math.PI / 6;
   if (evt.touches.length > 1) {
    this.touchSwipeState = null;
    return;
   }
   switch (evt.type) {
   case 'touchstart':
    this.touchSwipeState = {
     startX: evt.touches[0].pageX,
     startY: evt.touches[0].pageY,
     endX: evt.touches[0].pageX,
     endY: evt.touches[0].pageY
    };
    break;
   case 'touchmove':
    if (this.touchSwipeState === null) {
     return;
    }
    this.touchSwipeState.endX = evt.touches[0].pageX;
    this.touchSwipeState.endY = evt.touches[0].pageY;
    evt.preventDefault();
    break;
   case 'touchend':
    if (this.touchSwipeState === null) {
     return;
    }
    var delta = 0;
    var dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
    var dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
    var absAngle = Math.abs(Math.atan2(dy, dx));
    if (Math.abs(dx) > SWIPE_MIN_DISTANCE_THRESHOLD && (absAngle <= SWIPE_ANGLE_THRESHOLD || absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD)) {
     delta = dx;
    } else if (Math.abs(dy) > SWIPE_MIN_DISTANCE_THRESHOLD && Math.abs(absAngle - Math.PI / 2) <= SWIPE_ANGLE_THRESHOLD) {
     delta = dy;
    }
    if (delta > 0) {
     this._goToPreviousPage();
    } else if (delta < 0) {
     this._goToNextPage();
    }
    break;
   }
  },
  _addWindowListeners: function PDFPresentationMode_addWindowListeners() {
   this.showControlsBind = this._showControls.bind(this);
   this.mouseDownBind = this._mouseDown.bind(this);
   this.mouseWheelBind = this._mouseWheel.bind(this);
   this.resetMouseScrollStateBind = this._resetMouseScrollState.bind(this);
   this.contextMenuBind = this._contextMenu.bind(this);
   this.touchSwipeBind = this._touchSwipe.bind(this);
   window.addEventListener('mousemove', this.showControlsBind);
   window.addEventListener('mousedown', this.mouseDownBind);
   window.addEventListener('wheel', this.mouseWheelBind);
   window.addEventListener('keydown', this.resetMouseScrollStateBind);
   window.addEventListener('contextmenu', this.contextMenuBind);
   window.addEventListener('touchstart', this.touchSwipeBind);
   window.addEventListener('touchmove', this.touchSwipeBind);
   window.addEventListener('touchend', this.touchSwipeBind);
  },
  _removeWindowListeners: function PDFPresentationMode_removeWindowListeners() {
   window.removeEventListener('mousemove', this.showControlsBind);
   window.removeEventListener('mousedown', this.mouseDownBind);
   window.removeEventListener('wheel', this.mouseWheelBind);
   window.removeEventListener('keydown', this.resetMouseScrollStateBind);
   window.removeEventListener('contextmenu', this.contextMenuBind);
   window.removeEventListener('touchstart', this.touchSwipeBind);
   window.removeEventListener('touchmove', this.touchSwipeBind);
   window.removeEventListener('touchend', this.touchSwipeBind);
   delete this.showControlsBind;
   delete this.mouseDownBind;
   delete this.mouseWheelBind;
   delete this.resetMouseScrollStateBind;
   delete this.contextMenuBind;
   delete this.touchSwipeBind;
  },
  _fullscreenChange: function PDFPresentationMode_fullscreenChange() {
   if (this.isFullscreen) {
    this._enter();
   } else {
    this._exit();
   }
  },
  _addFullscreenChangeListeners: function PDFPresentationMode_addFullscreenChangeListeners() {
   this.fullscreenChangeBind = this._fullscreenChange.bind(this);
   window.addEventListener('fullscreenchange', this.fullscreenChangeBind);
   window.addEventListener('mozfullscreenchange', this.fullscreenChangeBind);
   window.addEventListener('webkitfullscreenchange', this.fullscreenChangeBind);
   window.addEventListener('MSFullscreenChange', this.fullscreenChangeBind);
  },
  _removeFullscreenChangeListeners: function PDFPresentationMode_removeFullscreenChangeListeners() {
   window.removeEventListener('fullscreenchange', this.fullscreenChangeBind);
   window.removeEventListener('mozfullscreenchange', this.fullscreenChangeBind);
   window.removeEventListener('webkitfullscreenchange', this.fullscreenChangeBind);
   window.removeEventListener('MSFullscreenChange', this.fullscreenChangeBind);
   delete this.fullscreenChangeBind;
  }
 };
 return PDFPresentationMode;
}();
exports.PDFPresentationMode = PDFPresentationMode;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var pdfRenderingQueue = __webpack_require__(3);
var uiUtils = __webpack_require__(0);
var RenderingStates = pdfRenderingQueue.RenderingStates;
var mozL10n = uiUtils.mozL10n;
var UI_NOTIFICATION_CLASS = 'pdfSidebarNotification';
var SidebarView = {
 NONE: 0,
 THUMBS: 1,
 OUTLINE: 2,
 ATTACHMENTS: 3
};
var PDFSidebar = function PDFSidebarClosure() {
 function PDFSidebar(options) {
  this.isOpen = false;
  this.active = SidebarView.THUMBS;
  this.isInitialViewSet = false;
  this.onToggled = null;
  this.pdfViewer = options.pdfViewer;
  this.pdfThumbnailViewer = options.pdfThumbnailViewer;
  this.pdfOutlineViewer = options.pdfOutlineViewer;
  this.mainContainer = options.mainContainer;
  this.outerContainer = options.outerContainer;
  this.eventBus = options.eventBus;
  this.toggleButton = options.toggleButton;
  this.thumbnailButton = options.thumbnailButton;
  this.outlineButton = options.outlineButton;
  this.attachmentsButton = options.attachmentsButton;
  this.thumbnailView = options.thumbnailView;
  this.outlineView = options.outlineView;
  this.attachmentsView = options.attachmentsView;
  this.disableNotification = options.disableNotification || false;
  this._addEventListeners();
 }
 PDFSidebar.prototype = {
  reset: function PDFSidebar_reset() {
   this.isInitialViewSet = false;
   this._hideUINotification(null);
   this.switchView(SidebarView.THUMBS);
   this.outlineButton.disabled = false;
   this.attachmentsButton.disabled = false;
  },
  get visibleView() {
   return this.isOpen ? this.active : SidebarView.NONE;
  },
  get isThumbnailViewVisible() {
   return this.isOpen && this.active === SidebarView.THUMBS;
  },
  get isOutlineViewVisible() {
   return this.isOpen && this.active === SidebarView.OUTLINE;
  },
  get isAttachmentsViewVisible() {
   return this.isOpen && this.active === SidebarView.ATTACHMENTS;
  },
  setInitialView: function PDFSidebar_setInitialView(view) {
   if (this.isInitialViewSet) {
    return;
   }
   this.isInitialViewSet = true;
   if (this.isOpen && view === SidebarView.NONE) {
    this._dispatchEvent();
    return;
   }
   var isViewPreserved = view === this.visibleView;
   this.switchView(view, true);
   if (isViewPreserved) {
    this._dispatchEvent();
   }
  },
  switchView: function PDFSidebar_switchView(view, forceOpen) {
   if (view === SidebarView.NONE) {
    this.close();
    return;
   }
   var isViewChanged = view !== this.active;
   var shouldForceRendering = false;
   switch (view) {
   case SidebarView.THUMBS:
    this.thumbnailButton.classList.add('toggled');
    this.outlineButton.classList.remove('toggled');
    this.attachmentsButton.classList.remove('toggled');
    this.thumbnailView.classList.remove('hidden');
    this.outlineView.classList.add('hidden');
    this.attachmentsView.classList.add('hidden');
    if (this.isOpen && isViewChanged) {
     this._updateThumbnailViewer();
     shouldForceRendering = true;
    }
    break;
   case SidebarView.OUTLINE:
    if (this.outlineButton.disabled) {
     return;
    }
    this.thumbnailButton.classList.remove('toggled');
    this.outlineButton.classList.add('toggled');
    this.attachmentsButton.classList.remove('toggled');
    this.thumbnailView.classList.add('hidden');
    this.outlineView.classList.remove('hidden');
    this.attachmentsView.classList.add('hidden');
    break;
   case SidebarView.ATTACHMENTS:
    if (this.attachmentsButton.disabled) {
     return;
    }
    this.thumbnailButton.classList.remove('toggled');
    this.outlineButton.classList.remove('toggled');
    this.attachmentsButton.classList.add('toggled');
    this.thumbnailView.classList.add('hidden');
    this.outlineView.classList.add('hidden');
    this.attachmentsView.classList.remove('hidden');
    break;
   default:
    console.error('PDFSidebar_switchView: "' + view + '" is an unsupported value.');
    return;
   }
   this.active = view | 0;
   if (forceOpen && !this.isOpen) {
    this.open();
    return;
   }
   if (shouldForceRendering) {
    this._forceRendering();
   }
   if (isViewChanged) {
    this._dispatchEvent();
   }
   this._hideUINotification(this.active);
  },
  open: function PDFSidebar_open() {
   if (this.isOpen) {
    return;
   }
   this.isOpen = true;
   this.toggleButton.classList.add('toggled');
   this.outerContainer.classList.add('sidebarMoving');
   this.outerContainer.classList.add('sidebarOpen');
   if (this.active === SidebarView.THUMBS) {
    this._updateThumbnailViewer();
   }
   this._forceRendering();
   this._dispatchEvent();
   this._hideUINotification(this.active);
  },
  close: function PDFSidebar_close() {
   if (!this.isOpen) {
    return;
   }
   this.isOpen = false;
   this.toggleButton.classList.remove('toggled');
   this.outerContainer.classList.add('sidebarMoving');
   this.outerContainer.classList.remove('sidebarOpen');
   this._forceRendering();
   this._dispatchEvent();
  },
  toggle: function PDFSidebar_toggle() {
   if (this.isOpen) {
    this.close();
   } else {
    this.open();
   }
  },
  _dispatchEvent: function PDFSidebar_dispatchEvent() {
   this.eventBus.dispatch('sidebarviewchanged', {
    source: this,
    view: this.visibleView
   });
  },
  _forceRendering: function PDFSidebar_forceRendering() {
   if (this.onToggled) {
    this.onToggled();
   } else {
    this.pdfViewer.forceRendering();
    this.pdfThumbnailViewer.forceRendering();
   }
  },
  _updateThumbnailViewer: function PDFSidebar_updateThumbnailViewer() {
   var pdfViewer = this.pdfViewer;
   var thumbnailViewer = this.pdfThumbnailViewer;
   var pagesCount = pdfViewer.pagesCount;
   for (var pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
    var pageView = pdfViewer.getPageView(pageIndex);
    if (pageView && pageView.renderingState === RenderingStates.FINISHED) {
     var thumbnailView = thumbnailViewer.getThumbnail(pageIndex);
     thumbnailView.setImage(pageView);
    }
   }
   thumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
  },
  _showUINotification: function (view) {
   if (this.disableNotification) {
    return;
   }
   this.toggleButton.title = mozL10n.get('toggle_sidebar_notification.title', null, 'Toggle Sidebar (document contains outline/attachments)');
   if (!this.isOpen) {
    this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
   } else if (view === this.active) {
    return;
   }
   switch (view) {
   case SidebarView.OUTLINE:
    this.outlineButton.classList.add(UI_NOTIFICATION_CLASS);
    break;
   case SidebarView.ATTACHMENTS:
    this.attachmentsButton.classList.add(UI_NOTIFICATION_CLASS);
    break;
   }
  },
  _hideUINotification: function (view) {
   if (this.disableNotification) {
    return;
   }
   var removeNotification = function (view) {
    switch (view) {
    case SidebarView.OUTLINE:
     this.outlineButton.classList.remove(UI_NOTIFICATION_CLASS);
     break;
    case SidebarView.ATTACHMENTS:
     this.attachmentsButton.classList.remove(UI_NOTIFICATION_CLASS);
     break;
    }
   }.bind(this);
   if (!this.isOpen && view !== null) {
    return;
   }
   this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
   if (view !== null) {
    removeNotification(view);
    return;
   }
   for (view in SidebarView) {
    removeNotification(SidebarView[view]);
   }
   this.toggleButton.title = mozL10n.get('toggle_sidebar.title', null, 'Toggle Sidebar');
  },
  _addEventListeners: function PDFSidebar_addEventListeners() {
   var self = this;
   self.mainContainer.addEventListener('transitionend', function (evt) {
    if (evt.target === this) {
     self.outerContainer.classList.remove('sidebarMoving');
    }
   });
   self.thumbnailButton.addEventListener('click', function () {
    self.switchView(SidebarView.THUMBS);
   });
   self.outlineButton.addEventListener('click', function () {
    self.switchView(SidebarView.OUTLINE);
   });
   self.outlineButton.addEventListener('dblclick', function () {
    self.pdfOutlineViewer.toggleOutlineTree();
   });
   self.attachmentsButton.addEventListener('click', function () {
    self.switchView(SidebarView.ATTACHMENTS);
   });
   self.eventBus.on('outlineloaded', function (e) {
    var outlineCount = e.outlineCount;
    self.outlineButton.disabled = !outlineCount;
    if (outlineCount) {
     self._showUINotification(SidebarView.OUTLINE);
    } else if (self.active === SidebarView.OUTLINE) {
     self.switchView(SidebarView.THUMBS);
    }
   });
   self.eventBus.on('attachmentsloaded', function (e) {
    var attachmentsCount = e.attachmentsCount;
    self.attachmentsButton.disabled = !attachmentsCount;
    if (attachmentsCount) {
     self._showUINotification(SidebarView.ATTACHMENTS);
    } else if (self.active === SidebarView.ATTACHMENTS) {
     self.switchView(SidebarView.THUMBS);
    }
   });
   self.eventBus.on('presentationmodechanged', function (e) {
    if (!e.active && !e.switchInProgress && self.isThumbnailViewVisible) {
     self._updateThumbnailViewer();
    }
   });
  }
 };
 return PDFSidebar;
}();
exports.SidebarView = SidebarView;
exports.PDFSidebar = PDFSidebar;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var pdfRenderingQueue = __webpack_require__(3);
var mozL10n = uiUtils.mozL10n;
var getOutputScale = uiUtils.getOutputScale;
var RenderingStates = pdfRenderingQueue.RenderingStates;
var THUMBNAIL_WIDTH = 98;
var THUMBNAIL_CANVAS_BORDER_WIDTH = 1;
var PDFThumbnailView = function PDFThumbnailViewClosure() {
 function getTempCanvas(width, height) {
  var tempCanvas = PDFThumbnailView.tempImageCache;
  if (!tempCanvas) {
   tempCanvas = document.createElement('canvas');
   PDFThumbnailView.tempImageCache = tempCanvas;
  }
  tempCanvas.width = width;
  tempCanvas.height = height;
  tempCanvas.mozOpaque = true;
  var ctx = tempCanvas.getContext('2d', { alpha: false });
  ctx.save();
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
  return tempCanvas;
 }
 function PDFThumbnailView(options) {
  var container = options.container;
  var id = options.id;
  var defaultViewport = options.defaultViewport;
  var linkService = options.linkService;
  var renderingQueue = options.renderingQueue;
  var disableCanvasToImageConversion = options.disableCanvasToImageConversion || false;
  this.id = id;
  this.renderingId = 'thumbnail' + id;
  this.pageLabel = null;
  this.pdfPage = null;
  this.rotation = 0;
  this.viewport = defaultViewport;
  this.pdfPageRotate = defaultViewport.rotation;
  this.linkService = linkService;
  this.renderingQueue = renderingQueue;
  this.renderTask = null;
  this.renderingState = RenderingStates.INITIAL;
  this.resume = null;
  this.disableCanvasToImageConversion = disableCanvasToImageConversion;
  this.pageWidth = this.viewport.width;
  this.pageHeight = this.viewport.height;
  this.pageRatio = this.pageWidth / this.pageHeight;
  this.canvasWidth = THUMBNAIL_WIDTH;
  this.canvasHeight = this.canvasWidth / this.pageRatio | 0;
  this.scale = this.canvasWidth / this.pageWidth;
  var anchor = document.createElement('a');
  anchor.href = linkService.getAnchorUrl('#page=' + id);
  anchor.title = mozL10n.get('thumb_page_title', { page: id }, 'Page {{page}}');
  anchor.onclick = function stopNavigation() {
   linkService.page = id;
   return false;
  };
  this.anchor = anchor;
  var div = document.createElement('div');
  div.className = 'thumbnail';
  div.setAttribute('data-page-number', this.id);
  this.div = div;
  if (id === 1) {
   div.classList.add('selected');
  }
  var ring = document.createElement('div');
  ring.className = 'thumbnailSelectionRing';
  var borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
  ring.style.width = this.canvasWidth + borderAdjustment + 'px';
  ring.style.height = this.canvasHeight + borderAdjustment + 'px';
  this.ring = ring;
  div.appendChild(ring);
  anchor.appendChild(div);
  container.appendChild(anchor);
 }
 PDFThumbnailView.prototype = {
  setPdfPage: function PDFThumbnailView_setPdfPage(pdfPage) {
   this.pdfPage = pdfPage;
   this.pdfPageRotate = pdfPage.rotate;
   var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
   this.viewport = pdfPage.getViewport(1, totalRotation);
   this.reset();
  },
  reset: function PDFThumbnailView_reset() {
   this.cancelRendering();
   this.pageWidth = this.viewport.width;
   this.pageHeight = this.viewport.height;
   this.pageRatio = this.pageWidth / this.pageHeight;
   this.canvasHeight = this.canvasWidth / this.pageRatio | 0;
   this.scale = this.canvasWidth / this.pageWidth;
   this.div.removeAttribute('data-loaded');
   var ring = this.ring;
   var childNodes = ring.childNodes;
   for (var i = childNodes.length - 1; i >= 0; i--) {
    ring.removeChild(childNodes[i]);
   }
   var borderAdjustment = 2 * THUMBNAIL_CANVAS_BORDER_WIDTH;
   ring.style.width = this.canvasWidth + borderAdjustment + 'px';
   ring.style.height = this.canvasHeight + borderAdjustment + 'px';
   if (this.canvas) {
    this.canvas.width = 0;
    this.canvas.height = 0;
    delete this.canvas;
   }
   if (this.image) {
    this.image.removeAttribute('src');
    delete this.image;
   }
  },
  update: function PDFThumbnailView_update(rotation) {
   if (typeof rotation !== 'undefined') {
    this.rotation = rotation;
   }
   var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
   this.viewport = this.viewport.clone({
    scale: 1,
    rotation: totalRotation
   });
   this.reset();
  },
  cancelRendering: function PDFThumbnailView_cancelRendering() {
   if (this.renderTask) {
    this.renderTask.cancel();
    this.renderTask = null;
   }
   this.renderingState = RenderingStates.INITIAL;
   this.resume = null;
  },
  _getPageDrawContext: function PDFThumbnailView_getPageDrawContext(noCtxScale) {
   var canvas = document.createElement('canvas');
   this.canvas = canvas;
   canvas.mozOpaque = true;
   var ctx = canvas.getContext('2d', { alpha: false });
   var outputScale = getOutputScale(ctx);
   canvas.width = this.canvasWidth * outputScale.sx | 0;
   canvas.height = this.canvasHeight * outputScale.sy | 0;
   canvas.style.width = this.canvasWidth + 'px';
   canvas.style.height = this.canvasHeight + 'px';
   if (!noCtxScale && outputScale.scaled) {
    ctx.scale(outputScale.sx, outputScale.sy);
   }
   return ctx;
  },
  _convertCanvasToImage: function PDFThumbnailView_convertCanvasToImage() {
   if (!this.canvas) {
    return;
   }
   if (this.renderingState !== RenderingStates.FINISHED) {
    return;
   }
   var id = this.renderingId;
   var className = 'thumbnailImage';
   var ariaLabel = mozL10n.get('thumb_page_canvas', { page: this.pageId }, 'Thumbnail of Page {{page}}');
   if (this.disableCanvasToImageConversion) {
    this.canvas.id = id;
    this.canvas.className = className;
    this.canvas.setAttribute('aria-label', ariaLabel);
    this.div.setAttribute('data-loaded', true);
    this.ring.appendChild(this.canvas);
    return;
   }
   var image = document.createElement('img');
   image.id = id;
   image.className = className;
   image.setAttribute('aria-label', ariaLabel);
   image.style.width = this.canvasWidth + 'px';
   image.style.height = this.canvasHeight + 'px';
   image.src = this.canvas.toDataURL();
   this.image = image;
   this.div.setAttribute('data-loaded', true);
   this.ring.appendChild(image);
   this.canvas.width = 0;
   this.canvas.height = 0;
   delete this.canvas;
  },
  draw: function PDFThumbnailView_draw() {
   if (this.renderingState !== RenderingStates.INITIAL) {
    console.error('Must be in new state before drawing');
    return Promise.resolve(undefined);
   }
   this.renderingState = RenderingStates.RUNNING;
   var resolveRenderPromise, rejectRenderPromise;
   var promise = new Promise(function (resolve, reject) {
    resolveRenderPromise = resolve;
    rejectRenderPromise = reject;
   });
   var self = this;
   function thumbnailDrawCallback(error) {
    if (renderTask === self.renderTask) {
     self.renderTask = null;
    }
    if (error === 'cancelled') {
     rejectRenderPromise(error);
     return;
    }
    self.renderingState = RenderingStates.FINISHED;
    self._convertCanvasToImage();
    if (!error) {
     resolveRenderPromise(undefined);
    } else {
     rejectRenderPromise(error);
    }
   }
   var ctx = this._getPageDrawContext();
   var drawViewport = this.viewport.clone({ scale: this.scale });
   var renderContinueCallback = function renderContinueCallback(cont) {
    if (!self.renderingQueue.isHighestPriority(self)) {
     self.renderingState = RenderingStates.PAUSED;
     self.resume = function resumeCallback() {
      self.renderingState = RenderingStates.RUNNING;
      cont();
     };
     return;
    }
    cont();
   };
   var renderContext = {
    canvasContext: ctx,
    viewport: drawViewport
   };
   var renderTask = this.renderTask = this.pdfPage.render(renderContext);
   renderTask.onContinue = renderContinueCallback;
   renderTask.promise.then(function pdfPageRenderCallback() {
    thumbnailDrawCallback(null);
   }, function pdfPageRenderError(error) {
    thumbnailDrawCallback(error);
   });
   return promise;
  },
  setImage: function PDFThumbnailView_setImage(pageView) {
   if (this.renderingState !== RenderingStates.INITIAL) {
    return;
   }
   var img = pageView.canvas;
   if (!img) {
    return;
   }
   if (!this.pdfPage) {
    this.setPdfPage(pageView.pdfPage);
   }
   this.renderingState = RenderingStates.FINISHED;
   var ctx = this._getPageDrawContext(true);
   var canvas = ctx.canvas;
   if (img.width <= 2 * canvas.width) {
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    this._convertCanvasToImage();
    return;
   }
   var MAX_NUM_SCALING_STEPS = 3;
   var reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
   var reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
   var reducedImage = getTempCanvas(reducedWidth, reducedHeight);
   var reducedImageCtx = reducedImage.getContext('2d');
   while (reducedWidth > img.width || reducedHeight > img.height) {
    reducedWidth >>= 1;
    reducedHeight >>= 1;
   }
   reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight);
   while (reducedWidth > 2 * canvas.width) {
    reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth >> 1, reducedHeight >> 1);
    reducedWidth >>= 1;
    reducedHeight >>= 1;
   }
   ctx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height);
   this._convertCanvasToImage();
  },
  get pageId() {
   return this.pageLabel !== null ? this.pageLabel : this.id;
  },
  setPageLabel: function PDFThumbnailView_setPageLabel(label) {
   this.pageLabel = typeof label === 'string' ? label : null;
   this.anchor.title = mozL10n.get('thumb_page_title', { page: this.pageId }, 'Page {{page}}');
   if (this.renderingState !== RenderingStates.FINISHED) {
    return;
   }
   var ariaLabel = mozL10n.get('thumb_page_canvas', { page: this.pageId }, 'Thumbnail of Page {{page}}');
   if (this.image) {
    this.image.setAttribute('aria-label', ariaLabel);
   } else if (this.disableCanvasToImageConversion && this.canvas) {
    this.canvas.setAttribute('aria-label', ariaLabel);
   }
  }
 };
 return PDFThumbnailView;
}();
PDFThumbnailView.tempImageCache = null;
exports.PDFThumbnailView = PDFThumbnailView;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var pdfThumbnailView = __webpack_require__(23);
var watchScroll = uiUtils.watchScroll;
var getVisibleElements = uiUtils.getVisibleElements;
var scrollIntoView = uiUtils.scrollIntoView;
var PDFThumbnailView = pdfThumbnailView.PDFThumbnailView;
var THUMBNAIL_SCROLL_MARGIN = -19;
var PDFThumbnailViewer = function PDFThumbnailViewerClosure() {
 function PDFThumbnailViewer(options) {
  this.container = options.container;
  this.renderingQueue = options.renderingQueue;
  this.linkService = options.linkService;
  this.scroll = watchScroll(this.container, this._scrollUpdated.bind(this));
  this._resetView();
 }
 PDFThumbnailViewer.prototype = {
  _scrollUpdated: function PDFThumbnailViewer_scrollUpdated() {
   this.renderingQueue.renderHighestPriority();
  },
  getThumbnail: function PDFThumbnailViewer_getThumbnail(index) {
   return this.thumbnails[index];
  },
  _getVisibleThumbs: function PDFThumbnailViewer_getVisibleThumbs() {
   return getVisibleElements(this.container, this.thumbnails);
  },
  scrollThumbnailIntoView: function PDFThumbnailViewer_scrollThumbnailIntoView(page) {
   var selected = document.querySelector('.thumbnail.selected');
   if (selected) {
    selected.classList.remove('selected');
   }
   var thumbnail = document.querySelector('div.thumbnail[data-page-number="' + page + '"]');
   if (thumbnail) {
    thumbnail.classList.add('selected');
   }
   var visibleThumbs = this._getVisibleThumbs();
   var numVisibleThumbs = visibleThumbs.views.length;
   if (numVisibleThumbs > 0) {
    var first = visibleThumbs.first.id;
    var last = numVisibleThumbs > 1 ? visibleThumbs.last.id : first;
    if (page <= first || page >= last) {
     scrollIntoView(thumbnail, { top: THUMBNAIL_SCROLL_MARGIN });
    }
   }
  },
  get pagesRotation() {
   return this._pagesRotation;
  },
  set pagesRotation(rotation) {
   this._pagesRotation = rotation;
   for (var i = 0, l = this.thumbnails.length; i < l; i++) {
    var thumb = this.thumbnails[i];
    thumb.update(rotation);
   }
  },
  cleanup: function PDFThumbnailViewer_cleanup() {
   var tempCanvas = PDFThumbnailView.tempImageCache;
   if (tempCanvas) {
    tempCanvas.width = 0;
    tempCanvas.height = 0;
   }
   PDFThumbnailView.tempImageCache = null;
  },
  _resetView: function PDFThumbnailViewer_resetView() {
   this.thumbnails = [];
   this._pageLabels = null;
   this._pagesRotation = 0;
   this._pagesRequests = [];
   this.container.textContent = '';
  },
  setDocument: function PDFThumbnailViewer_setDocument(pdfDocument) {
   if (this.pdfDocument) {
    this._cancelRendering();
    this._resetView();
   }
   this.pdfDocument = pdfDocument;
   if (!pdfDocument) {
    return Promise.resolve();
   }
   return pdfDocument.getPage(1).then(function (firstPage) {
    var pagesCount = pdfDocument.numPages;
    var viewport = firstPage.getViewport(1.0);
    for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
     var thumbnail = new PDFThumbnailView({
      container: this.container,
      id: pageNum,
      defaultViewport: viewport.clone(),
      linkService: this.linkService,
      renderingQueue: this.renderingQueue,
      disableCanvasToImageConversion: false
     });
     this.thumbnails.push(thumbnail);
    }
   }.bind(this));
  },
  _cancelRendering: function PDFThumbnailViewer_cancelRendering() {
   for (var i = 0, ii = this.thumbnails.length; i < ii; i++) {
    if (this.thumbnails[i]) {
     this.thumbnails[i].cancelRendering();
    }
   }
  },
  setPageLabels: function PDFThumbnailViewer_setPageLabels(labels) {
   if (!this.pdfDocument) {
    return;
   }
   if (!labels) {
    this._pageLabels = null;
   } else if (!(labels instanceof Array && this.pdfDocument.numPages === labels.length)) {
    this._pageLabels = null;
    console.error('PDFThumbnailViewer_setPageLabels: Invalid page labels.');
   } else {
    this._pageLabels = labels;
   }
   for (var i = 0, ii = this.thumbnails.length; i < ii; i++) {
    var thumbnailView = this.thumbnails[i];
    var label = this._pageLabels && this._pageLabels[i];
    thumbnailView.setPageLabel(label);
   }
  },
  _ensurePdfPageLoaded: function PDFThumbnailViewer_ensurePdfPageLoaded(thumbView) {
   if (thumbView.pdfPage) {
    return Promise.resolve(thumbView.pdfPage);
   }
   var pageNumber = thumbView.id;
   if (this._pagesRequests[pageNumber]) {
    return this._pagesRequests[pageNumber];
   }
   var promise = this.pdfDocument.getPage(pageNumber).then(function (pdfPage) {
    thumbView.setPdfPage(pdfPage);
    this._pagesRequests[pageNumber] = null;
    return pdfPage;
   }.bind(this));
   this._pagesRequests[pageNumber] = promise;
   return promise;
  },
  forceRendering: function () {
   var visibleThumbs = this._getVisibleThumbs();
   var thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this.thumbnails, this.scroll.down);
   if (thumbView) {
    this._ensurePdfPageLoaded(thumbView).then(function () {
     this.renderingQueue.renderView(thumbView);
    }.bind(this));
    return true;
   }
   return false;
  }
 };
 return PDFThumbnailViewer;
}();
exports.PDFThumbnailViewer = PDFThumbnailViewer;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var pdfPageView = __webpack_require__(20);
var pdfRenderingQueue = __webpack_require__(3);
var textLayerBuilder = __webpack_require__(27);
var annotationLayerBuilder = __webpack_require__(10);
var pdfLinkService = __webpack_require__(5);
var domEvents = __webpack_require__(2);
var pdfjsLib = __webpack_require__(1);
var UNKNOWN_SCALE = uiUtils.UNKNOWN_SCALE;
var SCROLLBAR_PADDING = uiUtils.SCROLLBAR_PADDING;
var VERTICAL_PADDING = uiUtils.VERTICAL_PADDING;
var MAX_AUTO_SCALE = uiUtils.MAX_AUTO_SCALE;
var CSS_UNITS = uiUtils.CSS_UNITS;
var DEFAULT_SCALE = uiUtils.DEFAULT_SCALE;
var DEFAULT_SCALE_VALUE = uiUtils.DEFAULT_SCALE_VALUE;
var RendererType = uiUtils.RendererType;
var scrollIntoView = uiUtils.scrollIntoView;
var watchScroll = uiUtils.watchScroll;
var getVisibleElements = uiUtils.getVisibleElements;
var PDFPageView = pdfPageView.PDFPageView;
var RenderingStates = pdfRenderingQueue.RenderingStates;
var PDFRenderingQueue = pdfRenderingQueue.PDFRenderingQueue;
var TextLayerBuilder = textLayerBuilder.TextLayerBuilder;
var AnnotationLayerBuilder = annotationLayerBuilder.AnnotationLayerBuilder;
var SimpleLinkService = pdfLinkService.SimpleLinkService;
var PresentationModeState = {
 UNKNOWN: 0,
 NORMAL: 1,
 CHANGING: 2,
 FULLSCREEN: 3
};
var DEFAULT_CACHE_SIZE = 10;
var PDFViewer = function pdfViewer() {
 function PDFPageViewBuffer(size) {
  var data = [];
  this.push = function cachePush(view) {
   var i = data.indexOf(view);
   if (i >= 0) {
    data.splice(i, 1);
   }
   data.push(view);
   if (data.length > size) {
    data.shift().destroy();
   }
  };
  this.resize = function (newSize) {
   size = newSize;
   while (data.length > size) {
    data.shift().destroy();
   }
  };
 }
 function isSameScale(oldScale, newScale) {
  if (newScale === oldScale) {
   return true;
  }
  if (Math.abs(newScale - oldScale) < 1e-15) {
   return true;
  }
  return false;
 }
 function isPortraitOrientation(size) {
  return size.width <= size.height;
 }
 function PDFViewer(options) {
  this.container = options.container;
  this.viewer = options.viewer || options.container.firstElementChild;
  this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
  this.linkService = options.linkService || new SimpleLinkService();
  this.downloadManager = options.downloadManager || null;
  this.removePageBorders = options.removePageBorders || false;
  this.enhanceTextSelection = options.enhanceTextSelection || false;
  this.renderInteractiveForms = options.renderInteractiveForms || false;
  this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
  this.renderer = options.renderer || RendererType.CANVAS;
  this.defaultRenderingQueue = !options.renderingQueue;
  if (this.defaultRenderingQueue) {
   this.renderingQueue = new PDFRenderingQueue();
   this.renderingQueue.setViewer(this);
  } else {
   this.renderingQueue = options.renderingQueue;
  }
  this.scroll = watchScroll(this.container, this._scrollUpdate.bind(this));
  this.presentationModeState = PresentationModeState.UNKNOWN;
  this._resetView();
  if (this.removePageBorders) {
   this.viewer.classList.add('removePageBorders');
  }
 }
 PDFViewer.prototype = {
  get pagesCount() {
   return this._pages.length;
  },
  getPageView: function (index) {
   return this._pages[index];
  },
  get pageViewsReady() {
   return this._pageViewsReady;
  },
  get currentPageNumber() {
   return this._currentPageNumber;
  },
  set currentPageNumber(val) {
   if ((val | 0) !== val) {
    throw new Error('Invalid page number.');
   }
   if (!this.pdfDocument) {
    this._currentPageNumber = val;
    return;
   }
   this._setCurrentPageNumber(val, true);
  },
  _setCurrentPageNumber: function PDFViewer_setCurrentPageNumber(val, resetCurrentPageView) {
   if (this._currentPageNumber === val) {
    if (resetCurrentPageView) {
     this._resetCurrentPageView();
    }
    return;
   }
   if (!(0 < val && val <= this.pagesCount)) {
    console.error('PDFViewer_setCurrentPageNumber: "' + val + '" is out of bounds.');
    return;
   }
   var arg = {
    source: this,
    pageNumber: val,
    pageLabel: this._pageLabels && this._pageLabels[val - 1]
   };
   this._currentPageNumber = val;
   this.eventBus.dispatch('pagechanging', arg);
   this.eventBus.dispatch('pagechange', arg);
   if (resetCurrentPageView) {
    this._resetCurrentPageView();
   }
  },
  get currentPageLabel() {
   return this._pageLabels && this._pageLabels[this._currentPageNumber - 1];
  },
  set currentPageLabel(val) {
   var pageNumber = val | 0;
   if (this._pageLabels) {
    var i = this._pageLabels.indexOf(val);
    if (i >= 0) {
     pageNumber = i + 1;
    }
   }
   this.currentPageNumber = pageNumber;
  },
  get currentScale() {
   return this._currentScale !== UNKNOWN_SCALE ? this._currentScale : DEFAULT_SCALE;
  },
  set currentScale(val) {
   if (isNaN(val)) {
    throw new Error('Invalid numeric scale');
   }
   if (!this.pdfDocument) {
    this._currentScale = val;
    this._currentScaleValue = val !== UNKNOWN_SCALE ? val.toString() : null;
    return;
   }
   this._setScale(val, false);
  },
  get currentScaleValue() {
   return this._currentScaleValue;
  },
  set currentScaleValue(val) {
   if (!this.pdfDocument) {
    this._currentScale = isNaN(val) ? UNKNOWN_SCALE : val;
    this._currentScaleValue = val.toString();
    return;
   }
   this._setScale(val, false);
  },
  get pagesRotation() {
   return this._pagesRotation;
  },
  set pagesRotation(rotation) {
   if (!(typeof rotation === 'number' && rotation % 90 === 0)) {
    throw new Error('Invalid pages rotation angle.');
   }
   this._pagesRotation = rotation;
   if (!this.pdfDocument) {
    return;
   }
   for (var i = 0, l = this._pages.length; i < l; i++) {
    var pageView = this._pages[i];
    pageView.update(pageView.scale, rotation);
   }
   this._setScale(this._currentScaleValue, true);
   if (this.defaultRenderingQueue) {
    this.update();
   }
  },
  setDocument: function (pdfDocument) {
   if (this.pdfDocument) {
    this._cancelRendering();
    this._resetView();
   }
   this.pdfDocument = pdfDocument;
   if (!pdfDocument) {
    return;
   }
   var pagesCount = pdfDocument.numPages;
   var self = this;
   var resolvePagesPromise;
   var pagesPromise = new Promise(function (resolve) {
    resolvePagesPromise = resolve;
   });
   this.pagesPromise = pagesPromise;
   pagesPromise.then(function () {
    self._pageViewsReady = true;
    self.eventBus.dispatch('pagesloaded', {
     source: self,
     pagesCount: pagesCount
    });
   });
   var isOnePageRenderedResolved = false;
   var resolveOnePageRendered = null;
   var onePageRendered = new Promise(function (resolve) {
    resolveOnePageRendered = resolve;
   });
   this.onePageRendered = onePageRendered;
   var bindOnAfterAndBeforeDraw = function (pageView) {
    pageView.onBeforeDraw = function pdfViewLoadOnBeforeDraw() {
     self._buffer.push(this);
    };
    pageView.onAfterDraw = function pdfViewLoadOnAfterDraw() {
     if (!isOnePageRenderedResolved) {
      isOnePageRenderedResolved = true;
      resolveOnePageRendered();
     }
    };
   };
   var firstPagePromise = pdfDocument.getPage(1);
   this.firstPagePromise = firstPagePromise;
   return firstPagePromise.then(function (pdfPage) {
    var scale = this.currentScale;
    var viewport = pdfPage.getViewport(scale * CSS_UNITS);
    for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
     var textLayerFactory = null;
     if (!pdfjsLib.PDFJS.disableTextLayer) {
      textLayerFactory = this;
     }
     var pageView = new PDFPageView({
      container: this.viewer,
      eventBus: this.eventBus,
      id: pageNum,
      scale: scale,
      defaultViewport: viewport.clone(),
      renderingQueue: this.renderingQueue,
      textLayerFactory: textLayerFactory,
      annotationLayerFactory: this,
      enhanceTextSelection: this.enhanceTextSelection,
      renderInteractiveForms: this.renderInteractiveForms,
      renderer: this.renderer
     });
     bindOnAfterAndBeforeDraw(pageView);
     this._pages.push(pageView);
    }
    var linkService = this.linkService;
    onePageRendered.then(function () {
     if (!pdfjsLib.PDFJS.disableAutoFetch) {
      var getPagesLeft = pagesCount;
      for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
       pdfDocument.getPage(pageNum).then(function (pageNum, pdfPage) {
        var pageView = self._pages[pageNum - 1];
        if (!pageView.pdfPage) {
         pageView.setPdfPage(pdfPage);
        }
        linkService.cachePageRef(pageNum, pdfPage.ref);
        getPagesLeft--;
        if (!getPagesLeft) {
         resolvePagesPromise();
        }
       }.bind(null, pageNum));
      }
     } else {
      resolvePagesPromise();
     }
    });
    self.eventBus.dispatch('pagesinit', { source: self });
    if (this.defaultRenderingQueue) {
     this.update();
    }
    if (this.findController) {
     this.findController.resolveFirstPage();
    }
   }.bind(this));
  },
  setPageLabels: function PDFViewer_setPageLabels(labels) {
   if (!this.pdfDocument) {
    return;
   }
   if (!labels) {
    this._pageLabels = null;
   } else if (!(labels instanceof Array && this.pdfDocument.numPages === labels.length)) {
    this._pageLabels = null;
    console.error('PDFViewer_setPageLabels: Invalid page labels.');
   } else {
    this._pageLabels = labels;
   }
   for (var i = 0, ii = this._pages.length; i < ii; i++) {
    var pageView = this._pages[i];
    var label = this._pageLabels && this._pageLabels[i];
    pageView.setPageLabel(label);
   }
  },
  _resetView: function () {
   this._pages = [];
   this._currentPageNumber = 1;
   this._currentScale = UNKNOWN_SCALE;
   this._currentScaleValue = null;
   this._pageLabels = null;
   this._buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
   this._location = null;
   this._pagesRotation = 0;
   this._pagesRequests = [];
   this._pageViewsReady = false;
   this.viewer.textContent = '';
  },
  _scrollUpdate: function PDFViewer_scrollUpdate() {
   if (this.pagesCount === 0) {
    return;
   }
   this.update();
   for (var i = 0, ii = this._pages.length; i < ii; i++) {
    this._pages[i].updatePosition();
   }
  },
  _setScaleDispatchEvent: function pdfViewer_setScaleDispatchEvent(newScale, newValue, preset) {
   var arg = {
    source: this,
    scale: newScale,
    presetValue: preset ? newValue : undefined
   };
   this.eventBus.dispatch('scalechanging', arg);
   this.eventBus.dispatch('scalechange', arg);
  },
  _setScaleUpdatePages: function pdfViewer_setScaleUpdatePages(newScale, newValue, noScroll, preset) {
   this._currentScaleValue = newValue.toString();
   if (isSameScale(this._currentScale, newScale)) {
    if (preset) {
     this._setScaleDispatchEvent(newScale, newValue, true);
    }
    return;
   }
   for (var i = 0, ii = this._pages.length; i < ii; i++) {
    this._pages[i].update(newScale);
   }
   this._currentScale = newScale;
   if (!noScroll) {
    var page = this._currentPageNumber, dest;
    if (this._location && !pdfjsLib.PDFJS.ignoreCurrentPositionOnZoom && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
     page = this._location.pageNumber;
     dest = [
      null,
      { name: 'XYZ' },
      this._location.left,
      this._location.top,
      null
     ];
    }
    this.scrollPageIntoView({
     pageNumber: page,
     destArray: dest,
     allowNegativeOffset: true
    });
   }
   this._setScaleDispatchEvent(newScale, newValue, preset);
   if (this.defaultRenderingQueue) {
    this.update();
   }
  },
  _setScale: function PDFViewer_setScale(value, noScroll) {
   var scale = parseFloat(value);
   if (scale > 0) {
    this._setScaleUpdatePages(scale, value, noScroll, false);
   } else {
    var currentPage = this._pages[this._currentPageNumber - 1];
    if (!currentPage) {
     return;
    }
    var hPadding = this.isInPresentationMode || this.removePageBorders ? 0 : SCROLLBAR_PADDING;
    var vPadding = this.isInPresentationMode || this.removePageBorders ? 0 : VERTICAL_PADDING;
    var pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale;
    var pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;
    switch (value) {
    case 'page-actual':
     scale = 1;
     break;
    case 'page-width':
     scale = pageWidthScale;
     break;
    case 'page-height':
     scale = pageHeightScale;
     break;
    case 'page-fit':
     scale = Math.min(pageWidthScale, pageHeightScale);
     break;
    case 'auto':
     var isLandscape = currentPage.width > currentPage.height;
     var horizontalScale = isLandscape ? Math.min(pageHeightScale, pageWidthScale) : pageWidthScale;
     scale = Math.min(MAX_AUTO_SCALE, horizontalScale);
     break;
    default:
     console.error('PDFViewer_setScale: "' + value + '" is an unknown zoom value.');
     return;
    }
    this._setScaleUpdatePages(scale, value, noScroll, true);
   }
  },
  _resetCurrentPageView: function () {
   if (this.isInPresentationMode) {
    this._setScale(this._currentScaleValue, true);
   }
   var pageView = this._pages[this._currentPageNumber - 1];
   scrollIntoView(pageView.div);
  },
  scrollPageIntoView: function PDFViewer_scrollPageIntoView(params) {
   if (!this.pdfDocument) {
    return;
   }
   if (arguments.length > 1 || typeof params === 'number') {
    console.warn('Call of scrollPageIntoView() with obsolete signature.');
    var paramObj = {};
    if (typeof params === 'number') {
     paramObj.pageNumber = params;
    }
    if (arguments[1] instanceof Array) {
     paramObj.destArray = arguments[1];
    }
    params = paramObj;
   }
   var pageNumber = params.pageNumber || 0;
   var dest = params.destArray || null;
   var allowNegativeOffset = params.allowNegativeOffset || false;
   if (this.isInPresentationMode || !dest) {
    this._setCurrentPageNumber(pageNumber, true);
    return;
   }
   var pageView = this._pages[pageNumber - 1];
   if (!pageView) {
    console.error('PDFViewer_scrollPageIntoView: ' + 'Invalid "pageNumber" parameter.');
    return;
   }
   var x = 0, y = 0;
   var width = 0, height = 0, widthScale, heightScale;
   var changeOrientation = pageView.rotation % 180 === 0 ? false : true;
   var pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / CSS_UNITS;
   var pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / CSS_UNITS;
   var scale = 0;
   switch (dest[1].name) {
   case 'XYZ':
    x = dest[2];
    y = dest[3];
    scale = dest[4];
    x = x !== null ? x : 0;
    y = y !== null ? y : pageHeight;
    break;
   case 'Fit':
   case 'FitB':
    scale = 'page-fit';
    break;
   case 'FitH':
   case 'FitBH':
    y = dest[2];
    scale = 'page-width';
    if (y === null && this._location) {
     x = this._location.left;
     y = this._location.top;
    }
    break;
   case 'FitV':
   case 'FitBV':
    x = dest[2];
    width = pageWidth;
    height = pageHeight;
    scale = 'page-height';
    break;
   case 'FitR':
    x = dest[2];
    y = dest[3];
    width = dest[4] - x;
    height = dest[5] - y;
    var hPadding = this.removePageBorders ? 0 : SCROLLBAR_PADDING;
    var vPadding = this.removePageBorders ? 0 : VERTICAL_PADDING;
    widthScale = (this.container.clientWidth - hPadding) / width / CSS_UNITS;
    heightScale = (this.container.clientHeight - vPadding) / height / CSS_UNITS;
    scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
    break;
   default:
    console.error('PDFViewer_scrollPageIntoView: \'' + dest[1].name + '\' is not a valid destination type.');
    return;
   }
   if (scale && scale !== this._currentScale) {
    this.currentScaleValue = scale;
   } else if (this._currentScale === UNKNOWN_SCALE) {
    this.currentScaleValue = DEFAULT_SCALE_VALUE;
   }
   if (scale === 'page-fit' && !dest[4]) {
    scrollIntoView(pageView.div);
    return;
   }
   var boundingRect = [
    pageView.viewport.convertToViewportPoint(x, y),
    pageView.viewport.convertToViewportPoint(x + width, y + height)
   ];
   var left = Math.min(boundingRect[0][0], boundingRect[1][0]);
   var top = Math.min(boundingRect[0][1], boundingRect[1][1]);
   if (!allowNegativeOffset) {
    left = Math.max(left, 0);
    top = Math.max(top, 0);
   }
   scrollIntoView(pageView.div, {
    left: left,
    top: top
   });
  },
  _updateLocation: function (firstPage) {
   var currentScale = this._currentScale;
   var currentScaleValue = this._currentScaleValue;
   var normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
   var pageNumber = firstPage.id;
   var pdfOpenParams = '#page=' + pageNumber;
   pdfOpenParams += '&zoom=' + normalizedScaleValue;
   var currentPageView = this._pages[pageNumber - 1];
   var container = this.container;
   var topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
   var intLeft = Math.round(topLeft[0]);
   var intTop = Math.round(topLeft[1]);
   pdfOpenParams += ',' + intLeft + ',' + intTop;
   this._location = {
    pageNumber: pageNumber,
    scale: normalizedScaleValue,
    top: intTop,
    left: intLeft,
    pdfOpenParams: pdfOpenParams
   };
  },
  update: function PDFViewer_update() {
   var visible = this._getVisiblePages();
   var visiblePages = visible.views;
   if (visiblePages.length === 0) {
    return;
   }
   var suggestedCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * visiblePages.length + 1);
   this._buffer.resize(suggestedCacheSize);
   this.renderingQueue.renderHighestPriority(visible);
   var currentId = this._currentPageNumber;
   var firstPage = visible.first;
   for (var i = 0, ii = visiblePages.length, stillFullyVisible = false; i < ii; ++i) {
    var page = visiblePages[i];
    if (page.percent < 100) {
     break;
    }
    if (page.id === currentId) {
     stillFullyVisible = true;
     break;
    }
   }
   if (!stillFullyVisible) {
    currentId = visiblePages[0].id;
   }
   if (!this.isInPresentationMode) {
    this._setCurrentPageNumber(currentId);
   }
   this._updateLocation(firstPage);
   this.eventBus.dispatch('updateviewarea', {
    source: this,
    location: this._location
   });
  },
  containsElement: function (element) {
   return this.container.contains(element);
  },
  focus: function () {
   this.container.focus();
  },
  get isInPresentationMode() {
   return this.presentationModeState === PresentationModeState.FULLSCREEN;
  },
  get isChangingPresentationMode() {
   return this.presentationModeState === PresentationModeState.CHANGING;
  },
  get isHorizontalScrollbarEnabled() {
   return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
  },
  _getVisiblePages: function () {
   if (!this.isInPresentationMode) {
    return getVisibleElements(this.container, this._pages, true);
   }
   var visible = [];
   var currentPage = this._pages[this._currentPageNumber - 1];
   visible.push({
    id: currentPage.id,
    view: currentPage
   });
   return {
    first: currentPage,
    last: currentPage,
    views: visible
   };
  },
  cleanup: function () {
   for (var i = 0, ii = this._pages.length; i < ii; i++) {
    if (this._pages[i] && this._pages[i].renderingState !== RenderingStates.FINISHED) {
     this._pages[i].reset();
    }
   }
  },
  _cancelRendering: function PDFViewer_cancelRendering() {
   for (var i = 0, ii = this._pages.length; i < ii; i++) {
    if (this._pages[i]) {
     this._pages[i].cancelRendering();
    }
   }
  },
  _ensurePdfPageLoaded: function (pageView) {
   if (pageView.pdfPage) {
    return Promise.resolve(pageView.pdfPage);
   }
   var pageNumber = pageView.id;
   if (this._pagesRequests[pageNumber]) {
    return this._pagesRequests[pageNumber];
   }
   var promise = this.pdfDocument.getPage(pageNumber).then(function (pdfPage) {
    pageView.setPdfPage(pdfPage);
    this._pagesRequests[pageNumber] = null;
    return pdfPage;
   }.bind(this));
   this._pagesRequests[pageNumber] = promise;
   return promise;
  },
  forceRendering: function (currentlyVisiblePages) {
   var visiblePages = currentlyVisiblePages || this._getVisiblePages();
   var pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, this.scroll.down);
   if (pageView) {
    this._ensurePdfPageLoaded(pageView).then(function () {
     this.renderingQueue.renderView(pageView);
    }.bind(this));
    return true;
   }
   return false;
  },
  getPageTextContent: function (pageIndex) {
   return this.pdfDocument.getPage(pageIndex + 1).then(function (page) {
    return page.getTextContent({ normalizeWhitespace: true });
   });
  },
  createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport, enhanceTextSelection) {
   return new TextLayerBuilder({
    textLayerDiv: textLayerDiv,
    eventBus: this.eventBus,
    pageIndex: pageIndex,
    viewport: viewport,
    findController: this.isInPresentationMode ? null : this.findController,
    enhanceTextSelection: this.isInPresentationMode ? false : enhanceTextSelection
   });
  },
  createAnnotationLayerBuilder: function (pageDiv, pdfPage, renderInteractiveForms) {
   return new AnnotationLayerBuilder({
    pageDiv: pageDiv,
    pdfPage: pdfPage,
    renderInteractiveForms: renderInteractiveForms,
    linkService: this.linkService,
    downloadManager: this.downloadManager
   });
  },
  setFindController: function (findController) {
   this.findController = findController;
  },
  getPagesOverview: function () {
   var pagesOverview = this._pages.map(function (pageView) {
    var viewport = pageView.pdfPage.getViewport(1);
    return {
     width: viewport.width,
     height: viewport.height,
     rotation: viewport.rotation
    };
   });
   if (!this.enablePrintAutoRotate) {
    return pagesOverview;
   }
   var isFirstPagePortrait = isPortraitOrientation(pagesOverview[0]);
   return pagesOverview.map(function (size) {
    if (isFirstPagePortrait === isPortraitOrientation(size)) {
     return size;
    }
    return {
     width: size.height,
     height: size.width,
     rotation: (size.rotation + 90) % 360
    };
   });
  }
 };
 return PDFViewer;
}();
exports.PresentationModeState = PresentationModeState;
exports.PDFViewer = PDFViewer;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var SCROLLBAR_PADDING = uiUtils.SCROLLBAR_PADDING;
var mozL10n = uiUtils.mozL10n;
var SecondaryToolbar = function SecondaryToolbarClosure() {
 function SecondaryToolbar(options, mainContainer, eventBus) {
  this.toolbar = options.toolbar;
  this.toggleButton = options.toggleButton;
  this.toolbarButtonContainer = options.toolbarButtonContainer;
  this.buttons = [
   {
    element: options.presentationModeButton,
    eventName: 'presentationmode',
    close: true
   },
   {
    element: options.openFileButton,
    eventName: 'openfile',
    close: true
   },
   {
    element: options.printButton,
    eventName: 'print',
    close: true
   },
   {
    element: options.downloadButton,
    eventName: 'download',
    close: true
   },
   {
    element: options.viewBookmarkButton,
    eventName: null,
    close: true
   },
   {
    element: options.firstPageButton,
    eventName: 'firstpage',
    close: true
   },
   {
    element: options.lastPageButton,
    eventName: 'lastpage',
    close: true
   },
   {
    element: options.pageRotateCwButton,
    eventName: 'rotatecw',
    close: false
   },
   {
    element: options.pageRotateCcwButton,
    eventName: 'rotateccw',
    close: false
   },
   {
    element: options.toggleHandToolButton,
    eventName: 'togglehandtool',
    close: true
   },
   {
    element: options.documentPropertiesButton,
    eventName: 'documentproperties',
    close: true
   }
  ];
  this.items = {
   firstPage: options.firstPageButton,
   lastPage: options.lastPageButton,
   pageRotateCw: options.pageRotateCwButton,
   pageRotateCcw: options.pageRotateCcwButton
  };
  this.mainContainer = mainContainer;
  this.eventBus = eventBus;
  this.opened = false;
  this.containerHeight = null;
  this.previousContainerHeight = null;
  this.reset();
  this._bindClickListeners();
  this._bindHandToolListener(options.toggleHandToolButton);
  this.eventBus.on('resize', this._setMaxHeight.bind(this));
 }
 SecondaryToolbar.prototype = {
  get isOpen() {
   return this.opened;
  },
  setPageNumber: function SecondaryToolbar_setPageNumber(pageNumber) {
   this.pageNumber = pageNumber;
   this._updateUIState();
  },
  setPagesCount: function SecondaryToolbar_setPagesCount(pagesCount) {
   this.pagesCount = pagesCount;
   this._updateUIState();
  },
  reset: function SecondaryToolbar_reset() {
   this.pageNumber = 0;
   this.pagesCount = 0;
   this._updateUIState();
  },
  _updateUIState: function SecondaryToolbar_updateUIState() {
   var items = this.items;
   items.firstPage.disabled = this.pageNumber <= 1;
   items.lastPage.disabled = this.pageNumber >= this.pagesCount;
   items.pageRotateCw.disabled = this.pagesCount === 0;
   items.pageRotateCcw.disabled = this.pagesCount === 0;
  },
  _bindClickListeners: function SecondaryToolbar_bindClickListeners() {
   this.toggleButton.addEventListener('click', this.toggle.bind(this));
   for (var button in this.buttons) {
    var element = this.buttons[button].element;
    var eventName = this.buttons[button].eventName;
    var close = this.buttons[button].close;
    element.addEventListener('click', function (eventName, close) {
     if (eventName !== null) {
      this.eventBus.dispatch(eventName, { source: this });
     }
     if (close) {
      this.close();
     }
    }.bind(this, eventName, close));
   }
  },
  _bindHandToolListener: function SecondaryToolbar_bindHandToolListener(toggleHandToolButton) {
   var isHandToolActive = false;
   this.eventBus.on('handtoolchanged', function (e) {
    if (isHandToolActive === e.isActive) {
     return;
    }
    isHandToolActive = e.isActive;
    if (isHandToolActive) {
     toggleHandToolButton.title = mozL10n.get('hand_tool_disable.title', null, 'Disable hand tool');
     toggleHandToolButton.firstElementChild.textContent = mozL10n.get('hand_tool_disable_label', null, 'Disable hand tool');
    } else {
     toggleHandToolButton.title = mozL10n.get('hand_tool_enable.title', null, 'Enable hand tool');
     toggleHandToolButton.firstElementChild.textContent = mozL10n.get('hand_tool_enable_label', null, 'Enable hand tool');
    }
   });
  },
  open: function SecondaryToolbar_open() {
   if (this.opened) {
    return;
   }
   this.opened = true;
   this._setMaxHeight();
   this.toggleButton.classList.add('toggled');
   this.toolbar.classList.remove('hidden');
  },
  close: function SecondaryToolbar_close() {
   if (!this.opened) {
    return;
   }
   this.opened = false;
   this.toolbar.classList.add('hidden');
   this.toggleButton.classList.remove('toggled');
  },
  toggle: function SecondaryToolbar_toggle() {
   if (this.opened) {
    this.close();
   } else {
    this.open();
   }
  },
  _setMaxHeight: function SecondaryToolbar_setMaxHeight() {
   if (!this.opened) {
    return;
   }
   this.containerHeight = this.mainContainer.clientHeight;
   if (this.containerHeight === this.previousContainerHeight) {
    return;
   }
   this.toolbarButtonContainer.setAttribute('style', 'max-height: ' + (this.containerHeight - SCROLLBAR_PADDING) + 'px;');
   this.previousContainerHeight = this.containerHeight;
  }
 };
 return SecondaryToolbar;
}();
exports.SecondaryToolbar = SecondaryToolbar;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var domEvents = __webpack_require__(2);
var pdfjsLib = __webpack_require__(1);
var EXPAND_DIVS_TIMEOUT = 300;
var TextLayerBuilder = function TextLayerBuilderClosure() {
 function TextLayerBuilder(options) {
  this.textLayerDiv = options.textLayerDiv;
  this.eventBus = options.eventBus || domEvents.getGlobalEventBus();
  this.textContent = null;
  this.renderingDone = false;
  this.pageIdx = options.pageIndex;
  this.pageNumber = this.pageIdx + 1;
  this.matches = [];
  this.viewport = options.viewport;
  this.textDivs = [];
  this.findController = options.findController || null;
  this.textLayerRenderTask = null;
  this.enhanceTextSelection = options.enhanceTextSelection;
  this._bindMouse();
 }
 TextLayerBuilder.prototype = {
  _finishRendering: function TextLayerBuilder_finishRendering() {
   this.renderingDone = true;
   if (!this.enhanceTextSelection) {
    var endOfContent = document.createElement('div');
    endOfContent.className = 'endOfContent';
    this.textLayerDiv.appendChild(endOfContent);
   }
   this.eventBus.dispatch('textlayerrendered', {
    source: this,
    pageNumber: this.pageNumber,
    numTextDivs: this.textDivs.length
   });
  },
  render: function TextLayerBuilder_render(timeout) {
   if (!this.textContent || this.renderingDone) {
    return;
   }
   this.cancel();
   this.textDivs = [];
   var textLayerFrag = document.createDocumentFragment();
   this.textLayerRenderTask = pdfjsLib.renderTextLayer({
    textContent: this.textContent,
    container: textLayerFrag,
    viewport: this.viewport,
    textDivs: this.textDivs,
    timeout: timeout,
    enhanceTextSelection: this.enhanceTextSelection
   });
   this.textLayerRenderTask.promise.then(function () {
    this.textLayerDiv.appendChild(textLayerFrag);
    this._finishRendering();
    this.updateMatches();
   }.bind(this), function (reason) {
   });
  },
  cancel: function TextLayerBuilder_cancel() {
   if (this.textLayerRenderTask) {
    this.textLayerRenderTask.cancel();
    this.textLayerRenderTask = null;
   }
  },
  setTextContent: function TextLayerBuilder_setTextContent(textContent) {
   this.cancel();
   this.textContent = textContent;
  },
  convertMatches: function TextLayerBuilder_convertMatches(matches, matchesLength) {
   var i = 0;
   var iIndex = 0;
   var bidiTexts = this.textContent.items;
   var end = bidiTexts.length - 1;
   var queryLen = this.findController === null ? 0 : this.findController.state.query.length;
   var ret = [];
   if (!matches) {
    return ret;
   }
   for (var m = 0, len = matches.length; m < len; m++) {
    var matchIdx = matches[m];
    while (i !== end && matchIdx >= iIndex + bidiTexts[i].str.length) {
     iIndex += bidiTexts[i].str.length;
     i++;
    }
    if (i === bidiTexts.length) {
     console.error('Could not find a matching mapping');
    }
    var match = {
     begin: {
      divIdx: i,
      offset: matchIdx - iIndex
     }
    };
    if (matchesLength) {
     matchIdx += matchesLength[m];
    } else {
     matchIdx += queryLen;
    }
    while (i !== end && matchIdx > iIndex + bidiTexts[i].str.length) {
     iIndex += bidiTexts[i].str.length;
     i++;
    }
    match.end = {
     divIdx: i,
     offset: matchIdx - iIndex
    };
    ret.push(match);
   }
   return ret;
  },
  renderMatches: function TextLayerBuilder_renderMatches(matches) {
   if (matches.length === 0) {
    return;
   }
   var bidiTexts = this.textContent.items;
   var textDivs = this.textDivs;
   var prevEnd = null;
   var pageIdx = this.pageIdx;
   var isSelectedPage = this.findController === null ? false : pageIdx === this.findController.selected.pageIdx;
   var selectedMatchIdx = this.findController === null ? -1 : this.findController.selected.matchIdx;
   var highlightAll = this.findController === null ? false : this.findController.state.highlightAll;
   var infinity = {
    divIdx: -1,
    offset: undefined
   };
   function beginText(begin, className) {
    var divIdx = begin.divIdx;
    textDivs[divIdx].textContent = '';
    appendTextToDiv(divIdx, 0, begin.offset, className);
   }
   function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
    var div = textDivs[divIdx];
    var content = bidiTexts[divIdx].str.substring(fromOffset, toOffset);
    var node = document.createTextNode(content);
    if (className) {
     var span = document.createElement('span');
     span.className = className;
     span.appendChild(node);
     div.appendChild(span);
     return;
    }
    div.appendChild(node);
   }
   var i0 = selectedMatchIdx, i1 = i0 + 1;
   if (highlightAll) {
    i0 = 0;
    i1 = matches.length;
   } else if (!isSelectedPage) {
    return;
   }
   for (var i = i0; i < i1; i++) {
    var match = matches[i];
    var begin = match.begin;
    var end = match.end;
    var isSelected = isSelectedPage && i === selectedMatchIdx;
    var highlightSuffix = isSelected ? ' selected' : '';
    if (this.findController) {
     this.findController.updateMatchPosition(pageIdx, i, textDivs, begin.divIdx);
    }
    if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
     if (prevEnd !== null) {
      appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
     }
     beginText(begin);
    } else {
     appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
    }
    if (begin.divIdx === end.divIdx) {
     appendTextToDiv(begin.divIdx, begin.offset, end.offset, 'highlight' + highlightSuffix);
    } else {
     appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, 'highlight begin' + highlightSuffix);
     for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
      textDivs[n0].className = 'highlight middle' + highlightSuffix;
     }
     beginText(end, 'highlight end' + highlightSuffix);
    }
    prevEnd = end;
   }
   if (prevEnd) {
    appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
   }
  },
  updateMatches: function TextLayerBuilder_updateMatches() {
   if (!this.renderingDone) {
    return;
   }
   var matches = this.matches;
   var textDivs = this.textDivs;
   var bidiTexts = this.textContent.items;
   var clearedUntilDivIdx = -1;
   for (var i = 0, len = matches.length; i < len; i++) {
    var match = matches[i];
    var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
    for (var n = begin, end = match.end.divIdx; n <= end; n++) {
     var div = textDivs[n];
     div.textContent = bidiTexts[n].str;
     div.className = '';
    }
    clearedUntilDivIdx = match.end.divIdx + 1;
   }
   if (this.findController === null || !this.findController.active) {
    return;
   }
   var pageMatches, pageMatchesLength;
   if (this.findController !== null) {
    pageMatches = this.findController.pageMatches[this.pageIdx] || null;
    pageMatchesLength = this.findController.pageMatchesLength ? this.findController.pageMatchesLength[this.pageIdx] || null : null;
   }
   this.matches = this.convertMatches(pageMatches, pageMatchesLength);
   this.renderMatches(this.matches);
  },
  _bindMouse: function TextLayerBuilder_bindMouse() {
   var div = this.textLayerDiv;
   var self = this;
   var expandDivsTimer = null;
   div.addEventListener('mousedown', function (e) {
    if (self.enhanceTextSelection && self.textLayerRenderTask) {
     self.textLayerRenderTask.expandTextDivs(true);
     if (expandDivsTimer) {
      clearTimeout(expandDivsTimer);
      expandDivsTimer = null;
     }
     return;
    }
    var end = div.querySelector('.endOfContent');
    if (!end) {
     return;
    }
    var adjustTop = e.target !== div;
    adjustTop = adjustTop && window.getComputedStyle(end).getPropertyValue('-moz-user-select') !== 'none';
    if (adjustTop) {
     var divBounds = div.getBoundingClientRect();
     var r = Math.max(0, (e.pageY - divBounds.top) / divBounds.height);
     end.style.top = (r * 100).toFixed(2) + '%';
    }
    end.classList.add('active');
   });
   div.addEventListener('mouseup', function (e) {
    if (self.enhanceTextSelection && self.textLayerRenderTask) {
     expandDivsTimer = setTimeout(function () {
      if (self.textLayerRenderTask) {
       self.textLayerRenderTask.expandTextDivs(false);
      }
      expandDivsTimer = null;
     }, EXPAND_DIVS_TIMEOUT);
     return;
    }
    var end = div.querySelector('.endOfContent');
    if (!end) {
     return;
    }
    end.style.top = '';
    end.classList.remove('active');
   });
  }
 };
 return TextLayerBuilder;
}();
function DefaultTextLayerFactory() {
}
DefaultTextLayerFactory.prototype = {
 createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport, enhanceTextSelection) {
  return new TextLayerBuilder({
   textLayerDiv: textLayerDiv,
   pageIndex: pageIndex,
   viewport: viewport,
   enhanceTextSelection: enhanceTextSelection
  });
 }
};
exports.TextLayerBuilder = TextLayerBuilder;
exports.DefaultTextLayerFactory = DefaultTextLayerFactory;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var uiUtils = __webpack_require__(0);
var mozL10n = uiUtils.mozL10n;
var noContextMenuHandler = uiUtils.noContextMenuHandler;
var animationStarted = uiUtils.animationStarted;
var localized = uiUtils.localized;
var DEFAULT_SCALE_VALUE = uiUtils.DEFAULT_SCALE_VALUE;
var DEFAULT_SCALE = uiUtils.DEFAULT_SCALE;
var MIN_SCALE = uiUtils.MIN_SCALE;
var MAX_SCALE = uiUtils.MAX_SCALE;
var PAGE_NUMBER_LOADING_INDICATOR = 'visiblePageIsLoading';
var SCALE_SELECT_CONTAINER_PADDING = 8;
var SCALE_SELECT_PADDING = 22;
var Toolbar = function ToolbarClosure() {
 function Toolbar(options, mainContainer, eventBus) {
  this.toolbar = options.container;
  this.mainContainer = mainContainer;
  this.eventBus = eventBus;
  this.items = options;
  this._wasLocalized = false;
  this.reset();
  this._bindListeners();
 }
 Toolbar.prototype = {
  setPageNumber: function (pageNumber, pageLabel) {
   this.pageNumber = pageNumber;
   this.pageLabel = pageLabel;
   this._updateUIState(false);
  },
  setPagesCount: function (pagesCount, hasPageLabels) {
   this.pagesCount = pagesCount;
   this.hasPageLabels = hasPageLabels;
   this._updateUIState(true);
  },
  setPageScale: function (pageScaleValue, pageScale) {
   this.pageScaleValue = pageScaleValue;
   this.pageScale = pageScale;
   this._updateUIState(false);
  },
  reset: function () {
   this.pageNumber = 0;
   this.pageLabel = null;
   this.hasPageLabels = false;
   this.pagesCount = 0;
   this.pageScaleValue = DEFAULT_SCALE_VALUE;
   this.pageScale = DEFAULT_SCALE;
   this._updateUIState(true);
  },
  _bindListeners: function Toolbar_bindClickListeners() {
   var eventBus = this.eventBus;
   var self = this;
   var items = this.items;
   items.previous.addEventListener('click', function () {
    eventBus.dispatch('previouspage');
   });
   items.next.addEventListener('click', function () {
    eventBus.dispatch('nextpage');
   });
   items.zoomIn.addEventListener('click', function () {
    eventBus.dispatch('zoomin');
   });
   items.zoomOut.addEventListener('click', function () {
    eventBus.dispatch('zoomout');
   });
   items.pageNumber.addEventListener('click', function () {
    this.select();
   });
   items.pageNumber.addEventListener('change', function () {
    eventBus.dispatch('pagenumberchanged', {
     source: self,
     value: this.value
    });
   });
   items.scaleSelect.addEventListener('change', function () {
    if (this.value === 'custom') {
     return;
    }
    eventBus.dispatch('scalechanged', {
     source: self,
     value: this.value
    });
   });
   items.presentationModeButton.addEventListener('click', function (e) {
    eventBus.dispatch('presentationmode');
   });
   items.openFile.addEventListener('click', function (e) {
    eventBus.dispatch('openfile');
   });
   items.print.addEventListener('click', function (e) {
    eventBus.dispatch('print');
   });
   items.download.addEventListener('click', function (e) {
    eventBus.dispatch('download');
   });
   items.scaleSelect.oncontextmenu = noContextMenuHandler;
   localized.then(this._localized.bind(this));
  },
  _localized: function Toolbar_localized() {
   this._wasLocalized = true;
   this._adjustScaleWidth();
   this._updateUIState(true);
  },
  _updateUIState: function Toolbar_updateUIState(resetNumPages) {
   function selectScaleOption(value, scale) {
    var options = items.scaleSelect.options;
    var predefinedValueFound = false;
    for (var i = 0, ii = options.length; i < ii; i++) {
     var option = options[i];
     if (option.value !== value) {
      option.selected = false;
      continue;
     }
     option.selected = true;
     predefinedValueFound = true;
    }
    if (!predefinedValueFound) {
     var customScale = Math.round(scale * 10000) / 100;
     items.customScaleOption.textContent = mozL10n.get('page_scale_percent', { scale: customScale }, '{{scale}}%');
     items.customScaleOption.selected = true;
    }
   }
   if (!this._wasLocalized) {
    return;
   }
   var pageNumber = this.pageNumber;
   var scaleValue = (this.pageScaleValue || this.pageScale).toString();
   var scale = this.pageScale;
   var items = this.items;
   var pagesCount = this.pagesCount;
   if (resetNumPages) {
    if (this.hasPageLabels) {
     items.pageNumber.type = 'text';
    } else {
     items.pageNumber.type = 'number';
     items.numPages.textContent = mozL10n.get('of_pages', { pagesCount: pagesCount }, 'of {{pagesCount}}');
    }
    items.pageNumber.max = pagesCount;
   }
   if (this.hasPageLabels) {
    items.pageNumber.value = this.pageLabel;
    items.numPages.textContent = mozL10n.get('page_of_pages', {
     pageNumber: pageNumber,
     pagesCount: pagesCount
    }, '({{pageNumber}} of {{pagesCount}})');
   } else {
    items.pageNumber.value = pageNumber;
   }
   items.previous.disabled = pageNumber <= 1;
   items.next.disabled = pageNumber >= pagesCount;
   items.zoomOut.disabled = scale <= MIN_SCALE;
   items.zoomIn.disabled = scale >= MAX_SCALE;
   selectScaleOption(scaleValue, scale);
  },
  updateLoadingIndicatorState: function Toolbar_updateLoadingIndicatorState(loading) {
   var pageNumberInput = this.items.pageNumber;
   if (loading) {
    pageNumberInput.classList.add(PAGE_NUMBER_LOADING_INDICATOR);
   } else {
    pageNumberInput.classList.remove(PAGE_NUMBER_LOADING_INDICATOR);
   }
  },
  _adjustScaleWidth: function Toolbar_adjustScaleWidth() {
   var container = this.items.scaleSelectContainer;
   var select = this.items.scaleSelect;
   animationStarted.then(function () {
    if (container.clientWidth === 0) {
     container.setAttribute('style', 'display: inherit;');
    }
    if (container.clientWidth > 0) {
     select.setAttribute('style', 'min-width: inherit;');
     var width = select.clientWidth + SCALE_SELECT_CONTAINER_PADDING;
     select.setAttribute('style', 'min-width: ' + (width + SCALE_SELECT_PADDING) + 'px;');
     container.setAttribute('style', 'min-width: ' + width + 'px; ' + 'max-width: ' + width + 'px;');
    }
   });
  }
 };
 return Toolbar;
}();
exports.Toolbar = Toolbar;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;
var ViewHistory = function ViewHistoryClosure() {
 function ViewHistory(fingerprint, cacheSize) {
  this.fingerprint = fingerprint;
  this.cacheSize = cacheSize || DEFAULT_VIEW_HISTORY_CACHE_SIZE;
  this.isInitializedPromiseResolved = false;
  this.initializedPromise = this._readFromStorage().then(function (databaseStr) {
   this.isInitializedPromiseResolved = true;
   var database = JSON.parse(databaseStr || '{}');
   if (!('files' in database)) {
    database.files = [];
   }
   if (database.files.length >= this.cacheSize) {
    database.files.shift();
   }
   var index;
   for (var i = 0, length = database.files.length; i < length; i++) {
    var branch = database.files[i];
    if (branch.fingerprint === this.fingerprint) {
     index = i;
     break;
    }
   }
   if (typeof index !== 'number') {
    index = database.files.push({ fingerprint: this.fingerprint }) - 1;
   }
   this.file = database.files[index];
   this.database = database;
  }.bind(this));
 }
 ViewHistory.prototype = {
  _writeToStorage: function ViewHistory_writeToStorage() {
   return new Promise(function (resolve) {
    var databaseStr = JSON.stringify(this.database);
    localStorage.setItem('pdfjs.history', databaseStr);
    resolve();
   }.bind(this));
  },
  _readFromStorage: function ViewHistory_readFromStorage() {
   return new Promise(function (resolve) {
    var value = localStorage.getItem('pdfjs.history');
    if (!value) {
     var databaseStr = localStorage.getItem('database');
     if (databaseStr) {
      try {
       var database = JSON.parse(databaseStr);
       if (typeof database.files[0].fingerprint === 'string') {
        localStorage.setItem('pdfjs.history', databaseStr);
        localStorage.removeItem('database');
        value = databaseStr;
       }
      } catch (ex) {
      }
     }
    }
    resolve(value);
   });
  },
  set: function ViewHistory_set(name, val) {
   if (!this.isInitializedPromiseResolved) {
    return;
   }
   this.file[name] = val;
   return this._writeToStorage();
  },
  setMultiple: function ViewHistory_setMultiple(properties) {
   if (!this.isInitializedPromiseResolved) {
    return;
   }
   for (var name in properties) {
    this.file[name] = properties[name];
   }
   return this._writeToStorage();
  },
  get: function ViewHistory_get(name, defaultValue) {
   if (!this.isInitializedPromiseResolved) {
    return defaultValue;
   }
   return this.file[name] || defaultValue;
  }
 };
 return ViewHistory;
}();
exports.ViewHistory = ViewHistory;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DEFAULT_URL = 'compressed.tracemonkey-pldi-09.pdf';
;
var pdfjsWebApp;
{
 pdfjsWebApp = __webpack_require__(6);
}
;
;
{
 __webpack_require__(9);
}
function getViewerConfiguration() {
 return {
  appContainer: document.body,
  mainContainer: document.getElementById('viewerContainer'),
  viewerContainer: document.getElementById('viewer'),
  eventBus: null,
  toolbar: {
   container: document.getElementById('toolbarViewer'),
   numPages: document.getElementById('numPages'),
   pageNumber: document.getElementById('pageNumber'),
   scaleSelectContainer: document.getElementById('scaleSelectContainer'),
   scaleSelect: document.getElementById('scaleSelect'),
   customScaleOption: document.getElementById('customScaleOption'),
   previous: document.getElementById('previous'),
   next: document.getElementById('next'),
   zoomIn: document.getElementById('zoomIn'),
   zoomOut: document.getElementById('zoomOut'),
   viewFind: document.getElementById('viewFind'),
   openFile: document.getElementById('openFile'),
   print: document.getElementById('print'),
   presentationModeButton: document.getElementById('presentationMode'),
   download: document.getElementById('download'),
   viewBookmark: document.getElementById('viewBookmark')
  },
  secondaryToolbar: {
   toolbar: document.getElementById('secondaryToolbar'),
   toggleButton: document.getElementById('secondaryToolbarToggle'),
   toolbarButtonContainer: document.getElementById('secondaryToolbarButtonContainer'),
   presentationModeButton: document.getElementById('secondaryPresentationMode'),
   openFileButton: document.getElementById('secondaryOpenFile'),
   printButton: document.getElementById('secondaryPrint'),
   downloadButton: document.getElementById('secondaryDownload'),
   viewBookmarkButton: document.getElementById('secondaryViewBookmark'),
   firstPageButton: document.getElementById('firstPage'),
   lastPageButton: document.getElementById('lastPage'),
   pageRotateCwButton: document.getElementById('pageRotateCw'),
   pageRotateCcwButton: document.getElementById('pageRotateCcw'),
   toggleHandToolButton: document.getElementById('toggleHandTool'),
   documentPropertiesButton: document.getElementById('documentProperties')
  },
  fullscreen: {
   contextFirstPage: document.getElementById('contextFirstPage'),
   contextLastPage: document.getElementById('contextLastPage'),
   contextPageRotateCw: document.getElementById('contextPageRotateCw'),
   contextPageRotateCcw: document.getElementById('contextPageRotateCcw')
  },
  sidebar: {
   mainContainer: document.getElementById('mainContainer'),
   outerContainer: document.getElementById('outerContainer'),
   toggleButton: document.getElementById('sidebarToggle'),
   thumbnailButton: document.getElementById('viewThumbnail'),
   outlineButton: document.getElementById('viewOutline'),
   attachmentsButton: document.getElementById('viewAttachments'),
   thumbnailView: document.getElementById('thumbnailView'),
   outlineView: document.getElementById('outlineView'),
   attachmentsView: document.getElementById('attachmentsView')
  },
  findBar: {
   bar: document.getElementById('findbar'),
   toggleButton: document.getElementById('viewFind'),
   findField: document.getElementById('findInput'),
   highlightAllCheckbox: document.getElementById('findHighlightAll'),
   caseSensitiveCheckbox: document.getElementById('findMatchCase'),
   findMsg: document.getElementById('findMsg'),
   findResultsCount: document.getElementById('findResultsCount'),
   findStatusIcon: document.getElementById('findStatusIcon'),
   findPreviousButton: document.getElementById('findPrevious'),
   findNextButton: document.getElementById('findNext')
  },
  passwordOverlay: {
   overlayName: 'passwordOverlay',
   container: document.getElementById('passwordOverlay'),
   label: document.getElementById('passwordText'),
   input: document.getElementById('password'),
   submitButton: document.getElementById('passwordSubmit'),
   cancelButton: document.getElementById('passwordCancel')
  },
  documentProperties: {
   overlayName: 'documentPropertiesOverlay',
   container: document.getElementById('documentPropertiesOverlay'),
   closeButton: document.getElementById('documentPropertiesClose'),
   fields: {
    'fileName': document.getElementById('fileNameField'),
    'fileSize': document.getElementById('fileSizeField'),
    'title': document.getElementById('titleField'),
    'author': document.getElementById('authorField'),
    'subject': document.getElementById('subjectField'),
    'keywords': document.getElementById('keywordsField'),
    'creationDate': document.getElementById('creationDateField'),
    'modificationDate': document.getElementById('modificationDateField'),
    'creator': document.getElementById('creatorField'),
    'producer': document.getElementById('producerField'),
    'version': document.getElementById('versionField'),
    'pageCount': document.getElementById('pageCountField')
   }
  },
  errorWrapper: {
   container: document.getElementById('errorWrapper'),
   errorMessage: document.getElementById('errorMessage'),
   closeButton: document.getElementById('errorClose'),
   errorMoreInfo: document.getElementById('errorMoreInfo'),
   moreInfoButton: document.getElementById('errorShowMore'),
   lessInfoButton: document.getElementById('errorShowLess')
  },
  printContainer: document.getElementById('printContainer'),
  openFileInputName: 'fileInput',
  debuggerScriptPath: './debugger.js',
  defaultUrl: DEFAULT_URL
 };
}
function webViewerLoad() {
 var config = getViewerConfiguration();
 window.PDFViewerApplication = pdfjsWebApp.PDFViewerApplication;
 pdfjsWebApp.PDFViewerApplication.run(config);
}
if (document.readyState === 'interactive' || document.readyState === 'complete') {
 webViewerLoad();
} else {
 PDFJS.webViewerLoad = function (src) {
  DEFAULT_URL = src;
  webViewerLoad();
 };
}

/***/ })
/******/ ]);