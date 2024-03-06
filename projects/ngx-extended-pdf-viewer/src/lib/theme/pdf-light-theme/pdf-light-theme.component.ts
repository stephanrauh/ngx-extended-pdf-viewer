import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { PdfCspPolicyService } from '../../pdf-csp-policy.service';
import { css } from './colors-css';

@Component({
  selector: 'pdf-light-theme',
  templateUrl: './pdf-light-theme.component.html',
  // styleUrls: ['./colors.scss', '../common/print.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class PdfLightThemeComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any, private pdfCspPolicyService: PdfCspPolicyService) {}

  public ngOnInit() {
    this.injectStyle();
  }

  private injectStyle() {
    const styles = this.document.createElement('STYLE') as HTMLStyleElement;
    styles.id = 'pdf-theme-css';
    this.pdfCspPolicyService.addTrustedHTML(styles, css);
    this.renderer.appendChild(this.document.head, styles);
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-theme-css') as HTMLElement;
    styles?.parentElement?.removeChild(styles);
  }
}
