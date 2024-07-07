import { Injectable, effect, signal } from '@angular/core';
import { getVersionSuffix, pdfDefaultOptions } from './options/pdf-default-options';
import { IPDFViewerApplication } from './options/pdf-viewer-application';

@Injectable({
  providedIn: 'root',
})
export class PDFNotificationService {
  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInitSignal = signal<IPDFViewerApplication | undefined>(undefined);

  public pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);

  public constructor() {
    effect(() => {
      if (this.onPDFJSInitSignal()) {
        this.pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
      }
    });
  }
}
