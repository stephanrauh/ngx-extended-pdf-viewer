import { Component, effect, input, OnDestroy } from '@angular/core';
import { ScaleChangingEvent } from '../../../events/scale-changing-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../../pdf-notification-service';
import { ResponsiveVisibility } from '../../../responsive-visibility';

@Component({
    selector: 'pdf-zoom-out',
    templateUrl: './pdf-zoom-out.component.html',
    styleUrls: ['./pdf-zoom-out.component.css'],
    standalone: false
})
export class PdfZoomOutComponent implements OnDestroy {
  public showZoomButtons = input<ResponsiveVisibility>(true);

  public disabled = true;
  PDFViewerApplication: IPDFViewerApplication | undefined;

  // #3135 modified by ngx-extended-pdf-viewer
  private eventBusAbortController: AbortController | null = null;
  // #3135 end of modification by ngx-extended-pdf-viewer

  private eventListener = ({ source, scale }: ScaleChangingEvent) => {
    const minZoom = source.minZoom;
    if (minZoom) {
      this.disabled = scale <= minZoom;
    } else {
      this.disabled = false;
    }
  };

  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  private onPdfJsInit() {
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    this.PDFViewerApplication?.eventBus.on('scalechanging', this.eventListener, opts);
    // #3135 end of modification by ngx-extended-pdf-viewer
  }

  // #3135 modified by ngx-extended-pdf-viewer
  public ngOnDestroy() {
    this.eventBusAbortController?.abort();
    this.PDFViewerApplication = undefined;
  }
  // #3135 end of modification by ngx-extended-pdf-viewer
}
