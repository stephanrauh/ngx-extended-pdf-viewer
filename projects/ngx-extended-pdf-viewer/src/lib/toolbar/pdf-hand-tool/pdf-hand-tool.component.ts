import { PdfCursorTools } from './../../options/pdf-cursor-tools';
import { Component, Input } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-hand-tool',
  templateUrl: './pdf-hand-tool.component.html',
  styleUrls: ['./pdf-hand-tool.component.css']
})
export class PdfHandToolComponent  {
  @Input()
  public showHandToolButton = true;

  constructor() {
  }

  public onClick(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('switchcursortool', {tool: PdfCursorTools.HAND});
  }

}
