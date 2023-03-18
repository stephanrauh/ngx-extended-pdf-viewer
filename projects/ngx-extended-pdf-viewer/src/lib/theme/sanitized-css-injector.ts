import { TrustedTypesWindow } from 'trusted-types/lib';

export function addTrustedHTML(styles: HTMLStyleElement, css: string) {
  if (typeof window === 'undefined') {
    // server-side rendering
    return;
  }
  const ttWindow = window as unknown as TrustedTypesWindow;
  if (ttWindow.trustedTypes) {
    // Create a policy that can create TrustedHTML values
    // after sanitizing the input strings with DOMPurify library.
    const sanitizer = ttWindow.trustedTypes.createPolicy('foo', {
      createHTML: (input) => input,
    });

    styles.innerHTML = sanitizer.createHTML(css) as unknown as any; // Puts the sanitized value into the DOM.
  } else {
    styles.innerHTML = css;
  }
}
