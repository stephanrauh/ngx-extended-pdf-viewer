import { Component, input, TemplateRef } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-findbar',
    templateUrl: './pdf-findbar.component.html',
    styleUrls: ['./pdf-findbar.component.css'],
    standalone: false
})
export class PdfFindbarComponent {
  public showFindButton = input<ResponsiveVisibility>(true);

  public mobileFriendlyZoomScale = input.required<number>();

  public findbarLeft = input<string | undefined>(undefined);

  public findbarTop = input<string | undefined>(undefined);

  /* UI templates */
  public customFindbarInputArea = input<TemplateRef<any> | undefined>(undefined);

  public customFindbar = input<TemplateRef<any> | undefined>(undefined);

  public customFindbarButtons = input<TemplateRef<any> | undefined>(undefined);

  public showFindHighlightAll = input<boolean>(true);

  public showFindMatchCase = input<boolean>(true);

  public showFindEntireWord = input<boolean>(true);

  public showFindMatchDiacritics = input<boolean>(true);

  public showFindResultsCount = input<boolean>(true);

  public showFindMessages = input<boolean>(true);

  public showFindMultiple = input<boolean>(true);

  public showFindRegexp = input<boolean>(true);
}
