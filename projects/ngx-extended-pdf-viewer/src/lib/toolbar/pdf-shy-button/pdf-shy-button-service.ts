import { effect, Injectable } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveCSSClass } from '../../responsive-visibility';
import { PdfShyButtonComponent } from './pdf-shy-button.component';

export interface PdfShyButtonDescription {
  id: string;
  cssClass: ResponsiveCSSClass;
  l10nId: string;
  l10nLabel: string;
  title: string;
  toggled: boolean;
  disabled: boolean;
  order: number;
  image: string | undefined;
  action?: () => void;
  eventBusName?: string;
  closeOnClick?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PdfShyButtonService {
  public buttons: PdfShyButtonDescription[] = [];

  private PDFViewerApplication!: IPDFViewerApplication | undefined;

  constructor(public notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public add(button: PdfShyButtonComponent): void {
    const secondaryMenuId = button.secondaryMenuId();
    const id = secondaryMenuId || this.addDefaultPrefix(button);
    const previousDefinition = this.buttons.findIndex((b) => b.id === id);
    const description: PdfShyButtonDescription = {
      id,
      cssClass: button.cssClass(),
      l10nId: button.l10nId(),
      l10nLabel: button.l10nLabel(),
      title: button.title(),
      toggled: button.toggled(),
      disabled: button.disabled(),
      order: button.order() ?? 99999,
      image: button.imageHtml(),
      action: button.action(),
      eventBusName: button.eventBusName(),
      closeOnClick: button.closeOnClick(),
    };
    if (previousDefinition >= 0) {
      this.buttons[previousDefinition] = description;
      setTimeout(() => {
        if (this.PDFViewerApplication?.l10n) {
          const element = document.getElementById(id);
          this.PDFViewerApplication.l10n.translate(element).then(() => {
            // Dispatch the 'localized' event on the `eventBus` once the viewer
            // has been fully initialized and translated.
          });
        }
      }, 0);
    } else {
      this.buttons.push(description);
    }
    this.buttons.sort((a, b) => a.order - b.order);
  }

  private addDefaultPrefix(button: PdfShyButtonComponent): string {
    const toolbarId = button.primaryToolbarId();
    if (toolbarId.startsWith('primary')) {
      return toolbarId.replace('primary', 'secondary');
    }
    return 'secondary' + toolbarId.substring(0, 1).toUpperCase() + toolbarId.substring(1);
  }

  public update(button: PdfShyButtonComponent): void {
    const id = button.secondaryMenuId() || this.addDefaultPrefix(button);

    if (this.buttons.some((b) => b.id === id)) {
      this.add(button);
    }
  }
}
