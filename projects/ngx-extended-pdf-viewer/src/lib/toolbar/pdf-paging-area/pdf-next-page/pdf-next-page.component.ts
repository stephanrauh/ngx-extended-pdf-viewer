import { ChangeDetectorRef, Component } from '@angular/core';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../../pdf-notification-service';

@Component({
  selector: 'pdf-next-page',
  templateUrl: './pdf-next-page.component.html',
  styleUrls: ['./pdf-next-page.component.css'],
})
export class PdfNextPageComponent {
  public disableNextPage = true;

  constructor(private notificationService: PDFNotificationService, private changeDetectorRef: ChangeDetectorRef) {
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
    this.disableNextPage = event.pageNumber === event.pagesCount;
    this.changeDetectorRef.markForCheck();
  }
}
