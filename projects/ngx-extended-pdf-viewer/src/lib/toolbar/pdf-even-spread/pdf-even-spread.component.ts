import { ChangeDetectorRef, Component, input, effect } from '@angular/core';
import { ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { SpreadType } from '../../options/spread-type';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-even-spread',
    templateUrl: './pdf-even-spread.component.html',
    styleUrls: ['./pdf-even-spread.component.css'],
    standalone: false
})
export class PdfEvenSpreadComponent {
  public show = input<ResponsiveVisibility>(true);

  public spread: SpreadType = 'off';

  public scrollMode = input.required<ScrollModeType>();

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService, private cdr: ChangeDetectorRef) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  private isZoneless(): boolean {
    const Zone = (globalThis as any).Zone;
    return typeof Zone === 'undefined' || !Zone?.current;
  }

  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (this.isZoneless()) {
        this.cdr.detectChanges();
      }
    };
  }

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('spreadmodechanged', (event) => {
      queueMicrotask(this.asyncWithCD(() => {
        const modes = ['off', 'odd', 'even'] as Array<SpreadType>;
        this.spread = modes[event.mode];
      }));
    });
  }

  public onClick = (): void => {
    if (this.PDFViewerApplication) {
      this.PDFViewerApplication.pdfViewer.spreadMode = 2;
    }
  };
}
