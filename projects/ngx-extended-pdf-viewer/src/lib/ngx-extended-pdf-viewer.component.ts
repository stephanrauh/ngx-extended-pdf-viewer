import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import { PositioningService } from './dynamic-css/positioning.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  Inject,
  input,
  InputSignal,
  model,
  ModelSignal,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  output,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { convertBlobToUint8Array } from './utils/blob-conversion';
import { PdfDocumentLoadedEvent } from './events/document-loaded-event';
import { FileInputChanged } from './events/file-input-changed';
import { FindResult, FindResultMatchesCount, FindState } from './events/find-result';
import { HandtoolChanged } from './events/handtool-changed';
import { PageRenderEvent } from './events/page-render-event';
import { PageRenderedEvent } from './events/page-rendered-event';
import { PagesLoadedEvent } from './events/pages-loaded-event';
import { PagesRotationEvent } from './events/pages-rotation-event';
import { PdfDownloadedEvent } from './events/pdf-downloaded-event';
import { PdfLoadedEvent } from './events/pdf-loaded-event';
import { PdfLoadingStartsEvent } from './events/pdf-loading-starts-event';
import { PdfThumbnailDrawnEvent } from './events/pdf-thumbnail-drawn-event';
import { ProgressBarEvent } from './events/progress-bar-event';
import { ScaleChangingEvent } from './events/scale-changing-event';
import { SidebarviewChange } from './events/sidebarview-changed';
import { TextLayerRenderedEvent } from './events/textlayer-rendered';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { PdfCursorTools } from './options/pdf-cursor-tools';
import { assetsUrl, getVersionSuffix, pdfDefaultOptions } from './options/pdf-default-options';
import { PageViewModeType, ScrollModeChangedEvent, ScrollModeType } from './options/pdf-viewer';
import { IPDFViewerApplication, PDFDocumentProxy, PDFPageProxy } from './options/pdf-viewer-application';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
import { VerbosityLevel } from './options/verbosity-level';
import { PdfDummyComponentsComponent } from './pdf-dummy-components/pdf-dummy-components.component';
import { PDFNotificationService } from './pdf-notification-service';
import { PdfSecondaryToolbarComponent } from './secondary-toolbar/pdf-secondary-toolbar/pdf-secondary-toolbar.component';
import { IOSCanvasOptimizationService } from './services/ios-canvas-optimization.service';
import { PdfSidebarComponent } from './sidebar/pdf-sidebar/pdf-sidebar.component';

import { DynamicCssComponent } from './dynamic-css/dynamic-css.component';
import { AnnotationEditorEvent } from './events/annotation-editor-layer-event';
import { AnnotationEditorLayerRenderedEvent } from './events/annotation-editor-layer-rendered-event';
import { AnnotationEditorEditorModeChangedEvent } from './events/annotation-editor-mode-changed-event';
import { AnnotationLayerRenderedEvent } from './events/annotation-layer-rendered-event';
import { LinkAnnotationsAddedEvent } from './events/link-annotations-added-event';
import { AttachmentLoadedEvent } from './events/attachment-loaded-event';
import { LayersLoadedEvent } from './events/layers-loaded-event';
import { OutlineLoadedEvent } from './events/outline-loaded-event';
import { ToggleSidebarEvent } from './events/toggle-sidebar-event';
import { XfaLayerRenderedEvent } from './events/xfa-layer-rendered-event';
import { NgxFormSupport } from './ngx-form-support';
import { NgxHasHeight } from './ngx-has-height';
import { NgxKeyboardManagerService } from './ngx-keyboard-manager.service';
import { PdfSidebarView } from './options/pdf-sidebar-views';
import { SpreadType } from './options/spread-type';
import { ZoomType } from './options/zoom-type';
import { PdfCspPolicyService } from './pdf-csp-policy.service';
import { PDFScriptLoaderService } from './pdf-script-loader.service';
import { ResponsiveVisibility } from './responsive-visibility';

declare class ResizeObserver {
  constructor(param: () => void);
  public disconnect(): void;
  public observe(div: HTMLElement): void;
}

interface ElementAndPosition {
  element: HTMLElement;
  x: number;
  y: number;
  // #3074 modified by ngx-extended-pdf-viewer
  popupElements?: Array<HTMLElement>; // Elements from aria-controls popup to insert after this element
  // #3074 end of modification by ngx-extended-pdf-viewer
}

export interface FormDataType {
  [fieldName: string]: null | string | number | boolean | string[];
}

export type PdfSrcType = string | ArrayBuffer | Blob | Uint8Array | URL | { range: any } | undefined;
// Intersection with {} prevents TypeScript from simplifying these types in generated .d.ts files
export type Base64SrcType = (string | null | undefined) & {}; // NOSONAR — prevents TS from simplifying in .d.ts
export type PageType = (number | undefined) & {}; // NOSONAR — prevents TS from simplifying in .d.ts
export type NamedDestType = (string | undefined) & {}; // NOSONAR — prevents TS from simplifying in .d.ts
export type PasswordType = (string | undefined) & {}; // NOSONAR — prevents TS from simplifying in .d.ts

