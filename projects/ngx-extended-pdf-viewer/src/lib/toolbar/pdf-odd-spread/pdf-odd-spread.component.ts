import { Component, Input, effect } from '@angular/core';
import { ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { SpreadType } from '../../options/spread-type';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-odd-spread',
    templateUrl: './pdf-odd-spread.component.html',
    styleUrls: ['./pdf-odd-spread.component.css'],
    standalone: false
})
export class PdfOddSpreadComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  @Input()
  public scrollMode!: ScrollModeType;

  public spread: SpreadType = 'off';

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService) {
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
      this.PDFViewerApplication.pdfViewer.spreadMode = 1;
    }
  }
}
