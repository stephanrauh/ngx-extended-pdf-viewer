import { Component, input, effect } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';

@Component({
    selector: 'pdf-move-up',
    templateUrl: './pdf-move-up.component.html',
    styleUrls: ['./pdf-move-up.component.css'],
    standalone: false
})
export class PdfMoveUpComponent {
  public showMoveUpButton = input<ResponsiveVisibility>(true);

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public movePageUp = () => {
    if (this.PDFViewerApplication) {
      const currentPage = this.PDFViewerApplication.page;
      this.PDFViewerApplication.eventBus.dispatch('movePageUp', {
        source: { pageNumber: currentPage }
      });
    }
  };
}
