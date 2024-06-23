import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { UpdateUIStateEvent } from '../../events/update-ui-state-event';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { ResponsiveVisibility } from '../../responsive-visibility';
import { PDFNotificationService } from './../../pdf-notification-service';

@Component({
  selector: 'pdf-rotate-page',
  templateUrl: './pdf-rotate-page.component.html',
  styleUrls: ['./pdf-rotate-page.component.css'],
})
export class PdfRotatePageComponent {
  @Input()
  public showRotateButton: ResponsiveVisibility = true;

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
