import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _isOpen = signal(false);
  public isOpen = computed(() => this._isOpen());

  public open() {
    this._isOpen.set(true);
  }

  public close() {
    this._isOpen.set(false);
  }
}
