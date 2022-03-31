import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  NgZone,
  TemplateRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { PagesLoadedEvent } from './events/pages-loaded-event';
import { PageRenderedEvent } from './events/page-rendered-event';
import { PdfDownloadedEvent } from './events/pdf-downloaded-event';
import { PdfLoadedEvent } from './events/pdf-loaded-event';
import { getVersionSuffix, pdfDefaultOptions } from './options/pdf-default-options';
import { ScaleChangingEvent } from './events/scale-changing-event';
import { PagesRotationEvent } from './events/pages-rotation-event';
import { FileInputChanged } from './events/file-input-changed';
import { SidebarviewChange } from './events/sidebarview-changed';
import { HandtoolChanged } from './events/handtool-changed';
import { PageNumberChange } from './events/page-number-change';
import { ServiceWorkerOptionsType } from './options/service-worker-options';
import { VerbosityLevel } from './options/verbosity-level';
import { FindState, FindResultMatchesCount, FindResult } from './events/find-result';
import { isPlatformBrowser } from '@angular/common';
import { PdfDummyComponentsComponent } from './pdf-dummy-components/pdf-dummy-components.component';
import { AfterViewInit, ElementRef } from '@angular/core';
import { IPDFViewerApplication } from './options/pdf-viewer-application';
import { IPDFViewerApplicationOptions } from './options/pdf-viewer-application-options';
import { PdfSecondaryToolbarComponent } from './secondary-toolbar/pdf-secondary-toolbar/pdf-secondary-toolbar.component';
import { PDFNotificationService } from './pdf-notification-service';
import { PdfCursorTools } from './options/pdf-cursor-tools';
import { TextLayerRenderedEvent } from './events/textlayer-rendered';
import { Location } from '@angular/common';
import { PinchOnMobileSupport } from './pinch-on-mobile-support';
import { PdfThumbnailDrawnEvent } from './events/pdf-thumbnail-drawn-event';
import { PdfSidebarComponent } from './sidebar/pdf-sidebar/pdf-sidebar.component';
import { PageViewModeType, ScrollModeChangedEvent, ScrollModeType } from './options/pdf-viewer';
import { PdfDocumentLoadedEvent } from './events/document-loaded-event';
import { ProgressBarEvent } from './events/progress-bar-event';
import { UnitToPx } from './unit-to-px';
import { PageRenderEvent } from './events/page-render-event';
import { Annotation } from './Annotation';
import { PdfLoadingStartsEvent } from './events/pdf-loading-starts-event';
import { NgxExtendedPdfViewerService } from './ngx-extended-pdf-viewer.service';
import { PdfBackground } from './options/pdf-background';

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
  [fieldName: string]: string | number | boolean | string[];
}

