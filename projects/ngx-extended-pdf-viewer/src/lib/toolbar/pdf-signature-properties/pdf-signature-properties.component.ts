import { AfterViewInit, Component, ElementRef, OnDestroy, inject, input } from '@angular/core';
import { PositioningService } from '../../dynamic-css/positioning.service';
import { ResponsiveVisibility } from '../../responsive-visibility';

// #3257 modified by ngx-extended-pdf-viewer
/**
 * Digital signature properties panel (pdf.js 6.2).
 *
 * PDF.js looks the elements up by id in `getViewerConfiguration()` and
 * `digital_signature_properties_manager.js` fills them at runtime: it unhides
 * the button when the document contains signatures, writes the summary into
 * `#signaturePropertiesBanner` and one card per signature into
 * `#signaturePropertiesList`. So the template only has to render the markup
 * with the exact ids.
 *
 * Two things PDF.js cannot do for us, because it only knows the single button
 * of its own viewer:
 *
 * 1. The doorhanger's position. PDF.js opens the panel from its own click
 *    handler and leaves the placement to CSS, which puts it past the right
 *    edge of the window. Every other ngx doorhanger is positioned by
 *    `PositioningService`, so hook the same call onto the button's click.
 * 2. The copy of the button in the secondary menu. `<pdf-shy-button>` renders
 *    a second, independent button there so the toolbar can collapse on narrow
 *    screens. PDF.js neither hides it, nor gives it a verification state, nor
 *    listens for its clicks - this component bridges all three.
 */
// #3257 end of modification by ngx-extended-pdf-viewer
@Component({
  selector: 'pdf-signature-properties',
  templateUrl: './pdf-signature-properties.component.html',
  standalone: false,
})
export class PdfSignaturePropertiesComponent implements AfterViewInit, OnDestroy {
  public show = input<ResponsiveVisibility>(true);

  /** The verification states PDF.js puts on the button (see `#updateButtonState()`). */
  private static readonly STATE_CLASSES = ['state-loading', 'state-verified', 'state-warn', 'state-error'];

  private readonly elementRef = inject(ElementRef);

  private button: HTMLElement | null = null;

  /** The `<pdf-shy-button>` host - what PDF.js addresses as `button.parentElement`. */
  private host: HTMLElement | null = null;

  private observer: MutationObserver | undefined;

  public ngAfterViewInit(): void {
    const root = this.elementRef.nativeElement as HTMLElement;
    this.button = root.querySelector('#signaturePropertiesButton');
    this.host = this.button?.parentElement ?? null;
    if (!this.button || !this.host || typeof MutationObserver === 'undefined') {
      return;
    }
    // PDF.js flips `hidden` on the host and swaps the `state-*` class on the
    // button; both need to reach the secondary menu's copy.
    this.observer = new MutationObserver(() => this.mirrorToSecondaryMenu());
    this.observer.observe(this.host, { attributes: true, attributeFilter: ['hidden', 'class'], subtree: true });
    this.mirrorToSecondaryMenu();
    // The secondary toolbar renders from PdfShyButtonService and may not have
    // picked up this button yet, in which case the call above found nothing.
    setTimeout(() => this.mirrorToSecondaryMenu());
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.button = null;
    this.host = null;
  }

  /**
   * Copies the state PDF.js maintains on the primary button over to the copy
   * in the secondary menu, which PDF.js does not know about. Without this the
   * overflow menu would offer "Signature properties" for every document, and
   * would never show whether the signatures check out.
   */
  private mirrorToSecondaryMenu(): void {
    const secondary = document.getElementById('secondarySignaturePropertiesButton');
    if (!secondary || !this.button || !this.host) {
      return;
    }
    secondary.hidden = this.host.hidden;
    for (const state of PdfSignaturePropertiesComponent.STATE_CLASSES) {
      secondary.classList.toggle(state, this.button.classList.contains(state));
    }
  }

  /**
   * Runs before PDF.js's own click handler has unhidden the panel;
   * positionPopupBelowItsButton() defers into a setTimeout, so by the time it
   * measures, the panel is visible.
   */
  public onClick = (_event?: Event, isSecondaryMenu?: boolean): void => {
    if (isSecondaryMenu) {
      // PDF.js bound its toggle handler to the primary button only, so forward
      // the click. The primary button is `display: none` at this point, which
      // does not stop click() from dispatching - and the forwarded click runs
      // this handler again with isSecondaryMenu false, which positions the
      // panel. `positionPopupBelowItsButton()` falls back to the secondary
      // toolbar's toggle button when the primary one is invisible, so the
      // doorhanger still ends up under something the user can see.
      //
      // The forwarding has to wait for the current click to finish. PDF.js
      // closes the panel from a document-level click handler whenever the
      // click lands outside the button and the panel - and the menu entry is
      // outside both. Opening synchronously would therefore be undone by the
      // very click that asked for it.
      setTimeout(() => this.button?.click());
      return;
    }
    new PositioningService().positionPopupBelowItsButton('signaturePropertiesButton', 'signaturePropertiesPanel');
  };
}
