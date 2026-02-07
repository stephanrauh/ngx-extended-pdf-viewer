import { Component, input, effect, OnDestroy } from '@angular/core';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { ResponsiveVisibility } from '../../../responsive-visibility';
import { PDFNotificationService } from './../../../pdf-notification-service';

@Component({
    selector: 'pdf-first-page',
    templateUrl: './pdf-first-page.component.html',
    styleUrls: ['./pdf-first-page.component.css'],
    standalone: false
})
export class PdfFirstPageComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public disableFirstPage = true;

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

  public firstPage(): void {
    this.PDFViewerApplication?.eventBus.dispatch('firstpage');
  }

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
    this.disableFirstPage = event.pageNumber <= 1;
  }
}
