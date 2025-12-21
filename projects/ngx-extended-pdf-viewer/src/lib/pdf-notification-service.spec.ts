import { TestBed } from '@angular/core/testing';
import { PDFNotificationService } from './pdf-notification-service';
import { getVersionSuffix, pdfDefaultOptions } from './options/pdf-default-options';

// Mock the pdf-default-options module
jest.mock('./options/pdf-default-options', () => ({
  getVersionSuffix: jest.fn(() => '4.0.379'),
  pdfDefaultOptions: {
    assetsFolder: '/assets/'
  }
}));

describe('PDFNotificationService', () => {
  let service: PDFNotificationService;
  const mockGetVersionSuffix = getVersionSuffix as jest.MockedFunction<typeof getVersionSuffix>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PDFNotificationService]
    });
    
    mockGetVersionSuffix.mockClear();
    mockGetVersionSuffix.mockReturnValue('4.0.379');
    
    service = TestBed.inject(PDFNotificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
      expect(service).toBeInstanceOf(PDFNotificationService);
    });

    it('should be provided in root', () => {
      const serviceFromRoot = TestBed.inject(PDFNotificationService);
      expect(serviceFromRoot).toBe(service);
    });

    it('should initialize onPDFJSInitSignal with undefined', () => {
      expect(service.onPDFJSInitSignal()).toBeUndefined();
    });

    it('should initialize pdfjsVersion by calling getVersionSuffix', () => {
      expect(mockGetVersionSuffix).toHaveBeenCalledWith(pdfDefaultOptions.assetsFolder);
      expect(service.pdfjsVersion).toBe('4.0.379');
    });
  });

  describe('onPDFJSInitSignal', () => {
    it('should be a signal', () => {
      expect(typeof service.onPDFJSInitSignal).toBe('function');
      expect(service.onPDFJSInitSignal.set).toBeDefined();
      expect(service.onPDFJSInitSignal.update).toBeDefined();
    });

    it('should allow setting mock PDFViewerApplication', () => {
      const mockApp = { test: 'mock app' } as any;

      service.onPDFJSInitSignal.set(mockApp);
      
      expect(service.onPDFJSInitSignal()).toBe(mockApp);
    });

    it('should handle null values', () => {
      service.onPDFJSInitSignal.set(null as any);
      
      expect(service.onPDFJSInitSignal()).toBeNull();
    });
  });

  describe('pdfjsVersion', () => {
    it('should return version string from getVersionSuffix', () => {
      expect(service.pdfjsVersion).toBe('4.0.379');
    });

    it('should handle different version formats', () => {
      mockGetVersionSuffix.mockReturnValue('3.11.174');
      
      // Trigger the effect by setting the signal to a truthy value
      service.onPDFJSInitSignal.set({ test: 'mock app' } as any);
      
      // Flush effects to ensure they run synchronously
      TestBed.flushEffects();
      
      expect(service.pdfjsVersion).toBe('3.11.174');
    });

    it('should handle empty version string', () => {
      mockGetVersionSuffix.mockReturnValue('');
      
      // Trigger the effect by setting the signal to a truthy value
      service.onPDFJSInitSignal.set({ test: 'mock app' } as any);
      
      // Flush effects to ensure they run synchronously
      TestBed.flushEffects();
      
      expect(service.pdfjsVersion).toBe('');
    });
  });

  describe('version management', () => {
    it('should track PDF.js version changes with assets folder updates', () => {
      expect(service.pdfjsVersion).toBe('4.0.379');

      // Setup new version mock
      mockGetVersionSuffix.mockReturnValue('4.1.0');
      pdfDefaultOptions.assetsFolder = '/new-assets/';

      // Trigger the effect by setting the signal to a truthy value
      const mockApp = { test: 'app' } as any;
      service.onPDFJSInitSignal.set(mockApp);

      // Flush effects to ensure they run synchronously
      TestBed.flushEffects();

      // Version should be updated by the effect
      expect(service.pdfjsVersion).toBe('4.1.0');
    });

    it('should handle version suffix errors gracefully', () => {
      mockGetVersionSuffix.mockImplementation(() => {
        throw new Error('Version parsing error');
      });

      expect(() => {
        new PDFNotificationService();
      }).toThrow('Version parsing error');
    });
  });

  describe('signal behavior', () => {
    it('should maintain signal reactivity', () => {
      let signalValue = service.onPDFJSInitSignal();
      expect(signalValue).toBeUndefined();
      
      const mockApp1 = { id: 1 } as any;
      service.onPDFJSInitSignal.set(mockApp1);
      expect(service.onPDFJSInitSignal()).toBe(mockApp1);
      
      const mockApp2 = { id: 2 } as any;
      service.onPDFJSInitSignal.set(mockApp2);
      expect(service.onPDFJSInitSignal()).toBe(mockApp2);
    });

    it('should update signal value correctly', () => {
      const mockApp = { 
        initialValue: true,
        pdfThumbnailViewer: {},
        appConfig: {},
        eventBus: {},
        pdfViewer: {},
        l10n: {}
      } as any;
      service.onPDFJSInitSignal.set(mockApp);
      
      service.onPDFJSInitSignal.update(current => ({ 
        ...current, 
        updated: true 
      }) as any);
      
      const updated = service.onPDFJSInitSignal();
      expect(updated).toEqual({ 
        initialValue: true, 
        updated: true,
        pdfThumbnailViewer: {},
        appConfig: {},
        eventBus: {},
        pdfViewer: {},
        l10n: {}
      });
    });
  });
});