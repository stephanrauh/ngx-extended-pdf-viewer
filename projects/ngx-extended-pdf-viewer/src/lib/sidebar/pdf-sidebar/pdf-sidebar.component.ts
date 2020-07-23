import { Component, Input, TemplateRef, AfterContentInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { PdfThumbnailDrawnEvent } from '../../events/pdf-thumbnail-drawn-event';

@Component({
  selector: 'pdf-sidebar',
  templateUrl: './pdf-sidebar.component.html',
  styleUrls: ['./pdf-sidebar.component.css'],
})
export class PdfSidebarComponent {
  @Input()
  public sidebarPositionTop: number;

  @Input()
  public showSidebarButton = true;

  @Input()
  public customSidebar: TemplateRef<any>;

  @Input()
  public customThumbnail: TemplateRef<any>;

  @Output()
  public thumbnailDrawn = new EventEmitter<PdfThumbnailDrawnEvent>();

  constructor() {
  }
}
