import { Component } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-vertical-scroll-mode',
  templateUrl: './pdf-vertical-scroll-mode.component.html',
  styleUrls: ['./pdf-vertical-scroll-mode.component.css'],
})
export class PdfVerticalScrollModeComponent {
  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.VERTICAL });
  }
}
