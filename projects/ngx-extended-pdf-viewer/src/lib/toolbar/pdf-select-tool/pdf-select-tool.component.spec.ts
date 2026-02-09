import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfSelectToolComponent } from './pdf-select-tool.component';
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

describe('PdfSelectToolComponent', () => {
  let component: PdfSelectToolComponent;
  let fixture: ComponentFixture<PdfSelectToolComponent>;
  let eventBus: SignalAwareEventBus;
  let mockPDFViewerApplication: any;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = { eventBus } as any;
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [
        PdfSelectToolComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } }
      ]
    });

    fixture = TestBed.createComponent(PdfSelectToolComponent);
    component = fixture.componentInstance;
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
      expect(component.showSelectToolButton()).toBe(true);
      expect(component.isSelected).toBe(true);
      expect(component.handTool()).toBe(false);
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
      expect(component.isSelected).toBe(false);

      component.ngOnDestroy();
      component.isSelected = true;

      // Handler must NOT fire after destroy
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.HAND });
      expect(component.isSelected).toBe(true);
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
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.SELECT });
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

    it('should set isSelected true when tool is SELECT', () => {
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.SELECT });
      expect(component.isSelected).toBe(true);
    });

    it('should set isSelected false when tool is HAND', () => {
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.HAND });
      expect(component.isSelected).toBe(false);
    });

    it('should set isSelected false when tool is ZOOM', () => {
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.ZOOM });
      expect(component.isSelected).toBe(false);
    });
  });

  describe('onClick', () => {
    it('should dispatch switchcursortool with SELECT', () => {
      initPdfViewer();

      component.onClick();
      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchcursortool',
        { tool: PdfCursorTools.SELECT }
      );
    });

    it('should not throw when PDFViewerApplication is undefined', () => {
      expect(() => component.onClick()).not.toThrow();
    });
  });

  describe('handTool effect', () => {
    it('should sync isSelected with inverse of handTool input', () => {
      fixture.componentRef.setInput('handTool', true);
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();
      expect(component.isSelected).toBe(false);

      fixture.componentRef.setInput('handTool', false);
      fixture.detectChanges();
      TestBed.flushEffects();
      fixture.detectChanges();
      expect(component.isSelected).toBe(true);
    });
  });

  describe('input properties', () => {
    it('should accept showSelectToolButton input', () => {
      fixture.componentRef.setInput('showSelectToolButton', false);
      TestBed.flushEffects();
      expect(component.showSelectToolButton()).toBe(false);
    });

    it('should accept showSelectToolButton with ResponsiveVisibility value', () => {
      fixture.componentRef.setInput('showSelectToolButton', 'xxs');
      TestBed.flushEffects();
      expect(component.showSelectToolButton()).toBe('xxs');
    });
  });

  describe('edge cases', () => {
    it('should handle PDF viewer application being undefined', () => {
      const undefinedSignal = signal<IPDFViewerApplication | undefined>(undefined);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        declarations: [
          PdfSelectToolComponent,
          MockResponsiveCSSClassPipe,
          MockPdfShyButtonComponent
        ],
        providers: [
          { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: undefinedSignal } }
        ]
      });

      expect(() => {
        TestBed.createComponent(PdfSelectToolComponent);
        TestBed.flushEffects();
      }).not.toThrow();
    });
  });
});
