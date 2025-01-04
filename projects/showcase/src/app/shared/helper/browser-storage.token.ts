import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const BROWSER_STORAGE = new InjectionToken<Storage | null>('LOCAL_STORAGE', {
  providedIn: 'root',
  factory: () => getStorage(inject(PLATFORM_ID)),
});

const getStorage = (platformId: Object): Storage | null => {
  // Prerendering: localStorage is undefined for prerender build
  return isPlatformBrowser(platformId) ? localStorage : null;
};
