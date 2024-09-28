import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _isOpen = signal(false);
  public isOpen = this._isOpen.asReadonly();

  public open() {
    this._isOpen.set(true);
  }

  public close() {
    this._isOpen.set(false);
  }
}
