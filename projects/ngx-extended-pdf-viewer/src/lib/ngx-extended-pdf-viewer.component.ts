import { isPlatformBrowser, Location, PlatformLocation } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PdfDocumentLoadedEvent } from './events/document-loaded-event';
import { FileInputChanged } from './events/file-input-changed';
import { FindResult, FindResultMatchesCount, FindState } from './events/find-result';
import { HandtoolChanged } from './events/handtool-changed';
import { PageNumberChange } from './events/page-number-change';
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
import { IPDFViewerApplication, PDFDocumentProxy } from './options/pdf-viewer-application';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
import { ServiceWorkerOptionsType } from './options/service-worker-options';
import { VerbosityLevel } from './options/verbosity-level';
import { PdfDummyComponentsComponent } from './pdf-dummy-components/pdf-dummy-components.component';
import { PDFNotificationService } from './pdf-notification-service';
import { PdfSecondaryToolbarComponent } from './secondary-toolbar/pdf-secondary-toolbar/pdf-secondary-toolbar.component';
import { PdfSidebarComponent } from './sidebar/pdf-sidebar/pdf-sidebar.component';
import { UnitToPx } from './unit-to-px';

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
import { NgxConsole } from './options/ngx-console';
import { PdfSidebarView } from './options/pdf-sidebar-views';
import { SpreadType } from './options/spread-type';
import { PdfCspPolicyService } from './pdf-csp-policy.service';
import { ResponsiveVisibility } from './responsive-visibility';

declare const ServiceWorkerOptions: ServiceWorkerOptionsType; // defined in viewer.js
declare class ResizeObserver {
  constructor(param: () => void);
  public observe(div: HTMLElement);
}

interface ElementAndPosition {
  element: HTMLElement;
  x: number;
  y: number;
}

export interface FormDataType {
  [fieldName: string]: null | string | number | boolean | string[];
}

