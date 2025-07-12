import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-move-down',
  templateUrl: './pdf-move-down.component.html',
  styleUrls: ['./pdf-move-down.component.css'],
})
export class PdfMoveDownComponent {
  @Input()
  public showMoveDownButton: ResponsiveVisibility = true;
}
