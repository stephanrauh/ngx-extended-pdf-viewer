import { ChangeDetectorRef, Component, effect, input, OnDestroy, ViewRef } from '@angular/core';
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

  // #2818 modified by ngx-extended-pdf-viewer
  public disable = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public scrollMode = input.required<ScrollModeType>();

  public spread: SpreadType = 'off';

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  // #3135 modified by ngx-extended-pdf-viewer
  private eventBusAbortController: AbortController | null = null;
  // #3135 end of modification by ngx-extended-pdf-viewer

  constructor(notificationService: PDFNotificationService, private readonly cdr: ChangeDetectorRef) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  /**
   * Runs `callback` and re-renders this component.
   *
   * The callback is scheduled from a pdf.js event bus listener, which runs
   * outside Angular's zone, so neither zone.js nor a signal write schedules a
   * change detection run for us - the button kept showing the previous state
   * until an unrelated click happened to trigger one. The view can already be
   * destroyed by the time a queued callback runs, and `detectChanges()` throws
   * on a destroyed view, so that case is skipped.
   */
  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (!(this.cdr as ViewRef).destroyed) {
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
