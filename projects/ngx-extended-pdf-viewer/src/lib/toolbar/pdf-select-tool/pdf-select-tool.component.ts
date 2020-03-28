import { PdfCursorTools } from './../../options/pdf-cursor-tools';
import { Component, Input } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-select-tool',
  templateUrl: './pdf-select-tool.component.html',
  styleUrls: ['./pdf-select-tool.component.css']
})
export class PdfSelectToolComponent  {
  @Input()
  public showSelectToolButton = true;

  constructor() {
  }

  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', {tool: PdfCursorTools.SELECT});
  }
}
