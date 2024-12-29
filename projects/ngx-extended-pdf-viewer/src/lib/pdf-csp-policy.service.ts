import { CSP_NONCE, Inject, Injectable } from '@angular/core';
import { TrustedTypesWindow } from 'trusted-types/lib';

@Injectable({
  providedIn: 'root',
})
export class PdfCspPolicyService {
  private sanitizer: any = undefined; // TrustedTypePolicy;

  @Inject(CSP_NONCE) private csp_nonce: string | null | undefined;

  constructor() {}

  public init() {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }
    if (this.sanitizer) {
      // already initialized
      return;
    }
    const ttWindow = globalThis as unknown as TrustedTypesWindow;
    if (ttWindow.trustedTypes) {
      this.sanitizer = ttWindow.trustedTypes.createPolicy('pdf-viewer', {
        createHTML: (input) => input,
        createScriptURL: (input) => input,
      });
    }
  }

  public addTrustedCSS(styles: HTMLElement, css: string) {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }
    this.init();
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
    this.init();
    if (this.sanitizer) {
      scripts.src = this.sanitizer.createScriptURL(css) as unknown as any;
    } else {
      scripts.src = css;
    }
  }

  public sanitizeHTML(html: string): string {
    if (typeof window === 'undefined') {
      // server-side rendering
      return '';
    }
    this.init();
    if (this.sanitizer) {
      return this.sanitizer.createHTML(html) as unknown as any;
    } else {
      return html;
    }
  }
  public addTrustedHTML(element: HTMLElement, html: string) {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }
    this.init();
    if (this.sanitizer) {
      element.innerHTML = this.sanitizer.createHTML(html) as unknown as any;
    } else {
      element.innerHTML = html;
    }
  }

  public createTrustedHTML(html: string) {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }
    this.init();
    if (this.sanitizer) {
      return this.sanitizer.createHTML(html) as unknown as any;
    } else {
      return html;
    }
  }

  public generateTrustedURL(sourcePath) {
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }
    this.init();
    if (this.sanitizer) {
      return this.sanitizer.createScriptURL(sourcePath);
    }
    return sourcePath;
  }
}
