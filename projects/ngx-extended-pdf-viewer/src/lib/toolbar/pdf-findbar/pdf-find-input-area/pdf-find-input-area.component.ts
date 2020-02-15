import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'pdf-find-input-area',
  templateUrl: './pdf-find-input-area.component.html',
  styleUrls: ['./pdf-find-input-area.component.css']
})
export class PdfFindInputAreaComponent {
  @Input()
  public customFindbarInputArea: TemplateRef<any>;

  constructor() {}
}
