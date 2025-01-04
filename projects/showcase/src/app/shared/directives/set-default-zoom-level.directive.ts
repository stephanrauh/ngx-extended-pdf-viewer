import { Directive, inject, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';

@Directive({
  selector: '[pvsSetDefaultZoomLevel]',
  standalone: true,
})
export class SetDefaultZoomLevelDirective implements OnInit {
  private pdfViewer = inject(NgxExtendedPdfViewerComponent);

  ngOnInit() {
    this.pdfViewer.zoom = 'page-width';
  }
}
