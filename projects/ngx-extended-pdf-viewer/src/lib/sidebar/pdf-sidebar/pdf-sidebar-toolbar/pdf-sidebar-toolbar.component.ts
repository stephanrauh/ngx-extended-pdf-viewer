import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'pdf-sidebar-toolbar',
    templateUrl: './pdf-sidebar-toolbar.component.html',
    styleUrls: ['./pdf-sidebar-toolbar.component.css'],
    standalone: false
})
export class PdfSidebarToolbarComponent {

  public mobileFriendlyZoomScale = input<number>(1);

  public height = computed(() => {
    const h = 32 * this.mobileFriendlyZoomScale();
    return `${h}px`;
  });
}
