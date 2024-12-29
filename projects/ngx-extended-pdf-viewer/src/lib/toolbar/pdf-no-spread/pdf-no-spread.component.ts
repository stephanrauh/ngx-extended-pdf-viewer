import { Component, Input, effect } from '@angular/core';
import { ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { SpreadType } from '../../options/spread-type';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-no-spread',
  templateUrl: './pdf-no-spread.component.html',
  styleUrls: ['./pdf-no-spread.component.css'],
})
export class PdfNoSpreadComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public spread: SpreadType = 'off';

  @Input()
  public scrollMode: ScrollModeType;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(private notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('spreadmodechanged', (event) => {
      queueMicrotask(() => {
        const modes = ['off', 'odd', 'even'] as Array<SpreadType>;
        this.spread = modes[event.mode];
      });
    });
  }

  public onClick(): void {
    if (this.PDFViewerApplication) {
      this.PDFViewerApplication.pdfViewer.spreadMode = 0;
    }
  }
}
