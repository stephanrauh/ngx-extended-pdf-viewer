import { PLATFORM_ID, signal, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxExtendedPdfViewerService } from '../../ngx-extended-pdf-viewer.service';
import { PDFNotificationService } from '../../pdf-notification-service';
import { PdfShyButtonService } from '../../toolbar/pdf-shy-button/pdf-shy-button-service';
import { PdfSecondaryToolbarComponent } from './pdf-secondary-toolbar.component';

describe('PdfSecondaryToolbarComponent', () => {
  let component: PdfSecondaryToolbarComponent;
  let fixture: ComponentFixture<PdfSecondaryToolbarComponent>;
  let notificationService: jest.Mocked<PDFNotificationService>;
  let ngxExtendedPdfViewerService: jest.Mocked<NgxExtendedPdfViewerService>;
  let mockPDFViewerApplication: any;

  // Mock DOM elements
  const createMockButton = (id: string): HTMLButtonElement => {
    const button = document.createElement('button');
    button.id = id;
    return button;
  };

  beforeEach(async () => {
    // Create mock services
    const notificationServiceMock = {
      onPDFJSInitSignal: jest.fn().mockReturnValue(null),
    } as unknown as jest.Mocked<Partial<PDFNotificationService>>;

    const ngxExtendedPdfViewerServiceMock = {
      secondaryMenuIsEmpty: signal(false),
    } as jest.Mocked<Partial<NgxExtendedPdfViewerService>>;

    const pdfShyButtonServiceMock = {} as jest.Mocked<Partial<PdfShyButtonService>>;

    // Mock PDFViewerApplication
    mockPDFViewerApplication = {
      eventBus: {
        on: jest.fn(),
        dispatch: jest.fn(),
      },
      pdfViewer: {
        currentPageNumber: 1,
      },
      pagesCount: 10,
      secondaryToolbar: {
        close: jest.fn(),
      },
    };

    await TestBed.configureTestingModule({
      declarations: [PdfSecondaryToolbarComponent],
      providers: [
        { provide: PDFNotificationService, useValue: notificationServiceMock },
        { provide: NgxExtendedPdfViewerService, useValue: ngxExtendedPdfViewerServiceMock },
        { provide: PdfShyButtonService, useValue: pdfShyButtonServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfSecondaryToolbarComponent);
    component = fixture.componentInstance;

    // Set required input signals
    fixture.componentRef.setInput('mobileFriendlyZoomScale', 1);
    fixture.componentRef.setInput('localizationInitialized', true);
    TestBed.flushEffects();

    notificationService = TestBed.inject(PDFNotificationService) as jest.Mocked<PDFNotificationService>;
    ngxExtendedPdfViewerService = TestBed.inject(NgxExtendedPdfViewerService) as jest.Mocked<NgxExtendedPdfViewerService>;

    // Mock document.getElementById
    jest.spyOn(document, 'getElementById').mockImplementation((id: string) => {
      if (id === 'previousPage') return createMockButton('previousPage');
      if (id === 'nextPage') return createMockButton('nextPage');
      return null;
    });

    // Mock window.getComputedStyle
    Object.defineProperty(window, 'getComputedStyle', {
      value: jest.fn(() => ({ display: 'block' })),
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Component initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.disablePreviousPage).toBe(true);
      expect(component.disableNextPage).toBe(true);
      expect(component.customSecondaryToolbar()).toBeUndefined();
      expect(component.localizationInitialized()).toBe(true); // input.required() has no default; set to true in setup
    });
  });

  describe('PDF initialization effect', () => {
    it('should call onPdfJsInit when PDFViewerApplication becomes available', () => {
      const onPdfJsInitSpy = jest.spyOn(component, 'onPdfJsInit');

      notificationService.onPDFJSInitSignal.mockReturnValue(mockPDFViewerApplication);
      fixture.detectChanges();

      expect(onPdfJsInitSpy).toHaveBeenCalled();
      expect(component['PDFViewerApplication']).toBe(mockPDFViewerApplication);
    });

    it('should not call onPdfJsInit when PDFViewerApplication is null', () => {
      const onPdfJsInitSpy = jest.spyOn(component, 'onPdfJsInit');

      notificationService.onPDFJSInitSignal.mockReturnValue(undefined);
      fixture.detectChanges();

      expect(onPdfJsInitSpy).not.toHaveBeenCalled();
    });
  });

  describe('onPdfJsInit', () => {
    beforeEach(() => {
      component['PDFViewerApplication'] = mockPDFViewerApplication;
      jest.spyOn(component, 'updateUIState');
    });

    it('should register pagechanging event listener', () => {
      component.onPdfJsInit();

      expect(mockPDFViewerApplication.eventBus.on).toHaveBeenCalledWith('pagechanging', expect.any(Function));
    });

    it('should register pagerendered event listener', () => {
      component.onPdfJsInit();

      expect(mockPDFViewerApplication.eventBus.on).toHaveBeenCalledWith('pagerendered', expect.any(Function));
    });

    it('should call updateUIState when pagechanging event is triggered', () => {
      component.onPdfJsInit();

      const pageChangingCallback = mockPDFViewerApplication.eventBus.on.mock.calls.find((call: any) => call[0] === 'pagechanging')[1];

      pageChangingCallback();

      expect(component.updateUIState).toHaveBeenCalled();
    });

    it('should call updateUIState when pagerendered event is triggered', () => {
      component.onPdfJsInit();

      const pageRenderedCallback = mockPDFViewerApplication.eventBus.on.mock.calls.find((call: any) => call[0] === 'pagerendered')[1];

      pageRenderedCallback();

      expect(component.updateUIState).toHaveBeenCalled();
    });
  });

  describe('updateUIState', () => {
    beforeEach(() => {
      component['PDFViewerApplication'] = mockPDFViewerApplication;
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should disable previous button on first page', () => {
      mockPDFViewerApplication.pdfViewer.currentPageNumber = 1;
      const previousButton = createMockButton('previousPage');
      jest.spyOn(document, 'getElementById').mockImplementation((id) => (id === 'previousPage' ? previousButton : createMockButton('nextPage')));

      component.updateUIState();
      jest.runAllTimers();

      expect(component.disablePreviousPage).toBe(true);
      expect(previousButton.disabled).toBe(true);
    });

    it('should enable previous button on pages after first', () => {
      mockPDFViewerApplication.pdfViewer.currentPageNumber = 2;
      const previousButton = createMockButton('previousPage');
      jest.spyOn(document, 'getElementById').mockImplementation((id) => (id === 'previousPage' ? previousButton : createMockButton('nextPage')));

      component.updateUIState();
      jest.runAllTimers();

      expect(component.disablePreviousPage).toBe(false);
      expect(previousButton.disabled).toBe(false);
    });

    it('should disable next button on last page', () => {
      mockPDFViewerApplication.pdfViewer.currentPageNumber = 10;
      mockPDFViewerApplication.pagesCount = 10;
      const nextButton = createMockButton('nextPage');
      jest.spyOn(document, 'getElementById').mockImplementation((id) => (id === 'nextPage' ? nextButton : createMockButton('previousPage')));

      component.updateUIState();
      jest.runAllTimers();

      expect(component.disableNextPage).toBe(true);
      expect(nextButton.disabled).toBe(true);
    });

    it('should enable next button on pages before last', () => {
      mockPDFViewerApplication.pdfViewer.currentPageNumber = 5;
      const nextButton = createMockButton('nextPage');
      jest.spyOn(document, 'getElementById').mockImplementation((id) => (id === 'nextPage' ? nextButton : createMockButton('previousPage')));

      component.updateUIState();
      jest.runAllTimers();

      expect(component.disableNextPage).toBe(false);
      expect(nextButton.disabled).toBe(false);
    });

    it('should handle missing buttons gracefully', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null);

      expect(() => {
        component.updateUIState();
        jest.runAllTimers();
      }).not.toThrow();
    });
  });

  describe('onSpreadChange', () => {
    it('should emit spreadChange event with off value', () => {
      const emitSpy = jest.spyOn(component.spreadChange, 'emit');

      component.onSpreadChange('off');

      expect(emitSpy).toHaveBeenCalledWith('off');
    });

    it('should emit spreadChange event with even value', () => {
      const emitSpy = jest.spyOn(component.spreadChange, 'emit');

      component.onSpreadChange('even');

      expect(emitSpy).toHaveBeenCalledWith('even');
    });

    it('should emit spreadChange event with odd value', () => {
      const emitSpy = jest.spyOn(component.spreadChange, 'emit');

      component.onSpreadChange('odd');

      expect(emitSpy).toHaveBeenCalledWith('odd');
    });
  });

  // ngOnChanges has been replaced by effects - no longer needed

  describe('onResize', () => {
    it('should call checkVisibility after timeout', () => {
      jest.useFakeTimers();
      const checkVisibilitySpy = jest.spyOn(component, 'checkVisibility');

      component.onResize();
      jest.runAllTimers();

      expect(checkVisibilitySpy).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  describe('ngAfterViewInit', () => {
    it('should set up MutationObserver in browser environment', () => {
      const mockObserver = {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };

      global.MutationObserver = jest.fn(() => mockObserver) as any;

      component.ngAfterViewInit();

      expect(MutationObserver).toHaveBeenCalled();
      expect(mockObserver.observe).toHaveBeenCalled();
    });

    it('should not set up MutationObserver in server environment', async () => {
      // Need to create a new TestBed configuration for server environment
      await TestBed.resetTestingModule();
      
      await TestBed.configureTestingModule({
        declarations: [PdfSecondaryToolbarComponent],
        providers: [
          { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: jest.fn().mockReturnValue(null) } },
          { provide: NgxExtendedPdfViewerService, useValue: { secondaryMenuIsEmpty: signal(false) } },
          { provide: PdfShyButtonService, useValue: {} },
          { provide: PLATFORM_ID, useValue: 'server' }, // Server environment
        ],
      }).compileComponents();

      const serverFixture = TestBed.createComponent(PdfSecondaryToolbarComponent);
      const serverComponent = serverFixture.componentInstance;

      const mockObserver = {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };

      global.MutationObserver = jest.fn(() => mockObserver) as any;

      serverComponent.ngAfterViewInit();

      expect(MutationObserver).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should disconnect MutationObserver if it exists', () => {
      const mockObserver = {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };

      component['classMutationObserver'] = mockObserver as any;

      component.ngOnDestroy();

      expect(mockObserver.disconnect).toHaveBeenCalled();
      expect(component['classMutationObserver']).toBeUndefined();
    });

    it('should handle undefined MutationObserver gracefully', () => {
      component['classMutationObserver'] = undefined;

      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  describe('checkVisibility', () => {
    it('should set secondaryMenuIsEmpty to true when no visible buttons', () => {
      jest.spyOn(component as any, 'checkVisibilityRecursively').mockReturnValue(0);

      // Mock element structure
      const mockElement = {
        children: {
          item: jest.fn().mockReturnValue({
            children: {
              item: jest.fn().mockReturnValue(document.createElement('div')),
            },
          }),
        },
      };

      component['element'] = { nativeElement: mockElement } as any;

      component.checkVisibility();

      expect(ngxExtendedPdfViewerService.secondaryMenuIsEmpty()).toBe(true);
    });

    it('should set secondaryMenuIsEmpty to false when visible buttons exist', () => {
      jest.spyOn(component as any, 'checkVisibilityRecursively').mockReturnValue(2);

      const mockElement = {
        children: {
          item: jest.fn().mockReturnValue({
            children: {
              item: jest.fn().mockReturnValue(document.createElement('div')),
            },
          }),
        },
      };

      component['element'] = { nativeElement: mockElement } as any;

      component.checkVisibility();

      expect(ngxExtendedPdfViewerService.secondaryMenuIsEmpty()).toBe(false);
    });
  });

  describe('checkVisibilityRecursively', () => {
    it('should return 0 for server-side rendering', () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const element = document.createElement('div');
      const result = component['checkVisibilityRecursively'](element);

      expect(result).toBe(0);
      global.window = originalWindow;
    });

    it('should return 0 for elements with display none style', () => {
      const element = document.createElement('div');
      element.style.display = 'none';

      const result = component['checkVisibilityRecursively'](element);

      expect(result).toBe(0);
    });

    it('should return 0 for elements with hidden class', () => {
      const element = document.createElement('div');
      element.classList.add('hidden');

      const result = component['checkVisibilityRecursively'](element);

      expect(result).toBe(0);
    });

    it('should return 0 for elements with invisible class', () => {
      const element = document.createElement('div');
      element.classList.add('invisible');

      const result = component['checkVisibilityRecursively'](element);

      expect(result).toBe(0);
    });

    it('should return 1 for visible button element', () => {
      const button = document.createElement('button');

      const result = component['checkVisibilityRecursively'](button);

      expect(result).toBe(1);
    });

    it('should return 1 for visible anchor element', () => {
      const anchor = document.createElement('a');

      const result = component['checkVisibilityRecursively'](anchor);

      expect(result).toBe(1);
    });

    it('should count visible children recursively', () => {
      const container = document.createElement('div');
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');

      container.appendChild(button1);
      container.appendChild(button2);

      const result = component['checkVisibilityRecursively'](container);

      // The implementation stops counting after finding the first visible child
      // because of the loop condition: for (let i = 0; i < children.length && count === 0; i++)
      expect(result).toBe(1);
    });
  });

  describe('onClick', () => {
    let mockEvent: Event;
    let mockTarget: HTMLElement;

    beforeEach(() => {
      component['PDFViewerApplication'] = mockPDFViewerApplication;

      mockTarget = document.createElement('button');
      jest.spyOn(mockTarget.classList, 'add');

      mockEvent = {
        target: mockTarget,
        preventDefault: jest.fn(),
      } as any;
    });

    it('should add toggled class to target element', () => {
      component.onClick(mockEvent, undefined);

      expect(mockTarget.classList.add).toHaveBeenCalledWith('toggled');
    });

    it('should call action when provided', () => {
      const mockAction = jest.fn();

      component.onClick(mockEvent, mockAction);

      expect(mockAction).toHaveBeenCalledWith(mockEvent, true);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should dispatch eventBus event when eventBusName provided', () => {
      component.onClick(mockEvent, undefined, 'testEvent');

      expect(mockPDFViewerApplication.eventBus.dispatch).toHaveBeenCalledWith('testEvent');
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should close secondary toolbar when closeOnClick is true', () => {
      component.onClick(mockEvent, undefined, undefined, true);

      expect(mockPDFViewerApplication.secondaryToolbar.close).toHaveBeenCalled();
    });

    it('should handle missing target gracefully', () => {
      const eventWithNullTarget = {
        target: null,
        preventDefault: jest.fn(),
      } as any;

      expect(() => component.onClick(eventWithNullTarget, undefined)).not.toThrow();
    });
  });

  describe('Input properties', () => {
    it('should accept customSecondaryToolbar input', () => {
      const templateRef = {} as TemplateRef<any>;
      fixture.componentRef.setInput('customSecondaryToolbar', templateRef);
      TestBed.flushEffects();

      expect(component.customSecondaryToolbar()).toBe(templateRef);
    });

    it('should accept secondaryToolbarTop input', () => {
      fixture.componentRef.setInput('secondaryToolbarTop', '50px');
      TestBed.flushEffects();

      expect(component.secondaryToolbarTop()).toBe('50px');
    });

    it('should accept mobileFriendlyZoomScale input', () => {
      fixture.componentRef.setInput('mobileFriendlyZoomScale', 1.5);
      TestBed.flushEffects();

      expect(component.mobileFriendlyZoomScale()).toBe(1.5);
    });

    it('should accept localizationInitialized input', () => {
      fixture.componentRef.setInput('localizationInitialized', true);
      TestBed.flushEffects();

      expect(component.localizationInitialized()).toBe(true);
    });
  });

  describe('MutationObserver callback', () => {
    it('should call checkVisibility on class attribute changes', () => {
      const checkVisibilitySpy = jest.spyOn(component, 'checkVisibility');
      let observerCallback: MutationCallback;

      global.MutationObserver = jest.fn((callback) => {
        observerCallback = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
        };
      }) as any;

      component.ngAfterViewInit();

      const mockMutation = {
        type: 'attributes',
        attributeName: 'class',
      } as MutationRecord;

      observerCallback!([mockMutation], {} as MutationObserver);

      expect(checkVisibilitySpy).toHaveBeenCalled();
    });

    it('should call checkVisibility on childList changes', () => {
      const checkVisibilitySpy = jest.spyOn(component, 'checkVisibility');
      let observerCallback: MutationCallback;

      global.MutationObserver = jest.fn((callback) => {
        observerCallback = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
        };
      }) as any;

      component.ngAfterViewInit();

      const mockMutation = {
        type: 'childList',
      } as MutationRecord;

      observerCallback!([mockMutation], {} as MutationObserver);

      expect(checkVisibilitySpy).toHaveBeenCalled();
    });
  });
});
