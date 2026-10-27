import { Injectable, computed, signal } from '@angular/core';

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

  public register(viewer: object): void {
    this.viewers.update((viewers) => [...viewers, viewer]);
  }

  public unregister(viewer: object): void {
    this.viewers.update((viewers) => viewers.filter((v) => v !== viewer));
  }
}
