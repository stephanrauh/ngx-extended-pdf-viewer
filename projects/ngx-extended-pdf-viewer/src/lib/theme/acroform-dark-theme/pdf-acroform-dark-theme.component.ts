import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { css } from './pdf-acroform-dark-colors-css';

@Component({
  selector: 'pdf-acroform-dark-theme',
  template: '',
  styleUrls: [
    //'./pdf-acroform-dark-colors.scss',
    //'../common/annotation-layer-builder.scss',
    //'../common/xfa_layer_builder.scss',
    //'../common/annotation_editor_layer_builder.css',
  ],
  // encapsulation: ViewEncapsulation.None,
})
export class PdfAcroformDarkThemeComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {}

  public ngOnInit() {
    this.injectStyle();
  }

  private injectStyle() {
    const styles = this.document.createElement('STYLE') as HTMLStyleElement;
    styles.id = 'pdf-acroform-css';
    styles.innerHTML = css;
    this.renderer.appendChild(this.document.head, styles);
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-acroform-css') as HTMLElement;
    if (styles && styles.parentElement) {
      (styles.parentElement as any).removeChild(styles);
    }
  }
}
