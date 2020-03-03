import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css']
})
export class PdfDownloadComponent {
  @Input()
  public showDownloadButton = true;
}
