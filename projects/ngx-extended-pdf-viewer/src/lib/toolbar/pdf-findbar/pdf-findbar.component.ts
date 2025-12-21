import { Component, Input, TemplateRef } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-findbar',
    templateUrl: './pdf-findbar.component.html',
    styleUrls: ['./pdf-findbar.component.css'],
    standalone: false
})
export class PdfFindbarComponent {
  @Input()
  public showFindButton: ResponsiveVisibility = true;

  @Input()
  public mobileFriendlyZoomScale!: number;

  @Input()
  public findbarLeft: string | undefined;

  @Input()
  public findbarTop: string | undefined;

  /* UI templates */
  @Input()
  public customFindbarInputArea: TemplateRef<any> | undefined;

  @Input()
  public customFindbar!: TemplateRef<any>;

  @Input()
  public customFindbarButtons: TemplateRef<any> | undefined;

  @Input()
  public showFindHighlightAll = true;

  @Input()
  public showFindMatchCase = true;

  @Input()
  public showFindEntireWord = true;

  @Input()
  public showFindMatchDiacritics = true;

  @Input()
  public showFindResultsCount = true;

  @Input()
  public showFindMessages = true;

  @Input()
  public showFindMultiple: boolean = true;

  @Input()
  public showFindRegexp: boolean = true;
}
