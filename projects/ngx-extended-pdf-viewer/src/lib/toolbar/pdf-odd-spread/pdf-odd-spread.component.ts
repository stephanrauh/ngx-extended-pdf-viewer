import { Component, Input } from '@angular/core';
import { SpreadMode } from '../../options/pdf-spread-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { SpreadType } from '../../options/spread-type';

@Component({
  selector: 'pdf-odd-spread',
  templateUrl: './pdf-odd-spread.component.html',
  styleUrls: ['./pdf-odd-spread.component.css'],
})
export class PdfOddSpreadComponent {
  @Input()
  public spread: SpreadType = 'off';

  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchspreadmode', { mode: SpreadMode.ODD });
  }
}
