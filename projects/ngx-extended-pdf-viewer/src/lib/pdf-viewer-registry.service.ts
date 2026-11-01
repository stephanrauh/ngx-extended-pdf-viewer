import { Injectable, computed, signal, untracked } from '@angular/core';

/**
 * Multiple viewers on one page: the live viewers, in the order they were created.
 *
 * Each <ngx-extended-pdf-viewer> has its own PDFNotificationService and
 * NgxExtendedPdfViewerService. The instances an application injects (root or module
 * level) follow the primary viewer - the oldest live one - so applications with a
 * single viewer work exactly as before.
 *
 * Internal - not part of the public API.
 */
@Injectable({
  providedIn: 'root',
})
export class PdfViewerRegistry {
  private readonly viewers = signal<readonly object[]>([]);

  /** the oldest live viewer, or undefined if there's none */
  public readonly primary = computed(() => this.viewers()[0]);

  /** the number of live viewers */
  public readonly count = computed(() => this.viewers().length);

  private readonly lastUsed = signal<object | undefined>(undefined);

  /** the browser's window.print(), saved before the first viewer replaces it with `print` */
  public readonly nativePrint: (() => void) | undefined = typeof window !== 'undefined' ? window.print : undefined;

  /**
   * The viewer the user works with: the one clicked or focused last, else the primary viewer.
   * Keyboard shortcuts typed outside every viewer go to this one.
   */
  public readonly active = computed(() => this.lastUsed() ?? this.primary());

  /**
   * window.print() while ngx-extended-pdf-viewer prints with pdf.js (`replaceBrowserPrint`): prints the
   * active viewer. One function for all viewers, so it doesn't matter which viewer installed it last.
   */
  public readonly print = (): void => {
    (this.active() as { printPdfInThisViewer?: () => void } | undefined)?.printPdfInThisViewer?.();
  };

  /** whether a live viewer prints with pdf.js (`replaceBrowserPrint`), so window.print() must stay `print` */
  public someViewerPrintsWithPdfJs(): boolean {
    return untracked(() => this.viewers().some((viewer) => (viewer as { replaceBrowserPrint?: () => boolean }).replaceBrowserPrint?.()));
  }

  public activate(viewer: object): void {
    this.lastUsed.set(viewer);
  }

  public register(viewer: object): void {
    this.viewers.update((viewers) => [...viewers, viewer]);
  }

  public unregister(viewer: object): void {
    this.viewers.update((viewers) => viewers.filter((v) => v !== viewer));
    if (this.lastUsed() === viewer) {
      this.lastUsed.set(undefined);
    }
  }
}
