import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { PdfThumbnailDrawnEvent } from '../../events/pdf-thumbnail-drawn-event';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-sidebar',
  templateUrl: './pdf-sidebar.component.html',
  styleUrls: ['./pdf-sidebar.component.css'],
})
export class PdfSidebarComponent {
  @Input()
  public sidebarPositionTop: string | undefined;

  @Input()
  public sidebarVisible = true;

  @Input()
  public mobileFriendlyZoomScale = 1;

  @Input()
  public showSidebarButton: ResponsiveVisibility = true;

  @Input()
  public customSidebar: TemplateRef<any> | undefined;

  @Input()
  public customThumbnail: TemplateRef<any> | undefined;

  @Output()
  public thumbnailDrawn = new EventEmitter<PdfThumbnailDrawnEvent>();

  public hideSidebarToolbar = true;

  constructor(private elementRef: ElementRef, private ref: ChangeDetectorRef) {}

  public showToolbarWhenNecessary(): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    const buttons = element.querySelectorAll('button');
    let visible = 0;
    for (let index = 0; index < buttons.length; index++) {
      const b = buttons.item(index);
      if (!b.hidden) {
        visible++;
      }
    }
    this.hideSidebarToolbar = visible <= 1;
    this.ref.markForCheck();
  }
}
