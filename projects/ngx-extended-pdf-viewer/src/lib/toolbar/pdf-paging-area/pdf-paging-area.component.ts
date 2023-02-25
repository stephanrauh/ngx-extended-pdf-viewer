import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-paging-area',
  templateUrl: './pdf-paging-area.component.html',
  styleUrls: ['./pdf-paging-area.component.css'],
})
export class PdfPagingAreaComponent {
  @Input()
  public showPagingButtons: ResponsiveVisibility = true;
}
