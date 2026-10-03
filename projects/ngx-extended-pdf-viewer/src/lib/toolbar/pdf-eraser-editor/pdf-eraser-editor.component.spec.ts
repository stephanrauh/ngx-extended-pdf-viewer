import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfEraserEditorComponent } from './pdf-eraser-editor.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { FocusManagementService } from '../../focus-management.service';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../testing/signal-aware-event-bus';

const positionPopupBelowItsButton = jest.fn();
jest.mock('../../dynamic-css/positioning.service', () => ({
  PositioningService: jest.fn().mockImplementation(() => ({
    positionPopupBelowItsButton: (...args: unknown[]) => positionPopupBelowItsButton(...args),
  })),
}));

@Pipe({ name: 'responsiveCSSClass', standalone: false })
class MockResponsiveCSSClassPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Component({
  selector: 'pdf-shy-button',
  template: '<ng-content></ng-content>',
  inputs: ['title', 'primaryToolbarId', 'cssClass', 'l10nId', 'l10nLabel', 'role', 'ariaHasPopup', 'ariaControls', 'order', 'action', 'toggled', 'closeOnClick', 'image', 'disabled'],
  standalone: false,
})
class MockPdfShyButtonComponent {}

describe('PdfEraserEditorComponent (stephanrauh/pdf.js#14)', () => {
  let component: PdfEraserEditorComponent;
  let fixture: ComponentFixture<PdfEraserEditorComponent>;
  let mockPDFViewerApplication: any;
  let eventBus: SignalAwareEventBus;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;
  let focusManagement: { moveFocusToDialog: jest.Mock; returnFocusToPrevious: jest.Mock };

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = {
      eventBus,
      pdfViewer: { annotationEditorMode: AnnotationEditorType.NONE },
    };
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);
    focusManagement = { moveFocusToDialog: jest.fn(), returnFocusToPrevious: jest.fn() };

    TestBed.configureTestingModule({
      declarations: [PdfEraserEditorComponent, MockResponsiveCSSClassPipe, MockPdfShyButtonComponent],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } },
        { provide: FocusManagementService, useValue: focusManagement },
      ],
    });

    fixture = TestBed.createComponent(PdfEraserEditorComponent);
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

  it('uses the editor type 103, like the fork', () => {
    expect(AnnotationEditorType.ERASER).toBe(103);
  });

  it('is selected while the eraser mode is active, and only then', () => {
    jest.useFakeTimers();
    initPdfViewer();

    eventBus.dispatch('annotationeditormodechanged', { mode: AnnotationEditorType.ERASER });
    jest.advanceTimersByTime(1);
    expect(component.isSelected).toBe(true);
    expect(focusManagement.moveFocusToDialog).toHaveBeenCalledWith('editorEraserParamsToolbar', expect.any(String), 'primaryEditorEraser');

    eventBus.dispatch('annotationeditormodechanged', { mode: AnnotationEditorType.INK });
    jest.advanceTimersByTime(1);
    expect(component.isSelected).toBe(false);
    expect(focusManagement.returnFocusToPrevious).toHaveBeenCalled();
  });

  it('switches to the eraser mode on click and opens its thickness slider', () => {
    initPdfViewer();
    const dispatch = jest.spyOn(eventBus, 'dispatch');

    component.onClick();

    expect(dispatch).toHaveBeenCalledWith('switchannotationeditormode', expect.objectContaining({ mode: AnnotationEditorType.ERASER }));
    expect(positionPopupBelowItsButton).toHaveBeenCalledWith('primaryEditorEraser', 'editorEraserParamsToolbar');
  });

  it('leaves the eraser mode when clicked while erasing', () => {
    initPdfViewer();
    mockPDFViewerApplication.pdfViewer.annotationEditorMode = AnnotationEditorType.ERASER;
    const dispatch = jest.spyOn(eventBus, 'dispatch');

    component.onClick();

    expect(dispatch).toHaveBeenCalledWith('switchannotationeditormode', expect.objectContaining({ mode: AnnotationEditorType.NONE }));
  });

  it('stops listening after ngOnDestroy', () => {
    jest.useFakeTimers();
    initPdfViewer();
    component.ngOnDestroy();

    eventBus.dispatch('annotationeditormodechanged', { mode: AnnotationEditorType.ERASER });
    jest.advanceTimersByTime(1);
    expect(component.isSelected).toBe(false);
  });
});
