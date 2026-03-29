import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, signal } from '@angular/core';
import { Component } from '@angular/core';
import { PdfDrawEditorComponent } from './pdf-draw-editor.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { FocusManagementService } from '../../focus-management.service';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../testing/signal-aware-event-bus';

// Mock PositioningService
jest.mock('../../dynamic-css/positioning.service', () => ({
  PositioningService: jest.fn().mockImplementation(() => ({
    positionPopupBelowItsButton: jest.fn()
  }))
}));

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
class MockPdfShyButtonComponent {
  title: any;
  primaryToolbarId: any;
  disabled: any;
  cssClass: any;
  l10nId: any;
  l10nLabel: any;
  order: any;
  action: any;
  toggled: any;
  closeOnClick: any;
  image: any;
}

describe('PdfDrawEditorComponent', () => {
  let component: PdfDrawEditorComponent;
  let fixture: ComponentFixture<PdfDrawEditorComponent>;
  let mockPDFViewerApplication: any;
  let eventBus: SignalAwareEventBus;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = {
      eventBus,
      pdfViewer: {
        annotationEditorMode: AnnotationEditorType.NONE
      }
    } as any;

    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [
        PdfDrawEditorComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } },
        { provide: FocusManagementService, useValue: { moveFocusToDialog: jest.fn(), returnFocusToPrevious: jest.fn() } }
      ]
    });

    fixture = TestBed.createComponent(PdfDrawEditorComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.useRealTimers();
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
      expect(component.isSelected).toBe(false);
    });

    it('should set up effect for PDF viewer initialization', () => {
      fixture.detectChanges();
      // The signal should be readable (not throw)
      expect(pdfAppSignal()).toBeUndefined();
    });
  });

  describe('AbortController lifecycle (#3135)', () => {
    it('should register annotationeditormodechanged via the real effect/signal path', () => {
      initPdfViewer();
      expect(eventBus.on).toHaveBeenCalledWith(
        'annotationeditormodechanged',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('should unsubscribe handler on ngOnDestroy so it stops firing', () => {
      jest.useFakeTimers();
      initPdfViewer();

      // Dispatch matching mode -> isSelected becomes true
      eventBus.dispatch('annotationeditormodechanged', { mode: 15 });
      jest.advanceTimersByTime(1);
      expect(component.isSelected).toBe(true);

      // Destroy the component
      component.ngOnDestroy();
      component.isSelected = false;

      // Dispatch again -> handler should NOT fire
      eventBus.dispatch('annotationeditormodechanged', { mode: 15 });
      jest.advanceTimersByTime(1);
      expect(component.isSelected).toBe(false);
    });

    it('should replace the listener on re-init (no duplicates)', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('annotationeditormodechanged')).toBe(1);

      reInitPdfViewer();
      expect(eventBus.getListenerCount('annotationeditormodechanged')).toBe(1);
    });

    it('should not fire old handler after re-init', () => {
      jest.useFakeTimers();
      initPdfViewer();

      reInitPdfViewer();

      eventBus.dispatch('annotationeditormodechanged', { mode: 15 });
      jest.advanceTimersByTime(1);
      expect(component.isSelected).toBe(true);

      // Only one listener should have been active
      expect(eventBus.getListenerCount('annotationeditormodechanged')).toBe(1);
    });

    it('should not throw on ngOnDestroy when controller is null', () => {
      (component as any).eventBusAbortController = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('annotationeditormodechanged handler', () => {
    it('should set isSelected to true when mode is 15', () => {
      jest.useFakeTimers();
      initPdfViewer();

      eventBus.dispatch('annotationeditormodechanged', { mode: 15 });
      jest.advanceTimersByTime(1);
      expect(component.isSelected).toBe(true);
    });

    it('should set isSelected to false when mode is not 15', () => {
      jest.useFakeTimers();
      initPdfViewer();

      eventBus.dispatch('annotationeditormodechanged', { mode: 10 });
      jest.advanceTimersByTime(1);
      expect(component.isSelected).toBe(false);
    });
  });

  describe('onClick', () => {
    beforeEach(() => {
      initPdfViewer();
    });

    it('should dispatch switchannotationeditormode event', () => {
      const mockEvent = { detail: 1 } as PointerEvent;

      component.onClick(mockEvent);

      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        {
          source: component,
          mode: AnnotationEditorType.INK,
          isFromKeyboard: false
        }
      );
    });

    it('should toggle from INK mode to NONE mode', () => {
      mockPDFViewerApplication.pdfViewer.annotationEditorMode = AnnotationEditorType.INK;
      const mockEvent = { detail: 1 } as PointerEvent;

      component.onClick(mockEvent);

      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        expect.objectContaining({
          mode: AnnotationEditorType.NONE
        })
      );
    });

    it('should toggle from other mode to INK mode', () => {
      mockPDFViewerApplication.pdfViewer.annotationEditorMode = AnnotationEditorType.FREETEXT;
      const mockEvent = { detail: 1 } as PointerEvent;

      component.onClick(mockEvent);

      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        expect.objectContaining({
          mode: AnnotationEditorType.INK
        })
      );
    });

    it('should set isFromKeyboard to true when event.detail is 0', () => {
      const mockEvent = { detail: 0 } as PointerEvent;

      component.onClick(mockEvent);

      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        expect.objectContaining({
          isFromKeyboard: true
        })
      );
    });

    it('should set isFromKeyboard to false when event.detail is not 0', () => {
      const mockEvent = { detail: 2 } as PointerEvent;

      component.onClick(mockEvent);

      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        expect.objectContaining({
          isFromKeyboard: false
        })
      );
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

  describe('disable input (#2818)', () => {
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
      // The template binds [disabled]="disable()" on pdf-shy-button
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

  describe('edge cases', () => {
    it('should handle PDF viewer application being undefined', () => {
      // pdfAppSignal is already undefined by default, just flush effects
      fixture.detectChanges();
      TestBed.flushEffects();
      expect(component.isSelected).toBe(false);
    });

    it('should handle onClick when PDF viewer application is undefined', () => {
      // Don't call initPdfViewer, so PDFViewerApplication is undefined
      const mockEvent = { detail: 1 } as PointerEvent;

      expect(() => component.onClick(mockEvent)).not.toThrow();
    });

    it('should handle missing eventBus by throwing (no optional chaining on eventBus)', () => {
      initPdfViewer();
      mockPDFViewerApplication.eventBus = undefined as any;
      const mockEvent = { detail: 1 } as PointerEvent;

      // The component uses `this.PDFViewerApplication?.eventBus.dispatch(...)`,
      // which guards PDFViewerApplication but not eventBus itself.
      expect(() => component.onClick(mockEvent)).toThrow();
    });
  });
});
