import { effect, Injectable } from '@angular/core';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { ResponsiveCSSClass } from '../../responsive-visibility';
import { PdfShyButtonComponent } from './pdf-shy-button.component';
import { ShyButtonAria, shyButtonAria } from './shy-button-aria';
import { getViewerElementById } from '../../viewer-root';

export interface PdfShyButtonDescription {
  id: string;
  cssClass: ResponsiveCSSClass;
  l10nId: string;
  l10nLabel: string;
  title: string;
  toggled: boolean;
  /** #3295 the same ARIA attributes as the toolbar button */
  aria?: ShyButtonAria;
  disabled: boolean;
  order: number;
  image: string | undefined;
  action?: (() => void) | undefined;
  eventBusName?: string | undefined;
  closeOnClick?: boolean | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class PdfShyButtonService {
  /** The buttons that aren't inside a viewer. The buttons of a viewer are in `buttonsOf(viewer)`. */
  public buttons: PdfShyButtonDescription[] = [];

  // #3306 modified by ngx-extended-pdf-viewer
  // One list per viewer: the buttons of several viewers share their ids, and a shared list
  // made the secondary menu of one viewer run the actions of the other viewer's buttons.
  // The service stays a root service because a custom toolbar is declared outside the viewer.
  private readonly buttonsByViewer = new WeakMap<Element, PdfShyButtonDescription[]>();

  public buttonsOf(viewer: Element | null | undefined): PdfShyButtonDescription[] {
    if (!viewer) {
      return this.buttons;
    }
    let buttons = this.buttonsByViewer.get(viewer);
    if (!buttons) {
      buttons = [];
      this.buttonsByViewer.set(viewer, buttons);
    }
    return buttons;
  }
  // #3306 end of modification by ngx-extended-pdf-viewer

  private PDFViewerApplication!: IPDFViewerApplication | undefined;

  constructor(public notificationService: PDFNotificationService) {
    effect(() => {
      this.PDFViewerApplication = notificationService.onPDFJSInitSignal();
    });
  }

  public add(button: PdfShyButtonComponent): void {
    const secondaryMenuId = button.secondaryMenuId();
    const id = secondaryMenuId || this.addDefaultPrefix(button);
    // #3306 modified by ngx-extended-pdf-viewer
    const viewer = button.viewer?.();
    const buttons = this.buttonsOf(viewer);
    // #3306 end of modification by ngx-extended-pdf-viewer
    const previousDefinition = buttons.findIndex((b) => b.id === id);
    const description: PdfShyButtonDescription = {
      id,
      cssClass: button.cssClass(),
      l10nId: button.l10nId(),
      l10nLabel: button.l10nLabel(),
      title: button.title(),
      toggled: button.toggled(),
      aria: shyButtonAria({
        toggled: button.toggled(),
        toggleButton: button.toggleButton(),
        role: button.role(),
        ariaHasPopup: button.ariaHasPopup(),
        ariaControls: button.ariaControls(),
      }),
      disabled: button.disabled(),
      order: button.order() ?? 99999,
      image: button.imageHtml(),
      action: button.action(),
      eventBusName: button.eventBusName(),
      closeOnClick: button.closeOnClick(),
    };
    if (previousDefinition >= 0) {
      buttons[previousDefinition] = description;
      setTimeout(() => {
        if (this.PDFViewerApplication?.l10n) {
          // #3306 the button of this button's viewer, not the first viewer's
          const host = viewer ?? this.PDFViewerApplication.appConfig?.appContainer?.closest('ngx-extended-pdf-viewer');
          const element = getViewerElementById(host ?? document, id);
          this.PDFViewerApplication.l10n.translate(element).then(() => {
            // Dispatch the 'localized' event on the `eventBus` once the viewer
            // has been fully initialized and translated.
          });
        }
      }, 0);
    } else {
      buttons.push(description);
    }
    buttons.sort((a, b) => a.order - b.order);
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

    if (this.buttonsOf(button.viewer?.()).some((b) => b.id === id)) {
      this.add(button);
    }
  }
}
