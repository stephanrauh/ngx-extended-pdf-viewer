import { ChangeDetectorRef, Component, effect, Input } from '@angular/core';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { ResponsiveVisibility } from '../../../responsive-visibility';
import { PDFNotificationService } from './../../../pdf-notification-service';

@Component({
  selector: 'pdf-last-page',
  templateUrl: './pdf-last-page.component.html',
  styleUrls: ['./pdf-last-page.component.css'],
})
export class PdfLastPageComponent {
  @Input()
  public show: ResponsiveVisibility = true;
  public disableLastPage = true;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService, private changeDetectorRef: ChangeDetectorRef) {
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
    this.PDFViewerApplication?.eventBus.on('updateuistate', (event) => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disableLastPage = event.pageNumber === event.pagesCount;
    this.changeDetectorRef.markForCheck();
  }

  public lastPage(): void {
    this.PDFViewerApplication?.eventBus.dispatch('lastpage');
  }
}
