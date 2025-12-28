import { Component, input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-paging-area',
    templateUrl: './pdf-paging-area.component.html',
    styleUrls: ['./pdf-paging-area.component.css'],
    standalone: false
})
export class PdfPagingAreaComponent {
  public showPagingButtons = input<ResponsiveVisibility>(true);

  public showFirstAndLastPageButtons = input<ResponsiveVisibility>(true);

  public showPreviousAndNextPageButtons = input<ResponsiveVisibility>(true);

  public showPageNumber = input<ResponsiveVisibility>(true);

  public showPageLabel = input<ResponsiveVisibility>(true);
}
