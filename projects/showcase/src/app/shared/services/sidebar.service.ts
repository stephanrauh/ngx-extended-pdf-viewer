import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isOpen = signal(false);
  isOpen = this._isOpen.asReadonly();

  toggle() {
    this._isOpen.update((isOpen) => !isOpen);
  }

  close() {
    this._isOpen.set(false);
  }
}
