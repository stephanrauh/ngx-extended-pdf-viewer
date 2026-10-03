// #2687 #2536 #3273 Which pdf.js bundle can this browser run?
//
// Sets window.ngxExtendedPdfViewerCanRunModernJSCode; false routes the viewer to
// the `*-es5.mjs` (legacy) bundle. The modern bundle is for browsers that have
// every built-in listed in supportsModernBuiltIns(); everything else must be
// covered by LEGACY_ENV_TARGETS in the fork's gulpfile.mjs (currently Chrome/Edge
// 80, Firefox 78, Safari 13.1, iOS 13.4). Change one side and you must change the
// other, or old browsers receive code they cannot run.
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

  // #2687 #3273 The discriminator: the newest built-ins the modern bundle calls.
  //
  // The modern bundle ships NO core-js polyfills (SKIP_BABEL, and Babel transpiles
  // syntax but never APIs), and pdf.js calls these without feature detection, many
  // of them in the worker, where no polyfill of the page reaches. A browser missing
  // any of them gets the legacy bundle, which polyfills them all via core-js.
  //
  // Extend the list whenever pdf.js starts using a newer built-in. It went stale
  // once already: the check stopped at iterator helpers, so Chrome 126 loaded the
  // modern bundle and died on Promise.try and Uint8Array.prototype.toHex (#3273).
  //
  // The checks run in a fresh iframe because zone.js replaces the page's Promise
  // and drops its newer statics, even in browsers that support them natively.
  function supportsModernBuiltIns() {
    const iframe = document.createElement('iframe');
    document.firstElementChild.append(iframe);
    try {
      const w = iframe.contentWindow;
      return (
        typeof w.Promise.withResolvers === 'function' &&
        typeof w.Promise.try === 'function' &&
        typeof w.Iterator === 'function' &&
        typeof w.Iterator.prototype.toArray === 'function' &&
        typeof w.Set.prototype.difference === 'function' &&
        typeof w.Map.prototype.getOrInsertComputed === 'function' &&
        typeof w.Math.sumPrecise === 'function' &&
        typeof w.Uint8Array.prototype.toHex === 'function' &&
        typeof w.Uint8Array.fromBase64 === 'function' &&
        typeof w.RegExp.escape === 'function' &&
        typeof w.URL.parse === 'function' &&
        typeof w.Response.prototype.bytes === 'function'
      );
    } catch (e) {
      return false;
    } finally {
      iframe.remove();
    }
  }

  const supportsOptionalChaining = new BrowserCompatibilityTester().supportsOptionalChaining();
  window.ngxExtendedPdfViewerCanRunModernJSCode = supportsOptionalChaining && supportsModernBuiltIns();

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
