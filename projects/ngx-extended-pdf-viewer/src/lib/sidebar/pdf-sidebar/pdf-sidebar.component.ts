import { Component, ElementRef, input, output, signal, TemplateRef } from '@angular/core';
import { PdfThumbnailDrawnEvent } from '../../events/pdf-thumbnail-drawn-event';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-sidebar',
    templateUrl: './pdf-sidebar.component.html',
    styleUrls: ['./pdf-sidebar.component.css'],
    standalone: false
})
export class PdfSidebarComponent {
  public sidebarPositionTop = input<string | undefined>(undefined);

  public sidebarVisible = input<boolean>(true);

  public mobileFriendlyZoomScale = input<number>(1);

  public showSidebarButton = input<ResponsiveVisibility>(true);

  public customSidebar = input<TemplateRef<any> | undefined>(undefined);

  public customThumbnail = input<TemplateRef<any> | undefined>(undefined);

  public thumbnailDrawn = output<PdfThumbnailDrawnEvent>();

  public hideSidebarToolbar = signal(true);

  constructor(private elementRef: ElementRef) {}

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
    this.hideSidebarToolbar.set(visible <= 1);
    // Signals automatically trigger change detection, no need for markForCheck()
  }
}
