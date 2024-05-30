import { Injectable, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { getVersionSuffix, pdfDefaultOptions } from './options/pdf-default-options';

@Injectable({
  providedIn: 'root',
})
export class PDFNotificationService {
  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInitSignal = signal(false);

  public onPDFJSInit = new Subject<void>();

  public pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);

  public constructor() {
    effect(() => {
      if (this.onPDFJSInitSignal()) {
        this.pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
        this.onPDFJSInit.next();
      }
    });
  }
}
