import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-move-up',
  templateUrl: './pdf-move-up.component.html',
  styleUrls: ['./pdf-move-up.component.css'],
})
export class PdfMoveUpComponent {
  @Input()
  public showMoveUpButton: ResponsiveVisibility = true;
}
