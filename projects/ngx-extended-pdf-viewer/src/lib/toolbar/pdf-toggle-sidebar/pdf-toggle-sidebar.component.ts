import { Component, effect, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
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
  @Input()
  public show: ResponsiveVisibility = true;

  @Input()
  public sidebarVisible: boolean | undefined = false;

  @Output()
  public showChange = new EventEmitter<boolean>();

  public onClick?: () => void;

  private PDFViewerApplication: IPDFViewerApplication | undefined;

  constructor(public notificationService: PDFNotificationService) {
    const emitter = this.showChange;
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
    this.onClick = () => {
      const newVisibility = !this.PDFViewerApplication?.pdfSidebar.isOpen;
      emitter.emit(newVisibility);
      this.PDFViewerApplication?.eventBus.dispatch('toggleSidebar', { visible: newVisibility });
    };
  }

  public ngOnDestroy(): void {
    this.onClick = undefined;
  }
}
