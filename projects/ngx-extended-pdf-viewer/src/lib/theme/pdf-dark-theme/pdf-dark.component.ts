import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdf-dark-theme',
  templateUrl: './pdf-dark.component.html',
  styleUrls: ['colors.scss', '../common/viewer-with-images.scss', '../common/ngx-extended-pdf-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PdfDarkComponent {}
