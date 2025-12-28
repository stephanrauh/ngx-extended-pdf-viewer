import { Component, input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-print',
    templateUrl: './pdf-print.component.html',
    styleUrls: ['./pdf-print.component.css'],
    standalone: false
})
export class PdfPrintComponent {
  public showPrintButton = input<ResponsiveVisibility>(true);
}
