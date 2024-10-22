import { Component, computed, inject, input, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AsyncPipe, LowerCasePipe, NgTemplateOutlet } from '@angular/common';
import { MarkdownContentComponent } from '../markdown-content.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { toSignal } from '@angular/core/rxjs-interop';
import { TabsComponent } from '../tabs/tabs.component';
import { TabPanelComponent } from '../tabs/tab-panel.component';
import { Tab } from '../../types/tab.type';

@Component({
  selector: 'pvs-content-page',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    MarkdownContentComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    TabsComponent,
    TabPanelComponent,
    TabsComponent,
    TabPanelComponent,
    NgTemplateOutlet,
    LowerCasePipe,
  ],
  templateUrl: './content-page.component.html',
  preserveWhitespaces: true,
})
export class ContentPageComponent {
  private activatedRoute = inject(ActivatedRoute);

  private data = toSignal(this.activatedRoute.data);

  demoTemplate = input<TemplateRef<any> | null>(null);
  otherTabs = input<Tab[]>([]);

  pageTitle = computed(() => {
    const data = this.data();
    if (!data) {
      return '';
    }
    return data['pageTitle'];
  });
}
