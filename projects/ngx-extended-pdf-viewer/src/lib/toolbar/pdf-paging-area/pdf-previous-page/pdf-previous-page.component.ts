import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../../pdf-notification-service';

@Component({
  selector: 'pdf-previous-page',
  templateUrl: './pdf-previous-page.component.html',
  styleUrls: ['./pdf-previous-page.component.css'],
})
export class PdfPreviousPageComponent {
  public disablePreviousPage = true;

  constructor(private notificationService: PDFNotificationService, private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef) {
    const subscription = this.notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  public onPdfJsInit(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('updateuistate', (event) => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disablePreviousPage = event.pageNumber <= 1;
    this.changeDetectorRef.markForCheck();
  }
}
