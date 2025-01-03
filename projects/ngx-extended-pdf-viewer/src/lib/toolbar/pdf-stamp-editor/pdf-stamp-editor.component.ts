import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { getVersionSuffix, pdfDefaultOptions } from '../../options/pdf-default-options';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-stamp-editor',
  templateUrl: './pdf-stamp-editor.component.html',
  styleUrls: ['./pdf-stamp-editor.component.css'],
})
export class PdfStampEditorComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  public isSelected = false;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  public get pdfJsVersion(): string {
    return getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  constructor(private notificationService: PDFNotificationService, private cdr: ChangeDetectorRef) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  private onPdfJsInit() {
    this.PDFViewerApplication?.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => {
      setTimeout(() => {
        this.isSelected = mode === 13;
        this.cdr.detectChanges();
      });
    });
  }

  public onClick(event: PointerEvent): void {
    let button = event.target;
    while (button && button instanceof Element && !(button instanceof HTMLButtonElement)) {
      button = button.parentElement;
    }
    if (button instanceof HTMLButtonElement) {
      if (button.id !== 'primaryEditorStamp') {
        document.getElementById('primaryEditorStamp')?.click();
      }
    }
  }
}
