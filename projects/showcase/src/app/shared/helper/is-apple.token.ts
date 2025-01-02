import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID, signal, WritableSignal } from '@angular/core';

export const IS_APPLE = new InjectionToken<WritableSignal<boolean>>('isApple', {
  providedIn: 'root',
  factory: () => {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    const isApple = typeof window !== 'undefined' && (/iPad|iPhone/.test(window.navigator.userAgent) || window.navigator.userAgent.includes('Mac'));
    return signal((isBrowser && isApple) ?? '');
  },
});
