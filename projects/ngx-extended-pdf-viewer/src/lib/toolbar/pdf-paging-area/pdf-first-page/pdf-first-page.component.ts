import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { UpdateUIStateEvent } from '../../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';
import { ResponsiveVisibility } from '../../../responsive-visibility';
import { PDFNotificationService } from './../../../pdf-notification-service';

@Component({
  selector: 'pdf-first-page',
  templateUrl: './pdf-first-page.component.html',
  styleUrls: ['./pdf-first-page.component.css'],
})
export class PdfFirstPageComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public disableFirstPage = true;

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
    this.disableFirstPage = event.pageNumber <= 1;
    this.changeDetectorRef.markForCheck();
  }
}
