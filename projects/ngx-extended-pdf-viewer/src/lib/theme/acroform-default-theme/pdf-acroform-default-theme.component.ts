import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdf-acroform-default-theme',
  template: '',
  styleUrls: [
    './pdf-acroform-default-colors.scss',
    '../common/annotation-layer-builder.scss',
    '../common/xfa_layer_builder.scss',
    '../common/annotation_editor_layer_builder.css',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class PdfAcroformDefaultThemeComponent {}
