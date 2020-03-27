import { Component, OnInit } from '@angular/core';
import { IPDFViewerApplication } from '../../../options/pdf-viewer-application';

@Component({
  selector: 'pdf-last-page',
  templateUrl: './pdf-last-page.component.html',
  styleUrls: ['./pdf-last-page.component.css']
})
export class PdfLastPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public lastPage(): void {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    PDFViewerApplication.eventBus.dispatch('lastpage');
  }
}
