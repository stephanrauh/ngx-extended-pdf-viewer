import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdf-dark-theme',
  templateUrl: './pdf-dark-theme.component.html',
  styleUrls: ['./colors.scss', '../common/print.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PdfDarkThemeComponent {}
