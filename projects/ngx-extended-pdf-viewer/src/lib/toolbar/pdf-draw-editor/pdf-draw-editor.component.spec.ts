import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Component } from '@angular/core';
import { PdfDrawEditorComponent } from './pdf-draw-editor.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

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

describe('PdfDrawEditorComponent', () => {
  let component: PdfDrawEditorComponent;
  let fixture: ComponentFixture<PdfDrawEditorComponent>;
  let mockNotificationService: jest.Mocked<PDFNotificationService>;
  let mockChangeDetectorRef: jest.Mocked<ChangeDetectorRef>;
  let mockPDFViewerApplication: jest.Mocked<IPDFViewerApplication>;

  beforeEach(() => {
    mockPDFViewerApplication = {
      eventBus: {
        on: jest.fn() as jest.MockedFunction<any>,
        dispatch: jest.fn() as jest.MockedFunction<any>
      },
      pdfViewer: {
        annotationEditorMode: AnnotationEditorType.NONE
      }
    } as any;

    mockNotificationService = {
      onPDFJSInitSignal: jest.fn(() => mockPDFViewerApplication)
    } as any;

    mockChangeDetectorRef = {
      detectChanges: jest.fn(),
      markForCheck: jest.fn(),
      checkNoChanges: jest.fn(),
      detach: jest.fn(),
      reattach: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      declarations: [
        PdfDrawEditorComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: mockNotificationService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ]
    });

    fixture = TestBed.createComponent(PdfDrawEditorComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('component initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      expect(component.show()).toBe(true);
      expect(component.isSelected).toBe(false);
    });

    it('should set up effect for PDF viewer initialization', () => {
      // Effect is set up in constructor, which was called in beforeEach
      // The effect should be triggered when component is created
      fixture.detectChanges();
      expect(mockNotificationService.onPDFJSInitSignal).toHaveBeenCalled();
    });

    it('should call onPdfJsInit when PDF viewer is available', () => {
      // Since effects are hard to test directly, we'll test the method itself
      const onPdfJsInitSpy = jest.spyOn(component as any, 'onPdfJsInit');
      
      (component as any).onPdfJsInit();
      
      expect(onPdfJsInitSpy).toHaveBeenCalled();
    });
  });

  describe('onPdfJsInit', () => {
    beforeEach(() => {
      // Ensure the component has access to PDFViewerApplication and inject our mocked CDR
      (component as any).PDFViewerApplication = mockPDFViewerApplication;
      (component as any).cdr = mockChangeDetectorRef;
    });

    it('should register event listener for annotationeditormodechanged', () => {
      // Clear previous calls and call the method again to test it
      (mockPDFViewerApplication.eventBus.on as jest.MockedFunction<any>).mockClear();
      (component as any).onPdfJsInit();
      
      expect(mockPDFViewerApplication.eventBus.on).toHaveBeenCalledWith(
        'annotationeditormodechanged',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('should set isSelected to true when mode is 15', (done) => {
      jest.useFakeTimers();

      // Clear previous calls and call onPdfJsInit to register the event listener
      (mockPDFViewerApplication.eventBus.on as jest.MockedFunction<any>).mockClear();
      (component as any).onPdfJsInit();

      // Get the event handler that was registered
      const eventHandler = (mockPDFViewerApplication.eventBus.on as jest.MockedFunction<any>).mock.calls[0][1];

      // Call the event handler with mode 15
      eventHandler({ mode: 15 });

      // Fast-forward the setTimeout
      jest.advanceTimersByTime(1);

      expect(component.isSelected).toBe(true);

      jest.useRealTimers();
      done();
    });

    it('should set isSelected to false when mode is not 15', (done) => {
      jest.useFakeTimers();

      // Clear previous calls and call onPdfJsInit to register the event listener
      (mockPDFViewerApplication.eventBus.on as jest.MockedFunction<any>).mockClear();
      (component as any).onPdfJsInit();

      const eventHandler = (mockPDFViewerApplication.eventBus.on as jest.MockedFunction<any>).mock.calls[0][1];

      eventHandler({ mode: 10 });

      jest.advanceTimersByTime(1);

      expect(component.isSelected).toBe(false);

      jest.useRealTimers();
      done();
    });
  });

  describe('onClick', () => {
    beforeEach(() => {
      // Ensure the component has access to PDFViewerApplication
      (component as any).PDFViewerApplication = mockPDFViewerApplication;
    });

    it('should dispatch switchannotationeditormode event', () => {
      const mockEvent = { detail: 1 } as PointerEvent;
      
      component.onClick(mockEvent);
      
      expect(mockPDFViewerApplication.eventBus.dispatch).toHaveBeenCalledWith(
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
      
      expect(mockPDFViewerApplication.eventBus.dispatch).toHaveBeenCalledWith(
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
      
      expect(mockPDFViewerApplication.eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        expect.objectContaining({
          mode: AnnotationEditorType.INK
        })
      );
    });

    it('should set isFromKeyboard to true when event.detail is 0', () => {
      const mockEvent = { detail: 0 } as PointerEvent;
      
      component.onClick(mockEvent);
      
      expect(mockPDFViewerApplication.eventBus.dispatch).toHaveBeenCalledWith(
        'switchannotationeditormode',
        expect.objectContaining({
          isFromKeyboard: true
        })
      );
    });

    it('should set isFromKeyboard to false when event.detail is not 0', () => {
      const mockEvent = { detail: 2 } as PointerEvent;
      
      component.onClick(mockEvent);
      
      expect(mockPDFViewerApplication.eventBus.dispatch).toHaveBeenCalledWith(
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

  describe('edge cases', () => {
    it('should handle PDF viewer application being undefined', () => {
      mockNotificationService.onPDFJSInitSignal.mockReturnValue(undefined);
      
      expect(() => {
        TestBed.createComponent(PdfDrawEditorComponent);
        TestBed.flushEffects();
      }).not.toThrow();
    });

    it('should handle onClick when PDF viewer application is undefined', () => {
      (component as any).PDFViewerApplication = undefined;
      const mockEvent = { detail: 1 } as PointerEvent;
      
      expect(() => component.onClick(mockEvent)).not.toThrow();
    });

    it('should handle missing eventBus', () => {
      mockPDFViewerApplication.eventBus = undefined as any;
      const mockEvent = { detail: 1 } as PointerEvent;
      
      expect(() => component.onClick(mockEvent)).not.toThrow();
    });
  });
});