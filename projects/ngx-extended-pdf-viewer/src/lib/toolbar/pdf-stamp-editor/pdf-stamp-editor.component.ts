import { ChangeDetectorRef, Component, Input, effect } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
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

  constructor(
    notificationService: PDFNotificationService,
    private cdr: ChangeDetectorRef,
    private positioningService: PositioningService,
  ) {
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
      // #2817 this is a workaround for when the button is initially hidden.
      // In that case, the dummy component gets the click listener.
      // As a quick work around, let's simply call the click listener of the dummy component.
      if (button.id === 'primaryEditorStamp' && document.getElementById('primaryEditorStamp') !== button) {
        document.getElementById('primaryEditorStamp')?.click();
      }
      if (button.id !== 'primaryEditorStamp') {
        document.getElementById('primaryEditorStamp')?.click();
      }
      const positioningService = new PositioningService();
      positioningService.positionPopupBelowItsButton('primaryEditorStamp', 'editorStampParamsToolbar');
    }
  }
}
