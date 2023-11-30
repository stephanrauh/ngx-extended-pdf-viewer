import { Injectable } from '@angular/core';
import { Subject, firstValueFrom } from 'rxjs';
import { getVersionSuffix, pdfDefaultOptions } from './options/pdf-default-options';

@Injectable({
  providedIn: 'root',
})
export class PDFNotificationService {
  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInit = new Subject<void>();

  public pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);

  public constructor() {
    (async () => {
      await firstValueFrom(this.onPDFJSInit);
      this.pdfjsVersion = getVersionSuffix(pdfDefaultOptions.assetsFolder);
    })();
  }
}
