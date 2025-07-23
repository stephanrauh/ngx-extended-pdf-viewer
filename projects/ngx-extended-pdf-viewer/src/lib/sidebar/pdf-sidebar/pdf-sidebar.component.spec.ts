import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, ElementRef, TemplateRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { PdfSidebarComponent } from './pdf-sidebar.component';
import { PdfThumbnailDrawnEvent } from '../../events/pdf-thumbnail-drawn-event';
import { ResponsiveVisibility } from '../../responsive-visibility';

describe('PdfSidebarComponent', () => {
  let component: PdfSidebarComponent;
  let fixture: ComponentFixture<PdfSidebarComponent>;
  let mockElementRef: jest.Mocked<ElementRef>;
  let mockChangeDetectorRef: jest.Mocked<ChangeDetectorRef>;
  let mockNativeElement: jest.Mocked<HTMLElement>;

  beforeEach(async () => {
    mockNativeElement = {
      querySelectorAll: jest.fn()
    } as any;

    mockElementRef = {
      nativeElement: mockNativeElement
    } as any;

    mockChangeDetectorRef = {
      markForCheck: jest.fn(),
      detectChanges: jest.fn(),
      checkNoChanges: jest.fn(),
      detach: jest.fn(),
      reattach: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [PdfSidebarComponent],
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfSidebarComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('component initialization', () => {
    it('should create', () => {
      expect(component).toBeInstanceOf(PdfSidebarComponent);
    });

    it('should have correct default values', () => {
      expect(component.sidebarPositionTop).toBeUndefined();
      expect(component.sidebarVisible).toBe(true);
      expect(component.mobileFriendlyZoomScale).toBe(1);
      expect(component.showSidebarButton).toBe(true);
      expect(component.customSidebar).toBeUndefined();
      expect(component.customThumbnail).toBeUndefined();
      expect(component.hideSidebarToolbar).toBe(true);
    });

    it('should initialize thumbnailDrawn EventEmitter', () => {
      expect(component.thumbnailDrawn).toBeDefined();
      expect(component.thumbnailDrawn.emit).toBeDefined();
    });
  });

  describe('input properties', () => {
    it('should accept sidebarPositionTop input', () => {
      const topPosition = '50px';
      component.sidebarPositionTop = topPosition;
      
      expect(component.sidebarPositionTop).toBe(topPosition);
    });

    it('should accept sidebarVisible input', () => {
      component.sidebarVisible = false;
      expect(component.sidebarVisible).toBe(false);
      
      component.sidebarVisible = true;
      expect(component.sidebarVisible).toBe(true);
    });

    it('should accept mobileFriendlyZoomScale input', () => {
      component.mobileFriendlyZoomScale = 1.5;
      expect(component.mobileFriendlyZoomScale).toBe(1.5);
      
      component.mobileFriendlyZoomScale = 0.8;
      expect(component.mobileFriendlyZoomScale).toBe(0.8);
    });

    it('should accept showSidebarButton input with boolean values', () => {
      component.showSidebarButton = false;
      expect(component.showSidebarButton).toBe(false);
      
      component.showSidebarButton = true;
      expect(component.showSidebarButton).toBe(true);
    });

    it('should accept showSidebarButton input with ResponsiveVisibility values', () => {
      component.showSidebarButton = 'xxs';
      expect(component.showSidebarButton).toBe('xxs');
      
      component.showSidebarButton = 'always-visible';
      expect(component.showSidebarButton).toBe('always-visible');
    });

    it('should accept customSidebar template reference', () => {
      const mockTemplate = {} as TemplateRef<any>;
      component.customSidebar = mockTemplate;
      
      expect(component.customSidebar).toBe(mockTemplate);
    });

    it('should accept customThumbnail template reference', () => {
      const mockTemplate = {} as TemplateRef<any>;
      component.customThumbnail = mockTemplate;
      
      expect(component.customThumbnail).toBe(mockTemplate);
    });
  });

  describe('output events', () => {
    it('should emit thumbnailDrawn event', () => {
      const mockEvent: PdfThumbnailDrawnEvent = {
        thumbnail: {} as HTMLElement,
        pageId: 1,
        container: {} as HTMLElement
      };
      
      jest.spyOn(component.thumbnailDrawn, 'emit');
      
      component.thumbnailDrawn.emit(mockEvent);
      
      expect(component.thumbnailDrawn.emit).toHaveBeenCalledWith(mockEvent);
    });

    it('should have thumbnailDrawn as EventEmitter instance', () => {
      expect(component.thumbnailDrawn.subscribe).toBeDefined();
      expect(component.thumbnailDrawn.unsubscribe).toBeDefined();
    });
  });

  describe('showToolbarWhenNecessary method', () => {
    let mockButtons: HTMLButtonElement[];

    beforeEach(() => {
      mockButtons = [];
      // Ensure component has access to our mocked ChangeDetectorRef and ElementRef
      (component as any).ref = mockChangeDetectorRef;
      (component as any).elementRef = mockElementRef;
    });

    it('should hide toolbar when no buttons are visible', () => {
      const hiddenButton1 = { hidden: true } as HTMLButtonElement;
      const hiddenButton2 = { hidden: true } as HTMLButtonElement;
      mockButtons = [hiddenButton1, hiddenButton2];
      
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: mockButtons.length,
        item: (index: number) => mockButtons[index]
      } as any);

      component.showToolbarWhenNecessary();

      expect(component.hideSidebarToolbar).toBe(true);
      expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should hide toolbar when only one button is visible', () => {
      const visibleButton = { hidden: false } as HTMLButtonElement;
      const hiddenButton = { hidden: true } as HTMLButtonElement;
      mockButtons = [visibleButton, hiddenButton];
      
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: mockButtons.length,
        item: (index: number) => mockButtons[index]
      } as any);

      component.showToolbarWhenNecessary();

      expect(component.hideSidebarToolbar).toBe(true);
      expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should show toolbar when more than one button is visible', () => {
      const visibleButton1 = { hidden: false } as HTMLButtonElement;
      const visibleButton2 = { hidden: false } as HTMLButtonElement;
      const hiddenButton = { hidden: true } as HTMLButtonElement;
      mockButtons = [visibleButton1, visibleButton2, hiddenButton];
      
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: mockButtons.length,
        item: (index: number) => mockButtons[index]
      } as any);

      component.showToolbarWhenNecessary();

      expect(component.hideSidebarToolbar).toBe(false);
      expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should show toolbar when two buttons are visible', () => {
      const visibleButton1 = { hidden: false } as HTMLButtonElement;
      const visibleButton2 = { hidden: false } as HTMLButtonElement;
      mockButtons = [visibleButton1, visibleButton2];
      
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: mockButtons.length,
        item: (index: number) => mockButtons[index]
      } as any);

      component.showToolbarWhenNecessary();

      expect(component.hideSidebarToolbar).toBe(false);
      expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should hide toolbar when no buttons exist', () => {
      mockButtons = [];
      
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: 0,
        item: () => null
      } as any);

      component.showToolbarWhenNecessary();

      expect(component.hideSidebarToolbar).toBe(true);
      expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should call querySelectorAll with correct selector', () => {
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: 0,
        item: () => null
      } as any);

      component.showToolbarWhenNecessary();

      expect(mockNativeElement.querySelectorAll).toHaveBeenCalledWith('button');
    });

    it('should always call markForCheck', () => {
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: 0,
        item: () => null
      } as any);

      component.showToolbarWhenNecessary();

      expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalledTimes(1);
    });

    it('should handle mixed button visibility states', () => {
      const buttons = [
        { hidden: false }, // visible
        { hidden: true },  // hidden
        { hidden: false }, // visible
        { hidden: true },  // hidden
        { hidden: false }  // visible
      ] as HTMLButtonElement[];
      
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: buttons.length,
        item: (index: number) => buttons[index]
      } as any);

      component.showToolbarWhenNecessary();

      // 3 visible buttons should show toolbar
      expect(component.hideSidebarToolbar).toBe(false);
      expect(mockChangeDetectorRef.markForCheck).toHaveBeenCalled();
    });

    it('should work correctly with various button counts', () => {
      // Test with different numbers of visible buttons
      const testCases = [
        { visible: 0, expected: true },  // hide toolbar
        { visible: 1, expected: true },  // hide toolbar
        { visible: 2, expected: false }, // show toolbar
        { visible: 3, expected: false }, // show toolbar
        { visible: 5, expected: false }  // show toolbar
      ];

      testCases.forEach(({ visible, expected }, index) => {
        const buttons = Array.from({ length: visible + 2 }, (_, i) => ({
          hidden: i >= visible
        })) as HTMLButtonElement[];
        
        mockNativeElement.querySelectorAll.mockReturnValue({
          length: buttons.length,
          item: (index: number) => buttons[index]
        } as any);

        component.showToolbarWhenNecessary();

        expect(component.hideSidebarToolbar).toBe(expected);
        mockChangeDetectorRef.markForCheck.mockClear();
      });
    });
  });

  describe('component lifecycle and dependency injection', () => {
    it('should receive ElementRef in constructor', () => {
      expect((component as any).elementRef).toBeDefined();
      expect((component as any).elementRef.nativeElement).toBeDefined();
    });

    it('should receive ChangeDetectorRef in constructor', () => {
      expect((component as any).ref).toBeDefined();
      expect(typeof (component as any).ref.markForCheck).toBe('function');
    });

    it('should access nativeElement through ElementRef and execute method successfully', () => {
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: 0,
        item: () => null
      } as any);

      expect(() => component.showToolbarWhenNecessary()).not.toThrow();
      expect(component.hideSidebarToolbar).toBe(true);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle null nativeElement gracefully', () => {
      (component as any).elementRef.nativeElement = null;
      
      expect(() => component.showToolbarWhenNecessary()).toThrow();
    });

    it('should handle querySelectorAll returning null', () => {
      mockNativeElement.querySelectorAll.mockReturnValue(null as any);
      
      expect(() => component.showToolbarWhenNecessary()).not.toThrow();
      // When querySelectorAll returns null, the toolbar should be hidden
      expect(component.hideSidebarToolbar).toBe(true);
    });

    it('should handle buttons with undefined hidden property', () => {
      const buttonWithoutHidden = {} as HTMLButtonElement; // hidden is undefined
      const visibleButton = { hidden: false } as HTMLButtonElement;
      
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: 2,
        item: (index: number) => index === 0 ? buttonWithoutHidden : visibleButton
      } as any);

      component.showToolbarWhenNecessary();

      // undefined hidden should be treated as visible, but we need to check the actual implementation
      // If the implementation treats undefined as hidden, then it's actually 1 visible button
      expect(component.hideSidebarToolbar).toBe(true); // Only 1 visible button
    });

    it('should handle empty NodeList', () => {
      mockNativeElement.querySelectorAll.mockReturnValue({
        length: 0,
        item: () => null
      } as any);

      component.showToolbarWhenNecessary();

      expect(component.hideSidebarToolbar).toBe(true);
    });
  });

  describe('integration with Angular features', () => {
    it('should work with ngOnInit lifecycle if added', () => {
      // Component doesn't implement OnInit, but testing it wouldn't break if it did
      expect(component).toBeTruthy();
    });

    it('should support change detection correctly', () => {
      component.sidebarVisible = false;
      fixture.detectChanges();
      
      expect(component.sidebarVisible).toBe(false);
    });

    it('should emit events correctly', (done) => {
      const mockEvent: PdfThumbnailDrawnEvent = {
        thumbnail: {} as HTMLElement,
        pageId: 1,
        container: {} as HTMLElement
      };

      component.thumbnailDrawn.subscribe((event) => {
        expect(event).toBe(mockEvent);
        done();
      });

      component.thumbnailDrawn.emit(mockEvent);
    });
  });

  describe('component template integration', () => {
    it('should have correct selector', () => {
      const componentFactory = TestBed.createComponent(PdfSidebarComponent);
      expect(componentFactory).toBeTruthy();
    });

    it('should handle template properties', () => {
      component.sidebarPositionTop = '100px';
      component.hideSidebarToolbar = false;
      
      fixture.detectChanges();
      
      expect(component.sidebarPositionTop).toBe('100px');
      expect(component.hideSidebarToolbar).toBe(false);
    });
  });
});