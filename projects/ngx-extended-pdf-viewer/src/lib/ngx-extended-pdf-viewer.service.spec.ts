import { TestBed } from '@angular/core/testing';
import { RendererFactory2 } from '@angular/core';
import { NgxExtendedPdfViewerService, FindOptions } from './ngx-extended-pdf-viewer.service';
import { PDFNotificationService } from './pdf-notification-service';
import { PDFPrintRange } from './options/pdf-print-range';

describe('NgxExtendedPdfViewerService', () => {
  let service: NgxExtendedPdfViewerService;
  let mockRendererFactory: jest.Mocked<RendererFactory2>;
  let mockNotificationService: jest.Mocked<PDFNotificationService>;
  let mockRenderer: any;

  beforeEach(() => {
    mockRenderer = {
      createElement: jest.fn(),
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
      destroy: jest.fn()
    };

    mockRendererFactory = {
      createRenderer: jest.fn().mockReturnValue(mockRenderer),
      begin: jest.fn(),
      end: jest.fn(),
      whenRenderingDone: jest.fn()
    } as any;

    mockNotificationService = {
      onPDFJSInitSignal: jest.fn(() => undefined),
      pdfjsVersion: '4.0.379'
    } as any;

    TestBed.configureTestingModule({
      providers: [
        NgxExtendedPdfViewerService,
        { provide: RendererFactory2, useValue: mockRendererFactory },
        { provide: PDFNotificationService, useValue: mockNotificationService }
      ],
    });
    service = TestBed.inject(NgxExtendedPdfViewerService);
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(service.ngxExtendedPdfViewerInitialized).toBe(false);
      expect(service.secondaryMenuIsEmpty).toBe(false);
    });

    it('should create renderer from factory', () => {
      expect(mockRendererFactory.createRenderer).toHaveBeenCalledWith(null, null);
    });
  });

  describe('find method', () => {
    beforeEach(() => {
      // Mock DOM elements for find functionality
      const mockHighlightCheckbox = { checked: false } as HTMLInputElement;
      const mockMatchCaseCheckbox = { checked: false } as HTMLInputElement;
      const mockFindMultipleCheckbox = { checked: false } as HTMLInputElement;
      const mockWholeWordsCheckbox = { checked: false } as HTMLInputElement;
      const mockMatchDiacriticsCheckbox = { checked: false } as HTMLInputElement;
      const mockRegExpCheckbox = { checked: false } as HTMLInputElement;

      jest.spyOn(document, 'getElementById').mockImplementation((id: string) => {
        switch (id) {
          case 'findHighlightAll': return mockHighlightCheckbox;
          case 'findMatchCase': return mockMatchCaseCheckbox;
          case 'findMultiple': return mockFindMultipleCheckbox;
          case 'findEntireWord': return mockWholeWordsCheckbox;
          case 'findMatchDiacritics': return mockMatchDiacriticsCheckbox;
          case 'matchRegExp': return mockRegExpCheckbox;
          default: return null;
        }
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return undefined when PDF viewer not initialized', () => {
      service.ngxExtendedPdfViewerInitialized = false;
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = service.find('test');

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith("The PDF viewer hasn't finished initializing. Please call find() later.");
      
      consoleSpy.mockRestore();
    });

    it('should handle find with default options', () => {
      service.ngxExtendedPdfViewerInitialized = true;

      // This test focuses on the option handling logic, not PDF.js integration
      service.find('test');

      // The method sets up DOM checkboxes based on options
      expect(document.getElementById).toHaveBeenCalledWith('findHighlightAll');
      expect(document.getElementById).toHaveBeenCalledWith('findMatchCase');
    });

    it('should configure DOM checkboxes based on find options', () => {
      service.ngxExtendedPdfViewerInitialized = true;
      const options: FindOptions = {
        highlightAll: true,
        matchCase: true,
        wholeWords: true,
        matchDiacritics: true,
        findMultiple: true,
        regexp: true
      };

      service.find('test', options);

      const highlightCheckbox = document.getElementById('findHighlightAll') as HTMLInputElement;
      const matchCaseCheckbox = document.getElementById('findMatchCase') as HTMLInputElement;
      const findMultipleCheckbox = document.getElementById('findMultiple') as HTMLInputElement;
      const wholeWordsCheckbox = document.getElementById('findEntireWord') as HTMLInputElement;
      const matchDiacriticsCheckbox = document.getElementById('findMatchDiacritics') as HTMLInputElement;
      const regexpCheckbox = document.getElementById('matchRegExp') as HTMLInputElement;

      expect(highlightCheckbox.checked).toBe(true);
      expect(matchCaseCheckbox.checked).toBe(true);
      // When regexp is true, these options are automatically disabled
      expect(findMultipleCheckbox.checked).toBe(false);
      expect(wholeWordsCheckbox.checked).toBe(false);
      expect(matchDiacriticsCheckbox.checked).toBe(false);
      expect(regexpCheckbox.checked).toBe(true);
    });

    it('should handle missing DOM elements gracefully', () => {
      service.ngxExtendedPdfViewerInitialized = true;
      jest.spyOn(document, 'getElementById').mockReturnValue(null);

      expect(() => service.find('test')).not.toThrow();
    });
  });

  describe('print range methods', () => {
    describe('isInPDFPrintRange', () => {
      it('should include all pages when no range specified', () => {
        const printRange: PDFPrintRange = {};
        
        expect(service.isInPDFPrintRange(0, printRange)).toBe(true);
        expect(service.isInPDFPrintRange(9, printRange)).toBe(true);
        expect(service.isInPDFPrintRange(99, printRange)).toBe(true);
      });

      it('should respect from range boundary', () => {
        const printRange: PDFPrintRange = { from: 3 };
        
        expect(service.isInPDFPrintRange(1, printRange)).toBe(false); // page 2
        expect(service.isInPDFPrintRange(2, printRange)).toBe(true);  // page 3
        expect(service.isInPDFPrintRange(5, printRange)).toBe(true);  // page 6
      });

      it('should respect to range boundary', () => {
        const printRange: PDFPrintRange = { to: 5 };
        
        expect(service.isInPDFPrintRange(3, printRange)).toBe(true);  // page 4
        expect(service.isInPDFPrintRange(4, printRange)).toBe(true);  // page 5
        expect(service.isInPDFPrintRange(5, printRange)).toBe(false); // page 6
      });

      it('should respect both from and to boundaries', () => {
        const printRange: PDFPrintRange = { from: 2, to: 4 };
        
        expect(service.isInPDFPrintRange(0, printRange)).toBe(false); // page 1
        expect(service.isInPDFPrintRange(1, printRange)).toBe(true);  // page 2
        expect(service.isInPDFPrintRange(2, printRange)).toBe(true);  // page 3
        expect(service.isInPDFPrintRange(3, printRange)).toBe(true);  // page 4
        expect(service.isInPDFPrintRange(4, printRange)).toBe(false); // page 5
      });

      it('should exclude pages in excluded array', () => {
        const printRange: PDFPrintRange = { excluded: [2, 4, 6] };
        
        expect(service.isInPDFPrintRange(0, printRange)).toBe(true);  // page 1
        expect(service.isInPDFPrintRange(1, printRange)).toBe(false); // page 2 (excluded)
        expect(service.isInPDFPrintRange(2, printRange)).toBe(true);  // page 3
        expect(service.isInPDFPrintRange(3, printRange)).toBe(false); // page 4 (excluded)
        expect(service.isInPDFPrintRange(5, printRange)).toBe(false); // page 6 (excluded)
      });

      it('should only include pages in included array when specified', () => {
        const printRange: PDFPrintRange = { included: [1, 3, 5] };
        
        expect(service.isInPDFPrintRange(0, printRange)).toBe(true);  // page 1 (included)
        expect(service.isInPDFPrintRange(1, printRange)).toBe(false); // page 2 (not included)
        expect(service.isInPDFPrintRange(2, printRange)).toBe(true);  // page 3 (included)
        expect(service.isInPDFPrintRange(3, printRange)).toBe(false); // page 4 (not included)
        expect(service.isInPDFPrintRange(4, printRange)).toBe(true);  // page 5 (included)
      });

      it('should handle complex range with all constraints', () => {
        const printRange: PDFPrintRange = { 
          from: 2, 
          to: 8, 
          excluded: [4, 6], 
          included: [2, 3, 5, 7] 
        };
        
        expect(service.isInPDFPrintRange(0, printRange)).toBe(false); // page 1 (before from)
        expect(service.isInPDFPrintRange(1, printRange)).toBe(true);  // page 2 (in range, included)
        expect(service.isInPDFPrintRange(2, printRange)).toBe(true);  // page 3 (in range, included)
        expect(service.isInPDFPrintRange(3, printRange)).toBe(false); // page 4 (excluded)
        expect(service.isInPDFPrintRange(4, printRange)).toBe(true);  // page 5 (in range, included)
        expect(service.isInPDFPrintRange(5, printRange)).toBe(false); // page 6 (excluded)
        expect(service.isInPDFPrintRange(6, printRange)).toBe(true);  // page 7 (in range, included)
        expect(service.isInPDFPrintRange(7, printRange)).toBe(false); // page 8 (after to)
      });

      it('should handle edge cases with zero and negative pages', () => {
        const printRange: PDFPrintRange = { from: 1, to: 3 };
        
        expect(service.isInPDFPrintRange(-1, printRange)).toBe(false); // page 0 (invalid)
        expect(service.isInPDFPrintRange(0, printRange)).toBe(true);   // page 1
      });
    });

    describe('filteredPageCount', () => {
      it('should count all pages when no range specified', () => {
        const printRange: PDFPrintRange = {};
        
        expect(service.filteredPageCount(10, printRange)).toBe(10);
        expect(service.filteredPageCount(1, printRange)).toBe(1);
        expect(service.filteredPageCount(0, printRange)).toBe(0);
      });

      it('should count pages within from-to range', () => {
        const printRange: PDFPrintRange = { from: 3, to: 7 };
        
        expect(service.filteredPageCount(10, printRange)).toBe(5); // pages 3,4,5,6,7
        expect(service.filteredPageCount(5, printRange)).toBe(3);  // pages 3,4,5
      });

      it('should exclude specified pages from count', () => {
        const printRange: PDFPrintRange = { excluded: [2, 4, 6] };
        
        expect(service.filteredPageCount(10, printRange)).toBe(7); // 10 - 3 excluded
        expect(service.filteredPageCount(5, printRange)).toBe(3);  // 5 - 2 excluded (2,4)
      });

      it('should count only included pages when specified', () => {
        const printRange: PDFPrintRange = { included: [1, 3, 5, 7, 9] };
        
        expect(service.filteredPageCount(10, printRange)).toBe(5); // exactly 5 included
        expect(service.filteredPageCount(3, printRange)).toBe(2);  // only 1,3 from included list
      });

      it('should handle complex range combinations', () => {
        const printRange: PDFPrintRange = { 
          from: 2, 
          to: 8, 
          excluded: [4],
          included: [2, 3, 5, 6, 7] 
        };
        
        // Pages in range 2-8: 2,3,4,5,6,7,8
        // Excluded: 4
        // Included constraint: 2,3,5,6,7
        // Result: 2,3,5,6,7 (4 excluded, 8 not in included list)
        expect(service.filteredPageCount(10, printRange)).toBe(5);
      });

      it('should handle empty page count', () => {
        const printRange: PDFPrintRange = { from: 1, to: 5 };
        
        expect(service.filteredPageCount(0, printRange)).toBe(0);
      });
    });
  });

  describe('print range setup methods', () => {
    let mockPDFViewerApplication: any;

    beforeEach(() => {
      mockPDFViewerApplication = {
        PDFPrintServiceFactory: {},
        pagesCount: 10
      };
    });

    describe('setPrintRange', () => {
      it('should log error when PDFPrintServiceFactory not available', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        (service as any).PDFViewerApplication = { PDFPrintServiceFactory: null };

        service.setPrintRange({ from: 1, to: 5 });

        expect(consoleSpy).toHaveBeenCalledWith("The print service hasn't been initialized yet.");
        consoleSpy.mockRestore();
      });

      it('should set up print range functions when factory available', () => {
        (service as any).PDFViewerApplication = mockPDFViewerApplication;
        const printRange: PDFPrintRange = { from: 2, to: 6 };

        service.setPrintRange(printRange);

        expect(mockPDFViewerApplication.PDFPrintServiceFactory.isInPDFPrintRange).toBeDefined();
        expect(mockPDFViewerApplication.PDFPrintServiceFactory.filteredPageCount).toBe(5); // pages 2,3,4,5,6
      });

      it('should create functional isInPDFPrintRange method', () => {
        (service as any).PDFViewerApplication = mockPDFViewerApplication;
        const printRange: PDFPrintRange = { from: 3, to: 5 };

        service.setPrintRange(printRange);

        const isInRange = mockPDFViewerApplication.PDFPrintServiceFactory.isInPDFPrintRange;
        expect(isInRange(2)).toBe(true);  // page 3 in range
        expect(isInRange(3)).toBe(true);  // page 4 in range
        expect(isInRange(4)).toBe(true);  // page 5 in range
        expect(isInRange(5)).toBe(false); // page 6 not in range
      });
    });

    describe('removePrintRange', () => {
      it('should remove print range functions when factory available', () => {
        (service as any).PDFViewerApplication = mockPDFViewerApplication;
        mockPDFViewerApplication.PDFPrintServiceFactory.isInPDFPrintRange = jest.fn();
        mockPDFViewerApplication.PDFPrintServiceFactory.filteredPageCount = 5;

        service.removePrintRange();

        expect(mockPDFViewerApplication.PDFPrintServiceFactory.isInPDFPrintRange).toBeUndefined();
        expect(mockPDFViewerApplication.PDFPrintServiceFactory.filteredPageCount).toBeUndefined();
      });

      it('should handle missing PDFPrintServiceFactory gracefully', () => {
        (service as any).PDFViewerApplication = { PDFPrintServiceFactory: null };

        expect(() => service.removePrintRange()).not.toThrow();
      });

      it('should handle missing PDFViewerApplication gracefully', () => {
        (service as any).PDFViewerApplication = null;

        expect(() => service.removePrintRange()).not.toThrow();
      });
    });
  });

  describe('utility and edge cases', () => {
    it('should handle service state changes', () => {
      expect(service.ngxExtendedPdfViewerInitialized).toBe(false);
      
      service.ngxExtendedPdfViewerInitialized = true;
      expect(service.ngxExtendedPdfViewerInitialized).toBe(true);
    });

    it('should handle secondary menu state', () => {
      expect(service.secondaryMenuIsEmpty).toBe(false);
      
      service.secondaryMenuIsEmpty = true;
      expect(service.secondaryMenuIsEmpty).toBe(true);
    });

    it('should maintain renderer reference', () => {
      expect((service as any).renderer).toBe(mockRenderer);
    });
  });

  describe('integration scenarios', () => {
    it('should handle full print range workflow', () => {
      const mockPDFApp = {
        PDFPrintServiceFactory: {} as any,
        pagesCount: 10
      };
      (service as any).PDFViewerApplication = mockPDFApp;

      // Set up print range
      const printRange: PDFPrintRange = { from: 2, to: 8, excluded: [4, 6] };
      service.setPrintRange(printRange);

      // Verify range function works
      const isInRange = (mockPDFApp.PDFPrintServiceFactory as any).isInPDFPrintRange;
      expect(isInRange(1)).toBe(true);  // page 2
      expect(isInRange(3)).toBe(false); // page 4 (excluded)
      expect(isInRange(5)).toBe(false); // page 6 (excluded)
      expect(isInRange(7)).toBe(true);  // page 8

      // Verify count is correct
      expect((mockPDFApp.PDFPrintServiceFactory as any).filteredPageCount).toBe(5); // 2,3,5,7,8

      // Remove range
      service.removePrintRange();
      expect((mockPDFApp.PDFPrintServiceFactory as any).isInPDFPrintRange).toBeUndefined();
    });

    it('should handle find workflow with complex options', () => {
      service.ngxExtendedPdfViewerInitialized = true;
      
      // Set up mock elements for find functionality
      const mockHighlightCheckbox = { checked: false } as HTMLInputElement;
      const mockMatchCaseCheckbox = { checked: false } as HTMLInputElement;
      const mockFindMultipleCheckbox = { checked: false, disabled: false } as HTMLInputElement;
      const mockWholeWordsCheckbox = { checked: false, disabled: false } as HTMLInputElement;
      const mockMatchDiacriticsCheckbox = { checked: false, disabled: false } as HTMLInputElement;
      const mockRegExpCheckbox = { checked: false } as HTMLInputElement;
      const mockInputField = { value: '' } as HTMLInputElement;

      const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockImplementation((id: string) => {
        switch (id) {
          case 'findHighlightAll': return mockHighlightCheckbox;
          case 'findMatchCase': return mockMatchCaseCheckbox;
          case 'findMultiple': return mockFindMultipleCheckbox;
          case 'findEntireWord': return mockWholeWordsCheckbox;
          case 'findMatchDiacritics': return mockMatchDiacriticsCheckbox;
          case 'matchRegExp': return mockRegExpCheckbox;
          case 'findInput': return mockInputField;
          default: return null;
        }
      });
      
      const options: FindOptions = {
        highlightAll: true,
        matchCase: false,
        wholeWords: true,
        matchDiacritics: false,
        findMultiple: true,
        regexp: false,
        useSecondaryFindcontroller: false
      };

      // Should not throw and should process options
      expect(() => service.find(['test1', 'test2'], options)).not.toThrow();
      expect(getElementByIdSpy).toHaveBeenCalledTimes(7); // All option checkboxes + input field
      
      getElementByIdSpy.mockRestore();
    });
  });
});