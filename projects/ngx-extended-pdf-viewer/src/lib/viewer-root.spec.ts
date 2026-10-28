import { getViewerElementById, viewerRoot } from './viewer-root';

describe('viewerRoot (#3306)', () => {
  let first: HTMLElement;
  let second: HTMLElement;

  function createViewer(): HTMLElement {
    const host = document.createElement('ngx-extended-pdf-viewer');
    host.innerHTML = '<div class="zoom"><button id="nextPage"></button><span class="inner"></span></div>';
    document.body.appendChild(host);
    return host;
  }

  beforeEach(() => {
    first = createViewer();
    second = createViewer();
  });

  afterEach(() => {
    first.remove();
    second.remove();
  });

  it('finds the viewer an element belongs to', () => {
    expect(viewerRoot(second.querySelector('.inner'))).toBe(second);
    expect(viewerRoot(second)).toBe(second);
  });

  it('falls back to the document outside a viewer', () => {
    expect(viewerRoot(document.body)).toBe(document);
    expect(viewerRoot(undefined)).toBe(document);
    expect(viewerRoot(null)).toBe(document);
  });

  it("looks up an id in its own viewer, not in the first one", () => {
    const root = viewerRoot(second.querySelector('.inner'));
    expect(getViewerElementById(root, 'nextPage')).toBe(second.querySelector('#nextPage'));
    expect(getViewerElementById(root, 'nextPage')).not.toBe(first.querySelector('#nextPage'));
  });

  it('uses document.getElementById outside a viewer', () => {
    const spy = jest.spyOn(document, 'getElementById');
    expect(getViewerElementById(document, 'nextPage')).toBe(first.querySelector('#nextPage'));
    expect(spy).toHaveBeenCalledWith('nextPage');
    spy.mockRestore();
  });

  it('returns null for an unknown id', () => {
    expect(getViewerElementById(second, 'noSuchId')).toBeNull();
    expect(getViewerElementById(document, 'noSuchId')).toBeNull();
  });
});
