import { NgxExtendedPdfViewerComponent } from './ngx-extended-pdf-viewer.component';
import { PDFPrintRange } from './options/pdf-print-range';
import { IPDFViewerApplication } from './options/pdf-viewer-application';

export interface FindOptions {
  highlightAll?: boolean;
  matchCase?: boolean;
  wholeWords?: boolean;
  ignoreAccents?: boolean;
  findMultipleSearchTexts?: boolean;
}

export class NgxExtendedPdfViewerService {
  constructor() {}

  public findMultiple(text: Array<string>, options: FindOptions = {}): boolean {
    options = {
      ...options,
      findMultipleSearchTexts: true,
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

  public print(printRange?: PDFPrintRange) {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const alreadyThere = !!window['isInPDFPrintRange'] && (!printRange);
    if (!alreadyThere) {
      if (!printRange) {
        printRange = {} as PDFPrintRange;
      }
      this.setPrintRange(printRange);
    }
    (window as any).printPDF();
    if (!alreadyThere) {
      PDFViewerApplication.eventBus.on('afterprint', () => {
        this.removePrintRange();
      });
    }
  }

  public removePrintRange() {
    window['isInPDFPrintRange'] = undefined;
    window['filteredPageCount'] = undefined;
  }

  public setPrintRange(printRange: PDFPrintRange) {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    window['isInPDFPrintRange'] = (page: number) => this.isInPDFPrintRange(page, printRange as PDFPrintRange);
    window['filteredPageCount'] = this.filteredPageCount(PDFViewerApplication.pagesCount, printRange);
  }

  public filteredPageCount(pageCount: number, range: PDFPrintRange): number {
    let result = 0;
    for (let page = 1; page <= pageCount; page++) {
      if (this.isInPDFPrintRange(page, range)) {
        result++;
      }
    }
    return result;
  }

  public isInPDFPrintRange(pageIndex: number, printRange: PDFPrintRange) {
    const page = pageIndex + 1;
    if (printRange.from) {
      if (page < printRange.from) {
        return false;
      }
    }
    if (printRange.to) {
      if (page > printRange.to) {
        return false;
      }
    }
    if (printRange.excluded) {
      let e = printRange.excluded as Array<number>;
      if (e.some(p => p === page)) {
        return false;
      }
    }
    if (printRange.included) {
      if (!printRange.included.some(p => p === page)) {
        return false;
      }
    }
    return true;
  }
}
