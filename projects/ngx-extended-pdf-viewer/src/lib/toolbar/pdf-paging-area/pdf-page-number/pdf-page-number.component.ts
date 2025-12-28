import { Component, input } from '@angular/core';
import { ResponsiveVisibility } from '../../../responsive-visibility';

@Component({
    selector: 'pdf-page-number',
    templateUrl: './pdf-page-number.component.html',
    styleUrls: ['./pdf-page-number.component.css'],
    standalone: false
})
export class PdfPageNumberComponent {
  public showPageNumber = input<ResponsiveVisibility>(true);
  public showPageLabel = input<ResponsiveVisibility>(true);
}
