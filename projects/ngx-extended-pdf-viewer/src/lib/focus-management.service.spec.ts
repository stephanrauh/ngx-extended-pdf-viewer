import { FocusManagementService } from './focus-management.service';

describe('FocusManagementService', () => {
  let service: FocusManagementService;
  let mockBody: any;
  let mockAriaLiveRegion: any;

  beforeEach(() => {
    jest.useFakeTimers();

    mockAriaLiveRegion = {
      setAttribute: jest.fn(),
      style: {} as any,
      textContent: '',
    };

    mockBody = {
      appendChild: jest.fn(),
    };

    // Mock document.createElement to return our mock aria-live region
    const originalCreateElement = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'div') {
        return mockAriaLiveRegion as any;
      }
      return originalCreateElement(tag);
    });

    Object.defineProperty(document, 'body', {
      value: mockBody,
      writable: true,
      configurable: true,
    });

    service = new FocusManagementService();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('constructor / initializeAriaLiveRegion', () => {
    it('should create an aria-live region and append it to the body', () => {
      expect(document.createElement).toHaveBeenCalledWith('div');
      expect(mockAriaLiveRegion.setAttribute).toHaveBeenCalledWith('aria-live', 'polite');
      expect(mockAriaLiveRegion.setAttribute).toHaveBeenCalledWith('aria-atomic', 'true');
      expect(mockAriaLiveRegion.setAttribute).toHaveBeenCalledWith('class', 'sr-only');
      expect(mockBody.appendChild).toHaveBeenCalledWith(mockAriaLiveRegion);
    });

    it('should set offscreen positioning styles on the aria-live region', () => {
      expect(mockAriaLiveRegion.style.position).toBe('absolute');
      expect(mockAriaLiveRegion.style.left).toBe('-10000px');
      expect(mockAriaLiveRegion.style.width).toBe('1px');
      expect(mockAriaLiveRegion.style.height).toBe('1px');
      expect(mockAriaLiveRegion.style.overflow).toBe('hidden');
    });

    it('should defer appending if document.body is not available', () => {
      jest.restoreAllMocks();

      const deferredRegion = {
        setAttribute: jest.fn(),
        style: {} as any,
        textContent: '',
      };

      jest.spyOn(document, 'createElement').mockReturnValue(deferredRegion as any);

      Object.defineProperty(document, 'body', {
        value: null,
        writable: true,
        configurable: true,
      });

      const addEventSpy = jest.spyOn(document, 'addEventListener');

      void new FocusManagementService(); // NOSONAR — instantiation side-effect is intentional, result not needed

      expect(addEventSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));

      // Simulate DOMContentLoaded callback
      const callback = addEventSpy.mock.calls.find((c) => c[0] === 'DOMContentLoaded')![1] as Function;

      // Restore body before calling the callback
      const restoredBody = { appendChild: jest.fn() };
      Object.defineProperty(document, 'body', {
        value: restoredBody,
        writable: true,
        configurable: true,
      });

      callback();

      expect(restoredBody.appendChild).toHaveBeenCalledWith(deferredRegion);
    });
  });

  describe('announce', () => {
    it('should clear textContent immediately and set message after 100ms', () => {
      mockAriaLiveRegion.textContent = 'old message';

      service.announce('Hello screen reader');

      // Immediately cleared
      expect(mockAriaLiveRegion.textContent).toBe('');

      // Not yet set
      jest.advanceTimersByTime(99);
      expect(mockAriaLiveRegion.textContent).toBe('');

      // After 100ms
      jest.advanceTimersByTime(1);
      expect(mockAriaLiveRegion.textContent).toBe('Hello screen reader');
    });

    it('should do nothing if ariaLiveRegion is null', () => {
      // Force ariaLiveRegion to null
      (service as any).ariaLiveRegion = null;

      expect(() => service.announce('test')).not.toThrow();
    });
  });

  describe('moveFocusToDialog', () => {
    let mockDialog: any;
    let mockFocusableButton: any;

    beforeEach(() => {
      mockFocusableButton = {
        focus: jest.fn(),
        offsetParent: {},
      };

      mockDialog = {
        classList: { contains: jest.fn().mockReturnValue(false) },
        style: { display: '' },
        querySelectorAll: jest.fn().mockReturnValue([mockFocusableButton]),
      };

      jest.spyOn(document, 'getElementById').mockImplementation((id: string) => {
        if (id === 'myDialog') {
          return mockDialog;
        }
        if (id === 'triggerBtn') {
          return { focus: jest.fn() } as any;
        }
        return null;
      });

      jest.spyOn(document, 'addEventListener').mockImplementation(() => {});
      jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});

      jest.spyOn(globalThis.window, 'getComputedStyle').mockReturnValue({
        display: 'block',
        visibility: 'visible',
      } as CSSStyleDeclaration);
    });

    it('should store the currently active element and focus first focusable element', () => {
      const mockActiveElement = { focus: jest.fn() } as any;
      Object.defineProperty(document, 'activeElement', {
        value: mockActiveElement,
        writable: true,
        configurable: true,
      });

      service.moveFocusToDialog('myDialog');

      expect((service as any).previousActiveElement).toBe(mockActiveElement);

      // Focus happens after 50ms delay
      jest.advanceTimersByTime(50);
      expect(mockFocusableButton.focus).toHaveBeenCalled();
    });

    it('should store the button by ID if buttonId is provided', () => {
      const triggerButton = { focus: jest.fn() };
      (document.getElementById as jest.Mock).mockImplementation((id: string) => {
        if (id === 'triggerBtn') {
          return triggerButton;
        }
        if (id === 'myDialog') {
          return mockDialog;
        }
        return null;
      });

      service.moveFocusToDialog('myDialog', undefined, 'triggerBtn');

      expect((service as any).previousActiveElement).toBe(triggerButton);
    });

    it('should not store activeElement if it is document.body', () => {
      Object.defineProperty(document, 'activeElement', {
        value: mockBody,
        writable: true,
        configurable: true,
      });

      // Ensure body reference matches
      Object.defineProperty(document, 'body', {
        value: mockBody,
        writable: true,
        configurable: true,
      });

      service.moveFocusToDialog('myDialog');

      expect((service as any).previousActiveElement).toBeNull();
    });

    it('should warn and return if dialog is not found', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

      service.moveFocusToDialog('nonExistentDialog');

      expect(warnSpy).toHaveBeenCalledWith('Dialog with ID "nonExistentDialog" not found');
    });

    it('should warn and return if dialog has hidden class', () => {
      mockDialog.classList.contains = jest.fn((cls: string) => cls === 'hidden');
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

      service.moveFocusToDialog('myDialog');

      expect(warnSpy).toHaveBeenCalledWith('Dialog "myDialog" is not visible');
    });

    it('should warn and return if dialog has display:none', () => {
      mockDialog.style.display = 'none';
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

      service.moveFocusToDialog('myDialog');

      expect(warnSpy).toHaveBeenCalledWith('Dialog "myDialog" is not visible');
    });

    it('should announce the message if announceMessage is provided', () => {
      const announceSpy = jest.spyOn(service, 'announce');

      service.moveFocusToDialog('myDialog', 'Dialog opened');

      expect(announceSpy).toHaveBeenCalledWith('Dialog opened');
    });

    it('should not announce if no announceMessage is provided', () => {
      const announceSpy = jest.spyOn(service, 'announce');

      service.moveFocusToDialog('myDialog');

      expect(announceSpy).not.toHaveBeenCalled();
    });
  });

  describe('setupFocusCycling', () => {
    let mockDialog: any;
    let firstEl: any;
    let lastEl: any;
    let addEventSpy: jest.SpyInstance;

    beforeEach(() => {
      firstEl = { focus: jest.fn(), offsetParent: {} };
      lastEl = { focus: jest.fn(), offsetParent: {} };

      mockDialog = {
        querySelectorAll: jest.fn().mockReturnValue([firstEl, lastEl]),
      };

      addEventSpy = jest.spyOn(document, 'addEventListener').mockImplementation(() => {});
      jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});

      jest.spyOn(globalThis.window, 'getComputedStyle').mockReturnValue({
        display: 'block',
        visibility: 'visible',
      } as CSSStyleDeclaration);
    });

    it('should add a keydown listener to document', () => {
      (service as any).setupFocusCycling(mockDialog);

      expect(addEventSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should focus previousActiveElement when Tab on last element', () => {
      const prevElement = { focus: jest.fn() };
      (service as any).previousActiveElement = prevElement;
      (service as any).setupFocusCycling(mockDialog);

      const handler = addEventSpy.mock.calls.find((c) => c[0] === 'keydown')![1];

      Object.defineProperty(document, 'activeElement', {
        value: lastEl,
        writable: true,
        configurable: true,
      });

      const event = { key: 'Tab', shiftKey: false, preventDefault: jest.fn() };
      handler(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(prevElement.focus).toHaveBeenCalled();
    });

    it('should focus last element when Shift+Tab on first element', () => {
      (service as any).setupFocusCycling(mockDialog);

      const handler = addEventSpy.mock.calls.find((c) => c[0] === 'keydown')![1];

      Object.defineProperty(document, 'activeElement', {
        value: firstEl,
        writable: true,
        configurable: true,
      });

      const event = { key: 'Tab', shiftKey: true, preventDefault: jest.fn() };
      handler(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(lastEl.focus).toHaveBeenCalled();
    });

    it('should do nothing for non-Tab keys', () => {
      (service as any).setupFocusCycling(mockDialog);

      const handler = addEventSpy.mock.calls.find((c) => c[0] === 'keydown')![1];

      const event = { key: 'Escape', shiftKey: false, preventDefault: jest.fn() };
      handler(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should do nothing if there are no focusable elements', () => {
      mockDialog.querySelectorAll.mockReturnValue([]);
      (service as any).setupFocusCycling(mockDialog);

      const handler = addEventSpy.mock.calls.find((c) => c[0] === 'keydown')![1];

      const event = { key: 'Tab', shiftKey: false, preventDefault: jest.fn() };
      handler(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should clean up previous handler before setting up new one', () => {
      const removeSpy = jest.spyOn(document, 'removeEventListener');

      (service as any).setupFocusCycling(mockDialog);
      const firstHandler = (service as any).keydownHandler;

      (service as any).setupFocusCycling(mockDialog);

      expect(removeSpy).toHaveBeenCalledWith('keydown', firstHandler);
    });
  });

  describe('cleanupFocusCycling', () => {
    it('should remove keydown handler and set it to null', () => {
      const removeSpy = jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});
      const handler = jest.fn();
      (service as any).keydownHandler = handler;

      (service as any).cleanupFocusCycling();

      expect(removeSpy).toHaveBeenCalledWith('keydown', handler);
      expect((service as any).keydownHandler).toBeNull();
    });

    it('should do nothing if no handler exists', () => {
      const removeSpy = jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});
      (service as any).keydownHandler = null;

      (service as any).cleanupFocusCycling();

      expect(removeSpy).not.toHaveBeenCalled();
    });
  });

  describe('getAllFocusableElements', () => {
    it('should return only visible focusable elements', () => {
      const visibleEl = { offsetParent: {} } as any;
      const hiddenEl = { offsetParent: null } as any;

      const container = {
        querySelectorAll: jest.fn().mockReturnValue([visibleEl, hiddenEl]),
      } as any;

      jest.spyOn(globalThis.window, 'getComputedStyle').mockImplementation((el: Element) => {
        if (el === visibleEl) {
          return { display: 'block', visibility: 'visible' } as CSSStyleDeclaration;
        }
        return { display: 'none', visibility: 'visible' } as CSSStyleDeclaration;
      });

      const result = (service as any).getAllFocusableElements(container);

      expect(result).toEqual([visibleEl]);
      expect(container.querySelectorAll).toHaveBeenCalledWith(expect.stringContaining('button:not([disabled])'));
    });
  });

  describe('returnFocusToPrevious', () => {
    it('should focus the previously stored element and clear it', () => {
      jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});
      const prevEl = { focus: jest.fn() };
      (service as any).previousActiveElement = prevEl;

      service.returnFocusToPrevious();

      expect(prevEl.focus).toHaveBeenCalled();
      expect((service as any).previousActiveElement).toBeNull();
    });

    it('should announce a message if provided', () => {
      jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});
      const announceSpy = jest.spyOn(service, 'announce');

      service.returnFocusToPrevious('Dialog closed');

      expect(announceSpy).toHaveBeenCalledWith('Dialog closed');
    });

    it('should not announce if no message is provided', () => {
      jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});
      const announceSpy = jest.spyOn(service, 'announce');

      service.returnFocusToPrevious();

      expect(announceSpy).not.toHaveBeenCalled();
    });

    it('should clean up focus cycling', () => {
      const handler = jest.fn();
      (service as any).keydownHandler = handler;
      const removeSpy = jest.spyOn(document, 'removeEventListener').mockImplementation(() => {});

      service.returnFocusToPrevious();

      expect(removeSpy).toHaveBeenCalledWith('keydown', handler);
    });
  });

  describe('findFirstFocusableElement', () => {
    it('should return the first visible focusable element', () => {
      const visibleBtn = { offsetParent: {} } as any;
      const container = {
        querySelectorAll: jest.fn().mockReturnValue([visibleBtn]),
      } as any;

      jest.spyOn(globalThis.window, 'getComputedStyle').mockReturnValue({
        display: 'block',
        visibility: 'visible',
      } as CSSStyleDeclaration);

      const result = (service as any).findFirstFocusableElement(container);

      expect(result).toBe(visibleBtn);
    });

    it('should return null if container is null', () => {
      const result = (service as any).findFirstFocusableElement(null);
      expect(result).toBeNull();
    });

    it('should return null if no visible focusable elements exist', () => {
      const hiddenEl = { offsetParent: null } as any;
      const container = {
        querySelectorAll: jest.fn().mockReturnValue([hiddenEl]),
      } as any;

      jest.spyOn(globalThis.window, 'getComputedStyle').mockReturnValue({
        display: 'none',
        visibility: 'visible',
      } as CSSStyleDeclaration);

      const result = (service as any).findFirstFocusableElement(container);

      expect(result).toBeNull();
    });

    it('should skip hidden elements and return the first visible one', () => {
      const hiddenEl = { offsetParent: null } as any;
      const visibleEl = { offsetParent: {} } as any;
      const container = {
        querySelectorAll: jest.fn().mockReturnValue([hiddenEl, visibleEl]),
      } as any;

      jest.spyOn(globalThis.window, 'getComputedStyle').mockImplementation((el: Element) => {
        if (el === hiddenEl) {
          return { display: 'none', visibility: 'visible' } as CSSStyleDeclaration;
        }
        return { display: 'block', visibility: 'visible' } as CSSStyleDeclaration;
      });

      const result = (service as any).findFirstFocusableElement(container);

      expect(result).toBe(visibleEl);
    });
  });

  describe('isVisible', () => {
    it('should return true for a visible element', () => {
      const el = { offsetParent: {} } as any;
      jest.spyOn(globalThis.window, 'getComputedStyle').mockReturnValue({
        display: 'block',
        visibility: 'visible',
      } as CSSStyleDeclaration);

      expect((service as any).isVisible(el)).toBe(true);
    });

    it('should return false if display is none', () => {
      const el = { offsetParent: {} } as any;
      jest.spyOn(globalThis.window, 'getComputedStyle').mockReturnValue({
        display: 'none',
        visibility: 'visible',
      } as CSSStyleDeclaration);

      expect((service as any).isVisible(el)).toBe(false);
    });

    it('should return false if visibility is hidden', () => {
      const el = { offsetParent: {} } as any;
      jest.spyOn(globalThis.window, 'getComputedStyle').mockReturnValue({
        display: 'block',
        visibility: 'hidden',
      } as CSSStyleDeclaration);

      expect((service as any).isVisible(el)).toBe(false);
    });

    it('should return false if offsetParent is null', () => {
      const el = { offsetParent: null } as any;
      jest.spyOn(globalThis.window, 'getComputedStyle').mockReturnValue({
        display: 'block',
        visibility: 'visible',
      } as CSSStyleDeclaration);

      expect((service as any).isVisible(el)).toBe(false);
    });
  });
});
