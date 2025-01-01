import { Component } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-base64-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent, NgxExtendedPdfViewerModule, SplitViewComponent, SetMinifiedLibraryUsageDirective],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/basics/file-sources/base64/text.md" />
    <pvs-markdown src="/assets/pages/basics/file-sources/shared.md" />
    <ng-template #demo>
      <pvs-split-view>
        <span>Add Demo Controls here</span>

        <ngx-extended-pdf-viewer slot="end" src="" zoom="auto" [textLayer]="true" [showPresentationModeButton]="true" pvsSetMinifiedLibraryUsage />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class Base64PageComponent {}
