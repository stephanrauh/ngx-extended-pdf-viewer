import { Component } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-horizontal-scroll',
  templateUrl: './pdf-horizontal-scroll.component.html',
  styleUrls: ['./pdf-horizontal-scroll.component.css'],
})
export class PdfHorizontalScrollComponent {
  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.HORIZONTAL });
  }
}
