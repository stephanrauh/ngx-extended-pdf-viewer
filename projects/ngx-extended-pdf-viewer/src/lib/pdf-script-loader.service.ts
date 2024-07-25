import { Injectable, OnDestroy, effect, signal } from '@angular/core';
import { getVersionSuffix, pdfDefaultOptions } from './options/pdf-default-options';
import { IPDFViewerApplication } from './options/pdf-viewer-application';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
import { PdfCspPolicyService } from './pdf-csp-policy.service';

@Injectable({
  providedIn: 'root',
})
export class PDFScriptLoaderService implements OnDestroy {
  public forceUsingLegacyES5 = false;

  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInitSignal = signal<IPDFViewerApplication | undefined>(undefined);

  public pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);

  public shuttingDown = false;

  private _needsES5: boolean | undefined = undefined;

  public PDFViewerApplication!: IPDFViewerApplication;
  public PDFViewerApplicationOptions!: IPDFViewerApplicationOptions;
  private PDFViewerApplicationConstants: any;
  public webViewerLoad: () => void;

  private originalPrint = typeof window !== 'undefined' ? window.print : undefined;

  public ngxExtendedPdfViewerIncompletelyInitialized = true;

  public constructor(private pdfCspPolicyService: PdfCspPolicyService) {
    effect(() => {
      if (this.onPDFJSInitSignal()) {
        this.pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
      }
    });
  }

  private addScriptOpChainingSupport(): Promise<boolean> {
    if (this.isCSPApplied()) {
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

  const supportsOptionalChaining = new BrowserCompatibilityTester().supportsOptionalChaining();
  const supportModernPromises = supportsPromiseWithResolvers();
  window.ngxExtendedPdfViewerCanRunModernJSCode = supportsOptionalChaining && supportModernPromises;
})();
`;
      const script = this.createInlineScript(code);
      document.getElementsByTagName('head')[0].appendChild(script);
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if ((globalThis as any).ngxExtendedPdfViewerCanRunModernJSCode !== undefined) {
            clearInterval(interval);
            resolve((globalThis as any).ngxExtendedPdfViewerCanRunModernJSCode);
          }
        }, 1);
      });
    }
  }

  private createInlineScript(code: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.async = true;
    script.type = 'module';
    script.className = `ngx-extended-pdf-viewer-script`;
    script.text = code;
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
    try {
      eval('1');
      return false;
    } catch (e) {
      if (e instanceof EvalError) {
        console.log('CSP is applied');
        return true;
      } else {
        console.log('An unexpected error occurred', e);
        return false;
      }
    }
  }

  private createScriptElement(sourcePath: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.async = true;
    script.type = sourcePath.endsWith('.mjs') ? 'module' : 'text/javascript';
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

  private async loadViewer(): Promise<void> {
    return new Promise((resolve) => {
      const viewerPath = this.getPdfJsPath('viewer');
      const listener = (event: CustomEvent) => {
        const { PDFViewerApplication, PDFViewerApplicationOptions, PDFViewerApplicationConstants, webViewerLoad } = event.detail;
        this.PDFViewerApplication = PDFViewerApplication;
        this.PDFViewerApplicationOptions = PDFViewerApplicationOptions;
        this.PDFViewerApplicationConstants = PDFViewerApplicationConstants;
        this.webViewerLoad = webViewerLoad;
        resolve();
        document.removeEventListener('ngxViewerFileHasBeenLoaded', listener);
      };
      document.addEventListener('ngxViewerFileHasBeenLoaded', listener, { once: true });
      const script = this.createScriptElement(viewerPath);
      document.getElementsByTagName('head')[0].appendChild(script);
    });
  }

  private addFeatures(): Promise<void> {
    return new Promise((resolve) => {
      const script = this.createScriptElement(pdfDefaultOptions.assetsFolder + '/additional-features.js');
      script.onload = () => {
        script.remove();
      };
      script.onerror = () => {
        script.remove();
        resolve();
      };

      document.body.appendChild(script);
    });
  }

  public async ensurePdfJsHasBeenLoaded(): Promise<boolean> {
    if (this.PDFViewerApplication) {
      return true;
    }
    this._needsES5 = await this.needsES5();
    await this.loadViewer();
    return this.PDFViewerApplication !== undefined;
  }

  public ngOnDestroy() {
    this.shuttingDown = true;
    if (typeof window === 'undefined') {
      return; // fast escape for server side rendering
    }
    delete globalThis['setNgxExtendedPdfViewerSource'];

    const PDFViewerApplication: IPDFViewerApplication = this.PDFViewerApplication;
    PDFViewerApplication?.pdfViewer?.destroyBookMode();
    PDFViewerApplication?.pdfViewer?.stopRendering();
    PDFViewerApplication?.pdfThumbnailViewer?.stopRendering();

    const originalPrint = this.originalPrint;
    if (window && originalPrint && !originalPrint.toString().includes('printPdf')) {
      window.print = originalPrint;
    }
    const printContainer = document.querySelector('#printContainer');
    if (printContainer) {
      printContainer.parentElement?.removeChild(printContainer);
    }

    PDFViewerApplication?.unbindWindowEvents();

    PDFViewerApplication?._cleanup();

    const w = window as any;
    delete w.pdfjsLib;
    this.onPDFJSInitSignal.set(undefined);
    document.querySelectorAll('.ngx-extended-pdf-viewer-script').forEach((e: HTMLScriptElement) => {
      e.onload = null;
      e.remove();
    });
    document.querySelectorAll('.ngx-extended-pdf-viewer-file-input').forEach((e: HTMLInputElement) => {
      e.remove();
    });
  }

  public replaceBrowserPrint(useCustomPrintOfPdfJS: boolean): void {
    if (useCustomPrintOfPdfJS) {
      if (this.PDFViewerApplication?.printPdf) {
        window.print = this.PDFViewerApplication.printPdf.bind(this.PDFViewerApplication);
      }
    } else if (this.originalPrint && !this.originalPrint.toString().includes('printPdf')) {
      window.print = this.originalPrint;
    }
  }

  private iOSVersionRequiresES5(): boolean {
    if (typeof window === 'undefined') {
      // server-side rendering
      return false;
    }
    const match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match !== undefined && match !== null) {
      return parseInt(match[1], 10) < 14;
    }

    return false;
  }

  private async needsES5(): Promise<boolean> {
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
      this._needsES5 = !(await this.ngxExtendedPdfViewerCanRunModernJSCode());
    }
    return this._needsES5;
  }

  private ngxExtendedPdfViewerCanRunModernJSCode(): Promise<boolean> {
    return new Promise((resolve) => {
      const support = (<any>globalThis).ngxExtendedPdfViewerCanRunModernJSCode;
      support !== undefined ? resolve(support) : resolve(this.addScriptOpChainingSupport());
    });
  }
}
