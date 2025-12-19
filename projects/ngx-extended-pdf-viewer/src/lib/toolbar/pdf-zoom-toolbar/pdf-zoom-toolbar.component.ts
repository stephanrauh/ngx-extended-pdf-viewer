import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-zoom-toolbar',
    templateUrl: './pdf-zoom-toolbar.component.html',
    styleUrls: ['./pdf-zoom-toolbar.component.css'],
    standalone: false
})
export class PdfZoomToolbarComponent {
  @Input()
  public showZoomButtons: ResponsiveVisibility = true;

  @Input()
  public zoomLevels = ['auto', 'page-actual', 'page-fit', 'page-width', 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

  @Input()
  public showZoomDropdown: ResponsiveVisibility = true;
}
