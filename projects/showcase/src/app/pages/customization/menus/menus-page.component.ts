import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { TreeComponent } from './tree/tree.component';
import { FINDBAR, SECONDARY_TOOLBAR, TOOLBAR } from './tree-data';

@Component({
  selector: 'pvs-menus-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent, TreeComponent],
  template: `<pvs-content-page>
    <pvs-markdown src="/assets/pages/customization/menus/text.md" />

    <pvs-markdown src="/assets/pages/customization/menus/toolbar.md" />
    <pvs-tree [initialData]="TOOLBAR" />

    <pvs-markdown src="/assets/pages/customization/menus/findbar.md" />
    <pvs-tree [initialData]="FINDBAR" />

    <pvs-markdown src="/assets/pages/customization/menus/secondary-menu-v18.md" />

    <pvs-markdown src="/assets/pages/customization/menus/secondary-menu-pre-v18.md" />
    <pvs-tree [initialData]="SECONDARY_TOOLBAR" />
  </pvs-content-page>`,
})
export class MenusPageComponent {
  protected readonly TOOLBAR = TOOLBAR;
  protected readonly FINDBAR = FINDBAR;
  protected readonly SECONDARY_TOOLBAR = SECONDARY_TOOLBAR;
}
