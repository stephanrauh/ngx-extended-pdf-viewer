import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

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
   * or not? By default, this flag is true.
   */
  @Input()
  public showSidebarOnLoad = true;

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

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
      (<any>window).webViewerLoad();

      (<any>window).PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
      (<any>window).PDFViewerApplication.isViewerEmbedded = true;
      if (this.showSidebarButton) {
        (<any>window).PDFViewerApplication.sidebarViewOnLoad = this.showSidebarOnLoad ? 1 : 0;
        (<any>window).PDFViewerApplication.appConfig.sidebarViewOnLoad = this.showSidebarOnLoad ? 1 : 0;
      } else {
        (<any>window).PDFViewerApplication.sidebarViewOnLoad = 0;
        (<any>window).PDFViewerApplication.appConfig.sidebarViewOnLoad = 0;
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
    }
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
