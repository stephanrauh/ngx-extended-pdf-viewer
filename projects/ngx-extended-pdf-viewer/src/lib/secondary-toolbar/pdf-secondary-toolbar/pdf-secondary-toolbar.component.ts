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
  public showPresentationModeButton: boolean;

  @Input()
  public showOpenFileButton: boolean;

  @Input()
  public showPrintButton: boolean;

  @Input()
  public showDownloadButton: boolean;

  @Input()
  public showBookmarkButton: boolean;

  @Input()
  public showPagingButtons: boolean;

  @Input()
  public showRotateButton: boolean;

  @Input()
  public showHandToolButton: boolean;

  @Input()
  public showScrollingButton: boolean;

  @Input()
  public showSpreadButton: boolean;

  @Input()
  public showPropertiesButton: boolean;

  @Output()
  public spreadChange = new EventEmitter<string>();

  public onSpreadChange(newSpread: string): void {
    this.spreadChange.emit(newSpread);
  }

  constructor() { }
}
