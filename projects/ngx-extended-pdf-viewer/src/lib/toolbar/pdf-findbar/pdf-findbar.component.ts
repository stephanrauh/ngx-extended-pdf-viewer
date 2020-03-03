import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'pdf-findbar',
  templateUrl: './pdf-findbar.component.html',
  styleUrls: ['./pdf-findbar.component.css']
})
export class PdfFindbarComponent {
  @Input()
  public showFindButton = true;

  @Input()
  public mobileFriendlyZoomScale: number;

  @Input()
  public findbarLeft: string | undefined;

  @Input()
  public findbarTop: string | undefined;

  /* UI templates */
  @Input()
  public customFindbarInputArea: TemplateRef<any>;

  @Input()
  public customFindbar: TemplateRef<any>;

  @Input()
  public customFindbarButtons: TemplateRef<any>;
}
