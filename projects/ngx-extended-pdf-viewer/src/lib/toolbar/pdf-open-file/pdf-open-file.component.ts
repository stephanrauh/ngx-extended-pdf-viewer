import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-open-file',
  templateUrl: './pdf-open-file.component.html',
  styleUrls: ['./pdf-open-file.component.css'],
})
export class PdfOpenFileComponent {
  @Input()
  public showOpenFileButton: ResponsiveVisibility = true;
}
