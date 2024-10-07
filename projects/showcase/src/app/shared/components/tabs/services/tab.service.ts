import { Injectable, signal } from '@angular/core';

@Injectable()
export class TabService {
  public activeTabKey = signal('');

  public onChangeTab(tab: string) {
    this.activeTabKey.set(tab);
  }
}
