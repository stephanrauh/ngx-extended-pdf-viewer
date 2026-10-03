import { CSP_NONCE, Inject, Injectable, Optional } from '@angular/core';
import { TrustedTypesWindow } from 'trusted-types/lib';

@Injectable({
  providedIn: 'root',
})
export class PdfCspPolicyService {
  private sanitizer: any = undefined; // TrustedTypePolicy;

  constructor(@Inject(CSP_NONCE) @Optional() private readonly nonce?: string | null) {}

  public init() {
    /* istanbul ignore next -- SSR guard, untestable in JSDOM */
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
    /* istanbul ignore next -- SSR guard, untestable in JSDOM */
    if (typeof window === 'undefined') {
      // server-side rendering
      return;
    }
    this.init();
    // #3264 modified by ngx-extended-pdf-viewer
    // A <style> element is subject to `style-src`, so an application that replaces
    // 'unsafe-inline' with a nonce needs the nonce on every stylesheet we create -
    // pdf.js's `@page { size: ... }` print stylesheet included, which is otherwise
    // dropped and makes the printout fall back to the browser's paper size.
    if (this.nonce) {
      (styles as HTMLStyleElement).nonce = this.nonce;
    }
    // #3264 end of modification by ngx-extended-pdf-viewer
    if (this.sanitizer) {
      styles.textContent = this.sanitizer.createHTML(css) as unknown as any;
    } else {
      styles.textContent = css;
    }
  }

  public addTrustedJavaScript(scripts: HTMLScriptElement, css: string) {
    /* istanbul ignore next -- SSR guard, untestable in JSDOM */
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
    /* istanbul ignore next -- SSR guard, untestable in JSDOM */
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
    /* istanbul ignore next -- SSR guard, untestable in JSDOM */
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

  public generateTrustedURL(sourcePath: string) {
    /* istanbul ignore next -- SSR guard, untestable in JSDOM */
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
