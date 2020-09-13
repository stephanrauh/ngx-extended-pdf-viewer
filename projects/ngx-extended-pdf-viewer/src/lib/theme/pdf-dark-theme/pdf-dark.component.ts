import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdf-dark-theme',
  templateUrl: './pdf-dark.component.html',
  styleUrls: ['colors.scss', './viewer-with-images.scss', './ngx-extended-pdf-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PdfDarkComponent {}
