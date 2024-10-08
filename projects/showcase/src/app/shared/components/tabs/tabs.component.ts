import { AfterViewInit, Component, contentChildren, QueryList, ViewChildren } from '@angular/core';
import { NgClass } from '@angular/common';
import { TabPanelComponent } from './tab-panel.component';
import { TabButtonIdPipe } from './pipes/tab-button-id.pipe';
import { TabIndexPipe } from './pipes/tab-index.pipe';
import { TabService } from './services/tab.service';
import { TabComponent } from './tab.component';
import { FocusKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'pvs-tabs',
  standalone: true,
  imports: [NgClass, TabButtonIdPipe, TabButtonIdPipe, TabIndexPipe, TabComponent],
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
    class: 'min-w-full block ps-6 pe-6 pt-2 pb-4',
  },
  providers: [TabService],
})
export class TabsComponent implements AfterViewInit {
  @ViewChildren(TabComponent) tabs: QueryList<TabComponent>;

  public keyManager: FocusKeyManager<TabComponent>;
  public tabPanels = contentChildren<TabPanelComponent>(TabPanelComponent);

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
    this.keyManager.setFirstItemActive();
  }
}
