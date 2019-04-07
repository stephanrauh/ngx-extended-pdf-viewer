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
  EventEmitter,
  ViewChild
} from '@angular/core';
import { PagesLoadedEvent } from './pages-loaded-event';

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

  private _height = '100%';

  @Input()
  public set height(h: string) {
    if (h) {
      this._height = h;
    } else {
      this.height = '100%';
    }
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

  public _showSidebarButton = true;

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
  public showSelectToolButton = true;
  @Input()
  public handTool = false;
  @Input()
  public showHandToolButton = true;
  @Input()
  public showScrollingButton = true;
  @Input()
  public showSpreadButton = true;
  @Input()
  public showPropertiesButton = true;

  @Input()
  public page: number | undefined = undefined;

  @Output()
  public pageChange = new EventEmitter<number | undefined>();

  @Output()
  public pagesLoaded = new EventEmitter<PagesLoadedEvent>();

  /** Legal values: undefined, 'auto', 'page-actual', 'page_fit', 'page-width', or '50' (or any other percentage) */
  @Input()
  public zoom: string | number | undefined = undefined;

  @Output()
  public zoomChange = new EventEmitter<string | number | undefined>();

  /** This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").
   */
  @Input() _mobileFriendlyZoom = '100%';

  public toolbarWidth = '100%';

  // dirty IE11 hack - temporary solution
  public findbarTop: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public findbarLeft: string | undefined = undefined;

  // dirty IE11 hack - temporary solution
  public secondaryToolbarRight: string | undefined = undefined;

  public get mobileFriendlyZoom() {
    return this._mobileFriendlyZoom;
  }
  /*
   * This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").*/
  @Input()
  public set mobileFriendlyZoom(zoom: string) {
    this._mobileFriendlyZoom = zoom;
    const isIE = /msie\s|trident\//i.test(window.navigator.userAgent);
    let factor = 1;
    if (isIE) {
      factor = Number((zoom || '100').replace('%', '')) / 100;
    }
    if (this.showSidebarButton) {
      this.findbarLeft = (68 * factor).toString() + 'px';
    } else {
      this.findbarLeft = '0px';
    }
    if (isIE) {
      // dirty, temporary hack
      this.toolbarWidth = (100 / factor).toString() + '%';
      this.findbarTop = (32 * factor).toString() + 'px';
      this.secondaryToolbarRight = (252 * (factor - 1)).toString() + 'px';
    }
  }

  /** Deprecated. Please use [mobileFriendlyZoom] instead.
   * This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").*/
  @Input()
  public set mobileZoom(mobileFriendlyZoom: string) {
    this.mobileFriendlyZoom = mobileFriendlyZoom;
  }

  @ViewChild('sizeSelector') sizeSelector;

  private _top: string | undefined = undefined;

  public get sidebarPositionTop(): string {
    if (this._top) {
      return this._top;
    }
    if (this.mobileFriendlyZoom) {
      if (this.mobileFriendlyZoom.endsWith('%')) {
        const zoom = Number(this.mobileFriendlyZoom.substring(0, this.mobileFriendlyZoom.length - 1));
        return (0.32 * zoom).toString() + 'px';
      }
      if (this.mobileFriendlyZoom.endsWith('px')) {
        return this.mobileFriendlyZoom;
      }
    }
    return '32px';
  }
  public get viewerPositionTop(): string {
    if (this._top) {
      return this._top;
    }
    if (this.mobileFriendlyZoom) {
      if (this.mobileFriendlyZoom.endsWith('%')) {
        const zoom = Number(this.mobileFriendlyZoom.substring(0, this.mobileFriendlyZoom.length - 1));
        return (1 + 0.32 * zoom).toString() + 'px';
      }
      if (this.mobileFriendlyZoom.endsWith('px')) {
        return this.mobileFriendlyZoom;
      }
    }
    return '32px';
  }

  constructor() {}

  public emitZoomChange(): void {
    const selectedIndex = this.sizeSelector.nativeElement.selectedIndex;
    if (selectedIndex) {
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
    setTimeout(() => {
      // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
      (<any>window).webViewerLoad();
      (<any>window).PDFViewerApplication.appConfig.defaultUrl = ''; // IE bugfix
      (<any>window).PDFViewerApplication.isViewerEmbedded = true;
      this.overrideDefaultSettings();

      const pc = document.getElementById('printContainer');
      if (pc) {
        document.getElementsByTagName('body')[0].appendChild(pc);
      }
    }, 0);
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

  private overrideDefaultSettings() {
    (<any>window).PDFViewerApplication.overrideHistory = {};
    if (this.zoom) {
      let z = this.zoom;
      if (typeof z !== 'number') {
        if (z.endsWith('%')) {
          z = z.replace('%', '');
        }
      }
      (<any>window).PDFViewerApplication.overrideHistory.zoom = z;
    }
    (<any>window).PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
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
  }

  public ngAfterViewInit() {
    this.initTimeout = setTimeout(() => {
      this.initTimeout = null;
      (<any>window).PDFViewerApplication.eventBus.on('pagesloaded', (x: PagesLoadedEvent) => {
        this.pagesLoaded.emit(x);
      });
      // open a file in the viewer
      if (!!this._src) {
        (<any>window).PDFViewerApplication.open(this._src);
      }

      setTimeout(() => {
        (<any>window).PDFViewerApplication.page = this.page;
      }, 100);
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
          this.overrideDefaultSettings();
          (<any>window).PDFViewerApplication.open(this._src);
        }
      }
      if ('zoom' in changes) {
        let zoomAsNumber = this.zoom;
        if (String(zoomAsNumber).endsWith('%')) {
          zoomAsNumber = Number(String(zoomAsNumber).replace('%', '')) / 100;
        } else if (!isNaN(Number(zoomAsNumber))) {
          zoomAsNumber = Number(zoomAsNumber) / 100;
        }
        (<any>window).PDFViewerApplication.pdfViewer.currentScaleValue = zoomAsNumber;
      }

      if ('handTool' in changes) {
        if (this.handTool) {
          const menu = document.getElementsByClassName('handTool');
          if (menu && menu[0]) {
            (menu[0] as HTMLButtonElement).click();
          }
        } else {
          const menu = document.getElementsByClassName('selectTool');
          if (menu && menu[0]) {
            (menu[0] as HTMLButtonElement).click();
          }
        }
      }
      if ('page' in changes) {
        if (this.page) {
          (<any>window).PDFViewerApplication.page = this.page;
        }
      }
      if ('filenameForDownload' in changes) {
        (<any>window).PDFViewerApplication.appConfig.filenameForDownload = this.filenameForDownload;
      }
    }
  }
}
