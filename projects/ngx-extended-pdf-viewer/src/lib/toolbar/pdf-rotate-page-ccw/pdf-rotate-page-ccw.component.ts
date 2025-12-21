import { ChangeDetectorRef, Component, Input, ViewEncapsulation, effect } from '@angular/core';
import { UpdateUIStateEvent } from '../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-rotate-page-ccw',
    templateUrl: './pdf-rotate-page-ccw.component.html',
    styleUrls: ['./pdf-rotate-page-ccw.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PdfRotatePageCcwComponent {
  @Input()
  public showRotateCcwButton: ResponsiveVisibility = true;

  public disableRotate = true;

  @Input()
  public counterClockwise = true;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(notificationService: PDFNotificationService, private changeDetectorRef: ChangeDetectorRef) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  public rotateCCW(): void {
    this.PDFViewerApplication?.eventBus.dispatch('rotateccw');
  }

  public onPdfJsInit(): void {
    this.PDFViewerApplication?.eventBus.on('updateuistate', (event) => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disableRotate = event.pagesCount === 0;
    this.changeDetectorRef.markForCheck();
  }
}
