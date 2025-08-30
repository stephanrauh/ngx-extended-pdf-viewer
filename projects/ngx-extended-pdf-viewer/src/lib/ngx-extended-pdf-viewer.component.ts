import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import {
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
import { IPDFViewerApplication, PDFDocumentProxy, PDFPageProxy } from './options/pdf-viewer-application';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
import { VerbosityLevel } from './options/verbosity-level';
import { PdfDummyComponentsComponent } from './pdf-dummy-components/pdf-dummy-components.component';
import { PDFNotificationService } from './pdf-notification-service';
import { PdfSecondaryToolbarComponent } from './secondary-toolbar/pdf-secondary-toolbar/pdf-secondary-toolbar.component';
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
  public disconnect();
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
})
export class NgxExtendedPdfViewerComponent implements OnInit, OnChanges, OnDestroy, NgxHasHeight {
  private readonly formSupport = new NgxFormSupport();

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

  @Input()
  public forceUsingLegacyES5 = false;

  public localizationInitialized: boolean = false;

  private resizeObserver: ResizeObserver | undefined;

  private initialAngularFormData?: FormDataType = undefined;

  @Input()
  public set formData(formData: FormDataType) {
    this.initialAngularFormData ??= formData;
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
    if (!isPlatformBrowser(this.platformId)) return;

    const hasChanged = this._pageViewMode !== viewMode;
    if (!hasChanged) return;

    const mustRedraw = !this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized && (this._pageViewMode === 'book' || viewMode === 'book');
    this._pageViewMode = viewMode;
    this.pageViewModeChange.emit(this._pageViewMode);

    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    PDFViewerApplicationOptions?.set('pageViewMode', this.pageViewMode);

    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (PDFViewerApplication) {
      PDFViewerApplication.pdfViewer.pageViewMode = this._pageViewMode;
      PDFViewerApplication.findController._pageViewMode = this._pageViewMode;
    }

    this.handleViewMode(viewMode);

    if (mustRedraw) {
      this.redrawViewer(viewMode);
    }
  }

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
        this.scrollMode = ScrollModeType.vertical;
    }
  }

  private handleInfiniteScrollMode(): void {
    if (this.scrollMode === ScrollModeType.page || this.scrollMode === ScrollModeType.horizontal) {
      this.scrollMode = ScrollModeType.vertical;
      this.pdfScriptLoaderService.PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: Number(this.scrollMode) });
    }
    setTimeout(() => {
      // this timeout is necessary because @Input() is called before the child components are initialized
      // (and the DynamicCssComponent is a child component)
      this.dynamicCSSComponent.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode, this.primaryMenuVisible, this, this.logLevel);
    });
  }

  // since pdf.js, our custom single-page-mode has been replaced by the standard scrollMode="page"
  private handleSinglePageMode(): void {
    this.scrollMode = ScrollModeType.page;
    this._pageViewMode = 'single';
  }

  private handleBookMode(): void {
    this.showBorders = false;
    if (this.scrollMode !== ScrollModeType.vertical) {
      this.scrollMode = ScrollModeType.vertical;
    }
  }

  private handleMultiplePageMode(): void {
    if (this.scrollMode === ScrollModeType.page) {
      this.scrollMode = ScrollModeType.vertical;
    }
    setTimeout(() => {
      // this timeout is necessary because @Input() is called before the child components are initialized
      // (and the DynamicCssComponent is a child component)
      this.dynamicCSSComponent.removeScrollbarInInfiniteScrollMode(true, this.pageViewMode, this.primaryMenuVisible, this, this.logLevel);
    });
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

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  @Output()
  public progress = new EventEmitter<ProgressBarEvent>();

  @ViewChild('pdfSecondaryToolbarComponent')
  private readonly secondaryToolbarComponent: PdfSecondaryToolbarComponent;

  @ViewChild('DynamicCssComponent')
  private readonly dynamicCSSComponent: DynamicCssComponent;

  @ViewChild('pdfsidebar')
  private readonly sidebarComponent: PdfSidebarComponent;

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
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
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
  private previousZoom: ZoomType;

  @Input()
  public enablePrint = true;

  public get enablePrintAutoRotate() {
    return pdfDefaultOptions.enablePrintAutoRotate;
  }
  @Input()
  public set enablePrintAutoRotate(value) {
    pdfDefaultOptions.enablePrintAutoRotate = value;
    if (this.pdfScriptLoaderService.PDFViewerApplication?.pdfViewer) {
      this.pdfScriptLoaderService.PDFViewerApplication.pdfViewer.enablePrintAutoRotate = value;
    }
  }

  /** Force reloading of the JavaScript code. Useful for testing and micro-frontends */
  @Input()
  public forceFullReloadOfJavaScriptCode = false;

  @Input()
  public showTextEditor: ResponsiveVisibility = 'xxl';

  @Input()
  public showStampEditor: ResponsiveVisibility = 'xxl';

  @Input()
  public showDrawEditor: ResponsiveVisibility = 'xxl';

  @Input()
  public showHighlightEditor: ResponsiveVisibility = 'xxl';

  @Input()
  public showSignatureEditor: ResponsiveVisibility = 'xxl';

  /** How many log messages should be printed?
   * Legal values: VerbosityLevel.INFOS (= 5), VerbosityLevel.WARNINGS (= 1), VerbosityLevel.ERRORS (= 0) */
  @Input()
  public logLevel = VerbosityLevel.WARNINGS;

  /** Use the minified (minifiedJSLibraries="true", which is the default) or the user-readable pdf.js library (minifiedJSLibraries="false") */
  public get minifiedJSLibraries() {
    return pdfDefaultOptions._internalFilenameSuffix === '.min';
  }

  @Input()
  public set minifiedJSLibraries(value) {
    pdfDefaultOptions._internalFilenameSuffix = value ? '.min' : '';
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
  public set src(url: string | ArrayBuffer | Blob | Uint8Array | URL | { range: any } | undefined) {
    if (url instanceof Uint8Array) {
      this._src = url.buffer;
    } else if (url instanceof URL) {
      this._src = url.toString();
    } else if (typeof Blob !== 'undefined' && url instanceof Blob) {
      (async () => {
        this.src = await this.convertBlobToUint8Array(url);
        if (this.service.ngxExtendedPdfViewerInitialized) {
          if (this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized) {
            this.openPDF();
          } else {
            (async () => this.openPDF2())();
          }
          // else openPDF is called later, so we do nothing to prevent loading the PDF file twice
        }
      })();
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

  private async convertBlobToUint8Array(blob): Promise<Uint8Array> {
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
   * By default, many CSS frameworks make a div with 100% have a height or zero pixels. checkHeight() fixes this.
   */
  public autoHeight = false;

  @Input()
  public minHeight: string | undefined = undefined;

  private _height: string | undefined = '100%';

  @Input()
  public set height(h: string | undefined) {
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
      // this timeout is necessary because @Input() is called before the child components are initialized
      // (and the DynamicCssComponent is a child component)
      this.dynamicCSSComponent.checkHeight(this, this.logLevel);
    });
  }

  public get height() {
    return this._height;
  }

  @Input()
  public backgroundColor = undefined;

  @Input()
  public pdfBackgroundColor = undefined;

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

  public hasTextLayer = true;

  /** Allows the user to put the viewer's svg images into an arbitrary folder */
  @Input()
  public imageResourcesPath = assetsUrl(pdfDefaultOptions.assetsFolder) + '/images/';

  /** Allows the user to put their locale folder into an arbitrary folder */
  @Input()
  public localeFolderPath = assetsUrl(pdfDefaultOptions.assetsFolder) + '/locale';

  /** Override the default locale. This must be the complete locale name, such as "es-ES". The string is allowed to be all lowercase.
   */
  @Input()
  public language: string | undefined = typeof window === 'undefined' ? 'en' : navigator.language;

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

  private readonly originalPrint = typeof window !== 'undefined' ? window.print : undefined;

  /** Store the original color-scheme value to restore it on destroy */
  private originalColorScheme: string | null = null;

  public _showSidebarButton: ResponsiveVisibility = true;

  @Input()
  public useInlineScripts = true;

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
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
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
  public showFindMultiple: boolean = true;

  @Input()
  public showFindRegexp: boolean = false;

  @Input()
  public showFindEntireWord = true;

  @Input()
  public showFindMatchDiacritics = true;

  @Input()
  public showFindResultsCount = true;

  @Input()
  public showFindMessages = true;

  @Input()
  public showMovePageButton: ResponsiveVisibility = false;

  @Input()
  public showPagingButtons: ResponsiveVisibility = true;

  @Input()
  public showFirstAndLastPageButtons: ResponsiveVisibility = true;

  @Input()
  public showPreviousAndNextPageButtons: ResponsiveVisibility = true;

  @Input()
  public showPageNumber: ResponsiveVisibility = true;

  @Input()
  public showPageLabel: ResponsiveVisibility = true;

  @Input()
  public showZoomButtons: ResponsiveVisibility = true;

  @Input()
  public showZoomDropdown: ResponsiveVisibility = true;

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
        "On iOS, the handtool doesn't work reliably. Plus, you don't need it because touch gestures allow you to distinguish easily between swiping and selecting text. Therefore, the library ignores your setting.",
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

  @Input()
  public showSpreadButton: ResponsiveVisibility = true;

  @Input()
  public showPropertiesButton: ResponsiveVisibility = true;

  @Input()
  public showBorders = true;

  @Input()
  public spread: SpreadType;

  @Input()
  public set showScrollingButtons(show: ResponsiveVisibility) {
    this.showVerticalScrollButton = show;
    this.showHorizontalScrollButton = show;
    this.showWrappedScrollButton = show;
    this.showInfiniteScrollButton = show;
    this.showBookModeButton = show;
    this.showSinglePageModeButton = show;
  }

  @Output()
  public spreadChange = new EventEmitter<'off' | 'even' | 'odd'>();

  @Output()
  public thumbnailDrawn = new EventEmitter<PdfThumbnailDrawnEvent>();

  private _page: number | undefined = undefined;

  public get page(): number | undefined {
    return this._page;
  }

  @Input()
  public set page(newPageNumber: number | string | undefined) {
    if (newPageNumber) {
      // silently cope with strings
      this._page = Number(newPageNumber);
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
  public zoom: ZoomType = undefined;

  @Output()
  public zoomChange = new EventEmitter<ZoomType>();

  private _zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 1, 1.25, 1.5, 2, 3, 4];

  public get zoomLevels() {
    if (this.maxZoom && this.maxZoom === this.minZoom) {
      return [this.maxZoom];
    }
    return this._zoomLevels;
  }

  @Input()
  public set zoomLevels(value) {
    this._zoomLevels = value;
  }

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

  public secondaryToolbarTop: string | undefined = undefined;

  public sidebarPositionTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarLeft: string | undefined = undefined;

  private initializationPromise: (() => Promise<void>) | null = null;
  private checkRootElementTimeout: any;
  private destroyInitialization = false;

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

    this.calcViewerPositionTop();
  }

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

    const findButton = document.getElementById('primaryViewFind');
    if (findButton) {
      const containerPositionLeft = this.toolbar.getBoundingClientRect().left;
      const findButtonPosition = findButton.getBoundingClientRect();
      const left = Math.max(0, findButtonPosition.left - containerPositionLeft);
      this.findbarLeft = left + 'px';
    } else if (this.showSidebarButton) {
      this.findbarLeft = (34 + 32 * factor).toString() + 'px';
    } else {
      this.findbarLeft = '0';
    }
  }

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId,
    private readonly notificationService: PDFNotificationService,
    private readonly elementRef: ElementRef,
    private readonly platformLocation: PlatformLocation,
    public cdr: ChangeDetectorRef,
    public service: NgxExtendedPdfViewerService,
    private readonly renderer: Renderer2,
    private readonly pdfScriptLoaderService: PDFScriptLoaderService,
    private readonly keyboardManager: NgxKeyboardManagerService,
    private readonly cspPolicyService: PdfCspPolicyService,
    private readonly ngZone: NgZone,
  ) {
    this.baseHref = this.platformLocation.getBaseHrefFromDOM();
    if (isPlatformBrowser(this.platformId)) {
      this.serverSideRendering = false;
      this.toolbarWidth = String(document.body.clientWidth);
    }
  }

  private reportSourceChanges(change: { sourcefile: string }): void {
    this._src = change.sourcefile;
    this.srcChangeTriggeredByUser = true;
    this.srcChange.emit(change.sourcefile);
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    if (this.filenameForDownload) {
      PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
    } else {
      PDFViewerApplication.appConfig.filenameForDownload = this.guessFilenameFromUrl(this._src);
    }
  }

  private handleStoredValuesAvailable(event: any): void {
    // Only apply stored values if developer hasn't explicitly set zoom/page

    // Apply stored zoom if zoom is not explicitly set by developer
    if (this.zoom === undefined && event.storedZoom !== undefined) {
      this.zoom = event.storedZoom as ZoomType;
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

        await this.pdfScriptLoaderService.ensurePdfJsHasBeenLoaded(this.useInlineScripts, this.forceUsingLegacyES5, this.forceFullReloadOfJavaScriptCode);
        if (this.destroyInitialization) return;

        if (this.formSupport) {
          this.formSupport.registerFormSupportWithPdfjs(this.pdfScriptLoaderService.PDFViewerApplication);
          this.keyboardManager.registerKeyboardListener(this.pdfScriptLoaderService.PDFViewerApplication);
          this.formSupport.ngZone = this.ngZone;
          this.formSupport.cdr = this.cdr;
        }
        this.pdfScriptLoaderService.PDFViewerApplication.cspPolicyService = this.cspPolicyService;
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

        if (this.root?.nativeElement?.offsetParent) {
          resolve();
        } else {
          this.checkRootElementTimeout = setTimeout(checkRootElement, 50);
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
        setTimeout(() => {
          onLoaded();
        }, 10);
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
          if (this.replaceBrowserPrint) {
            this.doReplaceBrowserPrint(this.replaceBrowserPrint);
          }
        }
      }
    };
    document.addEventListener('webviewerinitialized', onLoaded, { once: true });

    this.activateTextlayerIfNecessary(null);

    setTimeout(() => {
      if (!this.pdfScriptLoaderService.shuttingDown) {
        // hurried users sometimes reload the PDF before it has finished initializing
        // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
        this.initResizeObserver();
        this.onResize();
        this.hideToolbarIfItIsEmpty();
        this.dummyComponents.addMissingStandardWidgets();
        if (this.pdfScriptLoaderService.PDFViewerApplicationOptions) {
          const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
          (globalThis as any).PDFViewerApplicationOptions = PDFViewerApplicationOptions;
        }

        this.pdfScriptLoaderService.webViewerLoad(this.cspPolicyService);

        const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
        PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
        const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;

        PDFViewerApplicationOptions.set('enableDragAndDrop', this.enableDragAndDrop);
        PDFViewerApplicationOptions.set('localeProperties', { lang: this.language });
        PDFViewerApplicationOptions.set('imageResourcesPath', this.imageResourcesPath);
        PDFViewerApplicationOptions.set('minZoom', this.minZoom);
        PDFViewerApplicationOptions.set('maxZoom', this.maxZoom);
        PDFViewerApplicationOptions.set('pageViewMode', this.pageViewMode);
        PDFViewerApplicationOptions.set('verbosity', this.logLevel);
        PDFViewerApplicationOptions.set('pdfBackgroundColor', this.pdfBackgroundColor);
        if (this.theme === 'dark') {
          PDFViewerApplicationOptions.set('viewerCssTheme', 2);
        } else if (this.theme === 'light') {
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
    // Store the original color-scheme value before PDF.js might change it
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && this.originalColorScheme === null) {
      const docStyle = document.documentElement.style;
      this.originalColorScheme = docStyle.getPropertyValue('color-scheme') || '';
    }

    queueMicrotask(() => this.notificationService.onPDFJSInitSignal.set(this.pdfScriptLoaderService.PDFViewerApplication));
  }

  public onSpreadChange(newSpread: 'off' | 'even' | 'odd'): void {
    this.spreadChange.emit(newSpread);
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

    if (this.textLayer === undefined) {
      if (!this.handTool) {
        setTextLayerMode(pdfDefaultOptions.textLayerMode);
        this.textLayer = true;
        if (this.showFindButton === undefined) {
          this.showFindButton = true;
          setTimeout(() => {
            this.toggleVisibility('viewFind');
            this.toggleVisibility('findbar');
          });
        }
      } else {
        setTextLayerMode(this.showHandToolButton ? pdfDefaultOptions.textLayerMode : 0);

        if (!this.showHandToolButton) {
          if (this.showFindButton || this.showFindButton === undefined) {
            queueMicrotask(() => {
              this.showFindButton = false;
            });
            if (this.logLevel >= VerbosityLevel.WARNINGS) {
              console.warn(
                // tslint:disable-next-line:max-line-length
                'Hiding the "find" button because the text layer of the PDF file is not rendered. Use [textLayer]="true" to enable the find button.',
              );
            }
          }
          if (this.showHandToolButton) {
            if (this.logLevel >= VerbosityLevel.WARNINGS) {
              console.warn(
                // tslint:disable-next-line:max-line-length
                'Hiding the "hand tool / selection mode" menu because the text layer of the PDF file is not rendered. Use [textLayer]="true" to enable the the menu items.',
              );
              this.showHandToolButton = false;
            }
          }
        }
      }
    } else {
      setTextLayerMode(pdfDefaultOptions.textLayerMode);
      this.textLayer = true;
      if (this.showFindButton === undefined) {
        this.showFindButton = true;
        setTimeout(() => {
          this.toggleVisibility('viewFind');
          this.toggleVisibility('findbar');
        });
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
        const option = pdfDefaultOptions[key];
        if (key !== 'findController' && typeof option === 'function') {
          options.set(key, option());
        } else {
          options.set(key, pdfDefaultOptions[key]);
        }
      }
    }
    options.set('disablePreferences', true);
    await this.setZoom();

    this.keyboardManager.ignoreKeyboard = this.ignoreKeyboard;
    this.keyboardManager.ignoreKeys = this.ignoreKeys;
    this.keyboardManager.acceptKeys = this.acceptKeys;
    this.activateTextlayerIfNecessary(options);

    if (this.scrollMode || this.scrollMode === ScrollModeType.vertical) {
      options.set('scrollModeOnLoad', this.scrollMode);
    }

    const sidebarVisible = this.sidebarVisible;
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;

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
    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
    PDFViewerApplicationOptions.set('localeProperties', { lang: this.language });
  }

  private async openPDF(): Promise<void> {
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    PDFViewerApplication.serviceWorkerOptions.showUnverifiedSignatures = this.showUnverifiedSignatures;
    PDFViewerApplication.enablePrint = this.enablePrint;
    if (this.filenameForDownload) {
      PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
    } else {
      PDFViewerApplication.appConfig.filenameForDownload = this.guessFilenameFromUrl(this._src);
    }
    this.service.ngxExtendedPdfViewerInitialized = true;
    this.registerEventListeners(PDFViewerApplication);
    this.selectCursorTool();
    if (!this.listenToURL) {
      PDFViewerApplication.pdfLinkService.setHash = undefined;
    }

    if (this._src) {
      this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized = false;

      setTimeout(async () => this.dynamicCSSComponent.checkHeight(this, this.logLevel), 100);
      // open a file in the viewer
      if (!!this._src) {
        let workerSrc: string | (() => string) = pdfDefaultOptions.workerSrc;
        if (typeof workerSrc === 'function') {
          workerSrc = workerSrc();
        }
        const options: any = {
          password: this.password,
          verbosity: this.logLevel,
          workerSrc,
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
        setTimeout(async () => this.setZoom());
      }
      setTimeout(() => {
        if (!this.pdfScriptLoaderService.shuttingDown) {
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
      queueMicrotask(() => {
        this.annotationEditorEvent.emit(x);
      });
    });

    PDFViewerApplication.eventBus.on('toggleSidebar', (x: ToggleSidebarEvent) => {
      queueMicrotask(() => {
        this.sidebarVisible = x.visible;
        this.sidebarVisibleChange.emit(x.visible);
      });
    });

    PDFViewerApplication.eventBus.on('textlayerrendered', (x: TextLayerRenderedEvent) => {
      queueMicrotask(() => this.textLayerRendered.emit(x));
    });

    PDFViewerApplication.eventBus.on('annotationeditormodechanged', (x: AnnotationEditorEditorModeChangedEvent) => {
      // we're using a timeout here to make sure the editor is already visible
      // when the event is caught. Pdf.js fires it a bit early.
      setTimeout(() => this.annotationEditorModeChanged.emit(x));
    });

    PDFViewerApplication.eventBus.on('scrollmodechanged', (x: ScrollModeChangedEvent) => {
      queueMicrotask(() => {
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
      queueMicrotask(() => this.progress.emit(x));
    });
    PDFViewerApplication.eventBus.on('findbarclose', () => {
      queueMicrotask(() => {
        this.findbarVisible = false;
        this.findbarVisibleChange.emit(false);
        this.cdr.markForCheck();
      });
    });
    PDFViewerApplication.eventBus.on('findbaropen', () => {
      queueMicrotask(() => {
        this.findbarVisible = true;
        this.findbarVisibleChange.emit(true);
        this.cdr.markForCheck();
      });
    });
    PDFViewerApplication.eventBus.on('propertiesdialogclose', () => {
      this.propertiesDialogVisible = false;
      queueMicrotask(() => this.propertiesDialogVisibleChange.emit(false));
    });
    PDFViewerApplication.eventBus.on('propertiesdialogopen', () => {
      this.propertiesDialogVisible = true;
      queueMicrotask(() => this.propertiesDialogVisibleChange.emit(true));
    });

    PDFViewerApplication.eventBus.on('pagesloaded', (x: PagesLoadedEvent) => {
      queueMicrotask(() => this.pagesLoaded.emit(x));
      this.dynamicCSSComponent.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode, this.primaryMenuVisible, this, this.logLevel);
      if (this.rotation !== undefined && this.rotation !== null) {
        const r = Number(this.rotation);
        if (r === 0 || r === 90 || r === 180 || r === 270) {
          PDFViewerApplication.pdfViewer.pagesRotation = r;
        }
      }
      setTimeout(() => {
        if (!this.pdfScriptLoaderService.shuttingDown) {
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
      queueMicrotask(() => {
        this.pageRendered.emit(x);
        this.dynamicCSSComponent.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode, this.primaryMenuVisible, this, this.logLevel);
      });
    });
    PDFViewerApplication.eventBus.on('pagerender', (x: PageRenderEvent) => {
      queueMicrotask(() => {
        this.pageRender.emit(x);
      });
    });

    PDFViewerApplication.eventBus.on('download', (x: PdfDownloadedEvent) => {
      queueMicrotask(() => {
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
      queueMicrotask(() => {
        this.rotationChange.emit(x.pagesRotation);
      });
    });
    PDFViewerApplication.eventBus.on('fileinputchange', (x: FileInputChanged) => {
      queueMicrotask(() => {
        if (x.fileInput.files && x.fileInput.files.length >= 1) {
          // drag and drop
          this.srcChangeTriggeredByUser = true;
          this.srcChange.emit(x.fileInput.files[0].name);
        } else {
          // regular file open dialog
          const path = x.fileInput?.value?.replace('C:\\fakepath\\', '');
          this.srcChange.emit(path);
        }
      });
    });
    PDFViewerApplication.eventBus.on('cursortoolchanged', (x: HandtoolChanged) => {
      queueMicrotask(() => {
        this.handTool = x.tool === PdfCursorTools.HAND;
        this.handToolChange.emit(x.tool === PdfCursorTools.HAND);
      });
    });

    PDFViewerApplication.eventBus.on('sidebarviewchanged', (x: SidebarviewChange) => {
      queueMicrotask(() => {
        this.sidebarVisibleChange.emit(x.view > 0);
        if (x.view > 0) {
          this.activeSidebarViewChange.emit(x.view);
        }
        if (this.sidebarComponent) {
          this.sidebarComponent.showToolbarWhenNecessary();
        }
      });
    });

    PDFViewerApplication.eventBus.on('storedvaluesavailable', (event) => {
      queueMicrotask(() => {
        this.handleStoredValuesAvailable(event);
      });
    });

    PDFViewerApplication.eventBus.on('documentloaded', (pdfLoadedEvent: PdfDocumentLoadedEvent) => {
      queueMicrotask(async () => {
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
        this.hasTextLayer = this.textLayer === true;
      });
    });

    PDFViewerApplication.eventBus.on('spreadmodechanged', (event) => {
      queueMicrotask(() => {
        const modes = ['off', 'odd', 'even'] as Array<SpreadType>;
        this.spread = modes[event.mode];
        this.spreadChange.emit(this.spread);
      });
    });

    const hideSidebarToolbar = () => {
      queueMicrotask(() => {
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
      queueMicrotask(() => {
        event.initialFormDataStoredInThePDF = this.formSupport.initialFormDataStoredInThePDF;
        this.annotationLayerRendered.emit(event);
        this.enableOrDisableForms(div, true);
      });
    });
    PDFViewerApplication.eventBus.on('annotationeditorlayerrendered', (event) => queueMicrotask(() => this.annotationEditorLayerRendered.emit(event)));
    PDFViewerApplication.eventBus.on('xfalayerrendered', (event) => queueMicrotask(() => this.xfaLayerRendered.emit(event)));
    PDFViewerApplication.eventBus.on('outlineloaded', (event) => queueMicrotask(() => this.outlineLoaded.emit(event)));
    PDFViewerApplication.eventBus.on('attachmentsloaded', (event) => queueMicrotask(() => this.attachmentsloaded.emit(event)));
    PDFViewerApplication.eventBus.on('layersloaded', (event) => queueMicrotask(() => this.layersloaded.emit(event)));
    PDFViewerApplication.eventBus.on('presentationmodechanged', (event) => {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
      PDFViewerApplication?.pdfViewer?.destroyBookMode();
    });

    PDFViewerApplication.eventBus.on('updatefindcontrolstate', (x: FindResult) => {
      queueMicrotask(() => {
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
      });
    });
    PDFViewerApplication.eventBus.on('updatefindmatchescount', (x: FindResult) => {
      x.matchesCount.matches = PDFViewerApplication.findController._pageMatches ?? [];
      x.matchesCount.matchesLength = PDFViewerApplication.findController._pageMatchesLength ?? [];
      queueMicrotask(() =>
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
      );
    });

    PDFViewerApplication.eventBus.on('pagechanging', (x: PageNumberChange) => {
      if (!this.pdfScriptLoaderService.shuttingDown) {
        // hurried users sometimes reload the PDF before it has finished initializing
        queueMicrotask(() => {
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
    if (this.filenameForDownload) {
      PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
    } else {
      PDFViewerApplication.appConfig.filenameForDownload = this.guessFilenameFromUrl(this._src);
    }

    let workerSrc: string | (() => string) = pdfDefaultOptions.workerSrc;
    if (typeof workerSrc === 'function') {
      workerSrc = workerSrc();
    }
    const options: any = {
      password: this.password,
      verbosity: this.logLevel,
      workerSrc,
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
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool: this.handTool ? 1 : 0 });
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
        document.querySelectorAll('.ngx-extended-pdf-viewer-file-input').forEach((e: HTMLInputElement) => {
          e.remove();
        });
      }
    }
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
        this.showBookModeButton ||
        this.showSinglePageModeButton ||
        this.showVerticalScrollButton ||
        this.showHorizontalScrollButton ||
        this.showInfiniteScrollButton ||
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
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;

    if (this.service.ngxExtendedPdfViewerInitialized) {
      if ('src' in changes || 'base64Src' in changes) {
        if (this.srcChangeTriggeredByUser) {
          this.srcChangeTriggeredByUser = false;
        } else {
          if (this.pageViewMode === 'book') {
            const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
            PDFViewerApplication?.pdfViewer?.destroyBookMode();
            PDFViewerApplication?.pdfViewer?.stopRendering();
            PDFViewerApplication?.pdfThumbnailViewer?.stopRendering();
          }
          if (!!this._src) {
            if (this.pdfScriptLoaderService.ngxExtendedPdfViewerIncompletelyInitialized) {
              this.openPDF();
            } else {
              const initialized = this.notificationService.onPDFJSInitSignal();
              if (initialized) {
                await this.openPDF2();
              } else {
                // the library loads the PDF file later during the initialization
              }
            }
          } else {
            // #802 clear the form data; otherwise the "download" dialogs opens
            await this.closeDocument(PDFViewerApplication);
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
        if (PDFViewerApplication.pdfViewer) {
          PDFViewerApplication.pdfViewer.maxZoom = this.maxZoom;
        }
        if (PDFViewerApplication.toolbar) {
          PDFViewerApplication.toolbar.maxZoom = this.maxZoom;
        }
      }

      if ('minZoom' in changes) {
        if (PDFViewerApplication.pdfViewer) {
          PDFViewerApplication.pdfViewer.minZoom = this.minZoom;
        }
        if (PDFViewerApplication.toolbar) {
          PDFViewerApplication.toolbar.minZoom = this.minZoom;
        }
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
      this.doReplaceBrowserPrint(this.replaceBrowserPrint);
    }
    if ('disableForms' in changes) {
      this.enableOrDisableForms(this.elementRef.nativeElement, false);
    }
    setTimeout(() => this.calcViewerPositionTop());
  }

  private async closeDocument(PDFViewerApplication: IPDFViewerApplication) {
    if (this.pageViewMode === 'book') {
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
    // sometimes ngOnChanges calls this method before the page is initialized,
    // so let's check if this.root is already defined
    if (this.root) {
      const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;

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
        const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = this.pdfScriptLoaderService.PDFViewerApplicationOptions;
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
          this.secondaryToolbarComponent.checkVisibility();
        }
        if (this.dynamicCSSComponent) {
          this.dynamicCSSComponent.updateToolbarWidth();
        }
      }
      this.dynamicCSSComponent.checkHeight(this, this.logLevel);
    }
    this.dynamicCSSComponent.removeScrollbarInInfiniteScrollMode(false, this.pageViewMode, this.primaryMenuVisible, this, this.logLevel);
  }

  @HostListener('contextmenu')
  public onContextMenu(): boolean {
    return this.contextMenuAllowed;
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
      queueMicrotask(() => {
        // Defer scrolling to ensure it happens after any other UI updates
        setTimeout(() => {
          const viewerContainer = document.querySelector('#viewerContainer');
          viewerContainer?.scrollBy(0, -32); // Adjust the scroll position
        });
      });
    }
  }

  public async zoomToPageWidth(event: MouseEvent): Promise<void> {
    if (this.handTool) {
      if (!pdfDefaultOptions.doubleTapZoomsInHandMode) {
        return;
      }
    } else if (!pdfDefaultOptions.doubleTapZoomsInTextSelectionMode) {
      return;
    }
    if (this.pageViewMode === 'book') {
      // scaling doesn't work in book mode
      return;
    }
    const PDFViewerApplication: IPDFViewerApplication = this.pdfScriptLoaderService.PDFViewerApplication;
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
