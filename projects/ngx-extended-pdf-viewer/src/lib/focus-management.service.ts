import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FocusManagementService {
  private previousActiveElement: HTMLElement | null = null;
  private ariaLiveRegion: HTMLDivElement | null = null;
  private keydownHandler: ((event: KeyboardEvent) => void) | null = null;

  constructor() {
    this.initializeAriaLiveRegion();
  }

  /**
   * Initializes a hidden aria-live region for screen reader announcements
   */
  private initializeAriaLiveRegion(): void {
    if (typeof document === 'undefined') {
      return; // SSR guard
    }

    this.ariaLiveRegion = document.createElement('div');
    this.ariaLiveRegion.setAttribute('aria-live', 'polite');
    this.ariaLiveRegion.setAttribute('aria-atomic', 'true');
    this.ariaLiveRegion.setAttribute('class', 'sr-only');
    this.ariaLiveRegion.style.position = 'absolute';
    this.ariaLiveRegion.style.left = '-10000px';
    this.ariaLiveRegion.style.width = '1px';
    this.ariaLiveRegion.style.height = '1px';
    this.ariaLiveRegion.style.overflow = 'hidden';

    if (document.body) {
      document.body.appendChild(this.ariaLiveRegion);
    } else {
      // If body is not ready yet, wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', () => {
        if (this.ariaLiveRegion) {
          document.body.appendChild(this.ariaLiveRegion);
        }
      });
    }
  }

  /**
   * Announces a message to screen readers via aria-live region
   * @param message The message to announce
   */
  public announce(message: string): void {
    if (!this.ariaLiveRegion) {
      return;
    }

    // Clear previous message
    this.ariaLiveRegion.textContent = '';

    // Announce new message after a brief delay to ensure screen readers pick it up
    setTimeout(() => {
      if (this.ariaLiveRegion) {
        this.ariaLiveRegion.textContent = message;
      }
    }, 100);
  }

  /**
   * Moves focus to the first focusable element within a dialog
   * @param dialogId The ID of the dialog element
   * @param announceMessage Optional message to announce when dialog opens
   * @param buttonId Optional ID of the button that triggered the dialog (for reliable focus return)
   */
  public moveFocusToDialog(dialogId: string, announceMessage?: string, buttonId?: string): void {
    if (typeof document === 'undefined') {
      return; // SSR guard
    }

    // Store the button element for reliable focus return
    // Use buttonId if provided, otherwise fall back to activeElement
    if (buttonId) {
      const button = document.getElementById(buttonId);
      if (button) {
        this.previousActiveElement = button;
      }
    } else {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement !== document.body) {
        this.previousActiveElement = activeElement;
      }
    }

    // Find dialog and first focusable element
    const dialog = document.getElementById(dialogId);
    if (!dialog) {
      console.warn(`Dialog with ID "${dialogId}" not found`);
      return;
    }

    // Check if dialog is visible
    if (dialog.classList.contains('hidden') || dialog.style.display === 'none') {
      console.warn(`Dialog "${dialogId}" is not visible`);
      return;
    }

    // Set up focus cycling
    this.setupFocusCycling(dialog);

    const firstFocusable = this.findFirstFocusableElement(dialog);

    if (firstFocusable) {
      // Small delay to ensure dialog is fully rendered
      setTimeout(() => {
        firstFocusable.focus();
      }, 50);
    }

    // Announce dialog opening to screen readers
    if (announceMessage) {
      this.announce(announceMessage);
    }
  }

  /**
   * Sets up focus cycling so that tabbing past the last element returns to the toolbar
   * @param dialog The dialog element
   */
  private setupFocusCycling(dialog: HTMLElement): void {
    // Clean up any existing handler
    this.cleanupFocusCycling();

    this.keydownHandler = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = this.getAllFocusableElements(dialog);
      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      // Tab on last element -> go to toolbar (previous element that opened the dialog)
      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        if (this.previousActiveElement) {
          this.previousActiveElement.focus();
        }
      }
      // Shift+Tab on first element -> go to last element in dialog
      else if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    };

    document.addEventListener('keydown', this.keydownHandler);
  }

  /**
   * Cleans up focus cycling event listeners
   */
  private cleanupFocusCycling(): void {
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
  }

  /**
   * Gets all focusable elements within a container
   * @param container The container element
   * @returns Array of focusable elements
   */
  private getAllFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const elements = container.querySelectorAll<HTMLElement>(focusableSelectors);
    return Array.from(elements).filter((el) => this.isVisible(el));
  }

  /**
   * Returns focus to the previously focused element (typically the button that opened the dialog)
   * @param announceMessage Optional message to announce when dialog closes
   */
  public returnFocusToPrevious(announceMessage?: string): void {
    // Clean up focus cycling
    this.cleanupFocusCycling();

    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }

    // Announce dialog closing to screen readers
    if (announceMessage) {
      this.announce(announceMessage);
    }
  }

  /**
   * Finds the first focusable element within a container
   * @param container The container element to search within
   * @returns The first focusable element or null
   */
  private findFirstFocusableElement(container: HTMLElement | null): HTMLElement | null {
    if (!container) {
      return null;
    }

    const focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelectors);

    // Return first visible and focusable element
    for (const element of Array.from(focusableElements)) {
      if (this.isVisible(element)) {
        return element;
      }
    }

    return null;
  }

  /**
   * Checks if an element is visible
   * @param element The element to check
   * @returns True if the element is visible
   */
  private isVisible(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && element.offsetParent !== null;
  }
}
