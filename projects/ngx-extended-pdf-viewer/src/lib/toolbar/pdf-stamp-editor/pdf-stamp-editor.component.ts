import { ChangeDetectorRef, Component, effect, input, OnDestroy, ViewRef } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { AnnotationEditorEditorModeChangedEvent } from '../../events/annotation-editor-mode-changed-event';
import { FocusManagementService } from '../../focus-management.service';
import { AnnotationEditorType } from '../../options/editor-annotations';
import { getVersionSuffix, pdfDefaultOptions } from '../../options/pdf-default-options';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-stamp-editor',
    templateUrl: './pdf-stamp-editor.component.html',
    styleUrls: ['./pdf-stamp-editor.component.css'],
    standalone: false
})
export class PdfStampEditorComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  // #2818 modified by ngx-extended-pdf-viewer
  public disable = input<boolean>(false);
  // #2818 end of modification by ngx-extended-pdf-viewer

  public isSelected = false;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  // #3135 modified by ngx-extended-pdf-viewer
  private eventBusAbortController: AbortController | null = null;
  // #3135 end of modification by ngx-extended-pdf-viewer

  public get pdfJsVersion(): string {
    return getVersionSuffix(pdfDefaultOptions.assetsFolder);
  }

  constructor(
    notificationService: PDFNotificationService,
    private readonly focusManagement: FocusManagementService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
      if (this.PDFViewerApplication) {
        this.onPdfJsInit();
      }
    });
  }

  /**
   * Runs `callback` and re-renders this component.
   *
   * The callback is scheduled from a pdf.js event bus listener, which runs
   * outside Angular's zone, so neither zone.js nor a signal write schedules a
   * change detection run for us - the button kept showing the previous state
   * until an unrelated click happened to trigger one. The view can already be
   * destroyed by the time a queued callback runs, and `detectChanges()` throws
   * on a destroyed view, so that case is skipped.
   */
  private asyncWithCD(callback: () => void): () => void {
    return () => {
      callback();
      if (!(this.cdr as ViewRef).destroyed) {
        this.cdr.detectChanges();
      }
    };
  }

  private onPdfJsInit() {
    // #3135 modified by ngx-extended-pdf-viewer
    this.eventBusAbortController?.abort();
    this.eventBusAbortController = new AbortController();
    const opts = { signal: this.eventBusAbortController.signal };
    // #3135 end of modification by ngx-extended-pdf-viewer
    this.PDFViewerApplication?.eventBus.on('annotationeditormodechanged', ({ mode }: AnnotationEditorEditorModeChangedEvent) => {
      setTimeout(this.asyncWithCD(() => {
        const wasSelected = this.isSelected;
        this.isSelected = mode === 13;

        // Focus management
        if (!wasSelected && this.isSelected) {
          // Dialog just opened
          this.focusManagement.moveFocusToDialog('editorStampParamsToolbar', 'Stamp editor toolbar opened', 'primaryEditorStamp');
        } else if (wasSelected && !this.isSelected) {
          // Dialog just closed
          this.focusManagement.returnFocusToPrevious('Stamp editor toolbar closed');
        }
      }));
    }, opts);
  }

  // #3135 modified by ngx-extended-pdf-viewer
  public ngOnDestroy(): void {
    this.eventBusAbortController?.abort();
  }
  // #3135 end of modification by ngx-extended-pdf-viewer

  public onClick = (event?: Event): void => {
    const currentMode = this.PDFViewerApplication?.pdfViewer.annotationEditorMode;
    this.PDFViewerApplication?.eventBus.dispatch('switchannotationeditormode', {
      source: this,
      mode: currentMode === AnnotationEditorType.STAMP ? AnnotationEditorType.NONE : AnnotationEditorType.STAMP,
      isFromKeyboard: (event as PointerEvent)?.detail === 0,
    });
    const positioningService = new PositioningService();
    positioningService.positionPopupBelowItsButton('primaryEditorStamp', 'editorStampParamsToolbar');
  };
}
