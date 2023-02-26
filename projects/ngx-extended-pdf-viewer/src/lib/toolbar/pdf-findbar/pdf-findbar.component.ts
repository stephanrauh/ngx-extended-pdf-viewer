import { Component, Input, TemplateRef } from '@angular/core';
import { getVersionSuffix, pdfDefaultOptions } from '../../options/pdf-default-options';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-findbar',
  templateUrl: './pdf-findbar.component.html',
  styleUrls: ['./pdf-findbar.component.css'],
})
export class PdfFindbarComponent {
  @Input()
  public showFindButton: ResponsiveVisibility = true;

  @Input()
  public mobileFriendlyZoomScale: number;

  @Input()
  public findbarLeft: string | undefined;

  @Input()
  public findbarTop: string | undefined;

  /* UI templates */
  @Input()
  public customFindbarInputArea: TemplateRef<any> | undefined;

  @Input()
  public customFindbar: TemplateRef<any>;

  @Input()
  public customFindbarButtons: TemplateRef<any> | undefined;

  @Input()
  public showFindHighlightAll = true;

  @Input()
  public showFindMatchCase = true;

  @Input()
  public showFindCurrentPageOnly = true;

  @Input()
  public showFindPageRange = true;

  @Input()
  public showFindEntireWord = true;

  @Input()
  public showFindEntirePhrase = true;

  @Input()
  public showFindIgnoreAccents = true;

  @Input()
  public showFindFuzzySearch = true;

  @Input()
  public showFindResultsCount = true;

  @Input()
  public showFindMessages = true;

  public pdfJsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
}
