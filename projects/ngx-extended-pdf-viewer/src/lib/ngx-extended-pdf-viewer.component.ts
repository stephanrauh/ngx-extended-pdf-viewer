import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare var PDFJS: any;

@Component({
  selector: 'ngx-extended-pdf-viewer',
  templateUrl: './ngx-extended-pdf-viewer.component.html',
  styleUrls: ['../assets/viewer.css', './ngx-extended-pdf-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NgxExtendedPdfViewerComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const file = '/assets/example.pdf';
    // This initializes the webviewer, the file may be passed in to it to initialize the viewer with a pdf directly
    PDFJS.webViewerLoad();
    (<any>window).workerSrc = 'pdf.worker.js';

    // open a file in the viewer
    (<any>window).PDFViewerApplication.open(file);
  }
}
