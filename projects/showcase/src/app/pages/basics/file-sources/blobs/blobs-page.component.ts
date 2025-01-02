import { Component, inject, signal } from '@angular/core';
import { NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../../shared/components/markdown-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BlobService } from './blob.service';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { SetDefaultViewerHeightDirective } from '../../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-blobs-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    ReactiveFormsModule,
    FormsModule,
    ButtonDirective,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/basics/file-sources/blobs/text.md" />
    <pvs-markdown src="/assets/pages/basics/file-sources/shared.md" />
    <ng-template #demo>
      <pvs-split-view>
        <div class="radio-group">
          <input id="preloaded" type="radio" name="choice" [(ngModel)]="choice" value="preloaded" />
          <label for="preloaded">Show a Blob that's already in memory </label>

          <input id="password-correct" type="radio" name="choice" [(ngModel)]="choice" value="from-disk" />
          <label for="password-correct">Load a large Blob via REST</label>
        </div>
        <div class="mt-4">
          <button pvsButton (click)="downloadAsBlob()">Download as BLOB</button>
        </div>
        @if (downloaded()) {
          <div class="mt-2">
            <span>{{ downloaded() }}</span>
          </div>
        }
        <ngx-extended-pdf-viewer
          slot="end"
          [src]="src"
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
export class BLOBsPageComponent {
  private ngxService = inject(NgxExtendedPdfViewerService);
  private blobService = inject(BlobService);
  private http = inject(HttpClient);
  private _choice = 'preloaded';

  src: Blob = this.blobService.src;
  downloaded = signal<string | null>(null);

  get choice() {
    return this._choice;
  }

  set choice(choice: string) {
    this._choice = choice;
    if (choice === 'preloaded') {
      this.usePreloadedFile();
      return;
    }
    this.loadLargeFile();
  }

  usePreloadedFile(): void {
    this.src = this.blobService.src;
  }

  loadLargeFile(): void {
    this.http.get('/assets/pdfs/The Public Domain - Enclosing the Commons of the Mind.pdf', { responseType: 'blob' }).subscribe((res) => {
      this.src = res;
    });
  }

  async downloadAsBlob(): Promise<void> {
    this.downloaded.set(null);
    const blob = await this.ngxService.getCurrentDocumentAsBlob();
    if (blob) {
      this.downloaded.set(`The BLOB contains ${blob.size} byte.`);
      return;
    }
    this.downloaded.set('Download failed!');
  }
}
