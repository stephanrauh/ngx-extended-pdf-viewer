import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-document-properties',
    templateUrl: './pdf-document-properties.component.html',
    styleUrls: ['./pdf-document-properties.component.css'],
    standalone: false
})
export class PdfDocumentPropertiesComponent {
  @Input()
  public show: ResponsiveVisibility = true;
}
