import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  TemplateRef,
  ViewChild,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PagesLoadedEvent } from './events/pages-loaded-event';
import { PageRenderedEvent } from './events/page-rendered-event';
import { PdfDownloadedEvent } from './events/pdf-downloaded-event';
import { PdfLoadedEvent } from './events/pdf-loaded-event';
import { pdfDefaultOptions } from './options/pdf-default-options';
import { VerbosityLevel } from './options/verbosity-level';
import { FindState, FindResultMatchesCount } from './events/find-result';
import { PdfDummyComponentsComponent } from './pdf-dummy-components/pdf-dummy-components.component';
import { AfterViewInit, ElementRef } from '@angular/core';
import { PdfSecondaryToolbarComponent } from './secondary-toolbar/pdf-secondary-toolbar/pdf-secondary-toolbar.component';
import { TextLayerRenderedEvent } from './events/textlayer-rendered';
import { PdfThumbnailDrawnEvent } from './events/pdf-thumbnail-drawn-event';
import { PdfSidebarComponent } from './sidebar/pdf-sidebar/pdf-sidebar.component';
import { ScrollModeType } from './options/pdf-viewer';
import { ProgressBarEvent } from './events/progress-bar-event';
import { FormDataType } from './ngx-extended-pdf-viewer.component';

@Component({
  selector: 'ngx-extended-pdf-viewer',
  templateUrl: './ngx-extended-pdf-viewer-server.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxExtendedPdfViewerServerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
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
  public pageViewMode: 'single' | 'book' | 'multiple' | 'infinite-scroll' = 'multiple';

  @Output()
  public progress = new EventEmitter<ProgressBarEvent>();

  @ViewChild('pdfSecondaryToolbarComponent')
  private secondaryToolbarComponent: PdfSecondaryToolbarComponent;

  @ViewChild('pdfsidebar')
  private sidebarComponent: PdfSidebarComponent;

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

  public hasSignature: boolean;

  @Input()
  public set src(url: string | ArrayBuffer | Blob | Uint8Array | { range: any }) {}

  @Input()
  public set base64Src(base64: string) {}

  @Input()
  public set height(h: string) {}

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
  public pdfBackgroundColor = '#FFF';

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

  /** pdf.js can show signatures, but fails to verify them. So they are switched off by default.
   * Set "[showUnverifiedSignatures]"="true" to display e-signatures nonetheless.
   */
  @Input()
  public showUnverifiedSignatures = false;

  @Input()
  public startTabindex: number | undefined;

  public get showSidebarButton() {
    return true;
  }
  @Input()
  public set showSidebarButton(show: boolean) {}

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
  public theme: 'dark' | 'light' | 'custom' = 'light';

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
  public set page(p: number | undefined) {}

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

  /** This attributes allows you to increase the size of the UI elements so you can use them on small mobile devices.
   * This attribute is a string with a percent character at the end (e.g. "150%").
   */
  @Input() _mobileFriendlyZoom = '100%';

  public mobileFriendlyZoomScale = 1;

  public toolbarMarginTop = '0px';

  public toolbarWidth = '100%';

  public toolbarWidthInPixels = 100;

  public secondaryToolbarTop: string | undefined = undefined;

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
  public set mobileFriendlyZoom(zoom: string) {}

  private shuttingDown = false;

  public get sidebarPositionTop(): string {
    return '32px';
  }

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}

  ngAfterViewInit() {}

  public ngOnDestroy(): void {}

  @HostListener('contextmenu')
  public onContextMenu(): boolean {
    return this.contextMenuAllowed;
  }
}
