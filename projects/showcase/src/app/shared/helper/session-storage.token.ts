import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const SESSION_STORAGE = new InjectionToken<Storage | null>('SESSION_STORAGE', {
  providedIn: 'root',
  factory: () => getStorage(inject(PLATFORM_ID)),
});

const getStorage = (platformId: Object): Storage | null => {
  // Prerendering: sessionStorage is undefined for prerender build
  return isPlatformBrowser(platformId) ? sessionStorage : null;
};
