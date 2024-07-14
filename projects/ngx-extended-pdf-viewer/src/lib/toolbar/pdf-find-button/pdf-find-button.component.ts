import { Component, effect, Input } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-find-button',
  templateUrl: './pdf-find-button.component.html',
  styleUrls: ['./pdf-find-button.component.css'],
})
export class PdfFindButtonComponent {
  @Input()
  public showFindButton: ResponsiveVisibility | undefined = undefined;

  @Input()
  public textLayer: boolean | undefined = undefined;

  @Input()
  public findbarVisible = false;
  private PDFViewerApplication!: IPDFViewerApplication | undefined;

  constructor(public notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public onClick() {
    const PDFViewerApplication: any = this.PDFViewerApplication;
    if (PDFViewerApplication.findBar.opened) {
      PDFViewerApplication.findBar.close();
    } else {
      PDFViewerApplication.findBar.open();
    }
  }
}
