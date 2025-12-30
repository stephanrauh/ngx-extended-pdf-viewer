import { Component, effect, output, input, OnDestroy } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
    selector: 'pdf-toggle-sidebar',
    templateUrl: './pdf-toggle-sidebar.component.html',
    styleUrls: ['./pdf-toggle-sidebar.component.css'],
    standalone: false
})
export class PdfToggleSidebarComponent implements OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  public sidebarVisible = input<boolean | undefined>(false);

  public showChange = output<boolean>();

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(public notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public onClick = (event?: Event): void => {
    // PDF.js v5.4.530 renamed pdfSidebar to viewsManager
    console.log('PdfToggleSidebarComponent.onClick called', {
      PDFViewerApplication: !!this.PDFViewerApplication,
      viewsManager: !!this.PDFViewerApplication?.viewsManager,
      isOpen: this.PDFViewerApplication?.viewsManager?.isOpen
    });
    const newVisibility = !this.PDFViewerApplication?.viewsManager?.isOpen;
    this.showChange.emit(newVisibility);
    if (this.PDFViewerApplication?.viewsManager) {
      console.log('Calling viewsManager.toggle()');
      this.PDFViewerApplication.viewsManager.toggle(event);
    } else {
      console.warn('viewsManager not available!');
    }
  };

  public ngOnDestroy(): void {
  }
}
