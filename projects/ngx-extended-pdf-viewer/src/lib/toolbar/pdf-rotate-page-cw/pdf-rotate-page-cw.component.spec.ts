import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfRotatePageCwComponent } from './pdf-rotate-page-cw.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { UpdateUIStateEvent } from '../../events/update-ui-state-event';
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
class MockPdfShyButtonComponent {}

describe('PdfRotatePageCwComponent', () => {
  let component: PdfRotatePageCwComponent;
  let fixture: ComponentFixture<PdfRotatePageCwComponent>;
  let eventBus: SignalAwareEventBus;
  let mockPDFViewerApplication: any;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = { eventBus } as any;
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [
        PdfRotatePageCwComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } }
      ]
    });

    fixture = TestBed.createComponent(PdfRotatePageCwComponent);
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
      expect(component.showRotateCwButton()).toBe(true);
      expect(component.disableRotate).toBe(true);
      expect(component.clockwise()).toBe(true);
      expect(component.counterClockwise()).toBe(true);
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
      eventBus.dispatch('updateuistate', { pageNumber: 1, pagesCount: 10, source: {}, widget: 'Toolbar' });
      expect(component.disableRotate).toBe(false);

      component.ngOnDestroy();
      component.disableRotate = true;

      // Handler must NOT fire after destroy
      eventBus.dispatch('updateuistate', { pageNumber: 1, pagesCount: 10, source: {}, widget: 'Toolbar' });
      expect(component.disableRotate).toBe(true);
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
      eventBus.dispatch('updateuistate', { pageNumber: 1, pagesCount: 10, source: {}, widget: 'Toolbar' });
      expect(component.disableRotate).toBe(false);
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

    it('should disable rotate when pagesCount is 0', () => {
      eventBus.dispatch('updateuistate', { pageNumber: 0, pagesCount: 0, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disableRotate).toBe(true);
    });

    it('should enable rotate when pagesCount is greater than 0', () => {
      eventBus.dispatch('updateuistate', { pageNumber: 1, pagesCount: 10, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disableRotate).toBe(false);
    });
  });

  describe('updateUIState', () => {
    it('should set disableRotate based on pagesCount being 0', () => {
      component.updateUIState({ pageNumber: 0, pagesCount: 0, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disableRotate).toBe(true);

      component.updateUIState({ pageNumber: 1, pagesCount: 5, source: {}, widget: 'Toolbar' } as UpdateUIStateEvent);
      expect(component.disableRotate).toBe(false);
    });
  });

  describe('rotateCW', () => {
    it('should dispatch rotatecw event', () => {
      initPdfViewer();

      component.rotateCW();
      expect(eventBus.dispatch).toHaveBeenCalledWith('rotatecw');
    });

    it('should not throw when PDFViewerApplication is undefined', () => {
      expect(() => component.rotateCW()).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle PDF viewer application being undefined', () => {
      const undefinedSignal = signal<IPDFViewerApplication | undefined>(undefined);

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        declarations: [
          PdfRotatePageCwComponent,
          MockResponsiveCSSClassPipe,
          MockPdfShyButtonComponent
        ],
        providers: [
          { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: undefinedSignal } }
        ]
      });

      expect(() => {
        TestBed.createComponent(PdfRotatePageCwComponent);
        TestBed.flushEffects();
      }).not.toThrow();
    });
  });
});
