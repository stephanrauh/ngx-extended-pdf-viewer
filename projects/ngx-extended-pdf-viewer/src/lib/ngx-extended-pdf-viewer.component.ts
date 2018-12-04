import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

declare var PDFJS: any;

@Component({
  selector: 'ngx-extended-pdf-viewer',
  templateUrl: './ngx-extended-pdf-viewer.component.html',
  styleUrls: ['./viewer-with-images.css', './ngx-extended-pdf-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgxExtendedPdfViewerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private _src: string;

  private initialized = false;

  /**
   * Number of milliseconds to wait between initializing the PDF viewer and loading the PDF file.
   * Most users can let this parameter safely at it's default value of zero.
   * Set this to 1000 or higher if you run into timing problems (typically caused by loading the locale files
   * after the PDF files, so they are not available when the PDF viewer is initialized).
   */
  @Input()
  delayFirstView = 0;

  /** store the timeout id so it can be canceled if user leaves the page before the PDF is shown */
  private initTimeout: any;

  @Input()
  public set src(url: string) {
    this._src = url;
  }

  @Input()
  public height = '80vh';

  /**
   * If this flag is true, this components adds a link to the locale assets. The pdf viewer
   * sees this link and uses it to load the locale files automatically.
   * @param useBrowserLocale boolean
   */
  @Input()
  public useBrowserLocale = false;

  @Input()
  public backgroundColor = '#e8e8eb';

  @Input()
  public showSidebarButton = true;

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
  public showSelectToolButton = true;
  @Input()
  public showHandToolButton = true;
  @Input()
  public showScrollingButton = true;
  @Input()
  public showSpreadButton = true;
  @Input()
  public showPropertiesButton = true;

  /** Legal values: undefined, 'auto', 'page-actual', 'page_fit', 'page-width', or '50' (or any other percentage) */
  @Input()
  public zoom: string | undefined = undefined;

  @Output()
  public zoomChange = new EventEmitter();

  /** This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices */
  @Input() mobileZoom = '100%';

  private _top: string = undefined;

  public get top(): string {
    if (this._top) {
      return this._top;
    }
    if (this.mobileZoom) {
      if (this.mobileZoom.endsWith('%')) {
        const zoom = Number(this.mobileZoom.substring(0, this.mobileZoom.length - 1));
        return (0.32 * zoom).toString() + 'px';
      }
      if (this.mobileZoom.endsWith('px')) {
        return this.mobileZoom;
      }
    }
    return '32px';
  }

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
      (<any>window).webViewerLoad();

      (<any>window).PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
      (<any>window).PDFViewerApplication.isViewerEmbedded = true;
      (<any>window).PDFViewerApplication.overrideHistory = {};
      if (this.zoom !== undefined) {
        (<any>window).PDFViewerApplication.overrideHistory.zoom = this.zoom;
      }
      if (this.showSidebarButton) {
        if (this.showSidebarOnLoad !== undefined) {
          (<any>window).PDFViewerApplication.sidebarViewOnLoad = this.showSidebarOnLoad ? 1 : 0;
          (<any>window).PDFViewerApplication.appConfig.sidebarViewOnLoad = this.showSidebarOnLoad ? 1 : 0;
          (<any>window).PDFViewerApplication.overrideHistory.sidebarViewOnLoad = this.showSidebarOnLoad ? 1 : 0;
        }
      } else {
        (<any>window).PDFViewerApplication.sidebarViewOnLoad = 0;
        (<any>window).PDFViewerApplication.appConfig.sidebarViewOnLoad = 0;
        (<any>window).PDFViewerApplication.overrideHistory.sidebarViewOnLoad = 0;
      }

      const pc = document.getElementById('printContainer');
      if (pc) {
        document.getElementsByTagName('body')[0].appendChild(pc);
      }
    }, 0);
  }

  public ngAfterViewInit() {
    this.initTimeout = setTimeout(() => {
      this.initTimeout = null;
      // open a file in the viewer
      if (!!this._src) {
        (<any>window).PDFViewerApplication.open(this._src);
      }
    }, this.delayFirstView);

    this.initialized = true;
  }

  public ngOnDestroy(): void {
    if (this.initTimeout) {
      clearTimeout(this.initTimeout);
      this.initTimeout = undefined;
    }
    const app = (<any>window).PDFViewerApplication;
    if (app) {
      app.cleanup();
      app.close();
      if (app._boundEvents) {
        app.unbindWindowEvents();
      }
      const bus = app.eventBus as any;
      if (bus) {
        app.unbindEvents();
        for (const key in bus._listeners) {
          if (bus._listeners[key]) {
            bus._listeners[key] = undefined;
          }
        }
      }
      app.eventBus = null;
      //      app.PDFViewer = null;
    }
    //    (<any>window).PDFViewerApplication = null;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (this.initialized) {
      if ('src' in changes) {
        if (!!this._src) {
          (<any>window).PDFViewerApplication.open(this._src);
        }
      }
    }
  }
}
