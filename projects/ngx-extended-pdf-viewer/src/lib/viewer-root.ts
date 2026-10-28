/**
 * #3306 The <ngx-extended-pdf-viewer> an element belongs to. With several viewers on one page, ids
 * aren't unique, so components look up the viewer's elements in this root instead of the whole document.
 * Falls back to the document if the element isn't part of a viewer (yet).
 */
export function viewerRoot(element: Element | null | undefined): Document | Element {
  return element?.closest('ngx-extended-pdf-viewer') ?? document;
}

/** #3306 `getElementById()` within a viewer root (see {@link viewerRoot}) */
export function getViewerElementById<T extends HTMLElement = HTMLElement>(root: Document | Element, id: string): T | null {
  if ('getElementById' in root) {
    return root.getElementById(id) as T | null;
  }
  return root.querySelector<T>(`#${id}`);
}
