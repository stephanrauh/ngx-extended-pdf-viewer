import { DOCUMENT } from '@angular/common';
import { Component, CSP_NONCE, Inject, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { PdfCspPolicyService } from '../../pdf-csp-policy.service';
import { css } from './pdf-acroform-default-colors-css';

@Component({
  selector: 'pdf-acroform-default-theme',
  template: '',
  styleUrls: [
    //    './pdf-acroform-default-colors.scss',
    //    '../common/annotation-layer-builder.scss',
    //    '../common/xfa_layer_builder.scss',
    //    '../common/annotation_editor_layer_builder.css',
  ],
  //  encapsulation: ViewEncapsulation.None,
})
export class PdfAcroformDefaultThemeComponent implements OnInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any,
    private pdfCspPolicyService: PdfCspPolicyService,
    @Inject(CSP_NONCE) @Optional() private nonce?: string | null
  ) {}

  public ngOnInit() {
    this.injectStyle();
  }

  private injectStyle() {
    const styles = this.document.createElement('STYLE') as HTMLStyleElement;
    styles.id = 'pdf-acroform-css';

    if (this.nonce) {
      styles.nonce = this.nonce;
    }

    this.pdfCspPolicyService.addTrustedHTML(styles, css);
    this.renderer.appendChild(this.document.head, styles);
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-acroform-css') as HTMLElement;
    styles?.parentElement?.removeChild(styles);
  }
}
