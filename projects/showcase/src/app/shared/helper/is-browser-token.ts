import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Checks if the code is running in a browser environment.
 */
export const IS_BROWSER = new InjectionToken<boolean>('IS_BROWSER', {
  providedIn: 'root',
  factory: () => isBrowser(inject(PLATFORM_ID)),
});

function isBrowser(platformId: Object): boolean {
  return isPlatformBrowser(platformId);
}
