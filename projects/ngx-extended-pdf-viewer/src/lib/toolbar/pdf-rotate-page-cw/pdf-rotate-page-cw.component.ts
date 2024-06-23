import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { UpdateUIStateEvent } from '../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-rotate-page-cw',
  templateUrl: './pdf-rotate-page-cw.component.html',
  styleUrls: ['./pdf-rotate-page-cw.component.css'],
})
export class PdfRotatePageCwComponent {
  @Input()
  public showRotateCwButton: ResponsiveVisibility = true;

  public disableRotate = true;

  @Input()
  public clockwise = true;

  @Input()
  public counterClockwise = true;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(private notificationService: PDFNotificationService, private changeDetectorRef: ChangeDetectorRef) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  public rotateCW(): void {
    this.PDFViewerApplication?.eventBus.dispatch('rotatecw');
  }

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('updateuistate', (event) => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disableRotate = event.pagesCount === 0;
    this.changeDetectorRef.markForCheck();
  }
}
