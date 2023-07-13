import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../../responsive-visibility';

@Component({
  selector: 'pdf-zoom-in',
  templateUrl: './pdf-zoom-in.component.html',
  styleUrls: ['./pdf-zoom-in.component.css'],
})
export class PdfZoomInComponent {
  @Input()
  public showZoomButtons: ResponsiveVisibility = true;
}
