import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfPreviousPageComponent } from './pdf-previous-page.component';
import { PDFNotificationService } from '../../../pdf-notification-service';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../../testing/signal-aware-event-bus';

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
class MockPdfShyButtonComponent {}

describe('PdfPreviousPageComponent', () => {
  let component: PdfPreviousPageComponent;
  let fixture: ComponentFixture<PdfPreviousPageComponent>;
  let eventBus: SignalAwareEventBus;
  let mockPDFViewerApplication: any;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = { eventBus } as any;
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [
        PdfPreviousPageComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } }
      ]
    });

    fixture = TestBed.createComponent(PdfPreviousPageComponent);
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
      expect(component.show()).toBe(true);
      expect(component.disablePreviousPage).toBe(true);
    });
  });

  describe('AbortController lifecycle (#3135)', () => {
    it('should register updateuistate via the real effect/signal path', () => {
      initPdfViewer();

      expect(eventBus.on).toHaveBeenCalledWith(
        'updateuistate',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('should unsubscribe handler on ngOnDestroy so it stops firing', () => {
      initPdfViewer();

      // Handler fires before destroy
      eventBus.dispatch('updateuistate', { pageNumber: 5, pagesCount: 10, source: {}, widget: 'Toolbar' });
      expect(component.disablePreviousPage).toBe(false);

      component.ngOnDestroy();
      component.disablePreviousPage = true;

      // Handler must NOT fire after destroy
      eventBus.dispatch('updateuistate', { pageNumber: 5, pagesCount: 10, source: {}, widget: 'Toolbar' });
      expect(component.disablePreviousPage).toBe(true);
    });

    it('should replace the listener on re-init (no duplicates)', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('updateuistate')).toBe(1);

      reInitPdfViewer();
      expect(eventBus.getListenerCount('updateuistate')).toBe(1);
    });

    it('should not fire old handler after re-init', () => {
      initPdfViewer();
      const firstOnCalls = eventBus.on.mock.calls.length;

      reInitPdfViewer();

      // Dispatch should reach only the NEW handler
      eventBus.dispatch('updateuistate', { pageNumber: 5, pagesCount: 10, source: {}, widget: 'Toolbar' });
      expect(component.disablePreviousPage).toBe(false);
      // And the bus registered a second listener (old one removed via abort)
      expect(eventBus.on.mock.calls.length).toBe(firstOnCalls + 1);
    });

    it('should not throw on ngOnDestroy when controller is null', () => {
      (component as any).eventBusAbortController = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('updateuistate handler', () => {
    beforeEach(() => {
      initPdfViewer();
    });

    it('should disable previous page when pageNumber is 1', () => {
      eventBus.dispatch('updateuistate', { pageNumber: 1, pagesCount: 10, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disablePreviousPage).toBe(true);
    });

    it('should enable previous page when pageNumber is greater than 1', () => {
      eventBus.dispatch('updateuistate', { pageNumber: 5, pagesCount: 10, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disablePreviousPage).toBe(false);
    });

    it('should disable previous page when pageNumber is 0', () => {
      eventBus.dispatch('updateuistate', { pageNumber: 0, pagesCount: 10, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disablePreviousPage).toBe(true);
    });
  });

  describe('updateUIState', () => {
    it('should set disablePreviousPage based on pageNumber', () => {
      component.updateUIState({ pageNumber: 1, pagesCount: 10, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disablePreviousPage).toBe(true);

      component.updateUIState({ pageNumber: 2, pagesCount: 10, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disablePreviousPage).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle PDF viewer application being undefined', () => {
      const undefinedSignal = signal<IPDFViewerApplication | undefined>(undefined);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        declarations: [
          PdfPreviousPageComponent,
          MockResponsiveCSSClassPipe,
          MockPdfShyButtonComponent
        ],
        providers: [
          { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: undefinedSignal } }
        ]
      });

      expect(() => {
        TestBed.createComponent(PdfPreviousPageComponent);
        TestBed.flushEffects();
      }).not.toThrow();
    });
  });
});
