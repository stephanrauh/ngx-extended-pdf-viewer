import { Component, input, TemplateRef } from '@angular/core';

@Component({
    selector: 'pdf-find-input-area',
    templateUrl: './pdf-find-input-area.component.html',
    styleUrls: ['./pdf-find-input-area.component.css'],
    standalone: false
})
export class PdfFindInputAreaComponent {
  public customFindbarInputArea = input<TemplateRef<any> | undefined>(undefined);
}
