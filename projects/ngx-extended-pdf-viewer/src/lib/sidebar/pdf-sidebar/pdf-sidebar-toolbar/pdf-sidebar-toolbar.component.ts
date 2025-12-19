import { Component, Input } from '@angular/core';

@Component({
    selector: 'pdf-sidebar-toolbar',
    templateUrl: './pdf-sidebar-toolbar.component.html',
    styleUrls: ['./pdf-sidebar-toolbar.component.css'],
    standalone: false
})
export class PdfSidebarToolbarComponent {

  @Input()
  public mobileFriendlyZoomScale = 1;

  public get height(): string {
    const h = 32 * this.mobileFriendlyZoomScale;
    return `${h}px`;
  }
}
