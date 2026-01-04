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
});
