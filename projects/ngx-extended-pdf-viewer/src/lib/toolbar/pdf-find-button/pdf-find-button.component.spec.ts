import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfFindButtonComponent } from './pdf-find-button.component';

// Mock the PDFViewerApplication object
const mockPDFViewerApplication = {
  findBar: {
    opened: false,
    open: jest.fn(),
    close: jest.fn(),
  },
};

describe('PdfFindButtonComponent', () => {
  let component: PdfFindButtonComponent;
  let fixture: ComponentFixture<PdfFindButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfFindButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    // Create a component instance
    fixture = TestBed.createComponent(PdfFindButtonComponent);
    component = fixture.componentInstance;

    // Assign the mock object to the window.PDFViewerApplication
    (window as any).PDFViewerApplication = mockPDFViewerApplication;

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
});
