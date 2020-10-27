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
} from '@angular/core';
import { PagesLoadedEvent } from './events/pages-loaded-event';
import { PageRenderedEvent } from './events/page-rendered-event';
import { PdfDownloadedEvent } from './events/pdf-downloaded-event';
import { PdfLoadedEvent } from './events/pdf-loaded-event';
import { pdfDefaultOptions } from './options/pdf-default-options';
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
import { ScrollModeType } from '../public_api';
import { ScrollModeChangedEvent } from './options/pdf-viewer';

declare const ServiceWorkerOptions: ServiceWorkerOptionsType; // defined in viewer.js

interface ElementAndPosition {
  element: HTMLElement;
  x: number;
  y: number;
}

export interface FormDataType {
  [fieldName: string]: string;
}

@Component({
  selector: 'ngx-extended-pdf-viewer',
  templateUrl: './ngx-extended-pdf-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxExtendedPdfViewerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  public static ngxExtendedPdfViewerInitialized = false;

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
  public customFindbarInputArea: TemplateRef<any>;

  @Input()
  public customToolbar: TemplateRef<any>;

  @Input()
  public customFindbar: TemplateRef<any>;

  @Input()
  public customFindbarButtons: TemplateRef<any> | undefined = undefined;

  @Input()
  public customSecondaryToolbar: TemplateRef<any>;

  @Input()
  public customSidebar: TemplateRef<any>;

  @Input()
  public customThumbnail: TemplateRef<any>;

  @Input()
  public customFreeFloatingBar: TemplateRef<any>;

  @Input()
  public formData: FormDataType = {};

  @Output()
  public formDataChange = new EventEmitter<FormDataType>();

  @Input()
  public pageViewMode: 'single' | 'book' | 'multiple' = 'multiple';

  @ViewChild('pdfSecondaryToolbarComponent')
  private secondaryToolbarComponent: PdfSecondaryToolbarComponent;

  @ViewChild('pdfsidebar')
  private sidebarComponent: PdfSidebarComponent;

  /* regular attributes */

  private _src: string | ArrayBuffer | { range: any };

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

  @Input()
  public set src(url: string | ArrayBuffer | Blob | Uint8Array | { range: any }) {
    if (url instanceof Uint8Array) {
      this._src = url.buffer;
    } else if (url instanceof Blob) {
      this._src = URL.createObjectURL(url);
    } else if (typeof url === 'string') {
      this._src = url;
      if (url.length > 980) {
        // minimal length of a base64 encoded PDF
        if (url.length % 4 === 0) {
          if (/^[a-zA-Z\d\/+]+={0,2}$/.test(url)) {
            console.error('The URL looks like a base64 encoded string. If so, please use the attribute base64 instead of src');
          }
        }
      }
    } else {
      this._src = url;
    }
  }

  @Input()
  public set base64Src(base64: string) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    this.src = bytes.buffer;
  }

  public minHeight: string | undefined = undefined;

  private _height = '100%';

  @Input()
  public set height(h: string) {
    this.minHeight = undefined;
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
  public backgroundColor = '#e8e8eb';

  /** Allows the user to define the name of the file after clicking "download" */
  @Input()
  public filenameForDownload = 'document.pdf';

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

  /** If [showSideBarButton]="true", do you want the sidebar to be shown by default ([showSidebarOnLoad])="true")
   * or not? By default, this flag is undefined, telling the PDF viewer to use the last setting used with this particular
   * document, or to hide the sidebar if the document is opened for the first time.
   * @deprecated Use showSidebar instead; dreprecated since 1.8.0; to be removed with 2.0.0
   */
  @Input()
  public showSidebarOnLoad: boolean | undefined = undefined;

  @Input()
  public sidebarVisible: boolean | undefined = undefined;

  @Output()
  public sidebarVisibleChange = new EventEmitter<boolean>();

  @Input()
  public showFindButton: boolean | undefined = undefined;
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
  public theme: 'dark' | 'light' | 'custom' = 'light';

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
  @Input()
  public showScrollingButton = true;
  @Input()
  public showSpreadButton = true;
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
  public pageRendered = new EventEmitter<PageRenderedEvent>();

  @Output()
  public pdfDownloaded = new EventEmitter<PdfDownloadedEvent>();

  @Output()
  public pdfLoaded = new EventEmitter<PdfLoadedEvent>();

  @Output()
  public pdfLoadingFailed = new EventEmitter<Error>();

  @Input()
  public textLayer: boolean | undefined = undefined;

  /** deprecated */
  @Output()
  public textlayerRendered = new EventEmitter<TextLayerRenderedEvent>();

  @Output()
  public textLayerRendered = new EventEmitter<TextLayerRenderedEvent>();

  @Output()
  public updateFindMatchesCount = new EventEmitter<FindResultMatchesCount>();

  @Output()
  public updateFindState = new EventEmitter<FindState>();

  /** Legal values: undefined, 'auto', 'page-actual', 'page_fit', 'page-width', or '50' (or any other percentage) */
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

  /** This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").
   */
  @Input() _mobileFriendlyZoom = '100%';

  public mobileFriendlyZoomScale = 1;

  public toolbarPaddingTop = '0px';

  public toolbarWidth = '100%';

  public toolbarWidthInPixels = 100;

  public secondaryToolbarTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarLeft: string | undefined = undefined;

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
    this.toolbarPaddingTop = (factor - 1) * 8 + 'px';
    if (this.showSidebarButton) {
      this.findbarLeft = (68 * factor).toString() + 'px';
    } else {
      this.findbarLeft = '0px';
    }
    this.secondaryToolbarTop = (36 + 36 * (factor - 1)).toString() + 'px';
    this.findbarTop = (36 + 52 * (factor - 1)).toString() + 'px';
  }

  /** Deprecated. Please use [mobileFriendlyZoom] instead.
   * This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").*/
  @Input()
  public set mobileZoom(mobileFriendlyZoom: string) {
    this.mobileFriendlyZoom = mobileFriendlyZoom;
  }

  private _top: string | undefined = undefined;

  private shuttingDown = false;

  public get sidebarPositionTop(): string {
    if (this._top) {
      return this._top;
    }
    if (this.mobileFriendlyZoom) {
      if (this.mobileFriendlyZoom.endsWith('%')) {
        const zoom = Number(this.mobileFriendlyZoom.substring(0, this.mobileFriendlyZoom.length - 1));
        return (2 + 0.29 * zoom).toString() + 'px';
      }
      if (this.mobileFriendlyZoom.endsWith('px')) {
        return this.mobileFriendlyZoom;
      }
      return (16 + 0.16 * Number(this.mobileFriendlyZoom)).toString() + 'px';
    }
    return '32px';
  }
  public calcViewerPositionTop(): void {
    if (this._top) {
      this.viewerPositionTop = this._top;
      return;
    }
    if (this.mobileFriendlyZoom) {
      if (this.mobileFriendlyZoom.endsWith('%')) {
        const zoom = Number(this.mobileFriendlyZoom.substring(0, this.mobileFriendlyZoom.length - 1));
        if (!this.isPrimaryMenuVisible()) {
          this.viewerPositionTop = '0';
        } else {
          this.viewerPositionTop = (1 + 0.32 * zoom).toString() + 'px';
        }
        return;
      }
      if (this.mobileFriendlyZoom.endsWith('px')) {
        this.viewerPositionTop = this.mobileFriendlyZoom;
        return;
      }
    }
    if (this.isPrimaryMenuVisible()) {
      this.viewerPositionTop = '32px';
    } else {
      this.viewerPositionTop = '0';
    }
  }

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId,
    private notificationService: PDFNotificationService,
    private location: Location
  ) {}

  private iOSVersionRequiresES5(): boolean {
    const match = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (match !== undefined && match !== null) {
      return parseInt(match[1], 10) < 13;
    }

    return false;
  }

  private loadViewer(): void {
    if (!window['pdfjs-dist/build/pdf']) {
      setTimeout(() => this.loadViewer(), 25);
    } else {
      const isIE = !!(<any>window).MSInputMethodContext && !!(<any>document).documentMode;
      const isEdge = /Edge\/\d./i.test(navigator.userAgent);
      const isIOs12OrBelow = this.iOSVersionRequiresES5();
      const needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';
      const suffix = this.minifiedJSLibraries ? '.min.js' : '.js';
      const script2 = document.createElement('script');
      const assets = pdfDefaultOptions.assetsFolder;
      if (needsES5) {
        console.log('Using the ES5 version of the PDF viewer.');
      }

      script2.src = this.location.normalize(isIE || isEdge || isIOs12OrBelow || needsES5 ? assets + '/viewer-es5' + suffix : assets + '/viewer' + suffix);
      script2.type = 'text/javascript';
      script2.async = true;
      document.getElementsByTagName('head')[0].appendChild(script2);
    }
  }

  ngOnInit() {
    this.onResize();
    if (isPlatformBrowser(this.platformId)) {
      if (!window['pdfjs-dist/build/pdf']) {
        const isIE = !!(<any>window).MSInputMethodContext && !!(<any>document).documentMode;
        const isEdge = /Edge\/\d./i.test(navigator.userAgent);
        const needsES5 = typeof ReadableStream === 'undefined' || typeof Promise['allSettled'] === 'undefined';
        const isIOs12OrBelow = this.iOSVersionRequiresES5();
        const suffix = this.minifiedJSLibraries ? '.min.js' : '.js';
        if (this.minifiedJSLibraries) {
          if (!pdfDefaultOptions.workerSrc().endsWith('.min.js')) {
            const src = pdfDefaultOptions.workerSrc();
            pdfDefaultOptions.workerSrc = () => src.replace('.js', '.min.js');
          }
        }

        const assets = pdfDefaultOptions.assetsFolder;
        const script = document.createElement('script');
        script.src = this.location.normalize(isIE || isEdge || isIOs12OrBelow || needsES5 ? assets + '/pdf-es5' + suffix : assets + '/pdf' + suffix);
        script.type = 'text/javascript';
        script.async = true;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
      if (!(window as any).webViewerLoad) {
        this.loadViewer();
      }
    }
  }

  ngAfterViewInit() {
    if (!this.shuttingDown) {
      // hurried users sometimes reload the PDF before it has finished initializing
      if ((window as any).webViewerLoad) {
        this.doInitPDFViewer();
      } else {
        setTimeout(() => this.ngAfterViewInit(), 50);
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
        this.primaryMenuVisible = true;
        const hideSecondaryMenu = this.hideKebabMenuForSecondaryToolbar && !this.showSecondaryToolbarButton;

        if (hideSecondaryMenu) {
          if (!this.isPrimaryMenuVisible()) {
            this.primaryMenuVisible = false;
          }
        }
        this.calcViewerPositionTop();
        this.dummyComponents.addMissingStandardWidgets();
        (<any>window).webViewerLoad();

        const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
        PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
        PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
        const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;

        PDFViewerApplicationOptions.set('locale', this.language);
        PDFViewerApplicationOptions.set('imageResourcesPath', this.imageResourcesPath);
        PDFViewerApplicationOptions.set('minZoom', this.minZoom);
        PDFViewerApplicationOptions.set('maxZoom', this.maxZoom);
        PDFViewerApplicationOptions.set('pageViewMode', this.pageViewMode);

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
    const container = document.getElementsByClassName('zoom')[0];
    if (container) {
      if (container.clientHeight === 0 && this._height.includes('%')) {
        const available = window.innerHeight;
        const rect = container.getBoundingClientRect();
        const top = rect.top;
        let mh = available - top;
        const factor = Number(this._height.replace('%', ''));
        mh = (mh * factor) / 100;
        if (mh > 100) {
          this.minHeight = mh + 'px';
        } else {
          this.minHeight = '100px';
        }
      }
    }
  }

  public onSpreadChange(newSpread: 'off' | 'even' | 'odd'): void {
    this.spreadChange.emit(newSpread);
  }

  private activateTextlayerIfNecessary(options: any): void {
    if (this.textLayer === undefined) {
      if (!this.handTool) {
        if (options) {
          options.set('textLayerMode', 1);
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
          options.set('textLayerMode', this.showHandToolButton ? 1 : 0);
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
        if (options) {
          options.set('textLayerMode', 1);
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

  private overrideDefaultSettings() {
    const options = (window as any).PDFViewerApplicationOptions as IPDFViewerApplicationOptions;
    // tslint:disable-next-line:forin
    for (const key in pdfDefaultOptions) {
      options.set(key, pdfDefaultOptions[key]);
    }
    options.set('disablePreferences', true);
    this.setZoom();

    options.set('ignoreKeyboard', this.ignoreKeyboard);
    options.set('ignoreKeys', this.ignoreKeys);
    options.set('acceptKeys', this.acceptKeys);
    this.activateTextlayerIfNecessary(options);

    if (this.scrollMode) {
      options.set('scrollModeOnLoad', this.scrollMode);
    }

    let sidebarVisible = this.sidebarVisible;
    if (sidebarVisible === undefined) {
      sidebarVisible = this.showSidebarOnLoad;
    }
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
    this.onResize();
    if (!this.listenToURL) {
      PDFViewerApplication.pdfLinkService.setHash = function () {};
    }
    this.initTimeout = null;
    this.selectCursorTool();

    PDFViewerApplication.eventBus.on('textlayerrendered', (x: TextLayerRenderedEvent) => {
      this.textlayerRendered.emit(x); // deprecated - kept to avoid a breaking change
      this.textLayerRendered.emit(x);
    });

    PDFViewerApplication.eventBus.on('scrollmodechanged', (x: ScrollModeChangedEvent) => {
      this.scrollModeChange.emit(x.mode);
    });

    PDFViewerApplication.eventBus.on('pagesloaded', (x: PagesLoadedEvent) => {
      this.pagesLoaded.emit(x);
      if (this.rotation) {
        const r = Number(this.rotation);
        if (r === 0 || r === 90 || r === 180 || r === 270) {
          PDFViewerApplication.pdfViewer.pagesRotation = r;
        }
      } else {
        PDFViewerApplication.pdfViewer.pagesRotation = 0;
      }
      setTimeout(() => {
        if (!this.shuttingDown) {
          // hurried users sometimes reload the PDF before it has finished initializing
          if (this.nameddest) {
            PDFViewerApplication.pdfLinkService.navigateTo(this.nameddest);
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
        this.fillFormFields(this.formData);
        this.addFormFieldListeners(this.formData);
      });
    });
    PDFViewerApplication.eventBus.on('download', (x: PdfDownloadedEvent) => {
      this.ngZone.run(() => {
        this.pdfDownloaded.emit(x);
      });
    });
    PDFViewerApplication.eventBus.on('scalechanging', (x: ScaleChangingEvent) => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.currentZoomFactor.emit(x.scale);
          const scale = (this.root.nativeElement as HTMLElement).querySelector('#scaleSelect') as HTMLSelectElement | undefined;
          let userZoomFactor = this.zoom;
          if (scale) {
            userZoomFactor = scale.value;
          }
          if (userZoomFactor !== 'auto' && userZoomFactor !== 'page-fit' && userZoomFactor !== 'page-actual' && userZoomFactor !== 'page-width') {
            this.zoomChange.emit(x.scale * 100);
          }
        });
      });
    });

    PDFViewerApplication.eventBus.on('rotationchanging', (x: PagesRotationEvent) => {
      this.ngZone.run(() => {
        this.rotationChange.emit(x.pagesRotation);
      });
    });
    PDFViewerApplication.eventBus.on('fileinputchange', (x: FileInputChanged) => {
      this.ngZone.run(() => {
        const path = x.fileInput.value.replace('C:\\fakepath\\', '');
        this.srcChange.emit(path);
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
      if (this.updateFindMatchesCount) {
        if (x.state === FindState.NOT_FOUND) {
          this.updateFindMatchesCount.emit({ current: 0, total: 0 });
        } else if (x.matchesCount.total) {
          this.updateFindMatchesCount.emit(x.matchesCount);
        }
      }

      if (this.updateFindState) {
        this.updateFindState.emit(x.state);
      }
    });
    PDFViewerApplication.eventBus.on('updatefindmatchescount', (x: FindResult) => {
      if (this.updateFindMatchesCount) {
        if (x.matchesCount.total) {
          this.updateFindMatchesCount.emit(x.matchesCount);
        }
      }
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

    this.checkHeight();
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
      PDFViewerApplication.onError = (error: Error) => this.pdfLoadingFailed.emit(error);
      PDFViewerApplication.open(this._src, options).then(() => {
        this.pdfLoaded.emit({ pagesCount: PDFViewerApplication.pagesCount });
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

  private selectCursorTool() {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool: this.handTool ? 1 : 0 });
  }

  public ngOnDestroy(): void {
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

      PDFViewerApplication.cleanup();
      PDFViewerApplication.close();
      if (PDFViewerApplication.printKeyDownListener) {
        removeEventListener('keydown', PDFViewerApplication.printKeyDownListener, true);
      }
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
    const visible =
      this.showBookmarkButton ||
      this.showDownloadButton ||
      this.showFindButton ||
      this.showOpenFileButton ||
      this.showPagingButtons ||
      this.showPresentationModeButton ||
      this.showPrintButton ||
      this.showPropertiesButton ||
      this.showSidebarButton ||
      this.showZoomButtons;

    if (visible) {
      return true;
    }
    return false;
  }

  public ngOnChanges(changes: SimpleChanges) {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;

    if (NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
      if ('src' in changes || 'base64Src' in changes) {
        if (!!this._src) {
          this.overrideDefaultSettings();
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
          PDFViewerApplication.open(this._src, options).then(
            () => {
              this.pdfLoaded.emit({ pagesCount: PDFViewerApplication.pagesCount });
            },
            (error: Error) => this.pdfLoadingFailed.emit(error)
          );
        }
      }
      if ('zoom' in changes) {
        this.setZoom();
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
        if (this.scrollMode) {
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
          PDFViewerApplication.pdfLinkService.navigateTo(this.nameddest);
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

      this.primaryMenuVisible = true;
      if (!this.showSecondaryToolbarButton || this.hideKebabMenuForSecondaryToolbar) {
        if (!this.isPrimaryMenuVisible()) {
          this.primaryMenuVisible = false;
        }
      }
      this.calcViewerPositionTop();
    }
    this.onResize();

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

    if ('formData' in changes) {
      const newFormData = this.addMissingFormFields(changes['formData'].currentValue);
      if (!this.equals(newFormData, changes['formData'].previousValue)) {
        this.fillFormFields(this.formData);
      }
    }

    if ('height' in changes) {
    }
  }

  private equals(object1: any, object2: any): boolean {
    if (!object1 || !object2) {
      return object1 === object2;
    }
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    for (const key of keys1) {
      if (object1.hasOwnProperty(key)) {
        if (object1[key] !== undefined && object2[key] !== undefined) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
      }
    }

    for (const key of keys2) {
      if (object2.hasOwnProperty(key)) {
        if (object1[key] !== undefined && object2[key] !== undefined) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
       }
    }

    return true;
  }

  private setZoom() {
    let zoomAsNumber = this.zoom;
    if (String(zoomAsNumber).endsWith('%')) {
      zoomAsNumber = Number(String(zoomAsNumber).replace('%', '')) / 100;
    } else if (!isNaN(Number(zoomAsNumber))) {
      zoomAsNumber = Number(zoomAsNumber) / 100;
    }
    if (!zoomAsNumber) {
      zoomAsNumber = 'auto';
    }
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    if (PDFViewerApplication) {
      const PDFViewerApplicationOptions: IPDFViewerApplicationOptions = (window as any).PDFViewerApplicationOptions;

      PDFViewerApplicationOptions.set('defaultZoomValue', zoomAsNumber);
    }
    if (PDFViewerApplication.pdfViewer) {
      PDFViewerApplication.pdfViewer.currentScaleValue = zoomAsNumber;
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
    }
  }

  @HostListener('contextmenu')
  public onContextMenu(): boolean {
    return this.contextMenuAllowed;
  }

  public onSecondaryMenuIsEmpty(hideKebabButton: boolean) {
    this.hideKebabMenuForSecondaryToolbar = hideKebabButton;
  }

  public fillFormFields(formData: FormDataType): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    if (!PDFViewerApplication || !PDFViewerApplication.pdfDocument || !PDFViewerApplication.pdfDocument.annotationStorage) {
      // ngOnChanges calls this method too early - so just ignore it
      return;
    }

    const annotations = PDFViewerApplication.pdfDocument.annotationStorage.getAll();
    for (const annotation in annotations) {
      if (annotation) {
        const container = document.querySelector('[data-annotation-id="' + annotation + '"]');
        if (container) {
          const field = container.querySelector('input');
          if (field) {
            const fieldName = field.name;
            const newValue = formData[fieldName];
            if (newValue === undefined) {
              if (field.type === 'checkbox') {
                this.formData[fieldName] = String(field.checked);
              } else {
                this.formData[fieldName] = field.value;
              }
            }
            if (newValue !== undefined) {
              PDFViewerApplication.pdfDocument.annotationStorage.setValue(annotation, newValue);
              if (field.type === 'checkbox') {
                const v = String(newValue) === 'true';
                field.checked = v;
              } else {
                field.value = newValue;
              }
            }
          }
          const select = container.querySelector('select');
          if (select) {
            const fieldName = select.name;
            const newValue = formData[fieldName];
            if (newValue === undefined) {
              this.formData[fieldName] = select.value;
            }
            if (newValue !== undefined) {
              PDFViewerApplication.pdfDocument.annotationStorage.setValue(annotation, newValue);
              select.value = newValue;
            }
          }
        }
      }
    }
  }

  public addFormFieldListeners(formData: FormDataType): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    const annotations = PDFViewerApplication.pdfDocument.annotationStorage.getAll();
    for (const annotation in annotations) {
      if (annotation) {
        const container = document.querySelector('[data-annotation-id="' + annotation + '"]');
        if (container) {
          const field = container.querySelector('input');
          if (field) {
            const fieldName = field.name;
            const newValue = formData[fieldName];
            if (newValue === undefined) {
              this.formData[fieldName] = field.value;
            }
            field.addEventListener('input', () => this.emitFormDataChange(fieldName, field));
          }
          const select = container.querySelector('select');
          if (select) {
            const fieldName = select.name;
            const newValue = formData[fieldName];
            if (newValue === undefined) {
              this.formData[fieldName] = select.value;
            }
            select.addEventListener('input', () => this.emitFormDataChange(fieldName, select));
          }
        }
      }
    }
  }

  public addMissingFormFields(formData: FormDataType): FormDataType {
    const result = { ...formData };
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    if (PDFViewerApplication && PDFViewerApplication.pdfDocument) {
      const annotations = PDFViewerApplication.pdfDocument.annotationStorage.getAll();
      for (const annotation in annotations) {
        if (annotation) {
          const container = document.querySelector('[data-annotation-id="' + annotation + '"]');
          if (container) {
            const field = container.querySelector('input');
            if (field) {
              const fieldName = field.name;
              const newValue = result[fieldName];
              if (newValue === undefined) {
                if (field.type === 'checkbox') {
                  result[fieldName] = String(field.checked);
                } else {
                  result[fieldName] = field.value;
                }
              }
            }
            const select = container.querySelector('select');
            if (select) {
              const fieldName = select.name;
              const newValue = result[fieldName];
              if (newValue === undefined) {
                result[fieldName] = select.value;
              }
            }
          }
        }
      }
    }
    return result;
  }

  private emitFormDataChange(fieldName: string, field: HTMLElement): void {
    let value = '';

    if (field instanceof HTMLSelectElement) {
      value = field.value;
    } else if (field instanceof HTMLInputElement) {
      if (field.type === 'checkbox') {
        value = String(field.checked);
      } else {
        value = field.value;
      }
    }
    this.ngZone.run(() => {
      if (this.formData[fieldName] !== undefined) {
        this.formData[fieldName] = value;
        this.formDataChange.emit(this.formData);
      }
    });
  }
}
