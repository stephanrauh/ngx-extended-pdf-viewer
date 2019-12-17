import { Injectable } from '@angular/core';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';

export interface FindOptions {
  highlightAll?: boolean;
  matchCase?: boolean;
  wholeWords?: boolean;
  ignoreAccents?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NgxExtendedPdfViewerService {
  constructor() {}

  public find(text: string, options: FindOptions = {}): boolean {
    if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call find() later.");
      return false;
    } else {
      const highlightAllCheckbox = document.getElementById('findHighlightAll') as HTMLInputElement;
      if (highlightAllCheckbox) {
        highlightAllCheckbox.checked = options.highlightAll || false;
      }
      const matchCaseCheckbox = document.getElementById('findMatchCase') as HTMLInputElement;
      if (matchCaseCheckbox) {
        matchCaseCheckbox.checked = options.matchCase || false;
      }
      const entireWorkCheckbox = document.getElementById('findEntireWord') as HTMLInputElement;
      if (entireWorkCheckbox) {
        entireWorkCheckbox.checked = options.wholeWords || false;
      }
      const findIgnoreAccentsCheckbox = document.getElementById('findIgnoreAccents') as HTMLInputElement;
      if (findIgnoreAccentsCheckbox) {
        findIgnoreAccentsCheckbox.checked = options.ignoreAccents || false;
      }
      const inputField = document.getElementById('findInput');
      if (inputField) {
        inputField.setAttribute('value', text);
        inputField.dispatchEvent(new Event('input'));
        return true;
      } else {
        // tslint:disable-next-line:quotemark
        console.error("Unexpected error: the input field used to search isn't part of the DOM.");
        return false;
      }
    }
  }

  public findNext(): boolean {
    if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call findNext() later.");
      return false;
    } else {
      const button = document.getElementById('findNext');
      if (button) {
        button.click();
        return true;
      }
      return false;
    }
  }

  public findPrevious(): boolean {
    if (!NgxExtendedPdfViewerComponent.ngxExtendedPdfViewerInitialized) {
      // tslint:disable-next-line:quotemark
      console.error("The PDF viewer hasn't finished initializing. Please call findPrevious() later.");
      return false;
    } else {
      const button = document.getElementById('findPrevious');
      if (button) {
        button.click();
        return true;
      }
      return false;
    }
  }
}
