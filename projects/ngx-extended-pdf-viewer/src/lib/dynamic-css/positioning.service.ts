import { pdfDefaultOptions } from '../options/pdf-default-options';

export class PositioningService {
  private static readonly DOORHANGER_OFFSET = 17;
  private static readonly TOOLBAR_MARGIN = 4;

  public positionPopupBelowItsButton(buttonId: string, popupId: string): void {
    if (!pdfDefaultOptions.positionPopupDialogsWithJavaScript) {
      return;
    }

    setTimeout(() => {
      const button = this.findVisibleButton(buttonId);
      const popup = this.getPopupElement(popupId);

      if (!button || !popup) return;

      this.applyPopupPositioning(button, popup);
    });
  }

  private findVisibleButton(buttonId: string): HTMLElement | null {
    const findVisible = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(`#${selector}`)).find((el) => el.offsetParent !== null);

    return findVisible(buttonId) || findVisible('secondaryToolbarToggle') || null;
  }

  private getPopupElement(popupId: string): HTMLElement | null {
    const popup = document.querySelector<HTMLElement>(`#${popupId}`);
    return popup?.offsetParent ? popup : null;
  }

  private applyPopupPositioning(button: HTMLElement, popup: HTMLElement): void {
    const popupContainer = popup.offsetParent as HTMLElement;
    const buttonRect = button.getBoundingClientRect();
    const containerRect = popupContainer.getBoundingClientRect();

    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    let isRightAligned = isRTL;
    if (popup.classList.contains('doorHangerRight')) {
      isRightAligned = !isRTL;
    }

    this.setBasicPopupStyles(popup, isRightAligned);
    this.setHorizontalPosition(popup, buttonRect, containerRect, isRightAligned);
    this.setVerticalPosition(popup, containerRect);
  }

  private setBasicPopupStyles(popup: HTMLElement, isRightAligned: boolean): void {
    Object.assign(popup.style, {
      position: 'absolute',
      display: 'block',
      transformOrigin: isRightAligned ? 'top right' : 'top left',
    });
  }

  private setHorizontalPosition(popup: HTMLElement, buttonRect: DOMRect, containerRect: DOMRect, isRightAligned: boolean): void {
    const centerOffset = buttonRect.width / 2 - PositioningService.DOORHANGER_OFFSET;

    if (!isRightAligned) {
      popup.style.left = `${buttonRect.left - containerRect.left + centerOffset}px`;
      popup.style.right = '';
    } else {
      popup.style.right = `${containerRect.right - buttonRect.right + centerOffset}px`;
      popup.style.left = '';
    }
  }

  private setVerticalPosition(popup: HTMLElement, containerRect: DOMRect): void {
    const toolbarContainer = document.querySelector<HTMLElement>('#toolbarContainer');
    if (!toolbarContainer) return;

    const toolbarRect = toolbarContainer.getBoundingClientRect();
    const top = toolbarRect.bottom - containerRect.top + PositioningService.TOOLBAR_MARGIN;
    popup.style.top = `${top}px`;
  }
}
