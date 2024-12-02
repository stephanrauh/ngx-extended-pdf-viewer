import { Component, inject } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { Dialog } from '@angular/cdk/dialog';
import { PdfViewerDialogComponent } from './pdf-viewer-dialog/pdf-viewer-dialog.component';
import { ButtonDirective } from '../../../core/directives/button.directive';

@Component({
  selector: 'pvs-modal-dialogs-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent, NgxExtendedPdfViewerModule, SplitViewComponent, ButtonDirective],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/configuration/modal-dialogs/text.md" />
    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
        <button pvsButton (click)="openDialog()">open modal</button>
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class ModalDialogsPageComponent {
  dialog = inject(Dialog);

  public openDialog() {
    this.dialog.open(PdfViewerDialogComponent, {
      width: '400px',
    });
  }
}
