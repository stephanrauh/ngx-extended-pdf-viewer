import { Injectable, signal } from '@angular/core';

@Injectable()
export class TabService {
  private readonly _activeTabKey = signal('');
  readonly activeTabKey = this._activeTabKey.asReadonly();

  onChangeTab(tab: string) {
    this._activeTabKey.set(tab);
  }
}
