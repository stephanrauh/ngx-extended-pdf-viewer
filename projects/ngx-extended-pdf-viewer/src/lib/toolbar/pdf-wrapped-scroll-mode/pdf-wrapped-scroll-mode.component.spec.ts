import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfWrappedScrollModeComponent } from './pdf-wrapped-scroll-mode.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { ScrollModeType } from '../../options/pdf-viewer';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../testing/signal-aware-event-bus';

// Mock pipe
@Pipe({
    name: 'responsiveCSSClass',
    standalone: false
})
class MockResponsiveCSSClassPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

// Mock pdf-shy-button component
@Component({
    selector: 'pdf-shy-button',
    template: '<ng-content></ng-content>',
    inputs: ['title', 'primaryToolbarId', 'cssClass', 'l10nId', 'l10nLabel', 'order', 'action', 'toggled', 'closeOnClick', 'image', 'disabled'],
    standalone: false
})
class MockPdfShyButtonComponent {}

describe('PdfWrappedScrollModeComponent', () => {
  let component: PdfWrappedScrollModeComponent;
  let fixture: ComponentFixture<PdfWrappedScrollModeComponent>;
  let mockChangeDetectorRef: jest.Mocked<ChangeDetectorRef>;
  let mockPDFViewerApplication: any;
  let eventBus: SignalAwareEventBus;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = {
      eventBus
    } as any;

    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    mockChangeDetectorRef = {
      detectChanges: jest.fn(),
      markForCheck: jest.fn(),
      checkNoChanges: jest.fn(),
      detach: jest.fn(),
      reattach: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      declarations: [
        PdfWrappedScrollModeComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ]
    });

    fixture = TestBed.createComponent(PdfWrappedScrollModeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('scrollMode', ScrollModeType.vertical);
    fixture.componentRef.setInput('pageViewMode', 'multiple');
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
      expect(component.show()).toBe(true);
    });
  });

  describe('AbortController lifecycle (#3135)', () => {
    it('should register switchscrollmode via the real effect/signal path', () => {
      initPdfViewer();

      expect(eventBus.on).toHaveBeenCalledWith(
        'switchscrollmode',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('should unsubscribe handler on ngOnDestroy so it stops firing', async () => {
      initPdfViewer();

      // Dispatch fires the handler
      eventBus.dispatch('switchscrollmode', {});
      await new Promise<void>(r => queueMicrotask(r));

      // The handler is a no-op for scroll mode, but we can verify it was registered and removed
      expect(eventBus.getListenerCount('switchscrollmode')).toBe(1);

      component.ngOnDestroy();

      expect(eventBus.getListenerCount('switchscrollmode')).toBe(0);

      // Dispatching after destroy should not invoke any handler
      eventBus.dispatch('switchscrollmode', {});
      await new Promise<void>(r => queueMicrotask(r));
    });

    it('should replace the listener on re-init (no duplicates)', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('switchscrollmode')).toBe(1);

      reInitPdfViewer();
      expect(eventBus.getListenerCount('switchscrollmode')).toBe(1);
    });

    it('should not fire old handler after re-init', async () => {
      initPdfViewer();

      // Re-init replaces the handler
      reInitPdfViewer();

      // Only 1 listener should be active
      expect(eventBus.getListenerCount('switchscrollmode')).toBe(1);

      // Dispatching should work without error
      eventBus.dispatch('switchscrollmode', {});
      await new Promise<void>(r => queueMicrotask(r));
    });

    it('should not throw on ngOnDestroy when controller is null', () => {
      (component as any).eventBusAbortController = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('ngOnDestroy', () => {
    it('should set onClick to undefined', () => {
      component.ngOnDestroy();
      expect(component.onClick).toBeUndefined();
    });
  });

  describe('input properties', () => {
    it('should accept show input with boolean value', () => {
      fixture.componentRef.setInput('show', false);
      TestBed.flushEffects();
      expect(component.show()).toBe(false);
    });

    it('should accept show input with ResponsiveVisibility value', () => {
      fixture.componentRef.setInput('show', 'xxs');
      TestBed.flushEffects();
      expect(component.show()).toBe('xxs');
    });
  });

  describe('edge cases', () => {
    it('should handle PDF viewer application being undefined', () => {
      pdfAppSignal.set(undefined);

      expect(() => {
        const newFixture = TestBed.createComponent(PdfWrappedScrollModeComponent);
        newFixture.componentRef.setInput('scrollMode', ScrollModeType.vertical);
        newFixture.componentRef.setInput('pageViewMode', 'multiple');
        TestBed.flushEffects();
      }).not.toThrow();
    });
  });
});
