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

  describe('edge cases', () => {
    it('should handle PDF viewer application being undefined', () => {
      // Signal stays undefined, effect should not register listeners
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(eventBus.on).not.toHaveBeenCalled();
    });
  });
});
