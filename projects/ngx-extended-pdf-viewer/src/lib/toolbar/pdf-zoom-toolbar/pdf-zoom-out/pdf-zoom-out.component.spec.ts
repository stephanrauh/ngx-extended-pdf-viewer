import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfZoomOutComponent } from './pdf-zoom-out.component';
import { PDFNotificationService } from '../../../pdf-notification-service';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../../testing/signal-aware-event-bus';

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

describe('PdfZoomOutComponent', () => {
  let component: PdfZoomOutComponent;
  let fixture: ComponentFixture<PdfZoomOutComponent>;
  let mockPDFViewerApplication: IPDFViewerApplication;
  let eventBus: SignalAwareEventBus;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = { eventBus } as any;
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [
        PdfZoomOutComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } }
      ]
    });

    fixture = TestBed.createComponent(PdfZoomOutComponent);
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
      expect(component.showZoomButtons()).toBe(true);
      expect(component.disabled).toBe(true);
    });
  });

  describe('AbortController lifecycle (#3135)', () => {
    it('should register scalechanging with AbortSignal', () => {
      initPdfViewer();

      expect(eventBus.on).toHaveBeenCalledWith(
        'scalechanging',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('should pass the named eventListener field to eventBus.on', () => {
      initPdfViewer();

      const registeredFn = eventBus.on.mock.calls[0][1];
      expect(registeredFn).toBe((component as any).eventListener);
    });

    it('should abort previous controller when effect re-runs', () => {
      initPdfViewer();
      const firstController = (component as any).eventBusAbortController;
      const firstSignal = firstController.signal;
      expect(firstSignal.aborted).toBe(false);

      reInitPdfViewer();
      expect(firstSignal.aborted).toBe(true);

      const secondController = (component as any).eventBusAbortController;
      expect(secondController).not.toBe(firstController);
      expect(secondController.signal.aborted).toBe(false);
    });

    it('should unregister old listener and register new one on re-init', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('scalechanging')).toBe(1);

      reInitPdfViewer();
      expect(eventBus.getListenerCount('scalechanging')).toBe(1);
    });

    it('should abort controller on ngOnDestroy', () => {
      initPdfViewer();
      const controller = (component as any).eventBusAbortController;
      expect(controller.signal.aborted).toBe(false);

      component.ngOnDestroy();
      expect(controller.signal.aborted).toBe(true);
    });

    it('should remove listener on ngOnDestroy', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('scalechanging')).toBe(1);

      component.ngOnDestroy();
      expect(eventBus.getListenerCount('scalechanging')).toBe(0);
    });

    it('should not throw on ngOnDestroy when controller is null', () => {
      (component as any).eventBusAbortController = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('eventListener - disable logic', () => {
    beforeEach(() => {
      initPdfViewer();
    });

    it('should disable when scale <= minZoom', () => {
      eventBus.dispatch('scalechanging', { source: { minZoom: 0.5 }, scale: 0.5 });
      expect(component.disabled).toBe(true);

      eventBus.dispatch('scalechanging', { source: { minZoom: 0.5 }, scale: 0.3 });
      expect(component.disabled).toBe(true);
    });

    it('should enable when scale > minZoom', () => {
      eventBus.dispatch('scalechanging', { source: { minZoom: 0.5 }, scale: 0.6 });
      expect(component.disabled).toBe(false);
    });

    it('should enable when minZoom is falsy (0 or undefined)', () => {
      eventBus.dispatch('scalechanging', { source: { minZoom: 0 }, scale: 0.01 });
      expect(component.disabled).toBe(false);

      eventBus.dispatch('scalechanging', { source: { minZoom: undefined }, scale: 0.01 });
      expect(component.disabled).toBe(false);
    });

    it('should stop firing after ngOnDestroy', () => {
      eventBus.dispatch('scalechanging', { source: { minZoom: 0.5 }, scale: 0.6 });
      expect(component.disabled).toBe(false);

      component.ngOnDestroy();

      // After destroy, dispatching should not change disabled
      eventBus.dispatch('scalechanging', { source: { minZoom: 0.5 }, scale: 0.3 });
      expect(component.disabled).toBe(false); // unchanged from before destroy
    });
  });

  describe('ngOnDestroy', () => {
    it('should set PDFViewerApplication to undefined', () => {
      initPdfViewer();
      expect(component.PDFViewerApplication).toBeDefined();

      component.ngOnDestroy();

      expect(component.PDFViewerApplication).toBeUndefined();
    });
  });

  describe('input properties', () => {
    it('should accept showZoomButtons input', () => {
      fixture.componentRef.setInput('showZoomButtons', false);
      TestBed.flushEffects();
      expect(component.showZoomButtons()).toBe(false);
    });

    it('should accept showZoomButtons with ResponsiveVisibility value', () => {
      fixture.componentRef.setInput('showZoomButtons', 'xxs');
      TestBed.flushEffects();
      expect(component.showZoomButtons()).toBe('xxs');
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
