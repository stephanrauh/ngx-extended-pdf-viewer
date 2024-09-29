import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isOpen = signal(false);
  public isOpen = this._isOpen.asReadonly();

  public toggle() {
    this._isOpen.update((isOpen) => !isOpen);
  }

  public close() {
    this._isOpen.set(false);
  }
}
