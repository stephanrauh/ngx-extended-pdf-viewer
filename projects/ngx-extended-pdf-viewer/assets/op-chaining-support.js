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

  const supportsOptionalChaining = new BrowserCompatibilityTester().supportsOptionalChaining();
  const supportModernPromises = supportsPromiseWithResolvers();
  window.ngxExtendedPdfViewerCanRunModernJSCode = supportsOptionalChaining && supportModernPromises;

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
