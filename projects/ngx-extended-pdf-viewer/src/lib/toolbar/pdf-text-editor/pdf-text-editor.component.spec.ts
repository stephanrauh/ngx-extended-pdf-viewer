import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, signal } from '@angular/core';
import { Component } from '@angular/core';
import { PdfTextEditorComponent } from './pdf-text-editor.component';
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
    inputs: ['title', 'primaryToolbarId', 'cssClass', 'l10nId', 'l10nLabel', 'order', 'action', 'toggled', 'closeOnClick', 'image'],
    standalone: false
})
class MockPdfShyButtonComponent {
  title: any;
  primaryToolbarId: any;
  cssClass: any;
  l10nId: any;
  l10nLabel: any;
  order: any;
  action: any;
  toggled: any;
  closeOnClick: any;
  image: any;
}

describe('PdfTextEditorComponent', () => {
  let component: PdfTextEditorComponent;
  let fixture: ComponentFixture<PdfTextEditorComponent>;
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
        PdfTextEditorComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } },
        { provide: FocusManagementService, useValue: { moveFocusToDialog: jest.fn(), returnFocusToPrevious: jest.fn() } }
      ]
    });

    fixture = TestBed.createComponent(PdfTextEditorComponent);
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
      eventBus.dispatch('annotationeditormodechanged', { mode: 3 });
      jest.advanceTimersByTime(1);
      expect(component.isSelected).toBe(true);

      // Destroy the component
      component.ngOnDestroy();
      component.isSelected = false;

      // Dispatch again -> handler should NOT fire
      eventBus.dispatch('annotationeditormodechanged', { mode: 3 });
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

      eventBus.dispatch('annotationeditormodechanged', { mode: 3 });
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
    it('should set isSelected when mode matches FREETEXT (3)', () => {
      jest.useFakeTimers();
      initPdfViewer();

      eventBus.dispatch('annotationeditormodechanged', { mode: 3 });
      jest.advanceTimersByTime(1);
      expect(component.isSelected).toBe(true);
    });

    it('should unset isSelected when mode does not match', () => {
      jest.useFakeTimers();
      initPdfViewer();
      component.isSelected = true;

      eventBus.dispatch('annotationeditormodechanged', { mode: 0 });
      jest.advanceTimersByTime(1);
      expect(component.isSelected).toBe(false);
    });
  });

  describe('onClick', () => {
    beforeEach(() => {
      initPdfViewer();
    });

    it('should dispatch switchannotationeditormode', () => {
      component.onClick({ detail: 1 } as any);
      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        expect.objectContaining({ mode: AnnotationEditorType.FREETEXT })
      );
    });

    it('should toggle to NONE when already in FREETEXT mode', () => {
      mockPDFViewerApplication.pdfViewer.annotationEditorMode = AnnotationEditorType.FREETEXT;
      component.onClick({ detail: 1 } as any);
      expect(eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        expect.objectContaining({ mode: AnnotationEditorType.NONE })
      );
    });
  });
});
