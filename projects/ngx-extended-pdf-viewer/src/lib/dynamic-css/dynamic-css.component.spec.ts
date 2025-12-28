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

  describe('ngOnDestroy', () => {
    it('should handle cleanup gracefully', () => {
      const getElementByIdSpy = jest.spyOn(mockDocument, 'getElementById').mockReturnValue(null);

      expect(() => component.ngOnDestroy()).not.toThrow();
      getElementByIdSpy.mockRestore();
    });
  });
});
