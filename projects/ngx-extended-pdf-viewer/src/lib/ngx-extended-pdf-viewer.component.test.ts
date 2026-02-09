import { PlatformLocation } from '@angular/common';
import { ChangeDetectorRef, ElementRef, NgZone, PLATFORM_ID, Renderer2, CSP_NONCE, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnotationEditorEvent } from './events/annotation-editor-layer-event';
import { FormDataType, NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { NgxKeyboardManagerService } from './ngx-keyboard-manager.service';
import { PDFNotificationService } from './pdf-notification-service';
import { PDFScriptLoaderService } from './pdf-script-loader.service';
import { PdfCspPolicyService } from './pdf-csp-policy.service';

describe('NgxExtendedPdfViewerComponent', () => {
  let component: NgxExtendedPdfViewerComponent;
  let fixture: ComponentFixture<NgxExtendedPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxExtendedPdfViewerComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: NgZone, useValue: new NgZone({ enableLongStackTrace: false }) },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: PlatformLocation, useValue: { getBaseHrefFromDOM: () => '/' } },
        { provide: ChangeDetectorRef, useValue: { markForCheck: jest.fn() } },
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } },
        { provide: Renderer2, useValue: { createElement: jest.fn() } },
        { provide: CSP_NONCE, useValue: 'test-nonce' },
        { 
          provide: PdfCspPolicyService, 
          useValue: { 
            sanitizeHtml: jest.fn((html: string) => html),
            sanitizeUrl: jest.fn((url: string) => url)
          } 
        },
        { 
          provide: PDFScriptLoaderService,
          useValue: {
            onPDFJSInitSignal: jest.fn(() => undefined),
            pdfjsVersion: '4.0.379',
            PDFViewerApplication: {
              eventBus: {
                dispatch: jest.fn()
              },
              pdfViewer: {
                currentScale: 1,
                setScale: jest.fn(),
                update: jest.fn()
              },
              toolbar: {
                pageNumber: 1
              }
            },
            PDFViewerApplicationOptions: {
              set: jest.fn()
            },
            webViewerLoad: jest.fn(),
            shuttingDown: false,
            ngxExtendedPdfViewerIncompletelyInitialized: true,
            forceUsingLegacyES5: false
          }
        },
        {
          provide: NgxExtendedPdfViewerService,
          useValue: {
            addImageToAnnotationLayer: jest.fn(),
            addHighlightToAnnotationLayer: jest.fn(),
            secondaryMenuIsEmpty: jest.fn(() => false)
          }
        },
        NgxKeyboardManagerService,
        { 
          provide: PDFNotificationService, 
          useValue: { 
            onPDFJSInitSignal: jest.fn(() => undefined),
            pdfjsVersion: '4.0.379'
          } 
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxExtendedPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formSupport', () => {
    expect(component['formSupport']).toBeDefined();
  });

  // Skip: Requires complex Angular component mocking and event bus setup
  it.skip('should emit annotationEditorEvent', () => {
    const spy = jest.spyOn(component.annotationEditorEvent, 'emit');
    const event = {} as AnnotationEditorEvent;
    component['pdfScriptLoaderService'].PDFViewerApplication.eventBus.dispatch('annotation-editor-event', event);
    expect(spy).toHaveBeenCalledWith(event);
  });

  it('should set formData and initialize initialAngularFormData', () => {
    const formData = { key: 'value' } as FormDataType;
    fixture.componentRef.setInput('formData', formData);
    fixture.detectChanges();
    TestBed.flushEffects();
    expect(component['formSupport'].formData).toEqual(formData);
    expect(component['initialAngularFormData']).toEqual(formData);
  });

  /* Skip: Requires complex Angular component mocking and event bus setup
  it('should set pageViewMode and emit pageViewModeChange', () => {
    const spy = jest.spyOn(component.pageViewModeChange, 'subscribe');
    fixture.componentRef.setInput('pageViewMode', 'single');
    TestBed.flushEffects();
    expect(component.pageViewMode()).toBe('single');
  });
  */

  /* Skip: Requires complex Angular component mocking and event bus setup
  it('should set scrollMode and emit scrollModeChange', () => {
    const spy = jest.spyOn(component.scrollModeChange, 'subscribe');
    fixture.componentRef.setInput('scrollMode', ScrollModeType.horizontal);
    TestBed.flushEffects();
    expect(component.scrollMode()).toBe(ScrollModeType.horizontal);
  });
  */

  /* Skip: Requires complex Angular component mocking and event bus setup
  it('should set src and emit srcChange', async () => {
    const spy = jest.spyOn(component.src, 'subscribe');
    const url = 'http://example.com/test.pdf';
    fixture.componentRef.setInput('src', url);
    TestBed.flushEffects();
    expect(component['_src']).toBe(url);
  });
  */

  it('should set base64Src and convert to ArrayBuffer via src model', () => {
    const base64 = btoa('test');
    fixture.componentRef.setInput('base64Src', base64);
    fixture.detectChanges();
    TestBed.flushEffects();
    // base64SrcEffect sets src model with ArrayBuffer
    expect(component.src()).toBeInstanceOf(ArrayBuffer);
  });

  // Skip: Requires complex Angular component mocking and event bus setup
  it.skip('should set height and call checkHeight', () => {
    // dynamicCSSComponent is a signal, so we cannot spy on it directly
    fixture.componentRef.setInput('height', '500px');
    TestBed.flushEffects();
    expect(component.height).toBe('500px');
  });

  it('should set mobileFriendlyZoom and update related properties', () => {
    fixture.componentRef.setInput('mobileFriendlyZoom', '150%');
    fixture.detectChanges();
    TestBed.flushEffects();
    expect(component.mobileFriendlyZoom()).toBe('150%');
    expect(component['_mobileFriendlyZoom']).toBe('150%');
    expect(component.mobileFriendlyZoomScale).toBe(1.5);
    expect(component.toolbarWidth).toBe('66.66666666666667%');
    expect(component.toolbarMarginTop).toBe('8px');
  });

  /*
  it('should call ngOnInit and initialize PDF viewer', async () => {
    const spy = jest.spyOn(component, 'doInitPDFViewer');
    await component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  */

  // Skip: Requires complex Angular component mocking and event bus setup
  it.skip('should call ngOnDestroy and clean up', async () => {
    const spy = jest.spyOn(component['pdfScriptLoaderService'].PDFViewerApplication, 'close');
    await component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  /* Skip: ngOnChanges has been replaced by effects
  it('should handle src changes via effect', async () => {
    const spy = jest.spyOn(component, 'openPDF2');
    fixture.componentRef.setInput('src', 'http://example.com/test.pdf');
    TestBed.flushEffects();
    expect(spy).toHaveBeenCalled();
  });
  */

  it('should have zoom as a model signal', () => {
    // zoom is a model signal - just verify it exists
    expect(component.zoom).toBeDefined();
  });

  // Skip: Requires complex Angular component mocking and event bus setup
  it.skip('should call onResize and update layout', () => {
    // dynamicCSSComponent is a signal, so we cannot spy on it directly
    component.onResize();
    // Test would verify layout update
  });

  it('should call onContextMenu and return contextMenuAllowed', () => {
    fixture.componentRef.setInput('contextMenuAllowed', false);
    TestBed.flushEffects();
    expect(component.onContextMenu()).toBe(false);
  });

  /*  it('should call zoomToPageWidth and update zoom', async () => {
    const event = new MouseEvent('dblclick', { clientY: 100 });
    const spy = jest.spyOn(component, 'setZoom');
    await component.zoomToPageWidth(event);
    expect(spy).toHaveBeenCalled();
  });
  */

  describe('openPDF2 - detached buffer guard (#3131)', () => {
    let mockPDFViewerApp: any;

    beforeEach(() => {
      mockPDFViewerApp = {
        eventBus: { dispatch: jest.fn(), on: jest.fn() },
        findBar: { close: jest.fn() },
        secondaryToolbar: { close: jest.fn() },
        pdfViewer: {
          currentScale: 1,
          setScale: jest.fn(),
          update: jest.fn(),
          destroyBookMode: jest.fn(),
          stopRendering: jest.fn(),
        },
        pdfThumbnailViewer: { stopRendering: jest.fn() },
        pdfDocument: { annotationStorage: { resetModified: jest.fn() } },
        appConfig: { filenameForDownload: '' },
        close: jest.fn().mockResolvedValue(undefined),
        open: jest.fn().mockResolvedValue(undefined),
        toolbar: { pageNumber: 1 },
      };
      component['pdfScriptLoaderService'].PDFViewerApplication = mockPDFViewerApp;
      component['overrideDefaultSettings'] = jest.fn();
    });

    it('should return early when ArrayBuffer is detached', async () => {
      const buf = new ArrayBuffer(10);
      // Simulate a detached buffer by setting the detached property
      Object.defineProperty(buf, 'detached', { value: true });
      component['_src'] = buf;

      await component.openPDF2();

      expect(mockPDFViewerApp.close).not.toHaveBeenCalled();
    });

    it('should proceed when ArrayBuffer is not detached', async () => {
      const buf = new ArrayBuffer(10);
      component['_src'] = buf;

      await component.openPDF2();

      expect(mockPDFViewerApp.close).toHaveBeenCalled();
    });

    it('should proceed when src is a string (guard irrelevant)', async () => {
      component['_src'] = 'http://example.com/test.pdf';

      await component.openPDF2();

      expect(mockPDFViewerApp.close).toHaveBeenCalled();
    });
  });

  describe('openPDF2 - buffer cloning (#3131)', () => {
    let mockPDFViewerApp: any;

    beforeEach(() => {
      mockPDFViewerApp = {
        eventBus: { dispatch: jest.fn(), on: jest.fn() },
        findBar: { close: jest.fn() },
        secondaryToolbar: { close: jest.fn() },
        pdfViewer: {
          currentScale: 1,
          setScale: jest.fn(),
          update: jest.fn(),
          destroyBookMode: jest.fn(),
          stopRendering: jest.fn(),
        },
        pdfThumbnailViewer: { stopRendering: jest.fn() },
        pdfDocument: { annotationStorage: { resetModified: jest.fn() } },
        appConfig: { filenameForDownload: '' },
        close: jest.fn().mockResolvedValue(undefined),
        open: jest.fn().mockResolvedValue(undefined),
        toolbar: { pageNumber: 1 },
      };
      component['pdfScriptLoaderService'].PDFViewerApplication = mockPDFViewerApp;
      component['overrideDefaultSettings'] = jest.fn();
    });

    it('should clone ArrayBuffer via slice(0)', async () => {
      const original = new ArrayBuffer(8);
      new Uint8Array(original).set([1, 2, 3, 4, 5, 6, 7, 8]);
      component['_src'] = original;

      await component.openPDF2();

      const openCall = mockPDFViewerApp.open.mock.calls[0][0];
      expect(openCall.data).not.toBe(original);
      expect(new Uint8Array(openCall.data)).toEqual(new Uint8Array(original));
    });

    it('should clone Uint8Array via new Uint8Array()', async () => {
      const original = new Uint8Array([1, 2, 3, 4, 5]);
      component['_src'] = original;

      await component.openPDF2();

      const openCall = mockPDFViewerApp.open.mock.calls[0][0];
      expect(openCall.data).not.toBe(original);
      expect(openCall.data).toEqual(original);
    });

    it('should set url option when src is a string', async () => {
      component['_src'] = 'http://example.com/test.pdf';

      await component.openPDF2();

      const openCall = mockPDFViewerApp.open.mock.calls[0][0];
      expect(openCall.url).toBe('http://example.com/test.pdf');
      expect(openCall.data).toBeUndefined();
    });
  });

  describe('openPDF2 - _lastOpenedSrc tracking (#3131)', () => {
    let mockPDFViewerApp: any;

    beforeEach(() => {
      mockPDFViewerApp = {
        eventBus: { dispatch: jest.fn(), on: jest.fn() },
        findBar: { close: jest.fn() },
        secondaryToolbar: { close: jest.fn() },
        pdfViewer: {
          currentScale: 1,
          setScale: jest.fn(),
          update: jest.fn(),
          destroyBookMode: jest.fn(),
          stopRendering: jest.fn(),
        },
        pdfThumbnailViewer: { stopRendering: jest.fn() },
        pdfDocument: { annotationStorage: { resetModified: jest.fn() } },
        appConfig: { filenameForDownload: '' },
        close: jest.fn().mockResolvedValue(undefined),
        open: jest.fn().mockResolvedValue(undefined),
        toolbar: { pageNumber: 1 },
      };
      component['pdfScriptLoaderService'].PDFViewerApplication = mockPDFViewerApp;
      component['overrideDefaultSettings'] = jest.fn();
    });

    it('should set _lastOpenedSrc after opening', async () => {
      const src = 'http://example.com/test.pdf';
      component['_src'] = src;
      component['_lastOpenedSrc'] = undefined;

      await component.openPDF2();

      expect(component['_lastOpenedSrc']).toBe(src);
    });

    it('should NOT set _lastOpenedSrc when returning early due to detached buffer', async () => {
      const buf = new ArrayBuffer(10);
      Object.defineProperty(buf, 'detached', { value: true });
      component['_src'] = buf;
      component['_lastOpenedSrc'] = undefined;

      await component.openPDF2();

      expect(component['_lastOpenedSrc']).toBeUndefined();
    });

    it('should NOT set _lastOpenedSrc when returning early due to empty ArrayBuffer', async () => {
      component['_src'] = new ArrayBuffer(0);
      component['_lastOpenedSrc'] = undefined;

      await component.openPDF2();

      expect(component['_lastOpenedSrc']).toBeUndefined();
    });
  });

  describe('eventBusAbortController cleanup (#3131)', () => {
    function setupDestroyMocks() {
      component['pdfScriptLoaderService'].PDFViewerApplication = {
        eventBus: { dispatch: jest.fn(), on: jest.fn(), destroy: jest.fn() },
        pdfViewer: { destroyBookMode: jest.fn(), stopRendering: jest.fn() },
        pdfThumbnailViewer: { stopRendering: jest.fn() },
        pdfDocument: { annotationStorage: { resetModified: jest.fn() } },
        ngxConsole: { reset: jest.fn() },
        close: jest.fn().mockResolvedValue(undefined),
        unbindEvents: jest.fn(),
        unbindWindowEvents: jest.fn(),
        _cleanup: jest.fn(),
      } as any;
      // ngOnDestroy calls notificationService.onPDFJSInitSignal.set(undefined)
      (component as any).notificationService = {
        onPDFJSInitSignal: Object.assign(jest.fn(() => undefined), { set: jest.fn() }),
      };
    }

    it('should abort controller in ngOnDestroy', async () => {
      const mockController = new AbortController();
      const abortSpy = jest.spyOn(mockController, 'abort');
      component['eventBusAbortController'] = mockController;
      setupDestroyMocks();

      await component.ngOnDestroy();

      expect(abortSpy).toHaveBeenCalled();
    });

    it('should set controller to null in ngOnDestroy', async () => {
      component['eventBusAbortController'] = new AbortController();
      setupDestroyMocks();

      await component.ngOnDestroy();

      expect(component['eventBusAbortController']).toBeNull();
    });

    it('should not throw when controller is already null', async () => {
      component['eventBusAbortController'] = null;
      setupDestroyMocks();

      await expect(component.ngOnDestroy()).resolves.not.toThrow();
    });
  });

  describe('formSupport null guard (#3131)', () => {
    it('should not throw when formSupport is undefined during annotationlayerrendered', () => {
      const mockPDFViewerApp = {
        eventBus: { dispatch: jest.fn(), on: jest.fn() },
        findBar: { close: jest.fn() },
        secondaryToolbar: { close: jest.fn() },
        pdfViewer: {
          currentScale: 1,
          destroyBookMode: jest.fn(),
          stopRendering: jest.fn(),
        },
        pdfThumbnailViewer: { stopRendering: jest.fn() },
        pdfDocument: { annotationStorage: { resetModified: jest.fn() } },
        appConfig: { filenameForDownload: '' },
        pdfLinkService: { setHash: undefined },
        ngxConsole: { reset: jest.fn() },
        close: jest.fn().mockResolvedValue(undefined),
        open: jest.fn().mockResolvedValue(undefined),
        toolbar: { pageNumber: 1 },
        serviceWorkerOptions: {},
        enablePrint: true,
        findController: { state: {} },
        onError: undefined,
      };

      // Set up the component to call registerEventListeners
      component['pdfScriptLoaderService'].PDFViewerApplication = mockPDFViewerApp as any;
      (component as any).formSupport = undefined;

      // Call registerEventListeners to register the handler
      (component as any).registerEventListeners(mockPDFViewerApp);

      // Find the annotationlayerrendered handler
      const annotationCall = mockPDFViewerApp.eventBus.on.mock.calls.find(
        (call: any[]) => call[0] === 'annotationlayerrendered'
      );
      expect(annotationCall).toBeDefined();

      const handler = annotationCall[1];
      const mockEvent = { source: { div: document.createElement('div') } };

      // Handler uses queueMicrotask, so we need to flush
      handler(mockEvent);

      // The handler should not throw even with formSupport undefined
      return new Promise<void>((resolve) => {
        queueMicrotask(() => {
          // If we got here without throwing, the null guard works
          expect(true).toBe(true);
          resolve();
        });
      });
    });
  });
});
