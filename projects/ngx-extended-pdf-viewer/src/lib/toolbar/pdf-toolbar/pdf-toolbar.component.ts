import { AfterViewInit, Component, ElementRef, input, model, output, TemplateRef } from '@angular/core';
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
  public customToolbar = input<TemplateRef<any> | undefined>(undefined);

  // This is set internally by the viewer after loading a document. If the document has a text layer, the viewer will set this to true.
  public hasTextLayer = input<boolean>(false);

  public mobileFriendlyZoomScale = input<number>(1);

  public primaryMenuVisible = input<boolean>(true);

  public showDownloadButton = input<ResponsiveVisibility>(true);

  public showCommentEditor = input<ResponsiveVisibility>(false);

  public showDrawEditor = input<ResponsiveVisibility>(false);

  public showHighlightEditor = input<ResponsiveVisibility>(true);

  public showTextEditor = input<ResponsiveVisibility>(false);

  public showStampEditor = input<ResponsiveVisibility>(false);

  public showFindButton = input<ResponsiveVisibility | undefined>(undefined);

  public showHandToolButton = input<ResponsiveVisibility>(true);

  public showZoomDropdown = input<ResponsiveVisibility>(true);

  public handTool = input<boolean>(false);

  public showOpenFileButton = input<ResponsiveVisibility>(true);

  public showPrintButton = input<ResponsiveVisibility>(true);

  public showPagingButtons = input<ResponsiveVisibility>(true);

  public showFirstAndLastPageButtons = input<ResponsiveVisibility>(true);

  public showMovePageButton = input<ResponsiveVisibility>(true);

  public showPreviousAndNextPageButtons = input<ResponsiveVisibility>(true);

  public showPageNumber = input<ResponsiveVisibility>(true);

  public showPageLabel = input<ResponsiveVisibility>(true);

  public showPresentationModeButton = input<ResponsiveVisibility>(false);

  public showRotateCwButton = input<ResponsiveVisibility>(true);

  public showRotateCcwButton = input<ResponsiveVisibility>(true);

  public showSecondaryToolbarButton = input<ResponsiveVisibility>(true);

  public showSidebarButton = input<ResponsiveVisibility>(true);

  public showSignatureEditor = input<ResponsiveVisibility>(false);

  public sidebarVisible = input<boolean | undefined>(false);

  public showZoomButtons = input<ResponsiveVisibility>(true);

  public textLayer = input<boolean | undefined>(undefined);

  public toolbarMarginTop = input<string>('0px');

  public toolbarWidth = input<string>('100%');

  public zoomLevels = input<(string | number)[]>(['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4]);

  public pageViewMode = model.required<PageViewModeType>();

  public spread = input.required<SpreadType>();

  public scrollMode = input.required<ScrollModeType>();

  public showPropertiesButton = input<ResponsiveVisibility>(true);

  public showSpreadButton = input<ResponsiveVisibility>(true);

  public showSinglePageModeButton = input<ResponsiveVisibility>(true);

  public showVerticalScrollButton = input<ResponsiveVisibility>(true);

  public showHorizontalScrollButton = input<ResponsiveVisibility>(true);

  public showWrappedScrollButton = input<ResponsiveVisibility>(true);

  public showInfiniteScrollButton = input<ResponsiveVisibility>(true);

  public showBookModeButton = input<ResponsiveVisibility>(true);

  public onToolbarLoaded = output<HTMLElement>();

  public findbarVisible = input<boolean>(false);

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.onToolbarLoaded.emit(this.elementRef.nativeElement.getElementsByClassName('toolbar')[0] as HTMLElement);
  }

  public updatePageViewMode(pageViewMode: PageViewModeType): void {
    if (pageViewMode) {
      this.pageViewMode.set(pageViewMode);
    }
  }
}
