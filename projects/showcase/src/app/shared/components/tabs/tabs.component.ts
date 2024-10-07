import { AfterViewInit, Component, contentChildren, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TabPanelComponent } from './tab-panel.component';
import { TabButtonIdPipe } from './pipes/tab-button-id.pipe';
import { TabIndexPipe } from './pipes/tab-index.pipe';
import { TabService } from './services/tab.service';

@Component({
  selector: 'pvs-tabs',
  standalone: true,
  imports: [NgClass, TabButtonIdPipe, TabButtonIdPipe, TabIndexPipe],
  template: `
    <div role="tablist" class="min-w-full inline-flex gap-6 flex-wrap border-b mb-4">
      @for (tab of tabs(); track tab; let i = $index) {
        <button
          [id]="tab.key() | tabButtonId"
          type="button"
          role="tab"
          [attr.aria-controls]="tab.key()"
          [attr.tabindex]="tab.isActive() | tabIndex"
          [attr.aria-selected]="tab.isActive()"
          (click)="onChangeTab(tab)"
          class="aria-selected:text-secondary-variant-light font-semibold p aria-selected:border-b aria-selected:border-b-secondary-variant-light pb-2 pt-2 ps-4 pe-4"
        >
          <span>{{ tab.header() }}</span>
        </button>
      }
    </div>

    <div>
      <ng-content />
    </div>
  `,
  host: {
    class: 'min-w-full block border ps-6 pe-6 pt-2 pb-4',
  },
  providers: [TabService],
})
export class TabsComponent implements AfterViewInit {
  private tabService = inject(TabService);

  public tabs = contentChildren<TabPanelComponent>(TabPanelComponent);

  onChangeTab(tab: TabPanelComponent) {
    this.tabService.onChangeTab(tab.key());
  }

  ngAfterViewInit() {
    const firstTab = this.tabs().at(0);
    if (!firstTab) {
      return;
    }
    this.onChangeTab(firstTab);
  }
}
