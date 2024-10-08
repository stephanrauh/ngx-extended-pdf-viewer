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
    class="aria-selected:text-primary-variant-light font-semibold p aria-selected:border-b aria-selected:border-b-primary-variant-light pb-2 pt-2 ps-4 pe-4"
  >
    <span>{{ header() }}</span>
  </button>`,
})
export class TabComponent implements FocusableOption {
  private tabService = inject(TabService);
  private element = viewChild<ElementRef>('tab');

  public tab = input.required<TabPanelComponent>();
  public tabKey = computed(() => this.tab().key());
  public isActive = computed(() => this.tab().isActive());
  public header = computed(() => this.tab().header());

  focus(): void {
    this.tabService.onChangeTab(this.tab().key());
    this.element()?.nativeElement?.focus();
  }

  getLabel?(): string {
    return this.header();
  }

  onChangeTab() {
    this.tabService.onChangeTab(this.tab().key());
  }
}
