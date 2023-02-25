import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css'],
})
export class PdfDownloadComponent {
  @Input()
  public showDownloadButton: ResponsiveVisibility = true;
}
