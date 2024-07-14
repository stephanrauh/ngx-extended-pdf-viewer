import { Component, effect, Input } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-open-file',
  templateUrl: './pdf-open-file.component.html',
  styleUrls: ['./pdf-open-file.component.css'],
})
export class PdfOpenFileComponent {
  @Input()
  public showOpenFileButton: ResponsiveVisibility = true;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public onClick = (htmlEvent: Event, secondaryToolbar: boolean) => {
    if (!secondaryToolbar) {
      this.PDFViewerApplication?.eventBus?.dispatch('openfile', { source: window });
    }
  };
}
