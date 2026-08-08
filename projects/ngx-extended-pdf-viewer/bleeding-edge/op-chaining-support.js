// #2687 #2536 Which pdf.js bundle can this browser run?
//
// Sets window.ngxExtendedPdfViewerCanRunModernJSCode; false routes the viewer to
// the `*-es5.mjs` (legacy) bundle. The deciding check is Promise.withResolvers,
// so the modern bundle starts at Chrome 119 / Edge 119 / Firefox 121 / Safari 17.4,
// and everything below that must be covered by LEGACY_ENV_TARGETS in the fork's
// gulpfile.mjs (currently Chrome/Edge 80, Firefox 78, Safari 13.1, iOS 13.4).
// Change one side and you must change the other, or old browsers receive code
// they cannot parse.
//
// THIS FILE EXISTS THREE TIMES and the copies must stay identical:
//   assets/op-chaining-support.js, bleeding-edge/op-chaining-support.js, and the
//   inline copy in lib/pdf-script-loader.service.ts (used when useInlineScripts).
// pdf-script-loader.service.spec.ts fails if they drift.
new (function () {
  class BrowserCompatibilityTester {
    // Does your browser doesn't support private fields?
    #privateField;

    constructor() {
      // Does your browser support the logical assignment operators?
      let x = false;
      x ||= true;

      this.#privateMethod();
    }

    // Does your browser doesn't support private methods?
    #privateMethod() {
      // check the the browser supports string.at()
      return 'hello'.at(4);
    }

    supportsOptionalChaining() {
      const optionalChaining = {
        support: true,
      };
      return optionalChaining?.support;
    }
  }

  function supportsPromiseWithResolvers() {
    const iframe = document.createElement('iframe');
    document.firstElementChild.append(iframe);
    const useLegacyPdfViewer = 'withResolvers' in iframe.contentWindow['Promise'];
    iframe.parentElement.removeChild(iframe);

    return useLegacyPdfViewer;
  }

  // #2687 The discriminator: the newest thing the modern bundle needs.
  //
  // pdf.js 6.x calls iterator helpers on Map/Set (`.values().some()`,
  // `.keys().filter().toArray()`, ...) and the modern bundle ships NO core-js
  // polyfills (SKIP_BABEL, and Babel transpiles syntax but never APIs). Iterator
  // helpers arrived later than Promise.withResolvers in every engine
  // (Chrome/Edge 122+, Firefox 131+, Safari/iOS 18.4+ versus 119/121/17.4), so
  // this single check subsumes the Promise one and is what actually decides
  // whether the modern bundle will run. Without it, e.g. Safari 17.4-18.3 loads
  // the modern viewer and dies on the first Map iterator.
  function supportsIteratorHelpers() {
    try {
      const iterator = [].values();
      return typeof iterator.map === 'function' && typeof iterator.toArray === 'function';
    } catch (e) {
      return false;
    }
  }

  const supportsOptionalChaining = new BrowserCompatibilityTester().supportsOptionalChaining();
  const supportModernPromises = supportsPromiseWithResolvers();
  window.ngxExtendedPdfViewerCanRunModernJSCode =
    supportsOptionalChaining && supportModernPromises && supportsIteratorHelpers();

  // #1321 AbortSignal.any() polyfill for the modern build's main thread.
  // pdf.js v6 calls AbortSignal.any() directly; Safari 17.4 shipped
  // Promise.withResolvers (our "modern" gate) before AbortSignal.any was
  // added in 17.5. Shimming it here keeps that thin window on the modern
  // build instead of forcing a fallback to viewer-es5.mjs. The legacy
  // build gets the same polyfill via core-js + Babel.
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.any !== 'function') {
    AbortSignal.any = function (signals) {
      const controller = new AbortController();
      for (const signal of signals) {
        if (signal.aborted) {
          controller.abort(signal.reason);
          return controller.signal;
        }
        signal.addEventListener(
          'abort',
          () => controller.abort(signal.reason),
          { once: true }
        );
      }
      return controller.signal;
    };
  }
})();
