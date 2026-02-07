import { Component, input, ViewEncapsulation, effect, OnDestroy } from '@angular/core';
import { UpdateUIStateEvent } from '../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-rotate-page-cw',
    templateUrl: './pdf-rotate-page-cw.component.html',
    styleUrls: ['./pdf-rotate-page-cw.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PdfRotatePageCwComponent implements OnDestroy {
  public showRotateCwButton = input<ResponsiveVisibility>(true);

  public disableRotate = true;

  public clockwise = input(true);

  public counterClockwise = input(true);

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  // #3135 modified by ngx-extended-pdf-viewer
  private eventBusAbortController: AbortController | null = null;
  // #3135 end of modification by ngx-extended-pdf-viewer

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  public rotateCW = (): void => {
    this.PDFViewerApplication?.eventBus.dispatch('rotatecw');
  };

  public onPdfJsInit(): void {
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    // #3135 end of modification by ngx-extended-pdf-viewer
    this.PDFViewerApplication?.eventBus.on('updateuistate', (event) => this.updateUIState(event), opts);
  }

  // #3135 modified by ngx-extended-pdf-viewer
  public ngOnDestroy(): void {
    this.eventBusAbortController?.abort();
  }
  // #3135 end of modification by ngx-extended-pdf-viewer

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disableRotate = event.pagesCount === 0;
  }
}
