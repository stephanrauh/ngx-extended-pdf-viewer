import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdf-light-theme',
  templateUrl: './pdf-light-theme.component.html',
  styleUrls: ['./colors.scss', '../common/print.scss', '../common/xfa_layer_builder.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PdfLightThemeComponent {}
