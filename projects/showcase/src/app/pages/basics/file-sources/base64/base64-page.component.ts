import { Component, computed, inject, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { pdfData2 } from './base64.data';
import { SetDefaultViewerHeightDirective } from '../../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-base64-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    ButtonDirective,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/basics/file-sources/base64/text.md" />
    <pvs-markdown src="/assets/pages/basics/file-sources/shared.md" />
    <ng-template #demo>
      <pvs-split-view>
        <button pvsButton (click)="switchDocument()">Show other document</button>

        <ngx-extended-pdf-viewer
          slot="end"
          [base64Src]="base64()"
          zoom="auto"
          [textLayer]="true"
          [showPresentationModeButton]="true"
          pvsSetMinifiedLibraryUsage
          pvsSetDefaultViewerHeight
          pvsSetDefaultZoomLevel
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class Base64PageComponent {
  private httpClient = inject(HttpClient);

  private initialPdf = toSignal(
    this.httpClient.get<string>('/assets/pdfs/Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.base64.txt', { responseType: 'text' as 'json' }),
  );
  private secondPdf: string = pdfData2;
  private firstPdf = signal(true);

  base64 = computed(() => (this.firstPdf() ? this.initialPdf() : this.secondPdf));

  switchDocument(): void {
    this.firstPdf.update((firstPdf) => !firstPdf);
  }
}
