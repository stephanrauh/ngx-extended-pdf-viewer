import { ElementRef } from '@angular/core';
import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pdf-toolbar',
  templateUrl: './pdf-toolbar.component.html',
  styleUrls: ['./pdf-toolbar.component.css']
})
export class PdfToolbarComponent {
  @Input()
  public customToolbar: TemplateRef<any> | undefined;

  @Input()
  public mobileFriendlyZoomScale = 1;

  @Input()
  public primaryMenuVisible = true;

  @Input()
  public showBookmarkButton = true;

  @Input()
  public showDownloadButton = true;

  @Input()
  public showFindButton: boolean | undefined = undefined;

  @Input()
  public showHandToolButton = true;

  @Input()
  public showOpenFileButton = true;

  @Input()
  public showPrintButton = true;

  @Input()
  public showPagingButtons = true;

  @Input()
  public showPresentationModeButton = false;

  @Input()
  public showRotateButton = true;

  @Input()
  public showSecondaryToolbarButton = true;

  @Input()
  public showSidebarButton = true;

  @Input()
  public showZoomButtons = true;

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

  constructor(elementRef: ElementRef) {
    this.onToolbarLoaded.emit(elementRef.nativeElement.getElementsByClassName('toolbar')[0] as HTMLElement);
  }
  

}
