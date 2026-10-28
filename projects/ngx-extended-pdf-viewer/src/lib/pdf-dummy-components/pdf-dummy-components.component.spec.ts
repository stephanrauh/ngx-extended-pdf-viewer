import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfDummyComponentsComponent } from './pdf-dummy-components.component';

describe('PdfDummyComponentsComponent', () => {
  let component: PdfDummyComponentsComponent;
  let fixture: ComponentFixture<PdfDummyComponentsComponent>;
  const roots: HTMLElement[] = [];

  /** a viewer's root element: a dummy container plus the given widgets */
  function createViewerRoot(...ids: string[]): HTMLElement {
    const root = document.createElement('div');
    const container = document.createElement('span');
    container.className = 'invisible dummy-pdf-viewer-components';
    root.appendChild(container);
    for (const id of ids) {
      const widget = document.createElement('button');
      widget.id = id;
      root.appendChild(widget);
    }
    document.body.appendChild(root);
    roots.push(root);
    return root;
  }

  function dummies(root: ParentNode): Element[] {
    return Array.from(root.querySelectorAll('.dummy-pdf-viewer-components > *'));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfDummyComponentsComponent],
    });

    fixture = TestBed.createComponent(PdfDummyComponentsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    roots.splice(0).forEach((root) => root.remove());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe.each([
    ['addMissingStandardWidgets', (root?: ParentNode) => component.addMissingStandardWidgets(root)],
    ['addMissingStandardWidgetsStatic', (root?: ParentNode) => PdfDummyComponentsComponent.addMissingStandardWidgetsStatic(root)],
  ])('%s', (_name, addMissingStandardWidgets) => {
    it('does nothing if the root has no dummy container', () => {
      const root = document.createElement('div');
      expect(() => addMissingStandardWidgets(root)).not.toThrow();
      expect(root.children.length).toBe(0);
    });

    it('adds an invisible span for every missing widget', () => {
      const root = createViewerRoot();

      addMissingStandardWidgets(root);

      const added = dummies(root);
      expect(added.length).toBeGreaterThan(100);
      expect(added.every((d) => d.className === 'invisible dummy-component')).toBe(true);
      expect(root.querySelector('#attachmentsView')?.tagName).toBe('SPAN');
      // scaleSelect is in requiredIds, so it gets a span, too
      expect(root.querySelectorAll('#scaleSelect').length).toBe(1);
    });

    it("doesn't add a dummy for a widget that exists", () => {
      const root = createViewerRoot('attachmentsView', 'scaleSelect');

      addMissingStandardWidgets(root);

      expect(root.querySelectorAll('#attachmentsView').length).toBe(1);
      expect(root.querySelectorAll('#scaleSelect').length).toBe(1);
      expect(root.querySelector('#attachmentsView')?.tagName).toBe('BUTTON');
    });

    it('replaces the dummies of an earlier call', () => {
      const root = createViewerRoot();

      addMissingStandardWidgets(root);
      const count = dummies(root).length;
      addMissingStandardWidgets(root);

      expect(dummies(root).length).toBe(count);
      expect(root.querySelectorAll('#attachmentsView').length).toBe(1);
    });

    it("ignores another viewer's widgets (#3306)", () => {
      const first = createViewerRoot('attachmentsView');
      const second = createViewerRoot();

      addMissingStandardWidgets(second);

      expect(second.querySelector('#attachmentsView')?.className).toBe('invisible dummy-component');
      expect(dummies(first)).toEqual([]);
    });

    it('uses the whole document without a root', () => {
      createViewerRoot('attachmentsView');

      addMissingStandardWidgets();

      expect(document.querySelectorAll('#attachmentsView').length).toBe(1);
      expect(document.querySelectorAll('#scaleSelect').length).toBe(1);
    });
  });
});
