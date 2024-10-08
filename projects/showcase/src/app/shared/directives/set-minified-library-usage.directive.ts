import { Directive, inject, OnInit } from '@angular/core';
import { EnvironmentService } from '../services/environment.service';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';

@Directive({
  selector: '[pvsSetMinifiedLibraryUsage]',
  standalone: true,
})
export class SetMinifiedLibraryUsageDirective implements OnInit {
  private environment = inject(EnvironmentService);
  private pdfViewer = inject(NgxExtendedPdfViewerComponent);

  ngOnInit() {
    this.pdfViewer.minifiedJSLibraries = this.environment.get('minifiedJSLibraries');
  }
}
