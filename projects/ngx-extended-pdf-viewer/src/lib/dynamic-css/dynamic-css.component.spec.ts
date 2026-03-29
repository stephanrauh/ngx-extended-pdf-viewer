import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CSP_NONCE, NO_ERRORS_SCHEMA, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxHasHeight } from '../ngx-has-height';
import { VerbosityLevel } from '../options/verbosity-level';
import { PdfCspPolicyService } from '../pdf-csp-policy.service';
import { DynamicCssComponent } from './dynamic-css.component';

// Mock isPlatformBrowser
jest.mock('@angular/common', () => ({
  ...jest.requireActual('@angular/common'),
  isPlatformBrowser: jest.fn(),
}));

// Create comprehensive mock elements that satisfy Angular's requirements
const createMockElement = (overrides = {}) => ({
  appendChild: jest.fn(),
  removeChild: jest.fn(),
  setAttribute: jest.fn(),
  getAttribute: jest.fn(),
  removeAttribute: jest.fn(),
  clientWidth: 1024,
  clientHeight: 768,
  style: {},
  id: '',
  className: '',
  innerHTML: '',
  textContent: '',
  parentElement: null,
  children: [],
  getBoundingClientRect: jest.fn().mockReturnValue({ top: 0, left: 0, width: 100, height: 100 }),
  ...overrides,
});

