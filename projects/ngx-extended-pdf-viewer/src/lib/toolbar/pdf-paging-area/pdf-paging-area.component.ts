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

  // #2818 modified by ngx-extended-pdf-viewer
  public disablePagingButtons = input<boolean>(false);
  public disableFirstAndLastPageButtons = input<boolean>(false);
  public disablePreviousAndNextPageButtons = input<boolean>(false);
  public disablePageNumber = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer
}
