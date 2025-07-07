import { effect, Pipe, PipeTransform } from '@angular/core';
import { IPDFViewerApplication } from './options/pdf-viewer-application';
import { PDFNotificationService } from './pdf-notification-service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  private PDFViewerApplication: IPDFViewerApplication | undefined;
  constructor(notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  transform(key: string, fallback: string): Promise<string | undefined> {
    return this.translate(key, fallback);
  }

  public async translate(key: string, englishText: string): Promise<string | undefined> {
    while (!this.PDFViewerApplication) {
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
    return this.PDFViewerApplication?.l10n.get(key, null, englishText);
  }
}
