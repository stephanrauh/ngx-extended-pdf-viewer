import { pdfDefaultOptions } from '../options/pdf-default-options';

export class PositioningService {
  public positionPopupBelowItsButton(buttonId: string, popupId: string) {
    if (!pdfDefaultOptions.positionPopupDialogsWithJavaScript) {
      return;
    }
    setTimeout(() => {
      let visibleButton = Array.from(document.querySelectorAll(`#${buttonId}`)).find((el: HTMLElement) => el.offsetParent !== null);
      if (!visibleButton) {
        visibleButton = Array.from(document.querySelectorAll(`#secondaryToolbarToggle`)).find((el: HTMLElement) => el.offsetParent !== null);
      }
      if (visibleButton) {
        const popup = document.querySelector(`#${popupId}`);
        if (popup instanceof HTMLElement) {
          const popupContainer = popup.offsetParent as HTMLElement;
          if (popupContainer) {
            const buttonRect = visibleButton.getBoundingClientRect();
            const containerRect = popupContainer.getBoundingClientRect();

            const width = buttonRect.width;
            const doorhangerOffset = 17;

            // Detect text direction
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            let doorHangerRight = isRTL;
            if (popup.classList.contains('doorHangerRight')) {
              doorHangerRight = !isRTL;
            }

            // Apply styles
            popup.style.position = 'absolute';
            popup.style.display = 'block';

            // support the attribute 'mobileFriendlyZoom' correctly
            popup.style.transformOrigin = doorHangerRight ? 'top right' : 'top left';

            if (!doorHangerRight) {
              // For RTL languages, use 'left' property
              // also use the 'left' property for the findbar in LTR languages
              const left = buttonRect.left - containerRect.left + width / 2 - doorhangerOffset;

              popup.style.left = `${left}px`;
              popup.style.right = '';
            } else {
              // For LTR, use 'right' property
              const right = containerRect.right - buttonRect.right + width / 2 - doorhangerOffset;
              popup.style.right = `${right}px`; // 109
              popup.style.left = '';
            }

            const toolbarContainer = document.querySelector('#toolbarContainer');
            if (toolbarContainer instanceof HTMLElement) {
              const toolbarContainerRect = toolbarContainer.getBoundingClientRect();
              const top = toolbarContainerRect.bottom - containerRect.top + 4;
              popup.style.top = `${top}px`; // 92
            }
          }
        }
      }
    });
  }
}
