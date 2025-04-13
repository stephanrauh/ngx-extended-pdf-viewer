import { Component, Input } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { NgxExtendedPdfViewerService } from '../../ngx-extended-pdf-viewer.service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-toggle-secondary-toolbar',
  templateUrl: './pdf-toggle-secondary-toolbar.component.html',
  styleUrls: ['./pdf-toggle-secondary-toolbar.component.css'],
})
export class PdfToggleSecondaryToolbarComponent {
  @Input()
  public showSecondaryToolbarButton: ResponsiveVisibility = true;

  constructor(public service: NgxExtendedPdfViewerService) {}

  public onClick(event: Event): boolean {
    event.preventDefault();
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('secondaryToolbarToggle', 'secondaryToolbar');
    return false;
  }
}
