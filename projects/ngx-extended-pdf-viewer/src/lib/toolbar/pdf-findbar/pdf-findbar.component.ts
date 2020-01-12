import { Component, Input } from '@angular/core';

@Component({
  selector: 'pdf-findbar',
  templateUrl: './pdf-findbar.component.html',
  styleUrls: ['./pdf-findbar.component.css']
})
export class PdfFindbarComponent  {
  @Input()
  public showFindButton: boolean;

  @Input()
  public mobileFriendlyZoomScale: number;

  @Input()
  public findbarLeft: string | undefined;

  @Input()
  public findbarTop: string | undefined;
}