export function isIOS(): boolean {
  if (typeof globalThis.window === 'undefined') {
    return false;
  }

  const userAgent = navigator?.userAgent;
  if (!userAgent) {
    return false;
  }

  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    // iPad on iOS 13+ detection (reports as Mac)
    (userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

@Component({
  selector: 'ngx-extended-pdf-viewer',
  templateUrl: './ngx-extended-pdf-viewer.component.html',
  styleUrls: ['./ngx-extended-pdf-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false, // NOSONAR — intentional for backward compatibility with NgModule consumers
})
export class NgxExtendedPdfViewerComponent implements OnInit, OnDestroy, NgxHasHeight {
  private readonly formSupport = new NgxFormSupport();

  /** #3131 AbortController to unregister all eventBus listeners on destroy. */
  private eventBusAbortController: AbortController | null = null;

  /**
   * The dummy components are inserted automatically when the user customizes the toolbar
   * without adding every original toolbar item. Without the dummy components, the
   * initialization code of pdf.js crashes because it assume that every standard widget is there.
   */
  public dummyComponents = viewChild<PdfDummyComponentsComponent>(PdfDummyComponentsComponent);

  public root = viewChild<ElementRef>('root');

  public annotationEditorEvent = output<AnnotationEditorEvent>();
  /* UI templates */
  public customFindbarInputArea: InputSignal<TemplateRef<any> | undefined> = input();

  public customToolbar: InputSignal<TemplateRef<any> | undefined> = input();

  public customFindbar: InputSignal<TemplateRef<any> | undefined> = input();

  public customFindbarButtons: InputSignal<TemplateRef<any> | undefined> = input();

  public customPdfViewer: InputSignal<TemplateRef<any> | undefined> = input();

  public customSecondaryToolbar: InputSignal<TemplateRef<any> | undefined> = input();

  public customSidebar: InputSignal<TemplateRef<any> | undefined> = input();

  public customThumbnail: InputSignal<TemplateRef<any> | undefined> = input();

  public customFreeFloatingBar: InputSignal<TemplateRef<any> | undefined> = input();

  public showFreeFloatingBar = input(true);

  public enableDragAndDrop = input(true);

  public forceUsingLegacyES5 = input(false);

  public localizationInitialized: boolean = false;

  private resizeObserver: ResizeObserver | undefined;

  private initialAngularFormData?: FormDataType = undefined;

  public formData = input<FormDataType | undefined>(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _formDataEffect = effect(() => {
    const data = this.formData();
    if (data !== undefined) {
      const previousFormData = { ...this.formSupport.formData };
      this.initialAngularFormData ??= data;
      this.formSupport.formData = data;
      this.formSupport.updateFormFieldsInPdfCalledByNgOnChanges(previousFormData);
    }
  });

  public disableForms = input(false);

  @Output()
  public get formDataChange() {
    return this.formSupport.formDataChange;
  }

  public baseHref: string;

  /** This flag prevents trying to load a file twice if the user uploads it using the file upload dialog or via drag'n'drop */
  private srcChangeTriggeredByUser: boolean = false;

  public pageViewMode = model<PageViewModeType>('multiple');

  private _previousPageViewMode: PageViewModeType = 'multiple';

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _pageViewModeEffect = effect(() => {
    const viewMode = this.pageViewMode();
    if (!isPlatformBrowser(this.platformId)) return;

    // Skip if the value hasn't actually changed. Without this guard,
    // the effect fires on initialization with 'multiple', which triggers
    // handleMultiplePageMode() → restoreHeight, incorrectly replacing
    // the user's height with a computed pixel value (#3183).
    if (this._previousPageViewMode === viewMode) return;
    this._previousPageViewMode = viewMode;

    const mustRedraw = !this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized && viewMode === 'book';

    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    PDFViewerApplicationOptions?.set('pageViewMode', viewMode);

    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication) {
      PDFViewerApplication.pdfViewer.pageViewMode = viewMode;
      if (PDFViewerApplication.findController) {
        PDFViewerApplication.findController._pageViewMode = viewMode;
      }
    }

    this.handleViewMode(viewMode);

    // #3140 modified by ngx-extended-pdf-viewer
    // When leaving book mode while in PAGE_FLIP cursor mode, switch back to SELECT.
    if (viewMode !== 'book' && this.showPageFlipButton() && this.service.ngxExtendedPdfViewerInitialized) {
      PDFViewerApplication?.eventBus.dispatch('switchcursortool', { tool: PdfCursorTools.SELECT });
    }
    // #3140 end of modification by ngx-extended-pdf-viewer

    if (mustRedraw) {
      this.redrawViewer(viewMode);
    }
  });

  private handleViewMode(viewMode: PageViewModeType): void {
    switch (viewMode) {
      case 'infinite-scroll':
        this.handleInfiniteScrollMode();
        break;
      case 'single':
        this.handleSinglePageMode();
        break;
      case 'book':
        this.handleBookMode();
        break;
      case 'multiple':
        this.handleMultiplePageMode();
        break;
      default:
        this.scrollMode.set(ScrollModeType.vertical);
    }
  }

  private handleInfiniteScrollMode(): void {
    if (this.scrollMode() === ScrollModeType.page || this.scrollMode() === ScrollModeType.horizontal) {
      this.scrollMode.set(ScrollModeType.vertical);
      this.pdfScriptLoaderService.PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: Number(this.scrollMode()) });
    }
    setTimeout(
      this.asyncWithCD(() => {
        // this timeout is necessary because @Input() is called before the child components are initialized
        // (and the DynamicCssComponent is a child component)
        this.dynamicCSSComponent()?.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode(), this.primaryMenuVisible, this, this.logLevel());
      }),
    );
  }

  // since pdf.js, our custom single-page-mode has been replaced by the standard scrollMode="page"
  private handleSinglePageMode(): void {
    this.scrollMode.set(ScrollModeType.page);
    this.pageViewMode.set('single');
  }

  private handleBookMode(): void {
    // Note: showBorders is an input signal and cannot be set here
    // The value should be set by the parent component
    if (this.scrollMode() !== ScrollModeType.vertical) {
      this.scrollMode.set(ScrollModeType.vertical);
    }
    // #3140 modified by ngx-extended-pdf-viewer
    // When entering book mode with the page-flip button enabled,
    // automatically switch to PAGE_FLIP cursor tool.
    if (this.showPageFlipButton() && this.service.ngxExtendedPdfViewerInitialized) {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
      PDFViewerApplication?.eventBus.dispatch('switchcursortool', { tool: PdfCursorTools.PAGE_FLIP });
    }
    // #3140 end of modification by ngx-extended-pdf-viewer
  }

  private handleMultiplePageMode(): void {
    if (this.scrollMode() === ScrollModeType.page) {
      this.scrollMode.set(ScrollModeType.vertical);
    }
    setTimeout(
      this.asyncWithCD(() => {
        // this timeout is necessary because @Input() is called before the child components are initialized
        // (and the DynamicCssComponent is a child component)
        this.dynamicCSSComponent()?.removeScrollbarInInfiniteScrollMode(true, this.pageViewMode(), this.primaryMenuVisible, this, this.logLevel());
      }),
    );
  }

  private redrawViewer(viewMode: PageViewModeType): void {
    if (viewMode !== 'book') {
      const ngx = this.elementRef.nativeElement as HTMLElement;
      const viewerContainer = ngx.querySelector('#viewerContainer') as HTMLDivElement;
      viewerContainer.style.width = '';
      viewerContainer.style.overflow = '';
      viewerContainer.style.marginRight = '';
      viewerContainer.style.marginLeft = '';
      const viewer = ngx.querySelector('#viewer') as HTMLDivElement;
      viewer.style.maxWidth = '';
      viewer.style.minWidth = '';
    }
    this.openPDF2();
  }

  public markForCheck(): void {
    this.cdr.markForCheck();
  }

  public progress = output<ProgressBarEvent>(); // NOSONAR — backward-compatible event name

  private readonly secondaryToolbarComponent = viewChild<PdfSecondaryToolbarComponent>('pdfSecondaryToolbarComponent');

  private readonly dynamicCSSComponent = viewChild<DynamicCssComponent>('DynamicCssComponent');

  private readonly sidebarComponent = viewChild<PdfSidebarComponent>('pdfsidebar');

  /* regular attributes */

  public src = model<PdfSrcType>(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _srcEffect = effect(() => {
    const url = this.src();
    if (typeof globalThis.window === 'undefined') return;

    // Skip processing if change was triggered by user
    if (this.srcChangeTriggeredByUser) {
      this.srcChangeTriggeredByUser = false;
      return;
    }

    // Type conversion
    if (url instanceof Uint8Array) {
      this._src = url.buffer;
    } else if (url instanceof URL) {
      this._src = url.toString();
    } else if (typeof Blob !== 'undefined' && url instanceof Blob) {
      (async () => {
        const converted = await convertBlobToUint8Array(url);
        this._src = converted.buffer;
        if (this.service.ngxExtendedPdfViewerInitialized && this._src !== this._lastOpenedSrc) { // #3131
          // Close book mode if needed
          if (this.pageViewMode() === 'book') {
            const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
            PDFViewerApplication?.pdfViewer?.destroyBookMode();
            PDFViewerApplication?.pdfViewer?.stopRendering();
            PDFViewerApplication?.pdfThumbnailViewer?.stopRendering();
          }
          if (this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized) {
            this.openPDF();
          } else {
            (async () => this.openPDF2())();
          }
        }
      })();
      return;
    } else if (typeof url === 'string') {
      this._src = url;
      if (url.length > 980) {
        // minimal length of a base64 encoded PDF
        if (url.length % 4 === 0) {
          if (/^[a-zA-Z\d/+]+={0,2}$/.test(url)) {
            console.error('The URL looks like a base64 encoded string. If so, please use the attribute [base64Src] instead of [src]');
          }
        }
      }
    } else {
      (this._src as any) = url;
    }

    // Handle PDF opening/closing
    if (this.service.ngxExtendedPdfViewerInitialized) {
      // Close book mode if needed
      if (this.pageViewMode() === 'book') {
        const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
        PDFViewerApplication?.pdfViewer?.destroyBookMode();
        PDFViewerApplication?.pdfViewer?.stopRendering();
        PDFViewerApplication?.pdfThumbnailViewer?.stopRendering();
      }

      if (this._src && this._src !== this._lastOpenedSrc) { // #3131
        if (this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized) {
          this.openPDF();
        } else {
          const initialized = this.notificationService.onPDFJSInitSignal();
          if (initialized) {
            (async () => this.openPDF2())();
          }
        }
      } else if (!this._src) {
        // Close document when src is cleared
        this._lastOpenedSrc = undefined; // #3131
        const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
        (async () => this.closeDocument(PDFViewerApplication))();
      }
    }
  });

  private _src: string | ArrayBuffer | Uint8Array | { range: any } | undefined;

  /** #3131 Tracks the last _src value that was actually opened, to avoid redundant re-opens when the effect re-fires. */
  private _lastOpenedSrc: string | ArrayBuffer | Uint8Array | { range: any } | undefined;

  public scrollMode = model<ScrollModeType>(ScrollModeType.vertical);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _scrollModeEffect = effect(() => {
    const value = this.scrollMode();
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication?.pdfViewer) {
      if (PDFViewerApplication.pdfViewer.scrollMode !== Number(value)) {
        PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: Number(value) });
      }
    }
    if (value === ScrollModeType.page) {
      if (this.pageViewMode() !== 'single') {
        this.pageViewMode.set('single');
      }
    } else if (this.pageViewMode() === 'single' || value === ScrollModeType.horizontal) {
      this.pageViewMode.set('multiple');
    }
  });

  public authorization = input<Object | boolean | undefined>(undefined);

  public httpHeaders = input<Object | undefined>(undefined);

  public contextMenuAllowed = input(true);

  public afterPrint = output<void>();

  public beforePrint = output<void>();

  public currentZoomFactor = output<number>();

  /** This field stores the previous zoom level if the page is enlarged with a double-tap or double-click */
  private previousZoom: ZoomType;

  public enablePrint = input(true);

  public enablePrintAutoRotate = input<boolean>(pdfDefaultOptions.enablePrintAutoRotate);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _enablePrintAutoRotateEffect = effect(() => {
    const value = this.enablePrintAutoRotate();
    pdfDefaultOptions.enablePrintAutoRotate = value;
    if (this.pdfScriptLoaderService.PDFViewerApplication?.pdfViewer) {
      this.pdfScriptLoaderService.PDFViewerApplication.pdfViewer.enablePrintAutoRotate = value;
    }
  });

  /** Force reloading of the JavaScript code. Useful for testing and micro-frontends */
  public forceFullReloadOfJavaScriptCode = input(false);

  // #2818 modified by ngx-extended-pdf-viewer
  public showEditorButtons = input<ResponsiveVisibility>(true);

  public disableEditorButtons = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showTextEditor = input<ResponsiveVisibility>('xxl');

  // #2818 modified by ngx-extended-pdf-viewer
  public disableTextEditor = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showStampEditor = input<ResponsiveVisibility>('xxl');

  // #2818 modified by ngx-extended-pdf-viewer
  public disableStampEditor = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showCommentEditor = input<ResponsiveVisibility>(pdfDefaultOptions.enableComment ? 'always-in-secondary-menu' : false);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableCommentEditor = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showDrawEditor = input<ResponsiveVisibility>('xxl');

  // #2818 modified by ngx-extended-pdf-viewer
  public disableDrawEditor = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showHighlightEditor = input<ResponsiveVisibility>('xxl');

  // #2818 modified by ngx-extended-pdf-viewer
  public disableHighlightEditor = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showSignatureEditor = input<ResponsiveVisibility>('xxl');

  // #2818 modified by ngx-extended-pdf-viewer
  public disableSignatureEditor = input<boolean>(false);

  // Computed signals for effective show values when showEditorButtons group is used
  public effectiveShowTextEditor = computed(() => this.showEditorButtons() === false ? false : this.showTextEditor());
  public effectiveShowStampEditor = computed(() => this.showEditorButtons() === false ? false : this.showStampEditor());
  public effectiveShowCommentEditor = computed(() => this.showEditorButtons() === false ? false : this.showCommentEditor());
  public effectiveShowDrawEditor = computed(() => this.showEditorButtons() === false ? false : this.showDrawEditor());
  public effectiveShowHighlightEditor = computed(() => this.showEditorButtons() === false ? false : this.showHighlightEditor());
  public effectiveShowSignatureEditor = computed(() => this.showEditorButtons() === false ? false : this.showSignatureEditor());
  // #2818 end of modification by ngx-extended-pdf-viewer

  /** How many log messages should be printed?
   * Legal values: VerbosityLevel.INFOS (= 5), VerbosityLevel.WARNINGS (= 1), VerbosityLevel.ERRORS (= 0) */
  public logLevel = input(VerbosityLevel.WARNINGS);

  /** Use the minified (minifiedJSLibraries="true", which is the default) or the user-readable pdf.js library (minifiedJSLibraries="false") */
  public minifiedJSLibraries = model<boolean>(pdfDefaultOptions._internalFilenameSuffix === '.min');

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _minifiedJSLibrariesEffect = effect(() => {
    const value = this.minifiedJSLibraries();
    pdfDefaultOptions._internalFilenameSuffix = value ? '.min' : '';
  });

  public primaryMenuVisible = true;

  /** option to increase (or reduce) print resolution. Default is 150 (dpi). Sensible values
   * are 300, 600, and 1200. Note the increase memory consumption, which may even result in a browser crash. */
  public printResolution = input(null);

  public rotation = model<0 | 90 | 180 | 270>(0);

  public annotationLayerRendered = output<AnnotationLayerRenderedEvent>();

  public linkAnnotationsAdded = output<LinkAnnotationsAddedEvent>();

  public annotationEditorLayerRendered = output<AnnotationEditorLayerRenderedEvent>();

  public xfaLayerRendered = output<XfaLayerRenderedEvent>();

  public outlineLoaded = output<OutlineLoadedEvent>();

  public attachmentsloaded = output<AttachmentLoadedEvent>();

  public layersloaded = output<LayersLoadedEvent>();

  public hasSignature!: boolean;

  public base64Src: InputSignal<string | null | undefined> = input();

  // @ts-ignore TS6133 - Used for side effects only
  private readonly base64SrcEffect = effect(() => {
    const base64 = this.base64Src();
    if (!isPlatformBrowser(this.platformId)) return;

    if (base64) {
      const binary_string = atob(base64);
      const len = binary_string.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i); // NOSONAR — base64 decoded string is single-byte ASCII, charCodeAt is correct
      }
      this.src.set(bytes.buffer);
    }
    // Don't clear _src when base64Src is undefined - src might be set from [src] binding
  });

  /**
   * The combination of height, minHeight, and autoHeight ensures the PDF height of the PDF viewer is calculated correctly when the height is a percentage.
   * By default, many CSS frameworks make a div with 100% have a height or zero pixels. checkHeight() fixes this.
   */
  public autoHeight = false;

  // Protected backing fields
  protected _minHeight?: string;
  protected _height: string | undefined = '100%';

  // Public getters and setters for NgxHasHeight interface
  // These allow internal code (like dynamic-css.component) to read/write height
  public get minHeight(): string | undefined {
    return this._minHeight;
  }
  public set minHeight(value: string | undefined) {
    this._minHeight = value;
  }

  public get height(): string | undefined {
    return this._height;
  }
  public set height(value: string | undefined) {
    this._height = value;
  }

  // Public input signals (templates bind to these)
  public minHeightInput = input<string | undefined>(undefined, { alias: 'minHeight' }); // NOSONAR — alias for backward compat
  public heightInput = input<string | undefined>('100%', { alias: 'height' }); // NOSONAR

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _heightEffect = effect(() => {
    let h = this.heightInput();
    if (!h) {
      h = '100%';
    }

    // Sync to protected backing fields
    this._minHeight = this.minHeightInput();

    this.autoHeight = false;
    if (h === 'auto') {
      this.autoHeight = true;
      // When height is 'auto', set _height to undefined so that
      // checkHeight() → adjustHeight() can compute the correct pixel value.
      // Setting _height to 'auto' would cause isHeightDefinedWithUnits()
      // to return true, skipping the auto-height calculation entirely.
      this._height = undefined;
    } else {
      this._height = h;
    }

    setTimeout(
      this.asyncWithCD(() => {
        // this timeout is necessary because @Input() is called before the child components are initialized
        // (and the DynamicCssComponent is a child component)
        this.dynamicCSSComponent()?.checkHeight(this, this.logLevel());
      }),
    );
  });

  public backgroundColor = input(undefined);

  public pdfBackgroundColor = input(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _pdfBackgroundColorEffect = effect(() => {
    const color = this.pdfBackgroundColor();
    // Skip during initialization — the initial value is set in the init code path
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplicationOptions && PDFViewerApplication?.pdfViewer) {
      PDFViewerApplicationOptions.set('pdfBackgroundColor', color);
      PDFViewerApplication.pdfViewer.refresh();
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _readingDirectionEffect = effect(() => {
    const direction = this.readingDirection();
    const isRtl = direction === 'rtl';
    const isLtr = direction === 'ltr';
    const viewer = document.getElementById('viewer');
    if (viewer) {
      viewer.classList.toggle('readingDirection-rtl', isRtl);
      viewer.classList.toggle('readingDirection-ltr', isLtr);
    }
    const viewerContainer = document.getElementById('viewerContainer');
    if (viewerContainer) {
      viewerContainer.classList.toggle('readingDirection-rtl', isRtl);
    }
    if (!this.service.ngxExtendedPdfViewerInitialized) return;
    const PDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    if (PDFViewerApplicationOptions) {
      PDFViewerApplicationOptions.set('readingDirection', direction);
    }
  });

  /** Allows the user to define the name of the file after clicking "download" */
  public filenameForDownload = input<string | undefined>(undefined);

  /** Allows the user to disable the keyboard bindings completely */
  public ignoreKeyboard = input(false);

  /** Allows the user to disable a list of key bindings. */
  public ignoreKeys = input<Array<string>>([]);

  /** Allows the user to enable a list of key bindings explicitly. If this property is set, every other key binding is ignored. */
  public acceptKeys = input<Array<string>>([]);

  public hasTextLayer = true;

  /** Allows the user to put the viewer's svg images into an arbitrary folder */
  public imageResourcesPath = input(assetsUrl(pdfDefaultOptions.assetsFolder) + '/images/');

  /** Allows the user to put their locale folder into an arbitrary folder */
  public localeFolderPath = input(assetsUrl(pdfDefaultOptions.assetsFolder) + '/locale');

  /** Override the default locale. This must be the complete locale name, such as "es-ES". The string is allowed to be all lowercase.
   */
  public language = input<string | undefined>(typeof globalThis.window === 'undefined' ? 'en' : navigator.language);

  /** By default, listening to the URL is deactivated because often the anchor tag is used for the Angular router */
  public listenToURL = input(false);

  /** Navigate to a certain "named destination" */
  public nameddest: InputSignal<string | undefined> = input();

  /** allows you to pass a password to read password-protected files */
  public password: InputSignal<string | undefined> = input();

  public replaceBrowserPrint = input(true);

  private readonly originalPrint = typeof window !== 'undefined' ? window.print : undefined;

  /** Store the original color-scheme value to restore it on destroy */
  private originalColorScheme: string | null = null;

  public useInlineScripts = input(true);

  public viewerPositionTop = '32px';

  /** pdf.js can show signatures, but fails to verify them. So they are switched off by default.
   * Set "[showUnverifiedSignatures]"="true" to display e-signatures nonetheless.
   */
  public showUnverifiedSignatures = input(false);

  public startTabindex = input<number>();

  public showSidebarButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableSidebarButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _showSidebarButtonEffect = effect(() => {
    const show = this.showSidebarButton();
    if (!isPlatformBrowser(this.platformId)) {
      this._showSidebarButton = false;
      return;
    }
    this._showSidebarButton = show;
    if (this._showSidebarButton) {
      const isIE = /msie\s|trident\//i.test(window.navigator.userAgent);
      let factor = 1;
      if (isIE) {
        factor = Number((this._mobileFriendlyZoom || '100').replace('%', '')) / 100;
      }

      this.findbarLeft = (68 * factor).toString() + 'px';
      return;
    }
    this.findbarLeft = '0px';
  });

  public _showSidebarButton: ResponsiveVisibility = true;

  public sidebarVisible = model<boolean | undefined>(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _sidebarVisibleEffect = effect(() => {
    const value = this.sidebarVisible();
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    // PDF.js v5.4.530 renamed pdfSidebar to viewsManager
    if (PDFViewerApplication?.viewsManager) {
      if (value) {
        PDFViewerApplication.viewsManager.open();
        const view = Number(this.activeSidebarView());
        if (view === 1 || view === 2 || view === 3 || view === 4) {
          PDFViewerApplication.viewsManager.switchView(view, true);
        } else {
          console.error('[activeSidebarView] must be an integer value between 1 and 4');
        }
      } else {
        PDFViewerApplication.viewsManager.close();
      }
    }
  });

  public activeSidebarView = model<PdfSidebarView>(PdfSidebarView.OUTLINE);

  public findbarVisible = model(false);

  public propertiesDialogVisible = model(false);

  public showFindButton = input<ResponsiveVisibility | undefined>(undefined);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableFindButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showFindHighlightAll = input(true);

  public showFindMatchCase = input(true);

  public showFindMultiple = input<boolean>(true);

  public showFindRegexp = input<boolean>(false);

  public showFindEntireWord = input(true);

  public showFindMatchDiacritics = input(true);

  public showFindResultsCount = input(true);

  public showFindMessages = input(true);

  public showMovePageButton = input<ResponsiveVisibility>(false);

  /** Enable page reordering via drag-and-drop in the thumbnail sidebar.
   *  This is read at initialization time only. Changing it after the viewer has loaded
   *  requires destroying and recreating the component. */
  public enablePageReorderingInput = input<boolean | undefined>(undefined, { alias: 'enablePageReordering' }); // NOSONAR — alias for backward compat

  /** Enable split & merge: copy, cut, delete, and export selected pages via the sidebar manage menu.
   *  This is read at initialization time only. Changing it after the viewer has loaded
   *  requires destroying and recreating the component. */
  public enableSplitMergeInput = input<boolean | undefined>(undefined, { alias: 'enableSplitMerge' }); // NOSONAR

  // #2818 modified by ngx-extended-pdf-viewer
  public disableMovePageButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showPagingButtons = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disablePagingButtons = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showFirstAndLastPageButtons = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableFirstAndLastPageButtons = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showPreviousAndNextPageButtons = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disablePreviousAndNextPageButtons = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showPageNumber = input<ResponsiveVisibility>(true);
  // #2818 modified by ngx-extended-pdf-viewer
  public disablePageNumber = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showPageLabel = input<ResponsiveVisibility>(true);

  public showZoomButtons = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableZoomButtons = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showZoomDropdown = input<ResponsiveVisibility>(true);
  // #2818 modified by ngx-extended-pdf-viewer
  public disableZoomDropdown = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showPresentationModeButton = input<ResponsiveVisibility>(false);

  // #2818 modified by ngx-extended-pdf-viewer
  public disablePresentationModeButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showOpenFileButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableOpenFileButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showPrintButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disablePrintButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showDownloadButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableDownloadButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public theme = input<'dark' | 'light' | 'custom' | string>('light');

  public showToolbar = input(true);

  public showSecondaryToolbarButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableSecondaryToolbarButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  // Individual button visibility controls (use model for writability via meta-inputs)
  public showSinglePageModeButton = model<ResponsiveVisibility>(true);
  public showVerticalScrollButton = model<ResponsiveVisibility>(true);
  public showHorizontalScrollButton = model<ResponsiveVisibility>(true);
  public showWrappedScrollButton = model<ResponsiveVisibility>(true);
  public showInfiniteScrollButton = model<ResponsiveVisibility>(true);
  public showBookModeButton = model<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableSinglePageModeButton = input<boolean>(false);
  public disableVerticalScrollButton = input<boolean>(false);
  public disableHorizontalScrollButton = input<boolean>(false);
  public disableWrappedScrollButton = input<boolean>(false);
  public disableInfiniteScrollButton = input<boolean>(false);
  public disableBookModeButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  // Meta-input for convenience (sets all scrolling buttons at once)
  public showScrollingButtons = input<ResponsiveVisibility | undefined>(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _showScrollingButtonsEffect = effect(() => {
    const value = this.showScrollingButtons();
    if (value !== undefined) {
      this.showSinglePageModeButton.set(value);
      this.showVerticalScrollButton.set(value);
      this.showHorizontalScrollButton.set(value);
      this.showWrappedScrollButton.set(value);
      this.showInfiniteScrollButton.set(value);
      this.showBookModeButton.set(value);
    }
  });

  // Rotate button controls (use model for writability via meta-input)
  public showRotateCwButton = model<ResponsiveVisibility>(true);
  public showRotateCcwButton = model<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableRotateCwButton = input<boolean>(false);
  public disableRotateCcwButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  // Meta-input for convenience (sets both rotate buttons at once)
  public showRotateButton = input<ResponsiveVisibility | undefined>(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _showRotateButtonEffect = effect(() => {
    const value = this.showRotateButton();
    if (value !== undefined) {
      this.showRotateCwButton.set(value);
      this.showRotateCcwButton.set(value);
    }
  });

  public handTool = model<boolean>(!isIOS());

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _handToolEffect = effect(() => {
    const value = this.handTool();
    if (isIOS() && value) {
      console.log(
        "On iOS, the handtool doesn't work reliably. Plus, you don't need it because touch gestures allow you to distinguish easily between swiping and selecting text. Therefore, the library ignores your setting.",
      );
      this.handTool.set(false);
      return;
    }
    if (this.service.ngxExtendedPdfViewerInitialized) {
      // #3140 modified by ngx-extended-pdf-viewer
      // When the page-flip button is shown, the cursor tool is fully managed by
      // the three toolbar buttons (select/hand/page-flip), not by the handTool binding.
      // Calling selectCursorTool() here would override user-initiated tool changes.
      if (this.showPageFlipButton()) {
        return;
      }
      // #3140 end of modification by ngx-extended-pdf-viewer
      // #3179: Tell pdf.js to switch the cursor tool. selectCursorTool() reads
      // the current value of this.handTool() internally and dispatches
      // 'switchcursortool' with tool=1 (hand) or tool=0 (text selection).
      this.selectCursorTool();
    }
  });

  public showHandToolButton = input<ResponsiveVisibility>(false);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableHandToolButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  // #3140 modified by ngx-extended-pdf-viewer
  /**
   * In book mode, dragging normally flips pages. Set this to false to disable
   * drag-to-flip, allowing text selection and panning instead. Click-based
   * page flipping is not affected. When true (the default), drag-to-flip is
   * automatically disabled when zoomed in beyond 100% so the user can pan.
   */
  public enableFlipByDrag = input<boolean>(true);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _enableFlipByDragEffect = effect(() => {
    const value = this.enableFlipByDrag();
    if (this.service.ngxExtendedPdfViewerInitialized) {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
      if (PDFViewerApplication?.pdfViewer) {
        PDFViewerApplication.pdfViewer.enableFlipByDrag = value;
      }
    }
  });
  public showPageFlipButton = input<ResponsiveVisibility>(false);

  public disablePageFlipButton = input<boolean>(false);

  /**
   * In book mode, show or hide the dog-ear fold animation on page corners
   * when hovering near them. Only relevant when drag-to-flip is enabled.
   */
  public showPageCorners = input<boolean>(true);

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _showPageCornersEffect = effect(() => {
    const value = this.showPageCorners();
    if (this.service.ngxExtendedPdfViewerInitialized) {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
      if (PDFViewerApplication?.pdfViewer?.pageFlip) {
        PDFViewerApplication.pdfViewer.pageFlip.setting.showPageCorners = value;
      }
    }
  });
  // #3140 end of modification by ngx-extended-pdf-viewer

  public showSpreadButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disableSpreadButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showPropertiesButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disablePropertiesButton = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public showBorders = input(true);

  public spread = model<SpreadType>('off');

  public readingDirection = input<'ltr' | 'rtl' | 'auto'>('auto');

  public thumbnailDrawn = output<PdfThumbnailDrawnEvent>();

  public page: ModelSignal<number | undefined> = model();

  // #3157 Guard flag to prevent the page effect from navigating
  // when the page signal is updated by the 'pagechanging' event (i.e. user scrolling).
  private _pageSetFromScroll = false;

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _pageEffect = effect(() => {
    const newPageNumber = this.page();
    if (newPageNumber) {
      // silently cope with strings
      this._page = Number(newPageNumber);
    } else {
      this._page = undefined;
    }

    // Don't navigate if this update came from scrolling
    if (this._pageSetFromScroll) {
      this._pageSetFromScroll = false;
      return;
    }

    // Navigate to the page if PDF viewer is initialized
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (newPageNumber && PDFViewerApplication?.pdfViewer) {
      PDFViewerApplication.page = Number(newPageNumber);
    }
  });

  private _page: number | undefined = undefined;

  public pageLabel = model<string | undefined>(undefined);

  public pagesLoaded = output<PagesLoadedEvent>();

  public pageRender = output<PageRenderEvent>();

  public pageRendered = output<PageRenderedEvent>();

  public pdfDownloaded = output<PdfDownloadedEvent>();

  public pdfLoaded = output<PdfLoadedEvent>();

  public pdfLoadingStarts = output<PdfLoadingStartsEvent>();

  public pdfLoadingFailed = output<Error>();

  public textLayer = input<boolean | undefined>(undefined);

  public textLayerRendered = output<TextLayerRenderedEvent>();

  public annotationEditorModeChanged = output<AnnotationEditorEditorModeChangedEvent>();

  public updateFindMatchesCount = output<FindResultMatchesCount>();

  public updateFindState = output<FindState>();

  /** Legal values: undefined, 'auto', 'page-actual', 'page-fit', 'page-width', or '50' (or any other percentage) */
  public zoom = model<ZoomType>(undefined);

  /**
   * Tracks the last zoom value set from a pdf.js scalechanging event.
   * Used to break the feedback loop: pdf.js fires scalechanging → Angular updates zoom signal →
   * effect calls setZoom() → sets currentScaleValue back on pdf.js. During pinch zoom,
   * the async effect can set an outdated scale value back, causing flicker/jumping.
   */
  private _lastZoomSetByPdfJs: ZoomType | undefined;

  /**
   * True while pdf.js is actively handling a zoom gesture (pinch or Ctrl+wheel).
   * During an active gesture, pdf.js uses drawingDelay=400ms to defer page re-rendering
   * (the page stays blurry and only sharpens after the gesture ends). If Angular's
   * setZoom() writes currentScaleValue during this window, it bypasses drawingDelay
   * and triggers an immediate full re-render on every frame, causing stutter on iPad.
   */
  private _isPdfJsZooming = false;
  private _pdfJsZoomingTimeout: ReturnType<typeof setTimeout> | undefined;

  public zoomLevels = input<(string | number)[]>(['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 1, 1.25, 1.5, 2, 3, 4]);

  public maxZoom = input(10);

  public minZoom = input(0.1);

  /** This attribute allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").
   */
  public _mobileFriendlyZoom: string = '100%';

  public mobileFriendlyZoomScale = 1;

  public toolbarMarginTop = '0px';

  public toolbarWidth = '100%';

  private toolbar: HTMLElement | undefined = undefined;

  public onToolbarLoaded(toolbarElement: HTMLElement): void {
    this.toolbar = toolbarElement;
  }

  public secondaryToolbarTop: string | undefined = undefined;

  public sidebarPositionTop: string | undefined = undefined;

  public editorParamsToolbarTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarLeft: string | undefined = undefined;

  private initializationPromise: (() => Promise<void>) | null = null;
  private checkRootElementTimeout: any;
  private destroyInitialization = false;

  public get pdfJsVersion(): string {
    return getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  public get majorMinorPdfJsVersion(): string {
    const fullVersion = this.pdfJsVersion;
    const pos = fullVersion.lastIndexOf('.');
    return fullVersion.substring(0, pos).replace('.', '-');
  }

  public get enableSignatureEditor(): boolean {
    return pdfDefaultOptions.enableSignatureEditor;
  }

  public get enablePageReordering(): boolean {
    return this.enablePageReorderingInput() ?? pdfDefaultOptions.enablePageReordering;
  }

  public get enableSplitMerge(): boolean {
    return this.enableSplitMergeInput() ?? pdfDefaultOptions.enableSplitMerge;
  }

  /**
   * This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").
   */
  public mobileFriendlyZoom = input<string>('100%');

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _mobileFriendlyZoomEffect = effect(() => {
    let zoom = this.mobileFriendlyZoom();
    // tslint:disable-next-line:triple-equals - the type conversion is intended
    if (zoom == 'true') {
      zoom = '150%';
      // tslint:disable-next-line:triple-equals - the type conversion is intended
    } else if (zoom == 'false' || zoom === undefined || zoom === null) {
      zoom = '100%';
    }
    this._mobileFriendlyZoom = zoom;
    let factor = 1;
    if (!String(zoom).includes('%')) {
      zoom = 100 * Number(zoom) + '%';
    }
    factor = Number((zoom || '100').replace('%', '')) / 100;
    this.mobileFriendlyZoomScale = factor;
    this.toolbarWidth = (100 / factor).toString() + '%';
    this.toolbarMarginTop = (factor - 1) * 16 + 'px';

    // Defer position recalculation until after Angular has rendered the
    // new scale transform on the toolbar. Without this, getBoundingClientRect()
    // returns the OLD toolbar height because the DOM hasn't updated yet.
    requestAnimationFrame(() => {
      this.calcViewerPositionTop();

      // #2675 Recalculate responsive breakpoints so the toolbar buttons
      // show/hide correctly for the new effective viewport width.
      this.dynamicCSSComponent()?.updateToolbarWidth();

      // Reposition any open popups (findbar, secondary toolbar, editor toolbars)
      // so they move to the correct position after the zoom change.
      const positioningService = new PositioningService();
      positioningService.repositionOpenPopups();
    });
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _zoomEffect = effect(() => {
    const currentZoom = this.zoom(); // Track zoom signal
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    // Don't write back to pdf.js while it's actively handling a zoom gesture.
    // pdf.js uses drawingDelay=400ms during pinch/wheel zoom to defer page
    // re-rendering (pages stay blurry, then sharpen after the gesture ends).
    // If we call setZoom() → currentScaleValue here, it bypasses drawingDelay
    // and triggers an immediate full re-render on every frame, causing stutter.
    if (this._isPdfJsZooming) {
      return;
    }

    // Break the feedback loop: if this zoom value was set by a pdf.js scalechanging event,
    // don't write it back to pdf.js. This prevents flicker/jumping during pinch zoom,
    // where the async effect could set an outdated scale value back to pdf.js.
    if (this._lastZoomSetByPdfJs !== undefined && currentZoom === this._lastZoomSetByPdfJs) {
      this._lastZoomSetByPdfJs = undefined;
      return;
    }
    this._lastZoomSetByPdfJs = undefined;

    this.setZoom();
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _maxZoomEffect = effect(() => {
    const maxZoom = this.maxZoom();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication.pdfViewer) {
      PDFViewerApplication.pdfViewer.maxZoom = maxZoom;
    }
    if (PDFViewerApplication.toolbar) {
      PDFViewerApplication.toolbar.maxZoom = maxZoom;
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _minZoomEffect = effect(() => {
    const minZoom = this.minZoom();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication.pdfViewer) {
      PDFViewerApplication.pdfViewer.minZoom = minZoom;
    }
    if (PDFViewerApplication.toolbar) {
      PDFViewerApplication.toolbar.minZoom = minZoom;
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _findbarVisibleEffect = effect(() => {
    const visible = this.findbarVisible();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (visible) {
      // Only open if not already open (prevents circular dependency with findbaropen event)
      if (!PDFViewerApplication.findBar.opened) {
        PDFViewerApplication.findBar.open();
      }
    } else if (PDFViewerApplication.findBar.opened) {
      // Only close if actually open
      PDFViewerApplication.findBar.close();
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _propertiesDialogVisibleEffect = effect(() => {
    const visible = this.propertiesDialogVisible();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (visible) {
      // Only open if not already open (prevents circular dependency with propertiesdialogopen event)
      if (PDFViewerApplication.overlayManager.active !== PDFViewerApplication.pdfDocumentProperties.dialog) {
        PDFViewerApplication.pdfDocumentProperties.open();
      }
    } else if (PDFViewerApplication.overlayManager.active === PDFViewerApplication.pdfDocumentProperties.dialog) {
      // Only close if actually open
      PDFViewerApplication.pdfDocumentProperties.close();
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _pageLabelEffect = effect(() => {
    const pageLabel = this.pageLabel();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (pageLabel) {
      if (pageLabel !== PDFViewerApplication.pdfViewer.currentPageLabel) {
        PDFViewerApplication.pdfViewer.currentPageLabel = pageLabel as string;
      }
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _rotationEffect = effect(() => {
    const rotation = this.rotation();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (rotation) {
      const r = Number(rotation);
      if (r === 0 || r === 90 || r === 180 || r === 270) {
        PDFViewerApplication.pdfViewer.pagesRotation = r;
      }
    } else {
      PDFViewerApplication.pdfViewer.pagesRotation = 0;
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _activeSidebarViewEffect = effect(() => {
    const activeSidebarView = this.activeSidebarView();
    const sidebarVisible = this.sidebarVisible();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    // PDF.js v5.4.530 renamed pdfSidebar to viewsManager
    if (sidebarVisible) {
      PDFViewerApplication.viewsManager.open();
      const view = Number(activeSidebarView);
      if (view === 1 || view === 2 || view === 3 || view === 4) {
        PDFViewerApplication.viewsManager.switchView(view, true);
      } else {
        console.error('[activeSidebarView] must be an integer value between 1 and 4');
      }
    } else {
      PDFViewerApplication.viewsManager.close();
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _filenameForDownloadEffect = effect(() => {
    const filename = this.filenameForDownload();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    PDFViewerApplication.appConfig.filenameForDownload = filename;
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _nameddestEffect = effect(() => {
    const nameddest = this.nameddest();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (nameddest) {
      PDFViewerApplication.pdfLinkService.goToDestination(nameddest);
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _spreadEffect = effect(() => {
    const spread = this.spread();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (spread === 'even') {
      PDFViewerApplication.spreadModeOnLoad = 2;
      PDFViewerApplication.pdfViewer.spreadMode = 2;
      this.onSpreadChange('even');
    } else if (spread === 'odd') {
      PDFViewerApplication.spreadModeOnLoad = 1;
      PDFViewerApplication.pdfViewer.spreadMode = 1;
      this.onSpreadChange('odd');
    } else {
      PDFViewerApplication.spreadModeOnLoad = 0;
      PDFViewerApplication.pdfViewer.spreadMode = 0;
      this.onSpreadChange('off');
    }

    this.hideToolbarIfItIsEmpty();
    setTimeout(this.asyncWithCD(() => this.calcViewerPositionTop()));
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _secondaryMenuEmptyEffect = effect(() => {
    this.service.secondaryMenuIsEmpty();
    this.hideToolbarIfItIsEmpty();
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _enableDragAndDropEffect = effect(() => {
    const enableDragAndDrop = this.enableDragAndDrop();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    PDFViewerApplicationOptions.set('enableDragAndDrop', enableDragAndDrop);
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _printResolutionEffect = effect(() => {
    const printResolution = this.printResolution();
    if (typeof window === 'undefined') return;
    if (printResolution === null || printResolution === undefined) return;

    const PDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    if (PDFViewerApplicationOptions) {
      PDFViewerApplicationOptions.set('printResolution', printResolution);
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _keyboardSettingsEffect = effect(() => {
    void this.ignoreKeyboard(); // NOSONAR — void tracks signal dependency
    void this.ignoreKeys(); // NOSONAR
    void this.acceptKeys(); // NOSONAR
    if (typeof window === 'undefined') return;

    const PDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    if (PDFViewerApplicationOptions) {
      this.overrideDefaultSettings();
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _replaceBrowserPrintEffect = effect(() => {
    const replaceBrowserPrint = this.replaceBrowserPrint();
    if (typeof window === 'undefined') return;

    this.doReplaceBrowserPrint(replaceBrowserPrint);
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _disableFormsEffect = effect(() => {
    void this.disableForms(); // NOSONAR — void tracks signal dependency
    if (typeof window === 'undefined') return;

    this.enableOrDisableForms(this.elementRef.nativeElement, false);
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _showBordersEffect = effect(() => {
    const showBorders = this.showBorders();
    if (typeof window === 'undefined') return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    const PDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;

    if (PDFViewerApplicationOptions) {
      this.overrideDefaultSettings();
      const viewer = document.getElementById('viewer') as HTMLElement;
      if (viewer) {
        if (showBorders) {
          viewer.classList.remove('removePageBorders');
        } else {
          viewer.classList.add('removePageBorders');
        }

        if (PDFViewerApplication.pdfViewer) {
          PDFViewerApplication.pdfViewer.removePageBorders = !showBorders;
        }
        const zoomEvent = {
          source: viewer,
          // tslint:disable-next-line:no-bitwise
          scale: (Number(this.zoom()) | 100) / 100,
          presetValue: this.zoom(),
        } as ScaleChangingEvent;
        PDFViewerApplication.eventBus?.dispatch('scalechanging', zoomEvent);
      }
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _showUnverifiedSignaturesEffect = effect(() => {
    const showUnverifiedSignatures = this.showUnverifiedSignatures;
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication?.pdfDocument) {
      PDFViewerApplication.pdfDocument._transport.messageHandler.send('showUnverifiedSignatures', showUnverifiedSignatures);
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private readonly _enablePrintEffect = effect(() => {
    const enablePrint = this.enablePrint();
    if (typeof window === 'undefined') return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication) {
      PDFViewerApplication.enablePrint = enablePrint;
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _customComponentsEffect = effect(() => {
    void this.customFindbar; // NOSONAR — void tracks signal dependency
    void this.customFindbarButtons; // NOSONAR
    void this.customFindbarInputArea; // NOSONAR
    void this.customToolbar(); // NOSONAR
    if (typeof window === 'undefined') return;

    if (this.dummyComponents) {
      this.dummyComponents()?.addMissingStandardWidgets();
    }
  });

  public serverSideRendering = true;

  /**
   * Checks if the code is running in a browser environment.
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  public calcViewerPositionTop(): void {
    if (!this.isBrowser()) {
      return;
    }
    if (this.toolbar === undefined) {
      this.sidebarPositionTop = '0';
      return;
    }
    const top = this.toolbar.getBoundingClientRect().height;
    if (top < 33) {
      this.viewerPositionTop = '33px';
    } else {
      this.viewerPositionTop = top + 'px';
    }

    const factor = top / 33;

    if (this.primaryMenuVisible) {
      this.sidebarPositionTop = (33 + 33 * (factor - 1)).toString() + 'px';
    } else {
      this.sidebarPositionTop = '0';
    }
    this.secondaryToolbarTop = (33 + 38 * (factor - 1)).toString() + 'px';
    this.findbarTop = (33 + 38 * (factor - 1)).toString() + 'px';
    this.editorParamsToolbarTop = (33 + 38 * (factor - 1)).toString() + 'px';

    const findButton = document.getElementById('primaryViewFind');
    if (findButton) {
      const containerPositionLeft = this.toolbar.getBoundingClientRect().left;
      const findButtonPosition = findButton.getBoundingClientRect();
      const left = Math.max(0, findButtonPosition.left - containerPositionLeft);
      this.findbarLeft = left + 'px';
    } else if (this.showSidebarButton()) {
      this.findbarLeft = (34 + 32 * factor).toString() + 'px';
    } else {
      this.findbarLeft = '0';
    }

    this.cdr.markForCheck();
  }

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly notificationService: PDFNotificationService,
    private readonly elementRef: ElementRef,
    private readonly platformLocation: PlatformLocation,
    public cdr: ChangeDetectorRef,
    public service: NgxExtendedPdfViewerService,
    private readonly renderer: Renderer2,
    private readonly pdfScriptLoaderService: PDFScriptLoaderService,
    private readonly keyboardManager: NgxKeyboardManagerService,
    private readonly cspPolicyService: PdfCspPolicyService,
    private readonly iosCanvasService: IOSCanvasOptimizationService,
    private readonly ngZone: NgZone,
  ) {
    this.baseHref = this.platformLocation.getBaseHrefFromDOM();
    if (isPlatformBrowser(this.platformId)) {
      this.serverSideRendering = false;
      this.toolbarWidth = String(document.body.clientWidth);
    }
  }

  /**
   * Detects if the application is running in zoneless mode (Angular 21+)
   * @returns true if zone.js is not present
   */
  private isZoneless(): boolean {
    const Zone = (globalThis as any).Zone;
    return typeof Zone === 'undefined' || !Zone?.current;
  }

  /**
   * Wraps an async callback to ensure change detection in zoneless mode.
   * In zone.js mode: Zero overhead - Zone handles change detection automatically
   * In zoneless mode: Manually triggers change detection after callback
   *
   * @param callback The function to execute
   * @returns Wrapped function that triggers CD in zoneless mode
   *
   * @example
   * // Instead of:
   * queueMicrotask(() => this.progress.emit(x));
   *
   * // Use:
   * queueMicrotask(this.asyncWithCD(() => this.progress.emit(x)));
   */
  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (this.isZoneless()) {
        this.cdr.detectChanges();
      }
    };
  }
  // #TODO End of zoneless support

  private reportSourceChanges(change: { sourcefile: string }): void {
    this._src = change.sourcefile;
    this.srcChangeTriggeredByUser = true;
    this.src.set(change.sourcefile);
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (this.filenameForDownload()) {
      PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload();
    } else {
      PDFViewerApplication.appConfig.filenameForDownload = this.guessFilenameFromUrl(this._src);
    }
  }

  private handleStoredValuesAvailable(event: any): void {
    // Only apply stored values if developer hasn't explicitly set zoom/page

    // Apply stored zoom if zoom is not explicitly set by developer
    if (this.zoom() === undefined && event.storedZoom !== undefined) {
      this.zoom.set(event.storedZoom as ZoomType);
    }

    // Apply stored page if page is not explicitly set by developer
    if (this._page === undefined && event.storedPage !== undefined) {
      this._page = event.storedPage;
    }
  }

  public ngOnInit() {
    this.hideToolbarIfItIsEmpty();
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        this.initializationPromise = this.initialize;
        this.initializationPromise();
      });
    }
  }

  private async initialize(): Promise<void> {
    try {
      await this.waitForRootElement();

      if (this.destroyInitialization) return;

      if (isPlatformBrowser(this.platformId)) {
        this.addTranslationsUnlessProvidedByTheUser();
        await this.waitUntilOldComponentIsGone();
        if (this.destroyInitialization) return;

        await this.pdfScriptLoaderService.ensurePdfJsHasBeenLoaded(this.useInlineScripts(), this.forceUsingLegacyES5(), this.forceFullReloadOfJavaScriptCode());
        if (this.destroyInitialization) return;

        if (this.formSupport) {
          this.formSupport.registerFormSupportWithPdfjs(this.pdfScriptLoaderService.PDFViewerApplication);
          this.keyboardManager.registerKeyboardListener(this.pdfScriptLoaderService.PDFViewerApplication);
          this.formSupport.ngZone = this.ngZone;
          this.formSupport.cdr = this.cdr;
        }
        this.pdfScriptLoaderService.PDFViewerApplication.cspPolicyService = this.cspPolicyService;

        // Initialize iOS canvas optimization service with PDFViewerApplication
        this.iosCanvasService.initialize(this.pdfScriptLoaderService.PDFViewerApplication);

        this.ngZone.runOutsideAngular(() => this.doInitPDFViewer());
      }
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }

  private async waitForRootElement(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const checkRootElement = () => {
        if (this.destroyInitialization) {
          reject(new Error('Component destroyed'));
          return;
        }

        // #2853 modified by ngx-extended-pdf-viewer
        // When [customPdfViewer] is used, the #root template ref may not resolve
        // because viewChild can't see refs in externally-defined templates.
        // Fall back to finding the .zoom element by class as a workaround.
        const rootEl = this.root()?.nativeElement || this.elementRef?.nativeElement?.querySelector('.zoom');
        if (rootEl?.offsetParent) {
          resolve();
        } else {
          this.checkRootElementTimeout = setTimeout(this.asyncWithCD(checkRootElement), 50);
        }
      };
      checkRootElement();
    });
  }

  private async waitUntilOldComponentIsGone(): Promise<void> {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (!this.service.ngxExtendedPdfViewerInitialized) {
          clearInterval(interval);
          resolve();
        }
      }, 10);
    });
  }

  private assignTabindexes() {
    if (this.startTabindex) {
      // #2853 modified by ngx-extended-pdf-viewer
      const rootEl = this.root()?.nativeElement || this.elementRef?.nativeElement?.querySelector('.zoom');
      if (!rootEl) {
        return;
      }
      const r = rootEl.cloneNode(true) as HTMLElement;
      // #2853 end of modification by ngx-extended-pdf-viewer
      r.classList.add('offscreen');
      this.showElementsRecursively(r);
      document.body.appendChild(r);
      const elements = this.collectElementPositions(r, rootEl, []);
      r.remove();
      const topRightGreaterThanBottomLeftComparator = (a: any, b: any) => {
        if (a.y - b.y > 15) {
          return 1;
        }
        if (b.y - a.y > 15) {
          return -1;
        }
        return a.x - b.x;
      };
      const sorted = [...elements].sort(topRightGreaterThanBottomLeftComparator);

      // #3074 modified by ngx-extended-pdf-viewer
      // Assign tab indexes, inserting popup elements immediately after their trigger buttons
      let tabIndex = this.startTabindex() ?? 0;
      for (let i = 0; i < sorted.length; i++) {
        sorted[i].element.tabIndex = tabIndex++;

        // If this element controls a popup, assign tab indexes to popup elements next
        if (sorted[i].popupElements && sorted[i].popupElements!.length > 0) {
          for (const popupElement of sorted[i].popupElements!) {
            popupElement.tabIndex = tabIndex++;
          }
        }
      }
      // #3074 end of modification by ngx-extended-pdf-viewer
    }
  }

  private showElementsRecursively(root: Element): void {
    const classesToRemove = [
      'hidden',
      'invisible',
      'hiddenXXLView',
      'hiddenXLView',
      'hiddenLargeView',
      'hiddenMediumView',
      'hiddenSmallView',
      'hiddenTinyView',
      'visibleXXLView',
      'visibleXLView',
      'visibleLargeView',
      'visibleMediumView',
      'visibleSmallView',
      'visibleTinyView',
    ];

    root.classList.remove(...classesToRemove);

    if (root instanceof HTMLButtonElement || root instanceof HTMLAnchorElement || root instanceof HTMLInputElement || root instanceof HTMLSelectElement) {
      return;
    } else if (root.childElementCount > 0) {
      for (let i = 0; i < root.childElementCount; i++) {
        const c = root.children.item(i);
        if (c) {
          this.showElementsRecursively(c);
        }
      }
    }
  }

  private collectElementPositions(copy: Element, original: Element, elements: Array<ElementAndPosition>): Array<ElementAndPosition> {
    // #3074 modified by ngx-extended-pdf-viewer
    // Skip elements inside editor params toolbars - they'll be collected via aria-controls
    if (copy.classList.contains('editorParamsToolbar')) {
      return elements;
    }
    // #3074 end of modification by ngx-extended-pdf-viewer

    if (copy instanceof HTMLButtonElement || copy instanceof HTMLAnchorElement || copy instanceof HTMLInputElement || copy instanceof HTMLSelectElement) {
      const rect = copy.getBoundingClientRect();
      const elementAndPos = {
        element: original,
        x: Math.round(rect.left),
        y: Math.round(rect.top),
      } as ElementAndPosition;

      // #3074 modified by ngx-extended-pdf-viewer
      // If this element controls a popup (aria-controls), collect popup elements
      const ariaControls = (original as HTMLElement).getAttribute('aria-controls');
      if (ariaControls) {
        const popupElements = this.collectPopupElements(ariaControls);
        if (popupElements.length > 0) {
          elementAndPos.popupElements = popupElements;
        }
      }
      // #3074 end of modification by ngx-extended-pdf-viewer

      elements.push(elementAndPos);
    } else if (copy.childElementCount > 0) {
      for (let i = 0; i < copy.childElementCount; i++) {
        const c = copy.children.item(i);
        const o = original.children.item(i);
        if (c && o) {
          elements = this.collectElementPositions(c, o, elements);
        }
      }
    }
    return elements;
  }

  // #3074 modified by ngx-extended-pdf-viewer
  /**
   * Collect focusable elements from a popup identified by aria-controls ID
   * These elements should appear in tab order immediately after the trigger button
   */
  private collectPopupElements(ariaControls: string): Array<HTMLElement> {
    const popup = this.root()?.nativeElement.querySelector(`#${ariaControls}`);
    if (!popup) {
      return [];
    }

    const selector = 'button:not([tabindex="-1"]), a:not([tabindex="-1"]), input:not([tabindex="-1"]), select:not([tabindex="-1"])';
    const focusableElements = popup.querySelectorAll(selector);
    const elementsArray = Array.from(focusableElements) as Array<HTMLElement>;
    return elementsArray;
  }
  // #3074 end of modification by ngx-extended-pdf-viewer

  private readonly afterPrintListener = () => {
    this.afterPrint.emit();
  };

  private readonly beforePrintListener = () => {
    this.beforePrint.emit();
  };

  private guessFilenameFromUrl(src: unknown): string | undefined {
    if (src && typeof src === 'string') {
      const slash = src.lastIndexOf('/');
      if (slash > 0) {
        return src.substring(slash + 1);
      } else {
        return src;
      }
    }
    return undefined;
  }

  private doInitPDFViewer() {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }

    if (this.service.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("You're trying to open two instances of the PDF viewer. Most likely, this will result in errors.");
    }
    this.overrideDefaultSettings();
    const onLoaded = () => {
      if (!this.pdfScriptLoaderService.PDFViewerApplication.eventBus) {
        console.error("Eventbus is null? Let's try again.");
        setTimeout(
          this.asyncWithCD(() => {
            onLoaded();
          }),
          10,
        );
      } else {
        this.localizationInitialized = true;
        if (!this.destroyInitialization) {
          // hurried users sometimes reload the PDF before it has finished initializing
          this.calcViewerPositionTop();
          this.afterLibraryInit();
          this.openPDF();
          this.assignTabindexes();
          if (this.replaceBrowserPrint()) {
            this.doReplaceBrowserPrint(this.replaceBrowserPrint());
          }
        }
      }
    };
    document.addEventListener('webviewerinitialized', onLoaded, { once: true });

    this.activateTextlayerIfNecessary(null);

    // #2984 modified by ngx-extended-pdf-viewer
    // Wait for Angular to render critical DOM elements before initializing PDF.js
    // This ensures viewsManager and thumbnailView are available when webViewerLoad() executes
    const waitForDOMElements = (callback: () => void, maxAttempts = 50, delay = 10) => {
      let attempts = 0;
      const checkElements = () => {
        const thumbnailsView = document.getElementById('thumbnailsView');
        const viewsManagerContent = document.getElementById('viewsManagerContent');

        if (thumbnailsView && viewsManagerContent) {
          // Elements are ready, proceed with initialization
          callback();
        } else if (attempts < maxAttempts) {
          // Elements not ready yet, try again
          attempts++;
          setTimeout(checkElements, delay);
        } else {
          // Max attempts reached, proceed anyway (fallback)
          console.warn('ngx-extended-pdf-viewer: DOM elements not ready after', maxAttempts * delay, 'ms. Proceeding with initialization anyway.');
          callback();
        }
      };
      checkElements();
    };

    waitForDOMElements(
      this.asyncWithCD(() => {
        if (!this.destroyInitialization) {
          // hurried users sometimes reload the PDF before it has finished initializing
          // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
          this.initResizeObserver();
          this.onResize();
          this.hideToolbarIfItIsEmpty();
          // #2853 modified by ngx-extended-pdf-viewer
          // When [customPdfViewer] is used, viewChild can't find the component
          // in externally-defined templates. Fall back to finding it via the DOM.
          const dummy = this.dummyComponents();
          if (dummy) {
            dummy.addMissingStandardWidgets();
          } else {
            PdfDummyComponentsComponent.addMissingStandardWidgetsStatic();
          }
          // #2853 end of modification by ngx-extended-pdf-viewer
          if (this.pdfScriptLoaderService.PDFViewerApplicationOptions) {
            const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
            (globalThis as any).PDFViewerApplicationOptions = PDFViewerApplicationOptions;
          }

          this.pdfScriptLoaderService.webViewerLoad(this.cspPolicyService);

          const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
          PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
          const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;

          PDFViewerApplicationOptions.set('enableDragAndDrop', this.enableDragAndDrop());
          PDFViewerApplicationOptions.set('localeProperties', { lang: this.language() });
          PDFViewerApplicationOptions.set('imageResourcesPath', this.imageResourcesPath());
          PDFViewerApplicationOptions.set('minZoom', this.minZoom());
          PDFViewerApplicationOptions.set('maxZoom', this.maxZoom());
          PDFViewerApplicationOptions.set('pageViewMode', this.pageViewMode());
          PDFViewerApplicationOptions.set('verbosity', this.logLevel());
          PDFViewerApplicationOptions.set('pdfBackgroundColor', this.pdfBackgroundColor());
          if (this.theme() === 'dark') {
            PDFViewerApplicationOptions.set('viewerCssTheme', 2);
          } else if (this.theme() === 'light') {
            PDFViewerApplicationOptions.set('viewerCssTheme', 1);
          }

          PDFViewerApplication.isViewerEmbedded = true;
          if (PDFViewerApplication.printKeyDownListener) {
            window.addEventListener('keydown', PDFViewerApplication.printKeyDownListener, true);
          }

          const body = document.getElementsByTagName('body');
          if (body[0]) {
            const topLevelElements = body[0].children;
            for (let i = topLevelElements.length - 1; i >= 0; i--) {
              const e = topLevelElements.item(i);
              if (e?.id === 'printContainer') {
                e.remove();
              }
            }
          }
          const pc = document.getElementById('printContainer');
          if (pc) {
            document.getElementsByTagName('body')[0].appendChild(pc);
          }
        }
      }),
    );
    // #2984 end of modification by ngx-extended-pdf-viewer
  }

  private addTranslationsUnlessProvidedByTheUser() {
    const link = this.renderer.createElement('link');
    link.rel = 'resource';
    link.type = 'application/l10n';
    link.href = this.localeFolderPath() + '/locale.json';

    link.setAttribute('origin', 'ngx-extended-pdf-viewer');
    this.renderer.appendChild(this.elementRef.nativeElement, link);
  }

  private hideToolbarIfItIsEmpty() {
    this.primaryMenuVisible = this.showToolbar();
    if (!this.showSecondaryToolbarButton() || this.service.secondaryMenuIsEmpty()) {
      if (!this.isPrimaryMenuVisible()) {
        this.primaryMenuVisible = false;
      }
    }
  }

  /** Notifies every widget that implements onLibraryInit() that the PDF viewer objects are available */
  private afterLibraryInit() {
    // Store the original color-scheme value before PDF.js might change it
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && this.originalColorScheme === null) {
      const docStyle = document.documentElement.style;
      this.originalColorScheme = docStyle.getPropertyValue('color-scheme') || '';
    }

    queueMicrotask(this.asyncWithCD(() => this.notificationService.onPDFJSInitSignal.set(this.pdfScriptLoaderService.PDFViewerApplication)));
  }

  public onSpreadChange(newSpread: 'off' | 'even' | 'odd'): void {
    this.spread.set(newSpread);
  }

  private readonly toggleVisibility = (elementId: string, cssClass = 'invisible') => {
    const element = document.getElementById(elementId) as HTMLElement;
    element?.classList.remove(cssClass);
  };

  private activateTextlayerIfNecessary(options: any): void {
    const setTextLayerMode = (mode: number) => {
      options?.set('textLayerMode', mode);
      this.pdfScriptLoaderService.PDFViewerApplication.pdfViewer?.setTextLayerMode(mode);
    };

    if (this.textLayer() === undefined) {
      if (!this.handTool()) {
        setTextLayerMode(pdfDefaultOptions.textLayerMode);
        if (this.showFindButton() === undefined) {
          setTimeout(
            this.asyncWithCD(() => {
              this.toggleVisibility('viewFind');
              this.toggleVisibility('findbar');
            }),
          );
        }
      } else {
        setTextLayerMode(this.showHandToolButton() ? pdfDefaultOptions.textLayerMode : 0);

        if (!this.showHandToolButton()) {
          if (this.showFindButton() || this.showFindButton() === undefined) {
            if (this.logLevel() >= VerbosityLevel.WARNINGS) {
              console.warn(
                // tslint:disable-next-line:max-line-length
                'Hiding the "find" button because the text layer of the PDF file is not rendered. Use [textLayer]="true" to enable the find button.',
              );
            }
          }
          if (this.showHandToolButton()) {
            if (this.logLevel() >= VerbosityLevel.WARNINGS) {
              console.warn(
                // tslint:disable-next-line:max-line-length
                'Hiding the "hand tool / selection mode" menu because the text layer of the PDF file is not rendered. Use [textLayer]="true" to enable the the menu items.',
              );
            }
          }
        }
      }
    } else {
      setTextLayerMode(pdfDefaultOptions.textLayerMode);
      if (this.showFindButton() === undefined) {
        setTimeout(
          this.asyncWithCD(() => {
            this.toggleVisibility('viewFind');
            this.toggleVisibility('findbar');
          }),
        );
      }
    }
  }

  private async overrideDefaultSettings() {
    if (typeof window === 'undefined') {
      return; // server side rendering
    }
    const options = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    // tslint:disable-next-line:forin
    const optionsToIgnore = new Set([
      'needsES5',
      'rangeChunkSize',
      '_internalFilenameSuffix',
      'assetsFolder',
      'doubleTapZoomFactor',
      'doubleTapZoomsInHandMode',
      'doubleTapZoomsInTextSelectionMode',
      'doubleTapResetsZoomOnSecondDoubleTap',
    ]);
    // Apply component inputs to pdfDefaultOptions before passing to AppOptions
    const enablePageReorderingInput = this.enablePageReorderingInput();
    if (enablePageReorderingInput !== undefined) {
      pdfDefaultOptions.enablePageReordering = enablePageReorderingInput;
    }
    const enableSplitMergeInput = this.enableSplitMergeInput();
    if (enableSplitMergeInput !== undefined) {
      pdfDefaultOptions.enableSplitMerge = enableSplitMergeInput;
    }

    for (const key in pdfDefaultOptions) {
      if (!optionsToIgnore.has(key)) {
        const option = (pdfDefaultOptions as any)[key];
        if (key !== 'findController' && typeof option === 'function') {
          options.set(key, option());
        } else {
          options.set(key, (pdfDefaultOptions as any)[key]);
        }
      }
    }
    options.set('disablePreferences', true);
    await this.setZoom();

    this.keyboardManager.ignoreKeyboard = this.ignoreKeyboard();
    this.keyboardManager.ignoreKeys = this.ignoreKeys();
    this.keyboardManager.acceptKeys = this.acceptKeys();
    this.activateTextlayerIfNecessary(options);

    if (this.scrollMode() || this.scrollMode() === ScrollModeType.vertical) {
      options.set('scrollModeOnLoad', this.scrollMode());
    }

    const sidebarVisible = this.sidebarVisible();
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;

    if (sidebarVisible !== undefined) {
      PDFViewerApplication.sidebarViewOnLoad = sidebarVisible ? 1 : 0;
      if (PDFViewerApplication.appConfig) {
        PDFViewerApplication.appConfig.sidebarViewOnLoad = sidebarVisible ? this.activeSidebarView() : PdfSidebarView.NONE;
      }
      options.set('sidebarViewOnLoad', this.sidebarVisible() ? this.activeSidebarView() : 0);
    }
    if (this.spread() === 'even') {
      options.set('spreadModeOnLoad', 2);
      if (PDFViewerApplication.pdfViewer) {
        PDFViewerApplication.pdfViewer.spreadMode = 2;
      }
      this.onSpreadChange('even');
    } else if (this.spread() === 'odd') {
      options.set('spreadModeOnLoad', 1);
      if (PDFViewerApplication.pdfViewer) {
        PDFViewerApplication.pdfViewer.spreadMode = 1;
      }
      this.onSpreadChange('odd');
    } else {
      options.set('spreadModeOnLoad', 0);
      if (PDFViewerApplication.pdfViewer) {
        PDFViewerApplication.pdfViewer.spreadMode = 0;
      }
      this.onSpreadChange('off');
    }
    options.set('readingDirection', this.readingDirection());
    if (this.printResolution()) {
      options.set('printResolution', this.printResolution());
    }
    if (this.showBorders() === false) {
      options.set('removePageBorders', !this.showBorders());
    }
    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    PDFViewerApplicationOptions.set('localeProperties', { lang: this.language() });
  }

  private async openPDF(): Promise<void> {
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    PDFViewerApplication.serviceWorkerOptions.showUnverifiedSignatures = this.showUnverifiedSignatures();
    PDFViewerApplication.enablePrint = this.enablePrint();
    if (this.filenameForDownload()) {
      PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload();
    } else {
      PDFViewerApplication.appConfig.filenameForDownload = this.guessFilenameFromUrl(this._src);
    }
    this.service.ngxExtendedPdfViewerInitialized = true;
    this.registerEventListeners(PDFViewerApplication);
    this.selectCursorTool();
    if (!this.listenToURL()) {
      PDFViewerApplication.pdfLinkService.setHash = undefined;
    }

    if (this._src) {
      this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized = false;

      setTimeout(
        this.asyncWithCD(async () => this.dynamicCSSComponent()?.checkHeight(this, this.logLevel())),
        100,
      );
      // open a file in the viewer
      if (!!this._src) {
        let workerSrc: string | (() => string) = pdfDefaultOptions.workerSrc;
        if (typeof workerSrc === 'function') {
          workerSrc = workerSrc();
        }
        const options: any = {
          password: this.password(),
          verbosity: this.logLevel(),
          workerSrc,
        };
        if ((this._src as any)['range']) {
          options.range = (this._src as any)['range'];
        }
        if (this.httpHeaders()) {
          options.httpHeaders = this.httpHeaders();
        }
        if (this.authorization()) {
          options.withCredentials = true;

          if (typeof this.authorization() != 'boolean') {
            if (!options.httpHeaders) options.httpHeaders = {};

            options.httpHeaders.Authorization = this.authorization();
          }
        }
        options.baseHref = this.baseHref;
        PDFViewerApplication.onError = (error: Error) => this.pdfLoadingFailed.emit(error);
        if (typeof this._src === 'string') {
          options.url = this._src;
        } else if (this._src instanceof ArrayBuffer) {
          // #3131 Clone the buffer so the original survives pdf.js transferring it to the worker thread.
          options.data = this._src.slice(0);
        } else if (this._src instanceof Uint8Array) {
          // #3131 Clone the buffer so the original survives pdf.js transferring it to the worker thread.
          options.data = new Uint8Array(this._src);
        }
        options.rangeChunkSize = pdfDefaultOptions.rangeChunkSize;
        options.cspPolicyService = this.cspPolicyService;
        PDFViewerApplication.findBar?.close();
        PDFViewerApplication.secondaryToolbar?.close();
        PDFViewerApplication.eventBus.dispatch('annotationeditormodechanged', { mode: 0 });

        this._lastOpenedSrc = this._src; // #3131
        await PDFViewerApplication.open(options);
        this.pdfLoadingStarts.emit({});
        // #3131 Set zoom synchronously (awaited) instead of via setTimeout to avoid
        // a timing window where the zoom change could cancel in-progress first page rendering.
        await this.setZoom();
      }
      setTimeout(
        this.asyncWithCD(() => {
          if (!this.destroyInitialization) {
            // hurried users sometimes reload the PDF before it has finished initializing
            if (this.page()) {
              PDFViewerApplication.page = Number(this.page());
            }
          }
        }),
        100,
      );
    }
  }

  private registerEventListeners(PDFViewerApplication: IPDFViewerApplication) {
    // #3131 Use AbortController to unregister all listeners on destroy in one call.
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const { signal } = this.eventBusAbortController;
    const opts = { signal };

    PDFViewerApplication.eventBus.on('sourcechanged', this.reportSourceChanges.bind(this), opts);
    PDFViewerApplication.eventBus.on('afterprint', this.afterPrintListener, opts);
    PDFViewerApplication.eventBus.on('beforeprint', this.beforePrintListener, opts);

    PDFViewerApplication.eventBus.on('annotation-editor-event', (x: AnnotationEditorEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          if (this.destroyInitialization) return;
          this.annotationEditorEvent.emit(x);
        }),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('toggleSidebar', (x: ToggleSidebarEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.sidebarVisible.set(x.visible);
        }),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('textlayerrendered', (x: TextLayerRenderedEvent) => {
      queueMicrotask(this.asyncWithCD(() => this.textLayerRendered.emit(x)));
    }, opts);

    PDFViewerApplication.eventBus.on('annotationeditormodechanged', (x: AnnotationEditorEditorModeChangedEvent) => {
      // we're using a timeout here to make sure the editor is already visible
      // when the event is caught. Pdf.js fires it a bit early.
      setTimeout(
        this.asyncWithCD(() => {
          if (this.destroyInitialization) return;
          this.annotationEditorModeChanged.emit(x);
        }),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('scrollmodechanged', (x: ScrollModeChangedEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.scrollMode.set(x.mode);
          if (x.mode === ScrollModeType.page) {
            if (this.pageViewMode() !== 'single') {
              this.pageViewMode.set('single');
            }
          }
        }),
      );
    }, opts);
    // #2673 Listen for pageViewMode changes to restore height when leaving infinite-scroll
    PDFViewerApplication.eventBus.on('pageviewmodechanged', (x: any) => {
      if (x.mode === 'single') {
        // Restore height after switching away from infinite-scroll
        setTimeout(
          this.asyncWithCD(() => {
            this.dynamicCSSComponent()?.removeScrollbarInInfiniteScrollMode(true, this.pageViewMode(), this.primaryMenuVisible, this, this.logLevel());
          }),
        );
      }
    }, opts);
    // #2673 end of modification
    PDFViewerApplication.eventBus.on('progress', (x: ProgressBarEvent) => {
      queueMicrotask(this.asyncWithCD(() => this.progress.emit(x)));
    }, opts);
    PDFViewerApplication.eventBus.on('findbarclose', () => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.findbarVisible.set(false);
        }),
      );
    }, opts);
    PDFViewerApplication.eventBus.on('findbaropen', () => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.findbarVisible.set(true);
        }),
      );
    }, opts);
    PDFViewerApplication.eventBus.on('propertiesdialogclose', () => {
      this.propertiesDialogVisible.set(false);
    }, opts);
    PDFViewerApplication.eventBus.on('propertiesdialogopen', () => {
      this.propertiesDialogVisible.set(true);
    }, opts);

    PDFViewerApplication.eventBus.on('pagesloaded', (x: PagesLoadedEvent) => {
      queueMicrotask(this.asyncWithCD(() => this.pagesLoaded.emit(x)));
      this.dynamicCSSComponent()?.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode(), this.primaryMenuVisible, this, this.logLevel());
      if (this.rotation() !== undefined && this.rotation() !== null) {
        const r = Number(this.rotation());
        if (r === 0 || r === 90 || r === 180 || r === 270) {
          PDFViewerApplication.pdfViewer.pagesRotation = r;
        }
      }
      setTimeout(
        this.asyncWithCD(() => {
          if (!this.destroyInitialization) {
            // hurried users sometimes reload the PDF before it has finished initializing
            if (this.nameddest()) {
              PDFViewerApplication.pdfLinkService.goToDestination(this.nameddest());
            } else if (this.page()) {
              PDFViewerApplication.page = Number(this.page());
            } else if (this.pageLabel()) {
              PDFViewerApplication.pdfViewer.currentPageLabel = this.pageLabel();
            }
          }
        }),
      );
      this.setZoom();
    }, opts);
    PDFViewerApplication.eventBus.on('pagerendered', (x: PageRenderedEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.pageRendered.emit(x);
          this.dynamicCSSComponent()?.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode(), this.primaryMenuVisible, this, this.logLevel());
        }),
      );
    }, opts);
    PDFViewerApplication.eventBus.on('pagerender', (x: PageRenderEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.pageRender.emit(x);
        }),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('download', (x: PdfDownloadedEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.pdfDownloaded.emit(x);
        }),
      );
    }, opts);
    PDFViewerApplication.eventBus.on('scalechanging', (x: ScaleChangingEvent) => {
      // #3060 modified by ngx-extended-pdf-viewer - diagnostic logging for iOS scale bug
      if (x.scale < 0.15 || (x.previousScale && x.previousScale < 0.15)) {
        console.log(
          `[#3060 DEBUG] scalechanging event: scale=${x.scale}, previousScale=${x.previousScale}, presetValue=${x.presetValue}, this.zoom=${this.zoom()}, source=${x.source?.constructor?.name}`,
        );
      }
      // #3060 end of modification by ngx-extended-pdf-viewer

      // Mark that pdf.js is actively zooming (pinch or Ctrl+wheel). While this
      // flag is set, the _zoomEffect skips calling setZoom() to avoid triggering
      // immediate re-renders that bypass pdf.js's drawingDelay (400ms). The flag
      // is cleared 500ms after the last scalechanging event — slightly longer than
      // drawingDelay so that pdf.js finishes its deferred render first.
      this._isPdfJsZooming = true;
      clearTimeout(this._pdfJsZoomingTimeout);
      this._pdfJsZoomingTimeout = setTimeout(() => {
        this._isPdfJsZooming = false;
      }, 500);

      setTimeout(
        this.asyncWithCD(() => {
          if (this.destroyInitialization) return;
          // Round to 4 decimal places (0.01% precision) to avoid floating-point artifacts
          // This precision is sufficient even for theoretical 80K displays and far exceeds human visual acuity
          const roundedScale = Math.round(x.scale * 10000) / 10000;
          this.currentZoomFactor.emit(roundedScale);
        }),
      );

      if (x.presetValue !== 'auto' && x.presetValue !== 'page-fit' && x.presetValue !== 'page-actual' && x.presetValue !== 'page-width') {
        // ignore rounding differences
        if (Math.abs(x.previousScale - x.scale) > 0.000001) {
          const newZoom = x.scale * 100;
          this._lastZoomSetByPdfJs = newZoom;
          this.zoom.set(newZoom);
        }
      } else if (x.previousPresetValue !== x.presetValue) {
        // called when the user selects one of the text values of the zoom select dropdown
        this._lastZoomSetByPdfJs = x.presetValue;
        this.zoom.set(x.presetValue);
      }
    }, opts);

    PDFViewerApplication.eventBus.on('rotationchanging', (x: PagesRotationEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.rotation.set(x.pagesRotation as 0 | 90 | 180 | 270);
        }),
      );
    }, opts);
    PDFViewerApplication.eventBus.on('fileinputchange', (x: FileInputChanged) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          if (x.fileInput.files && x.fileInput.files.length >= 1) {
            // drag and drop
            this.srcChangeTriggeredByUser = true;
            this.src.set(x.fileInput.files[0].name);
          } else {
            // regular file open dialog
            const path = x.fileInput?.value?.replace('C:\\fakepath\\', '');
            this.src.set(path);
          }
        }),
      );
    }, opts);
    PDFViewerApplication.eventBus.on('cursortoolchanged', (x: HandtoolChanged) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.handTool.set(x.tool === PdfCursorTools.HAND);
          // #3140 modified by ngx-extended-pdf-viewer
          // When the page-flip button is shown, the cursor tool controls enableFlipByDrag:
          // PAGE_FLIP mode enables drag-to-flip, other modes disable it.
          // When the button is not shown, enableFlipByDrag is controlled by the [enableFlipByDrag] input.
          if (this.showPageFlipButton() && PDFViewerApplication?.pdfViewer) {
            PDFViewerApplication.pdfViewer.enableFlipByDrag = x.tool === PdfCursorTools.PAGE_FLIP;
          }
          // #3140 end of modification by ngx-extended-pdf-viewer
        }),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('sidebarviewchanged', (x: SidebarviewChange) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.sidebarVisible.set(x.view > 0);
          if (x.view > 0) {
            this.activeSidebarView.set(x.view);
          }
          if (this.sidebarComponent) {
            this.sidebarComponent()?.showToolbarWhenNecessary();
          }
        }),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('storedvaluesavailable', (event) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.handleStoredValuesAvailable(event);
        }),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('documentloaded', (pdfLoadedEvent: PdfDocumentLoadedEvent) => {
      queueMicrotask(
        this.asyncWithCD(async () => {
          const pages = pdfLoadedEvent.source.pagesCount;
          this.pageLabel.set(undefined);
          if (this.page() && this.page()! >= pages) {
            this.page.set(pages);
          }
          this.scrollSignatureWarningIntoView(pdfLoadedEvent.source.pdfDocument);
          this.pdfLoaded.emit({ pagesCount: pdfLoadedEvent.source.pdfDocument?.numPages } as PdfLoadedEvent);
          if (this.findbarVisible()) {
            PDFViewerApplication.findBar.open();
          }
          if (this.propertiesDialogVisible()) {
            PDFViewerApplication.pdfDocumentProperties.open();
          }
          this.hasTextLayer = this.textLayer() === true;

          // #2691 modified by ngx-extended-pdf-viewer
          // If initial form data was provided, update the baseline for change detection
          // after the document is loaded and form fields are initialized
          if (this.initialAngularFormData && PDFViewerApplication.setInitialAnnotationValues) {
            setTimeout(
              this.asyncWithCD(() => {
                PDFViewerApplication.setInitialAnnotationValues?.();
              }),
              200,
            ); // Allow time for form fields to be rendered and initialized
          }
          // #2691 end of modification by ngx-extended-pdf-viewer
        }),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('spreadmodechanged', (event) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          const modes = ['off', 'odd', 'even'] as Array<SpreadType>;
          this.spread.set(modes[event.mode]);
        }),
      );
    }, opts);

    const hideSidebarToolbar = () => {
      queueMicrotask(
        this.asyncWithCD(() => {
          if (this.sidebarComponent) {
            this.sidebarComponent()?.showToolbarWhenNecessary();
          }
        }),
      );
    };

    PDFViewerApplication.eventBus.on('outlineloaded', hideSidebarToolbar, opts);

    PDFViewerApplication.eventBus.on('attachmentsloaded', hideSidebarToolbar, opts);

    PDFViewerApplication.eventBus.on('layersloaded', hideSidebarToolbar, opts);

    PDFViewerApplication.eventBus.on('annotationlayerrendered', (event: AnnotationLayerRenderedEvent) => {
      const div = event.source.div;
      queueMicrotask(
        this.asyncWithCD(() => {
          // #3131 formSupport can be undefined if the component was destroyed before this microtask runs
          if (!this.formSupport) {
            return;
          }
          event.initialFormDataStoredInThePDF = this.formSupport.initialFormDataStoredInThePDF;
          this.annotationLayerRendered.emit(event);
          this.enableOrDisableForms(div, true);
        }),
      );
    }, opts);
    PDFViewerApplication.eventBus.on('linkannotationsadded', (event: LinkAnnotationsAddedEvent) =>
      queueMicrotask(this.asyncWithCD(() => this.linkAnnotationsAdded.emit(event))),
    opts);
    PDFViewerApplication.eventBus.on('annotationeditorlayerrendered', (event) =>
      queueMicrotask(this.asyncWithCD(() => this.annotationEditorLayerRendered.emit(event))),
    opts);
    PDFViewerApplication.eventBus.on('xfalayerrendered', (event) => queueMicrotask(this.asyncWithCD(() => this.xfaLayerRendered.emit(event))), opts);
    PDFViewerApplication.eventBus.on('outlineloaded', (event) => queueMicrotask(this.asyncWithCD(() => this.outlineLoaded.emit(event))), opts);
    PDFViewerApplication.eventBus.on('attachmentsloaded', (event) => queueMicrotask(this.asyncWithCD(() => this.attachmentsloaded.emit(event))), opts);
    PDFViewerApplication.eventBus.on('layersloaded', (event) => queueMicrotask(this.asyncWithCD(() => this.layersloaded.emit(event))), opts);
    PDFViewerApplication.eventBus.on('presentationmodechanged', () => {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
      PDFViewerApplication?.pdfViewer?.destroyBookMode();
    }, opts);

    PDFViewerApplication.eventBus.on('updatefindcontrolstate', (x: FindResult) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          let type = PDFViewerApplication.findController.state?.type ?? 'find';
          if (type === 'again') {
            type = 'findagain';
          }
          const result = {
            caseSensitive: PDFViewerApplication.findController.state?.caseSensitive,
            entireWord: PDFViewerApplication.findController.state?.entireWord,
            findPrevious: PDFViewerApplication.findController.state?.findPrevious,
            highlightAll: PDFViewerApplication.findController.state?.highlightAll,
            matchDiacritics: PDFViewerApplication.findController.state?.matchDiacritics,
            query: PDFViewerApplication.findController.state?.query,
            type,
          };
          this.updateFindMatchesCount.emit({
            ...result,
            current: x.matchesCount.current,
            total: x.matchesCount.total,
            matches: PDFViewerApplication.findController._pageMatches ?? [],
            matchesLength: PDFViewerApplication.findController._pageMatchesLength ?? [],
          } as FindResultMatchesCount); // TODO: remove the cast because it's just duct tape

          if (this.updateFindState) {
            this.updateFindState.emit(x.state);
          }
        }),
      );
    }, opts);
    PDFViewerApplication.eventBus.on('updatefindmatchescount', (x: FindResult) => {
      x.matchesCount.matches = PDFViewerApplication.findController._pageMatches ?? [];
      x.matchesCount.matchesLength = PDFViewerApplication.findController._pageMatchesLength ?? [];
      queueMicrotask(
        this.asyncWithCD(() =>
          this.updateFindMatchesCount.emit({
            caseSensitive: PDFViewerApplication.findController.state?.caseSensitive ?? false,
            entireWord: PDFViewerApplication.findController.state?.entireWord ?? false,
            findPrevious: PDFViewerApplication.findController.state?.findPrevious ?? false,
            highlightAll: PDFViewerApplication.findController.state?.highlightAll ?? false,
            matchDiacritics: PDFViewerApplication.findController.state?.matchDiacritics ?? false,
            query: PDFViewerApplication.findController.state?.query ?? '',
            type: PDFViewerApplication.findController.state?.type as any,
            current: x.matchesCount.current,
            total: x.matchesCount.total,
            matches: x.matchesCount.matches,
            matchesLength: x.matchesCount.matchesLength,
          }),
        ),
      );
    }, opts);

    PDFViewerApplication.eventBus.on('pagechanging', () => {
      if (!this.destroyInitialization) {
        // hurried users sometimes reload the PDF before it has finished initializing
        queueMicrotask(
          this.asyncWithCD(() => {
            const currentPage = PDFViewerApplication.pdfViewer.currentPageNumber;
            const currentPageLabel = PDFViewerApplication.pdfViewer.currentPageLabel;

            if (currentPage !== this.page()) {
              // #3157 Set guard flag so the page effect doesn't navigate back
              // (which would snap to the top of the page during scrolling)
              this._pageSetFromScroll = true;
              this.page.set(currentPage);
            }
            if (currentPageLabel !== this.pageLabel()) {
              this.pageLabel.set(currentPageLabel);
            }
          }),
        );
      }
    }, opts);
  }

  public async openPDF2(): Promise<void> {
    if (!this._src) {
      return;
    }
    // #3131 Guard against detached ArrayBuffers — can happen if a previous open() already transferred the buffer to the worker.
    // The 'detached' property is available in modern browsers (Chrome 114+, Firefox 122+, Safari 17.4+).
    // In older browsers the property is undefined (falsy), so the check is safely skipped.
    if (this._src instanceof ArrayBuffer && (this._src as any).detached) {
      return;
    }

    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;

    PDFViewerApplication.findBar?.close();
    PDFViewerApplication.secondaryToolbar?.close();
    try {
      // sometimes the annotation editor UI is undefined, but it's a private variable,
      // so we simply catch the error
      PDFViewerApplication.eventBus.dispatch('switchannotationeditormode', { mode: 0 });
    } catch (e) {
      // ignore this error
    }

    this.overrideDefaultSettings();
    PDFViewerApplication.pdfViewer.destroyBookMode();
    PDFViewerApplication.pdfViewer.stopRendering();
    PDFViewerApplication.pdfThumbnailViewer.stopRendering();

    // #802 clear the form data; otherwise the "download" dialogs opens
    PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();

    await PDFViewerApplication.close();
    this.formSupport?.reset();
    if (this.initialAngularFormData) {
      this.formSupport.formData = this.initialAngularFormData;
    }
    if (this.filenameForDownload()) {
      PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload();
    } else {
      PDFViewerApplication.appConfig.filenameForDownload = this.guessFilenameFromUrl(this._src);
    }

    let workerSrc: string | (() => string) = pdfDefaultOptions.workerSrc;
    if (typeof workerSrc === 'function') {
      workerSrc = workerSrc();
    }
    const options: any = {
      password: this.password(),
      verbosity: this.logLevel(),
      workerSrc,
    };
    if ((this._src as any)?.['range']) {
      options.range = (this._src as any)['range'];
    }
    if (this.httpHeaders()) {
      options.httpHeaders = this.httpHeaders();
    }
    if (this.authorization()) {
      options.withCredentials = true;

      if (typeof this.authorization() != 'boolean') {
        if (!options.httpHeaders) options.httpHeaders = {};

        options.httpHeaders.Authorization = this.authorization();
      }
    }
    options.baseHref = this.baseHref;
    try {
      if (typeof this._src === 'string') {
        options.url = this._src;
      } else if (this._src instanceof ArrayBuffer) {
        if (this._src.byteLength === 0) {
          // sometimes ngOnInit() calls openPdf2 too early
          // so let's ignore empty arrays
          return;
        }
        // #3131 Clone the buffer so the original survives pdf.js transferring it to the worker thread.
        options.data = this._src.slice(0);
      } else if (this._src instanceof Uint8Array) {
        if (this._src.length === 0) {
          // sometimes ngOnInit() calls openPdf2 too early
          // so let's ignore empty arrays
          return;
        }
        // #3131 Clone the buffer so the original survives pdf.js transferring it to the worker thread.
        options.data = new Uint8Array(this._src);
      }
      options.rangeChunkSize = pdfDefaultOptions.rangeChunkSize;
      this._lastOpenedSrc = this._src; // #3131
      await PDFViewerApplication.open(options);
    } catch (error) {
      this.pdfLoadingFailed.emit(error as Error);
    }
  }

  private selectCursorTool() {
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    // #3140 modified by ngx-extended-pdf-viewer
    let tool: number;
    // PAGE_FLIP takes priority over handTool when in book mode with the button shown,
    // because book mode defaults to page-flip and handTool defaults to true on desktop.
    if (this.showPageFlipButton() && this.pageViewMode() === 'book') {
      tool = PdfCursorTools.PAGE_FLIP;
    } else if (this.handTool()) {
      tool = PdfCursorTools.HAND;
    } else {
      tool = PdfCursorTools.SELECT;
    }
    PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool });
    // #3140 end of modification by ngx-extended-pdf-viewer
  }

  public doReplaceBrowserPrint(useCustomPrintOfPdfJS: boolean): void {
    if (useCustomPrintOfPdfJS) {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
      if (PDFViewerApplication?.printPdf) {
        window.print = PDFViewerApplication.printPdf.bind(PDFViewerApplication);
      }
    } else if (this.originalPrint && !this.originalPrint.toString().includes('printPdf')) {
      window.print = this.originalPrint;
    }
  }

  public ngOnDestroy(): void {
    this.destroyInitialization = true;
    if (this.checkRootElementTimeout) {
      clearTimeout(this.checkRootElementTimeout);
    }
    // Async cleanup is fire-and-forget — Angular does not await ngOnDestroy.
    const cleanup = async () => {
    if (this.initializationPromise) {
      try {
        await this.initializationPromise;
      } catch {}
    }

    this.notificationService.onPDFJSInitSignal.set(undefined);
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    // do not run this code on the server
    if (typeof window !== 'undefined') {
      const pc = document.getElementById('printContainer');
      if (pc) {
        pc.remove();
      }

      // Restore original color-scheme to avoid polluting the global document
      if (this.originalColorScheme !== null) {
        const docStyle = document.documentElement.style;
        if (this.originalColorScheme === '') {
          docStyle.removeProperty('color-scheme');
        } else {
          docStyle.setProperty('color-scheme', this.originalColorScheme);
        }
        this.originalColorScheme = null;
      }
    }

    // do not run this code on the server
    if (typeof window !== 'undefined') {
      const originalPrint = this.originalPrint;
      if (window && originalPrint && !originalPrint.toString().includes('printPdf')) {
        window.print = originalPrint;
      }
    }

    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;

    if (PDFViewerApplication) {
      // #3131 Capture the eventBus reference before any await, so we can later
      // check whether a new component has replaced it during async cleanup.
      const bus = PDFViewerApplication.eventBus;
      // #3131 Capture globalThis function references before the await, so we can
      // check whether a new component has replaced them during async cleanup.
      const w = globalThis as any;
      const savedGlobals = {
        getFormValueFromAngular: w.getFormValueFromAngular,
        registerAcroformAnnotations: w.registerAcroformAnnotations,
        getFormValue: w.getFormValue,
        setFormValue: w.setFormValue,
        assignFormIdAndFieldName: w.assignFormIdAndFieldName,
        registerAcroformField: w.registerAcroformField,
        registerXFAField: w.registerXFAField,
        updateAngularFormValue: w.updateAngularFormValue,
      };

      if (PDFViewerApplication.ngxConsole) {
        PDFViewerApplication.ngxConsole.reset();
      }
      PDFViewerApplication.pdfViewer?.destroyBookMode();
      PDFViewerApplication.pdfViewer?.stopRendering();
      PDFViewerApplication.pdfThumbnailViewer?.stopRendering();
      delete PDFViewerApplication.ngxKeyboardManager;
      delete PDFViewerApplication.cspPolicyService;
      // #3131 Unregister all eventBus listeners in one call via AbortController.
      this.eventBusAbortController?.abort();
      this.eventBusAbortController = null;

      // #802 clear the form data; otherwise the "download" dialogs opens
      PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();
      this.formSupport?.reset();
      (this.formSupport as any) = undefined;
      (PDFViewerApplication.onError as any) = undefined;

      try {
        await PDFViewerApplication.close();
      } catch (error) {
        // just ignore it
        // for example, the secondary toolbar may have not been initialized yet, so
        // trying to destroy it result in errors
      }
      if (PDFViewerApplication.printKeyDownListener) {
        removeEventListener('keydown', PDFViewerApplication.printKeyDownListener, true);
      }
      // #3131 Only delete globalThis functions if they haven't been replaced
      // by a new component's registerFormSupportWithPdfjs() during the await above.
      for (const [key, savedRef] of Object.entries(savedGlobals)) {
        if (w[key] === savedRef) {
          delete w[key];
        }
      }

      if (bus) {
        PDFViewerApplication.unbindEvents();
        bus.destroy();
      }
      PDFViewerApplication.unbindWindowEvents();
      PDFViewerApplication?._cleanup();
      // #3131 Only clear eventBus if it hasn't been replaced by a new component's
      // initialization during the await above. Otherwise we destroy the new
      // component's eventBus, causing "Cannot read properties of undefined" errors.
      if (PDFViewerApplication.eventBus === bus || !PDFViewerApplication.eventBus) {
        (PDFViewerApplication.eventBus as any) = undefined;
      }
      delete w.PDFViewerApplication;
      delete w.PDFViewerApplicationOptions;
      delete w.PDFViewerApplicationConstants;
      this.service.ngxExtendedPdfViewerInitialized = false;

      // do not run this code on the server
      if (typeof window !== 'undefined') {
        document.querySelectorAll('.ngx-extended-pdf-viewer-file-input').forEach((e) => {
          (e as HTMLElement).remove();
        });
      }
    }
    }; // end of async cleanup
    cleanup();
  }

  private isPrimaryMenuVisible(): boolean {
    if (this.showToolbar()) {
      const visible =
        this.showDownloadButton() ||
        this.showCommentEditor() ||
        this.showDrawEditor() ||
        this.showHighlightEditor() ||
        this.showTextEditor() ||
        this.showFindButton() ||
        this.showOpenFileButton() ||
        this.showPagingButtons() ||
        this.showPresentationModeButton() ||
        this.showPrintButton() ||
        this.showPropertiesButton() ||
        this.showRotateCwButton() ||
        this.showRotateCcwButton() ||
        this.showHandToolButton() ||
        this.showBookModeButton() ||
        this.showSinglePageModeButton() ||
        this.showVerticalScrollButton() ||
        this.showHorizontalScrollButton() ||
        this.showInfiniteScrollButton() ||
        this.showSpreadButton() ||
        this.showSidebarButton() ||
        this.showZoomButtons();

      if (visible) {
        return true;
      }
    }
    return false;
  }

  private async closeDocument(PDFViewerApplication: IPDFViewerApplication) {
    if (this.pageViewMode() === 'book') {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
      PDFViewerApplication?.pdfViewer?.destroyBookMode();
      PDFViewerApplication?.pdfViewer?.stopRendering();
      PDFViewerApplication?.pdfThumbnailViewer?.stopRendering();
    }
    PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();
    this.formSupport?.reset();

    let inputField = PDFViewerApplication.appConfig?.openFileInput;
    if (!inputField) {
      inputField = document.querySelector('#fileInput') as HTMLInputElement;
    }
    if (inputField) {
      inputField.value = '';
    }

    await PDFViewerApplication.close();
  }

  private async setZoom() {
    if (typeof window === 'undefined') {
      return; // server side rendering
    }
    if (this.destroyInitialization) {
      return; // component is being destroyed
    }
    // sometimes effects call this method before the page is initialized,
    // so let's check if this.root is already defined
    const rootElement = this.root();
    if (rootElement) {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;

      let zoomAsNumber: string | number | undefined = this.zoom();
      if (String(zoomAsNumber).endsWith('%')) {
        zoomAsNumber = Number(String(zoomAsNumber).replace('%', '')) / 100;
      } else if (!Number.isNaN(Number(zoomAsNumber))) {
        zoomAsNumber = Number(zoomAsNumber) / 100;
      }
      if (!zoomAsNumber) {
        if (!PDFViewerApplication.store) {
          // It's difficult to prevent calling this method to early, so we need this check.
          // setZoom() is called later again, when the PDF document has been loaded and its
          // fingerprint has been calculated.
        } else {
          const userSetting = await PDFViewerApplication.store.get('zoom');
          if (userSetting) {
            if (!Number.isNaN(Number(userSetting))) {
              zoomAsNumber = Number(userSetting) / 100;
            } else {
              zoomAsNumber = userSetting;
            }
          } else {
            zoomAsNumber = 'auto';
          }
        }
      }

      if (PDFViewerApplication) {
        const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
        PDFViewerApplicationOptions.set('defaultZoomValue', zoomAsNumber);
      }

      const rootNativeElement = rootElement?.nativeElement as HTMLElement | undefined;
      if (!rootNativeElement) return;
      const scaleDropdownField = rootNativeElement.querySelector('#scaleSelect') as HTMLSelectElement | undefined;
      if (scaleDropdownField) {
        if (this.zoom() === 'auto' || this.zoom() === 'page-fit' || this.zoom() === 'page-actual' || this.zoom() === 'page-width') {
          scaleDropdownField.value = this.zoom() as string;
        } else {
          scaleDropdownField.value = 'custom';
          if (scaleDropdownField.options) {
            for (const option of scaleDropdownField.options as any) {
              if (option.value === 'custom') {
                option.textContent = `${Math.round(Number(zoomAsNumber) * 100_000) / 1000}%`;
              }
            }
          }
        }
      }

      if (PDFViewerApplication.pdfViewer && PDFViewerApplication.pdfViewer._pages?.length > 0) {
        // Guard against writing back a scale that pdf.js already has. During rapid
        // pinch zoom (especially on iPad), the Angular effect can fire multiple times
        // and write a stale numeric scale back to pdf.js WITHOUT an origin, causing
        // the scroll position to jump (the page "scrolls out of view").
        if (typeof zoomAsNumber === 'number') {
          const currentScale = PDFViewerApplication.pdfViewer.currentScale;
          if (Math.abs(zoomAsNumber - currentScale) < 1e-6) {
            return;
          }
        }
        PDFViewerApplication.pdfViewer.currentScaleValue = zoomAsNumber ?? 'auto';
      }
    }
  }

  public initResizeObserver(): void {
    try {
      const viewer = document.getElementById('viewer');
      if (viewer) {
        this.resizeObserver = new ResizeObserver(() => {
          this.onResize();
        });
        this.resizeObserver.observe(viewer);
      }
    } catch (exception) {
      console.log('ResizeObserver is not supported by your browser');
    }
  }
  public onResize(): void {
    const pdfViewer = document.getElementsByClassName('html');
    if (pdfViewer && pdfViewer.length > 0) {
      const container = document.getElementById('outerContainer');
      if (container) {
        if (this.secondaryToolbarComponent) {
          this.secondaryToolbarComponent()?.checkVisibility();
        }
        if (this.dynamicCSSComponent) {
          this.dynamicCSSComponent()?.updateToolbarWidth();
        }
      }
      this.dynamicCSSComponent()?.checkHeight(this, this.logLevel());
    }
    this.dynamicCSSComponent()?.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode(), this.primaryMenuVisible, this, this.logLevel());
  }

  @HostListener('contextmenu')
  public onContextMenu(): boolean {
    return this.contextMenuAllowed();
  }

  private async pageHasVisibleSignature(page: PDFPageProxy): Promise<boolean> {
    const annotations = await page.getAnnotations();
    const signature = annotations.find((a) => a.fieldType === 'Sig');
    if (signature) {
      const rect = signature.rect;
      if (rect && rect.length === 4 && rect[2] - rect[0] > 0 && rect[3] - rect[1] > 0 && !signature.hidden) {
        return true;
      }
    }
    return false;
  }

  public async scrollSignatureWarningIntoView(pdf: PDFDocumentProxy): Promise<void> {
    /** This method has been inspired by https://medium.com/factory-mind/angular-pdf-forms-fa72b15c3fbd. Thanks, Jonny Fox! */
    this.hasSignature = false;

    for (let i = 1; i <= pdf?.numPages; i++) {
      // track the current page
      const page = await pdf.getPage(i);

      if (await this.pageHasVisibleSignature(page)) {
        this.hasSignature = true;
        break; // stop looping through the pages as soon as we find a signature
      }
    }
    if (this.hasSignature) {
      queueMicrotask(
        this.asyncWithCD(() => {
          // Defer scrolling to ensure it happens after any other UI updates
          setTimeout(
            this.asyncWithCD(() => {
              const viewerContainer = document.querySelector('#viewerContainer');
              viewerContainer?.scrollBy(0, -32); // Adjust the scroll position
            }),
          );
        }),
      );
    }
  }

  public async zoomToPageWidth(event: MouseEvent): Promise<void> {
    if (this.handTool()) {
      if (!pdfDefaultOptions.doubleTapZoomsInHandMode) {
        return;
      }
    } else if (!pdfDefaultOptions.doubleTapZoomsInTextSelectionMode) {
      return;
    }
    if (this.pageViewMode() === 'book') {
      // scaling doesn't work in book mode
      return;
    }
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    const desiredCenterY = event.clientY;
    const previousScale = (PDFViewerApplication.pdfViewer as any).currentScale;

    if (this.zoom() !== pdfDefaultOptions.doubleTapZoomFactor && this.zoom() + '%' !== pdfDefaultOptions.doubleTapZoomFactor) {
      this.previousZoom = this.zoom();
      this.zoom.set(pdfDefaultOptions.doubleTapZoomFactor); // by default: 'page-width';
      await this.setZoom();
    } else if (pdfDefaultOptions.doubleTapResetsZoomOnSecondDoubleTap) {
      if (this.previousZoom) {
        this.zoom.set(this.previousZoom);
      } else {
        this.zoom.set('page-width');
      }
      await this.setZoom();
    } else {
      return;
    }

    const currentScale = (PDFViewerApplication.pdfViewer as any).currentScale;
    const scaleCorrectionFactor = currentScale / previousScale - 1;
    const rect = (PDFViewerApplication.pdfViewer as any).container.getBoundingClientRect();
    const dy = desiredCenterY - rect.top;
    (PDFViewerApplication.pdfViewer as any).container.scrollTop += dy * scaleCorrectionFactor;
  }

  private enableOrDisableForms(div: HTMLElement, doNotEnable: boolean) {
    if (!this.disableForms() && doNotEnable) {
      return;
    }
    const xfaLayers = Array.from(div.querySelectorAll('.xfaLayer'));
    const acroFormLayers = Array.from(div.querySelectorAll('.annotationLayer'));
    const layers = xfaLayers.concat(...acroFormLayers);
    layers.forEach((layer) => layer.querySelectorAll('input').forEach((x) => (x.disabled = this.disableForms())));
    layers.forEach((layer) => layer.querySelectorAll('select').forEach((x) => (x.disabled = this.disableForms())));
    layers.forEach((layer) => layer.querySelectorAll('textarea').forEach((x) => (x.disabled = this.disableForms())));
  }

  public closeCommentsSidebar(): void {
    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication?.eventBus) {
      PDFViewerApplication.eventBus.dispatch('switchannotationeditormode', {
        source: this,
        mode: 0, // AnnotationEditorType.NONE
      });
    }
  }
}
