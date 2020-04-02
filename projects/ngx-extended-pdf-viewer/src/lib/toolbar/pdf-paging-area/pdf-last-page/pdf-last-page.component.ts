import { PDFNotificationService } from './../../../pdf-notification-service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';

@Component({
  selector: 'pdf-last-page',
  templateUrl: './pdf-last-page.component.html',
  styleUrls: ['./pdf-last-page.component.css']
})
export class PdfLastPageComponent {
  public disableLastPage = true;

  @ViewChild('button')
  private button: ElementRef<HTMLButtonElement>;

  constructor(private notificationService: PDFNotificationService) {
    const subscription = this.notificationService.onPDFJSInit.subscribe(() => {
      this.onPdfJsInit();
      subscription.unsubscribe();
    });
  }

  public firstPage(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('firstpage');
  }

  public onPdfJsInit(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('updateuistate', event => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disableLastPage = event.pageNumber === event.pagesCount;
    this.button.nativeElement.disabled = this.disableLastPage;
  }

  public lastPage(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('lastpage');
  }
}
