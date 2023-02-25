import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-presentation-mode',
  templateUrl: './pdf-presentation-mode.component.html',
  styleUrls: ['./pdf-presentation-mode.component.css'],
})
export class PdfPresentationModeComponent {
  @Input()
  public showPresentationModeButton: ResponsiveVisibility = true;
}
