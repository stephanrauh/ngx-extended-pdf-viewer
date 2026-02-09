import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfHandToolComponent } from './pdf-hand-tool.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PdfCursorTools } from '../../options/pdf-cursor-tools';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../testing/signal-aware-event-bus';

@Pipe({ name: 'responsiveCSSClass', standalone: false })
class MockResponsiveCSSClassPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Component({
    selector: 'pdf-shy-button',
    template: '<ng-content></ng-content>',
    inputs: ['title', 'primaryToolbarId', 'cssClass', 'l10nId', 'l10nLabel', 'order', 'action', 'toggled', 'closeOnClick', 'image'],
    standalone: false
})
class MockPdfShyButtonComponent {}

describe('PdfHandToolComponent', () => {
  let component: PdfHandToolComponent;
  let fixture: ComponentFixture<PdfHandToolComponent>;
  let eventBus: SignalAwareEventBus;
  let mockPDFViewerApplication: any;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = { eventBus } as any;
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [
        PdfHandToolComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } }
      ]
    });

    fixture = TestBed.createComponent(PdfHandToolComponent);
    component = fixture.componentInstance;
  });

  /** Trigger the component's init effect via the real signal path. */
  function initPdfViewer() {
    pdfAppSignal.set(mockPDFViewerApplication);
    fixture.detectChanges();
    TestBed.flushEffects();
  }

  /** Force the effect to re-run by toggling the signal. */
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
      expect(component.showHandToolButton()).toBe(true);
      expect(component.isSelected).toBe(false);
    });
  });

  describe('AbortController lifecycle (#3135)', () => {
    it('should register cursortoolchanged via the real effect/signal path', () => {
      initPdfViewer();

      expect(eventBus.on).toHaveBeenCalledWith(
        'cursortoolchanged',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('should unsubscribe handler on ngOnDestroy so it stops firing', () => {
      initPdfViewer();

      // Handler fires before destroy
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.HAND });
      expect(component.isSelected).toBe(true);

      component.ngOnDestroy();
      component.isSelected = false;

      // Handler must NOT fire after destroy
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.HAND });
      expect(component.isSelected).toBe(false);
    });

    it('should replace the listener on re-init (no duplicates)', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('cursortoolchanged')).toBe(1);

      reInitPdfViewer();
      expect(eventBus.getListenerCount('cursortoolchanged')).toBe(1);
    });

    it('should not fire old handler after re-init', () => {
      initPdfViewer();
      const firstOnCalls = eventBus.on.mock.calls.length;

      reInitPdfViewer();

      // Dispatch should reach only the NEW handler
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.HAND });
      expect(component.isSelected).toBe(true);
      // And the bus registered a second listener (old one removed via abort)
      expect(eventBus.on.mock.calls.length).toBe(firstOnCalls + 1);
    });

    it('should not throw on ngOnDestroy when controller is null', () => {
      (component as any).eventBusAbortController = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('cursortoolchanged handler', () => {
    beforeEach(() => {
      initPdfViewer();
    });

    it('should set isSelected to true when tool is HAND', () => {
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.HAND });
      expect(component.isSelected).toBe(true);
    });

    it('should set isSelected to false when tool is SELECT', () => {
      component.isSelected = true;
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.SELECT });
      expect(component.isSelected).toBe(false);
    });

    it('should set isSelected to false when tool is ZOOM', () => {
      component.isSelected = true;
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.ZOOM });
      expect(component.isSelected).toBe(false);
    });
  });

  describe('onClick', () => {
    it('should dispatch switchcursortool with HAND tool', () => {
      initPdfViewer();
      component.onClick();

      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchcursortool',
        { tool: PdfCursorTools.HAND }
      );
    });

    it('should not throw when PDFViewerApplication is undefined', () => {
      expect(() => component.onClick()).not.toThrow();
    });
  });

  describe('handTool input', () => {
    it('should sync handTool input to isSelected', () => {
      fixture.componentRef.setInput('handTool', true);
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(component.isSelected).toBe(true);
    });

    it('should set isSelected to false when handTool is false', () => {
      fixture.componentRef.setInput('handTool', false);
      TestBed.flushEffects();

      expect(component.isSelected).toBe(false);
    });
  });
});
