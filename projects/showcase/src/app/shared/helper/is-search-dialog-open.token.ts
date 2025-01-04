import { InjectionToken, signal } from '@angular/core';

export const IS_SEARCH_DIALOG_OPEN = new InjectionToken('', {
  providedIn: 'root',
  factory: () => signal(false),
});
