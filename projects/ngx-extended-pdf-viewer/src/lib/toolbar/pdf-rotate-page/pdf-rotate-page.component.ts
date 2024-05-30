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

  constructor(private notificationService: PDFNotificationService, private changeDetectorRef: ChangeDetectorRef) {
    effect(() => {
      if (notificationService.onPDFJSInitSignal()) {
        this.onPdfJsInit();
      }
    });
  }

  public rotateCW(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('rotatecw');
  }

  public rotateCCW(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('rotateccw');
  }

  public onPdfJsInit(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.on('updateuistate', (event) => this.updateUIState(event));
  }

  public updateUIState(event: UpdateUIStateEvent): void {
    this.disableRotate = event.pagesCount === 0;
    this.changeDetectorRef.markForCheck();
  }
}
