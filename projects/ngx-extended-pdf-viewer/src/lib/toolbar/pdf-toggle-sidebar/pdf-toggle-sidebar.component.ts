import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-toggle-sidebar',
  templateUrl: './pdf-toggle-sidebar.component.html',
  styleUrls: ['./pdf-toggle-sidebar.component.css'],
})
export class PdfToggleSidebarComponent {
  @Input()
  public show: ResponsiveVisibility = true;

  @Input()
  public sidebarVisible: boolean | undefined = false;

  @Output()
  public showChange = new EventEmitter<boolean>();

  public onClick: () => void;

  constructor(private ngZone: NgZone) {
    const emitter = this.showChange;
    this.onClick = () => {
      const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
      const newVisibility = !PDFViewerApplication.pdfSidebar.isOpen;
      emitter.emit(newVisibility);
      PDFViewerApplication.eventBus.dispatch('toggleSidebar', { visible: newVisibility });
    };
  }
}
