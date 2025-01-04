import { Component, computed, inject } from '@angular/core';
import { NgxExtendedPdfViewerModule, PasswordPrompt, pdfDefaultOptions, PDFNotificationService } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { CustomPasswordPrompt } from './custom-password-prompt';
import { FormsModule } from '@angular/forms';
import { SetDefaultViewerHeightDirective } from '../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-passwords-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    FormsModule,
    SetDefaultViewerHeightDirective,
    SetDefaultZoomLevelDirective,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/viewing/passwords/text.md" />
    <ng-template #demo>
      <pvs-split-view>
        <small>Copyright hint: this presentation is my own work</small>

        <div class="radio-group">
          <input id="password-undefined" type="radio" name="choice" [(ngModel)]="choice" [value]="undefined" />
          <label for="password-undefined">[password]="undefined" (or just omit it) (forces the user to enter the password)</label>

          <input id="password-correct" type="radio" name="choice" [(ngModel)]="choice" value="graalvm-rocks!" />
          <label for="password-correct">password="graalvm-rocks!" (correct password, the file opens)</label>

          <input id="password-wrong" type="radio" name="choice" [(ngModel)]="choice" value="graalvm-sucks!" />
          <label for="password-wrong">password="graalvm-sucks!" (wrong password, standard password prompt shows)</label>

          <input id="password-custom" type="radio" name="choice" [(ngModel)]="choice" value="graalvm-sucks?" />
          <label for="password-custom">password="graalvm-sucks?" (wrong password - custom password dialog shows)</label>
        </div>

        <div slot="end">
          @defer (on viewport) {
            @if (src) {
              <ngx-extended-pdf-viewer
                [src]="src!"
                [password]="password"
                [textLayer]="true"
                [showPresentationModeButton]="true"
                pvsSetMinifiedLibraryUsage
                pvsSetDefaultViewerHeight
                pvsSetDefaultZoomLevel
              />
            }
          } @placeholder {
            <span></span>
          }
        </div>
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class PasswordsPageComponent {
  private notificationService = inject(PDFNotificationService);
  private PDFViewerApplication = computed(() => this.notificationService.onPDFJSInitSignal());
  private originalPasswordPrompt!: PasswordPrompt;

  src?: string | undefined = '/assets/pdfs/GraalVM-password-protected.pdf';

  _choice?: string;

  get choice() {
    return this._choice;
  }

  set choice(choice: string | undefined) {
    const pdfViewer = this.PDFViewerApplication();
    console.log('Setting choice');
    if (!pdfViewer) {
      return;
    }

    this.password = choice;
    this.src = undefined;

    if (choice === 'graalvm-sucks?') {
      if (!this.originalPasswordPrompt) {
        this.originalPasswordPrompt = pdfViewer.passwordPrompt;
      }
      (pdfDefaultOptions.passwordPrompt as any) = new CustomPasswordPrompt();
      pdfViewer.passwordPrompt = new CustomPasswordPrompt();
    } else {
      if (this.originalPasswordPrompt) {
        (pdfDefaultOptions.passwordPrompt as any) = this.originalPasswordPrompt;
        pdfViewer.passwordPrompt = this.originalPasswordPrompt;
      }
    }

    setTimeout(() => {
      this.src = '/assets/pdfs/GraalVM-password-protected.pdf';
    });
  }

  password?: string;

  constructor() {
    this.choice = 'graalvm-rocks!';
  }
}
