import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
export type Base64SrcType = (string | null | undefined) & {};
export type PageType = (number | undefined) & {};
export type NamedDestType = (string | undefined) & {};
export type PasswordType = (string | undefined) & {};

export function isIOS(): boolean {
  if (typeof window === 'undefined') {
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
  standalone: false,
})
export class NgxExtendedPdfViewerComponent implements OnInit, OnDestroy, NgxHasHeight {
  private readonly formSupport = new NgxFormSupport();

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
  // @ts-ignore TS6133 - Used for side effects only
  private _formDataEffect = effect(() => {
    const data = this.formData();
    if (data !== undefined) {
      this.initialAngularFormData ??= data;
      this.formSupport.formData = data;
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

  // @ts-ignore TS6133 - Used for side effects only
  private _pageViewModeEffect = effect(() => {
    const viewMode = this.pageViewMode();
    if (!isPlatformBrowser(this.platformId)) return;

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

  public progress = output<ProgressBarEvent>();

  private readonly secondaryToolbarComponent = viewChild<PdfSecondaryToolbarComponent>('pdfSecondaryToolbarComponent');

  private readonly dynamicCSSComponent = viewChild<DynamicCssComponent>('DynamicCssComponent');

  private readonly sidebarComponent = viewChild<PdfSidebarComponent>('pdfsidebar');

  /* regular attributes */

  public src = model<PdfSrcType>(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private _srcEffect = effect(() => {
    const url = this.src();
    if (typeof window === 'undefined') return;

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
        const converted = await this.convertBlobToUint8Array(url);
        this._src = converted.buffer;
        if (this.service.ngxExtendedPdfViewerInitialized) {
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

      if (this._src) {
        if (this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized) {
          this.openPDF();
        } else {
          const initialized = this.notificationService.onPDFJSInitSignal();
          if (initialized) {
            (async () => this.openPDF2())();
          }
        }
      } else {
        // Close document when src is cleared
        const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
        (async () => this.closeDocument(PDFViewerApplication))();
      }
    }
  });

  private _src: string | ArrayBuffer | Uint8Array | { range: any } | undefined;

  public scrollMode = model<ScrollModeType>(ScrollModeType.vertical);

  // @ts-ignore TS6133 - Used for side effects only
  private _scrollModeEffect = effect(() => {
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
  private _enablePrintAutoRotateEffect = effect(() => {
    const value = this.enablePrintAutoRotate();
    pdfDefaultOptions.enablePrintAutoRotate = value;
    if (this.pdfScriptLoaderService.PDFViewerApplication?.pdfViewer) {
      this.pdfScriptLoaderService.PDFViewerApplication.pdfViewer.enablePrintAutoRotate = value;
    }
  });

  /** Force reloading of the JavaScript code. Useful for testing and micro-frontends */
  public forceFullReloadOfJavaScriptCode = input(false);

  public showTextEditor = input<ResponsiveVisibility>('xxl');

  public showStampEditor = input<ResponsiveVisibility>('xxl');

  public showCommentEditor = input<ResponsiveVisibility>(pdfDefaultOptions.enableComment ? 'always-in-secondary-menu' : false);

  public showDrawEditor = input<ResponsiveVisibility>('xxl');

  public showHighlightEditor = input<ResponsiveVisibility>('xxl');

  public showSignatureEditor = input<ResponsiveVisibility>('xxl');

  /** How many log messages should be printed?
   * Legal values: VerbosityLevel.INFOS (= 5), VerbosityLevel.WARNINGS (= 1), VerbosityLevel.ERRORS (= 0) */
  public logLevel = input(VerbosityLevel.WARNINGS);

  /** Use the minified (minifiedJSLibraries="true", which is the default) or the user-readable pdf.js library (minifiedJSLibraries="false") */
  public minifiedJSLibraries = input<boolean>(pdfDefaultOptions._internalFilenameSuffix === '.min');

  // @ts-ignore TS6133 - Used for side effects only
  private _minifiedJSLibrariesEffect = effect(() => {
    const value = this.minifiedJSLibraries();
    pdfDefaultOptions._internalFilenameSuffix = value ? '.min' : '';
  });

  public primaryMenuVisible = true;

  /** option to increase (or reduce) print resolution. Default is 150 (dpi). Sensible values
   * are 300, 600, and 1200. Note the increase memory consumption, which may even result in a browser crash. */
  public printResolution = input(null);

  public rotation = model<0 | 90 | 180 | 270>(0);

  public annotationLayerRendered = output<AnnotationLayerRenderedEvent>();

  public annotationEditorLayerRendered = output<AnnotationEditorLayerRenderedEvent>();

  public xfaLayerRendered = output<XfaLayerRenderedEvent>();

  public outlineLoaded = output<OutlineLoadedEvent>();

  public attachmentsloaded = output<AttachmentLoadedEvent>();

  public layersloaded = output<LayersLoadedEvent>();

  public hasSignature!: boolean;

  private async convertBlobToUint8Array(blob: Blob): Promise<Uint8Array> {
    // first try the algorithm for modern browsers and node.js
    if (blob.arrayBuffer) {
      const arrayBuffer = await blob.arrayBuffer();
      return new Uint8Array(arrayBuffer);
    }

    // then try the old-fashioned way
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(new Uint8Array(reader.result as ArrayBuffer));
        } else {
          reject(new Error('Error converting Blob to Uint8Array'));
        }
      };
      reader.onerror = () => {
        reject(new Error('FileReader error'));
      };
      reader.readAsArrayBuffer(blob);
    });
  }

  public base64Src: InputSignal<string | null | undefined> = input();

  // @ts-ignore TS6133 - Used for side effects only
  private base64SrcEffect = effect(() => {
    const base64 = this.base64Src();
    if (!isPlatformBrowser(this.platformId)) return;

    if (base64) {
      const binary_string = atob(base64);
      const len = binary_string.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
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
  public minHeightInput = input<string | undefined>(undefined, { alias: 'minHeight' });
  public heightInput = input<string | undefined>('100%', { alias: 'height' });

  // @ts-ignore TS6133 - Used for side effects only
  private _heightEffect = effect(() => {
    let h = this.heightInput();
    if (!h) {
      h = '100%';
    }

    // Sync to protected backing fields
    this._height = h;
    this._minHeight = this.minHeightInput();

    this.autoHeight = false;
    if (h === 'auto') {
      this.autoHeight = true;
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
  public language = input<string | undefined>(typeof window === 'undefined' ? 'en' : navigator.language);

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

  // @ts-ignore TS6133 - Used for side effects only
  private _showSidebarButtonEffect = effect(() => {
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
  private _sidebarVisibleEffect = effect(() => {
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

  public showFindHighlightAll = input(true);

  public showFindMatchCase = input(true);

  public showFindMultiple = input<boolean>(true);

  public showFindRegexp = input<boolean>(false);

  public showFindEntireWord = input(true);

  public showFindMatchDiacritics = input(true);

  public showFindResultsCount = input(true);

  public showFindMessages = input(true);

  public showMovePageButton = input<ResponsiveVisibility>(false);

  public showPagingButtons = input<ResponsiveVisibility>(true);

  public showFirstAndLastPageButtons = input<ResponsiveVisibility>(true);

  public showPreviousAndNextPageButtons = input<ResponsiveVisibility>(true);

  public showPageNumber = input<ResponsiveVisibility>(true);

  public showPageLabel = input<ResponsiveVisibility>(true);

  public showZoomButtons = input<ResponsiveVisibility>(true);

  public showZoomDropdown = input<ResponsiveVisibility>(true);

  public showPresentationModeButton = input<ResponsiveVisibility>(false);

  public showOpenFileButton = input<ResponsiveVisibility>(true);

  public showPrintButton = input<ResponsiveVisibility>(true);

  public showDownloadButton = input<ResponsiveVisibility>(true);

  public theme = input<'dark' | 'light' | 'custom' | string>('light');

  public showToolbar = input(true);

  public showSecondaryToolbarButton = input<ResponsiveVisibility>(true);

  // Individual button visibility controls (use model for writability via meta-inputs)
  public showSinglePageModeButton = model<ResponsiveVisibility>(true);
  public showVerticalScrollButton = model<ResponsiveVisibility>(true);
  public showHorizontalScrollButton = model<ResponsiveVisibility>(true);
  public showWrappedScrollButton = model<ResponsiveVisibility>(true);
  public showInfiniteScrollButton = model<ResponsiveVisibility>(true);
  public showBookModeButton = model<ResponsiveVisibility>(true);

  // Meta-input for convenience (sets all scrolling buttons at once)
  public showScrollingButtons = input<ResponsiveVisibility | undefined>(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private _showScrollingButtonsEffect = effect(() => {
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

  // Meta-input for convenience (sets both rotate buttons at once)
  public showRotateButton = input<ResponsiveVisibility | undefined>(undefined);

  // @ts-ignore TS6133 - Used for side effects only
  private _showRotateButtonEffect = effect(() => {
    const value = this.showRotateButton();
    if (value !== undefined) {
      this.showRotateCwButton.set(value);
      this.showRotateCcwButton.set(value);
    }
  });

  public handTool = model<boolean>(!isIOS());

  // @ts-ignore TS6133 - Used for side effects only
  private _handToolEffect = effect(() => {
    const value = this.handTool();
    if (isIOS() && value) {
      console.log(
        "On iOS, the handtool doesn't work reliably. Plus, you don't need it because touch gestures allow you to distinguish easily between swiping and selecting text. Therefore, the library ignores your setting.",
      );
      this.handTool.set(false);
      return;
    }
  });

  public showHandToolButton = input<ResponsiveVisibility>(false);

  public showSpreadButton = input<ResponsiveVisibility>(true);

  public showPropertiesButton = input<ResponsiveVisibility>(true);

  public showBorders = input(true);

  public spread = model<SpreadType>('off');

  public thumbnailDrawn = output<PdfThumbnailDrawnEvent>();

  public page: ModelSignal<number | undefined> = model();

  // @ts-ignore TS6133 - Used for side effects only
  private _pageEffect = effect(() => {
    const newPageNumber = this.page();
    if (newPageNumber) {
      // silently cope with strings
      this._page = Number(newPageNumber);
    } else {
      this._page = undefined;
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
    return pdfDefaultOptions.enablePageReordering;
  }

  /**
   * This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").
   */
  public mobileFriendlyZoom = input<string>('100%');

  // @ts-ignore TS6133 - Used for side effects only
  private _mobileFriendlyZoomEffect = effect(() => {
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

    this.calcViewerPositionTop();
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _zoomEffect = effect(() => {
    void this.zoom(); // Track zoom signal
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    this.setZoom();
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _maxZoomEffect = effect(() => {
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
  private _minZoomEffect = effect(() => {
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
  private _findbarVisibleEffect = effect(() => {
    const visible = this.findbarVisible();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (visible) {
      // Only open if not already open (prevents circular dependency with findbaropen event)
      if (!PDFViewerApplication.findBar.opened) {
        PDFViewerApplication.findBar.open();
      }
    } else {
      // Only close if actually open
      if (PDFViewerApplication.findBar.opened) {
        PDFViewerApplication.findBar.close();
      }
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _propertiesDialogVisibleEffect = effect(() => {
    const visible = this.propertiesDialogVisible();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (visible) {
      // Only open if not already open (prevents circular dependency with propertiesdialogopen event)
      if (PDFViewerApplication.overlayManager.active !== PDFViewerApplication.pdfDocumentProperties.dialog) {
        PDFViewerApplication.pdfDocumentProperties.open();
      }
    } else {
      // Only close if actually open
      if (PDFViewerApplication.overlayManager.active === PDFViewerApplication.pdfDocumentProperties.dialog) {
        PDFViewerApplication.pdfDocumentProperties.close();
      }
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _pageLabelEffect = effect(() => {
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
  private _rotationEffect = effect(() => {
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
  private _activeSidebarViewEffect = effect(() => {
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
  private _filenameForDownloadEffect = effect(() => {
    const filename = this.filenameForDownload();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    PDFViewerApplication.appConfig.filenameForDownload = filename;
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _nameddestEffect = effect(() => {
    const nameddest = this.nameddest();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (nameddest) {
      PDFViewerApplication.pdfLinkService.goToDestination(nameddest);
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _spreadEffect = effect(() => {
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
  private _enableDragAndDropEffect = effect(() => {
    const enableDragAndDrop = this.enableDragAndDrop();
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    PDFViewerApplicationOptions.set('enableDragAndDrop', enableDragAndDrop);
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _printResolutionEffect = effect(() => {
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
    void this.ignoreKeyboard(); // Track signal
    void this.ignoreKeys(); // Track signal
    void this.acceptKeys(); // Track signal
    if (typeof window === 'undefined') return;

    const PDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    if (PDFViewerApplicationOptions) {
      this.overrideDefaultSettings();
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _replaceBrowserPrintEffect = effect(() => {
    const replaceBrowserPrint = this.replaceBrowserPrint();
    if (typeof window === 'undefined') return;

    this.doReplaceBrowserPrint(replaceBrowserPrint);
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _disableFormsEffect = effect(() => {
    void this.disableForms(); // Track signal
    if (typeof window === 'undefined') return;

    this.enableOrDisableForms(this.elementRef.nativeElement, false);
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _showBordersEffect = effect(() => {
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
        PDFViewerApplication.eventBus.dispatch('scalechanging', zoomEvent);
      }
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _showUnverifiedSignaturesEffect = effect(() => {
    const showUnverifiedSignatures = this.showUnverifiedSignatures;
    if (typeof window === 'undefined') return;
    if (!this.service.ngxExtendedPdfViewerInitialized) return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication?.pdfDocument) {
      PDFViewerApplication.pdfDocument._transport.messageHandler.send('showUnverifiedSignatures', showUnverifiedSignatures);
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _enablePrintEffect = effect(() => {
    const enablePrint = this.enablePrint();
    if (typeof window === 'undefined') return;

    const PDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication) {
      PDFViewerApplication.enablePrint = enablePrint;
    }
  });

  // @ts-ignore TS6133 - Used for side effects only
  private _customComponentsEffect = effect(() => {
    void this.customFindbar; // Track signal
    void this.customFindbarButtons; // Track signal
    void this.customFindbarInputArea; // Track signal
    void this.customToolbar(); // Track signal
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
    const previous = this.viewerPositionTop;
    if (top < 33) {
      this.viewerPositionTop = '33px';
    } else {
      this.viewerPositionTop = top + 'px';
    }
    if (previous !== this.viewerPositionTop) {
      this.cdr.markForCheck();
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

  public async ngOnInit() {
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

        if (this.root()?.nativeElement?.offsetParent) {
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
      const r = this.root()?.nativeElement.cloneNode(true) as HTMLElement;
      r.classList.add('offscreen');
      this.showElementsRecursively(r);
      document.body.appendChild(r);
      const elements = this.collectElementPositions(r, this.root()?.nativeElement, []);
      document.body.removeChild(r);
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
        this.pdfScriptLoaderService.PDFViewerApplication.eventBus.on('sourcechanged', this.reportSourceChanges.bind(this));
        this.pdfScriptLoaderService.PDFViewerApplication.eventBus.on('afterprint', this.afterPrintListener);
        this.pdfScriptLoaderService.PDFViewerApplication.eventBus.on('beforeprint', this.beforePrintListener);
        this.localizationInitialized = true;
        if (!this.pdfScriptLoaderService.shuttingDown) {
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
        if (!this.pdfScriptLoaderService.shuttingDown) {
          // hurried users sometimes reload the PDF before it has finished initializing
          // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
          this.initResizeObserver();
          this.onResize();
          this.hideToolbarIfItIsEmpty();
          this.dummyComponents()?.addMissingStandardWidgets();
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
              if (e && e.id === 'printContainer') {
                body[0].removeChild(e);
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
    const optionsToIgnore = [
      'needsES5',
      'rangeChunkSize',
      '_internalFilenameSuffix',
      'assetsFolder',
      'doubleTapZoomFactor',
      'doubleTapZoomsInHandMode',
      'doubleTapZoomsInTextSelectionMode',
      'doubleTapResetsZoomOnSecondDoubleTap',
    ];
    for (const key in pdfDefaultOptions) {
      if (!optionsToIgnore.includes(key)) {
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
          options.data = this._src;
        } else if (this._src instanceof Uint8Array) {
          options.data = this._src;
        }
        options.rangeChunkSize = pdfDefaultOptions.rangeChunkSize;
        options.cspPolicyService = this.cspPolicyService;
        PDFViewerApplication.findBar?.close();
        PDFViewerApplication.secondaryToolbar?.close();
        PDFViewerApplication.eventBus.dispatch('annotationeditormodechanged', { mode: 0 });

        await PDFViewerApplication.open(options);
        this.pdfLoadingStarts.emit({});
        setTimeout(this.asyncWithCD(async () => this.setZoom()));
      }
      setTimeout(
        this.asyncWithCD(() => {
          if (!this.pdfScriptLoaderService.shuttingDown) {
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
    PDFViewerApplication.eventBus.on('annotation-editor-event', (x: AnnotationEditorEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          if (this.destroyInitialization) return;
          this.annotationEditorEvent.emit(x);
        }),
      );
    });

    PDFViewerApplication.eventBus.on('toggleSidebar', (x: ToggleSidebarEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.sidebarVisible.set(x.visible);
        }),
      );
    });

    PDFViewerApplication.eventBus.on('textlayerrendered', (x: TextLayerRenderedEvent) => {
      queueMicrotask(this.asyncWithCD(() => this.textLayerRendered.emit(x)));
    });

    PDFViewerApplication.eventBus.on('annotationeditormodechanged', (x: AnnotationEditorEditorModeChangedEvent) => {
      // we're using a timeout here to make sure the editor is already visible
      // when the event is caught. Pdf.js fires it a bit early.
      setTimeout(
        this.asyncWithCD(() => {
          if (this.destroyInitialization) return;
          this.annotationEditorModeChanged.emit(x);
        }),
      );
    });

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
    });
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
    });
    // #2673 end of modification
    PDFViewerApplication.eventBus.on('progress', (x: ProgressBarEvent) => {
      queueMicrotask(this.asyncWithCD(() => this.progress.emit(x)));
    });
    PDFViewerApplication.eventBus.on('findbarclose', () => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.findbarVisible.set(false);
        }),
      );
    });
    PDFViewerApplication.eventBus.on('findbaropen', () => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.findbarVisible.set(true);
        }),
      );
    });
    PDFViewerApplication.eventBus.on('propertiesdialogclose', () => {
      this.propertiesDialogVisible.set(false);
    });
    PDFViewerApplication.eventBus.on('propertiesdialogopen', () => {
      this.propertiesDialogVisible.set(true);
    });

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
          if (!this.pdfScriptLoaderService.shuttingDown) {
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
    });
    PDFViewerApplication.eventBus.on('pagerendered', (x: PageRenderedEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.pageRendered.emit(x);
          this.dynamicCSSComponent()?.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode(), this.primaryMenuVisible, this, this.logLevel());
        }),
      );
    });
    PDFViewerApplication.eventBus.on('pagerender', (x: PageRenderEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.pageRender.emit(x);
        }),
      );
    });

    PDFViewerApplication.eventBus.on('download', (x: PdfDownloadedEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.pdfDownloaded.emit(x);
        }),
      );
    });
    PDFViewerApplication.eventBus.on('scalechanging', (x: ScaleChangingEvent) => {
      // #3060 modified by ngx-extended-pdf-viewer - diagnostic logging for iOS scale bug
      if (x.scale < 0.15 || (x.previousScale && x.previousScale < 0.15)) {
        console.log(
          `[#3060 DEBUG] scalechanging event: scale=${x.scale}, previousScale=${x.previousScale}, presetValue=${x.presetValue}, this.zoom=${this.zoom()}, source=${x.source?.constructor?.name}`,
        );
      }
      // #3060 end of modification by ngx-extended-pdf-viewer
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
          this.zoom.set(x.scale * 100);
        }
      } else if (x.previousPresetValue !== x.presetValue) {
        // called when the user selects one of the text values of the zoom select dropdown
        this.zoom.set(x.presetValue);
      }
    });

    PDFViewerApplication.eventBus.on('rotationchanging', (x: PagesRotationEvent) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.rotation.set(x.pagesRotation as 0 | 90 | 180 | 270);
        }),
      );
    });
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
    });
    PDFViewerApplication.eventBus.on('cursortoolchanged', (x: HandtoolChanged) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.handTool.set(x.tool === PdfCursorTools.HAND);
        }),
      );
    });

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
    });

    PDFViewerApplication.eventBus.on('storedvaluesavailable', (event) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          this.handleStoredValuesAvailable(event);
        }),
      );
    });

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
    });

    PDFViewerApplication.eventBus.on('spreadmodechanged', (event) => {
      queueMicrotask(
        this.asyncWithCD(() => {
          const modes = ['off', 'odd', 'even'] as Array<SpreadType>;
          this.spread.set(modes[event.mode]);
        }),
      );
    });

    const hideSidebarToolbar = () => {
      queueMicrotask(
        this.asyncWithCD(() => {
          if (this.sidebarComponent) {
            this.sidebarComponent()?.showToolbarWhenNecessary();
          }
        }),
      );
    };

    PDFViewerApplication.eventBus.on('outlineloaded', hideSidebarToolbar);

    PDFViewerApplication.eventBus.on('attachmentsloaded', hideSidebarToolbar);

    PDFViewerApplication.eventBus.on('layersloaded', hideSidebarToolbar);

    PDFViewerApplication.eventBus.on('annotationlayerrendered', (event: AnnotationLayerRenderedEvent) => {
      const div = event.source.div;
      queueMicrotask(
        this.asyncWithCD(() => {
          event.initialFormDataStoredInThePDF = this.formSupport.initialFormDataStoredInThePDF;
          this.annotationLayerRendered.emit(event);
          this.enableOrDisableForms(div, true);
        }),
      );
    });
    PDFViewerApplication.eventBus.on('annotationeditorlayerrendered', (event) =>
      queueMicrotask(this.asyncWithCD(() => this.annotationEditorLayerRendered.emit(event))),
    );
    PDFViewerApplication.eventBus.on('xfalayerrendered', (event) => queueMicrotask(this.asyncWithCD(() => this.xfaLayerRendered.emit(event))));
    PDFViewerApplication.eventBus.on('outlineloaded', (event) => queueMicrotask(this.asyncWithCD(() => this.outlineLoaded.emit(event))));
    PDFViewerApplication.eventBus.on('attachmentsloaded', (event) => queueMicrotask(this.asyncWithCD(() => this.attachmentsloaded.emit(event))));
    PDFViewerApplication.eventBus.on('layersloaded', (event) => queueMicrotask(this.asyncWithCD(() => this.layersloaded.emit(event))));
    PDFViewerApplication.eventBus.on('presentationmodechanged', () => {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
      PDFViewerApplication?.pdfViewer?.destroyBookMode();
    });

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
    });
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
    });

    PDFViewerApplication.eventBus.on('pagechanging', () => {
      if (!this.pdfScriptLoaderService.shuttingDown) {
        // hurried users sometimes reload the PDF before it has finished initializing
        queueMicrotask(
          this.asyncWithCD(() => {
            const currentPage = PDFViewerApplication.pdfViewer.currentPageNumber;
            const currentPageLabel = PDFViewerApplication.pdfViewer.currentPageLabel;

            if (currentPage !== this.page()) {
              this.page.set(currentPage);
            }
            if (currentPageLabel !== this.pageLabel()) {
              this.pageLabel.set(currentPageLabel);
            }
          }),
        );
      }
    });
  }

  public async openPDF2(): Promise<void> {
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
        options.data = this._src;
        if (this._src.byteLength === 0) {
          // sometimes ngOnInit() calls openPdf2 too early
          // so let's ignore empty arrays
          return;
        }
      } else if (this._src instanceof Uint8Array) {
        options.data = this._src;
        if (this._src.length === 0) {
          // sometimes ngOnInit() calls openPdf2 too early
          // so let's ignore empty arrays
          return;
        }
      }
      options.rangeChunkSize = pdfDefaultOptions.rangeChunkSize;
      await PDFViewerApplication.open(options);
    } catch (error) {
      this.pdfLoadingFailed.emit(error as Error);
    }
  }

  private selectCursorTool() {
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool: this.handTool() ? 1 : 0 });
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

  public async ngOnDestroy(): Promise<void> {
    this.destroyInitialization = true;
    if (this.checkRootElementTimeout) {
      clearTimeout(this.checkRootElementTimeout);
    }
    if (this.initializationPromise) {
      try {
        await this.initializationPromise;
      } catch (e) {}
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
      if (PDFViewerApplication.ngxConsole) {
        PDFViewerApplication.ngxConsole.reset();
      }
      PDFViewerApplication.pdfViewer?.destroyBookMode();
      PDFViewerApplication.pdfViewer?.stopRendering();
      PDFViewerApplication.pdfThumbnailViewer?.stopRendering();
      delete PDFViewerApplication.ngxKeyboardManager;
      delete PDFViewerApplication.cspPolicyService;
      PDFViewerApplication.eventBus?.off('afterprint', this.afterPrintListener);
      PDFViewerApplication.eventBus?.off('beforeprint', this.beforePrintListener);
      PDFViewerApplication.eventBus?.off('sourcechanged', this.reportSourceChanges.bind(this));

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
      const w = globalThis as any;
      delete w.getFormValueFromAngular;
      delete w.registerAcroformAnnotations;
      delete w.getFormValue;
      delete w.setFormValue;
      delete w.assignFormIdAndFieldName;
      delete w.registerAcroformField;
      delete w.registerXFAField;
      delete w.assignFormIdAndFieldName;
      delete w.updateAngularFormValue;

      const bus = PDFViewerApplication.eventBus;
      if (bus) {
        PDFViewerApplication.unbindEvents();
        bus.destroy();
      }
      PDFViewerApplication.unbindWindowEvents();
      PDFViewerApplication?._cleanup();
      (PDFViewerApplication.eventBus as any) = undefined;
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
      } else if (!isNaN(Number(zoomAsNumber))) {
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
            if (!isNaN(Number(userSetting))) {
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

      if (PDFViewerApplication.pdfViewer) {
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
      const rect = signature?.rect;
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
