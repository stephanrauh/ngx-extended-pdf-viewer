import { Directive, inject, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';

@Directive({
  selector: '[pvsSetDefaultViewerHeight]',
  standalone: true,
})
export class SetDefaultViewerHeightDirective implements OnInit {
  private pdfViewer = inject(NgxExtendedPdfViewerComponent);

  ngOnInit() {
    this.pdfViewer.height = '500px';
  }
}
