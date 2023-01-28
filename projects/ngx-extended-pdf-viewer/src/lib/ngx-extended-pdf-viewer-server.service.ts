import { PdfLayer } from './options/optional_content_config';

export interface FindOptions {
  highlightAll?: boolean;
  matchCase?: boolean;
  wholeWords?: boolean;
  ignoreAccents?: boolean;
  findMultipleSearchTexts?: boolean;
  fuzzySearch?: boolean;
}

export interface PDFExportScaleFactor {
  width?: number;
  height?: number;
  scale?: number;
}

export class NgxExtendedPdfViewerService {
  public findMultiple(text: Array<string>, options: FindOptions = {}): boolean {
    return false;
  }

  public find(text: string, options: FindOptions = {}): boolean {
    return false;
  }

  public findNext(): boolean {
    return false;
  }

  public findPrevious(): boolean {
    return false;
  }

  public print(printRange?: any) {
    return false;
  }

  public removePrintRange() {}

  public setPrintRange(printRange: any) {}

  public filteredPageCount(pageCount: number, range: any): number {
    return 0;
  }

  public isInPDFPrintRange(pageIndex: number, printRange: any) {}

  public async getPageAsText(pageNumber: number): Promise<string> {
    return '';
  }

  public async getPageAsImage(
    pageNumber: number,
    scale: PDFExportScaleFactor,
    background?: string,
    backgroundColorToReplace: string = '#FFFFFF'
  ): Promise<any> {
    return;
  }

  public async getCurrentDocumentAsBlob(): Promise<Blob> {
    return new Blob([], { type: 'application/pdf' });
  }

  public async getFormData(): Promise<Array<Object>> {
    return [];
  }
  public addPageToRenderQueue(pageIndex: number): boolean {
    return false;
  }

  public isRenderQueueEmpty(): boolean {
    return true;
  }

  public hasPageBeenRendered(pageIndex: number): boolean {
    return false;
  }

  public numberOfPages(): number {
    return 0;
  }

  public getCurrentlyVisiblePageNumbers(): Array<number> {
    return [];
  }

  public recalculateSize(): void {}

  public async listLayers(): Promise<Array<PdfLayer> | undefined> {
    return;
  }

  public async toggleLayer(layerId: string): Promise<void> {}

  public scrollPageIntoView(pageNumber: number, pageSpot?: { top?: number | string; left?: number | string }): void {}
}
