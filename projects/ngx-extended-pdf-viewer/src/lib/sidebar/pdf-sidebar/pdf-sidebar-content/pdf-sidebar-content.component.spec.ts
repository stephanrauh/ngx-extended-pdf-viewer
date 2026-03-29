import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { PdfSidebarContentComponent } from './pdf-sidebar-content.component';
import { PDFNotificationService } from '../../../pdf-notification-service';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../../testing/signal-aware-event-bus';

describe('PdfSidebarContentComponent', () => {
  let component: PdfSidebarContentComponent;
  let fixture: ComponentFixture<PdfSidebarContentComponent>;
  let mockPDFViewerApplication: IPDFViewerApplication;
  let eventBus: SignalAwareEventBus;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = { eventBus } as any;
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [PdfSidebarContentComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } }
      ]
    });

    fixture = TestBed.createComponent(PdfSidebarContentComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function initPdfViewer() {
    pdfAppSignal.set(mockPDFViewerApplication);
    fixture.detectChanges();
    TestBed.flushEffects();
  }

  function reInitPdfViewer() {
    pdfAppSignal.set(undefined);
    fixture.detectChanges();
    TestBed.flushEffects();
    pdfAppSignal.set(mockPDFViewerApplication);
    fixture.detectChanges();
    TestBed.flushEffects();
  }

  describe('component initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      expect(component.customThumbnail()).toBeUndefined();
      expect(component.hideSidebarToolbar()).toBe(false);
      expect(component.mobileFriendlyZoomScale()).toBe(1.0);
    });

    it('should have public notificationService', () => {
      expect(component.notificationService).toBeDefined();
    });
  });

  describe('AbortController lifecycle (#3135)', () => {
    it('should register rendercustomthumbnail with AbortSignal after effect runs', () => {
      initPdfViewer();

      expect(eventBus.on).toHaveBeenCalledWith(
        'rendercustomthumbnail',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('should have exactly one listener after init', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('rendercustomthumbnail')).toBe(1);
    });

    it('should abort previous controller when effect re-runs', () => {
      initPdfViewer();
      const firstSignal = (component as any).eventBusAbortController.signal;
      expect(firstSignal.aborted).toBe(false);

      reInitPdfViewer();
      expect(firstSignal.aborted).toBe(true);

      const secondController = (component as any).eventBusAbortController;
      expect(secondController.signal.aborted).toBe(false);
    });

    it('should keep exactly one listener after re-init', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('rendercustomthumbnail')).toBe(1);

      reInitPdfViewer();
      expect(eventBus.getListenerCount('rendercustomthumbnail')).toBe(1);
    });

    it('should abort controller on ngOnDestroy', () => {
      initPdfViewer();
      const controller = (component as any).eventBusAbortController;
      expect(controller).not.toBeNull();
      const abortSignal = controller.signal;
      expect(abortSignal.aborted).toBe(false);

      component.ngOnDestroy();
      expect(abortSignal.aborted).toBe(true);
    });

    it('should remove listener on ngOnDestroy', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('rendercustomthumbnail')).toBe(1);

      component.ngOnDestroy();
      expect(eventBus.getListenerCount('rendercustomthumbnail')).toBe(0);
    });

    it('should not throw on ngOnDestroy when controller is null', () => {
      (component as any).eventBusAbortController = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    it('should set linkService to undefined', () => {
      (component as any).linkService = { page: 1 };

      component.ngOnDestroy();

      expect((component as any).linkService).toBeUndefined();
    });

    it('should abort controller and set linkService to undefined', () => {
      initPdfViewer();
      (component as any).linkService = { page: 1, pagesCount: 10 };

      const abortSignal = (component as any).eventBusAbortController.signal;
      component.ngOnDestroy();

      expect(abortSignal.aborted).toBe(true);
      expect((component as any).linkService).toBeUndefined();
    });
  });

  describe('input properties', () => {
    it('should accept hideSidebarToolbar input', () => {
      fixture.componentRef.setInput('hideSidebarToolbar', true);
      TestBed.flushEffects();
      expect(component.hideSidebarToolbar()).toBe(true);
    });

    it('should accept mobileFriendlyZoomScale input', () => {
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 2.0);
      TestBed.flushEffects();
      expect(component.mobileFriendlyZoomScale()).toBe(2.0);
    });
  });

  describe('top computed signal', () => {
    it('should return "0px" when hideSidebarToolbar is true', () => {
      fixture.componentRef.setInput('hideSidebarToolbar', true);
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 1.0);
      TestBed.flushEffects();

      expect(component.top()).toBe('0px');
    });

    it('should return "33px" when hideSidebarToolbar is false and scale is 1.0', () => {
      fixture.componentRef.setInput('hideSidebarToolbar', false);
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 1.0);
      TestBed.flushEffects();

      // 32 * 1.0 = 32, but 32 is bumped to 33 to avoid border cutoff
      expect(component.top()).toBe('33px');
    });

    it('should return scaled value when mobileFriendlyZoomScale is not 1.0', () => {
      fixture.componentRef.setInput('hideSidebarToolbar', false);
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 2.0);
      TestBed.flushEffects();

      // 32 * 2.0 = 64, which is not 32 so no bump
      expect(component.top()).toBe('64px');
    });

    it('should return "0px" when hideSidebarToolbar is true regardless of scale', () => {
      fixture.componentRef.setInput('hideSidebarToolbar', true);
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 3.0);
      TestBed.flushEffects();

      expect(component.top()).toBe('0px');
    });

    it('should return scaled value for fractional scale', () => {
      fixture.componentRef.setInput('hideSidebarToolbar', false);
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 0.5);
      TestBed.flushEffects();

      // 32 * 0.5 = 16, not 32 so no bump
      expect(component.top()).toBe('16px');
    });
  });

  describe('onKeyDown', () => {
    let mockLinkService: { page: number; pagesCount: number };

    beforeEach(() => {
      mockLinkService = { page: 5, pagesCount: 10 };
      (component as any).linkService = mockLinkService;
    });

    function createKeyEvent(code: string, modifiers: { ctrlKey?: boolean; metaKey?: boolean } = {}): KeyboardEvent {
      const event = new KeyboardEvent('keydown', {
        code,
        ctrlKey: modifiers.ctrlKey ?? false,
        metaKey: modifiers.metaKey ?? false,
      });
      jest.spyOn(event, 'preventDefault');
      return event;
    }

    it('should go to next page on ArrowDown', () => {
      const event = createKeyEvent('ArrowDown');
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(6);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should go to previous page on ArrowUp', () => {
      const event = createKeyEvent('ArrowUp');
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(4);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should go to last page on Ctrl+ArrowDown', () => {
      const event = createKeyEvent('ArrowDown', { ctrlKey: true });
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(10);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should go to first page on Ctrl+ArrowUp', () => {
      const event = createKeyEvent('ArrowUp', { ctrlKey: true });
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(1);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should go to last page on Meta+ArrowDown', () => {
      const event = createKeyEvent('ArrowDown', { metaKey: true });
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(10);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should go to first page on Meta+ArrowUp', () => {
      const event = createKeyEvent('ArrowUp', { metaKey: true });
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(1);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not go beyond last page on ArrowDown', () => {
      mockLinkService.page = 10;
      const event = createKeyEvent('ArrowDown');
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(10);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not go below first page on ArrowUp', () => {
      mockLinkService.page = 1;
      const event = createKeyEvent('ArrowUp');
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(1);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should do nothing when linkService is undefined', () => {
      (component as any).linkService = undefined;
      const event = createKeyEvent('ArrowDown');
      component.onKeyDown(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should do nothing for non-arrow keys', () => {
      const event = createKeyEvent('Enter');
      component.onKeyDown(event);

      expect(mockLinkService.page).toBe(5);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe('replacePageNumberEverywhere', () => {
    it('should replace PAGE_NUMBER in element attributes', () => {
      const el = document.createElement('div');
      el.setAttribute('data-page', 'PAGE_NUMBER');
      el.setAttribute('title', 'Page PAGE_NUMBER');

      (component as any).replacePageNumberEverywhere(el, '42');

      expect(el.getAttribute('data-page')).toBe('42');
      expect(el.getAttribute('title')).toBe('Page 42');
    });

    it('should replace PAGE_NUMBER in text nodes', () => {
      const el = document.createElement('span');
      el.textContent = 'Page PAGE_NUMBER of 100';

      (component as any).replacePageNumberEverywhere(el, '7');

      expect(el.textContent).toBe('Page 7 of 100');
    });

    it('should recursively replace in child elements', () => {
      const parent = document.createElement('div');
      parent.setAttribute('data-id', 'PAGE_NUMBER');

      const child = document.createElement('span');
      child.setAttribute('aria-label', 'Thumbnail PAGE_NUMBER');
      child.textContent = 'PAGE_NUMBER';

      parent.appendChild(child);

      (component as any).replacePageNumberEverywhere(parent, '3');

      expect(parent.getAttribute('data-id')).toBe('3');
      expect(child.getAttribute('aria-label')).toBe('Thumbnail 3');
      expect(child.textContent).toBe('3');
    });

    it('should not modify attributes without PAGE_NUMBER', () => {
      const el = document.createElement('div');
      el.setAttribute('class', 'thumbnail');
      el.setAttribute('id', 'thumb-5');

      (component as any).replacePageNumberEverywhere(el, '5');

      expect(el.getAttribute('class')).toBe('thumbnail');
      expect(el.getAttribute('id')).toBe('thumb-5');
    });

    it('should not modify text nodes without PAGE_NUMBER', () => {
      const el = document.createElement('span');
      el.textContent = 'No placeholder here';

      (component as any).replacePageNumberEverywhere(el, '1');

      expect(el.textContent).toBe('No placeholder here');
    });

    it('should handle elements with no attributes or children', () => {
      const el = document.createElement('div');

      expect(() => (component as any).replacePageNumberEverywhere(el, '1')).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle PDF viewer application being undefined', () => {
      // Signal stays undefined, effect should not register listeners
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(eventBus.on).not.toHaveBeenCalled();
    });
  });
});
