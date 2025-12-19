import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { PageViewModeType, ScrollModeType } from '../../options/pdf-viewer';
import { SpreadType } from '../../options/spread-type';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-toolbar',
    templateUrl: './pdf-toolbar.component.html',
    styleUrls: ['./pdf-toolbar.component.css'],
    standalone: false
})
export class PdfToolbarComponent implements AfterViewInit {
  @Input()
  public customToolbar: TemplateRef<any> | undefined;

  // This is set internally by the viewer after loading a document. If the document has a text layer, the viewer will set this to true.
  @Input()
  public hasTextLayer = false;

  @Input()
  public mobileFriendlyZoomScale = 1;

  @Input()
  public primaryMenuVisible = true;

  @Input()
  public showDownloadButton: ResponsiveVisibility = true;

  @Input()
  public showCommentEditor: ResponsiveVisibility = false;

  @Input()
  public showDrawEditor: ResponsiveVisibility = false;

  @Input()
  public showHighlightEditor: ResponsiveVisibility = true;

  @Input()
  public showTextEditor: ResponsiveVisibility = false;

  @Input()
  public showStampEditor: ResponsiveVisibility = false;

  @Input()
  public showFindButton: ResponsiveVisibility | undefined = undefined;

  @Input()
  public showHandToolButton: ResponsiveVisibility = true;

  @Input()
  public showZoomDropdown: ResponsiveVisibility = true;

  @Input()
  public handTool = false;

  @Input()
  public showOpenFileButton: ResponsiveVisibility = true;

  @Input()
  public showPrintButton: ResponsiveVisibility = true;

  @Input()
  public showPagingButtons: ResponsiveVisibility = true;

  @Input()
  public showFirstAndLastPageButtons: ResponsiveVisibility = true;

  @Input()
  public showMovePageButton: ResponsiveVisibility = true;

  @Input()
  public showPreviousAndNextPageButtons: ResponsiveVisibility = true;

  @Input()
  public showPageNumber: ResponsiveVisibility = true;

  @Input()
  public showPageLabel: ResponsiveVisibility = true;

  @Input()
  public showPresentationModeButton: ResponsiveVisibility = false;

  @Input()
  public showRotateCwButton: ResponsiveVisibility = true;

  @Input()
  public showRotateCcwButton: ResponsiveVisibility = true;

  @Input()
  public showSecondaryToolbarButton: ResponsiveVisibility = true;

  @Input()
  public showSidebarButton: ResponsiveVisibility = true;

  @Input()
  public showSignatureEditor: ResponsiveVisibility = false;

  @Input()
  public sidebarVisible: boolean | undefined = false;

  @Input()
  public showZoomButtons: ResponsiveVisibility = true;

  @Input()
  public textLayer: boolean | undefined = undefined;

  @Input()
  public toolbarMarginTop = '0px';

  @Input()
  public toolbarWidth = '100%';

  @Input()
  public zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

  @Input()
  public pageViewMode: PageViewModeType;

  @Output()
  public pageViewModeChange = new EventEmitter<PageViewModeType>();

  @Input()
  public spread: SpreadType;

  @Input()
  public scrollMode: ScrollModeType;

  @Input()
  public showPropertiesButton: ResponsiveVisibility = true;

  @Input()
  public showSpreadButton: ResponsiveVisibility = true;

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

  @Output()
  public onToolbarLoaded = new EventEmitter<HTMLElement>();

  @Input()
  public findbarVisible = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.onToolbarLoaded.emit(this.elementRef.nativeElement.getElementsByClassName('toolbar')[0] as HTMLElement);
  }

  public updatePageViewMode(pageViewMode: PageViewModeType): void {
    if (pageViewMode) {
      this.pageViewModeChange.emit(pageViewMode);
      this.pageViewMode = pageViewMode;
    }
  }
}
