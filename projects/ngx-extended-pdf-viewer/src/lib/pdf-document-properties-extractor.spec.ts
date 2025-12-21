import { PdfDocumentPropertiesExtractor } from './pdf-document-properties-extractor';

describe('PdfDocumentPropertiesExtractor', () => {
  let extractor: PdfDocumentPropertiesExtractor;

  beforeEach(() => {
    extractor = new PdfDocumentPropertiesExtractor();
  });

  describe('initialization', () => {
    it('should create extractor instance', () => {
      expect(extractor).toBeTruthy();
    });

    it('should have PDF date regex pattern', () => {
      const regex = (extractor as any).pdfDateStringRegex;
      expect(regex).toBeInstanceOf(RegExp);
      expect(regex.source).toContain('D:');
    });
  });

  describe('toDateObject method', () => {
    describe('valid PDF date formats', () => {
      it('should parse basic date format D:YYYY', () => {
        const result = (extractor as any).toDateObject('D:2023');
        
        expect(result).toBeInstanceOf(Date);
        expect(result.getUTCFullYear()).toBe(2023);
        expect(result.getUTCMonth()).toBe(0); // January (0-based)
        expect(result.getUTCDate()).toBe(1);
        expect(result.getUTCHours()).toBe(0);
        expect(result.getUTCMinutes()).toBe(0);
        expect(result.getUTCSeconds()).toBe(0);
      });

      it('should parse date with month D:YYYYMM', () => {
        const result = (extractor as any).toDateObject('D:202306');
        
        expect(result.getUTCFullYear()).toBe(2023);
        expect(result.getUTCMonth()).toBe(5); // June (0-based, so 6-1=5)
        expect(result.getUTCDate()).toBe(1); // Default day
      });

      it('should parse date with day D:YYYYMMDD', () => {
        const result = (extractor as any).toDateObject('D:20230615');
        
        expect(result.getUTCFullYear()).toBe(2023);
        expect(result.getUTCMonth()).toBe(5); // June
        expect(result.getUTCDate()).toBe(15);
      });

      it('should parse complete date with time D:YYYYMMDDHHMMSS', () => {
        const result = (extractor as any).toDateObject('D:20230615143025');
        
        expect(result.getUTCFullYear()).toBe(2023);
        expect(result.getUTCMonth()).toBe(5); // June
        expect(result.getUTCDate()).toBe(15);
        expect(result.getUTCHours()).toBe(14);
        expect(result.getUTCMinutes()).toBe(30);
        expect(result.getUTCSeconds()).toBe(25);
      });

      it('should parse date with UTC timezone Z', () => {
        const result = (extractor as any).toDateObject('D:20230615143025Z');
        
        expect(result.getUTCFullYear()).toBe(2023);
        expect(result.getUTCMonth()).toBe(5);
        expect(result.getUTCDate()).toBe(15);
        expect(result.getUTCHours()).toBe(14);
        expect(result.getUTCMinutes()).toBe(30);
        expect(result.getUTCSeconds()).toBe(25);
      });

      it('should parse date with positive timezone offset', () => {
        const result = (extractor as any).toDateObject('D:20230615143025+05');
        
        expect(result.getUTCFullYear()).toBe(2023);
        expect(result.getUTCMonth()).toBe(5);
        expect(result.getUTCDate()).toBe(15);
        expect(result.getUTCHours()).toBe(9); // 14 - 5 = 9 (adjusted to UTC)
        expect(result.getUTCMinutes()).toBe(30);
      });

      it('should parse date with negative timezone offset', () => {
        const result = (extractor as any).toDateObject('D:20230615143025-03');
        
        expect(result.getUTCFullYear()).toBe(2023);
        expect(result.getUTCMonth()).toBe(5);
        expect(result.getUTCDate()).toBe(15);
        expect(result.getUTCHours()).toBe(17); // 14 + 3 = 17 (adjusted to UTC)
        expect(result.getUTCMinutes()).toBe(30);
      });

      it('should parse date with complete timezone offset +HHMM', () => {
        const result = (extractor as any).toDateObject('D:20230615143025+0530');
        
        expect(result.getUTCHours()).toBe(9); // 14 - 5 = 9 (hour offset)
        expect(result.getUTCMinutes()).toBe(0); // 30 - 30 = 0 (minute offset)
      });

      it('should parse date with apostrophe separators', () => {
        const result = (extractor as any).toDateObject("D:20230615143025+05'30'");
        
        expect(result.getUTCHours()).toBe(9); // 14 - 5 = 9 (hour offset)
        expect(result.getUTCMinutes()).toBe(0); // 30 - 30 = 0 (minute offset)
      });
    });

    describe('date validation and defaults', () => {
      it('should handle invalid month values', () => {
        const result1 = (extractor as any).toDateObject('D:202300'); // month 00
        const result2 = (extractor as any).toDateObject('D:202313'); // month 13
        
        expect(result1.getUTCMonth()).toBe(0); // Default to January
        expect(result2.getUTCMonth()).toBe(0); // Default to January
      });

      it('should handle invalid day values', () => {
        const result1 = (extractor as any).toDateObject('D:20230600'); // day 00
        const result2 = (extractor as any).toDateObject('D:20230632'); // day 32
        
        expect(result1.getUTCDate()).toBe(1); // Default to 1st
        expect(result2.getUTCDate()).toBe(1); // Default to 1st
      });

      it('should handle invalid hour values', () => {
        const result1 = (extractor as any).toDateObject('D:2023061524'); // hour 24
        const result2 = (extractor as any).toDateObject('D:2023061525'); // hour 25
        
        expect(result1.getUTCHours()).toBe(0); // Default to 0
        expect(result2.getUTCHours()).toBe(0); // Default to 0
      });

      it('should handle invalid minute values', () => {
        const result1 = (extractor as any).toDateObject('D:202306152360'); // minute 60
        const result2 = (extractor as any).toDateObject('D:202306152399'); // minute 99
        
        expect(result1.getUTCMinutes()).toBe(0); // Default to 0
        expect(result2.getUTCMinutes()).toBe(0); // Default to 0
      });

      it('should handle invalid second values', () => {
        const result1 = (extractor as any).toDateObject('D:20230615235960'); // second 60
        const result2 = (extractor as any).toDateObject('D:20230615235999'); // second 99
        
        expect(result1.getUTCSeconds()).toBe(0); // Default to 0
        expect(result2.getUTCSeconds()).toBe(0); // Default to 0
      });

      it('should handle invalid timezone offset hours', () => {
        const result1 = (extractor as any).toDateObject('D:20230615143025+24'); // offset hour 24
        const result2 = (extractor as any).toDateObject('D:20230615143025-25'); // offset hour 25
        
        // Should default to 0 offset, so time remains unchanged
        expect(result1.getUTCHours()).toBe(14);
        expect(result2.getUTCHours()).toBe(14);
      });

      it('should handle invalid timezone offset minutes', () => {
        const result1 = (extractor as any).toDateObject('D:20230615143025+0560'); // offset minute 60
        const result2 = (extractor as any).toDateObject('D:20230615143025+0599'); // offset minute 99
        
        // Offset minute defaults to 0, so only hour offset applies
        expect(result1.getUTCHours()).toBe(9); // 14 - 5 = 9
        expect(result2.getUTCHours()).toBe(9); // 14 - 5 = 9
      });
    });

    describe('edge cases and error handling', () => {
      it('should return null for invalid date format', () => {
        const result1 = (extractor as any).toDateObject('2023-06-15'); // Not PDF format
        const result2 = (extractor as any).toDateObject('D:'); // Empty date
        const result3 = (extractor as any).toDateObject('D:abc'); // Non-numeric year
        
        expect(result1).toBeNull();
        expect(result2).toBeNull();
        expect(result3).toBeNull();
      });

      it('should return null for null/undefined input', () => {
        const result1 = (extractor as any).toDateObject(null);
        const result2 = (extractor as any).toDateObject(undefined);
        const result3 = (extractor as any).toDateObject('');
        
        expect(result1).toBeNull();
        expect(result2).toBeNull();
        expect(result3).toBeNull();
      });

      it('should return null for non-string input', () => {
        const result1 = (extractor as any).toDateObject(123);
        const result2 = (extractor as any).toDateObject({});
        const result3 = (extractor as any).toDateObject([]);
        
        expect(result1).toBeNull();
        expect(result2).toBeNull();
        expect(result3).toBeNull();
      });

      it('should handle year without D: prefix', () => {
        const result = (extractor as any).toDateObject('2023');
        expect(result).toBeNull();
      });

      it('should handle malformed timezone indicators', () => {
        const result1 = (extractor as any).toDateObject('D:20230615143025X'); // Invalid timezone
        const result2 = (extractor as any).toDateObject('D:20230615143025++'); // Double plus
        
        // Should still parse but treat unknown timezone as Z (UTC)
        expect(result1).toBeInstanceOf(Date);
        expect(result2).toBeInstanceOf(Date);
      });
    });

    describe('timezone handling edge cases', () => {
      it('should handle time overflow due to timezone adjustment', () => {
        // Test case where timezone adjustment causes time to go to next day
        const result = (extractor as any).toDateObject('D:20230615235900-01'); // 23:59 - 1 hour = 00:59 next day
        
        expect(result.getUTCHours()).toBe(0); // Should wrap to next day
        expect(result.getUTCMinutes()).toBe(59);
        expect(result.getUTCDate()).toBe(16); // Next day
      });

      it('should handle time underflow due to timezone adjustment', () => {
        // Test case where timezone adjustment causes time to go to previous day
        const result = (extractor as any).toDateObject('D:20230615000100+02'); // 00:01 + 2 hours goes to previous day
        
        expect(result.getUTCHours()).toBe(22); // 00 - 02 = 22 (previous day)
        expect(result.getUTCMinutes()).toBe(1);
        expect(result.getUTCDate()).toBe(14); // Previous day
      });

      it('should handle large timezone offsets', () => {
        const result1 = (extractor as any).toDateObject('D:20230615120000+12'); // +12:00 timezone
        const result2 = (extractor as any).toDateObject('D:20230615120000-12'); // -12:00 timezone
        
        expect(result1.getUTCHours()).toBe(0); // 12 - 12 = 0
        expect(result2.getUTCHours()).toBe(0); // 12 + 12 = 24 -> 0 (next day)
      });
    });

    describe('comprehensive format variations', () => {
      it('should parse various real-world PDF date formats', () => {
        const testCases = [
          'D:20230615143025Z',
          'D:20230615143025+05\'30\'',
          'D:20230615143025-08\'00\'',
          'D:20230615',
          'D:202306',
          'D:2023',
          'D:20230615143025',
        ];

        testCases.forEach(dateString => {
          const result = (extractor as any).toDateObject(dateString);
          expect(result).toBeInstanceOf(Date);
          expect(result.getUTCFullYear()).toBe(2023);
        });
      });

      it('should handle partial date/time components consistently', () => {
        const result1 = (extractor as any).toDateObject('D:202306151430'); // No seconds
        const result2 = (extractor as any).toDateObject('D:2023061514'); // No minutes/seconds
        const result3 = (extractor as any).toDateObject('D:20230615'); // No time
        
        expect(result1.getUTCSeconds()).toBe(0); // Default seconds
        expect(result2.getUTCMinutes()).toBe(0); // Default minutes
        expect(result2.getUTCSeconds()).toBe(0); // Default seconds
        expect(result3.getUTCHours()).toBe(0); // Default hours
        expect(result3.getUTCMinutes()).toBe(0); // Default minutes
        expect(result3.getUTCSeconds()).toBe(0); // Default seconds
      });
    });
  });

  describe('getDocumentProperties method', () => {
    let mockPDFViewerApplication: any;
    let mockPdfDocument: any;
    let mockMetadata: any;

    beforeEach(() => {
      mockMetadata = {
        info: {
          Author: 'Test Author',
          CreationDate: 'D:20230615143025Z',
          Creator: 'Test Creator',
          Keywords: 'test, keywords',
          IsLinearized: false,
          ModDate: 'D:20230616143025Z',
          PDFFormatVersion: '1.7',
          Producer: 'Test Producer',
          Subject: 'Test Subject',
          Title: 'Test Title'
        },
        contentDispositionFilename: 'test-document.pdf'
      };

      mockPdfDocument = {
        getMetadata: jest.fn().mockResolvedValue(mockMetadata),
        getDownloadInfo: jest.fn().mockResolvedValue({ length: 1024000 })
      };

      mockPDFViewerApplication = {
        pdfDocument: mockPdfDocument
      };
    });

    it('should extract all document properties correctly', async () => {
      const result = await extractor.getDocumentProperties(mockPDFViewerApplication);

      expect(result).toEqual({
        author: 'Test Author',
        creationDate: expect.any(Date),
        creator: 'Test Creator',
        keywords: 'test, keywords',
        linearized: false,
        modificationDate: expect.any(Date),
        pdfFormatVersion: '1.7',
        producer: 'Test Producer',
        subject: 'Test Subject',
        title: 'Test Title',
        fileName: 'test-document.pdf',
        maybeFileSize: 1024000
      });
    });

    it('should parse dates correctly in document properties', async () => {
      const result = await extractor.getDocumentProperties(mockPDFViewerApplication);

      expect(result.creationDate).toBeInstanceOf(Date);
      expect(result.creationDate.getUTCFullYear()).toBe(2023);
      expect(result.creationDate.getUTCMonth()).toBe(5); // June
      expect(result.creationDate.getUTCDate()).toBe(15);

      expect(result.modificationDate).toBeInstanceOf(Date);
      expect(result.modificationDate.getUTCDate()).toBe(16);
    });

    it('should handle missing optional properties', async () => {
      mockMetadata.info = {
        Title: 'Only Title'
      };
      delete mockMetadata.contentDispositionFilename;

      const result = await extractor.getDocumentProperties(mockPDFViewerApplication);

      expect(result.title).toBe('Only Title');
      expect(result.author).toBeUndefined();
      expect(result.creationDate).toBeNull(); // toDateObject returns null for undefined
      expect(result.fileName).toBeUndefined();
      expect(result.maybeFileSize).toBe(1024000); // Still gets file size
    });

    it('should handle invalid date strings in metadata', async () => {
      mockMetadata.info.CreationDate = 'invalid-date';
      mockMetadata.info.ModDate = null;

      const result = await extractor.getDocumentProperties(mockPDFViewerApplication);

      expect(result.creationDate).toBeNull();
      expect(result.modificationDate).toBeNull();
    });

    it('should handle missing file size information', async () => {
      mockPdfDocument.getDownloadInfo.mockResolvedValue({});

      const result = await extractor.getDocumentProperties(mockPDFViewerApplication);

      expect(result.maybeFileSize).toBeUndefined();
    });

    it('should handle PDF document method failures gracefully', async () => {
      mockPdfDocument.getMetadata.mockRejectedValue(new Error('Metadata error'));

      await expect(extractor.getDocumentProperties(mockPDFViewerApplication))
        .rejects.toThrow('Metadata error');
    });
  });
});