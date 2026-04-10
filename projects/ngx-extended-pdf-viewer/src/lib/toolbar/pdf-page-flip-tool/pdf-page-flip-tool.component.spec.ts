import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfPageFlipToolComponent } from './pdf-page-flip-tool.component';
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
    inputs: ['title', 'primaryToolbarId', 'cssClass', 'l10nId', 'l10nLabel', 'order', 'action', 'toggled', 'closeOnClick', 'image', 'disabled'],
    standalone: false
})
class MockPdfShyButtonComponent {
  disabled: any;
}

describe('PdfPageFlipToolComponent', () => {
  let component: PdfPageFlipToolComponent;
  let fixture: ComponentFixture<PdfPageFlipToolComponent>;
  let eventBus: SignalAwareEventBus;
  let mockPDFViewerApplication: any;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = { eventBus } as any;
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [
        PdfPageFlipToolComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } }
      ]
    });

    fixture = TestBed.createComponent(PdfPageFlipToolComponent);
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
      expect(component.showPageFlipButton()).toBe(false);
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

      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.PAGE_FLIP });
      expect(component.isSelected).toBe(true);

      component.ngOnDestroy();
      component.isSelected = false;

      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.PAGE_FLIP });
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

      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.PAGE_FLIP });
      expect(component.isSelected).toBe(true);
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

    it('should set isSelected to true when tool is PAGE_FLIP', () => {
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.PAGE_FLIP });
      expect(component.isSelected).toBe(true);
    });

    it('should set isSelected to false when tool is SELECT', () => {
      component.isSelected = true;
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.SELECT });
      expect(component.isSelected).toBe(false);
    });

    it('should set isSelected to false when tool is HAND', () => {
      component.isSelected = true;
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.HAND });
      expect(component.isSelected).toBe(false);
    });

    it('should set isSelected to false when tool is ZOOM', () => {
      component.isSelected = true;
      eventBus.dispatch('cursortoolchanged', { tool: PdfCursorTools.ZOOM });
      expect(component.isSelected).toBe(false);
    });
  });

  describe('onClick', () => {
    it('should dispatch switchcursortool with PAGE_FLIP tool', () => {
      initPdfViewer();
      component.onClick();

      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchcursortool',
        { tool: PdfCursorTools.PAGE_FLIP }
      );
    });

    it('should not throw when PDFViewerApplication is undefined', () => {
      expect(() => component.onClick()).not.toThrow();
    });
  });

  describe('disable input', () => {
    it('should default disable to false', () => {
      expect(component.disable()).toBe(false);
    });

    it('should accept disable input set to true', () => {
      fixture.componentRef.setInput('disable', true);
      TestBed.flushEffects();
      expect(component.disable()).toBe(true);
    });

    it('should pass disabled to the template when disable is true', () => {
      fixture.componentRef.setInput('disable', true);
      fixture.detectChanges();
      const shyButton = fixture.debugElement.children[0].componentInstance;
      expect(shyButton.disabled).toBe(true);
    });

    it('should pass disabled=false when disable is false', () => {
      fixture.componentRef.setInput('disable', false);
      fixture.detectChanges();
      const shyButton = fixture.debugElement.children[0].componentInstance;
      expect(shyButton.disabled).toBe(false);
    });
  });
});
