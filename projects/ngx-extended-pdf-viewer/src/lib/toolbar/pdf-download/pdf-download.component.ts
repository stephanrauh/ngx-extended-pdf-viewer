import { Component, input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-download',
    templateUrl: './pdf-download.component.html',
    styleUrls: ['./pdf-download.component.css'],
    standalone: false
})
export class PdfDownloadComponent {
  public showDownloadButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disable = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer
}
