import { Injectable } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { PdfShyButtonComponent } from './pdf-shy-button.component';

export interface PdfShyButtonDescription {
  id: string;
  cssClass: string;
  l10nId: string;
  l10nLabel: string;
  title: string;
  toggled: boolean;
  disabled: boolean;
  order: number;
  image: SafeHtml;
  action?: () => void;
  eventBusName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfShyButtonService {
  public buttons: PdfShyButtonDescription[] = [];
  constructor() {}

  public add(button: PdfShyButtonComponent): void {
    const id = button.secondaryToolbarId ?? this.addDefaultPrefix(button);
    const previousDefinition = this.buttons.findIndex((b) => b.id === id);
    const description: PdfShyButtonDescription = {
      id,
      cssClass: button.cssClass?.replace('hidden', 'xvisible'),
      l10nId: button.l10nId,
      l10nLabel: button.l10nLabel,
      title: button.title,
      toggled: button.toggled,
      disabled: button.disabled,
      order: button.order ?? 99999,
      image: button.imageHtml,
      action: button.action,
      eventBusName: button.eventBusName,
    };
    if (button.id === 'next') {
      console.log('adding next button', description);
    }
    if (previousDefinition >= 0) {
      this.buttons[previousDefinition] = description;
    } else {
      this.buttons.push(description);
    }
    this.buttons.sort((a, b) => a.order - b.order);
  }

  private addDefaultPrefix(button: PdfShyButtonComponent): string {
    return 'secondary' + button.id.substring(0, 1).toUpperCase() + button.id.substring(1);
  }

  public update(button: PdfShyButtonComponent): void {
    const id = 'secondary' + button.id.substring(0, 1).toUpperCase() + button.id.substring(1);

    if (this.buttons.some((b) => b.id === id)) {
      this.add(button);
    }
  }
}
