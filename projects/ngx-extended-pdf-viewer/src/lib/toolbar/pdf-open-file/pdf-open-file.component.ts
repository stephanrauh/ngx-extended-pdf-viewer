import { Component, Input } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-open-file',
  templateUrl: './pdf-open-file.component.html',
  styleUrls: ['./pdf-open-file.component.css'],
})
export class PdfOpenFileComponent {
  constructor(private pdfNotificationService: PDFNotificationService) {}

  @Input()
  public showOpenFileButton: ResponsiveVisibility = true;

  public onClick = (htmlEvent: Event, secondaryToolbar: boolean) => {
    if (!secondaryToolbar && this.pdfNotificationService.pdfjsVersion >= '4') {
      const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
      PDFViewerApplication?.eventBus?.dispatch('openfile', { source: window });
    }
  };
}
