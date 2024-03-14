import { DOCUMENT } from '@angular/common';
import { Component, CSP_NONCE, Inject, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { PdfCspPolicyService } from '../../pdf-csp-policy.service';
import { css } from './colors-css';

@Component({
  selector: 'pdf-dark-theme',
  templateUrl: './pdf-dark-theme.component.html',
  // styleUrls: ['./colors.scss', '../common/print.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class PdfDarkThemeComponent implements OnInit, OnDestroy {
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
    styles.id = 'pdf-theme-css';

    if (this.nonce) {
      styles.nonce = this.nonce;
    }

    this.pdfCspPolicyService.addTrustedHTML(styles, css);
    this.renderer.appendChild(this.document.head, styles);
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-theme-css') as HTMLElement;
    styles?.parentElement?.removeChild(styles);
  }
}
