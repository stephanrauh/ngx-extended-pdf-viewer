import { Component } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-infinite-scroll',
  templateUrl: './pdf-infinite-scroll.component.html',
  styleUrls: ['./pdf-infinite-scroll.component.css'],
})
export class PdfInfiniteScrollComponent {
  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.INFINITE });
  }
}
