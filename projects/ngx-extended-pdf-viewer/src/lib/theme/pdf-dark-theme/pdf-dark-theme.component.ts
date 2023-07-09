import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { addTrustedHTML } from '../sanitized-css-injector';
import { css } from './colors-css';

@Component({
  selector: 'pdf-dark-theme',
  templateUrl: './pdf-dark-theme.component.html',
  // styleUrls: ['./colors.scss', '../common/print.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class PdfDarkThemeComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {}

  public ngOnInit() {
    this.injectStyle();
  }

  private injectStyle() {
    const styles = this.document.createElement('STYLE') as HTMLStyleElement;
    styles.id = 'pdf-theme-css';
    addTrustedHTML(styles, css);
    this.renderer.appendChild(this.document.head, styles);
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-theme-css') as HTMLElement;
    styles?.parentElement?.removeChild(styles);
  }
}
