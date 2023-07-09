import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-toolbar',
  templateUrl: './pdf-toolbar.component.html',
  styleUrls: ['./pdf-toolbar.component.css'],
})
export class PdfToolbarComponent implements AfterViewInit {
  @Input()
  public customToolbar: TemplateRef<any> | undefined;

  @Input()
  public mobileFriendlyZoomScale = 1;

  @Input()
  public primaryMenuVisible = true;

  @Input()
  public showBookmarkButton: ResponsiveVisibility = true;

  @Input()
  public showDownloadButton: ResponsiveVisibility = true;

  @Input()
  public showDrawEditor: ResponsiveVisibility = false;

  @Input()
  public showTextEditor: ResponsiveVisibility = false;

  @Input()
  public showStampEditor: ResponsiveVisibility = false;

  @Input()
  public showFindButton: ResponsiveVisibility | undefined = undefined;

  @Input()
  public showHandToolButton: ResponsiveVisibility = true;

  @Input()
  public showOpenFileButton: ResponsiveVisibility = true;

  @Input()
  public showPrintButton: ResponsiveVisibility = true;

  @Input()
  public showPagingButtons: ResponsiveVisibility = true;

  @Input()
  public showPresentationModeButton: ResponsiveVisibility = false;

  @Input()
  public showRotateButton: ResponsiveVisibility = true;

  @Input()
  public showSecondaryToolbarButton: ResponsiveVisibility = true;

  @Input()
  public showSidebarButton: ResponsiveVisibility = true;

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

  @Output()
  public onToolbarLoaded = new EventEmitter<HTMLElement>();

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.onToolbarLoaded.emit(this.elementRef.nativeElement.getElementsByClassName('toolbar')[0] as HTMLElement);
  }
}
