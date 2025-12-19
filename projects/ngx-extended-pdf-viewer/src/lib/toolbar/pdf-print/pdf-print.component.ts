import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-print',
    templateUrl: './pdf-print.component.html',
    styleUrls: ['./pdf-print.component.css'],
    standalone: false
})
export class PdfPrintComponent {
  @Input()
  public showPrintButton: ResponsiveVisibility = true;
}
