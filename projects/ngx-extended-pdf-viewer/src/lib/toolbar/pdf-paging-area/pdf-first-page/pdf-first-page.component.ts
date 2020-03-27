import { Component, OnInit } from '@angular/core';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-first-page',
  templateUrl: './pdf-first-page.component.html',
  styleUrls: ['./pdf-first-page.component.css']
})
export class PdfFirstPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  public firstPage(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('firstpage');
  }
}
