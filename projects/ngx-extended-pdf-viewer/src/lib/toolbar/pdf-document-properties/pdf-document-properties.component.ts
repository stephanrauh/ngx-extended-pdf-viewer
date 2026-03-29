import { Component, input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-document-properties',
    templateUrl: './pdf-document-properties.component.html',
    styleUrls: ['./pdf-document-properties.component.css'],
    standalone: false
})
export class PdfDocumentPropertiesComponent {
  public show = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disable = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer
}
