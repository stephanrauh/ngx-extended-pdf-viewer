import { CSP_NONCE, Inject, Injectable, OnDestroy, effect, signal } from '@angular/core';
import { getVersionSuffix, pdfDefaultOptions } from './options/pdf-default-options';
import { IPDFViewerApplication } from './options/pdf-viewer-application';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
import { PdfCspPolicyService } from './pdf-csp-policy.service';

@Injectable({
  providedIn: 'root',
})
export class PDFScriptLoaderService implements OnDestroy {
  private _forceUsingLegacyES5 = false;
  public get forceUsingLegacyES5() {
    return this._forceUsingLegacyES5;
  }
  public set forceUsingLegacyES5(value) {
    console.log('Please use the attribute `[forceUsingLegacyES5]` instead of setting the property in the service.');
    this._forceUsingLegacyES5 = value;
  }

  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInitSignal = signal<IPDFViewerApplication | undefined>(undefined);

  public pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);

  private _needsES5: boolean | undefined = undefined;

  public PDFViewerApplication!: IPDFViewerApplication;
  public PDFViewerApplicationOptions!: IPDFViewerApplicationOptions;
  // private PDFViewerApplicationConstants: any;
  public webViewerLoad!: (cspPolicyService: PdfCspPolicyService) => void;

  public ngxExtendedPdfViewerIncompletelyInitialized = true;

  public constructor(
    private readonly pdfCspPolicyService: PdfCspPolicyService,
    @Inject(CSP_NONCE) private readonly csp_nonce: string,
  ) {
    effect(() => {
      if (this.onPDFJSInitSignal()) {
        this.pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
      }
    });
  }

  private addScriptOpChainingSupport(useInlineScripts: boolean): Promise<boolean> {
    if (!useInlineScripts || this.isCSPApplied()) {
      return new Promise((resolve) => {
        const script = this.createScriptElement(pdfDefaultOptions.assetsFolder + '/op-chaining-support.js');
        script.onload = () => {
          script.remove();
          script.onload = null;
          resolve((<any>globalThis).ngxExtendedPdfViewerCanRunModernJSCode as boolean);
        };
        script.onerror = () => {
          script.remove();
          (<any>globalThis).ngxExtendedPdfViewerCanRunModernJSCode = false;
          resolve(false);
          script.onerror = null;
        };

        document.body.appendChild(script);
      });
    } else {
      const code = `
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
  // Iterator helpers arrive later than Promise.withResolvers in every engine
  // (Chrome/Edge 122+, Firefox 131+, Safari/iOS 18.4+), and the modern bundle
  // ships no core-js polyfills, so this check decides whether it can run at all.
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
`;
      const script = this.createInlineScript(code);
      document.getElementsByTagName('head')[0].appendChild(script);
      return new Promise((resolve) => {
        // #2687 modified by ngx-extended-pdf-viewer
        // The probe uses modern syntax on purpose, so an old browser fails to parse
        // it and never sets the global. Without a deadline this promise stays pending
        // and the viewer never starts - on exactly the browsers the legacy bundle
        // exists for. Anything that hasn't answered in time counts as "not modern".
        const deadline = Date.now() + 500;
        const interval = setInterval(() => {
          const canRunModernJSCode = (globalThis as any).ngxExtendedPdfViewerCanRunModernJSCode;
          if (canRunModernJSCode !== undefined) {
            clearInterval(interval);
            resolve(canRunModernJSCode);
          } else if (Date.now() > deadline) {
            clearInterval(interval);
            resolve(false);
          }
        }, 1);
        // #2687 end of modification by ngx-extended-pdf-viewer
      });
    }
  }

  private createInlineScript(code: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.async = true;
    script.type = 'module';
    script.className = `ngx-extended-pdf-viewer-script`;
    script.text = code;
    if (this.csp_nonce) {
      // assigning null to script.nonce results in a string "null", so let's add a null check
      script.nonce = this.csp_nonce;
    }
    return script;
  }

  private isCSPAppliedViaMetaTag(): boolean {
    const metaTags = document.getElementsByTagName('meta');
    for (let i = 0; i < metaTags.length; i++) {
      if (metaTags[i].getAttribute('http-equiv') === 'Content-Security-Policy') {
        return true;
      }
    }
    return false;
  }

  private isCSPApplied() {
    if (this.isCSPAppliedViaMetaTag()) {
      return true;
    }
    return false;
  }

  private createScriptElement(sourcePath: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.async = true;
    script.type = sourcePath.includes('.mjs') ? 'module' : 'text/javascript';
    script.className = `ngx-extended-pdf-viewer-script`;
    this.pdfCspPolicyService.addTrustedJavaScript(script, sourcePath);
    return script;
  }

  private getPdfJsPath(artifact: 'pdf' | 'viewer') {
    let suffix = pdfDefaultOptions._internalFilenameSuffix;
    if (this._needsES5) {
      suffix = ''; // we don't publish minified ES5 files
    }
    suffix += '.mjs';
    const assets = pdfDefaultOptions.assetsFolder;
    const versionSuffix = getVersionSuffix(assets);
    const artifactPath = `/${artifact}-`;
    const es5 = this._needsES5 ? '-es5' : '';

    return assets + artifactPath + versionSuffix + es5 + suffix;
  }

  private async loadViewer(forceReload: boolean): Promise<void> {
    return new Promise((resolve) => {
      let viewerPath = this.getPdfJsPath('viewer');
      if (forceReload) {
        viewerPath += '?v=' + new Date().getTime();
      }
      const listener = (event: Event) => {
        const { PDFViewerApplication, PDFViewerApplicationOptions, webViewerLoad } = (event as CustomEvent).detail;
        this.PDFViewerApplication = PDFViewerApplication;
        this.PDFViewerApplicationOptions = PDFViewerApplicationOptions;
        this.webViewerLoad = webViewerLoad;
        resolve();
        document.removeEventListener('ngxViewerFileHasBeenLoaded', listener);
      };
      document.addEventListener('ngxViewerFileHasBeenLoaded', listener, { once: true });
      const script = this.createScriptElement(viewerPath);
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }


  public async ensurePdfJsHasBeenLoaded(useInlineScripts: boolean, forceUsingLegacyES5: boolean, forceReload: boolean): Promise<boolean> {
    if (this.PDFViewerApplication) {
      return true;
    }
    this._needsES5 = forceUsingLegacyES5 || (await this.needsES5(useInlineScripts));
    if (forceUsingLegacyES5) {
      pdfDefaultOptions.needsES5 = true;
    }
    await this.loadViewer(forceReload);
    return this.PDFViewerApplication !== undefined;
  }

  public ngOnDestroy() {
    if (typeof window === 'undefined') {
      return; // fast escape for server side rendering
    }
    delete (globalThis as any)['setNgxExtendedPdfViewerSource'];

    const w = window as any;
    delete w.pdfjsLib;
    document.querySelectorAll('.ngx-extended-pdf-viewer-script').forEach((e) => {
      (e as HTMLScriptElement).onload = null;
      e.remove();
    });
  }

  private iOSVersionRequiresES5(): boolean {
    if (typeof window === 'undefined') {
      // server-side rendering
      return false;
    }
    const match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match !== undefined && match !== null) {
      return Number.parseInt(match[1], 10) < 14;
    }

    return false;
  }

  private async needsES5(useInlineScripts: boolean): Promise<boolean> {
    if (typeof window === 'undefined') {
      // server-side rendering
      return false;
    }
    if (this._needsES5 === undefined) {
      const isIE = !!(<any>globalThis).MSInputMethodContext && !!(<any>document).documentMode;
      const isEdge = /Edge\/\d./i.test(navigator.userAgent);
      const isIOs13OrBelow = this.iOSVersionRequiresES5();
      let needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';
      if (needsES5 || isIE || isEdge || isIOs13OrBelow || this.forceUsingLegacyES5) {
        this._needsES5 = true;
        return true;
      }
      this._needsES5 = !(await this.ngxExtendedPdfViewerCanRunModernJSCode(useInlineScripts));
      this.polyfillPromiseWithResolversIfZoneJSOverwritesIt();
    }
    return this._needsES5;
  }

  /**
   * Angular 16 uses zone.js 0.13.3, and this version has a problem with Promise.withResolvers.
   * If your browser supports Promise.withResolvers, zone.js accidentally overwrites it with "undefined".
   * This method adds a polyfill for Promise.withResolvers if it is not available.
   */
  private polyfillPromiseWithResolversIfZoneJSOverwritesIt() {
    const TypelessPromise = Promise as any;
    if (!TypelessPromise.withResolvers) {
      TypelessPromise.withResolvers = function withResolvers() {
        let a: unknown;
        let b: unknown;
        const c = new this(function (resolve: unknown, reject: unknown) {
          a = resolve;
          b = reject;
        });
        return { resolve: a, reject: b, promise: c };
      };
    }
  }

  private ngxExtendedPdfViewerCanRunModernJSCode(useInlineScripts: boolean): Promise<boolean> {
    return new Promise((resolve) => {
      const support = (<any>globalThis).ngxExtendedPdfViewerCanRunModernJSCode;
      support !== undefined ? resolve(support) : resolve(this.addScriptOpChainingSupport(useInlineScripts));
    });
  }
}
