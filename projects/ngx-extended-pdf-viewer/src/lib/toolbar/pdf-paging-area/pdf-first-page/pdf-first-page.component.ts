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

  constructor(private notificationService: PDFNotificationService, private changeDetectorRef: ChangeDetectorRef) {
    effect(() => {
      if (notificationService.onPDFJSInitSignal()) {
        this.onPdfJsInit();
      }
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
    this.changeDetectorRef.markForCheck();
  }
}
