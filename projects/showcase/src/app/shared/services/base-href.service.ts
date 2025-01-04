import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseHrefService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  public getBaseHref(): string {
    if (isPlatformBrowser(this.platformId)) {
      const baseElement: HTMLBaseElement | null = document.querySelector('base');
      if (baseElement) {
        const href = baseElement.getAttribute('href') ?? '';
        if (href === '/') {
          return '';
        }
        return href;
      }
      return '';
    }
    // Return a default value when rendering on the server
    return '';
  }
}
