import { Component, Input } from '@angular/core';
import { ScrollMode } from '../../options/pdf-scroll-mode';
import { ScrollModeType } from '../../options/pdf-viewer';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-wrapped-scroll-mode',
  templateUrl: './pdf-wrapped-scroll-mode.component.html',
  styleUrls: ['./pdf-wrapped-scroll-mode.component.css'],
})
export class PdfWrappedScrollModeComponent {
  @Input()
  public scrollMode: ScrollModeType;

  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchscrollmode', { mode: ScrollMode.WRAPPED });
  }
}
