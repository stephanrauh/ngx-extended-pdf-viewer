import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../../responsive-visibility';

@Component({
    selector: 'pdf-page-number',
    templateUrl: './pdf-page-number.component.html',
    styleUrls: ['./pdf-page-number.component.css'],
    standalone: false
})
export class PdfPageNumberComponent {
  @Input()
  public showPageNumber: ResponsiveVisibility = true;
  @Input()
  public showPageLabel: ResponsiveVisibility = true;
}
