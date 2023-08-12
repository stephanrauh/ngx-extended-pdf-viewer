import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
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
  image: SafeHtml;
  action?: () => void;
  eventBusName?: string;
  closeOnClick?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PdfShyButtonService {
  public buttons: PdfShyButtonDescription[] = [];

  public add(button: PdfShyButtonComponent): void {
    const id = button.secondaryMenuId ?? this.addDefaultPrefix(button);
    const previousDefinition = this.buttons.findIndex((b) => b.id === id);
    const description: PdfShyButtonDescription = {
      id,
      cssClass: button.cssClass,
      l10nId: button.l10nId,
      l10nLabel: button.l10nLabel,
      title: button.title,
      toggled: button.toggled,
      disabled: button.disabled,
      order: button.order ?? 99999,
      image: button.imageHtml,
      action: button.action,
      eventBusName: button.eventBusName,
      closeOnClick: button.closeOnClick,
    };
    if (previousDefinition >= 0) {
      this.buttons[previousDefinition] = description;
      setTimeout(() => {
        const PDFViewerApplication = (window as any).PDFViewerApplication as IPDFViewerApplication;
        if (PDFViewerApplication?.l10n) {
          const element = document.getElementById(id);
          PDFViewerApplication.l10n.translate(element).then(() => {
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
    if (button.primaryToolbarId.startsWith('primary')) {
      return button.primaryToolbarId.replace('primary', 'secondary');
    }
    return 'secondary' + button.primaryToolbarId.substring(0, 1).toUpperCase() + button.primaryToolbarId.substring(1);
  }

  public update(button: PdfShyButtonComponent): void {
    const id = button.secondaryMenuId ?? this.addDefaultPrefix(button);

    if (this.buttons.some((b) => b.id === id)) {
      this.add(button);
    }
  }
}
