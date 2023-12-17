import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { NgxExtendedPdfViewerService } from '../../ngx-extended-pdf-viewer.service';

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
    return false;
  }
}
