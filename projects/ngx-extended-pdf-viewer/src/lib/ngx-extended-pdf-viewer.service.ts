import { Injectable } from '@angular/core';
import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { Subject } from 'rxjs';

export interface FindOptions {
  highlightAll?: boolean;
  matchCase?: boolean;
  wholeWords?: boolean;
  ignoreAccents?: boolean;
  findMultipleSearchTexts?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NgxExtendedPdfViewerService {
  // this event is fired when the pdf.js library has been loaded and objects like PDFApplication are available
  public onPDFJSInit = new Subject<void>();

  constructor() {}

  public findMultiple(text: Array<string>, options: FindOptions = {}): boolean {
    options = {
      ...options,
      findMultipleSearchTexts: true
    };
    const searchString = text.join('\n') + '\n';
    return this.find(searchString, options);
  }

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
      const entireWordCheckbox = document.getElementById('findEntireWord') as HTMLInputElement;
      if (entireWordCheckbox) {
        entireWordCheckbox.checked = options.wholeWords || false;
      }
      const findIgnoreAccentsCheckbox = document.getElementById('findIgnoreAccents') as HTMLInputElement;
      if (findIgnoreAccentsCheckbox) {
        findIgnoreAccentsCheckbox.checked = options.ignoreAccents || false;
      }
      const multipleSearchTerms = options.findMultipleSearchTexts || text.includes('\n') || false;
      const findMultipleSearchTextsCheckbox = document.getElementById('findMultipleSearchTexts') as HTMLInputElement;
      if (findMultipleSearchTextsCheckbox) {
        findMultipleSearchTextsCheckbox.checked = multipleSearchTerms;
      }
      const individualWordsModeCheckbox = document.getElementById('individualWordsMode') as HTMLInputElement;
      if (individualWordsModeCheckbox) {
        individualWordsModeCheckbox.checked = false;
      }

      const inputField = multipleSearchTerms ? document.getElementById('findInputMultiline') : document.getElementById('findInput');
      if (inputField) {
        if (inputField instanceof HTMLTextAreaElement) {
          inputField.value = text;

          // todo dirty hack!
          inputField.classList.remove('hidden');
          (document.getElementById('findInput') as HTMLInputElement).classList.add('hidden');
          (document.getElementById('individualWordsModeLabel') as HTMLInputElement).classList.remove('hidden');
          (document.getElementById('individualWordsMode') as HTMLInputElement).classList.remove('hidden');
          // end of the dirty hack
        } else if (inputField instanceof HTMLInputElement) {
          inputField.value = text;
          // todo dirty hack!
          inputField.classList.remove('hidden');
          (document.getElementById('findInputMultiline') as HTMLInputElement).classList.add('hidden');
          (document.getElementById('individualWordsModeLabel') as HTMLInputElement).classList.add('hidden');
          (document.getElementById('individualWordsMode') as HTMLInputElement).classList.add('hidden');
          // end of the dirty hack
        }
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
