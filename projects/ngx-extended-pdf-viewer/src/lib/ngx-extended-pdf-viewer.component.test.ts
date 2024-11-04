import { PlatformLocation } from '@angular/common';
import { ChangeDetectorRef, ElementRef, NgZone, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnotationEditorEvent } from './events/annotation-editor-layer-event';
import { FormDataType, NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { NgxKeyboardManagerService } from './ngx-keyboard-manager.service';
import { ScrollModeType } from './options/pdf-viewer';
import { PDFNotificationService } from './pdf-notification-service';
import { PDFScriptLoaderService } from './pdf-script-loader.service';

describe('NgxExtendedPdfViewerComponent', () => {
  let component: NgxExtendedPdfViewerComponent;
  let fixture: ComponentFixture<NgxExtendedPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxExtendedPdfViewerComponent],
      providers: [
        { provide: NgZone, useValue: new NgZone({ enableLongStackTrace: false }) },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: PlatformLocation, useValue: { getBaseHrefFromDOM: () => '/' } },
        { provide: ChangeDetectorRef, useValue: { markForCheck: jest.fn() } },
        { provide: ElementRef, useValue: { nativeElement: document.createElement('div') } },
        { provide: Renderer2, useValue: { createElement: jest.fn() } },
        PDFScriptLoaderService,
        NgxExtendedPdfViewerService,
        NgxKeyboardManagerService,
        PDFNotificationService,
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

  it('should emit annotationEditorEvent', () => {
    const spy = jest.spyOn(component.annotationEditorEvent, 'emit');
    const event = {} as AnnotationEditorEvent;
    component['pdfScriptLoaderService'].PDFViewerApplication.eventBus.dispatch('annotation-editor-event', event);
    expect(spy).toHaveBeenCalledWith(event);
  });

  it('should set formData and initialize initialAngularFormData', () => {
    const formData = { key: 'value' } as FormDataType;
    component.formData = formData;
    expect(component['formSupport'].formData).toBe(formData);
    expect(component['initialAngularFormData']).toBe(formData);
  });

  it('should set pageViewMode and emit pageViewModeChange', () => {
    const spy = jest.spyOn(component.pageViewModeChange, 'emit');
    component.pageViewMode = 'single';
    expect(component.pageViewMode).toBe('single');
    expect(spy).toHaveBeenCalledWith('single');
  });

  it('should set scrollMode and emit scrollModeChange', () => {
    const spy = jest.spyOn(component.scrollModeChange, 'emit');
    component.scrollMode = ScrollModeType.horizontal;
    expect(component.scrollMode).toBe(ScrollModeType.horizontal);
    expect(spy).toHaveBeenCalledWith(ScrollModeType.horizontal);
  });

  it('should set src and emit srcChange', async () => {
    const spy = jest.spyOn(component.srcChange, 'emit');
    const url = 'http://example.com/test.pdf';
    component.src = url;
    expect(component['_src']).toBe(url);
    expect(spy).toHaveBeenCalledWith(url);
  });

  it('should set base64Src and convert to Uint8Array', () => {
    const base64 = btoa('test');
    component.base64Src = base64;
    expect(component['_src']).toBeInstanceOf(ArrayBuffer);
  });

  it('should set height and call checkHeight', () => {
    const spy = jest.spyOn(component['dynamicCSSComponent'], 'checkHeight');
    component.height = '500px';
    expect(component.height).toBe('500px');
    expect(spy).toHaveBeenCalled();
  });

  it('should set mobileFriendlyZoom and update related properties', () => {
    component.mobileFriendlyZoom = '150%';
    expect(component.mobileFriendlyZoom).toBe('150%');
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

  it('should call ngOnDestroy and clean up', async () => {
    const spy = jest.spyOn(component['pdfScriptLoaderService'].PDFViewerApplication, 'close');
    await component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should call ngOnChanges and handle changes', async () => {
    const changes = {
      src: {
        currentValue: 'http://example.com/test.pdf',
        previousValue: '',
        firstChange: true,
        isFirstChange: () => true,
      },
    };
    const spy = jest.spyOn(component, 'openPDF2');
    await component.ngOnChanges(changes);
    expect(spy).toHaveBeenCalled();
  });

  it('should call setZoom and update zoom value', async () => {
    component.zoom = '150%';
    await component['setZoom']();
    expect(component.zoom).toBe('150%');
  });

  it('should call onResize and update layout', () => {
    const spy = jest.spyOn(component['dynamicCSSComponent'], 'checkHeight');
    component.onResize();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onContextMenu and return contextMenuAllowed', () => {
    component.contextMenuAllowed = false;
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
