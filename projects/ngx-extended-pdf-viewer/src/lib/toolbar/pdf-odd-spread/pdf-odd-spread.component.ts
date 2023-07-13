import { Component } from '@angular/core';
import { SpreadMode } from '../../options/pdf-spread-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-odd-spread',
  templateUrl: './pdf-odd-spread.component.html',
  styleUrls: ['./pdf-odd-spread.component.css'],
})
export class PdfOddSpreadComponent {
  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchspreadmode', { mode: SpreadMode.ODD });
  }
}
