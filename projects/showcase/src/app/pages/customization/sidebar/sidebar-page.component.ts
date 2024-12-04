import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'pvs-sidebar-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/customization/sidebar/text.md" />
    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
        <div class="input-group">
          <input id="standard-layout" type="radio" name="layout" [(ngModel)]="layout" value="default" />
          <label for="standard-layout">Standard layout</label>

          <input id="no-sidebar" type="radio" name="layout" [(ngModel)]="layout" value="without" />
          <label for="no-sidebar">No Sidebar</label>

          <input id="fancy-layout" type="radio" name="layout" [(ngModel)]="layout" value="fancy" />
          <label for="fancy-layout">Fancy Layout</label>

          <input id="show-sidebar" type="checkbox" [(ngModel)]="showSidebar" />
          <label for="show-sidebar">Show Sidebar</label>
        </div>

        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/stluciadance.com.pdf"
          zoom="auto"
          [textLayer]="true"
          [customSidebar]="layout === 'fancy' ? fancySidebar : layout === 'without' ? withoutSidebar : undefined"
          [(sidebarVisible)]="showSidebar"
          pvsSetMinifiedLibraryUsage
        />
      </pvs-split-view>

      <ng-template #withoutSidebar>
        <div id="sidebarContainer" style="top:-1px">
          <pdf-sidebar-content></pdf-sidebar-content>
          <div id="sidebarResizer" class="hidden"></div>
        </div>
      </ng-template>

      <ng-template #fancySidebar>
        <div id="sidebarContainer" style="top:31px;background-color:goldenrod">
          <div id="additionalSidebarContainer">
            <div id="toolbarSidebar">
              <button
                style="background-color: red; height:100%;width: 34%;border:0;margin:0;padding:0"
                type="button"
                id="viewThumbnail"
                class="toolbarButton"
                data-l10n-id="thumbs"
              >
                <span data-l10n-id="thumbs_label">Thumbnails</span>
              </button>
              <button
                style="background-color: green; height:100%;width: 35%;border:0;margin:0;padding:0"
                type="button"
                id="viewOutline"
                class="toolbarButton"
                data-l10n-id="document_outline"
              >
                <span data-l10n-id="document_outline_label">Document Outline</span>
              </button>
              <button
                style="background-color: blue; height:100%;width: 34%;border:0;margin:0;padding:0"
                type="button"
                id="viewAttachments"
                class="toolbarButton"
                data-l10n-id="attachments"
              >
                <span data-l10n-id="attachments_label">Attachments</span>
              </button>
            </div>
          </div>
          <pdf-sidebar-content></pdf-sidebar-content>
          <div id="sidebarResizer" class="hidden"></div>
        </div>
      </ng-template>
    </ng-template>
  </pvs-content-page>`,
})
export class SidebarPageComponent {
  layout = 'without';
  showSidebar = true;
}
