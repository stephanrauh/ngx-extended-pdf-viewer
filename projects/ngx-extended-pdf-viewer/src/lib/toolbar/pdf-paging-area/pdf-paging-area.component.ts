import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-paging-area',
    templateUrl: './pdf-paging-area.component.html',
    styleUrls: ['./pdf-paging-area.component.css'],
    standalone: false
})
export class PdfPagingAreaComponent {
  @Input()
  public showPagingButtons: ResponsiveVisibility = true;

  @Input()
  public showFirstAndLastPageButtons: ResponsiveVisibility = true;

  @Input()
  public showPreviousAndNextPageButtons: ResponsiveVisibility = true;

  @Input()
  public showPageNumber: ResponsiveVisibility = true;

  @Input()
  public showPageLabel: ResponsiveVisibility = true;
}
