import { Injectable } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

@Injectable({
  providedIn: 'root',
})
export class PdfFindbarService {
  public multipleSearchTexts = false;

  private _individualWordsMode = true;

  public get individualWordsMode() {
    return this._individualWordsMode;
  }
  public set individualWordsMode(value) {
    if (this._individualWordsMode != value) {
      const multilineInput = document.querySelector('ngx-extended-pdf-viewer #findInputMultiline') as HTMLTextAreaElement;
      const wordsInput = document.querySelector('ngx-extended-pdf-viewer #findInput') as HTMLInputElement;
      if (value) {
        const query = multilineInput.value;
        if (query) {
          wordsInput.value = query.replace(/\n/, ' ');
        }
      } else {
        const query = wordsInput.value;
        if (query) {
          multilineInput.value = query;
        }
      }
    }
    this._individualWordsMode = value;
    setTimeout(() => {
      const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
      PDFViewerApplication.findBar.dispatchEvent('');
    });
  }
}
