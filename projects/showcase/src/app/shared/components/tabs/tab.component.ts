import { Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { TabButtonIdPipe } from './pipes/tab-button-id.pipe';
import { TabIndexPipe } from './pipes/tab-index.pipe';
import { TabPanelComponent } from './tab-panel.component';
import { TabService } from './services/tab.service';

@Component({
  selector: 'pvs-tab',
  standalone: true,
  imports: [TabButtonIdPipe, TabIndexPipe],
  template: ` <button
    #tab
    [id]="tabKey() | tabButtonId"
    type="button"
    role="tab"
    [attr.tabindex]="isActive() | tabIndex"
    [attr.aria-controls]="tabKey()"
    [attr.aria-selected]="isActive()"
    (click)="onChangeTab()"
    class="aria-selected:text-primary-light dark:aria-selected:text-primary-dark font-semibold p aria-selected:border-b aria-selected:border-b-primary-variant-light dark:aria-selected:border-b-primary-variant-dark pb-2 pt-2 ps-4 pe-4"
  >
    <span>{{ header() }}</span>
  </button>`,
})
export class TabComponent implements FocusableOption {
  private tabService = inject(TabService);
  private element = viewChild<ElementRef>('tab');

  tab = input.required<TabPanelComponent>();
  tabKey = computed(() => this.tab().key());
  isActive = computed(() => this.tab().isActive());
  header = computed(() => this.tab().header());

  focus(): void {
    this.onChangeTab();
    this.element()?.nativeElement?.focus();
  }

  getLabel?(): string {
    return this.header();
  }

  onChangeTab() {
    this.tabService.onChangeTab(this.tab().key());
  }
}
