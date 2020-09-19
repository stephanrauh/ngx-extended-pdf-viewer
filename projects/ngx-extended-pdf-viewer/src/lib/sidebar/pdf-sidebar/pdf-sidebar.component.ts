import { Component, Input, TemplateRef, AfterContentInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, ViewEncapsulation, NgZone, ChangeDetectorRef } from '@angular/core';
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
  public sidebarVisible = true;

  @Input()
  public showSidebarButton = true;

  @Input()
  public customSidebar: TemplateRef<any>;

  @Input()
  public customThumbnail: TemplateRef<any>;

  @Output()
  public thumbnailDrawn = new EventEmitter<PdfThumbnailDrawnEvent>();

  public hideSidebarToolbar = true;

  constructor(private elementRef: ElementRef, private ref: ChangeDetectorRef) {}

  public showToolbarWhenNecessary(): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll('button');
    let visible = 0;
    buttons.forEach((b) => {
      if (!b.hidden) {
        visible++;
      }
    });
    this.hideSidebarToolbar = visible <= 1;
    this.ref.markForCheck();
    console.log(visible);
  }
}
