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
  // #2818 modified by ngx-extended-pdf-viewer
  public disablePageNumber = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer
  public showPageLabel = input<ResponsiveVisibility>(true);
}
