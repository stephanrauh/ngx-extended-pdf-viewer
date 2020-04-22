import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PDFNotificationService {
  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInit = new Subject<void>();
}
