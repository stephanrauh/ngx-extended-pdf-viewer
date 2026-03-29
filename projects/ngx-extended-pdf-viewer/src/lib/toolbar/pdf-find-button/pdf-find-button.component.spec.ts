import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsiveCSSClassPipe } from '../../responsive-visibility';
import { PdfShyButtonComponent } from '../pdf-shy-button/pdf-shy-button.component';
import { PdfFindButtonComponent } from './pdf-find-button.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

// Mock the PDFViewerApplication object
const mockPDFViewerApplication = {
  findBar: {
    opened: false,
    open: jest.fn(),
    close: jest.fn(),
  },
} as IPDFViewerApplication;

describe('PdfFindButtonComponent', () => {
  let component: PdfFindButtonComponent;
  let fixture: ComponentFixture<PdfFindButtonComponent>;
  let pdfNotificationService: PDFNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfFindButtonComponent, PdfShyButtonComponent, ResponsiveCSSClassPipe],
      providers: [PDFNotificationService],
    }).compileComponents();
  });

  beforeEach(() => {
    // Create a component instance
    fixture = TestBed.createComponent(PdfFindButtonComponent);
    component = fixture.componentInstance;

    // Assign the mock object to the window.PDFViewerApplication
    pdfNotificationService = TestBed.inject(PDFNotificationService);
    pdfNotificationService.onPDFJSInitSignal.set(mockPDFViewerApplication);

    // Detect changes to initialize the component
    fixture.detectChanges();
  });

  afterEach(() => {
    // Reset the mock function state after each test
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the findBar when it is closed', () => {
    // Simulate clicking the button when the findBar is closed
    component.onClick();

    // Assert that the open function is called on the findBar
    expect(mockPDFViewerApplication.findBar.open).toHaveBeenCalled();

    // Assert that the close function is not called
    expect(mockPDFViewerApplication.findBar.close).not.toHaveBeenCalled();
  });

  it('should close the findBar when it is open', () => {
    // Set the findBar to be opened
    mockPDFViewerApplication.findBar.opened = true;

    // Simulate clicking the button when the findBar is open
    component.onClick();

    // Assert that the close function is called on the findBar
    expect(mockPDFViewerApplication.findBar.close).toHaveBeenCalled();

    // Assert that the open function is not called
    expect(mockPDFViewerApplication.findBar.open).not.toHaveBeenCalled();
  });

  describe('disable input (#2818)', () => {
    it('should default disable to false', () => {
      expect(component.disable()).toBe(false);
    });

    it('should accept disable input set to true', () => {
      fixture.componentRef.setInput('disable', true);
      TestBed.flushEffects();
      expect(component.disable()).toBe(true);
    });

    it('should pass disabled to pdf-shy-button when disable is true', () => {
      fixture.componentRef.setInput('disable', true);
      fixture.detectChanges();
      const shyButton = fixture.debugElement.children[0].componentInstance;
      expect(shyButton.disabled()).toBe(true);
    });

    it('should pass disabled=false to pdf-shy-button when disable is false', () => {
      fixture.componentRef.setInput('disable', false);
      fixture.detectChanges();
      const shyButton = fixture.debugElement.children[0].componentInstance;
      expect(shyButton.disabled()).toBe(false);
    });
  });
});
