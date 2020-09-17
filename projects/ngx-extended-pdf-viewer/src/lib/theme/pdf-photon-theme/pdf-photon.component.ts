import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdf-photon-theme',
  templateUrl: './pdf-photon.component.html',
  styleUrls: ['colors.scss', '../common/viewer-with-images.scss', '../common/ngx-extended-pdf-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PdfPhotonComponent {}
