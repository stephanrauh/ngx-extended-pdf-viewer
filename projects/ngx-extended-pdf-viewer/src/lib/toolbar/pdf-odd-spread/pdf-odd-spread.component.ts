import { ChangeDetectorRef, Component, input, effect, OnDestroy } from '@angular/core';
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
export class PdfOddSpreadComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public scrollMode = input.required<ScrollModeType>();

  public spread: SpreadType = 'off';

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  // #3135 modified by ngx-extended-pdf-viewer
  private eventBusAbortController: AbortController | null = null;
  // #3135 end of modification by ngx-extended-pdf-viewer

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
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    // #3135 end of modification by ngx-extended-pdf-viewer
    this.PDFViewerApplication?.eventBus.on('spreadmodechanged', (event) => {
      queueMicrotask(this.asyncWithCD(() => {
        const modes = ['off', 'odd', 'even'] as Array<SpreadType>;
        this.spread = modes[event.mode];
      }));
    }, opts);
  }

  // #3135 modified by ngx-extended-pdf-viewer
  public ngOnDestroy(): void {
    this.eventBusAbortController?.abort();
  }
  // #3135 end of modification by ngx-extended-pdf-viewer

  public onClick = (): void => {
    if (this.PDFViewerApplication) {
      this.PDFViewerApplication.pdfViewer.spreadMode = 1;
    }
  };
}
