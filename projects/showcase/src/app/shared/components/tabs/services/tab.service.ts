import { Injectable, signal } from '@angular/core';

@Injectable()
export class TabService {
  activeTabKey = signal('');

  onChangeTab(tab: string) {
    this.activeTabKey.set(tab);
  }
}
