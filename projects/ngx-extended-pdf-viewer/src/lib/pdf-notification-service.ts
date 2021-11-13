import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PDFNotificationService {
  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInit = new Subject<void>();

  public pdfjsVersion = new BehaviorSubject<string>('2.11');

  constructor() {
    if (typeof window !== 'undefined') {
      if ((window as any).pdfjsLib && (window as any).pdfjsLib.version) {
        this.pdfjsVersion.next((window as any).pdfjsLib.version);
      } else {
        this.onPDFJSInit.subscribe(() => {
          this.pdfjsVersion.next((window as any).pdfjsLib.version);
        });
      }
    }
  }
}
