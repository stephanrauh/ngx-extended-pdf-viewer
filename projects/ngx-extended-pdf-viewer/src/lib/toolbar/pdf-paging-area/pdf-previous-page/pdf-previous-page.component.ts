import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../../pdf-notification-service';
import { ResponsiveVisibility } from '../../../responsive-visibility';

@Component({
  selector: 'pdf-previous-page',
  templateUrl: './pdf-previous-page.component.html',
  styleUrls: ['./pdf-previous-page.component.css'],
})
export class PdfPreviousPageComponent {
  @Input()
  public show: ResponsiveVisibility = true;
  public disablePreviousPage = true;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService, private changeDetectorRef: ChangeDetectorRef) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('updateuistate', (event) => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disablePreviousPage = event.pageNumber <= 1;
    this.changeDetectorRef.markForCheck();
  }
}
