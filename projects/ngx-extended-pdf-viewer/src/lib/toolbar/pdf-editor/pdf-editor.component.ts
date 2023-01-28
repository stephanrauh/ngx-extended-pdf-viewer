import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-editor',
  templateUrl: './pdf-editor.component.html',
  styleUrls: ['./pdf-editor.component.css'],
})
export class PdfEditorComponent {
  @Input()
  public showEditor = true;
}
