import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { SplitViewComponent } from '../../../shared/components/split-view.component';

@Component({
  selector: 'pvs-internationalization-page',
  standalone: true,
  imports: [ContentPageComponent, FormsModule, MarkdownContentComponent, NgxExtendedPdfViewerModule, SplitViewComponent],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/configuration/internationalization/text.md" />
    <ng-template #demo>
      <pvs-split-view>
        <div class="mb-12">
          <label for="language">Language</label>
          <select id="language" name="language" [(ngModel)]="language">
            <option [value]="undefined">default (usually English)</option>
            <option [value]="'es-ES'">es-ES (Spanish)</option>
            <option [value]="'de-DE'">de-DE (German)</option>
            <option [value]="'fr-FR'">fr-FR (French / custom translations)</option>
            <option [value]="'pt-PT'">pt-PT (Portuguese)</option>
            <option [value]="'el'">el (Greek)</option>
            <option [value]="'nl-BE'">nl-BE (Belgian)</option>
            <option [value]="'ar'">ar (arab)</option>
          </select>
        </div>
        @if (!hidePdfViewer) {
          <ngx-extended-pdf-viewer
            slot="end"
            src="./assets/pdfs/pdf-sample.pdf"
            [language]="language"
            [textLayer]="true"
            height="75vh"
            pvsSetMinifiedLibraryUsage
            pvsSetDefaultZoomLevel
          />
        }
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class InternationalizationPageComponent {
  public hidePdfViewer = false;
  private _language: string | undefined = 'nl-BE';
  public get language(): string | undefined {
    return this._language;
  }
  public set language(value: string | undefined) {
    if (value === this._language) {
      return;
    }
    this.hidePdfViewer = true;
    setTimeout(() => {
      this._language = value;
      this.hidePdfViewer = false;
    });
  }
}
