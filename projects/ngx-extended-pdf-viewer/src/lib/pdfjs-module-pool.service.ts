import { Injectable, OnDestroy } from '@angular/core';
import { IPDFViewerApplication } from './options/pdf-viewer-application';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
import { PdfCspPolicyService } from './pdf-csp-policy.service';

/** What a loaded copy of the viewer module (`viewer-*.mjs`) hands over in its `ngxViewerFileHasBeenLoaded` event. */
export interface PdfJsModuleCopy {
  PDFViewerApplication: IPDFViewerApplication;
  PDFViewerApplicationOptions: IPDFViewerApplicationOptions;
  webViewerLoad: (cspPolicyService: PdfCspPolicyService) => void;
}

interface PooledCopy {
  /** the module URL without the query: copies of the modern and the legacy bundle don't mix */
  path: string;
  copy: PdfJsModuleCopy;
  inUse: boolean;
}

/**
 * Multiple viewers on one page: every live viewer needs its own copy of the viewer module.
 *
 * pdf.js keeps its state at module level (PDFViewerApplication, AppOptions, the print
 * service, ...). The browser evaluates a module once per URL, so a different query string
 * gives an independent copy: the first copy loads `viewer-*.mjs` as before, further copies
 * load `viewer-*.mjs?instance=N`.
 *
 * A viewer returns its copy after its cleanup has finished. The next viewer reuses it, the
 * same way a single viewer always reused the one module after a route change. A viewer
 * mounted while another one is still cleaning up gets a copy of its own instead.
 *
 * Loads run one at a time: the module announces itself with a document-wide event that
 * doesn't say which copy sent it.
 *
 * Internal - not part of the public API.
 */
@Injectable({
  providedIn: 'root',
})
export class PdfJsModulePool implements OnDestroy {
  private readonly copies: PooledCopy[] = [];

  /** serializes the loads */
  private queue: Promise<unknown> = Promise.resolve();

  /**
   * Hands out a free copy of the module at `path`, or loads a new one.
   * @param load loads the module from the given URL and resolves with what it announced
   */
  public acquire(path: string, forceReload: boolean, load: (url: string) => Promise<PdfJsModuleCopy>): Promise<PdfJsModuleCopy> {
    const result = this.queue.then(async () => {
      const free = this.copies.find((c) => c.path === path && !c.inUse);
      if (free) {
        free.inUse = true;
        return free.copy;
      }
      const instance = this.copies.filter((c) => c.path === path).length;
      const query = [instance > 0 ? `instance=${instance}` : '', forceReload ? `v=${Date.now()}` : ''].filter(Boolean).join('&');
      const copy = await load(query ? `${path}?${query}` : path);
      this.copies.push({ path, copy, inUse: true });
      return copy;
    });
    // a failed load mustn't block the viewers after it
    this.queue = result.catch(() => undefined);
    return result;
  }

  /** Called when a viewer has finished its cleanup. */
  public release(copy: PdfJsModuleCopy | undefined): void {
    const pooled = this.copies.find((c) => c.copy === copy);
    if (pooled) {
      pooled.inUse = false;
    }
  }

  /** Runs when the application shuts down (this used to be the root PDFScriptLoaderService's ngOnDestroy). */
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
}
