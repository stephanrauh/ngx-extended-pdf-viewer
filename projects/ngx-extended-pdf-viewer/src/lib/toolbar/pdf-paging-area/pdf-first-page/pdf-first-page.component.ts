import { PDFNotificationService } from './../../../pdf-notification-service';
import { Component, ViewChild, ElementRef} from '@angular/core';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';

@Component({
  selector: 'pdf-first-page',
  templateUrl: './pdf-first-page.component.html',
  styleUrls: ['./pdf-first-page.component.css']
})
export class PdfFirstPageComponent {
  public disableFirstPage = true;

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
    PDFViewerApplication.eventBus.on('updateuistate', (event) => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disableFirstPage = event.pageNumber <= 1;
    this.button.nativeElement.disabled = this.disableFirstPage;
  }
}
