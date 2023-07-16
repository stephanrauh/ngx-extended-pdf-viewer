import { Component, Input } from '@angular/core';
import { SpreadMode } from '../../options/pdf-spread-mode';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { SpreadType } from '../../options/spread-type';

@Component({
  selector: 'pdf-no-spread',
  templateUrl: './pdf-no-spread.component.html',
  styleUrls: ['./pdf-no-spread.component.css'],
})
export class PdfNoSpreadComponent {
  @Input()
  public spread: SpreadType = 'off';

  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchspreadmode', { mode: SpreadMode.NONE });
  }
}
