import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { PdfShyButtonService } from './pdf-shy-button-service';
import { PdfShyButtonComponent } from './pdf-shy-button.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

describe('PdfShyButtonService', () => {
  let service: PdfShyButtonService;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  function createMockButton(overrides: Partial<Record<string, any>> = {}): PdfShyButtonComponent {
    return {
      primaryToolbarId: jest.fn(() => overrides.primaryToolbarId ?? 'testButton'),
      secondaryMenuId: jest.fn(() => overrides.secondaryMenuId ?? ''),
      cssClass: jest.fn(() => overrides.cssClass ?? 'invisible'),
      l10nId: jest.fn(() => overrides.l10nId ?? ''),
      l10nLabel: jest.fn(() => overrides.l10nLabel ?? ''),
      title: jest.fn(() => overrides.title ?? ''),
      toggled: jest.fn(() => overrides.toggled ?? false),
      disabled: jest.fn(() => overrides.disabled ?? false),
      order: jest.fn(() => overrides.order ?? 99999),
      image: jest.fn(() => overrides.image ?? ''),
      imageHtml: jest.fn(() => overrides.imageHtml ?? undefined),
      action: jest.fn(() => overrides.action ?? undefined),
      eventBusName: jest.fn(() => overrides.eventBusName ?? undefined),
      closeOnClick: jest.fn(() => overrides.closeOnClick ?? true),
    } as any;
  }

  beforeEach(() => {
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      providers: [
        PdfShyButtonService,
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } },
      ],
    });

    service = TestBed.inject(PdfShyButtonService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('service creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should start with empty buttons array', () => {
      expect(service.buttons).toEqual([]);
    });
  });

  describe('add', () => {
    it('should add a button description', () => {
      const button = createMockButton({ primaryToolbarId: 'myButton' });
      service.add(button);

      expect(service.buttons.length).toBe(1);
      expect(service.buttons[0].id).toBe('secondaryMyButton');
    });

    it('should use secondaryMenuId when provided', () => {
      const button = createMockButton({ secondaryMenuId: 'customSecondaryId' });
      service.add(button);

      expect(service.buttons[0].id).toBe('customSecondaryId');
    });

    it('should replace primaryToolbarId prefix "primary" with "secondary"', () => {
      const button = createMockButton({ primaryToolbarId: 'primaryZoomIn' });
      service.add(button);

      expect(service.buttons[0].id).toBe('secondaryZoomIn');
    });

    it('should add "secondary" prefix with uppercase first letter for non-"primary" ids', () => {
      const button = createMockButton({ primaryToolbarId: 'editorHighlight' });
      service.add(button);

      expect(service.buttons[0].id).toBe('secondaryEditorHighlight');
    });

    it('should sort buttons by order', () => {
      service.add(createMockButton({ primaryToolbarId: 'btnA', order: 300 }));
      service.add(createMockButton({ primaryToolbarId: 'btnB', order: 100 }));
      service.add(createMockButton({ primaryToolbarId: 'btnC', order: 200 }));

      expect(service.buttons[0].order).toBe(100);
      expect(service.buttons[1].order).toBe(200);
      expect(service.buttons[2].order).toBe(300);
    });

    it('should replace existing button with same id and trigger l10n translation', () => {
      jest.useFakeTimers();
      const mockL10n = { translate: jest.fn().mockResolvedValue(undefined) };
      const mockApp = { l10n: mockL10n } as any;
      pdfAppSignal.set(mockApp);
      TestBed.flushEffects();

      const button = createMockButton({ secondaryMenuId: 'uniqueId', title: 'First' });
      service.add(button);
      expect(service.buttons.length).toBe(1);

      // Mock document.getElementById
      const mockElement = document.createElement('div');
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

      const updatedButton = createMockButton({ secondaryMenuId: 'uniqueId', title: 'Updated' });
      service.add(updatedButton);

      // Still only one button (replaced, not duplicated)
      expect(service.buttons.length).toBe(1);
      expect(service.buttons[0].title).toBe('Updated');

      // Fast forward to trigger setTimeout
      jest.advanceTimersByTime(1);

      expect(document.getElementById).toHaveBeenCalledWith('uniqueId');
      expect(mockL10n.translate).toHaveBeenCalledWith(mockElement);

      jest.useRealTimers();
    });

    it('should handle replacement when l10n is not available', () => {
      jest.useFakeTimers();
      // PDFViewerApplication with no l10n
      const mockApp = {} as any;
      pdfAppSignal.set(mockApp);
      TestBed.flushEffects();

      const button = createMockButton({ secondaryMenuId: 'myId' });
      // Intentionally add the same button twice to verify that re-adding
      // (replacing) a button doesn't throw when l10n is unavailable.
      service.add(button);
      service.add(button); // NOSONAR — intentional duplicate add to test replacement

      // Should not throw when setTimeout fires
      expect(() => jest.advanceTimersByTime(1)).not.toThrow();
      jest.useRealTimers();
    });

    it('should handle replacement when PDFViewerApplication is undefined', () => {
      jest.useFakeTimers();

      const button = createMockButton({ secondaryMenuId: 'myId' });
      // Intentionally add the same button twice to verify that re-adding
      // (replacing) a button doesn't throw when PDFViewerApplication is undefined.
      service.add(button);
      service.add(button); // NOSONAR — intentional duplicate add to test replacement

      expect(() => jest.advanceTimersByTime(1)).not.toThrow();
      jest.useRealTimers();
    });

    it('should use default order 99999 when order is null', () => {
      const button = createMockButton({ order: null });
      service.add(button);

      expect(service.buttons[0].order).toBe(99999);
    });
  });

  describe('update', () => {
    it('should call add when button with matching id exists', () => {
      const button = createMockButton({ secondaryMenuId: 'existingId' });
      service.add(button);

      const spy = jest.spyOn(service, 'add');
      service.update(button);

      expect(spy).toHaveBeenCalledWith(button);
    });

    it('should not call add when button with matching id does not exist', () => {
      const button = createMockButton({ secondaryMenuId: 'nonExistentId' });
      const spy = jest.spyOn(service, 'add');

      service.update(button);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('addDefaultPrefix (private, tested through add)', () => {
    it('should handle single-character primaryToolbarId', () => {
      const button = createMockButton({ primaryToolbarId: 'a' });
      service.add(button);

      expect(service.buttons[0].id).toBe('secondaryA');
    });
  });
});
