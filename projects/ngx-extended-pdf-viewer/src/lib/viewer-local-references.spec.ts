import { ViewerLocalReferences } from './viewer-local-references';

/**
 * jsdom doesn't implement ARIA element reflection, so these tests install a minimal stand-in:
 * the property holds the elements, and setting it clears the attribute, as in the browsers.
 */
const REFLECTED: Array<[string, string]> = [
  ['ariaLabelledByElements', 'aria-labelledby'],
  ['ariaDescribedByElements', 'aria-describedby'],
  ['ariaControlsElements', 'aria-controls'],
  ['ariaOwnsElements', 'aria-owns'],
  ['ariaDetailsElements', 'aria-details'],
  ['ariaErrorMessageElements', 'aria-errormessage'],
  ['ariaFlowToElements', 'aria-flowto'],
  ['ariaActiveDescendantElement', 'aria-activedescendant'],
];

function installReflection(): void {
  for (const [property, attribute] of REFLECTED) {
    const store = new WeakMap<Element, unknown>();
    Object.defineProperty(Element.prototype, property, {
      configurable: true,
      get(this: Element) {
        return store.get(this) ?? null;
      },
      set(this: Element, value: unknown) {
        store.set(this, value);
        this.setAttribute(attribute, '');
      },
    });
  }
}

function removeReflection(): void {
  for (const [property] of REFLECTED) {
    delete (Element.prototype as any)[property];
  }
}

function createViewer(): HTMLElement {
  const host = document.createElement('ngx-extended-pdf-viewer');
  host.innerHTML = `
    <div id="findbar" role="dialog" aria-labelledby="findbarTitle" aria-describedby="findbarHint missingId">
      <h2 id="findbarTitle">Find</h2>
      <span id="findbarHint">hint</span>
      <input type="checkbox" id="findHighlightAll" />
      <label for="findHighlightAll">Highlight all</label>
      <input type="text" id="findInput" aria-label="Find in document" />
      <label for="findInput">Find</label>
      <button id="toggle" aria-controls="findbar"></button>
      <div role="listbox" id="list" aria-activedescendant="option1"><div role="option" id="option1"></div></div>
    </div>`;
  document.body.appendChild(host);
  return host;
}

describe('ViewerLocalReferences (#3306)', () => {
  let first: HTMLElement;
  let second: HTMLElement;
  let references: ViewerLocalReferences | undefined;

  beforeEach(() => {
    installReflection();
    first = createViewer();
    second = createViewer();
  });

  afterEach(() => {
    references?.destroy();
    references = undefined;
    first.remove();
    second.remove();
    removeReflection();
  });

  it('is unsupported without element reflection, and then does nothing', () => {
    removeReflection();
    expect(ViewerLocalReferences.isSupported()).toBe(false);

    references = new ViewerLocalReferences(second);
    references.start();

    expect(second.querySelector('#findbar')!.getAttribute('aria-labelledby')).toBe('findbarTitle');
    expect(second.querySelector('label')!.getAttribute('for')).toBe('findHighlightAll');
  });

  it("leaves the first viewer alone: its references already resolve to its own elements", () => {
    references = new ViewerLocalReferences(first);
    references.update();

    expect(first.querySelector('#findbar')!.getAttribute('aria-labelledby')).toBe('findbarTitle');
    expect(first.querySelector('#toggle')!.getAttribute('aria-controls')).toBe('findbar');
    expect(first.querySelector('label')!.getAttribute('for')).toBe('findHighlightAll');
    expect((first.querySelector('#findbar') as any).ariaLabelledByElements).toBeNull();
  });

  it("re-points the second viewer's aria references at its own elements", () => {
    references = new ViewerLocalReferences(second);
    references.update();

    const findbar = second.querySelector('#findbar') as any;
    expect(findbar.ariaLabelledByElements).toEqual([second.querySelector('#findbarTitle')]);
    expect(findbar.getAttribute('aria-labelledby')).toBe('');
    expect((second.querySelector('#toggle') as any).ariaControlsElements).toEqual([findbar]);
    expect((second.querySelector('#list') as any).ariaActiveDescendantElement).toBe(second.querySelector('#option1'));
  });

  it("keeps an id the viewer doesn't have, if the page has it", () => {
    const elsewhere = document.createElement('span');
    elsewhere.id = 'missingId';
    document.body.appendChild(elsewhere);

    references = new ViewerLocalReferences(second);
    references.update();

    expect((second.querySelector('#findbar') as any).ariaDescribedByElements).toEqual([second.querySelector('#findbarHint'), elsewhere]);
    elsewhere.remove();
  });

  it('turns a label into a reference that names and operates its own control', () => {
    references = new ViewerLocalReferences(second);
    references.update();

    const [checkboxLabel, textLabel] = Array.from(second.querySelectorAll('label'));
    const checkbox = second.querySelector<HTMLInputElement>('#findHighlightAll')!;
    expect(checkboxLabel.hasAttribute('for')).toBe(false);
    expect((checkbox as any).ariaLabelledByElements).toEqual([checkboxLabel]);

    checkboxLabel.click();
    expect(checkbox.checked).toBe(true);
    expect(first.querySelector<HTMLInputElement>('#findHighlightAll')!.checked).toBe(false);

    // a control with its own name keeps it, and a text field gets the focus
    const input = second.querySelector<HTMLInputElement>('#findInput')!;
    expect((input as any).ariaLabelledByElements).toBeNull();
    textLabel.click();
    expect(document.activeElement).toBe(input);
  });

  it('fixes references added later', async () => {
    references = new ViewerLocalReferences(second);
    references.start();

    const button = document.createElement('button');
    button.setAttribute('aria-controls', 'findbar');
    second.appendChild(button);
    await new Promise((resolve) => setTimeout(resolve));

    expect((button as any).ariaControlsElements).toEqual([second.querySelector('#findbar')]);
  });

  it('removes its label handlers when destroyed', () => {
    references = new ViewerLocalReferences(second);
    references.update();
    references.destroy();

    const [checkboxLabel] = Array.from(second.querySelectorAll('label'));
    checkboxLabel.click();
    expect(second.querySelector<HTMLInputElement>('#findHighlightAll')!.checked).toBe(false);
  });
});
