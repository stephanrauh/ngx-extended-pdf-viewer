/**
 * #3306 Keeps the id references of a viewer (`for`, `aria-labelledby`, `aria-controls`, ...) inside the viewer.
 *
 * With several viewers on one page, every viewer renders the same ids. The browser resolves an id
 * reference to the first element with that id on the page, so the labels, descriptions and popups
 * of the second viewer would point into the first one. The ids themselves stay as they are (the
 * CSS and pdf.js rely on them); instead, every reference that resolves to an element outside this
 * viewer is re-pointed at this viewer's element with ARIA element reflection
 * (`element.ariaLabelledByElements = [...]`). A label's `for` becomes an `aria-labelledby`
 * reference plus a click handler.
 *
 * References that already resolve correctly are left alone, so the first viewer on the page - and
 * every single-viewer page - is never changed. Browsers without element reflection keep the plain
 * id references.
 */

const ELEMENT_LIST_PROPERTIES: Record<string, string> = {
  'aria-labelledby': 'ariaLabelledByElements',
  'aria-describedby': 'ariaDescribedByElements',
  'aria-controls': 'ariaControlsElements',
  'aria-owns': 'ariaOwnsElements',
  'aria-details': 'ariaDetailsElements',
  'aria-errormessage': 'ariaErrorMessageElements',
  'aria-flowto': 'ariaFlowToElements',
};

const REFERENCE_ATTRIBUTES = ['for', 'aria-activedescendant', ...Object.keys(ELEMENT_LIST_PROPERTIES)];

const REFERENCE_SELECTOR = REFERENCE_ATTRIBUTES.map((attribute) => `[${attribute}]`).join(',');

export class ViewerLocalReferences {
  private observer: MutationObserver | undefined;

  private updateScheduled = false;

  private readonly labelClickHandlers = new Map<HTMLLabelElement, (event: MouseEvent) => void>();

  constructor(private readonly host: HTMLElement) {}

  public static isSupported(): boolean {
    return typeof Element !== 'undefined' && 'ariaLabelledByElements' in Element.prototype;
  }

  /** fixes the current references, and the ones added later */
  public start(): void {
    if (this.observer || !ViewerLocalReferences.isSupported()) {
      return;
    }
    this.update();
    this.observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => this.isRelevant(mutation))) {
        this.scheduleUpdate();
      }
    });
    this.observer.observe(this.host, { subtree: true, childList: true, attributes: true, attributeFilter: REFERENCE_ATTRIBUTES });
  }

  /** stops watching. References fixed so far stay fixed: they point into this viewer, which is never wrong. */
  public stop(): void {
    this.observer?.disconnect();
    this.observer = undefined;
  }

  public destroy(): void {
    this.stop();
    for (const [label, handler] of this.labelClickHandlers) {
      label.removeEventListener('click', handler);
    }
    this.labelClickHandlers.clear();
  }

  /** re-points every reference of this viewer that resolves to an element outside the viewer */
  public update(): void {
    if (!ViewerLocalReferences.isSupported()) {
      return;
    }
    for (const element of Array.from(this.host.querySelectorAll<HTMLElement>(REFERENCE_SELECTOR))) {
      for (const attribute of REFERENCE_ATTRIBUTES) {
        const value = element.getAttribute(attribute)?.trim();
        if (value) {
          this.fixReference(element, attribute, value);
        }
      }
    }
  }

  private fixReference(element: HTMLElement, attribute: string, value: string): void {
    const ids = value.split(/\s+/);
    const targets = ids.map((id) => this.findInViewer(id));
    const pointsOutside = targets.some((target, i) => target !== null && document.getElementById(ids[i]) !== target);
    if (!pointsOutside) {
      return;
    }
    // ids the viewer doesn't have keep pointing wherever the page resolves them
    const elements = targets.map((target, i) => target ?? document.getElementById(ids[i])).filter((target): target is HTMLElement => !!target);

    if (attribute === 'for') {
      this.replaceLabelFor(element as HTMLLabelElement, elements[0]);
    } else if (attribute === 'aria-activedescendant') {
      (element as any).ariaActiveDescendantElement = elements[0] ?? null;
    } else {
      // setting the property clears the attribute, so the reference isn't processed twice
      (element as any)[ELEMENT_LIST_PROPERTIES[attribute]] = elements;
    }
  }

  /** a label's `for` would label (and click) the first viewer's control */
  private replaceLabelFor(label: HTMLLabelElement, control: HTMLElement | undefined): void {
    label.removeAttribute('for');
    if (!control || control.contains(label)) {
      return;
    }
    const anyControl = control as any;
    if (!control.hasAttribute('aria-label') && !control.hasAttribute('aria-labelledby') && !anyControl.ariaLabelledByElements?.length) {
      anyControl.ariaLabelledByElements = [label];
    }
    if (!this.labelClickHandlers.has(label)) {
      const handler = (event: MouseEvent) => {
        if (control.contains(event.target as Node)) {
          return;
        }
        // what a label does for its control: check boxes and radio buttons are clicked, other fields get the focus
        const type = (control as HTMLInputElement).type;
        if (control instanceof HTMLButtonElement || type === 'checkbox' || type === 'radio') {
          control.click();
        }
        control.focus();
      };
      label.addEventListener('click', handler);
      this.labelClickHandlers.set(label, handler);
    }
  }

  private findInViewer(id: string): HTMLElement | null {
    return this.host.querySelector<HTMLElement>(`[id="${id.replace(/["\\]/g, '\\$&')}"]`);
  }

  private isRelevant(mutation: MutationRecord): boolean {
    if (mutation.type === 'attributes') {
      return !!(mutation.target as Element).getAttribute(mutation.attributeName!);
    }
    return Array.from(mutation.addedNodes).some(
      (node) => node instanceof Element && (node.matches(REFERENCE_SELECTOR) || !!node.querySelector(REFERENCE_SELECTOR)),
    );
  }

  private scheduleUpdate(): void {
    if (!this.updateScheduled) {
      this.updateScheduled = true;
      queueMicrotask(() => {
        this.updateScheduled = false;
        if (this.observer) {
          this.update();
        }
      });
    }
  }
}
