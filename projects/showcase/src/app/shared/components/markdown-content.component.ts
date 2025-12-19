import { Component, computed, inject, input, PLATFORM_ID } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { APP_BASE_HREF, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'pvs-markdown',
    imports: [MarkdownComponent],
    template: ` <markdown [src]="fullSrc()" [data]="data()"></markdown> `
})
export class MarkdownContentComponent {
  private baseHref = inject(APP_BASE_HREF);
  private platformId = inject(PLATFORM_ID);

  src = input<string>();
  data = input<string>();

  fullSrc = computed(() => {
    if (this.baseHref === '/' || !isPlatformBrowser(this.platformId)) {
      return this.src();
    }

    return `${this.baseHref}${this.src()?.substring(1)}`;
  });
}
