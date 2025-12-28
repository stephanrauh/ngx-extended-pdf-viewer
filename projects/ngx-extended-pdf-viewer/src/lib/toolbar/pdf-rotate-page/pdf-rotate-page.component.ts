import { Component, input, effect } from '@angular/core';
import { UpdateUIStateEvent } from '../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { PDFNotificationService } from './../../pdf-notification-service';

@Component({
    selector: 'pdf-rotate-page',
    templateUrl: './pdf-rotate-page.component.html',
    styleUrls: ['./pdf-rotate-page.component.css'],
    standalone: false
})
export class PdfRotatePageComponent {
  public showRotateButton = input<ResponsiveVisibility>(true);

  public disableRotate = true;

  public clockwise = input(true);

  public counterClockwise = input(true);

  private PDFViewerApplication: IPDFViewerApplication | undefined;

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

  public rotateCCW = (): void => {
    this.PDFViewerApplication?.eventBus.dispatch('rotateccw');
  };

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('updateuistate', (event) => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disableRotate = event.pagesCount === 0;
  }
}
