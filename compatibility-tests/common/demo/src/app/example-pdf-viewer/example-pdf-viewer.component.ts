import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
} from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-example-pdf-viewer',
  templateUrl: './example-pdf-viewer.component.html',
  styleUrls: ['./example-pdf-viewer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePdfViewerComponent {
  public page = 1;
  public zoom: string | number = "auto";
  public rotation: 0 | 90 | 180 | 270 = 0;
  public spread: any = "off";

  constructor(private pdfService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.doubleTapZoomFactor = '150%';
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5;
  }
}
