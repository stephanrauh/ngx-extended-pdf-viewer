import { TestBed } from '@angular/core/testing';
import { CSP_NONCE } from '@angular/core';
import { PDFScriptLoaderService } from './pdf-script-loader.service';
import { PdfCspPolicyService } from './pdf-csp-policy.service';
import { pdfDefaultOptions } from './options/pdf-default-options';

describe('PDFScriptLoaderService', () => {
  let service: PDFScriptLoaderService;
  let mockCspPolicyService: jest.Mocked<PdfCspPolicyService>;

  beforeEach(() => {
    // Mock CSP policy service
    mockCspPolicyService = {
      addTrustedJavaScript: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        PDFScriptLoaderService,
        { provide: PdfCspPolicyService, useValue: mockCspPolicyService },
        { provide: CSP_NONCE, useValue: 'test-nonce-123' }
      ],
    });

    service = TestBed.inject(PDFScriptLoaderService);

    // Clean up any existing scripts from previous tests
    document.querySelectorAll('.ngx-extended-pdf-viewer-script').forEach(el => el.remove());
    
    // Reset global state
    delete (globalThis as any).ngxExtendedPdfViewerCanRunModernJSCode;
    delete (globalThis as any).setNgxExtendedPdfViewerSource;
    delete (globalThis as any).pdfjsLib;
  });

  afterEach(() => {
    // Clean up scripts created during tests
    document.querySelectorAll('.ngx-extended-pdf-viewer-script').forEach(el => el.remove());
    
    // Reset global state
    delete (globalThis as any).ngxExtendedPdfViewerCanRunModernJSCode;
    delete (globalThis as any).setNgxExtendedPdfViewerSource;
    delete (globalThis as any).pdfjsLib;

    // Reset service state
    service.ngxExtendedPdfViewerIncompletelyInitialized = true;
    (service as any)._needsES5 = undefined;
    (service as any)._forceUsingLegacyES5 = false;
  });

  describe('service initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(service.forceUsingLegacyES5).toBe(false);
      expect(service.ngxExtendedPdfViewerIncompletelyInitialized).toBe(true);
      expect(service.pdfjsVersion).toBeDefined();
    });

    it('should have signal for PDF.js initialization', () => {
      expect(service.onPDFJSInitSignal).toBeDefined();
      expect(service.onPDFJSInitSignal()).toBeUndefined();
    });

    it('should set pdfjsVersion from pdfDefaultOptions', () => {
      const expectedVersion = service.pdfjsVersion;
      expect(expectedVersion).toBeTruthy();
    });
  });

  describe('forceUsingLegacyES5 property', () => {
    it('should get and set forceUsingLegacyES5 value', () => {
      expect(service.forceUsingLegacyES5).toBe(false);
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      service.forceUsingLegacyES5 = true;
      expect(service.forceUsingLegacyES5).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith('Please use the attribute `[forceUsingLegacyES5]` instead of setting the property in the service.');
      
      consoleSpy.mockRestore();
    });
  });

  describe('CSP detection methods', () => {
    it('should detect CSP applied via meta tag', () => {
      // Create a CSP meta tag
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('http-equiv', 'Content-Security-Policy');
      metaTag.setAttribute('content', "default-src 'self'");
      document.head.appendChild(metaTag);

      const isCSPApplied = (service as any).isCSPAppliedViaMetaTag();
      expect(isCSPApplied).toBe(true);

      // Clean up
      metaTag.remove();
    });

    it('should return false when no CSP meta tag exists', () => {
      const isCSPApplied = (service as any).isCSPAppliedViaMetaTag();
      expect(isCSPApplied).toBe(false);
    });

    it('should detect CSP through isCSPApplied method', () => {
      const isCSPAppliedSpy = jest.spyOn(service as any, 'isCSPAppliedViaMetaTag').mockReturnValue(true);
      
      const isCSPApplied = (service as any).isCSPApplied();
      expect(isCSPApplied).toBe(true);
      
      isCSPAppliedSpy.mockRestore();
    });
  });

  describe('script element creation', () => {
    it('should create script element with correct attributes', () => {
      const sourcePath = '/test/script.js';
      const script = (service as any).createScriptElement(sourcePath);

      expect(script.tagName).toBe('SCRIPT');
      expect(script.async).toBe(true);
      expect(script.type).toBe('text/javascript');
      expect(script.className).toBe('ngx-extended-pdf-viewer-script');
      expect(mockCspPolicyService.addTrustedJavaScript).toHaveBeenCalledWith(script, sourcePath);
    });

    it('should set type to module for .mjs files', () => {
      const sourcePath = '/test/script.mjs';
      const script = (service as any).createScriptElement(sourcePath);

      expect(script.type).toBe('module');
    });

    it('should create inline script with correct attributes and nonce', () => {
      const code = 'console.log("test");';
      const script = (service as any).createInlineScript(code);

      expect(script.tagName).toBe('SCRIPT');
      expect(script.async).toBe(true);
      expect(script.type).toBe('module');
      expect(script.className).toBe('ngx-extended-pdf-viewer-script');
      expect(script.text).toBe(code);
      expect(script.nonce).toBe('test-nonce-123');
    });

    it('should not set nonce when CSP_NONCE is not provided', () => {
      // Create service without CSP_NONCE
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          PDFScriptLoaderService,
          { provide: PdfCspPolicyService, useValue: mockCspPolicyService },
          { provide: CSP_NONCE, useValue: null }
        ],
      });
      const serviceWithoutNonce = TestBed.inject(PDFScriptLoaderService);

      const code = 'console.log("test");';
      const script = (serviceWithoutNonce as any).createInlineScript(code);

      expect(script.nonce).toBeFalsy();
    });
  });

  describe('PDF.js path generation', () => {
    it('should generate correct PDF.js path for pdf artifact', () => {
      (service as any)._needsES5 = false;
      
      const path = (service as any).getPdfJsPath('pdf');
      
      expect(path).toContain('/pdf-');
      expect(path).toContain('.mjs');
      expect(path).not.toContain('-es5');
    });

    it('should generate correct PDF.js path for viewer artifact', () => {
      (service as any)._needsES5 = false;
      
      const path = (service as any).getPdfJsPath('viewer');
      
      expect(path).toContain('/viewer-');
      expect(path).toContain('.mjs');
      expect(path).not.toContain('-es5');
    });

    it('should generate ES5 path when _needsES5 is true', () => {
      (service as any)._needsES5 = true;
      
      const path = (service as any).getPdfJsPath('pdf');
      
      expect(path).toContain('/pdf-');
      expect(path).toContain('-es5');
      expect(path).toContain('.mjs');
    });

    it('should use empty suffix for ES5 files', () => {
      (service as any)._needsES5 = true;
      pdfDefaultOptions._internalFilenameSuffix = '.min';
      
      const path = (service as any).getPdfJsPath('pdf');
      
      // ES5 files don't use minified suffix
      expect(path).not.toContain('.min');
      expect(path).toContain('-es5');
    });
  });

  describe('iOS version detection', () => {
    it('should detect iOS version requiring ES5 (iOS 13 or below)', () => {
      // Mock navigator.appVersion for iOS 13
      Object.defineProperty(navigator, 'appVersion', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X)'
      });

      const requiresES5 = (service as any).iOSVersionRequiresES5();
      expect(requiresES5).toBe(true);
    });

    it('should detect iOS version not requiring ES5 (iOS 14 or above)', () => {
      // Mock navigator.appVersion for iOS 14
      Object.defineProperty(navigator, 'appVersion', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
      });

      const requiresES5 = (service as any).iOSVersionRequiresES5();
      expect(requiresES5).toBe(false);
    });

    it('should return false when iOS version cannot be determined', () => {
      // Mock navigator.appVersion for non-iOS
      Object.defineProperty(navigator, 'appVersion', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      });

      const requiresES5 = (service as any).iOSVersionRequiresES5();
      expect(requiresES5).toBe(false);
    });

    it('should return false in server-side rendering environment', () => {
      // Mock server-side environment
      const originalWindow = (global as any).window;
      delete (global as any).window;

      const requiresES5 = (service as any).iOSVersionRequiresES5();
      expect(requiresES5).toBe(false);

      // Restore window
      (global as any).window = originalWindow;
    });
  });

  describe('ES5 requirement detection', () => {
    it('should return false in server-side rendering environment', async () => {
      // Mock server-side environment
      const originalWindow = (global as any).window;
      delete (global as any).window;

      const needsES5 = await (service as any).needsES5(false);
      expect(needsES5).toBe(false);

      // Restore window
      (global as any).window = originalWindow;
    });

    it('should detect Internet Explorer and require ES5', async () => {
      // Mock IE detection
      (globalThis as any).MSInputMethodContext = true;
      (document as any).documentMode = true;

      const needsES5 = await (service as any).needsES5(false);
      expect(needsES5).toBe(true);

      // Clean up
      delete (globalThis as any).MSInputMethodContext;
      delete (document as any).documentMode;
    });

    it('should detect Edge and require ES5', async () => {
      // Mock Edge user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edge/18.18362'
      });

      const needsES5 = await (service as any).needsES5(false);
      expect(needsES5).toBe(true);
    });

    it('should require ES5 when ReadableStream is undefined', async () => {
      // Mock missing ReadableStream
      const originalReadableStream = (globalThis as any).ReadableStream;
      delete (globalThis as any).ReadableStream;

      const needsES5 = await (service as any).needsES5(false);
      expect(needsES5).toBe(true);

      // Restore ReadableStream
      (globalThis as any).ReadableStream = originalReadableStream;
    });

    it('should require ES5 when Promise.allSettled is undefined', async () => {
      // Mock missing Promise.allSettled
      const originalAllSettled = Promise.allSettled;
      delete (Promise as any).allSettled;

      const needsES5 = await (service as any).needsES5(false);
      expect(needsES5).toBe(true);

      // Restore Promise.allSettled
      (Promise as any).allSettled = originalAllSettled;
    });

    it('should require ES5 when forceUsingLegacyES5 is true', async () => {
      service.forceUsingLegacyES5 = true;

      const needsES5 = await (service as any).needsES5(false);
      expect(needsES5).toBe(true);
    });

  });

  describe('Promise.withResolvers polyfill', () => {
    it('should add polyfill when Promise.withResolvers is undefined', () => {
      // Mock missing Promise.withResolvers
      const originalWithResolvers = (Promise as any).withResolvers;
      delete (Promise as any).withResolvers;

      (service as any).polyfillPromiseWithResolversIfZoneJSOverwritesIt();

      expect((Promise as any).withResolvers).toBeDefined();
      expect(typeof (Promise as any).withResolvers).toBe('function');

      // Test the polyfill works
      const { promise, resolve, reject } = (Promise as any).withResolvers();
      expect(promise).toBeInstanceOf(Promise);
      expect(typeof resolve).toBe('function');
      expect(typeof reject).toBe('function');

      // Restore original
      if (originalWithResolvers) {
        (Promise as any).withResolvers = originalWithResolvers;
      } else {
        delete (Promise as any).withResolvers;
      }
    });

    it('should not override existing Promise.withResolvers', () => {
      const originalWithResolvers = () => ({ promise: Promise.resolve(), resolve: () => {}, reject: () => {} });
      (Promise as any).withResolvers = originalWithResolvers;

      (service as any).polyfillPromiseWithResolversIfZoneJSOverwritesIt();

      expect((Promise as any).withResolvers).toBe(originalWithResolvers);
    });
  });

  describe('ensurePdfJsHasBeenLoaded', () => {
    it('should return true if PDFViewerApplication already exists', async () => {
      service.PDFViewerApplication = {} as any;

      const result = await service.ensurePdfJsHasBeenLoaded(false, false, false);
      expect(result).toBe(true);
    });

  });

  describe('ngOnDestroy', () => {
    it('should clean up scripts and global variables', () => {
      // Add some test scripts
      const script1 = document.createElement('script');
      script1.className = 'ngx-extended-pdf-viewer-script';
      script1.onload = jest.fn();
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.className = 'ngx-extended-pdf-viewer-script';
      script2.onload = jest.fn();
      document.body.appendChild(script2);

      // Set global variables
      (globalThis as any).setNgxExtendedPdfViewerSource = {};
      (globalThis as any).pdfjsLib = {};

      service.ngOnDestroy();

      expect((globalThis as any).setNgxExtendedPdfViewerSource).toBeUndefined();
      expect((globalThis as any).pdfjsLib).toBeUndefined();
      
      // Scripts should be removed and onload handlers nullified
      expect(document.querySelectorAll('.ngx-extended-pdf-viewer-script')).toHaveLength(0);
    });

    it('should handle server-side rendering environment', () => {
      // Mock server-side environment
      const originalWindow = (global as any).window;
      delete (global as any).window;

      expect(() => service.ngOnDestroy()).not.toThrow();

      // Restore window
      (global as any).window = originalWindow;
    });
  });

  describe('modern JavaScript code detection', () => {
    it('should resolve immediately if support is already determined', async () => {
      (globalThis as any).ngxExtendedPdfViewerCanRunModernJSCode = true;

      const result = await (service as any).ngxExtendedPdfViewerCanRunModernJSCode(false);
      expect(result).toBe(true);
    });

    it('should call addScriptOpChainingSupport if support is not determined', async () => {
      const addScriptOpChainingSupportSpy = jest.spyOn(service as any, 'addScriptOpChainingSupport')
        .mockResolvedValue(false);

      const result = await (service as any).ngxExtendedPdfViewerCanRunModernJSCode(false);
      expect(result).toBe(false);
      expect(addScriptOpChainingSupportSpy).toHaveBeenCalledWith(false);

      addScriptOpChainingSupportSpy.mockRestore();
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle script element creation with special characters in path', () => {
      const sourcePath = '/test/script with spaces & special chars.js';
      const script = (service as any).createScriptElement(sourcePath);

      expect(script).toBeDefined();
      expect(mockCspPolicyService.addTrustedJavaScript).toHaveBeenCalledWith(script, sourcePath);
    });

    it('should handle inline script creation with special characters', () => {
      const code = 'console.log("test with \\"quotes\\" and special chars");';
      const script = (service as any).createInlineScript(code);

      expect(script.text).toBe(code);
    });
  });

});