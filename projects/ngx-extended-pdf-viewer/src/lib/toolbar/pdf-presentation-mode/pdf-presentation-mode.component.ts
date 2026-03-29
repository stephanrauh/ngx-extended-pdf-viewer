import { Component, input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-presentation-mode',
    templateUrl: './pdf-presentation-mode.component.html',
    styleUrls: ['./pdf-presentation-mode.component.css'],
    standalone: false
})
export class PdfPresentationModeComponent {
  public showPresentationModeButton = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disable = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer
}
