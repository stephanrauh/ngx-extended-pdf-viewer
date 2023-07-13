import { Component } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-single-page-mode',
  templateUrl: './pdf-single-page-mode.component.html',
  styleUrls: ['./pdf-single-page-mode.component.css'],
})
export class PdfSinglePageModeComponent {
  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.PAGE });
  }
}
