import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'pdf-secondary-toolbar',
  templateUrl: './pdf-secondary-toolbar.component.html',
  styleUrls: ['./pdf-secondary-toolbar.component.css']
})
export class PdfSecondaryToolbarComponent {
  @Input()
  public customSecondaryToolbar: TemplateRef<any>;

  @Input()
  public secondaryToolbarTop;

  @Input()
  public mobileFriendlyZoomScale: number;

  @Input()
  public showPresentationModeButton = true;

  @Input()
  public showOpenFileButton = true;

  @Input()
  public showPrintButton = true;

  @Input()
  public showDownloadButton = true;

  @Input()
  public showBookmarkButton = true;

  @Input()
  public showPagingButtons = true;

  @Input()
  public showRotateButton = true;

  @Input()
  public showHandToolButton = true;

  @Input()
  public showScrollingButton = true;

  @Input()
  public showSpreadButton = true;

  @Input()
  public showPropertiesButton = true;

  @Output()
  public spreadChange = new EventEmitter<string>();

  public onSpreadChange(newSpread: string): void {
    this.spreadChange.emit(newSpread);
  }

  constructor() {}
}
