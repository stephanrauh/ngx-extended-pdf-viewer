import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const WINDOW = new InjectionToken<Window | null>('WindowToken', {
  factory: () => {
    const platform = inject(PLATFORM_ID);
    return isPlatformBrowser(platform) ? window : null;
  },
});
