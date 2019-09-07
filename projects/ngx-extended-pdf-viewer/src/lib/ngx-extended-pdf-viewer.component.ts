import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
  HostListener,
  NgZone
} from '@angular/core';
import { PagesLoadedEvent } from './pages-loaded-event';
import { PageRenderedEvent } from './page-rendered-event';
import { PdfDownloadedEvent } from './pdf-downloaded-event';
import { PdfLoadedEvent } from './pdf-loaded-event';
import { defaultOptions } from './default-options';
import { ScaleChangingEvent } from './scale-changing-event';
import {
  resizeUpTo900px,
  resizeUpTo840px,
  resizeUpTo770px,
  resizeUpTo700px,
  resizeUpTo640px,
  resizeUpTo535px,
  removeDynamicCSS
} from './ResponsiveCSSSimulation';
import { PagesRotationEvent } from './pages-rotation-event';

@Component({
  selector: 'ngx-extended-pdf-viewer',
  templateUrl: './ngx-extended-pdf-viewer.component.html',
  styleUrls: ['./viewer-with-images-2.2.css', './ngx-extended-pdf-viewer.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxExtendedPdfViewerComponent implements OnInit, OnChanges, OnDestroy {
  public static ngxExtendedPdfViewerInitialized = false;

  private _src: string | ArrayBuffer;

  private resizeTimeout: any = null;

  @Input()
  public contextMenuAllowed = true;

  @Output()
  public afterPrint = new EventEmitter<void>();

  @Output()
  public beforePrint = new EventEmitter<void>();

  @Output()
  public currentZoomFactor = new EventEmitter<number>();

  /**
   * Number of milliseconds to wait between initializing the PDF viewer and loading the PDF file.
   * Most users can let this parameter safely at it's default value of zero.
   * Set this to 1000 or higher if you run into timing problems (typically caused by loading the locale files
   * after the PDF files, so they are not available when the PDF viewer is initialized).
   */
  @Input()
  public delayFirstView = 0;

  @Input()
  public ignoreResponsiveCSS: boolean | undefined = undefined;

  /** store the timeout id so it can be canceled if user leaves the page before the PDF is shown */
  private initTimeout: any;

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
  public set src(url: string | ArrayBuffer | Uint8Array) {
    if (url instanceof Uint8Array) {
      this._src = (<Uint8Array>url).buffer;
    } else if (url instanceof Blob) {
      this._src = URL.createObjectURL(url);
    } else if (typeof url === 'string') {
      this._src = url;
      if (url.length > 980) {
        // minimal length of a base64 encoded PDF
        if (url.length % 4 === 0) {
          if (/^[a-zA-Z\d\/+]+={0,2}$/.test(url)) {
            console.warn('The URL looks like a base64 encoded string. If so, please use the attribute base64 instead of src');
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

  /** Allows the user to put the viewer's svg images into an arbitrary folder */
  @Input()
  public imageResourcesPath = './assets/images/';

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
   */
  @Input()
  public showSidebarOnLoad: boolean | undefined = undefined;

  @Input()
  public showFindButton = true;
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
  public showSecondaryToolbarButton = true;
  @Input()
  public showRotateButton = true;
  @Input()
  public handTool = true;
  @Input()
  public showHandToolButton = false;
  @Input()
  public showScrollingButton = true;
  @Input()
  public showSpreadButton = true;
  @Input()
  public showPropertiesButton = true;

  @Input()
  public spread: 'off' | 'even' | 'odd';

  @Output()
  public spreadChange = new EventEmitter<'off' | 'even' | 'odd'>();

  @Input()
  public page: number | undefined = undefined;

  @Output()
  public pageChange = new EventEmitter<number | undefined>();

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

  /** Legal values: undefined, 'auto', 'page-actual', 'page_fit', 'page-width', or '50' (or any other percentage) */
  @Input()
  public zoom: string | number | undefined = undefined;

  @Output()
  public zoomChange = new EventEmitter<string | number | undefined>();

  /** This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").
   */
  @Input() _mobileFriendlyZoom = '100%';

  public mobileFriendlyZoomScale = 1;

  public toolbarWidth = '100%';

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
    } else if (zoom == 'false') {
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
    if (this.showSidebarButton) {
      this.findbarLeft = (68 * factor).toString() + 'px';
    } else {
      this.findbarLeft = '0px';
    }
    this.secondaryToolbarTop = (12 + 24 * factor).toString() + 'px';
    this.findbarTop = (-6 + 42 * factor).toString() + 'px';
  }

  /** Deprecated. Please use [mobileFriendlyZoom] instead.
   * This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").*/
  @Input()
  public set mobileZoom(mobileFriendlyZoom: string) {
    this.mobileFriendlyZoom = mobileFriendlyZoom;
  }

  @ViewChild('sizeSelector') sizeSelector: any;

  private _top: string | undefined = undefined;

  public get sidebarPositionTop(): string {
    if (this._top) {
      return this._top;
    }
    if (this.mobileFriendlyZoom) {
      if (this.mobileFriendlyZoom.endsWith('%')) {
        const zoom = Number(this.mobileFriendlyZoom.substring(0, this.mobileFriendlyZoom.length - 1));
        return (16 + 0.16 * zoom).toString() + 'px';
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

  constructor(private ngZone: NgZone) {}

  public emitZoomChange(): void {
    const selectedIndex = this.sizeSelector.nativeElement.selectedIndex;
    if (selectedIndex || selectedIndex === 0) {
      const s = this.sizeSelector.nativeElement.options[selectedIndex] as HTMLOptionElement;
      let value: number | string = s.label;

      if (value.endsWith('%')) {
        value = Number(value.replace('%', ''));
      } else {
        value = s.value;
      }
      this.zoomChange.emit(value);
    }
  }

  public emitZoomChangeAfterDelay(): void {
    setTimeout(() => {
      this.emitZoomChange();
    }, 10);
  }

  ngOnInit() {
    if (this.ignoreResponsiveCSS === undefined) {
      const pdfViewer = document.getElementsByClassName('html');
      if (pdfViewer && pdfViewer.length > 0) {
        const toolbar = pdfViewer[0].getElementsByClassName('toolbar');
        if (toolbar && toolbar.length > 0) {
          const width = toolbar[0].clientWidth;
          if (window.innerWidth - width > 50) {
            this.ignoreResponsiveCSS = true;
          } else {
            this.ignoreResponsiveCSS = false;
          }
        }
      }
    }
    const langLinks = document.querySelectorAll('link[type="application/l10n"]');
    const langCount = langLinks.length;

    if (langCount === 0) {
      const dict = document.querySelector('script[type="application/l10n"]');
      if (!dict) {
        if (!this.useBrowserLocale) {
          console.error(
            "If you set the attribute 'useBrowserLocale' to false, you must provide the translations yourself in a script or link tag."
          );
          console.error('The easiest way to do this is to add them to the index.html.');
        }
      } else if (this.useBrowserLocale) {
        console.error(
          "Please set the attribute 'useBrowserLocale' to false if you provide the translations yourself in a script or link tag."
        );
      }
    } else if (this.useBrowserLocale) {
      const o = langLinks[0].attributes['origin'];
      if (o && o.value !== 'ngx-extended-pdf-viewer') {
        console.error(
          "Please set the attribute 'useBrowserLocale' to false if you provide the translations yourself in a script or link tag."
        );
      }
    }
    const callback = e => {
      document.removeEventListener('localized', callback);
      this.initTimeout = setTimeout(() => {
        this.openPDF();
      }, this.delayFirstView);
    };

    window.addEventListener('afterprint', event => {
      this.afterPrint.emit();
    });

    window.addEventListener('beforeprint', event => {
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
    };
    document.addEventListener('webviewerloaded', onLoaded);

    setTimeout(() => {
      // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
      this.primaryMenuVisible = true;
      if (!this.isSecondaryMenuVisible()) {
        this.showSecondaryToolbarButton = false;
      }
      if (!this.showSecondaryToolbarButton) {
        if (!this.isPrimaryMenuVisible()) {
          this.primaryMenuVisible = false;
        }
      }
      this.calcViewerPositionTop();
      (<any>window).webViewerLoad();
      (<any>window).PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
      (<any>window).PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
      (<any>window).PDFViewerApplicationOptions.set('locale', this.language);
      (<any>window).PDFViewerApplicationOptions.set('imageResourcesPath', this.imageResourcesPath);

      (<any>window).PDFViewerApplication.isViewerEmbedded = true;
      window.addEventListener('keydown', (<any>window).PDFViewerApplication.printKeyDownListener, true);

      const pc = document.getElementById('printContainer');
      if (pc) {
        document.getElementsByTagName('body')[0].appendChild(pc);
      }
    }, 0);
  }

  public checkHeight(): void {
    const container = document.getElementsByClassName('zoom')[0];
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

  public onPageChange(): void {
    setTimeout(() => {
      const inputField = document.getElementById('pageNumber') as HTMLInputElement;
      let page: number | undefined = Number(inputField.value);
      if (isNaN(page)) {
        page = undefined;
      }
      this.pageChange.emit(page);
    });
  }

  public onSpreadChange(newSpread: 'off' | 'even' | 'odd'): void {
    this.spreadChange.emit(newSpread);
  }

  private overrideDefaultSettings() {
    const options = (<any>window).PDFViewerApplicationOptions;
    // tslint:disable-next-line:forin
    for (const key in defaultOptions) {
      options.set(key, defaultOptions[key]);
    }
    options.set('disablePreferences', true);
    this.setZoom();

    if (!this.handTool) {
      options.set('textLayerMode', 1);
    } else {
      options.set('textLayerMode', this.showHandToolButton ? 1 : 0);
    }

    if (this.showSidebarButton) {
      if (this.showSidebarOnLoad !== undefined) {
        (<any>window).PDFViewerApplication.sidebarViewOnLoad = this.showSidebarOnLoad ? 1 : 0;
        if ((<any>window).PDFViewerApplication.appConfig) {
          (<any>window).PDFViewerApplication.appConfig.sidebarViewOnLoad = this.showSidebarOnLoad ? 1 : 0;
        }
        options.set('sidebarViewOnLoad', this.showSidebarOnLoad ? 1 : 0);
      }
    } else {
      (<any>window).PDFViewerApplication.sidebarViewOnLoad = 0;
      options.set('sidebarViewOnLoad', 0);
      if ((<any>window).PDFViewerApplication.appConfig) {
        (<any>window).PDFViewerApplication.appConfig.sidebarViewOnLoad = 0;
      }
    }

    if (this.spread === 'even') {
      options.set('spreadModeOnLoad', 2);
      if ((<any>window).PDFViewerApplication.pdfViewer) {
        (<any>window).PDFViewerApplication.pdfViewer.spreadMode = 2;
      }
      this.onSpreadChange('even');
    } else if (this.spread === 'odd') {
      options.set('spreadModeOnLoad', 1);
      if ((<any>window).PDFViewerApplication.pdfViewer) {
        (<any>window).PDFViewerApplication.pdfViewer.spreadMode = 1;
      }
      this.onSpreadChange('odd');
    } else {
      options.set('spreadModeOnLoad', 0);
      if ((<any>window).PDFViewerApplication.pdfViewer) {
        (<any>window).PDFViewerApplication.pdfViewer.spreadMode = 0;
      }
      this.onSpreadChange('off');
    }
    if (this.printResolution) {
      options.set('printResolution', this.printResolution);
    }
  }

  private openPDF() {
    NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized = true;
    this.onResize();
    if (!this.listenToURL) {
      (<any>window).PDFViewerApplication.pdfLinkService.setHash = function() {};
    }
    this.initTimeout = null;
    this.selectCursorTool();
    (<any>window).PDFViewerApplication.eventBus.on('pagesloaded', (x: PagesLoadedEvent) => {
      this.pagesLoaded.emit(x);
      (<any>window).PDFViewerApplication.pdfViewer.pagesRotation = this.rotation;
      setTimeout(() => {
        if (this.nameddest) {
          (<any>window).PDFViewerApplication.pdfLinkService.navigateTo(this.nameddest);
        } else if (this.page) {
          (<any>window).PDFViewerApplication.page = this.page;
        }
      });
      this.setZoom();
    });
    (<any>window).PDFViewerApplication.eventBus.on('pagerendered', (x: PageRenderedEvent) => {
      this.ngZone.run(() => {
        this.pageRendered.emit(x);
      });
    });
    (<any>window).PDFViewerApplication.eventBus.on('download', (x: PdfDownloadedEvent) => {
      this.ngZone.run(() => {
        this.pdfDownloaded.emit(x);
      });
    });
    (<any>window).PDFViewerApplication.eventBus.on('scalechanging', (x: ScaleChangingEvent) => {
      this.ngZone.run(() => {
        this.currentZoomFactor.emit(x.scale);
      });
    });

    (<any>window).PDFViewerApplication.eventBus.on('rotationchanging', (x: PagesRotationEvent) => {
      this.ngZone.run(() => {
        this.rotationChange.emit(x.pagesRotation);
      });
    });

    this.checkHeight();
    // open a file in the viewer
    if (!!this._src) {
      const options = {
        password: this.password
      };
      (<any>window).PDFViewerApplication.open(this._src, options).then(
        () => this.pdfLoaded.emit({ pagesCount: (<any>window).PDFViewerApplication.pagesCount }),
        (error: Error) => this.pdfLoadingFailed.emit(error)
      );
    }
    setTimeout(() => {
      if (this.page) {
        (<any>window).PDFViewerApplication.page = this.page;
      }
    }, 100);
  }

  private selectCursorTool() {
    (<any>window).PDFViewerApplication.eventBus.dispatch('switchcursortool', { tool: this.handTool ? 1 : 0 });
  }

  public ngOnDestroy(): void {
    NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized = false;
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
      this.initTimeout = undefined;
    }
    const app = (<any>window).PDFViewerApplication;
    if (app) {
      app.cleanup();
      app.close();
      if ((<any>window).PDFViewerApplication.printKeyDownListener) {
        (<any>window).removeEventListener('keydown', (<any>window).PDFViewerApplication.printKeyDownListener, true);
      }
      if (app._boundEvents) {
        app.unbindWindowEvents();
      }
      const bus = app.eventBus as any;
      if (bus) {
        app.unbindEvents();
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
      app.eventBus = null;
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

  private isSecondaryMenuVisible(): boolean {
    const visible =
      this.showHandToolButton ||
      this.showPagingButtons ||
      this.showPropertiesButton ||
      this.showRotateButton ||
      this.showScrollingButton ||
      this.showRotateButton ||
      this.showSpreadButton;
    if (visible) {
      return true;
    }
    return false;
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
      this.showSecondaryToolbarButton ||
      this.showZoomButtons;

    if (visible) {
      return true;
    }
    return false;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
      if ('src' in changes || 'base64Src' in changes) {
        if (!!this._src) {
          this.overrideDefaultSettings();
          (<any>window).PDFViewerApplication.open(this._src).then(
            () => this.pdfLoaded.emit({ pagesCount: (<any>window).PDFViewerApplication.pagesCount }),
            (error: Error) => this.pdfLoadingFailed.emit(error)
          );
        }
      }
      if ('zoom' in changes) {
        this.setZoom();
      }

      if ('handTool' in changes) {
        this.selectCursorTool();
      }
      if ('page' in changes) {
        if (this.page) {
          (<any>window).PDFViewerApplication.page = this.page;
        }
      }

      if ('rotation' in changes) {
        if (this.rotation) {
          const r = Number(this.rotation);
          if (r === 90 || r === 180 || r === 270) {
            (<any>window).PDFViewerApplication.pdfViewer.pagesRotation = r;
          }
        } else {
          (<any>window).PDFViewerApplication.pdfViewer.pagesRotation = 0;
        }
      }
      if ('filenameForDownload' in changes) {
        (<any>window).PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
      }
      if ('nameddest' in changes) {
        if (this.nameddest) {
          (<any>window).PDFViewerApplication.pdfLinkService.navigateTo(this.nameddest);
        }
      }

      if ('spread' in changes) {
        if (this.spread === 'even') {
          (<any>window).PDFViewerApplication.spreadModeOnLoad = 2;
          (<any>window).PDFViewerApplication.pdfViewer.spreadMode = 2;
          this.onSpreadChange('even');
        } else if (this.spread === 'odd') {
          (<any>window).PDFViewerApplication.spreadModeOnLoad = 1;
          (<any>window).PDFViewerApplication.pdfViewer.spreadMode = 1;
          this.onSpreadChange('odd');
        } else {
          (<any>window).PDFViewerApplication.spreadModeOnLoad = 0;
          (<any>window).PDFViewerApplication.pdfViewer.spreadMode = 0;
          this.onSpreadChange('off');
        }
      }

      this.primaryMenuVisible = true;
      if (!this.isSecondaryMenuVisible()) {
        this.showSecondaryToolbarButton = false;
      }
      if (!this.showSecondaryToolbarButton) {
        if (!this.isPrimaryMenuVisible()) {
          this.primaryMenuVisible = false;
        }
      }
      this.calcViewerPositionTop();
    }
    if ('ignoreResponsiveCSS' in changes) {
      if (this.ignoreResponsiveCSS) {
        this.onResize();
      } else {
        removeDynamicCSS();
      }
    }
    if ('printResolution' in changes) {
      const options = (<any>window).PDFViewerApplicationOptions;
      options.set('printResolution', this.printResolution);
    }
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
    if ((<any>window).PDFViewerApplication) {
      (<any>window).PDFViewerApplicationOptions.set('defaultZoomValue', zoomAsNumber);
    }
    if ((<any>window).PDFViewerApplication.pdfViewer) {
      (<any>window).PDFViewerApplication.pdfViewer.currentScaleValue = zoomAsNumber;
    }
  }

  public onResize(): void {
    if (this.ignoreResponsiveCSS) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.doResize, 100);
    }
  }

  private doResize(): void {
    const pdfViewer = document.getElementsByClassName('html');
    if (pdfViewer && pdfViewer.length > 0) {
      const container = document.getElementById('outerContainer');
      if (container) {
        const width = container.clientWidth;
        resizeUpTo900px(width);
        resizeUpTo840px(width);
        resizeUpTo770px(container, width);
        resizeUpTo700px(container, width);
        resizeUpTo640px(container, width);
        resizeUpTo535px(width);
      }
    }
  }

  @HostListener('contextmenu')
  public onContextMenu(): boolean {
    return this.contextMenuAllowed;
  }
}