describe('DynamicCssComponent', () => {
  let component: DynamicCssComponent;
  let fixture: ComponentFixture<DynamicCssComponent>;
  let mockDocument: any;
  let mockRenderer: jest.Mocked<Renderer2>;
  let mockPdfCspPolicyService: jest.Mocked<PdfCspPolicyService>;
  let mockIsPlatformBrowser: jest.MockedFunction<typeof isPlatformBrowser>;

  beforeEach(() => {
    // Set screen/document width
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(document.documentElement, 'clientWidth', { writable: true, configurable: true, value: 1024 });
    Object.defineProperty(document.body, 'clientWidth', { writable: true, configurable: true, value: 1024 });

    mockDocument = global.document;

    mockRenderer = {
      createElement: jest.fn().mockImplementation((tagName: string) => createMockElement({ tagName })),
      appendChild: jest.fn(),
      removeChild: jest.fn(),
      setAttribute: jest.fn(),
      removeAttribute: jest.fn(),
      addClass: jest.fn(),
      removeClass: jest.fn(),
      setStyle: jest.fn(),
      removeStyle: jest.fn(),
      setProperty: jest.fn(),
      setValue: jest.fn(),
      listen: jest.fn(),
      selectRootElement: jest.fn(),
      parentNode: jest.fn(),
      nextSibling: jest.fn(),
      createText: jest.fn(),
      createComment: jest.fn(),
      destroy: jest.fn(),
    } as any;

    mockPdfCspPolicyService = {
      addTrustedCSS: jest.fn(),
    } as any;

    mockIsPlatformBrowser = isPlatformBrowser as jest.MockedFunction<typeof isPlatformBrowser>;
    mockIsPlatformBrowser.mockReturnValue(true);

    TestBed.configureTestingModule({
      declarations: [DynamicCssComponent],
      providers: [
        { provide: Renderer2, useValue: mockRenderer },
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: PdfCspPolicyService, useValue: mockPdfCspPolicyService },
        { provide: CSP_NONCE, useValue: 'test-nonce' },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    // TestBed.overrideProvider(DOCUMENT, { useValue: global.document });

    fixture = TestBed.createComponent(DynamicCssComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.zoom()).toBe(1.0);
      expect(component.width()).toBe(3.14159265359);
    });
  });

  describe('style getter', () => {
    it('should generate CSS with media queries', () => {
      const style = component.style();
      expect(style).toContain('@media');
      expect(style).toContain('always-in-secondary-menu');
    });
  });

  describe('updateToolbarWidth', () => {
    it('should handle missing container gracefully', () => {
      const getElementByIdSpy = jest.spyOn(mockDocument, 'getElementById').mockReturnValue(null);

      expect(() => component.updateToolbarWidth()).not.toThrow();
      getElementByIdSpy.mockRestore();
    });

    it('should create style element when container exists', () => {
      const mockContainer = document.createElement('div');
      Object.defineProperty(mockContainer, 'clientWidth', { configurable: true, value: 800 });

      // Spy on getElementById
      const getElementByIdSpy = jest.spyOn(document, 'getElementById');
      getElementByIdSpy
        .mockReturnValueOnce(mockContainer) // first call returns container
        .mockReturnValueOnce(null); // second call returns null

      const createElementSpy = jest.spyOn(document, 'createElement');

      component.updateToolbarWidth();

      expect(createElementSpy).toHaveBeenCalledWith('STYLE');

      // Clean up
      getElementByIdSpy.mockRestore();
      createElementSpy.mockRestore();
    });
  });

  describe('input properties', () => {
    it('should accept zoom input', () => {
      fixture.componentRef.setInput('zoom', 1.5);
      TestBed.flushEffects();
      expect(component.zoom()).toBe(1.5);
    });

    it('should accept width input', () => {
      fixture.componentRef.setInput('width', 800);
      TestBed.flushEffects();
      expect(component.width()).toBe(800);
    });
  });

  describe('removeScrollbarInInfiniteScrollMode', () => {
    it('should handle missing viewer element', () => {
      const mockNgxViewer: NgxHasHeight = {
        height: undefined,
        autoHeight: false,
        minHeight: undefined,
        markForCheck: jest.fn(),
      } as any;

      const getElementByIdSpy = jest.spyOn(mockDocument, 'getElementById').mockReturnValue(null);

      expect(() => {
        component.removeScrollbarInInfiniteScrollMode(false, 'infinite-scroll', true, mockNgxViewer, VerbosityLevel.INFOS);
      }).not.toThrow();
      getElementByIdSpy.mockRestore();
    });
  });

  describe('checkHeight', () => {
    it('should handle basic height checking', () => {
      const mockNgxViewer: NgxHasHeight = {
        height: undefined,
        autoHeight: false,
        minHeight: undefined,
        markForCheck: jest.fn(),
      } as any;

      expect(() => {
        component.checkHeight(mockNgxViewer, VerbosityLevel.INFOS);
      }).not.toThrow();
    });
  });

  describe('isZoneless and asyncWithCD', () => {
    it('should detect zoneless when Zone is undefined', () => {
      const originalZone = (globalThis as any).Zone;
      delete (globalThis as any).Zone;

      // Access private method via bracket notation
      const result = (component as any).isZoneless();
      expect(result).toBe(true);

      (globalThis as any).Zone = originalZone;
    });

    it('should detect zone-based when Zone.current exists', () => {
      const originalZone = (globalThis as any).Zone;
      (globalThis as any).Zone = { current: {} };

      const result = (component as any).isZoneless();
      expect(result).toBe(false);

      (globalThis as any).Zone = originalZone;
    });

    it('should detect zoneless when Zone exists but current is falsy', () => {
      const originalZone = (globalThis as any).Zone;
      (globalThis as any).Zone = { current: null };

      const result = (component as any).isZoneless();
      expect(result).toBe(true);

      (globalThis as any).Zone = originalZone;
    });

    it('asyncWithCD should call detectChanges when zoneless', () => {
      const originalZone = (globalThis as any).Zone;
      delete (globalThis as any).Zone;

      const callback = jest.fn();
      const cdrSpy = jest.spyOn((component as any).cdr, 'detectChanges');

      const wrapped = (component as any).asyncWithCD(callback);
      wrapped();

      expect(callback).toHaveBeenCalled();
      expect(cdrSpy).toHaveBeenCalled();

      (globalThis as any).Zone = originalZone;
    });

    it('asyncWithCD should not call detectChanges when zone-based', () => {
      const originalZone = (globalThis as any).Zone;
      (globalThis as any).Zone = { current: {} };

      const callback = jest.fn();
      const cdrSpy = jest.spyOn((component as any).cdr, 'detectChanges');

      const wrapped = (component as any).asyncWithCD(callback);
      wrapped();

      expect(callback).toHaveBeenCalled();
      expect(cdrSpy).not.toHaveBeenCalled();

      (globalThis as any).Zone = originalZone;
    });
  });

  describe('updateToolbarWidth - addTrustedCSS on existing style element', () => {
    it('should call addTrustedCSS when style element already exists', () => {
      const mockContainer = document.createElement('div');
      Object.defineProperty(mockContainer, 'clientWidth', { configurable: true, value: 800 });

      const mockStyleElement = document.createElement('style');
      mockStyleElement.id = 'pdf-dynamic-css';

      const getElementByIdSpy = jest.spyOn(document, 'getElementById');
      getElementByIdSpy
        .mockReturnValueOnce(mockContainer) // toolbarViewer
        .mockReturnValueOnce(mockStyleElement); // pdf-dynamic-css already exists

      component.updateToolbarWidth();

      expect(mockPdfCspPolicyService.addTrustedCSS).toHaveBeenCalledWith(mockStyleElement, expect.any(String));

      getElementByIdSpy.mockRestore();
    });
  });

  describe('removeScrollbarInInfiniteScrollMode - full coverage', () => {
    let mockNgxViewer: NgxHasHeight;

    beforeEach(() => {
      mockNgxViewer = {
        height: undefined,
        autoHeight: false,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };
    });

    it('should set height with primaryMenuVisible in infinite-scroll mode', () => {
      jest.useFakeTimers();

      const mockViewer = document.createElement('div');
      Object.defineProperty(mockViewer, 'clientHeight', { configurable: true, value: 500 });

      const mockZoom = document.createElement('div');

      const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue(mockViewer);
      const getElementsByClassNameSpy = jest.spyOn(document, 'getElementsByClassName').mockReturnValue([mockZoom] as any);

      component.removeScrollbarInInfiniteScrollMode(false, 'infinite-scroll', true, mockNgxViewer, VerbosityLevel.INFOS);

      jest.advanceTimersByTime(1);

      expect(mockNgxViewer.height).toBe('552px'); // 500 + 17 + 35
      expect(mockZoom.style.height).toBe('552px');

      getElementByIdSpy.mockRestore();
      getElementsByClassNameSpy.mockRestore();
      jest.useRealTimers();
    });

    it('should set height without primaryMenu when height > 17', () => {
      jest.useFakeTimers();

      const mockViewer = document.createElement('div');
      Object.defineProperty(mockViewer, 'clientHeight', { configurable: true, value: 500 });

      const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue(mockViewer);
      const getElementsByClassNameSpy = jest.spyOn(document, 'getElementsByClassName').mockReturnValue([] as any);

      component.removeScrollbarInInfiniteScrollMode(false, 'infinite-scroll', false, mockNgxViewer, VerbosityLevel.INFOS);

      jest.advanceTimersByTime(1);

      expect(mockNgxViewer.height).toBe('517px'); // 500 + 17

      getElementByIdSpy.mockRestore();
      getElementsByClassNameSpy.mockRestore();
      jest.useRealTimers();
    });

    it('should default to 100% when height is 0 and ngxViewer.height is undefined', () => {
      jest.useFakeTimers();

      const mockViewer = document.createElement('div');
      Object.defineProperty(mockViewer, 'clientHeight', { configurable: true, value: 0 });

      const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue(mockViewer);
      const getElementsByClassNameSpy = jest.spyOn(document, 'getElementsByClassName').mockReturnValue([] as any);

      component.removeScrollbarInInfiniteScrollMode(false, 'infinite-scroll', false, mockNgxViewer, VerbosityLevel.INFOS);

      jest.advanceTimersByTime(1);

      expect(mockNgxViewer.height).toBe('100%');

      getElementByIdSpy.mockRestore();
      getElementsByClassNameSpy.mockRestore();
      jest.useRealTimers();
    });

    it('should restore height when restoreHeight is true', () => {
      jest.useFakeTimers();
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });

      const mockViewer = document.createElement('div');
      Object.defineProperty(mockViewer, 'clientHeight', { configurable: true, value: 500 });

      const mockZoomContainer = document.createElement('div');
      Object.defineProperty(mockZoomContainer, 'clientHeight', { configurable: true, value: 500 });
      mockZoomContainer.getBoundingClientRect = jest.fn().mockReturnValue({ top: 50, left: 0, width: 1024, height: 500 });
      mockZoomContainer.style.zIndex = '1';

      const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue(mockViewer);
      const getElementsByClassNameSpy = jest.spyOn(document, 'getElementsByClassName').mockReturnValue([mockZoomContainer] as any);
      const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        paddingBottom: '0px',
        marginBottom: '0px',
      } as any);

      mockNgxViewer.height = '500px';

      component.removeScrollbarInInfiniteScrollMode(true, 'other-mode', false, mockNgxViewer, VerbosityLevel.INFOS);

      jest.advanceTimersByTime(1);

      expect(mockNgxViewer.height).toBeUndefined();
      expect(mockNgxViewer.autoHeight).toBe(true);

      getElementByIdSpy.mockRestore();
      getElementsByClassNameSpy.mockRestore();
      getComputedStyleSpy.mockRestore();
      jest.useRealTimers();
    });
  });

  describe('isPrinting', () => {
    it('should return false when no printing attribute exists', () => {
      const result = (component as any).isPrinting();
      expect(result).toBe(false);
    });

    it('should return true when data-pdfjsprinting attribute exists', () => {
      const el = document.createElement('div');
      el.setAttribute('data-pdfjsprinting', '');
      document.body.appendChild(el);

      const result = (component as any).isPrinting();
      expect(result).toBe(true);

      document.body.removeChild(el);
    });
  });

  describe('isContainerHeightZero', () => {
    it('should return true and log warning when container height is 0', () => {
      const mockContainer = document.createElement('div');
      Object.defineProperty(mockContainer, 'clientHeight', { configurable: true, value: 0 });

      const mockNgxViewer: NgxHasHeight = {
        height: '50%',
        autoHeight: false,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };

      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

      const result = (component as any).isContainerHeightZero(mockContainer, mockNgxViewer, VerbosityLevel.WARNINGS);

      expect(result).toBe(true);
      expect(warnSpy).toHaveBeenCalled();

      warnSpy.mockRestore();
    });

    it('should return true without warning when autoHeight is already set', () => {
      const mockContainer = document.createElement('div');
      Object.defineProperty(mockContainer, 'clientHeight', { configurable: true, value: 0 });

      const mockNgxViewer: NgxHasHeight = {
        height: '50%',
        autoHeight: true,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };

      const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

      const result = (component as any).isContainerHeightZero(mockContainer, mockNgxViewer, VerbosityLevel.WARNINGS);

      expect(result).toBe(true);
      expect(warnSpy).not.toHaveBeenCalled();

      warnSpy.mockRestore();
    });

    it('should return false when container has height', () => {
      const mockContainer = document.createElement('div');
      Object.defineProperty(mockContainer, 'clientHeight', { configurable: true, value: 500 });

      const mockNgxViewer: NgxHasHeight = {
        height: undefined,
        autoHeight: false,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };

      const result = (component as any).isContainerHeightZero(mockContainer, mockNgxViewer, VerbosityLevel.INFOS);

      expect(result).toBe(false);
    });
  });

  describe('adjustHeight', () => {
    it('should set minHeight based on available space', () => {
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });

      const mockContainer = document.createElement('div');
      mockContainer.getBoundingClientRect = jest.fn().mockReturnValue({ top: 100, left: 0, width: 1024, height: 500 });
      // Provide a zIndex to stop recursion at this element
      mockContainer.style.zIndex = '1';

      const mockNgxViewer: NgxHasHeight = {
        height: undefined,
        autoHeight: true,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };

      const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        paddingBottom: '10px',
        marginBottom: '5px',
      } as any);

      (component as any).adjustHeight(mockContainer, mockNgxViewer);

      // available=800, top=100, maximumHeight=700, padding=15, final=685
      expect(mockNgxViewer.minHeight).toBe('685px');
      expect(mockNgxViewer.markForCheck).toHaveBeenCalled();

      getComputedStyleSpy.mockRestore();
    });

    it('should set minHeight to 100px when calculated height is too small', () => {
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 200 });

      const mockContainer = document.createElement('div');
      mockContainer.getBoundingClientRect = jest.fn().mockReturnValue({ top: 180, left: 0, width: 1024, height: 20 });
      mockContainer.style.zIndex = '1';

      const mockNgxViewer: NgxHasHeight = {
        height: undefined,
        autoHeight: true,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };

      const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        paddingBottom: '10px',
        marginBottom: '5px',
      } as any);

      (component as any).adjustHeight(mockContainer, mockNgxViewer);

      // available=200, top=180, maximumHeight=20, padding=15, final=5 => clamp to 100px
      expect(mockNgxViewer.minHeight).toBe('100px');

      getComputedStyleSpy.mockRestore();
    });
  });

  describe('calculateBorderMargin', () => {
    it('should recursively calculate padding and margin', () => {
      const parent = document.createElement('div');
      parent.style.zIndex = '1'; // stops recursion at parent

      const child = document.createElement('div');
      parent.appendChild(child);

      const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockImplementation((el: Element) => {
        if (el === child) {
          return { paddingBottom: '10px', marginBottom: '5px' } as any;
        }
        return { paddingBottom: '20px', marginBottom: '8px' } as any;
      });

      const result = (component as any).calculateBorderMargin(child);

      // child: 10+5=15, parent has zIndex so: 20+8=28, total=43
      expect(result).toBe(43);

      getComputedStyleSpy.mockRestore();
    });

    it('should return 0 for null container', () => {
      const result = (component as any).calculateBorderMargin(null);
      expect(result).toBe(0);
    });

    it('should stop recursion when element has zIndex', () => {
      const el = document.createElement('div');
      el.style.zIndex = '5';

      const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        paddingBottom: '12px',
        marginBottom: '8px',
      } as any);

      const result = (component as any).calculateBorderMargin(el);

      expect(result).toBe(20); // 12+8, no recursion

      getComputedStyleSpy.mockRestore();
    });
  });

  describe('checkHeight - full integration', () => {
    it('should skip when height is defined with units', () => {
      const mockNgxViewer: NgxHasHeight = {
        height: '50vh',
        autoHeight: false,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };

      // Should return early without errors
      component.checkHeight(mockNgxViewer, VerbosityLevel.INFOS);
      expect(mockNgxViewer.markForCheck).not.toHaveBeenCalled();
    });

    it('should skip when printing', () => {
      const el = document.createElement('div');
      el.setAttribute('data-pdfjsprinting', '');
      document.body.appendChild(el);

      const mockNgxViewer: NgxHasHeight = {
        height: undefined,
        autoHeight: false,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };

      component.checkHeight(mockNgxViewer, VerbosityLevel.INFOS);
      expect(mockNgxViewer.markForCheck).not.toHaveBeenCalled();

      document.body.removeChild(el);
    });

    it('should set autoHeight and adjustHeight when container height is zero', () => {
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });

      const mockZoomContainer = document.createElement('div');
      Object.defineProperty(mockZoomContainer, 'clientHeight', { configurable: true, value: 0 });
      mockZoomContainer.getBoundingClientRect = jest.fn().mockReturnValue({ top: 50, left: 0, width: 1024, height: 0 });
      mockZoomContainer.style.zIndex = '1';

      const getElementsByClassNameSpy = jest.spyOn(document, 'getElementsByClassName').mockReturnValue([mockZoomContainer] as any);

      const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle').mockReturnValue({
        paddingBottom: '0px',
        marginBottom: '0px',
      } as any);

      const mockNgxViewer: NgxHasHeight = {
        height: undefined,
        autoHeight: false,
        minHeight: undefined,
        markForCheck: jest.fn(),
      };

      component.checkHeight(mockNgxViewer, VerbosityLevel.INFOS);

      expect(mockNgxViewer.autoHeight).toBe(true);
      expect(mockNgxViewer.minHeight).toBe('750px'); // 800-50-0
      expect(mockNgxViewer.markForCheck).toHaveBeenCalled();

      getElementsByClassNameSpy.mockRestore();
      getComputedStyleSpy.mockRestore();
    });
  });

  describe('ngOnDestroy', () => {
    it('should handle cleanup gracefully', () => {
      const getElementByIdSpy = jest.spyOn(mockDocument, 'getElementById').mockReturnValue(null);

      expect(() => component.ngOnDestroy()).not.toThrow();
      getElementByIdSpy.mockRestore();
    });
  });
});
