import { Component, Input } from '@angular/core';
import { ResponsiveVisibility } from '../../responsive-visibility';

@Component({
  selector: 'pdf-find-button',
  templateUrl: './pdf-find-button.component.html',
  styleUrls: ['./pdf-find-button.component.css'],
})
export class PdfFindButtonComponent {
  @Input()
  public showFindButton: ResponsiveVisibility | undefined = undefined;

  @Input()
  public textLayer: boolean | undefined = undefined;

  @Input()
  public findbarVisible = false;

  public onClick() {
    const PDFViewerApplication: any = (window as any).PDFViewerApplication;
    if (PDFViewerApplication.findBar.opened) {
      PDFViewerApplication.findBar.close();
    } else {
      PDFViewerApplication.findBar.open();
    }
  }
}
