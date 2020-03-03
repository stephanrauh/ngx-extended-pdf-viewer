import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-open-file',
  templateUrl: './pdf-open-file.component.html',
  styleUrls: ['./pdf-open-file.component.css']
})
export class PdfOpenFileComponent  {
  @Input()
  public showOpenFileButton = true;
}
