import { Component, effect, Input, OnDestroy } from '@angular/core';
import { ScaleChangingEvent } from '../../../events/scale-changing-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../../pdf-notification-service';
import { ResponsiveVisibility } from '../../../responsive-visibility';

@Component({
  selector: 'pdf-zoom-in',
  templateUrl: './pdf-zoom-in.component.html',
  styleUrls: ['./pdf-zoom-in.component.css'],
})
export class PdfZoomInComponent implements OnDestroy {
  @Input()
  public showZoomButtons: ResponsiveVisibility = true;

  public disabled = true;
  PDFViewerApplication: IPDFViewerApplication | undefined;

  private eventListener = ({ source, scale }: ScaleChangingEvent) => {
    const maxZoom = source.maxZoom;
    if (maxZoom) {
      this.disabled = scale >= maxZoom;
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
