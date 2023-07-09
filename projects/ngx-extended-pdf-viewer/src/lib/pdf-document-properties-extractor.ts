import { IPDFViewerApplication } from './options/pdf-viewer-application';

export interface PdfDocumentInfo {
  author?: string;
  creationDate?: Date;
  creator?: string;

  keywords?: string;
  linearized?: boolean;
  maybeFileSize?: string;
  modificationDate?: Date;
  pdfFormatVersion?: string;
  producer?: string;
  subject?: string;
  title?: string;
}

export class PdfDocumentPropertiesExtractor {
  private pdfDateStringRegex = new RegExp(
    '^D:' + // Prefix (required)
      '(\\d{4})' + // Year (required)
      '(\\d{2})?' + // Month (optional)
      '(\\d{2})?' + // Day (optional)
      '(\\d{2})?' + // Hour (optional)
      '(\\d{2})?' + // Minute (optional)
      '(\\d{2})?' + // Second (optional)
      '([Z|+|-])?' + // Universal time relation (optional)
      '(\\d{2})?' + // Offset hour (optional)
      // tslint:disable-next-line: quotemark
      "'?" + // Splitting apostrophe (optional)
      '(\\d{2})?' + // Offset minute (optional)
      // tslint:disable-next-line: quotemark
      "'?" // Trailing apostrophe (optional)
  );

  public async getDocumentProperties(): Promise<any> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;
    const pdfDocument = PDFViewerApplication.pdfDocument;

    const result: any = {};
    const md = await pdfDocument.getMetadata();
    const info = md.info as unknown as any;

    result.author = info.Author;
    result.creationDate = this.toDateObject(info.CreationDate);
    result.creator = info.Creator;
    result.keywords = info.Keywords;
    result.linearized = info.IsLinearized;
    result.modificationDate = this.toDateObject(info.ModDate);
    result.pdfFormatVersion = info.PDFFormatVersion;
    result.producer = info.Producer;
    result.subject = info.Subject;
    result.title = info.Title;
    if (md['contentDispositionFilename']) {
      result.fileName = md['contentDispositionFilename'];
    }
    result.maybeFileSize = (await pdfDocument.getDownloadInfo()).length;
    return result;
  }

  /** shamelessly copied from pdf.js */
  private toDateObject(input: string | any): Date | null {
    // Optional fields that don't satisfy the requirements from the regular
    // expression (such as incorrect digit counts or numbers that are out of
    // range) will fall back the defaults from the specification.
    const matches = this.pdfDateStringRegex.exec(input);
    if (!matches) {
      return null;
    }

    // JavaScript's `Date` object expects the month to be between 0 and 11
    // instead of 1 and 12, so we have to correct for that.
    const year = parseInt(matches[1], 10);
    let month = parseInt(matches[2], 10);
    month = month >= 1 && month <= 12 ? month - 1 : 0;
    let day = parseInt(matches[3], 10);
    day = day >= 1 && day <= 31 ? day : 1;
    let hour = parseInt(matches[4], 10);
    hour = hour >= 0 && hour <= 23 ? hour : 0;
    let minute = parseInt(matches[5], 10);
    minute = minute >= 0 && minute <= 59 ? minute : 0;
    let second = parseInt(matches[6], 10);
    second = second >= 0 && second <= 59 ? second : 0;
    const universalTimeRelation = matches[7] || 'Z';
    let offsetHour = parseInt(matches[8], 10);
    offsetHour = offsetHour >= 0 && offsetHour <= 23 ? offsetHour : 0;
    let offsetMinute = parseInt(matches[9], 10) || 0;
    offsetMinute = offsetMinute >= 0 && offsetMinute <= 59 ? offsetMinute : 0;

    // Universal time relation 'Z' means that the local time is equal to the
    // universal time, whereas the relations '+'/'-' indicate that the local
    // time is later respectively earlier than the universal time. Every date
    // is normalized to universal time.
    if (universalTimeRelation === '-') {
      hour += offsetHour;
      minute += offsetMinute;
    } else if (universalTimeRelation === '+') {
      hour -= offsetHour;
      minute -= offsetMinute;
    }

    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }
}
