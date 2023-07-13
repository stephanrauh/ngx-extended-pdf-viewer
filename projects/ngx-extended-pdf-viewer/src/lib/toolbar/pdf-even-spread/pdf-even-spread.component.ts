import { Component } from '@angular/core';
import { SpreadMode } from '../../options/pdf-spread-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-even-spread',
  templateUrl: './pdf-even-spread.component.html',
  styleUrls: ['./pdf-even-spread.component.css'],
})
export class PdfEvenSpreadComponent {
  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchspreadmode', { mode: SpreadMode.EVEN });
  }
}
