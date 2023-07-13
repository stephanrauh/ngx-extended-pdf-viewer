import { Component } from '@angular/core';
import { SpreadMode } from '../../options/pdf-spread-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-no-spread',
  templateUrl: './pdf-no-spread.component.html',
  styleUrls: ['./pdf-no-spread.component.css'],
})
export class PdfNoSpreadComponent {
  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchspreadmode', { mode: SpreadMode.NONE });
  }
}
