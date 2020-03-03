import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-print',
  templateUrl: './pdf-print.component.html',
  styleUrls: ['./pdf-print.component.css']
})
export class PdfPrintComponent {
  @Input()
  public showPrintButton = true;
}