@Component({
  selector: 'ngx-extended-pdf-viewer',
  templateUrl: './ngx-extended-pdf-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxExtendedPdfViewerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  public static ngxExtendedPdfViewerInitialized = false;
  public ngxExtendedPdfViewerIncompletelyInitialized = true;

  /**
   * The dummy components are inserted automatically when the user customizes the toolbar
   * without adding every original toolbar item. Without the dummy components, the
   * initialization code of pdf.js crashes because it assume that every standard widget is there.
   */
  @ViewChild(PdfDummyComponentsComponent)
  public dummyComponents: PdfDummyComponentsComponent;

  @ViewChild('root')
  public root: ElementRef;

  private pinchOnMobileSupport: PinchOnMobileSupport | undefined;

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
  public formData: FormDataType = {};

  /** Maps the internal ids of the annotations of pdf.js to their field name */
  private formIdToFieldName = {};
  private formRadioButtonValueToId = {};

  @Output()
  public formDataChange = new EventEmitter<FormDataType>();

  public _pageViewMode: PageViewModeType = 'multiple';

  public baseHref: string;

  public get pageViewMode(): PageViewModeType {
    return this._pageViewMode;
  }

  @Input()
  public set pageViewMode(viewMode: PageViewModeType) {
    this._pageViewMode = viewMode;
    if (viewMode === 'infinite-scroll') {
      this.scrollMode = ScrollModeType.vertical;
      this.spread = 'off';
    } else if (viewMode !== 'multiple') {
      this.scrollMode = ScrollModeType.vertical;
    }
    if (viewMode === 'single') {
      // since pdf.js, our custom single-page-mode has been replaced by the standard scrollMode="page"
      this.scrollMode = ScrollModeType.page;
      this._pageViewMode = 'multiple';
    }
    if (viewMode === 'book') {
      this.showBorders = false;
    }
  }

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

  @Input()
  public scrollMode: ScrollModeType | undefined = undefined;

  @Output()
  public scrollModeChange = new EventEmitter<ScrollModeType>();

  @Input()
  public authorization: Object | undefined = undefined;

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

  /**
   * Number of milliseconds to wait between initializing the PDF viewer and loading the PDF file.
   * Most users can let this parameter safely at it's default value of zero.
   * Set this to 1000 or higher if you run into timing problems (typically caused by loading the locale files
   * after the PDF files, so they are not available when the PDF viewer is initialized).
   */
  @Input()
  public delayFirstView = 0;

  /** store the timeout id so it can be canceled if user leaves the page before the PDF is shown */
  private initTimeout: any;

  /** How many log messages should be printed?
   * Legal values: VerbosityLevel.INFOS (= 5), VerbosityLevel.WARNINGS (= 1), VerbosityLevel.ERRORS (= 0) */
  @Input()
  public logLevel = VerbosityLevel.WARNINGS;

  @Input()
  public enablePinchOnMobile = false;

  /** Use the minified (minifiedJSLibraries="true", which is the default) or the user-readable pdf.js library (minifiedJSLibraries="false") */
  @Input()
  public minifiedJSLibraries = true;

  public primaryMenuVisible = true;

  /** option to increase (or reduce) print resolution. Default is 150 (dpi). Sensible values
   * are 300, 600, and 1200. Note the increase memory consumption, which may even result in a browser crash. */
  @Input()
  public printResolution = null;

  @Input()
  public rotation: 0 | 90 | 180 | 270;

  @Output()
  public rotationChange = new EventEmitter<0 | 90 | 180 | 270>();

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
          if (NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
            if (this.ngxExtendedPdfViewerIncompletelyInitialized) {
              this.openPDF();
            } else {
              (async () => await this.openPDF2())();
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
          if (/^[a-zA-Z\d\/+]+={0,2}$/.test(url)) {
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
      const binary_string = window.atob(base64);
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

  private _height = '100%';

  @Input()
  public set height(h: string) {
    this.minHeight = undefined;
    this.autoHeight = false;
    if (h) {
      this._height = h;
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

  /**
   * If this flag is true, this components adds a link to the locale assets. The pdf viewer
   * sees this link and uses it to load the locale files automatically.
   * @param useBrowserLocale boolean
   */
  @Input()
  public useBrowserLocale = false;

  @Input()
  public forceUsingLegacyES5 = false;

  @Input()
  public backgroundColor = '#e8e8eb';

  @Input()
  public pdfBackground: PdfBackground = undefined;

  @Input()
  public pdfBackgroundColorToReplace: string | ((page: number, pageLabel: string) => string | undefined) | undefined = '#ffffff';

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
  public imageResourcesPath = './' + pdfDefaultOptions.assetsFolder + '/images/';

  /** Allows the user to put their locale folder into an arbitrary folder */
  @Input()
  public localeFolderPath = './' + pdfDefaultOptions.assetsFolder + '/locale';

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

  public _showSidebarButton = true;

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
  public set showSidebarButton(show: boolean) {
    this._showSidebarButton = show;
    const isIE = /msie\s|trident\//i.test(window.navigator.userAgent);
    let factor = 1;
    if (isIE) {
      factor = Number((this._mobileFriendlyZoom || '100').replace('%', '')) / 100;
    }

    if (this._showSidebarButton) {
      this.findbarLeft = (68 * factor).toString() + 'px';
    } else {
      this.findbarLeft = '0px';
    }
  }

  @Input()
  public sidebarVisible: boolean | undefined = undefined;

  @Output()
  public sidebarVisibleChange = new EventEmitter<boolean>();

  @Input()
  public showFindButton: boolean | undefined = undefined;

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
  public showFindIgnoreAccents = true;

  @Input()
  public showFindFuzzySearch = true;

  @Input()
  public showFindResultsCount = true;

  @Input()
  public showFindMessages = true;

  @Input()
  public showPagingButtons = true;
  @Input()
  public showZoomButtons = true;
  @Input()
  public showPresentationModeButton = false;
  @Input()
  public showOpenFileButton = true;
  @Input()
  public showPrintButton = true;
  @Input()
  public showDownloadButton = true;
  @Input()
  public showBookmarkButton = true;

  @Input()
  public theme: 'dark' | 'light' | 'custom' | string = 'light';

  @Input()
  public showToolbar = true;

  @Input()
  public showSecondaryToolbarButton = true;

  /** Set by the event (secondaryMenuIsEmpty) */
  public hideKebabMenuForSecondaryToolbar = false;

  @Input()
  public showRotateButton = true;
  @Input()
  public handTool = true;
  @Output()
  public handToolChange = new EventEmitter<boolean>();

  @Input()
  public showHandToolButton = false;

  private _showScrollingButton = true;

  public get showScrollingButton() {
    if (this.pageViewMode === 'multiple') {
      return this._showScrollingButton;
    }
    return false;
  }

  @Input()
  public set showScrollingButton(val: any) {
    this._showScrollingButton = val;
  }

  private _showSpreadButton = true;

  public get showSpreadButton() {
    if (this.pageViewMode !== 'infinite-scroll') {
      return this._showSpreadButton;
    }
    return false;
  }

  @Input()
  public set showSpreadButton(val: any) {
    this._showSpreadButton = val;
  }

  @Input()
  public showPropertiesButton = true;
  @Input()
  public showBorders = true;

  @Input()
  public spread: 'off' | 'even' | 'odd';

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
  @Input() _mobileFriendlyZoom: string = '100%';

  public mobileFriendlyZoomScale = 1;

  @Input()
  public wheelAction: 'scroll' | 'zoom' = 'scroll';

  public toolbarMarginTop = '0px';

  public toolbarWidth = '100%';

  private toolbar: HTMLElement | undefined = undefined;
  public onToolbarLoaded(toolbarElement: HTMLElement): void {
      this.toolbar = toolbarElement;
  }

  public toolbarWidthInPixels = 100;

  public secondaryToolbarTop: string | undefined = undefined;

  public sidebarPositionTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarLeft: string | undefined = undefined;

  // Additional PDF Form Field Types #567: Used to store the exported values of radio and checkbox buttons
  public buttonValues: any = {};

  public get mobileFriendlyZoom() {
    return this._mobileFriendlyZoom;
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

  public calcViewerPositionTop(): void {
    if (this.toolbar === undefined) {
      return;
    }
    let top = this.toolbar.getBoundingClientRect().height;
    this.viewerPositionTop = top + 'px';

    const factor = top / 33;

    this.sidebarPositionTop = (33 + 33 * (factor - 1)).toString() + 'px';
    this.secondaryToolbarTop = (33 + 38 * (factor - 1)).toString() + 'px';
    this.findbarTop = (34 + 54 * (factor - 1)).toString() + 'px';

    const findButton = document.getElementById('viewFind');
    if (findButton) {
      const containerPositionLeft = this.toolbar.getBoundingClientRect().left;
      const findButtonPosition = findButton.getBoundingClientRect();
      const left = findButtonPosition.left - containerPositionLeft;
      this.findbarLeft = left + 'px';
    } else if (this.showSidebarButton) {
      this.findbarLeft = 34 + (32 * factor).toString() + 'px';
    } else {
      this.findbarLeft = '0px';
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
    private service: NgxExtendedPdfViewerService
  ) {
    this.baseHref = this.platformLocation.getBaseHrefFromDOM();
    this.service.recalculateSize$.subscribe(() => this.onResize());
  }

  private iOSVersionRequiresES5(): boolean {
    const match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match !== undefined && match !== null) {
      return parseInt(match[1], 10) < 14;
    }

    return false;
  }

  private async needsES5(): Promise<boolean> {
    const isIE = !!(<any>window).MSInputMethodContext && !!(<any>document).documentMode;
    const isEdge = /Edge\/\d./i.test(navigator.userAgent);
    const isIOs13OrBelow = this.iOSVersionRequiresES5();
    let needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';
    if (needsES5 || isIE || isEdge || isIOs13OrBelow || this.forceUsingLegacyES5) {
      return true;
    }
    return !(await this.supportsOptionalChaining());
  }

  private supportsOptionalChaining(): Promise<boolean> {
    return new Promise((resolve) => {
      const support = (<any>window).supportsOptionalChaining;
      support !== undefined ? resolve(support) : resolve(this.addScriptOpChainingSupport());
    });
  }

  private addScriptOpChainingSupport(): Promise<boolean> {
    return new Promise((resolve) => {
      const script = this.createScriptElement(pdfDefaultOptions.assetsFolder + '/op-chaining-support.js');
      script.onload = () => {
        script.remove();
        resolve((<any>window).supportsOptionalChaining as boolean);
      };
      script.onerror = () => {
        script.remove();
        (<any>window).supportsOptionalChaining = false;
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }

  private createScriptElement(sourcePath: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = this.location.normalize(sourcePath);

    return script;
  }

  private getPdfJsPath(artifact: 'pdf' | 'viewer', needsES5: boolean) {
    const suffix = this.minifiedJSLibraries ? '.min.js' : '.js';
    const assets = pdfDefaultOptions.assetsFolder;
    const versionSuffix = getVersionSuffix(assets);
    const artifactPath = `/${artifact}-`;
    const es5 = needsES5 ? '-es5' : '';

    return assets + artifactPath + versionSuffix + es5 + suffix;
  }

  private loadViewer(): void {
    window['ngxZone'] = this.ngZone;
    this.ngZone.runOutsideAngular(() => {
      if (!window['pdfjs-dist/build/pdf']) {
        setTimeout(() => this.loadViewer(), 25);
      } else {
        this.needsES5().then((needsES5) => {
          const viewerPath = this.getPdfJsPath('viewer', needsES5);
          const script = this.createScriptElement(viewerPath);
          // script.onload = async () => await this.addFeatures(); // DEBUG CODE!!!
          document.getElementsByTagName('head')[0].appendChild(script);
        });
      }
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
    window['setNgxExtendedPdfViewerSource'] = (url: string) => {
      this._src = url;
      console.log(url);
      this.srcChange.emit(url);
    }

    if (isPlatformBrowser(this.platformId)) {
      const link = document.createElement('link');
      link.href = this.localeFolderPath + '/locale.properties';
      link.setAttribute('origin', 'ngx-extended-pdf-viewer');
      link.rel = 'resource';
      link.type = 'application/l10n';
      const widget: HTMLElement = this.elementRef.nativeElement;
      widget.appendChild(link);
      (window as any).getFormValue = (key: string) => this.getFormValue(key);
      (window as any).setFormValue = (key: string, value: string) => this.setFormValue(key, value);
      (window as any).registerAcroformAnnotations = (sortedAnnotations) => this.registerAcroformAnnotations(sortedAnnotations);
      (window as any).assignFormIdAndFieldName = (key: string, fieldName: string, radioButtonField?: string) =>
        this.assignFormIdAndFieldName(key, fieldName, radioButtonField);

      this.loadPdfJs();
    }
  }

  private loadPdfJs() {
    window['ngxZone'] = this.ngZone;
    this.ngZone.runOutsideAngular(() => {
      if (!window['pdfjs-dist/build/pdf']) {
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
          window['ngxZone'] = this.ngZone;
          if (this.minifiedJSLibraries) {
            if (!pdfDefaultOptions.workerSrc().endsWith('.min.js')) {
              const src = pdfDefaultOptions.workerSrc();
              pdfDefaultOptions.workerSrc = () => src.replace('.js', '.min.js');
            }
          }
          const pdfJsPath = this.getPdfJsPath('pdf', needsES5);
          const script = this.createScriptElement(pdfJsPath);
          document.getElementsByTagName('head')[0].appendChild(script);
        });
      }
      if (!(window as any).webViewerLoad) {
        this.loadViewer();
      }
    });
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      if (!this.shuttingDown) {
        // hurried users sometimes reload the PDF before it has finished initializing
        if ((window as any).webViewerLoad) {
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
      const sorted = elements.sort((a, b) => {
        if (a.y - b.y > 15) {
          return 1;
        }
        if (b.y - a.y > 15) {
          return -1;
        }
        return a.x - b.x;
      });
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

  private doInitPDFViewer() {
    if (typeof window === 'undefined') {
      return;
    }
    const langLinks = document.querySelectorAll('link[type="application/l10n"]');
    const langCount = langLinks.length;

    if (langCount === 0) {
      const dict = document.querySelector('script[type="application/l10n"]');
      if (!dict) {
        if (!this.useBrowserLocale) {
          console.error(
            // tslint:disable-next-line:quotemark
            "If you set the attribute 'useBrowserLocale' to false, you must provide the translations yourself in a script or link tag."
          );
          console.error('The easiest way to do this is to add them to the index.html.');
        }
      } else if (this.useBrowserLocale) {
        console.error(
          // tslint:disable-next-line:quotemark
          "Please set the attribute 'useBrowserLocale' to false if you provide the translations yourself in a script or link tag."
        );
      }
    } else if (this.useBrowserLocale) {
      const o = langLinks[0].attributes['origin'];
      if (o && o.value !== 'ngx-extended-pdf-viewer') {
        console.error(
          // tslint:disable-next-line:quotemark
          "Please set the attribute 'useBrowserLocale' to false if you provide the translations yourself in a script or link tag."
        );
      }
    }
    const callback = (e) => {
      document.removeEventListener('localized', callback);
      this.initTimeout = setTimeout(() => {
        if (!this.shuttingDown) {
          // hurried users sometimes reload the PDF before it has finished initializing
          this.calcViewerPositionTop();
          this.afterLibraryInit();
          this.openPDF();
          this.assignTabindexes();
        }
      }, this.delayFirstView);
    };

    window.addEventListener('afterprint', (event) => {
      this.afterPrint.emit();
    });

    window.addEventListener('beforeprint', (event) => {
      this.beforePrint.emit();
    });

    document.addEventListener('localized', callback);

    if (NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("You're trying to open two instances of the PDF viewer. Most likely, this will result in errors.");
    }
    const onLoaded = () => {
      this.overrideDefaultSettings();
      document.removeEventListener('webviewerloaded', onLoaded);
      if (this.enablePinchOnMobile) {
        this.pinchOnMobileSupport = new PinchOnMobileSupport(this.ngZone);
      }
    };
    document.addEventListener('webviewerloaded', onLoaded);

    this.activateTextlayerIfNecessary(null);

    setTimeout(() => {
      if (!this.shuttingDown) {
        // hurried users sometimes reload the PDF before it has finished initializing
        // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
        this.onResize();
        this.primaryMenuVisible = this.showToolbar;
        const hideSecondaryMenu = this.hideKebabMenuForSecondaryToolbar && !this.showSecondaryToolbarButton;

        if (hideSecondaryMenu) {
          if (!this.isPrimaryMenuVisible()) {
            this.primaryMenuVisible = false;
          }
        }
        this.dummyComponents.addMissingStandardWidgets();
        this.ngZone.runOutsideAngular(() => (<any>window).webViewerLoad());

        const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
        PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
        if (this.filenameForDownload) {
          PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
        }
        const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;

        PDFViewerApplicationOptions.set('enableDragAndDrop', this.enableDragAndDrop);
        let language = this.language === '' ? undefined : this.language;
        if (!language) {
          language = navigator.language;
        }
        PDFViewerApplicationOptions.set('locale', language);
        PDFViewerApplicationOptions.set('imageResourcesPath', this.imageResourcesPath);
        PDFViewerApplicationOptions.set('minZoom', this.minZoom);
        PDFViewerApplicationOptions.set('maxZoom', this.maxZoom);
        PDFViewerApplicationOptions.set('pageViewMode', this.pageViewMode);
        PDFViewerApplicationOptions.set('verbosity', this.logLevel);
        PDFViewerApplicationOptions.set('initialZoom', this.zoom);
        PDFViewerApplicationOptions.set('pdfBackgroundColor', this.pdfBackground);
        PDFViewerApplicationOptions.set('pdfBackgroundColorToReplace', this.pdfBackgroundColorToReplace);

        PDFViewerApplication.isViewerEmbedded = true;
        if (PDFViewerApplication.printKeyDownListener) {
          window.addEventListener('keydown', PDFViewerApplication.printKeyDownListener, true);
        }

        const pc = document.getElementById('printContainer');
        if (pc) {
          document.getElementsByTagName('body')[0].appendChild(pc);
        }
      }
    }, 0);
  }

  /** Notifies every widget that implements onLibraryInit() that the PDF viewer objects are available */
  private afterLibraryInit() {
    this.notificationService.onPDFJSInit.next();
  }

  public checkHeight(): void {
    if (typeof document !== 'undefined') {
      const container = document.getElementsByClassName('zoom')[0] as HTMLElement;
      if (container) {
        if (container.clientHeight === 0) {
          if (!this.autoHeight) {
            console.warn(
              "The height of the PDF viewer widget is zero pixels. Please check the height attribute. Is there a syntax error? Or are you using a percentage with a CSS framework that doesn't support this? The height is adjusted automatedly."
            );
            this.autoHeight = true;
          }
        }
        if (this.autoHeight) {
          const available = window.innerHeight;
          const rect = container.getBoundingClientRect();
          const top = rect.top;
          let maximumHeight = available - top;
          // take the margins and paddings of the parent containers into account
          const padding = this.calculateBorderMarging(container);
          maximumHeight -= padding;
          const factor = Number(this._height.replace('%', ''));
          maximumHeight = (maximumHeight * factor) / 100;
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

  private calculateBorderMarging(container: HTMLElement | null): number {
    if (container) {
      const computedStyle = window.getComputedStyle(container);

      const padding = UnitToPx.toPx(computedStyle.paddingBottom);
      const margin = UnitToPx.toPx(computedStyle.marginBottom);
      if (container.style.zIndex) {
        return padding + margin;
      }
      return padding + margin + this.calculateBorderMarging(container.parentElement);
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
    options.set('wheelAction', this.wheelAction);
    this.activateTextlayerIfNecessary(options);

    if (this.scrollMode || this.scrollMode === ScrollModeType.vertical) {
      options.set('scrollModeOnLoad', this.scrollMode);
    }

    const sidebarVisible = this.sidebarVisible;
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    if (sidebarVisible !== undefined) {
      PDFViewerApplication.sidebarViewOnLoad = sidebarVisible ? 1 : 0;
      if (PDFViewerApplication.appConfig) {
        PDFViewerApplication.appConfig.sidebarViewOnLoad = sidebarVisible ? 1 : 0;
      }
      options.set('sidebarViewOnLoad', this.sidebarVisible ? 1 : 0);
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
    NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized = true;
    if (this._src) {
      this.ngxExtendedPdfViewerIncompletelyInitialized = false;
      if (!this.listenToURL) {
        PDFViewerApplication.pdfLinkService.setHash = function () {};
      }
      this.initTimeout = null;
      this.selectCursorTool();

      PDFViewerApplication.eventBus.on('textlayerrendered', (x: TextLayerRenderedEvent) => {
        this.textLayerRendered.emit(x);
      });

      PDFViewerApplication.eventBus.on('scrollmodechanged', (x: ScrollModeChangedEvent) => {
        this.ngZone.run(() => this.scrollModeChange.emit(x.mode));
      });
      PDFViewerApplication.eventBus.on('progress', (x: ProgressBarEvent) => {
        this.progress.emit(x);
      });

      PDFViewerApplication.eventBus.on('pagesloaded', async (x: PagesLoadedEvent) => {
        this.pagesLoaded.emit(x);
        this.removeScrollbarInInititeScrollMode();
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
        await this.setZoom();
      });
      PDFViewerApplication.eventBus.on('pagerendered', (x: PageRenderedEvent) => {
        this.ngZone.run(() => {
          this.pageRendered.emit(x);
          this.removeScrollbarInInititeScrollMode();
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
        {
          const scale = (this.root.nativeElement as HTMLElement).querySelector('#scaleSelect') as HTMLSelectElement | undefined;
          let userZoomFactor = '';
          if (scale) {
            userZoomFactor = scale.value;
          }
        }

        setTimeout(() => {
          this.currentZoomFactor.emit(x.scale);
          this.cdr.markForCheck();
        })

        const scale = (this.root.nativeElement as HTMLElement).querySelector('#scaleSelect') as HTMLSelectElement | undefined;
        let userZoomFactor = this.zoom;
        if (scale) {
          userZoomFactor = scale.value;
        }
        if (userZoomFactor !== 'auto' && userZoomFactor !== 'page-fit' && userZoomFactor !== 'page-actual' && userZoomFactor !== 'page-width') {
          const before = this.zoom as number;
          const after = x.scale * 100;
          // ignore rounding differences
          if (Math.abs(before - after) > 0.000001) {
            this.zoom = after;
            this.zoomChange.emit(x.scale * 100);
          }
        } else if (this.zoom !== userZoomFactor) {
          // called when the user selects one of the text values of the zoom select dropdown
          this.zoomChange.emit(userZoomFactor);
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
          this.handToolChange.emit(x.tool === PdfCursorTools.HAND);
        });
      });

      PDFViewerApplication.eventBus.on('sidebarviewchanged', (x: SidebarviewChange) => {
        this.ngZone.run(() => {
          this.sidebarVisibleChange.emit(x.view > 0);
          if (this.sidebarComponent) {
            this.sidebarComponent.showToolbarWhenNecessary();
          }
        });
      });

      PDFViewerApplication.eventBus.on('documentloaded', (pdfLoadedEvent: PdfDocumentLoadedEvent) => {
        this.ngZone.run(() => {
          this.loadComplete(pdfLoadedEvent.source.pdfDocument);
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

      PDFViewerApplication.eventBus.on('updatefindcontrolstate', (x: FindResult) => {
        if (x.state === FindState.NOT_FOUND) {
          this.updateFindMatchesCount.emit({ current: 0, total: 0 });
        } else if (x.matchesCount.total) {
          x.matchesCount.matches = PDFViewerApplication.findController._pageMatches;
          x.matchesCount.matchesLength = PDFViewerApplication.findController._pageMatchesLength;
          x.matchesCount.matchesColor = PDFViewerApplication.findController._pageMatchesColor;
          this.updateFindMatchesCount.emit(x.matchesCount);
        }

        if (this.updateFindState) {
          this.updateFindState.emit(x.state);
        }
      });
      PDFViewerApplication.eventBus.on('updatefindmatchescount', (x: FindResult) => {
        x.matchesCount.matches = PDFViewerApplication.findController._pageMatches;
        x.matchesCount.matchesLength = PDFViewerApplication.findController._pageMatchesLength;
        x.matchesCount.matchesColor = PDFViewerApplication.findController._pageMatchesColor;
        this.updateFindMatchesCount.emit(x.matchesCount);
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

      setTimeout(async () => await this.checkHeight(), 100);
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
          if (options.httpHeaders) {
            if (!options.httpHeaders.Authorization) {
              options.httpHeaders.Authorization = this.authorization;
            }
          } else {
            options.httpHeaders = {
              Authorization: this.authorization,
            };
          }
        }
        options.baseHref = this.baseHref;
        PDFViewerApplication.onError = (error: Error) => this.pdfLoadingFailed.emit(error);
        this.ngZone.runOutsideAngular(async () => {
          await PDFViewerApplication.open(this._src, options);
          this.pdfLoadingStarts.emit({});
          // await this.setZoom();
          setTimeout(async () => await this.setZoom());
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

  private removeScrollbarInInititeScrollMode(): void {
    if (this.pageViewMode === 'infinite-scroll') {
      setTimeout(() => {
        if (this.pageViewMode === 'infinite-scroll') {
          const viewer = document.getElementById('viewer');
          if (viewer) {
            const height = viewer.clientHeight + 17;
            const zoom = document.getElementsByClassName('zoom')[0];
            if (this.primaryMenuVisible) {
              this.height = height + 35 + 'px';
            } else {
              if (height > 17) {
                this.height = height + 'px';
              }
            }
            if (zoom) {
              (<HTMLElement>zoom).style.height = this.height;
            }
          }
        }
      });
    }
  }

  public async openPDF2(): Promise<void> {
    this.overrideDefaultSettings();
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    // #802 clear the form data; otherwise the "download" dialogs opens
    PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();

    await PDFViewerApplication.close();
    this.formData = {};
    this.formIdToFieldName = {};
    this.formRadioButtonValueToId = {};

    const options: any = {
      password: this.password,
      verbosity: this.logLevel,
    };
    if (this._src && this._src['range']) {
      options.range = this._src['range'];
    }
    if (this.httpHeaders) {
      options.httpHeaders = this.httpHeaders;
    }
    if (this.authorization) {
      options.withCredentials = true;
      if (options.httpHeaders) {
        if (!options.httpHeaders.Authorization) {
          options.httpHeaders.Authorization = this.authorization;
        }
      } else {
        options.httpHeaders = {
          Authorization: this.authorization,
        };
      }
    }
    options.baseHref = this.baseHref;
    PDFViewerApplication.open(this._src, options).then(
      () => {
        this.pdfLoaded.emit({ pagesCount: PDFViewerApplication.pagesCount });
      },
      (error: Error) => this.pdfLoadingFailed.emit(error)
    );
  }

  private selectCursorTool() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool: this.handTool ? 1 : 0 });
  }

  public async ngOnDestroy(): Promise<void> {
    if (typeof window === 'undefined') {
      return; // fast escape for server side rendering
    }
    (window as any).getFormValue = undefined;
    (window as any).setFormValue = undefined;
    (window as any).registerAcroformAnnotations = undefined;
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    this.shuttingDown = true;

    NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized = false;
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
      this.initTimeout = undefined;
    }
    if (PDFViewerApplication) {
      if (this.pinchOnMobileSupport) {
        this.pinchOnMobileSupport.destroyPinchZoom();
        this.pinchOnMobileSupport = undefined;
      }

      // #802 clear the form data; otherwise the "download" dialogs opens
      PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();
      this.formData = {};
      this.formIdToFieldName = {};
      this.formRadioButtonValueToId = {};

      PDFViewerApplication._cleanup();

      await PDFViewerApplication.close();
      if (PDFViewerApplication.printKeyDownListener) {
        removeEventListener('keydown', PDFViewerApplication.printKeyDownListener, true);
      }
      setTimeout(() => {
        if (PDFViewerApplication._boundEvents) {
          PDFViewerApplication.unbindWindowEvents();
        }
        const bus = PDFViewerApplication.eventBus;
        if (bus) {
          PDFViewerApplication.unbindEvents();
          for (const key in bus._listeners) {
            if (bus._listeners[key]) {
              const list = bus._listeners[key];
              // not sure if the for loop is necessary - but
              // it might improve garbage collection if the "listeners"
              // array is stored somewhere else
              for (let i = 0; i < list.length; i++) {
                list[i] = undefined;
              }
              bus._listeners[key] = undefined;
            }
          }
        }
        (PDFViewerApplication.eventBus as any) = null;
      });
    }

    const body = document.getElementsByTagName('body');
    if (body[0]) {
      const topLevelElements = body[0].children;
      for (let i = topLevelElements.length - 1; i >= 0; i--) {
        const e = topLevelElements.item(i);
        if (e && e.id === 'printContainer') {
          body[0].removeChild(e);
        } else if (e && e.id === 'fileInput') {
          body[0].removeChild(e);
        }
      }
    }
  }

  private isPrimaryMenuVisible(): boolean {
    if (this.showToolbar) {
      const visible =
        this.showBookmarkButton ||
        this.showDownloadButton ||
        this.showFindButton ||
        this.showOpenFileButton ||
        this.showPagingButtons ||
        this.showPresentationModeButton ||
        this.showPrintButton ||
        this.showPropertiesButton ||
        this.showRotateButton ||
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

    if (NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
      if ('src' in changes || 'base64Src' in changes) {
        if (!!this._src) {
          if (this.ngxExtendedPdfViewerIncompletelyInitialized) {
            this.openPDF();
          } else {
            await this.openPDF2();
          }
        } else {
          // #802 clear the form data; otherwise the "download" dialogs opens
          PDFViewerApplication.pdfDocument?.annotationStorage?.resetModified();
          this.formData = {};
          this.formIdToFieldName = {};
          this.formRadioButtonValueToId = {};

          await PDFViewerApplication.close();
        }
      }
      if ('enableDragAndDrop' in changes) {
        PDFViewerApplicationOptions.set('enableDragAndDrop', this.enableDragAndDrop);
      }

      if ('zoom' in changes) {
        (async () => await this.setZoom())();
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
          PDFViewerApplication.pdfViewer.scrollMode = Number(this.scrollMode);
        }
      }
      if ('sidebarVisible' in changes) {
        if (this.sidebarVisible) {
          PDFViewerApplication.pdfSidebar.open();
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

      if ('enablePinchOnMobile' in changes) {
        if (!changes['enablePinchOnMobile'].isFirstChange()) {
          if (changes['enablePinchOnMobile'].currentValue !== changes['enablePinchOnMobile'].previousValue) {
            if (this.enablePinchOnMobile) {
              this.pinchOnMobileSupport = new PinchOnMobileSupport(this.ngZone);
            } else {
              if (this.pinchOnMobileSupport) {
                this.pinchOnMobileSupport.destroyPinchZoom();
                this.pinchOnMobileSupport = undefined;
              }
            }
          }
        }
      }

      if ('wheelAction' in changes) {
        PDFViewerApplicationOptions.set('wheelAction', this.wheelAction);
      }

      this.primaryMenuVisible = this.showToolbar;
      if (!this.showSecondaryToolbarButton || this.hideKebabMenuForSecondaryToolbar) {
        if (!this.isPrimaryMenuVisible()) {
          this.primaryMenuVisible = false;
        }
      }
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
      if (PDFViewerApplication && PDFViewerApplication.pdfDocument) {
        PDFViewerApplication.pdfDocument._transport.messageHandler.send('showUnverifiedSignatures', this.showUnverifiedSignatures);
      }
    }

    if ('formData' in changes) {
      if (!changes['formData'].isFirstChange()) {
        this.updateFormFields(this.formData, changes['formData'].previousValue);
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

    if ('pdfBackgroundColor' in changes && !changes['pdfBackgroundColor '].isFirstChange()) {
      PDFViewerApplicationOptions.set('pdfBackgroundColor', this.pdfBackground);
    }
    if ('pdfBackgroundColorToReplace' in changes && !changes['pdfBackgroundColorToReplace'].isFirstChange()) {
      PDFViewerApplicationOptions.set('pdfBackgroundColorToReplace', this.pdfBackgroundColorToReplace);
    }
  }

  private async setZoom() {
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
          for (const option of scaleDropdownField.options as any) {
            if (option.value === 'custom') {
              option.textContent = `${Math.round(Number(zoomAsNumber) * 100_000) / 1000}%`;
              continue;
            }
          }
        }
      }

      if (PDFViewerApplication.pdfViewer) {
        PDFViewerApplication.pdfViewer.currentScaleValue = zoomAsNumber || 'auto';
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
      const observer = new ResizeObserver(() => this.removeScrollbarInInititeScrollMode());
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

  public onSecondaryMenuIsEmpty(hideKebabButton: boolean) {
    this.hideKebabMenuForSecondaryToolbar = hideKebabButton;
    if (hideKebabButton) {
      if (!this.isPrimaryMenuVisible()) {
        this.primaryMenuVisible = false;
      }
    }
  }

  public registerAcroformAnnotations(sortedAnnotations: Array<Annotation>): void {
    let ids: { [key: string]: Annotation } = {};
    let duplicates: { [key: string]: Annotation } = {};
    for (let a of sortedAnnotations) {
      if (a.fieldName) {
        if (ids[a.fieldName]) {
          duplicates[a.fieldName] = a;
        }
        ids[a.fieldName] = a;
      }
    }
    for (let a of sortedAnnotations) {
      if (a.fieldName && duplicates[a.fieldName]) {
        this.formIdToFieldName[a.id] = a.fieldName;
      }
    }
  }

  public getFormValue(key: string): Object {
    if (this.formData[key] === undefined) {
      if (key.includes('/')) {
        key = key.split('/')[0];
      }
    }
    return { value: this.formData[key] };
  }

  public setFormValue(key: string, value: string): void {
    if (!this.formData) {
      this.formData = {};
    }

    if (this.formIdToFieldName[key]) {
      // radiobuttons
      this.formData[this.formIdToFieldName[key]] = value;
    } else {
      this.formData[key] = value;
    }
    this.ngZone.run(() => this.formDataChange.emit(this.formData));
  }

  public assignFormIdAndFieldName(key: string, fieldName: string | boolean, radioButtonField?: string): void {
    this.formIdToFieldName[key] = fieldName;
    if (radioButtonField) {
      this.formRadioButtonValueToId[radioButtonField] = key;
    }
  }

  public updateFormFields(formData: Object, previousFormData: Object) {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    if (!PDFViewerApplication || !PDFViewerApplication.pdfDocument || !PDFViewerApplication.pdfDocument.annotationStorage) {
      // ngOnChanges calls this method too early - so just ignore it
      return;
    }
    const storage = PDFViewerApplication.pdfDocument.annotationStorage;

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (formData[key] !== previousFormData[key]) {
          const field = document.querySelector("input[name='" + key + "']") as HTMLElement;
          if (field instanceof HTMLInputElement) {
            if (field.type === 'radio') {
              storage.setValue(field.id, key, { value: formData[key] === field.value, emitMessage: false });
              const fields = document.querySelectorAll("input[name='" + key + "']");
              const fieldIdToActivate = this.formRadioButtonValueToId[formData[key]];
              fields.forEach((field: HTMLInputElement) => {
                field.checked = field.id === fieldIdToActivate;
              });
            } else if (field.type === 'checkbox') {
              storage.setValue(field.id, key, { value: formData[key], emitMessage: false });
              field.checked = formData[key];
            } else {
              storage.setValue(field.id, key, { value: formData[key], emitMessage: false });
              field.value = formData[key];
            }
          } else if (!field) {
            const textarea = document.querySelector("textarea[name='" + key + "']") as HTMLTextAreaElement;
            if (textarea) {
              storage.setValue(textarea.id, key, { value: formData[key], emitMessage: false });
              textarea.value = formData[key];
            } else {
              const dropdown = document.querySelector("select[name='" + key + "']") as HTMLSelectElement | null;
              if (dropdown) {
                storage.setValue(dropdown.id, key, { value: formData[key], emitMessage: false });
                if (dropdown.multiple) {
                  const options = this.formData[key] as string[];
                  for (let i = 0; i < dropdown.options.length; i++) {
                    dropdown.options[i].selected = options.indexOf(dropdown.options[i].value) >= 0;
                  }
                } else {
                  dropdown.value = formData[key];
                }
              }
            }
          } else {
            const fieldName = this.formIdToFieldName[key];
          }
        }
      }
    }

    for (const key in previousFormData) {
      if (previousFormData.hasOwnProperty(key)) {
        if (!formData.hasOwnProperty(key)) {
          const field = document.querySelector("input[name='" + key + "']") as HTMLElement;
          if (field instanceof HTMLInputElement) {
            // this entry has been deleted
            if (field.type === 'checkbox') {
              storage.setValue(field.id, key, { value: false, emitMessage: false });
              field.checked = false;
            } else {
              storage.setValue(field.id, key, { value: undefined, emitMessage: false });
              field.value = '';
            }
          } else if (!field) {
            const textarea = document.querySelector("textarea[name='" + key + "']") as HTMLTextAreaElement;
            if (textarea) {
              storage.setValue(textarea.id, key, { value: undefined, emitMessage: false });
              textarea.value = '';
            }
          }
        }
      }
    }
  }

  public loadComplete(pdf: any /* PDFDocumentProxy */): void {
    /** This method has been inspired by https://medium.com/factory-mind/angular-pdf-forms-fa72b15c3fbd. Thanks, Jonny Fox! */
    this.hasSignature = false;

    this.buttonValues = {};

    for (let i = 1; i <= pdf.numPages; i++) {
      // track the current page
      pdf
        .getPage(i)
        .then((p) => {
          // get the annotations of the current page
          return p.getAnnotations();
        })
        .then((annotations) => {
          // ugly cast due to missing typescript definitions
          // please contribute to complete @types/pdfjs-dist

          annotations
            .filter((a) => a.subtype === 'Widget') // get the form field annotation only
            .forEach((a) => {
              // Additional PDF Form Field Types #567: Store the exportValue for the check boxes and buttonValue for radio buttons for quick reference
              if (a.checkBox) this.buttonValues[a.id] = a.exportValue;
              else if (a.radioButton) this.buttonValues[a.id] = a.buttonValue;

              if (a.fieldType === 'Sig') {
                this.ngZone.run(() => {
                  this.hasSignature = true;
                  setTimeout(() => {
                    const viewerContainer = document.querySelector('#viewerContainer') as HTMLElement;
                    viewerContainer.scrollBy(0, -32);
                  });
                });
              }
              /*
              // get the rectangle that represent the single field
              // and resize it according to the current DPI
              const fieldRect = currentPage.getViewport(dpiRatio).convertToViewportRectangle(a.rect);

              // add the corresponding input
              this.addInput(a, fieldRect);
              */
            });
        });
    }
    this.pdfLoaded.emit({ pagesCount: pdf.numPages } as PdfLoadedEvent);
  }

  public async zoomToPageWidth(event: MouseEvent): Promise<void> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const desiredCenterY = event.clientY;
    const previousScale = (PDFViewerApplication.pdfViewer as any).currentScale;
    if (this.zoom !== pdfDefaultOptions.doubleTapZoomFactor && this.zoom + '%' !== pdfDefaultOptions.doubleTapZoomFactor) {
      this.previousZoom = this.zoom;
      this.zoom = pdfDefaultOptions.doubleTapZoomFactor; // by default: 'page-width';
      await this.setZoom();
    } else {
      if (this.previousZoom) {
        this.zoom = this.previousZoom;
      } else {
        this.zoom = 'page-width';
      }
      await this.setZoom();
    }

    const currentScale = (PDFViewerApplication.pdfViewer as any).currentScale;
    const scaleCorrectionFactor = currentScale / previousScale - 1;
    const rect = (PDFViewerApplication.pdfViewer as any).container.getBoundingClientRect();
    const dy = desiredCenterY - rect.top;
    (PDFViewerApplication.pdfViewer as any).container.scrollTop += dy * scaleCorrectionFactor;
  }
}
