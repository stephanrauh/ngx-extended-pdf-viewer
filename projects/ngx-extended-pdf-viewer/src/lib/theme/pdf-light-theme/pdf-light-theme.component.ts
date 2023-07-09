import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { addTrustedHTML as addSanitizedHTML } from '../sanitized-css-injector';
import { css } from './colors-css';

@Component({
  selector: 'pdf-light-theme',
  templateUrl: './pdf-light-theme.component.html',
  // styleUrls: ['./colors.scss', '../common/print.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class PdfLightThemeComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: any) {}

  public ngOnInit() {
    this.injectStyle();
  }

  private injectStyle() {
    const styles = this.document.createElement('STYLE') as HTMLStyleElement;
    styles.id = 'pdf-theme-css';
    addSanitizedHTML(styles, css);
    this.renderer.appendChild(this.document.head, styles);
  }

  public ngOnDestroy() {
    const styles = this.document.getElementById('pdf-theme-css') as HTMLElement;
    styles?.parentElement?.removeChild(styles);
  }
}
