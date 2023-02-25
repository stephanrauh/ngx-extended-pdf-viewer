import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-editor',
  templateUrl: './pdf-editor.component.html',
  styleUrls: ['./pdf-editor.component.css'],
})
export class PdfEditorComponent {
  @Input()
  public showEditorDraw: ResponsiveVisibility = true;

  @Input()
  public showEditorText: ResponsiveVisibility = true;
}
