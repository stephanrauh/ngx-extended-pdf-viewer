import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../../responsive-visibility';

@Component({
  selector: 'pdf-zoom-out',
  templateUrl: './pdf-zoom-out.component.html',
  styleUrls: ['./pdf-zoom-out.component.css'],
})
export class PdfZoomOutComponent {
  @Input()
  public showZoomButtons: ResponsiveVisibility = true;
}
