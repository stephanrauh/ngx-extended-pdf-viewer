import { Injectable } from '@angular/core';
import { TrustedTypesWindow } from 'trusted-types/lib';

@Injectable({
  providedIn: 'root',
})
export class PdfCspPolicyService {
  private sanitizer: any = undefined; // TrustedTypePolicy;

  constructor() {
    const ttWindow = window as unknown as TrustedTypesWindow;
    if (ttWindow.trustedTypes) {
      this.sanitizer = ttWindow.trustedTypes.createPolicy('pdf-viewer', {
        createHTML: (input) => input,
        createScriptURL: (input) => input,
      });
    }
    (window as any).pdfViewerSanitizer = this.sanitizer;
  }

  public addTrustedCSS(styles: HTMLElement, css: string) {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }
    if (this.sanitizer) {
      styles.textContent = this.sanitizer.createHTML(css) as unknown as any;
    } else {
      styles.textContent = css;
    }
  }

  public addTrustedJavaScript(scripts: HTMLScriptElement, css: string) {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }
    if (this.sanitizer) {
      scripts.src = this.sanitizer.createScriptURL(css) as unknown as any;
    } else {
      scripts.src = css;
    }
  }
}
