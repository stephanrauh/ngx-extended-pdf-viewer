import { AfterViewInit, Component, contentChildren, inject, input, QueryList, ViewChildren } from '@angular/core';
import { TabPanelComponent } from './tab-panel.component';
import { TabService } from './services/tab.service';
import { TabComponent } from './tab.component';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { TAB_GROUP } from './tab-group.token';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pvs-tabs',
  standalone: true,
  imports: [TabComponent],
  template: `
    <div role="tablist" class="min-w-full inline-flex gap-6 flex-wrap border-b mb-4" (keydown)="onKeydown($event)">
      @for (tab of tabPanels(); track tab; let i = $index) {
        <pvs-tab [tab]="tab" />
      }
    </div>

    <div>
      <ng-content />
    </div>
  `,
  host: {
    class: 'min-w-full block pt-2 pb-4',
  },
  providers: [
    TabService,
    {
      provide: TAB_GROUP,
      useFactory: (component: TabsComponent) => component.group(),
      deps: [TabsComponent],
    },
  ],
})
export class TabsComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);
  @ViewChildren(TabComponent) tabs: QueryList<TabComponent>;
  group = input.required<string>();

  keyManager: FocusKeyManager<TabComponent>;
  tabPanels = contentChildren<TabPanelComponent>(TabPanelComponent);

  onKeydown(event: KeyboardEvent) {
    const { key } = event;
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      return;
    }

    // Prevent PDF Viewer from taking the focus
    if (key === 'Home' || key === 'End') {
      event.stopPropagation();
    }
    this.keyManager.onKeydown(event);
  }

  ngAfterViewInit() {
    this.keyManager = new FocusKeyManager<TabComponent>(this.tabs).withWrap().withHomeAndEnd().withHorizontalOrientation('ltr');

    const queryParams = { ...this.route.snapshot.queryParams };
    const activeTabKey: string | undefined = queryParams[`tab_${this.group()}`];
    if (!activeTabKey) {
      this.keyManager.setFirstItemActive();
      return;
    }
    const tabIdx = this.getTabIndexByKey(activeTabKey);
    this.keyManager.setActiveItem(tabIdx);
  }

  getTabIndexByKey(key: string): number {
    return this.tabs.toArray().findIndex((tab) => tab.tabKey() === key);
  }
}
