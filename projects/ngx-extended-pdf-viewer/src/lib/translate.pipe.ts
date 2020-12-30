import { Pipe, PipeTransform } from '@angular/core';
import { IPDFViewerApplication } from './options/pdf-viewer-application';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(key: string, fallback: string): Promise<string> {
    return this.translate(key, fallback);
  }

  public async translate(key: string, englishText: string): Promise<string> {
    const PDFViewerApplication: IPDFViewerApplication = (window as any).PDFViewerApplication;

    return PDFViewerApplication.l10n.get(key, null, englishText);
  }
}
