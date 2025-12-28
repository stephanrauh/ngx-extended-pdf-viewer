import { Component, effect, input } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-find-button',
    templateUrl: './pdf-find-button.component.html',
    styleUrls: ['./pdf-find-button.component.css'],
    standalone: false
})
export class PdfFindButtonComponent {
  public showFindButton = input<ResponsiveVisibility | undefined>(undefined);

  // This is set internally by the viewer after loading a document. If the document has a text layer, the viewer will set this to true.
  public hasTextLayer = input<boolean>(false);

  public textLayer = input<boolean | undefined>(undefined);

  public findbarVisible = input<boolean>(false);

  private PDFViewerApplication!: IPDFViewerApplication | undefined;

  constructor(public notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public onClick = (): void => {
    const PDFViewerApplication: any = this.PDFViewerApplication;
    if (PDFViewerApplication?.findBar.opened) {
      PDFViewerApplication.findBar.close();
    } else if (PDFViewerApplication) {
      PDFViewerApplication.findBar.open();
      const positioningService = new PositioningService();
      positioningService.positionPopupBelowItsButton('primaryViewFind', 'findbar');
    }
  };
}