function isIOS() {
  if (typeof window === 'undefined') {
    // server-side rendering
    return false;
  }
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

@Component({
  selector: 'ngx-extended-pdf-viewer',
  templateUrl: './ngx-extended-pdf-viewer.component.html',
  styleUrls: ['./ngx-extended-pdf-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxExtendedPdfViewerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private static originalPrint = typeof window !== 'undefined' ? window.print : undefined;

  public ngxExtendedPdfViewerIncompletelyInitialized = true;

  private formSupport = new NgxFormSupport();

  /**
   * The dummy components are inserted automatically when the user customizes the toolbar
   * without adding every original toolbar item. Without the dummy components, the
   * initialization code of pdf.js crashes because it assume that every standard widget is there.
   */
  @ViewChild(PdfDummyComponentsComponent)
  public dummyComponents: PdfDummyComponentsComponent;

  @ViewChild('root')
  public root: ElementRef;

  @Output()
  public annotationEditorEvent = new EventEmitter<AnnotationEditorEvent>();
  /* UI templates */
  @Input()
  public customFindbarInputArea: TemplateRef<any> | undefined;

  @Input()
  public customToolbar: TemplateRef<any> | undefined;

  @Input()
  public customFindbar: TemplateRef<any> | undefined;

  @Input()
  public customFindbarButtons: TemplateRef<any> | undefined;

  @Input()
  public customPdfViewer: TemplateRef<any> | undefined;

  @Input()
  public customSecondaryToolbar: TemplateRef<any> | undefined;

  @Input()
  public customSidebar: TemplateRef<any> | undefined;

  @Input()
  public customThumbnail: TemplateRef<any> | undefined;

  @Input()
  public customFreeFloatingBar: TemplateRef<any> | undefined;

  @Input()
  public showFreeFloatingBar = true;

  @Input()
  public enableDragAndDrop = true;

  public localizationInitialized: boolean = false;

  private windowSizeRecalculatorSubscription: any;

  @Input()
  public set formData(formData: FormDataType) {
    this.formSupport.formData = formData;
  }

  @Input()
  public disableForms = false;

  @Output()
  public get formDataChange() {
    return this.formSupport.formDataChange;
  }

  public _pageViewMode: PageViewModeType = 'multiple';

  public baseHref: string;

  /** This flag prevents trying to load a file twice if the user uploads it using the file upload dialog or via drag'n'drop */
  private srcChangeTriggeredByUser: boolean = false;

  public get pageViewMode(): PageViewModeType {
    return this._pageViewMode;
  }

  @Input()
  public set pageViewMode(viewMode: PageViewModeType) {
    if (isPlatformBrowser(this.platformId)) {
      const hasChanged = this._pageViewMode !== viewMode;
      if (hasChanged) {
        const mustRedraw = !this.ngxExtendedPdfViewerIncompletelyInitialized && (this._pageViewMode === 'book' || viewMode === 'book');
        this._pageViewMode = viewMode;
        this.pageViewModeChange.emit(this._pageViewMode);
        const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;
        PDFViewerApplicationOptions?.set('pageViewMode', this.pageViewMode);
        const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
        if (PDFViewerApplication) {
          PDFViewerApplication.pdfViewer.pageViewMode = this._pageViewMode;
          PDFViewerApplication.findController.pageViewMode = this._pageViewMode;
        }
        if (viewMode === 'infinite-scroll') {
          if (this.scrollMode === ScrollModeType.page || this.scrollMode === ScrollModeType.horizontal) {
            this.scrollMode = ScrollModeType.vertical;
            PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: Number(this.scrollMode) });
          }
          this.removeScrollbarInInfiniteScrollMode(false);
        } else if (viewMode !== 'multiple') {
          this.scrollMode = ScrollModeType.vertical;
        } else {
          if (this.scrollMode === ScrollModeType.page) {
            this.scrollMode = ScrollModeType.vertical;
          }
          this.removeScrollbarInInfiniteScrollMode(true);
        }
        if (viewMode === 'single') {
          // since pdf.js, our custom single-page-mode has been replaced by the standard scrollMode="page"
          this.scrollMode = ScrollModeType.page;
          this._pageViewMode = viewMode;
        }
        if (viewMode === 'book') {
          this.showBorders = false;
          if (this.scrollMode !== ScrollModeType.vertical) {
            this.scrollMode = ScrollModeType.vertical;
          }
        }
        if (mustRedraw) {
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
      }
    }
  }

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  @Output()
  public progress = new EventEmitter<ProgressBarEvent>();

  @ViewChild('pdfSecondaryToolbarComponent')
  private secondaryToolbarComponent: PdfSecondaryToolbarComponent;

  @ViewChild('pdfsidebar')
  private sidebarComponent: PdfSidebarComponent;

  /* regular attributes */

  private _src: string | ArrayBuffer | Uint8Array | { range: any } | undefined;

  @Output()
  public srcChange = new EventEmitter<string>();

  private _scrollMode: ScrollModeType = ScrollModeType.vertical;

  public get scrollMode(): ScrollModeType {
    return this._scrollMode;
  }

  @Input()
  public set scrollMode(value: ScrollModeType) {
    if (this._scrollMode !== value) {
      const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
      if (PDFViewerApplication?.pdfViewer) {
        if (PDFViewerApplication.pdfViewer.scrollMode !== Number(this.scrollMode)) {
          PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: Number(this.scrollMode) });
        }
      }
      this._scrollMode = value;
      if (this._scrollMode === ScrollModeType.page) {
        if (this.pageViewMode !== 'single') {
          this._pageViewMode = 'single';
          this.pageViewModeChange.emit(this.pageViewMode);
        }
      } else if (this.pageViewMode === 'single' || this._scrollMode === ScrollModeType.horizontal) {
        this._pageViewMode = 'multiple';
        this.pageViewModeChange.emit(this.pageViewMode);
      }
    }
  }

  @Output()
  public scrollModeChange = new EventEmitter<ScrollModeType>();

  @Input()
  public authorization: Object | boolean | undefined = undefined;

  @Input()
  public httpHeaders: Object | undefined = undefined;

  @Input()
  public contextMenuAllowed = true;

  @Output()
  public afterPrint = new EventEmitter<void>();

  @Output()
  public beforePrint = new EventEmitter<void>();

  @Output()
  public currentZoomFactor = new EventEmitter<number>();

  /** This field stores the previous zoom level if the page is enlarged with a double-tap or double-click */
  private previousZoom: string | number | undefined;

  @Input()
  public enablePrint = true;

  @Input()
  public showTextEditor: ResponsiveVisibility = true;

  @Input()
  public showStampEditor: ResponsiveVisibility = true;

  @Input()
  public showDrawEditor: ResponsiveVisibility = true;

  @Input()
  public showHighlightEditor: ResponsiveVisibility = true;

  /** store the timeout id so it can be canceled if user leaves the page before the PDF is shown */
  private initTimeout: any;

  /** How many log messages should be printed?
   * Legal values: VerbosityLevel.INFOS (= 5), VerbosityLevel.WARNINGS (= 1), VerbosityLevel.ERRORS (= 0) */
  @Input()
  public logLevel = VerbosityLevel.WARNINGS;

  @Input()
  public relativeCoordsOptions: Object = {};

  /** Use the minified (minifiedJSLibraries="true", which is the default) or the user-readable pdf.js library (minifiedJSLibraries="false") */
  private _minifiedJSLibraries = true;

  public get minifiedJSLibraries() {
    return this._minifiedJSLibraries;
  }

  @Input()
  public set minifiedJSLibraries(value) {
    this._minifiedJSLibraries = value;
    if (value) {
      pdfDefaultOptions._internalFilenameSuffix = '.min';
    } else {
      pdfDefaultOptions._internalFilenameSuffix = '';
    }
  }

  public primaryMenuVisible = true;

  /** option to increase (or reduce) print resolution. Default is 150 (dpi). Sensible values
   * are 300, 600, and 1200. Note the increase memory consumption, which may even result in a browser crash. */
  @Input()
  public printResolution = null;

  @Input()
  public rotation: 0 | 90 | 180 | 270;

  @Output()
  public rotationChange = new EventEmitter<0 | 90 | 180 | 270>();

  @Output()
  public annotationLayerRendered = new EventEmitter<AnnotationLayerRenderedEvent>();

  @Output()
  public annotationEditorLayerRendered = new EventEmitter<AnnotationEditorLayerRenderedEvent>();

  @Output()
  public xfaLayerRendered = new EventEmitter<XfaLayerRenderedEvent>();

  @Output()
  public outlineLoaded = new EventEmitter<OutlineLoadedEvent>();

  @Output()
  public attachmentsloaded = new EventEmitter<AttachmentLoadedEvent>();

  @Output()
  public layersloaded = new EventEmitter<LayersLoadedEvent>();

  public hasSignature: boolean;

  @Input()
  public set src(url: string | ArrayBuffer | Blob | Uint8Array | URL | { range: any }) {
    if (url instanceof Uint8Array) {
      this._src = url.buffer;
    } else if (url instanceof URL) {
      this._src = url.toString();
    } else if (typeof Blob !== 'undefined' && url instanceof Blob) {
      // additional check introduced to support server side rendering
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          this.src = new Uint8Array(reader.result as ArrayBuffer);
          if (this.service.ngxExtendedPdfViewerInitialized) {
            if (this.ngxExtendedPdfViewerIncompletelyInitialized) {
              this.openPDF();
            } else {
              (async () => this.openPDF2())();
            }
            // else openPDF is called later, so we do nothing to prevent loading the PDF file twice
          }
        });
      };
      reader.readAsArrayBuffer(url);
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
  }

  @Input()
  public set base64Src(base64: string | null | undefined) {
    if (base64) {
      if (typeof window === 'undefined') {
        // server-side rendering
        return;
      }
      const binary_string = atob(base64);
      const len = binary_string.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      this.src = bytes.buffer;
    } else {
      this._src = undefined;
    }
  }

  /**
   * The combination of height, minHeight, and autoHeight ensures the PDF height of the PDF viewer is calculated correctly when the height is a percentage.
   * By default, many CSS frameworks make a div with 100% have a height or zero pixels. checkHeigth() fixes this.
   */
  private autoHeight = false;

  @Input()
  public minHeight: string | undefined = undefined;

  private _height: string | undefined = '100%';

  @Input()
  public set height(h) {
    this.minHeight = undefined;
    this.autoHeight = false;
    if (h) {
      if (h === 'auto') {
        this.autoHeight = true;
        this._height = undefined;
      } else {
        this._height = h;
      }
    } else {
      this.height = '100%';
    }
    setTimeout(() => {
      this.checkHeight();
    });
  }

  public get height() {
    return this._height;
  }

  @Input()
  public forceUsingLegacyES5 = false;

  @Input()
  public backgroundColor = '#e8e8eb';

  /** Allows the user to define the name of the file after clicking "download" */
  @Input()
  public filenameForDownload: string | undefined = undefined;

  /** Allows the user to disable the keyboard bindings completely */
  @Input()
  public ignoreKeyboard = false;

  /** Allows the user to disable a list of key bindings. */
  @Input()
  public ignoreKeys: Array<string> = [];

  /** Allows the user to enable a list of key bindings explicitly. If this property is set, every other key binding is ignored. */
  @Input()
  public acceptKeys: Array<string> = [];

  /** Allows the user to put the viewer's svg images into an arbitrary folder */
  @Input()
  public imageResourcesPath = assetsUrl(pdfDefaultOptions.assetsFolder) + '/images/';

  /** Allows the user to put their locale folder into an arbitrary folder */
  @Input()
  public localeFolderPath = assetsUrl(pdfDefaultOptions.assetsFolder) + '/locale';

  /** Override the default locale. This must be the complete locale name, such as "es-ES". The string is allowed to be all lowercase.
   */
  @Input()
  public language: string | undefined = undefined;

  /** By default, listening to the URL is deactivated because often the anchor tag is used for the Angular router */
  @Input()
  public listenToURL = false;

  /** Navigate to a certain "named destination" */
  @Input()
  public nameddest: string | undefined = undefined;

  /** allows you to pass a password to read password-protected files */
  @Input()
  public password: string | undefined = undefined;

  @Input()
  public replaceBrowserPrint = true;

  public _showSidebarButton: ResponsiveVisibility = true;

  public viewerPositionTop = '32px';

  /** pdf.js can show signatures, but fails to verify them. So they are switched off by default.
   * Set "[showUnverifiedSignatures]"="true" to display e-signatures nonetheless.
   */
  @Input()
  public showUnverifiedSignatures = false;

  @Input()
  public startTabindex: number | undefined;

  public get showSidebarButton() {
    return this._showSidebarButton;
  }
  @Input()
  public set showSidebarButton(show: ResponsiveVisibility) {
    if (typeof window === 'undefined') {
      // server-side rendering
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
  }

  private _sidebarVisible: boolean | undefined = undefined;
  public get sidebarVisible(): boolean | undefined {
    return this._sidebarVisible;
  }
  @Input()
  public set sidebarVisible(value: boolean | undefined) {
    if (value !== this._sidebarVisible) {
      this.sidebarVisibleChange.emit(value);
    }
    this._sidebarVisible = value;
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    if (PDFViewerApplication?.pdfSidebar) {
      if (this.sidebarVisible) {
        PDFViewerApplication.pdfSidebar.open();
        const view = Number(this.activeSidebarView);
        if (view === 1 || view === 2 || view === 3 || view === 4) {
          PDFViewerApplication.pdfSidebar.switchView(view, true);
        } else {
          console.error('[activeSidebarView] must be an integer value between 1 and 4');
        }
      } else {
        PDFViewerApplication.pdfSidebar.close();
      }
    }
  }

  @Output()
  public sidebarVisibleChange = new EventEmitter<boolean>();

  @Input()
  public activeSidebarView: PdfSidebarView = PdfSidebarView.OUTLINE;

  @Output()
  public activeSidebarViewChange = new EventEmitter<PdfSidebarView>();

  @Input()
  public findbarVisible = false;

  @Output()
  public findbarVisibleChange = new EventEmitter<boolean>();

  @Input()
  public propertiesDialogVisible = false;

  @Output()
  public propertiesDialogVisibleChange = new EventEmitter<boolean>();

  @Input()
  public showFindButton: ResponsiveVisibility | undefined = undefined;

  @Input()
  public showFindHighlightAll = true;

  @Input()
  public showFindMatchCase = true;

  @Input()
  public showFindCurrentPageOnly = true;

  @Input()
  public showFindPageRange = true;

  @Input()
  public showFindEntireWord = true;

  @Input()
  public showFindEntirePhrase = true;

  @Input()
  public showFindMatchDiacritics = true;

  @Input()
  public showFindFuzzySearch = true;

  @Input()
  public showFindResultsCount = true;

  @Input()
  public showFindMessages = true;

  @Input()
  public showPagingButtons: ResponsiveVisibility = true;

  @Input()
  public showZoomButtons: ResponsiveVisibility = true;

  @Input()
  public showPresentationModeButton: ResponsiveVisibility = false;

  @Input()
  public showOpenFileButton: ResponsiveVisibility = true;

  @Input()
  public showPrintButton: ResponsiveVisibility = true;

  @Input()
  public showDownloadButton: ResponsiveVisibility = true;

  @Input()
  public theme: 'dark' | 'light' | 'custom' | string = 'light';

  @Input()
  public showToolbar = true;

  @Input()
  public showSecondaryToolbarButton: ResponsiveVisibility = true;

  @Input()
  public showSinglePageModeButton: ResponsiveVisibility = true;

  @Input()
  public showVerticalScrollButton: ResponsiveVisibility = true;

  @Input()
  public showHorizontalScrollButton: ResponsiveVisibility = true;

  @Input()
  public showWrappedScrollButton: ResponsiveVisibility = true;

  @Input()
  public showInfiniteScrollButton: ResponsiveVisibility = true;

  @Input()
  public showBookModeButton: ResponsiveVisibility = true;

  @Input()
  public set showRotateButton(visibility: ResponsiveVisibility) {
    this.showRotateCwButton = visibility;
    this.showRotateCcwButton = visibility;
  }

  @Input()
  public showRotateCwButton: ResponsiveVisibility = true;

  @Input()
  public showRotateCcwButton: ResponsiveVisibility = true;

  private _handTool = !isIOS();

  @Input()
  public set handTool(handTool: boolean) {
    if (isIOS() && handTool) {
      console.log(
        "On iOS, the handtool doesn't work reliably. Plus, you don't need it because touch gestures allow you to distinguish easily between swiping and selecting text. Therefore, the library ignores your setting."
      );
      return;
    }
    this._handTool = handTool;
  }

  public get handTool(): boolean {
    return this._handTool;
  }

  @Output()
  public handToolChange = new EventEmitter<boolean>();

  @Input()
  public showHandToolButton: ResponsiveVisibility = false;

  private _showScrollingButton: ResponsiveVisibility = true;

  public get showScrollingButton() {
    if (this.pageViewMode === 'multiple') {
      return this._showScrollingButton;
    }
    return false;
  }

  @Input()
  public set showScrollingButton(val: ResponsiveVisibility) {
    this._showScrollingButton = val;
  }

  @Input()
  public showSpreadButton: ResponsiveVisibility = true;

  @Input()
  public showPropertiesButton: ResponsiveVisibility = true;

  @Input()
  public showBorders = true;

  @Input()
  public spread: SpreadType;

  @Output()
  public spreadChange = new EventEmitter<'off' | 'even' | 'odd'>();

  @Output()
  public thumbnailDrawn = new EventEmitter<PdfThumbnailDrawnEvent>();

  private _page: number | undefined = undefined;

  public get page(): number | undefined {
    return this._page;
  }

  @Input()
  public set page(p: number | undefined) {
    if (p) {
      // silently cope with strings
      this._page = Number(p);
    } else {
      this._page = undefined;
    }
  }

  @Output()
  public pageChange = new EventEmitter<number | undefined>();

  @Input()
  public pageLabel: string | undefined = undefined;

  @Output()
  public pageLabelChange = new EventEmitter<string | undefined>();

  @Output()
  public pagesLoaded = new EventEmitter<PagesLoadedEvent>();

  @Output()
  public pageRender = new EventEmitter<PageRenderEvent>();

  @Output()
  public pageRendered = new EventEmitter<PageRenderedEvent>();

  @Output()
  public pdfDownloaded = new EventEmitter<PdfDownloadedEvent>();

  @Output()
  public pdfLoaded = new EventEmitter<PdfLoadedEvent>();

  @Output()
  public pdfLoadingStarts = new EventEmitter<PdfLoadingStartsEvent>();

  @Output()
  public pdfLoadingFailed = new EventEmitter<Error>();

  @Input()
  public textLayer: boolean | undefined = undefined;

  @Output()
  public textLayerRendered = new EventEmitter<TextLayerRenderedEvent>();

  @Output()
  public annotationEditorModeChanged = new EventEmitter<AnnotationEditorEditorModeChangedEvent>();

  @Output()
  public updateFindMatchesCount = new EventEmitter<FindResultMatchesCount>();

  @Output()
  public updateFindState = new EventEmitter<FindState>();

  /** Legal values: undefined, 'auto', 'page-actual', 'page-fit', 'page-width', or '50' (or any other percentage) */
  @Input()
  public zoom: string | number | undefined = undefined;

  @Output()
  public zoomChange = new EventEmitter<string | number | undefined>();

  @Input()
  public zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 1, 1.25, 1.5, 2, 3, 4];

  @Input()
  public maxZoom = 10;

  @Input()
  public minZoom = 0.1;

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

  public toolbarWidthInPixels = 3.14159265359; // magic number indicating the toolbar size hasn't been determined yet

  public secondaryToolbarTop: string | undefined = undefined;

  public sidebarPositionTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarLeft: string | undefined = undefined;

  public get mobileFriendlyZoom() {
    return this._mobileFriendlyZoom;
  }

  public get pdfJsVersion(): string {
    return getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  public get majorMinorPdfJsVersion(): string {
    const fullVersion = this.pdfJsVersion;
    const pos = fullVersion.lastIndexOf('.');
    return fullVersion.substring(0, pos).replace('.', '-');
  }

  /**
   * This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").
   */
  @Input()
  public set mobileFriendlyZoom(zoom: string) {
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

    setTimeout(() => this.calcViewerPositionTop());
  }

  private shuttingDown = false;

  public serverSideRendering = true;

  public calcViewerPositionTop(): void {
    if (this.toolbar === undefined) {
      this.sidebarPositionTop = '0';
      return;
    }
    let top = this.toolbar.getBoundingClientRect().height;
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

    const findButton = document.getElementById('primaryViewFind');
    if (findButton) {
      const containerPositionLeft = this.toolbar.getBoundingClientRect().left;
      const findButtonPosition = findButton.getBoundingClientRect();
      const left = Math.max(0, findButtonPosition.left - containerPositionLeft);
      this.findbarLeft = left + 'px';
    } else if (this.showSidebarButton) {
      this.findbarLeft = 34 + (32 * factor).toString() + 'px';
    } else {
      this.findbarLeft = '0';
    }
  }

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId,
    private notificationService: PDFNotificationService,
    private location: Location,
    private elementRef: ElementRef,
    private platformLocation: PlatformLocation,
    private cdr: ChangeDetectorRef,
    public service: NgxExtendedPdfViewerService,
    private renderer: Renderer2,
    private pdfCspPolicyService: PdfCspPolicyService
  ) {
    this.baseHref = this.platformLocation.getBaseHrefFromDOM();
    this.windowSizeRecalculatorSubscription = this.service.recalculateSize$.subscribe(() => this.onResize());
    if (isPlatformBrowser(this.platformId)) {
      this.serverSideRendering = false;
      this.toolbarWidth = String(document.body.clientWidth);
    }
  }

  private iOSVersionRequiresES5(): boolean {
    if (typeof window === 'undefined') {
      // server-side rendering
      return false;
    }
    const match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match !== undefined && match !== null) {
      return parseInt(match[1], 10) < 14;
    }

    return false;
  }

  private async needsES5(): Promise<boolean> {
    if (typeof window === 'undefined') {
      // server-side rendering
      return false;
    }
    const isIE = !!(<any>window).MSInputMethodContext && !!(<any>document).documentMode;
    const isEdge = /Edge\/\d./i.test(navigator.userAgent);
    const isIOs13OrBelow = this.iOSVersionRequiresES5();
    let needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';
    if (needsES5 || isIE || isEdge || isIOs13OrBelow || this.forceUsingLegacyES5) {
      return true;
    }
    return !(await this.ngxExtendedPdfViewerCanRunModernJSCode());
  }

  private ngxExtendedPdfViewerCanRunModernJSCode(): Promise<boolean> {
    return new Promise((resolve) => {
      const support = (<any>window).ngxExtendedPdfViewerCanRunModernJSCode;
      support !== undefined ? resolve(support) : resolve(this.addScriptOpChainingSupport());
    });
  }

  private addScriptOpChainingSupport(): Promise<boolean> {
    return new Promise((resolve) => {
      const script = this.createScriptElement(pdfDefaultOptions.assetsFolder + '/op-chaining-support.js');
      script.onload = () => {
        script.remove();
        script.onload = null;
        resolve((<any>window).ngxExtendedPdfViewerCanRunModernJSCode as boolean);
      };
      script.onerror = () => {
        script.remove();
        (<any>window).ngxExtendedPdfViewerCanRunModernJSCode = false;
        resolve(false);
        script.onerror = null;
      };

      document.body.appendChild(script);
    });
  }

  private createScriptElement(sourcePath: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.async = true;
    script.type = sourcePath.endsWith('.mjs') ? 'module' : 'text/javascript';
    script.className = 'ngx-extended-pdf-viewer-script';
    this.pdfCspPolicyService.addTrustedJavaScript(script, sourcePath);
    return script;
  }

  private getPdfJsPath(artifact: 'pdf' | 'viewer', needsES5: boolean) {
    let suffix = this.minifiedJSLibraries && !needsES5 ? '.min.js' : '.js';
    const assets = pdfDefaultOptions.assetsFolder;
    const versionSuffix = getVersionSuffix(assets);
    if (versionSuffix.startsWith('4')) {
      suffix = suffix.replace('.js', '.mjs');
    }
    const artifactPath = `/${artifact}-`;
    const es5 = needsES5 ? '-es5' : '';

    return assets + artifactPath + versionSuffix + es5 + suffix;
  }

  private loadViewer(): void {
    globalThis['ngxZone'] = this.ngZone;
    this.ngZone.runOutsideAngular(() => {
      this.needsES5().then((needsES5) => {
        const viewerPath = this.getPdfJsPath('viewer', needsES5);
        const script = this.createScriptElement(viewerPath);
        document.getElementsByTagName('head')[0].appendChild(script);
      });
    });
  }

  private addFeatures(): Promise<void> {
    return new Promise((resolve) => {
      const script = this.createScriptElement(pdfDefaultOptions.assetsFolder + '/additional-features.js');
      script.onload = () => {
        script.remove();
      };
      script.onerror = () => {
        script.remove();
        resolve();
      };

      document.body.appendChild(script);
    });
  }

  ngOnInit() {
    NgxConsole.init();
    if (isPlatformBrowser(this.platformId)) {
      globalThis['setNgxExtendedPdfViewerSource'] = (url: string) => {
        this._src = url;
        this.srcChangeTriggeredByUser = true;
        this.srcChange.emit(url);
      };

      this.addTranslationsUnlessProvidedByTheUser();
      this.formSupport.registerFormSupportWithPdfjs(this.ngZone);
      this.loadPdfJs();
      this.hideToolbarIfItIsEmpty();
    }
  }

  private loadPdfJs() {
    globalThis['ngxZone'] = this.ngZone;
    this.ngZone.runOutsideAngular(() => {
      if (!globalThis['pdfjs-dist/build/pdf']) {
        this.needsES5().then((needsES5) => {
          if (needsES5) {
            if (!pdfDefaultOptions.needsES5) {
              console.log(
                "If you see the error message \"expected expression, got '='\" above: you can safely ignore it as long as you know what you're doing. It means your browser is out-of-date. Please update your browser to benefit from the latest security updates and to enjoy a faster PDF viewer."
              );
            }
            pdfDefaultOptions.needsES5 = true;
            console.log('Using the ES5 version of the PDF viewer. Your PDF files show faster if you update your browser.');
          }
          if (this.minifiedJSLibraries && !needsES5) {
            if (!pdfDefaultOptions.workerSrc().endsWith('.min.mjs')) {
              const src = pdfDefaultOptions.workerSrc();
              pdfDefaultOptions.workerSrc = () => src.replace('.mjs', '.min.mjs');
            }
          }
          const pdfJsPath = this.getPdfJsPath('pdf', needsES5);
          if (pdfJsPath.endsWith('.mjs')) {
            const src = pdfDefaultOptions.workerSrc();
            if (src.endsWith('.js')) {
              pdfDefaultOptions.workerSrc = () => src.substring(0, src.length - 3) + '.mjs';
            }
          }
          const script = this.createScriptElement(pdfJsPath);
          script.onload = () => {
            if (!(globalThis as any).webViewerLoad) {
              this.loadViewer();
            }
          };
          document.getElementsByTagName('head')[0].appendChild(script);
        });
      } else if (!(globalThis as any).webViewerLoad) {
        this.loadViewer();
      }
    });
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      if (!this.shuttingDown) {
        // hurried users sometimes reload the PDF before it has finished initializing
        if ((globalThis as any).webViewerLoad) {
          this.ngZone.runOutsideAngular(() => this.doInitPDFViewer());
        } else {
          setTimeout(() => this.ngAfterViewInit(), 50);
        }
      }
    }
  }

  private assignTabindexes() {
    if (this.startTabindex) {
      const r = this.root.nativeElement.cloneNode(true) as HTMLElement;
      r.classList.add('offscreen');
      this.showElementsRecursively(r);
      document.body.appendChild(r);
      const elements = this.collectElementPositions(r, this.root.nativeElement, []);
      document.body.removeChild(r);
      const topRightGreaterThanBottomLeftComparator = (a, b) => {
        if (a.y - b.y > 15) {
          return 1;
        }
        if (b.y - a.y > 15) {
          return -1;
        }
        return a.x - b.x;
      };
      const sorted = [...elements].sort(topRightGreaterThanBottomLeftComparator);
      for (let i = 0; i < sorted.length; i++) {
        sorted[i].element.tabIndex = this.startTabindex + i;
      }
    }
  }

  private showElementsRecursively(root: Element): void {
    root.classList.remove('hidden');
    root.classList.remove('invisible');
    root.classList.remove('hiddenXXLView');
    root.classList.remove('hiddenXLView');
    root.classList.remove('hiddenLargeView');
    root.classList.remove('hiddenMediumView');
    root.classList.remove('hiddenSmallView');
    root.classList.remove('hiddenTinyView');
    root.classList.remove('visibleXXLView');
    root.classList.remove('visibleXLView');
    root.classList.remove('visibleLargeView');
    root.classList.remove('visibleMediumView');
    root.classList.remove('visibleSmallView');
    root.classList.remove('visibleTinyView');

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
    if (copy instanceof HTMLButtonElement || copy instanceof HTMLAnchorElement || copy instanceof HTMLInputElement || copy instanceof HTMLSelectElement) {
      const rect = copy.getBoundingClientRect();
      const elementAndPos = {
        element: original,
        x: Math.round(rect.left),
        y: Math.round(rect.top),
      } as ElementAndPosition;
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

  private afterPrintListener = () => {
    this.afterPrint.emit();
  };

  private beforePrintListener = () => {
    this.beforePrint.emit();
  };

  private doInitPDFViewer() {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }

    window.addEventListener('afterprint', this.afterPrintListener);
    window.addEventListener('beforeprint', this.beforePrintListener);

    if (this.service.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("You're trying to open two instances of the PDF viewer. Most likely, this will result in errors.");
    }
    const onLoaded = () => {
      document.removeEventListener('webviewerloaded', onLoaded);
      this.overrideDefaultSettings();
      this.localizationInitialized = true;
      this.initTimeout = setTimeout(() => {
        if (!this.shuttingDown) {
          // hurried users sometimes reload the PDF before it has finished initializing
          this.calcViewerPositionTop();
          this.afterLibraryInit();
          this.openPDF();
          this.assignTabindexes();
          if (this.replaceBrowserPrint) {
            window.print = (window as any).printPDF;
          }
        }
      });
    };
    document.addEventListener('webviewerloaded', onLoaded);

    this.activateTextlayerIfNecessary(null);

    setTimeout(() => {
      if (!this.shuttingDown) {
        // hurried users sometimes reload the PDF before it has finished initializing
        // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
        this.onResize();
        this.hideToolbarIfItIsEmpty();
        this.dummyComponents.addMissingStandardWidgets();
        this.ngZone.runOutsideAngular(() => globalThis.webViewerLoad());

        const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
        PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
        if (this.filenameForDownload) {
          PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
        }
        const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;

        PDFViewerApplicationOptions.set('enableDragAndDrop', this.enableDragAndDrop);
        let language = this.language === '' ? undefined : this.language;
        if (!language) {
          if (typeof window === 'undefined') {
            // server-side rendering
            language = 'en';
          } else {
            language = navigator.language;
          }
        }
        PDFViewerApplicationOptions.set('locale', language);
        PDFViewerApplicationOptions.set('imageResourcesPath', this.imageResourcesPath);
        PDFViewerApplicationOptions.set('minZoom', this.minZoom);
        PDFViewerApplicationOptions.set('maxZoom', this.maxZoom);
        PDFViewerApplicationOptions.set('pageViewMode', this.pageViewMode);
        PDFViewerApplicationOptions.set('verbosity', this.logLevel);
        PDFViewerApplicationOptions.set('initialZoom', this.zoom);

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
    }, 0);
  }

  private addTranslationsUnlessProvidedByTheUser() {
    const link = this.renderer.createElement('link');
    link.rel = 'resource';
    link.type = 'application/l10n';
    link.href = this.localeFolderPath + '/locale.json';

    link.setAttribute('origin', 'ngx-extended-pdf-viewer');
    this.renderer.appendChild(this.elementRef.nativeElement, link);
  }

  private hideToolbarIfItIsEmpty() {
    this.primaryMenuVisible = this.showToolbar;
    if (!this.showSecondaryToolbarButton || this.service.secondaryMenuIsEmpty) {
      if (!this.isPrimaryMenuVisible()) {
        this.primaryMenuVisible = false;
      }
    }
  }

  /** Notifies every widget that implements onLibraryInit() that the PDF viewer objects are available */
  private afterLibraryInit() {
    this.notificationService.onPDFJSInitSignal.set(true);
  }

  public checkHeight(): void {
    if (this._height) {
      if (isNaN(Number(this._height.replace('%', '')))) {
        // The height is defined with one of the units vh, vw, em, rem, etc.
        // So the height check isn't necessary.
        return;
      }
    }
    if (document.querySelector('[data-pdfjsprinting]')) {
      // #1702 workaround to a Firefox bug: when printing, container.clientHeight is temporarily 0,
      // causing ngx-extended-pdf-viewer to default to 100 pixels height. So it's better
      // to do nothing.
      return;
    }
    if (typeof document !== 'undefined') {
      const container = document.getElementsByClassName('zoom')[0] as HTMLElement;
      if (container) {
        if (container.clientHeight === 0) {
          if (this.logLevel >= VerbosityLevel.WARNINGS && !this.autoHeight) {
            console.warn(
              "The height of the PDF viewer widget is zero pixels. Please check the height attribute. Is there a syntax error? Or are you using a percentage with a CSS framework that doesn't support this? The height is adjusted automatedly."
            );
          }
          this.autoHeight = true;
        }
        if (this.autoHeight) {
          const available = window.innerHeight;
          const rect = container.getBoundingClientRect();
          const top = rect.top;
          let maximumHeight = available - top;
          // take the margins and paddings of the parent containers into account
          const padding = this.calculateBorderMargin(container);
          maximumHeight -= padding;
          if (maximumHeight > 100) {
            this.minHeight = `${maximumHeight}px`;
          } else {
            this.minHeight = '100px';
          }
          this.cdr.markForCheck();
        }
      }
    }
  }

  private calculateBorderMargin(container: HTMLElement | null): number {
    if (container) {
      const computedStyle = window.getComputedStyle(container);

      const padding = UnitToPx.toPx(computedStyle.paddingBottom);
      const margin = UnitToPx.toPx(computedStyle.marginBottom);
      if (container.style.zIndex) {
        return padding + margin;
      }
      return padding + margin + this.calculateBorderMargin(container.parentElement);
    }
    return 0;
  }

  public onSpreadChange(newSpread: 'off' | 'even' | 'odd'): void {
    this.spreadChange.emit(newSpread);
  }

  private activateTextlayerIfNecessary(options: any): void {
    if (this.textLayer === undefined) {
      if (!this.handTool) {
        if (options) {
          options.set('textLayerMode', pdfDefaultOptions.textLayerMode);
        }
        this.textLayer = true;
        if (this.showFindButton === undefined) {
          this.showFindButton = true;
          setTimeout(() => {
            // todo remove this hack:
            const viewFind = document.getElementById('viewFind') as HTMLElement;
            if (viewFind) {
              viewFind.classList.remove('invisible');
            }
            const findbar = document.getElementById('findbar') as HTMLElement;
            if (findbar) {
              findbar.classList.remove('invisible');
            }
          });
        }
      } else {
        if (options) {
          options.set('textLayerMode', this.showHandToolButton ? pdfDefaultOptions.textLayerMode : 0);
        }
        if (!this.showHandToolButton) {
          if (this.showFindButton || this.showFindButton === undefined) {
            this.ngZone.run(() => {
              this.showFindButton = false;
            });
            if (this.logLevel >= VerbosityLevel.WARNINGS) {
              console.warn(
                // tslint:disable-next-line:max-line-length
                'Hiding the "find" button because the text layer of the PDF file is not rendered. Use [textLayer]="true" to enable the find button.'
              );
            }
          }
          if (this.showHandToolButton) {
            if (this.logLevel >= VerbosityLevel.WARNINGS) {
              console.warn(
                // tslint:disable-next-line:max-line-length
                'Hiding the "hand tool / selection mode" menu because the text layer of the PDF file is not rendered. Use [textLayer]="true" to enable the the menu items.'
              );
              this.showHandToolButton = false;
            }
          }
        }
      }
    } else {
      if (this.textLayer) {
        // todo: is this a redundant check?
        if (options) {
          options.set('textLayerMode', pdfDefaultOptions.textLayerMode);
        }
        this.textLayer = true;
        if (this.showFindButton === undefined) {
          this.showFindButton = true;
          setTimeout(() => {
            // todo remove this hack:
            const viewFind = document.getElementById('viewFind') as HTMLElement;
            if (viewFind) {
              viewFind.classList.remove('invisible');
            }
            const findbar = document.getElementById('findbar') as HTMLElement;
            if (findbar) {
              findbar.classList.remove('invisible');
            }
          });
        }
      } else {
        // todo: is the else branch dead code?
        if (options) {
          options.set('textLayerMode', 0);
        }
        this.textLayer = false;
        if (this.showFindButton) {
          if (this.logLevel >= VerbosityLevel.WARNINGS) {
            // tslint:disable-next-line:max-line-length
            console.warn('Hiding the "find" button because the text layer of the PDF file is not rendered. Use [textLayer]="true" to enable the find button.');
            this.ngZone.run(() => {
              this.showFindButton = false;
            });
          }
        }
        if (this.showHandToolButton) {
          if (this.logLevel >= VerbosityLevel.WARNINGS) {
            console.warn(
              // tslint:disable-next-line:max-line-length
              'Hiding the "hand tool / selection mode" menu because the text layer of the PDF file is not rendered. Use [textLayer]="true" to enable the the menu items.'
            );
            this.showHandToolButton = false;
          }
        }
      }
    }
  }

  private async overrideDefaultSettings() {
    if (typeof window === 'undefined') {
      return; // server side rendering
    }
    const options = (window as any).PDFViewerApplicationOptions as IPDFViewerApplicationOptions;
    // tslint:disable-next-line:forin
    for (const key in pdfDefaultOptions) {
      options.set(key, pdfDefaultOptions[key]);
    }
    options.set('disablePreferences', true);
    await this.setZoom();

    options.set('ignoreKeyboard', this.ignoreKeyboard);
    options.set('ignoreKeys', this.ignoreKeys);
    options.set('acceptKeys', this.acceptKeys);
    this.activateTextlayerIfNecessary(options);

    if (this.scrollMode || this.scrollMode === ScrollModeType.vertical) {
      options.set('scrollModeOnLoad', this.scrollMode);
    }

    const sidebarVisible = this.sidebarVisible;
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    if (sidebarVisible !== undefined) {
      PDFViewerApplication.sidebarViewOnLoad = sidebarVisible ? 1 : 0;
      if (PDFViewerApplication.appConfig) {
        PDFViewerApplication.appConfig.sidebarViewOnLoad = sidebarVisible ? this.activeSidebarView : PdfSidebarView.NONE;
      }
      options.set('sidebarViewOnLoad', this.sidebarVisible ? this.activeSidebarView : 0);
    }
    if (this.spread === 'even') {
      options.set('spreadModeOnLoad', 2);
      if (PDFViewerApplication.pdfViewer) {
        PDFViewerApplication.pdfViewer.spreadMode = 2;
      }
      this.onSpreadChange('even');
    } else if (this.spread === 'odd') {
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
    if (this.printResolution) {
      options.set('printResolution', this.printResolution);
    }
    if (this.showBorders === false) {
      options.set('removePageBorders', !this.showBorders);
    }
  }

  private openPDF() {
    ServiceWorkerOptions.showUnverifiedSignatures = this.showUnverifiedSignatures;
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.enablePrint = this.enablePrint;
    this.service.ngxExtendedPdfViewerInitialized = true;
    this.registerEventListeners(PDFViewerApplication);
    this.selectCursorTool();
    if (!this.listenToURL) {
      PDFViewerApplication.pdfLinkService.setHash = undefined;
    }

    if (this._src) {
      this.ngxExtendedPdfViewerIncompletelyInitialized = false;
      this.initTimeout = undefined;

      setTimeout(async () => this.checkHeight(), 100);
      // open a file in the viewer
      if (!!this._src) {
        const options: any = {
          password: this.password,
          verbosity: this.logLevel,
        };
        if (this._src['range']) {
          options.range = this._src['range'];
        }
        if (this.httpHeaders) {
          options.httpHeaders = this.httpHeaders;
        }
        if (this.authorization) {
          options.withCredentials = true;

          if (typeof this.authorization != 'boolean') {
            if (!options.httpHeaders) options.httpHeaders = {};

            options.httpHeaders.Authorization = this.authorization;
          }
        }
        options.baseHref = this.baseHref;
        PDFViewerApplication.onError = (error: Error) => this.pdfLoadingFailed.emit(error);
        this.ngZone.runOutsideAngular(async () => {
          if (typeof this._src === 'string') {
            options.url = this._src;
          } else if (this._src instanceof ArrayBuffer) {
            options.data = this._src;
          } else if (this._src instanceof Uint8Array) {
            options.data = this._src;
          }
          options.rangeChunkSize = pdfDefaultOptions.rangeChunkSize;
          await PDFViewerApplication.open(options);
          this.pdfLoadingStarts.emit({});
          setTimeout(async () => this.setZoom());
        });
      }
      setTimeout(() => {
        if (!this.shuttingDown) {
          // hurried users sometimes reload the PDF before it has finished initializing
          if (this.page) {
            PDFViewerApplication.page = Number(this.page);
          }
        }
      }, 100);
    }
  }

  private registerEventListeners(PDFViewerApplication: IPDFViewerApplication) {
    PDFViewerApplication.eventBus.on('annotation-editor-event', (x: AnnotationEditorEvent) => {
      this.ngZone.run(() => {
        this.annotationEditorEvent.emit(x);
      });
    });

    PDFViewerApplication.eventBus.on('toggleSidebar', (x: ToggleSidebarEvent) => {
      this.ngZone.run(() => {
        this.sidebarVisible = x.visible;
        this.sidebarVisibleChange.emit(x.visible);
      });
    });

    PDFViewerApplication.eventBus.on('textlayerrendered', (x: TextLayerRenderedEvent) => {
      this.ngZone.run(() => this.textLayerRendered.emit(x));
    });

    PDFViewerApplication.eventBus.on('annotationeditormodechanged', (x: AnnotationEditorEditorModeChangedEvent) => {
      // we're using a timeout here to make sure the editor is already visible
      // when the event is caught. Pdf.js fires it a bit early.
      setTimeout(() => this.annotationEditorModeChanged.emit(x));
      if (x.mode === 0) {
        document.body.classList.remove('ngx-extended-pdf-viewer-prevent-touch-move');
      } else {
        document.body.classList.add('ngx-extended-pdf-viewer-prevent-touch-move');
      }
    });

    PDFViewerApplication.eventBus.on('scrollmodechanged', (x: ScrollModeChangedEvent) => {
      this.ngZone.run(() => {
        this._scrollMode = x.mode;
        this.scrollModeChange.emit(x.mode);
        if (x.mode === ScrollModeType.page) {
          if (this.pageViewMode !== 'single') {
            this.pageViewModeChange.emit('single');
            this._pageViewMode = 'single';
          }
        }
      });
    });
    PDFViewerApplication.eventBus.on('progress', (x: ProgressBarEvent) => {
      this.ngZone.run(() => this.progress.emit(x));
    });
    PDFViewerApplication.eventBus.on('findbarclose', () => {
      this.ngZone.run(() => {
        this.findbarVisible = false;
        this.findbarVisibleChange.emit(false);
        this.cdr.markForCheck();
      });
    });
    PDFViewerApplication.eventBus.on('findbaropen', () => {
      this.ngZone.run(() => {
        this.findbarVisible = true;
        this.findbarVisibleChange.emit(true);
        this.cdr.markForCheck();
      });
    });
    PDFViewerApplication.eventBus.on('propertiesdialogclose', () => {
      this.propertiesDialogVisible = false;
      this.ngZone.run(() => this.propertiesDialogVisibleChange.emit(false));
    });
    PDFViewerApplication.eventBus.on('propertiesdialogopen', () => {
      this.propertiesDialogVisible = true;
      this.ngZone.run(() => this.propertiesDialogVisibleChange.emit(true));
    });

    PDFViewerApplication.eventBus.on('pagesloaded', (x: PagesLoadedEvent) => {
      this.ngZone.run(() => this.pagesLoaded.emit(x));
      this.removeScrollbarInInfiniteScrollMode(false);
      if (this.rotation !== undefined && this.rotation !== null) {
        const r = Number(this.rotation);
        if (r === 0 || r === 90 || r === 180 || r === 270) {
          PDFViewerApplication.pdfViewer.pagesRotation = r;
        }
      }
      setTimeout(() => {
        if (!this.shuttingDown) {
          // hurried users sometimes reload the PDF before it has finished initializing
          if (this.nameddest) {
            PDFViewerApplication.pdfLinkService.goToDestination(this.nameddest);
          } else if (this.page) {
            PDFViewerApplication.page = Number(this.page);
          } else if (this.pageLabel) {
            PDFViewerApplication.pdfViewer.currentPageLabel = this.pageLabel;
          }
        }
      });
      this.setZoom();
    });
    PDFViewerApplication.eventBus.on('pagerendered', (x: PageRenderedEvent) => {
      this.ngZone.run(() => {
        this.pageRendered.emit(x);
        this.removeScrollbarInInfiniteScrollMode(false);
      });
    });
    PDFViewerApplication.eventBus.on('pagerender', (x: PageRenderEvent) => {
      this.ngZone.run(() => {
        this.pageRender.emit(x);
      });
    });

    PDFViewerApplication.eventBus.on('download', (x: PdfDownloadedEvent) => {
      this.ngZone.run(() => {
        this.pdfDownloaded.emit(x);
      });
    });
    PDFViewerApplication.eventBus.on('scalechanging', (x: ScaleChangingEvent) => {
      setTimeout(() => {
        this.currentZoomFactor.emit(x.scale);
        this.cdr.markForCheck();
      });

      if (x.presetValue !== 'auto' && x.presetValue !== 'page-fit' && x.presetValue !== 'page-actual' && x.presetValue !== 'page-width') {
        // ignore rounding differences
        if (Math.abs(x.previousScale - x.scale) > 0.000001) {
          this.zoom = x.scale * 100;
          this.zoomChange.emit(x.scale * 100);
        }
      } else if (x.previousPresetValue !== x.presetValue) {
        // called when the user selects one of the text values of the zoom select dropdown
        this.zoomChange.emit(x.presetValue);
      }
    });

    PDFViewerApplication.eventBus.on('rotationchanging', (x: PagesRotationEvent) => {
      this.ngZone.run(() => {
        this.rotationChange.emit(x.pagesRotation);
      });
    });
    PDFViewerApplication.eventBus.on('fileinputchange', (x: FileInputChanged) => {
      this.ngZone.run(() => {
        if (x.fileInput.files && x.fileInput.files.length >= 1) {
          // drag and drop
          this.srcChange.emit(x.fileInput.files[0].name);
        } else {
          // regular file open dialog
          const path = x.fileInput?.value?.replace('C:\\fakepath\\', '');
          this.srcChange.emit(path);
        }
      });
    });
    PDFViewerApplication.eventBus.on('cursortoolchanged', (x: HandtoolChanged) => {
      this.ngZone.run(() => {
        this.handTool = x.tool === PdfCursorTools.HAND;
        this.handToolChange.emit(x.tool === PdfCursorTools.HAND);
      });
    });

    PDFViewerApplication.eventBus.on('sidebarviewchanged', (x: SidebarviewChange) => {
      this.ngZone.run(() => {
        this.sidebarVisibleChange.emit(x.view > 0);
        if (x.view > 0) {
          this.activeSidebarViewChange.emit(x.view);
        }
        if (this.sidebarComponent) {
          this.sidebarComponent.showToolbarWhenNecessary();
        }
      });
    });

    PDFViewerApplication.eventBus.on('documentloaded', (pdfLoadedEvent: PdfDocumentLoadedEvent) => {
      this.ngZone.run(() => {
        const pages = pdfLoadedEvent.source.pagesCount;
        this.pageLabel = undefined;
        if (this.page && this.page >= pages) {
          this.page = pages;
        }
        this.scrollSignatureWarningIntoView(pdfLoadedEvent.source.pdfDocument);
        this.pdfLoaded.emit({ pagesCount: pdfLoadedEvent.source.pdfDocument?.numPages } as PdfLoadedEvent);
        if (this.findbarVisible) {
          PDFViewerApplication.findBar.open();
        }
        if (this.propertiesDialogVisible) {
          PDFViewerApplication.pdfDocumentProperties.open();
        }
      });
    });

    PDFViewerApplication.eventBus.on('spreadmodechanged', (event) => {
      this.ngZone.run(() => {
        const modes = ['off', 'odd', 'even'] as Array<SpreadType>;
        this.spread = modes[event.mode];
        this.spreadChange.emit(this.spread);
      });
    });

    const hideSidebarToolbar = () => {
      this.ngZone.run(() => {
        if (this.sidebarComponent) {
          this.sidebarComponent.showToolbarWhenNecessary();
        }
      });
    };

    PDFViewerApplication.eventBus.on('outlineloaded', hideSidebarToolbar);

    PDFViewerApplication.eventBus.on('attachmentsloaded', hideSidebarToolbar);

    PDFViewerApplication.eventBus.on('layersloaded', hideSidebarToolbar);

    PDFViewerApplication.eventBus.on('annotationlayerrendered', (event: AnnotationLayerRenderedEvent) => {
      const div = event.source.div;
      this.ngZone.run(() => {
        event.initialFormDataStoredInThePDF = this.formSupport.initialFormDataStoredInThePDF;
        this.annotationLayerRendered.emit(event);
        this.enableOrDisableForms(div, true);
      });
    });
    PDFViewerApplication.eventBus.on('annotationeditorlayerrendered', (event) => this.ngZone.run(() => this.annotationEditorLayerRendered.emit(event)));
    PDFViewerApplication.eventBus.on('xfalayerrendered', (event) => this.ngZone.run(() => this.xfaLayerRendered.emit(event)));
    PDFViewerApplication.eventBus.on('outlineloaded', (event) => this.ngZone.run(() => this.outlineLoaded.emit(event)));
    PDFViewerApplication.eventBus.on('attachmentsloaded', (event) => this.ngZone.run(() => this.attachmentsloaded.emit(event)));
    PDFViewerApplication.eventBus.on('layersloaded', (event) => this.ngZone.run(() => this.layersloaded.emit(event)));
    PDFViewerApplication.eventBus.on('presentationmodechanged', (event) => {
      const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
      PDFViewerApplication?.pdfViewer?.destroyBookMode();
    });

    PDFViewerApplication.eventBus.on('updatefindcontrolstate', (x: FindResult) => {
      this.ngZone.run(() => {
        let type = PDFViewerApplication.findController.state.type || 'find';
        if (type === 'again') {
          type = 'findagain';
        }
        const result = {
          caseSensitive: PDFViewerApplication.findController.state.caseSensitive,
          entireWord: PDFViewerApplication.findController.state.entireWord,
          findPrevious: PDFViewerApplication.findController.state.findPrevious,
          highlightAll: PDFViewerApplication.findController.state.highlightAll,
          matchDiacritics: PDFViewerApplication.findController.state.matchDiacritics,
          query: PDFViewerApplication.findController.state.query,
          type,
        };
        this.updateFindMatchesCount.emit({
          ...result,
          current: x.matchesCount.current,
          total: x.matchesCount.total,
          matches: PDFViewerApplication.findController._pageMatches,
          matchesLength: PDFViewerApplication.findController._pageMatchesLength,
        });

        if (this.updateFindState) {
          this.updateFindState.emit(x.state);
        }
      });
    });
    PDFViewerApplication.eventBus.on('updatefindmatchescount', (x: FindResult) => {
      x.matchesCount.matches = PDFViewerApplication.findController._pageMatches;
      x.matchesCount.matchesLength = PDFViewerApplication.findController._pageMatchesLength;
      this.ngZone.run(() =>
        this.updateFindMatchesCount.emit({
          caseSensitive: PDFViewerApplication.findController.state.caseSensitive,
          entireWord: PDFViewerApplication.findController.state.entireWord,
          findPrevious: PDFViewerApplication.findController.state.findPrevious,
          highlightAll: PDFViewerApplication.findController.state.highlightAll,
          matchDiacritics: PDFViewerApplication.findController.state.matchDiacritics,
          query: PDFViewerApplication.findController.state.query,
          type: PDFViewerApplication.findController.state.type,
          current: x.matchesCount.current,
          total: x.matchesCount.total,
          matches: x.matchesCount.matches,
          matchesLength: x.matchesCount.matchesLength,
        })
      );
    });

    PDFViewerApplication.eventBus.on('pagechanging', (x: PageNumberChange) => {
      if (!this.shuttingDown) {
        // hurried users sometimes reload the PDF before it has finished initializing
        this.ngZone.run(() => {
          const currentPage = PDFViewerApplication.pdfViewer.currentPageNumber;
          const currentPageLabel = PDFViewerApplication.pdfViewer.currentPageLabel;

          if (currentPage !== this.page) {
            this.pageChange.emit(currentPage);
          }
          if (currentPageLabel !== this.pageLabel) {
            this.pageLabelChange.emit(currentPageLabel);
          }
        });
      }
    });
  }

  private removeScrollbarInInfiniteScrollMode(restoreHeight: boolean): void {
    if (this.pageViewMode === 'infinite-scroll' || restoreHeight) {
      const viewer = document.getElementById('viewer');
      const zoom = document.getElementsByClassName('zoom')[0];
      if (viewer) {
        setTimeout(() => {
          if (this.pageViewMode === 'infinite-scroll') {
            const height = viewer.clientHeight + 17;
            if (this.primaryMenuVisible) {
              this.height = height + 35 + 'px';
            } else if (height > 17) {
              this.height = height + 'px';
            } else if (this.height === undefined) {
              this.height = '100%';
            }
            if (zoom) {
              (<HTMLElement>zoom).style.height = this.height;
            }
          } else if (restoreHeight) {
            this.autoHeight = true;
            this._height = undefined;
            this.checkHeight();
          }
        });
      }
    }
  }

  public async openPDF2(): Promise<void> {
    this.overrideDefaultSettings();
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.pdfViewer.destroyBookMode();
    PDFViewerApplication.pdfViewer.stopRendering();
    PDFViewerApplication.pdfThumbnailViewer.stopRendering();

    // #802 clear the form data; otherwise the "download" dialogs opens
    PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();

    await PDFViewerApplication.close();
    this.formSupport.reset();

    const options: any = {
      password: this.password,
      verbosity: this.logLevel,
    };
    if (this._src?.['range']) {
      options.range = this._src['range'];
    }
    if (this.httpHeaders) {
      options.httpHeaders = this.httpHeaders;
    }
    if (this.authorization) {
      options.withCredentials = true;

      if (typeof this.authorization != 'boolean') {
        if (!options.httpHeaders) options.httpHeaders = {};

        options.httpHeaders.Authorization = this.authorization;
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
      this.pdfLoadingFailed.emit(error);
    }
  }

  private selectCursorTool() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool: this.handTool ? 1 : 0 });
  }

  public async ngOnDestroy(): Promise<void> {
    if (typeof window === 'undefined') {
      return; // fast escape for server side rendering
    }
    delete globalThis['setNgxExtendedPdfViewerSource'];

    window.removeEventListener('afterprint', this.afterPrintListener);
    window.removeEventListener('beforeprint', this.beforePrintListener);
    delete globalThis['ngxZone'];
    delete globalThis['ngxConsole'];

    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication?.pdfViewer?.destroyBookMode();
    PDFViewerApplication?.pdfViewer?.stopRendering();
    PDFViewerApplication?.pdfThumbnailViewer?.stopRendering();
    if (PDFViewerApplication) {
      (PDFViewerApplication.onError as any) = undefined;
    }

    const originalPrint = NgxExtendedPdfViewerComponent.originalPrint;
    if (window && originalPrint && !originalPrint.toString().includes('printPdf')) {
      window.print = originalPrint;
    }
    const printContainer = document.querySelector('#printContainer');
    if (printContainer) {
      printContainer.parentElement?.removeChild(printContainer);
    }

    const w = window as any;
    delete w.getFormValueFromAngular;
    delete w.registerAcroformAnnotations;
    delete w.getFormValue;
    delete w.setFormValue;
    delete w.assignFormIdAndFieldName;
    delete w.registerAcroformField;
    delete w.registerXFAField;
    delete w.assignFormIdAndFieldName;
    delete w.updateAngularFormValue;
    delete w.updateThumbnailSelection;
    delete w.ngxConsoleFilter;
    // (window as any).pdfDefaultOptions = undefined;
    delete w.pdfViewerSanitizer;
    delete w.printPDF;

    // (window as any).webViewerLoad = undefined;
    this.shuttingDown = true;

    this.service.ngxExtendedPdfViewerInitialized = false;
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
      this.initTimeout = undefined;
    }
    if (PDFViewerApplication) {
      // #802 clear the form data; otherwise the "download" dialogs opens
      PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();
      this.formSupport.reset();
      (this.formSupport as any) = undefined;

      PDFViewerApplication._cleanup();

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
      if (PDFViewerApplication._boundEvents) {
        PDFViewerApplication.unbindWindowEvents();
      }
      const bus = PDFViewerApplication.eventBus;
      if (bus) {
        PDFViewerApplication.unbindEvents();
        bus.destroy();
      }
      (PDFViewerApplication.eventBus as any) = null;
      document.querySelectorAll('.ngx-extended-pdf-viewer-script').forEach((e: HTMLScriptElement) => {
        e.onload = null;
        e.remove();
      });
    }
    this.windowSizeRecalculatorSubscription?.unsubscribe();
    this.notificationService.onPDFJSInitSignal.set(false);
  }

  private isPrimaryMenuVisible(): boolean {
    if (this.showToolbar) {
      const visible =
        this.showDownloadButton ||
        this.showDrawEditor ||
        this.showHighlightEditor ||
        this.showTextEditor ||
        this.showFindButton ||
        this.showOpenFileButton ||
        this.showPagingButtons ||
        this.showPresentationModeButton ||
        this.showPrintButton ||
        this.showPropertiesButton ||
        this.showRotateCwButton ||
        this.showRotateCcwButton ||
        this.showHandToolButton ||
        this.showScrollingButton ||
        this.showSpreadButton ||
        this.showSidebarButton ||
        this.showZoomButtons;

      if (visible) {
        return true;
      }
    }
    return false;
  }

  public async ngOnChanges(changes: SimpleChanges) {
    if (typeof window === 'undefined') {
      return; // server side rendering
    }
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;

    if (this.service.ngxExtendedPdfViewerInitialized) {
      if ('src' in changes || 'base64Src' in changes) {
        if (this.srcChangeTriggeredByUser) {
          this.srcChangeTriggeredByUser = false;
        } else {
          if (this.pageViewMode === 'book') {
            const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
            PDFViewerApplication?.pdfViewer?.destroyBookMode();
            PDFViewerApplication?.pdfViewer?.stopRendering();
            PDFViewerApplication?.pdfThumbnailViewer?.stopRendering();
          }
          if (!!this._src) {
            if (this.ngxExtendedPdfViewerIncompletelyInitialized) {
              this.openPDF();
            } else {
              await this.openPDF2();
            }
          } else {
            // #802 clear the form data; otherwise the "download" dialogs opens
            PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();
            this.formSupport.reset();

            let inputField = PDFViewerApplication.appConfig?.openFileInput;
            if (!inputField) {
              inputField = document.querySelector('#fileInput') as HTMLInputElement;
            }
            if (inputField) {
              inputField.value = '';
            }

            await PDFViewerApplication.close();
          }
        }
      }
      if ('enableDragAndDrop' in changes) {
        PDFViewerApplicationOptions.set('enableDragAndDrop', this.enableDragAndDrop);
      }

      if ('findbarVisible' in changes) {
        if (changes['findbarVisible'].currentValue) {
          PDFViewerApplication.findBar.open();
        } else {
          PDFViewerApplication.findBar.close();
        }
      }

      if ('propertiesDialogVisible' in changes) {
        if (this.propertiesDialogVisible) {
          PDFViewerApplication.pdfDocumentProperties.open();
        } else {
          PDFViewerApplication.pdfDocumentProperties.close();
        }
      }

      if ('zoom' in changes) {
        await this.setZoom();
      }

      if ('maxZoom' in changes) {
        PDFViewerApplicationOptions.set('maxZoom', this.maxZoom);
      }

      if ('minZoom' in changes) {
        PDFViewerApplicationOptions.set('minZoom', this.minZoom);
      }

      if ('handTool' in changes) {
        this.selectCursorTool();
      }
      if ('page' in changes) {
        if (this.page) {
          // tslint:disable-next-line: triple-equals
          if (this.page != PDFViewerApplication.page) {
            PDFViewerApplication.page = this.page;
          }
        }
      }
      if ('pageLabel' in changes) {
        if (this.pageLabel) {
          if (this.pageLabel !== PDFViewerApplication.pdfViewer.currentPageLabel) {
            PDFViewerApplication.pdfViewer.currentPageLabel = this.pageLabel;
          }
        }
      }

      if ('rotation' in changes) {
        if (this.rotation) {
          const r = Number(this.rotation);
          if (r === 0 || r === 90 || r === 180 || r === 270) {
            PDFViewerApplication.pdfViewer.pagesRotation = r;
          }
        } else {
          PDFViewerApplication.pdfViewer.pagesRotation = 0;
        }
      }
      if ('scrollMode' in changes) {
        if (this.scrollMode || this.scrollMode === ScrollModeType.vertical) {
          if (PDFViewerApplication.pdfViewer.scrollMode !== Number(this.scrollMode)) {
            PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: Number(this.scrollMode) });
          }
        }
      }
      if ('activeSidebarView' in changes) {
        if (this.sidebarVisible) {
          PDFViewerApplication.pdfSidebar.open();
          const view = Number(this.activeSidebarView);
          if (view === 1 || view === 2 || view === 3 || view === 4) {
            PDFViewerApplication.pdfSidebar.switchView(view, true);
          } else {
            console.error('[activeSidebarView] must be an integer value between 1 and 4');
          }
        } else {
          PDFViewerApplication.pdfSidebar.close();
        }
      }
      if ('filenameForDownload' in changes) {
        PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
      }
      if ('nameddest' in changes) {
        if (this.nameddest) {
          PDFViewerApplication.pdfLinkService.goToDestination(this.nameddest);
        }
      }

      if ('spread' in changes) {
        if (this.spread === 'even') {
          PDFViewerApplication.spreadModeOnLoad = 2;
          PDFViewerApplication.pdfViewer.spreadMode = 2;
          this.onSpreadChange('even');
        } else if (this.spread === 'odd') {
          PDFViewerApplication.spreadModeOnLoad = 1;
          PDFViewerApplication.pdfViewer.spreadMode = 1;
          this.onSpreadChange('odd');
        } else {
          PDFViewerApplication.spreadModeOnLoad = 0;
          PDFViewerApplication.pdfViewer.spreadMode = 0;
          this.onSpreadChange('off');
        }
      }

      this.hideToolbarIfItIsEmpty();
      setTimeout(() => this.calcViewerPositionTop());
    } // end of if (NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized)

    if ('printResolution' in changes) {
      const options = PDFViewerApplicationOptions;
      if (options) {
        options.set('printResolution', this.printResolution);
      }
    }
    if ('ignoreKeyboard' in changes) {
      const options = PDFViewerApplicationOptions;
      if (options) {
        this.overrideDefaultSettings();
      }
    }
    if ('ignoreKeys' in changes) {
      const options = PDFViewerApplicationOptions;
      if (options) {
        this.overrideDefaultSettings();
      }
    }
    if ('acceptKeys' in changes) {
      const options = PDFViewerApplicationOptions;
      if (options) {
        this.overrideDefaultSettings();
      }
    }
    if ('showBorders' in changes) {
      if (!changes['showBorders'].isFirstChange()) {
        const options = PDFViewerApplicationOptions;
        if (options) {
          this.overrideDefaultSettings();
          const viewer = document.getElementById('viewer') as HTMLElement;
          if (this.showBorders) {
            viewer.classList.remove('removePageBorders');
          } else {
            viewer.classList.add('removePageBorders');
          }

          if (PDFViewerApplication.pdfViewer) {
            PDFViewerApplication.pdfViewer.removePageBorders = !this.showBorders;
          }
          const zoomEvent = {
            source: viewer,
            // tslint:disable-next-line:no-bitwise
            scale: (Number(this.zoom) | 100) / 100,
            presetValue: this.zoom,
          } as ScaleChangingEvent;
          PDFViewerApplication.eventBus.dispatch('scalechanging', zoomEvent);
        }
      }
    }

    if ('showUnverifiedSignatures' in changes) {
      if (PDFViewerApplication?.pdfDocument) {
        PDFViewerApplication.pdfDocument._transport.messageHandler.send('showUnverifiedSignatures', this.showUnverifiedSignatures);
      }
    }

    if ('formData' in changes) {
      if (!changes['formData'].isFirstChange()) {
        this.formSupport.updateFormFieldsInPdfCalledByNgOnChanges(changes['formData'].previousValue);
      }
    }

    if ('enablePrint' in changes) {
      if (!changes['enablePrint'].isFirstChange()) {
        PDFViewerApplication.enablePrint = this.enablePrint;
      }
    }
    if (
      ('customFindbar' in changes && !changes['customFindbar'].isFirstChange()) ||
      ('customFindbarButtons' in changes && !changes['customFindbarButtons'].isFirstChange()) ||
      ('customFindbarInputArea' in changes && !changes['customFindbarInputArea'].isFirstChange()) ||
      ('customToolbar' in changes && !changes['customToolbar'].isFirstChange())
    ) {
      if (this.dummyComponents) {
        this.dummyComponents.addMissingStandardWidgets();
      }
    }

    if ('pageViewMode' in changes && !changes['pageViewMode'].isFirstChange()) {
      this.pageViewMode = changes['pageViewMode'].currentValue;
    }
    if ('replaceBrowserPrint' in changes && typeof window !== 'undefined') {
      if (this.replaceBrowserPrint) {
        if ((window as any).printPDF) {
          window.print = (window as any).printPDF;
        }
      } else {
        const originalPrint = NgxExtendedPdfViewerComponent.originalPrint;
        if (originalPrint && !originalPrint.toString().includes('printPdf')) {
          window.print = originalPrint;
        }
      }
    }
    if ('disableForms' in changes) {
      this.enableOrDisableForms(this.elementRef.nativeElement, false);
    }
    setTimeout(() => this.calcViewerPositionTop());
  }

  private async setZoom() {
    if (typeof window === 'undefined') {
      return; // server side rendering
    }
    // sometimes ngOnChanges calls this method before the page is initialized,
    // so let's check if this.root is already defined
    if (this.root) {
      const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

      let zoomAsNumber = this.zoom;
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
        const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;
        PDFViewerApplicationOptions.set('defaultZoomValue', zoomAsNumber);
      }

      const scaleDropdownField = (this.root.nativeElement as HTMLElement).querySelector('#scaleSelect') as HTMLSelectElement | undefined;
      if (scaleDropdownField) {
        if (this.zoom === 'auto' || this.zoom === 'page-fit' || this.zoom === 'page-actual' || this.zoom === 'page-width') {
          scaleDropdownField.value = this.zoom;
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

  public onResize(): void {
    const pdfViewer = document.getElementsByClassName('html');
    if (pdfViewer && pdfViewer.length > 0) {
      const container = document.getElementById('outerContainer');
      if (container) {
        const width = container.clientWidth;
        this.toolbarWidthInPixels = width;
        if (this.secondaryToolbarComponent) {
          this.secondaryToolbarComponent.checkVisibility();
        }
      }
      this.checkHeight();
    }
    try {
      const observer = new ResizeObserver(() => this.removeScrollbarInInfiniteScrollMode(false));
      const viewer = document.getElementById('viewer');
      if (viewer) {
        observer.observe(viewer);
      }
    } catch (exception) {
      console.log('ResizeObserver is not supported by your browser');
    }
  }

  @HostListener('contextmenu')
  public onContextMenu(): boolean {
    return this.contextMenuAllowed;
  }

  public async scrollSignatureWarningIntoView(pdf: PDFDocumentProxy): Promise<void> {
    /** This method has been inspired by https://medium.com/factory-mind/angular-pdf-forms-fa72b15c3fbd. Thanks, Jonny Fox! */
    this.hasSignature = false;

    for (let i = 1; i <= pdf?.numPages; i++) {
      // track the current page
      const page = await pdf.getPage(i);
      const annotations = await page.getAnnotations();

      // Check if there is at least one 'Sig' fieldType in annotations
      this.hasSignature = annotations.some((a) => a.fieldType === 'Sig');

      if (this.hasSignature) {
        this.ngZone.run(() => {
          // Defer scrolling to ensure it happens after any other UI updates
          setTimeout(() => {
            const viewerContainer = document.querySelector('#viewerContainer');
            viewerContainer?.scrollBy(0, -32); // Adjust the scroll position
          });
        });
        break; // stop looping through the pages as soon as we find a signature
      }
    }
  }

  public async zoomToPageWidth(event: MouseEvent): Promise<void> {
    if (this.handTool) {
      if (!pdfDefaultOptions.doubleTapZoomsInHandMode) {
        return;
      }
    } else {
      if (!pdfDefaultOptions.doubleTapZoomsInTextSelectionMode) {
        return;
      }
    }
    if (this.pageViewMode === 'book') {
      // scaling doesn't work in book mode
      return;
    }
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const desiredCenterY = event.clientY;
    const previousScale = (PDFViewerApplication.pdfViewer as any).currentScale;

    if (this.zoom !== pdfDefaultOptions.doubleTapZoomFactor && this.zoom + '%' !== pdfDefaultOptions.doubleTapZoomFactor) {
      this.previousZoom = this.zoom;
      this.zoom = pdfDefaultOptions.doubleTapZoomFactor; // by default: 'page-width';
      await this.setZoom();
    } else if (pdfDefaultOptions.doubleTapResetsZoomOnSecondDoubleTap) {
      if (this.previousZoom) {
        this.zoom = this.previousZoom;
      } else {
        this.zoom = 'page-width';
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
    if (!this.disableForms && doNotEnable) {
      return;
    }
    const xfaLayers = Array.from(div.querySelectorAll('.xfaLayer'));
    const acroFormLayers = Array.from(div.querySelectorAll('.annotationLayer'));
    const layers = xfaLayers.concat(...acroFormLayers);
    layers.forEach((layer) => layer.querySelectorAll('input').forEach((x) => (x.disabled = this.disableForms)));
    layers.forEach((layer) => layer.querySelectorAll('select').forEach((x) => (x.disabled = this.disableForms)));
    layers.forEach((layer) => layer.querySelectorAll('textarea').forEach((x) => (x.disabled = this.disableForms)));
  }
}
