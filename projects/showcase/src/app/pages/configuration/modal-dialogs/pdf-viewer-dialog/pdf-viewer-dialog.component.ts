import { Component, inject, OnInit, viewChild } from '@angular/core';
import { NgxExtendedPdfViewerComponent, NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SetMinifiedLibraryUsageDirective } from '../../../../shared/directives/set-minified-library-usage.directive';
import { DialogRef } from '@angular/cdk/dialog';
import { ButtonDirective } from '../../../../core/directives/button.directive';
import { SetDefaultViewerHeightDirective } from '../../../../shared/directives/set-default-viewer-height.directive';
import { SetDefaultZoomLevelDirective } from '../../../../shared/directives/set-default-zoom-level.directive';

@Component({
  selector: 'pvs-pdf-viewer-dialog',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule, SetMinifiedLibraryUsageDirective, ButtonDirective, SetDefaultViewerHeightDirective, SetDefaultZoomLevelDirective],
  template: `
    <div class="grid">
      <button pvsButton (click)="onClose()">Close</button>
      <ngx-extended-pdf-viewer
        src="/assets/pdfs/Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf"
        [showBorders]="false"
        pvsSetMinifiedLibraryUsage
        pvsSetDefaultViewerHeight
        pvsSetDefaultZoomLevel
      ></ngx-extended-pdf-viewer>
    </div>
  `,
})
export class PdfViewerDialogComponent implements OnInit {
  private dialogRef = inject<DialogRef<void>>(DialogRef<void>);
  private pdfViewer = viewChild.required(NgxExtendedPdfViewerComponent);

  ngOnInit() {
    this.dialogRef.closed.subscribe((result) => {
      console.log('The dialog is about to be closed');
      // Here's the interesting bit:
      this.pdfViewer().ngOnDestroy();
    });
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
