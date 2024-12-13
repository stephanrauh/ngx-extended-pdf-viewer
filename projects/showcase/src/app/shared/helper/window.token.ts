import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('WINDOW');

export function windowProvider(document: Document) {
  return document.defaultView;
}
