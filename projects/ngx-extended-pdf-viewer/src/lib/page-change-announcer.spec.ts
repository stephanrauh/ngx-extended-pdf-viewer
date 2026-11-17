import { PageChangeAnnouncer } from './page-change-announcer';

class FakeEventBus {
  private readonly listeners = new Map<string, Array<{ listener: (e: any) => void; signal?: AbortSignal }>>();

  on(name: string, listener: (e: any) => void, options?: { signal?: AbortSignal }): void {
    const list = this.listeners.get(name) ?? [];
    list.push({ listener, signal: options?.signal });
    this.listeners.set(name, list);
  }

  dispatch(name: string, event: any = {}): void {
    for (const { listener, signal } of this.listeners.get(name) ?? []) {
      if (!signal?.aborted) {
        listener(event);
      }
    }
  }
}

describe('PageChangeAnnouncer', () => {
  let host: HTMLElement;
  let eventBus: FakeEventBus;
  let app: any;
  let announce: jest.Mock;
  let enabled: boolean;
  let announcer: PageChangeAnnouncer;

  /** pdf.js changes the page and dispatches `pagechanging` */
  const changePage = (page: number) => {
    app.pdfViewer.currentPageNumber = page;
    eventBus.dispatch('pagechanging', { pageNumber: page });
  };

  const settle = async () => {
    jest.advanceTimersByTime(PageChangeAnnouncer.SETTLE_MS);
    await Promise.resolve();
    await Promise.resolve();
  };

  beforeEach(() => {
    jest.useFakeTimers();
    host = document.createElement('ngx-extended-pdf-viewer');
    host.innerHTML = `
      <input id="pageNumber" />
      <div id="viewerContainer" tabindex="0"><a href="#page=5" id="link">link</a></div>
      <div class="thumbnail"><div role="button" id="thumb"></div></div>
      <button id="zoomIn"></button>`;
    document.body.appendChild(host);
    eventBus = new FakeEventBus();
    app = {
      eventBus,
      pagesCount: 53,
      pdfViewer: { currentPageNumber: 1, currentPageLabel: undefined as string | undefined },
      l10n: { get: jest.fn(async () => undefined) },
    };
    announce = jest.fn();
    enabled = true;
    announcer = new PageChangeAnnouncer(host, app, announce, () => enabled);
  });

  afterEach(() => {
    announcer.destroy();
    host.remove();
    jest.useRealTimers();
  });

  it('announces a page change caused by a key typed in the viewer', async () => {
    host.querySelector('#viewerContainer')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
    changePage(2);
    await settle();
    expect(announce).toHaveBeenCalledWith('Page 2 of 53');
  });

  it('announces a key typed outside the viewer (after a click on a page, the focus is on <body>)', async () => {
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
    changePage(2);
    await settle();
    expect(announce).toHaveBeenCalledWith('Page 2 of 53');
  });

  it('with two viewers, ignores keys that belong to the other one', async () => {
    const other = document.createElement('ngx-extended-pdf-viewer');
    other.innerHTML = '<div id="otherContainer" tabindex="0"></div>';
    document.body.appendChild(other);
    try {
      // typed in the other viewer
      other.firstElementChild!.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
      changePage(2);
      await settle();
      // typed outside both viewers while the other one is the active viewer
      other.setAttribute('data-ngx-active-viewer', '');
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
      changePage(3);
      await settle();
      expect(announce).not.toHaveBeenCalled();
      // ... and while this one is
      other.removeAttribute('data-ngx-active-viewer');
      host.setAttribute('data-ngx-active-viewer', '');
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
      changePage(4);
      await settle();
      expect(announce.mock.calls).toEqual([['Page 4 of 53']]);
    } finally {
      other.remove();
    }
  });

  it('stays silent while the user scrolls', async () => {
    changePage(2);
    changePage(3);
    await settle();
    expect(announce).not.toHaveBeenCalled();
  });

  it('stays silent when the page change comes from the page number field', async () => {
    host.querySelector('#pageNumber')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    changePage(7);
    await settle();
    expect(announce).not.toHaveBeenCalled();
  });

  it('announces the paging buttons, although their event arrives after the page change', async () => {
    changePage(2);
    eventBus.dispatch('nextpage');
    await settle();
    expect(announce).toHaveBeenCalledWith('Page 2 of 53');
  });

  it('announces links and thumbnails, but not other buttons', async () => {
    (host.querySelector('#link') as HTMLElement).click();
    changePage(5);
    await settle();
    (host.querySelector('#thumb') as HTMLElement).click();
    changePage(9);
    await settle();
    (host.querySelector('#zoomIn') as HTMLElement).click();
    changePage(10);
    await settle();
    expect(announce.mock.calls).toEqual([['Page 5 of 53'], ['Page 9 of 53']]);
  });

  it('announces a page set by the application', async () => {
    announcer.expectNavigation();
    changePage(12);
    await settle();
    expect(announce).toHaveBeenCalledWith('Page 12 of 53');
  });

  it('announces several page changes in a row once, with the final page', async () => {
    for (const page of [2, 3, 4]) {
      host.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
      changePage(page);
      jest.advanceTimersByTime(100);
    }
    await settle();
    expect(announce.mock.calls).toEqual([['Page 4 of 53']]);
  });

  it('stays silent when scrolling starts after the announcement', async () => {
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    changePage(53);
    await settle();
    changePage(52);
    await settle();
    expect(announce.mock.calls).toEqual([['Page 53 of 53']]);
  });

  it('ignores a key press long before the page change', async () => {
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    jest.advanceTimersByTime(PageChangeAnnouncer.INTENT_WINDOW_MS + 1);
    changePage(2);
    await settle();
    expect(announce).not.toHaveBeenCalled();
  });

  describe('only a navigation the user asked for (review of #3315)', () => {
    const key = (k: string, init: KeyboardEventInit = {}) =>
      host.querySelector('#viewerContainer')!.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...init }));

    it("doesn't announce the page again when an unrelated key follows an announcement", async () => {
      key('PageDown');
      changePage(2);
      await settle();
      expect(announce).toHaveBeenCalledTimes(1);
      key('x');
      await settle();
      key('PageDown'); // the user is on the last page they can reach: nothing changes
      await settle();
      expect(announce).toHaveBeenCalledTimes(1);
    });

    it("doesn't announce a scrolled page because an unrelated key follows", async () => {
      changePage(2); // scrolling
      key('x');
      await settle();
      expect(announce).not.toHaveBeenCalled();
    });

    it("doesn't announce a scrolled page because a navigation key follows without changing the page", async () => {
      changePage(2); // scrolling
      key('PageDown');
      await settle();
      expect(announce).not.toHaveBeenCalled();
    });

    it("doesn't announce a scrolled page because a paging button event arrives much later", async () => {
      changePage(2); // scrolling
      jest.advanceTimersByTime(PageChangeAnnouncer.SETTLE_MS - 50);
      eventBus.dispatch('nextpage'); // e.g. on the last page, where it changes nothing
      await settle();
      expect(announce).not.toHaveBeenCalled();
    });

    it('ignores keys that never change the page, and letters with Ctrl, Meta or Alt', async () => {
      for (const init of [{ key: 'x' }, { key: 'r' }, { key: 'n', ctrlKey: true }, { key: 'p', metaKey: true }, { key: 'j', altKey: true }]) {
        key(init.key, init);
        changePage(app.pdfViewer.currentPageNumber + 1);
        await settle();
      }
      expect(announce).not.toHaveBeenCalled();
    });

    it.each(['ArrowDown', 'ArrowRight', 'PageDown', 'End', ' ', 'Backspace', 'j', 'n', 'k', 'p'])('announces the navigation key %p', async (k) => {
      key(k);
      changePage(2);
      await settle();
      expect(announce).toHaveBeenCalledWith('Page 2 of 53');
    });

    it('announces Meta+ArrowDown (the last page)', async () => {
      key('ArrowDown', { metaKey: true });
      changePage(53);
      await settle();
      expect(announce).toHaveBeenCalledWith('Page 53 of 53');
    });
  });

  it('names the page label when the PDF has one', async () => {
    app.pdfViewer.currentPageLabel = 'iv';
    announcer.expectNavigation();
    changePage(4);
    await settle();
    expect(announce).toHaveBeenCalledWith('Page iv (4 of 53)');
  });

  it('uses the translation', async () => {
    app.l10n.get = jest.fn(async (key: string, args: any) => `${key}:${args.pageNumber}/${args.pagesCount}`);
    announcer.expectNavigation();
    changePage(3);
    await settle();
    expect(announce).toHaveBeenCalledWith('ngx-page-change-announcement:3/53');
  });

  it('does nothing while the option is off', async () => {
    enabled = false;
    announcer.expectNavigation();
    changePage(3);
    await settle();
    expect(announce).not.toHaveBeenCalled();
  });

  it('does nothing after destroy()', async () => {
    announcer.expectNavigation();
    changePage(3);
    announcer.destroy();
    await settle();
    host.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true }));
    changePage(4);
    await settle();
    expect(announce).not.toHaveBeenCalled();
  });
});
