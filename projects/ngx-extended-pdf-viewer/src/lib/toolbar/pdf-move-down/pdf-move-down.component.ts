import { Component, input, effect } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';

@Component({
    selector: 'pdf-move-down',
    templateUrl: './pdf-move-down.component.html',
    styleUrls: ['./pdf-move-down.component.css'],
    standalone: false
})
export class PdfMoveDownComponent {
  public showMoveDownButton = input<ResponsiveVisibility>(true);

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public movePageDown = () => {
    if (this.PDFViewerApplication) {
      const currentPage = this.PDFViewerApplication.page;
      this.PDFViewerApplication.eventBus.dispatch('movePageDown', {
        source: { pageNumber: currentPage }
      });
    }
  };
}
