import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { PdfShyButtonComponent } from './pdf-shy-button.component';
import { PdfShyButtonService } from './pdf-shy-button-service';
import { PdfCspPolicyService } from '../../pdf-csp-policy.service';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

describe('PdfShyButtonComponent', () => {
  let component: PdfShyButtonComponent;
  let fixture: ComponentFixture<PdfShyButtonComponent>;
  let mockShyButtonService: jest.Mocked<PdfShyButtonService>;
  let mockPdfCspPolicyService: jest.Mocked<PdfCspPolicyService>;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;
  let mockEventBus: any;

  beforeEach(() => {
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);
    mockEventBus = {
      on: jest.fn(),
      dispatch: jest.fn(),
    };

    mockShyButtonService = {
      add: jest.fn(),
      update: jest.fn(),
      buttons: [],
      notificationService: {} as any,
    } as any;

    mockPdfCspPolicyService = {
      addTrustedHTML: jest.fn((el: HTMLElement, html: string) => {
        el.innerHTML = html;
      }),
      sanitizeHTML: jest.fn((html: string) => html),
      init: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      declarations: [PdfShyButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PdfShyButtonService, useValue: mockShyButtonService },
        { provide: PdfCspPolicyService, useValue: mockPdfCspPolicyService },
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } },
      ],
    });

    fixture = TestBed.createComponent(PdfShyButtonComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('component creation', () => {
    it('should create', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.detectChanges();
      expect(component.secondaryMenuId()).toBe('');
      expect(component.cssClass()).toBe('invisible');
      expect(component.eventBusName()).toBeUndefined();
      expect(component.l10nId()).toBe('');
      expect(component.l10nLabel()).toBe('');
      expect(component.title()).toBe('');
      expect(component.toggled()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.order()).toBe(99999);
      expect(component.action()).toBeUndefined();
      expect(component.closeOnClick()).toBe(true);
      expect(component.onlySecondaryMenu()).toBe(false);
      expect(component.image()).toBe('');
      expect(component.renderContent).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should call pdfShyButtonService.add', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.detectChanges();
      TestBed.flushEffects();
      expect(mockShyButtonService.add).toHaveBeenCalledWith(component);
    });
  });

  describe('effect: update service on input change', () => {
    it('should call pdfShyButtonService.update when inputs change', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(mockShyButtonService.update).toHaveBeenCalledWith(component);
    });
  });

  describe('effect: PDFViewerApplication initialization', () => {
    it('should store PDFViewerApplication reference', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.detectChanges();
      TestBed.flushEffects();

      const mockApp = { eventBus: mockEventBus } as any;
      pdfAppSignal.set(mockApp);
      fixture.detectChanges();
      TestBed.flushEffects();

      expect((component as any).PDFViewerApplication).toBe(mockApp);
    });
  });

  describe('imageHtml computed signal', () => {
    it('should return undefined when image is empty', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.componentRef.setInput('image', '');
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(component.imageHtml()).toBeUndefined();
    });

    it('should return SVG string when image contains valid SVG', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.componentRef.setInput('image', '<svg><path d="M0 0"/></svg>');
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(component.imageHtml()).toBe('<svg><path d="M0 0"/></svg>');
    });

    it('should throw an error for illegal tags', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.componentRef.setInput('image', '');
      fixture.detectChanges();
      TestBed.flushEffects();

      // Now set the illegal image after initial render
      fixture.componentRef.setInput('image', '<div>not allowed</div>');

      expect(() => component.imageHtml()).toThrow('Illegal image for PDFShyButton');
    });

    it('should allow complex SVG with nested tags', () => {
      const svg = '<svg><g><circle cx="10" cy="10" r="5"/><rect width="10" height="10"/></g></svg>';
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.componentRef.setInput('image', svg);
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(component.imageHtml()).toBe(svg);
    });

    it('should allow closing tags', () => {
      const svg = '<svg><path d="M0 0"></path></svg>';
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.componentRef.setInput('image', svg);
      fixture.detectChanges();

      expect(component.imageHtml()).toBe(svg);
    });
  });

  describe('onClick', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.detectChanges();
    });

    it('should call action function when provided', () => {
      const actionFn = jest.fn();
      fixture.componentRef.setInput('action', actionFn);
      TestBed.flushEffects();

      const mockEvent = new MouseEvent('click');
      jest.spyOn(mockEvent, 'preventDefault');

      component.onClick(mockEvent);

      expect(actionFn).toHaveBeenCalledWith(mockEvent, false);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should dispatch eventBus event when eventBusName is set and no action', () => {
      fixture.componentRef.setInput('eventBusName', 'myEvent');
      fixture.detectChanges();
      TestBed.flushEffects();

      // Set PDFViewerApplication directly (effect won't run synchronously in all cases)
      (component as any).PDFViewerApplication = { eventBus: mockEventBus } as any;

      const mockEvent = new MouseEvent('click');
      jest.spyOn(mockEvent, 'preventDefault');

      component.onClick(mockEvent);

      expect(mockEventBus.dispatch).toHaveBeenCalledWith('myEvent');
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should do nothing when no action and no eventBusName', () => {
      const mockEvent = new MouseEvent('click');
      jest.spyOn(mockEvent, 'preventDefault');

      component.onClick(mockEvent);

      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });

    it('should ignore keyboard events that are not Enter or Space', () => {
      const actionFn = jest.fn();
      fixture.componentRef.setInput('action', actionFn);
      TestBed.flushEffects();

      const keyEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      component.onClick(keyEvent);

      expect(actionFn).not.toHaveBeenCalled();
    });

    it('should process Enter keyboard events', () => {
      const actionFn = jest.fn();
      fixture.componentRef.setInput('action', actionFn);
      TestBed.flushEffects();

      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      jest.spyOn(keyEvent, 'preventDefault');
      component.onClick(keyEvent);

      expect(actionFn).toHaveBeenCalled();
    });

    it('should process Space keyboard events', () => {
      const actionFn = jest.fn();
      fixture.componentRef.setInput('action', actionFn);
      TestBed.flushEffects();

      const keyEvent = new KeyboardEvent('keydown', { key: ' ' });
      jest.spyOn(keyEvent, 'preventDefault');
      component.onClick(keyEvent);

      expect(actionFn).toHaveBeenCalled();
    });

    it('should prefer action over eventBusName', () => {
      const actionFn = jest.fn();
      fixture.componentRef.setInput('action', actionFn);
      fixture.componentRef.setInput('eventBusName', 'myEvent');
      fixture.detectChanges();
      TestBed.flushEffects();

      (component as any).PDFViewerApplication = { eventBus: mockEventBus } as any;

      const mockEvent = new MouseEvent('click');
      jest.spyOn(mockEvent, 'preventDefault');
      component.onClick(mockEvent);

      expect(actionFn).toHaveBeenCalled();
      expect(mockEventBus.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('updateButtonImage', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
    });

    it('should append SVG image to button element when imageHtml returns valid SVG', () => {
      fixture.componentRef.setInput('image', '<svg><path d="M0 0"/></svg>');
      fixture.detectChanges();
      TestBed.flushEffects();

      // Create a mock button element and override buttonRef
      const mockButton = document.createElement('button');
      jest.spyOn(component, 'buttonRef').mockReturnValue({ nativeElement: mockButton } as any);

      component.updateButtonImage();

      expect(mockPdfCspPolicyService.addTrustedHTML).toHaveBeenCalled();
    });

    it('should remove child nodes when imageHtml is empty', () => {
      fixture.componentRef.setInput('image', '');
      fixture.detectChanges();
      TestBed.flushEffects();

      // Create a mock button element with children
      const mockButton = document.createElement('button');
      const child = document.createElement('span');
      mockButton.appendChild(child);

      // Override buttonRef to return our mock
      jest.spyOn(component, 'buttonRef').mockReturnValue({ nativeElement: mockButton } as any);

      component.updateButtonImage();

      expect(mockButton.childNodes.length).toBe(0);
    });

    it('should do nothing when buttonRef is undefined', () => {
      fixture.componentRef.setInput('image', '<svg></svg>');
      fixture.detectChanges();

      jest.spyOn(component, 'buttonRef').mockReturnValue(undefined);

      // Should not throw
      expect(() => component.updateButtonImage()).not.toThrow();
    });
  });

  describe('ngAfterContentInit', () => {
    it('should set renderContent when primaryToolbarId is nestedComponent and nestedContent exists', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'nestedComponent');
      fixture.detectChanges();

      const mockContent = {} as ElementRef;
      jest.spyOn(component, 'nestedContent').mockReturnValue(mockContent);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      component.ngAfterContentInit();

      expect(component.renderContent).toBe(true);
      consoleSpy.mockRestore();
    });

    it('should set renderContent to false when primaryToolbarId is nestedComponent but no nestedContent', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'nestedComponent');
      fixture.detectChanges();

      jest.spyOn(component, 'nestedContent').mockReturnValue(undefined);

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      component.ngAfterContentInit();

      expect(component.renderContent).toBe(false);
      consoleSpy.mockRestore();
    });

    it('should not change renderContent when primaryToolbarId is not nestedComponent', () => {
      fixture.componentRef.setInput('primaryToolbarId', 'testButton');
      fixture.detectChanges();

      component.renderContent = false;
      component.ngAfterContentInit();

      expect(component.renderContent).toBe(false);
    });
  });
});
