import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-smoketest-with-thumbnail',
  templateUrl: './smoketest-with-thumbnail.component.html',
  styleUrls: ['./smoketest-with-thumbnail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmoketestWithThumbnailsComponent {
  public page = 1;
  public zoom: string | number = 'auto';
  public rotation: 0 | 90 | 180 | 270 = 0;
  public spread: any = 'off';
  public showSidebar = false;

  constructor(private pdfService: NgxExtendedPdfViewerService) {
    pdfDefaultOptions.doubleTapZoomFactor = '150%';
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5;
    if (window.location.search.includes('bleeding-edge')) {
      pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    }
  }
}
