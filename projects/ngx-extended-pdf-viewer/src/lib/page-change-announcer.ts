import { IPDFViewerApplication } from './options/pdf-viewer-application';

/**
 * #3315 Tells screen readers which page the user has navigated to ("Page 5 of 53"), opt-in via
 * `pdfDefaultOptions.announcePageChanges`.
 *
 * Only explicit navigation is announced: a key typed in the viewer, a click on a link, an outline
 * entry or a thumbnail, the paging buttons (`nextpage`, `previouspage`, `firstpage`, `lastpage`) and
 * `[page]` set by the application (`expectNavigation()`). Scrolling, the initial load and the page
 * number field (the user typed the number) stay silent. Several page changes in a row (holding
 * PageDown) are announced once, when the page has settled.
 *
 * pdf.js's `pagechanging` doesn't say what caused it. So a navigation intent and the page change
 * that follows within `INTENT_WINDOW_MS` count as one navigation. The paging buttons are the
 * exception: pdf.js changes the page before their event-bus listeners run, so their event may
 * also arrive right after the page change (`BUTTON_EVENT_LAG_MS`). An announcement consumes both
 * the intent and the page change.
 *
 * Framework-free on purpose: no Angular dependency.
 */
export class PageChangeAnnouncer {
  /** How far apart a navigation intent and the page change it causes may be (book mode flips for 1 s). */
  public static readonly INTENT_WINDOW_MS = 1500;

  /** How long the page has to stay the same before it's announced. */
  public static readonly SETTLE_MS = 400;

  /** How long after the page change the event of a paging button may arrive (pdf.js dispatches it in the same task). */
  public static readonly BUTTON_EVENT_LAG_MS = 100;

  private static readonly NAVIGATION_EVENTS = ['nextpage', 'previouspage', 'firstpage', 'lastpage'];

  /** The keys pdf.js turns pages with (`onKeyDown` in `web/app.js`). */
  private static readonly NAVIGATION_KEYS = new Set([
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'PageUp',
    'PageDown',
    'Home',
    'End',
    ' ',
    'Backspace',
  ]);

  /** Letter shortcuts of pdf.js, without Ctrl, Meta or Alt. */
  private static readonly NAVIGATION_LETTERS = new Set(['j', 'k', 'n', 'p']);

  private intentAt = Number.NEGATIVE_INFINITY;

  private pageChangedAt = Number.NEGATIVE_INFINITY;

  private timer: ReturnType<typeof setTimeout> | undefined;

  private readonly abortController = new AbortController();

  constructor(
    private readonly host: HTMLElement,
    private readonly app: IPDFViewerApplication,
    private readonly announce: (message: string) => void,
    private readonly isEnabled: () => boolean,
  ) {
    const { signal } = this.abortController;
    const opts = { signal };
    app.eventBus.on('pagechanging', () => this.onPageChanging(), opts);
    for (const name of PageChangeAnnouncer.NAVIGATION_EVENTS) {
      app.eventBus.on(name, () => this.onPagingButton(), opts);
    }
    // On `window`, like pdf.js: after a click on a page, the focus is on <body>, not in the viewer.
    // The capture phase runs before pdf.js's own key handler.
    window.addEventListener('keydown', (event) => this.onKeyDown(event), { capture: true, signal });
    host.addEventListener('click', (event) => this.onClick(event), { capture: true, signal });
  }

  /** The next page change is a navigation the user asked for (e.g. `[page]` set by the application). */
  public expectNavigation(): void {
    this.intentAt = performance.now();
  }

  public destroy(): void {
    this.abortController.abort();
    clearTimeout(this.timer);
    this.timer = undefined;
  }

  private onPageChanging(): void {
    this.pageChangedAt = performance.now();
    if (this.pageChangedAt - this.intentAt <= PageChangeAnnouncer.INTENT_WINDOW_MS) {
      this.scheduleAnnouncement();
    }
  }

  /** pdf.js has already changed the page when the event of a paging button arrives. */
  private onPagingButton(): void {
    this.expectNavigation();
    if (this.intentAt - this.pageChangedAt <= PageChangeAnnouncer.BUTTON_EVENT_LAG_MS) {
      this.scheduleAnnouncement();
    }
  }

  private onKeyDown(event: KeyboardEvent): void {
    if (!PageChangeAnnouncer.isNavigationKey(event)) {
      return;
    }
    if (PageChangeAnnouncer.isTextEntry(event.target)) {
      // the page number field (the user knows the number they typed), the find bar, form fields
      return;
    }
    if (this.isKeyForThisViewer(event)) {
      this.expectNavigation();
    }
  }

  /**
   * The rule pdf.js uses (`isKeyForThisViewer` in the fork's `web/app.js`): a key typed in a viewer
   * belongs to that viewer; a key typed outside every viewer belongs to the active viewer, or to
   * every viewer when none is marked active (a single viewer on the page).
   */
  private isKeyForThisViewer(event: KeyboardEvent): boolean {
    const target = event.target as Element | null;
    const owner = target?.closest ? target.closest('ngx-extended-pdf-viewer') : null;
    if (owner) {
      return owner === this.host;
    }
    return this.host.hasAttribute('data-ngx-active-viewer') || !document.querySelector('ngx-extended-pdf-viewer[data-ngx-active-viewer]');
  }

  private onClick(event: MouseEvent): void {
    const target = event.target as Element | null;
    if (target?.closest?.('a, [role="link"], .thumbnail')) {
      this.expectNavigation();
    }
  }

  private static isNavigationKey(event: KeyboardEvent): boolean {
    if (PageChangeAnnouncer.NAVIGATION_KEYS.has(event.key)) {
      return true;
    }
    const plain = !event.ctrlKey && !event.metaKey && !event.altKey;
    return plain && PageChangeAnnouncer.NAVIGATION_LETTERS.has(event.key.toLowerCase());
  }

  private static isTextEntry(target: EventTarget | null): boolean {
    const element = target as HTMLElement | null;
    if (!element?.tagName) {
      return false;
    }
    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) || element.isContentEditable === true;
  }

  private scheduleAnnouncement(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.timer = undefined;
      // one navigation, one announcement: scrolling or a key afterwards stays silent
      this.intentAt = Number.NEGATIVE_INFINITY;
      this.pageChangedAt = Number.NEGATIVE_INFINITY;
      void this.announceCurrentPage();
    }, PageChangeAnnouncer.SETTLE_MS);
  }

  private async announceCurrentPage(): Promise<void> {
    if (!this.isEnabled()) {
      return;
    }
    const pdfViewer = this.app.pdfViewer;
    const pageNumber = pdfViewer?.currentPageNumber;
    const pagesCount = this.app.pagesCount;
    if (!pageNumber || !pagesCount) {
      return;
    }
    const pageLabel = pdfViewer.currentPageLabel;
    const message =
      pageLabel && pageLabel !== String(pageNumber)
        ? await this.translate(
            'ngx-labelled-page-change-announcement',
            { pageLabel, pageNumber, pagesCount },
            `Page ${pageLabel} (${pageNumber} of ${pagesCount})`,
          )
        : await this.translate('ngx-page-change-announcement', { pageNumber, pagesCount }, `Page ${pageNumber} of ${pagesCount}`);
    if (!this.abortController.signal.aborted) {
      this.announce(message);
    }
  }

  private async translate(key: string, args: Record<string, string | number>, fallback: string): Promise<string> {
    try {
      const translated = await this.app.l10n?.get(key, args, fallback);
      return translated || fallback;
    } catch {
      return fallback;
    }
  }
}
