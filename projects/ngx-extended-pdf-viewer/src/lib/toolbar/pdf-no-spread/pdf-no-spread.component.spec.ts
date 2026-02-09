import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfNoSpreadComponent } from './pdf-no-spread.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { ScrollModeType } from '../../options/pdf-viewer';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../testing/signal-aware-event-bus';

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

describe('PdfNoSpreadComponent', () => {
  let component: PdfNoSpreadComponent;
  let fixture: ComponentFixture<PdfNoSpreadComponent>;
  let mockChangeDetectorRef: jest.Mocked<ChangeDetectorRef>;
  let mockPDFViewerApplication: any;
  let eventBus: SignalAwareEventBus;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    mockPDFViewerApplication = {
      eventBus,
      pdfViewer: {
        spreadMode: 1
      }
    } as any;

    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    mockChangeDetectorRef = {
      detectChanges: jest.fn(),
      markForCheck: jest.fn(),
      checkNoChanges: jest.fn(),
      detach: jest.fn(),
      reattach: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      declarations: [
        PdfNoSpreadComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ]
    });

    fixture = TestBed.createComponent(PdfNoSpreadComponent);
    component = fixture.componentInstance;
    // scrollMode is a required input
    fixture.componentRef.setInput('scrollMode', ScrollModeType.vertical);
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
      expect(component.show()).toBe(true);
      expect(component.spread).toBe('off');
    });
  });

  describe('AbortController lifecycle (#3135)', () => {
    it('should register spreadmodechanged via the real effect/signal path', () => {
      initPdfViewer();

      expect(eventBus.on).toHaveBeenCalledWith(
        'spreadmodechanged',
        expect.any(Function),
        expect.objectContaining({ signal: expect.any(AbortSignal) })
      );
    });

    it('should unsubscribe handler on ngOnDestroy so it stops firing', async () => {
      initPdfViewer();

      eventBus.dispatch('spreadmodechanged', { mode: 1 });
      await new Promise<void>(r => queueMicrotask(r));
      expect(component.spread).toBe('odd');

      component.ngOnDestroy();

      // Reset to a known state
      component.spread = 'off';
      eventBus.dispatch('spreadmodechanged', { mode: 2 });
      await new Promise<void>(r => queueMicrotask(r));

      // Handler should not have fired since listener was removed
      expect(component.spread).toBe('off');
    });

    it('should replace the listener on re-init (no duplicates)', () => {
      initPdfViewer();
      expect(eventBus.getListenerCount('spreadmodechanged')).toBe(1);

      reInitPdfViewer();
      expect(eventBus.getListenerCount('spreadmodechanged')).toBe(1);
    });

    it('should not fire old handler after re-init', async () => {
      initPdfViewer();

      // Dispatch before re-init to confirm the handler works
      eventBus.dispatch('spreadmodechanged', { mode: 1 });
      await new Promise<void>(r => queueMicrotask(r));
      expect(component.spread).toBe('odd');

      // Re-init replaces the handler
      reInitPdfViewer();

      // Dispatch after re-init: only the new handler should fire
      eventBus.dispatch('spreadmodechanged', { mode: 2 });
      await new Promise<void>(r => queueMicrotask(r));
      expect(component.spread).toBe('even');

      // Confirm only 1 listener is active
      expect(eventBus.getListenerCount('spreadmodechanged')).toBe(1);
    });

    it('should not throw on ngOnDestroy when controller is null', () => {
      (component as any).eventBusAbortController = null;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('spreadmodechanged handler', () => {
    beforeEach(() => {
      initPdfViewer();
    });

    it('should set spread to "off" for mode 0', async () => {
      eventBus.dispatch('spreadmodechanged', { mode: 0 });
      await new Promise<void>(r => queueMicrotask(r));

      expect(component.spread).toBe('off');
    });

    it('should set spread to "odd" for mode 1', async () => {
      eventBus.dispatch('spreadmodechanged', { mode: 1 });
      await new Promise<void>(r => queueMicrotask(r));

      expect(component.spread).toBe('odd');
    });

    it('should set spread to "even" for mode 2', async () => {
      eventBus.dispatch('spreadmodechanged', { mode: 2 });
      await new Promise<void>(r => queueMicrotask(r));

      expect(component.spread).toBe('even');
    });
  });

  describe('onClick', () => {
    beforeEach(() => {
      initPdfViewer();
    });

    it('should set spreadMode to 0', () => {
      component.onClick();

      expect(mockPDFViewerApplication.pdfViewer.spreadMode).toBe(0);
    });

    it('should not throw when PDFViewerApplication is undefined', () => {
      (component as any).PDFViewerApplication = undefined;

      expect(() => component.onClick()).not.toThrow();
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
      pdfAppSignal.set(undefined);

      expect(() => {
        const newFixture = TestBed.createComponent(PdfNoSpreadComponent);
        newFixture.componentRef.setInput('scrollMode', ScrollModeType.vertical);
        TestBed.flushEffects();
      }).not.toThrow();
    });
  });
});
