import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PDFNotificationService {
  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInit = new Subject<void>();

  public pdfjsVersion = new ReplaySubject<string>(1);

  constructor() {
    if ((window as any).pdfjsLib && (window as any).pdfjsLib.version) {
      this.pdfjsVersion.next((window as any).pdfjsLib.version);
    } else {
      this.onPDFJSInit.subscribe(() => {
        this.pdfjsVersion.next((window as any).pdfjsLib.version);
      });
    }
  }
}
