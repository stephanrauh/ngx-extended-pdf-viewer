import { pdfDefaultOptions } from '../options/pdf-default-options';
import { PositioningService } from './positioning.service';

// Mock the options module properly
jest.mock('../options/pdf-default-options', () => ({
  pdfDefaultOptions: {
    positionPopupDialogsWithJavaScript: true,
  },
}));

describe('PositioningService', () => {
  let service: PositioningService;
  let mockButton: HTMLElement;
  let mockPopup: HTMLElement;
  let mockContainer: HTMLElement;
  let mockToolbar: HTMLElement;

  const createMockElement = (id: string, tagName = 'div') => {
    const element = document.createElement(tagName);
    element.id = id;
    return element;
  };

  const mockGetBoundingClientRect = (element: HTMLElement, rect: Partial<DOMRect>) => {
    const defaultRect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      toJSON: () => ({}),
    };
    element.getBoundingClientRect = jest.fn(() => ({ ...defaultRect, ...rect }));
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    (pdfDefaultOptions as any).positionPopupDialogsWithJavaScript = true;

    service = new PositioningService();

    // Clear DOM
    document.body.innerHTML = '';
    document.documentElement.removeAttribute('dir');

    // Create elements
    mockButton = createMockElement('testButton', 'button');
    mockContainer = createMockElement('container');
    mockPopup = createMockElement('testPopup');
    mockToolbar = createMockElement('toolbarContainer');

    // Setup DOM structure - IMPORTANT: popup must be child of container for offsetParent
    document.body.appendChild(mockButton);
    document.body.appendChild(mockToolbar);
    mockContainer.appendChild(mockPopup);
    document.body.appendChild(mockContainer);

    // Mock getBoundingClientRect for all elements
    mockGetBoundingClientRect(mockButton, {
      left: 100,
      top: 50,
      right: 180,
      bottom: 80,
      width: 80,
      height: 30,
    });

    mockGetBoundingClientRect(mockContainer, {
      left: 10,
      top: 10,
      right: 500,
      bottom: 400,
      width: 490,
      height: 390,
    });

    mockGetBoundingClientRect(mockToolbar, {
      left: 0,
      top: 0,
      right: 500,
      bottom: 40,
      width: 500,
      height: 40,
    });

    // CRITICAL: Set offsetParent properly - this is why tests were failing
    Object.defineProperty(mockPopup, 'offsetParent', {
      get: () => mockContainer,
      configurable: true,
    });

    Object.defineProperty(mockButton, 'offsetParent', {
      get: () => document.body,
      configurable: true,
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('positionPopupBelowItsButton', () => {
    it('should not position popup when JavaScript positioning is disabled', (done) => {
      (pdfDefaultOptions as any).positionPopupDialogsWithJavaScript = false;

      const originalPosition = mockPopup.style.position;
      service.positionPopupBelowItsButton('testButton', 'testPopup');

      // Check immediately - setTimeout should not even run
      expect(mockPopup.style.position).toBe(originalPosition);

      // Wait a bit to ensure setTimeout doesn't execute
      setTimeout(() => {
        expect(mockPopup.style.position).toBe(originalPosition);
        done();
      }, 10);
    });

    it('should position popup correctly for LTR without doorHangerRight class', (done) => {
      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe('absolute');
        expect(mockPopup.style.display).toBe('block');
        expect(mockPopup.style.transformOrigin).toBe('top left');
        expect(mockPopup.style.left).toBe('113px'); // 100 - 10 + 40 - 17 = 113
        expect(mockPopup.style.right).toBe('');
        expect(mockPopup.style.top).toBe('34px'); // 40 - 10 + 4 = 34
        done();
      }, 10);
    });

    it('should position popup correctly for LTR with doorHangerRight class', (done) => {
      mockPopup.classList.add('doorHangerRight');

      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe('absolute');
        expect(mockPopup.style.transformOrigin).toBe('top right');
        expect(mockPopup.style.right).toBe('343px'); // 500 - 180 + 40 - 17 = 343
        expect(mockPopup.style.left).toBe('');
        done();
      }, 10);
    });

    it('should position popup correctly for RTL without doorHangerRight class', (done) => {
      document.documentElement.setAttribute('dir', 'rtl');

      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.transformOrigin).toBe('top right');
        expect(mockPopup.style.right).toBe('343px'); // RTL behavior
        expect(mockPopup.style.left).toBe('');
        done();
      }, 10);
    });

    it('should position popup correctly for RTL with doorHangerRight class', (done) => {
      document.documentElement.setAttribute('dir', 'rtl');
      mockPopup.classList.add('doorHangerRight');

      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.transformOrigin).toBe('top left');
        expect(mockPopup.style.left).toBe('113px'); // RTL + doorHangerRight = LTR behavior
        expect(mockPopup.style.right).toBe('');
        done();
      }, 10);
    });

    it('should fallback to secondaryToolbarToggle when primary button is not visible', (done) => {
      // Hide the primary button by setting offsetParent to null
      Object.defineProperty(mockButton, 'offsetParent', {
        get: () => null,
        configurable: true,
      });

      // Create fallback button
      const fallbackButton = createMockElement('secondaryToolbarToggle', 'button');
      document.body.appendChild(fallbackButton);

      mockGetBoundingClientRect(fallbackButton, {
        left: 200,
        top: 50,
        right: 280,
        bottom: 80,
        width: 80,
        height: 30,
      });

      Object.defineProperty(fallbackButton, 'offsetParent', {
        get: () => document.body,
        configurable: true,
      });

      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe('absolute');
        expect(mockPopup.style.left).toBe('213px'); // 200 - 10 + 40 - 17 = 213
        done();
      }, 10);
    });

    it('should not position popup when no visible button is found', (done) => {
      // Hide all buttons
      Object.defineProperty(mockButton, 'offsetParent', {
        get: () => null,
        configurable: true,
      });

      const originalPosition = mockPopup.style.position;
      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe(originalPosition);
        done();
      }, 10);
    });

    it('should not position popup when popup element is not found', (done) => {
      const originalPosition = mockPopup.style.position;
      service.positionPopupBelowItsButton('testButton', 'nonExistentPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe(originalPosition);
        done();
      }, 10);
    });

    it('should not position popup when popup has no offsetParent', (done) => {
      Object.defineProperty(mockPopup, 'offsetParent', {
        get: () => null,
        configurable: true,
      });

      const originalPosition = mockPopup.style.position;
      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe(originalPosition);
        done();
      }, 10);
    });

    it('should handle missing toolbar container gracefully', (done) => {
      // Remove toolbar
      mockToolbar.remove();

      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe('absolute');
        expect(mockPopup.style.top).toBe(''); // Should not set top without toolbar
        done();
      }, 10);
    });

    it('should calculate positions correctly with different button dimensions', (done) => {
      // Change button width to 100
      mockGetBoundingClientRect(mockButton, {
        left: 100,
        top: 50,
        right: 200,
        bottom: 80,
        width: 100,
        height: 30,
      });

      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.left).toBe('123px'); // 100 - 10 + 50 - 17 = 123
        done();
      }, 10);
    });
  });

  describe('edge cases', () => {
    it('should handle multiple elements with same ID', (done) => {
      // Create duplicate button (hidden)
      const duplicateButton = createMockElement('testButton', 'button');
      Object.defineProperty(duplicateButton, 'offsetParent', {
        get: () => null,
        configurable: true,
      });
      document.body.insertBefore(duplicateButton, mockButton);

      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe('absolute');
        expect(mockButton.getBoundingClientRect).toHaveBeenCalled();
        done();
      }, 10);
    });

    it('should work with real setTimeout timing', (done) => {
      service.positionPopupBelowItsButton('testButton', 'testPopup');

      setTimeout(() => {
        expect(mockPopup.style.position).toBe('absolute');
        done();
      }, 10);
    });

    it('should work with fake timers', () => {
      jest.useFakeTimers();

      service.positionPopupBelowItsButton('testButton', 'testPopup');

      // Before timer runs
      expect(mockPopup.style.position).not.toBe('absolute');

      // After timer runs
      jest.runAllTimers();
      expect(mockPopup.style.position).toBe('absolute');

      jest.useRealTimers();
    });
  });
});
