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
    this.PDFViewerApplication?.eventBus.on('scalechanging', this.eventListener);
  }

  public ngOnDestroy() {
    this.PDFViewerApplication?.eventBus.off('scalechanging', this.eventListener);
    this.PDFViewerApplication = undefined;
  }
}
