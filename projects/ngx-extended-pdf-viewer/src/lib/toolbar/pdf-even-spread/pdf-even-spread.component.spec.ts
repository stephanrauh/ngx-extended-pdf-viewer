import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { PDFNotificationService } from '../../pdf-notification-service';
import { PdfEvenSpreadComponent } from './pdf-even-spread.component';
import { PdfShyButtonComponent } from '../pdf-shy-button/pdf-shy-button.component';
import { ResponsiveCSSClassPipe } from '../../responsive-visibility';

// Mock the PDFViewerApplication object
const mockPDFViewerApplication = {
  eventBus: {
    on: jest.fn(),
  },
  pdfViewer: {
    spreadMode: 0,
  },
} as unknown as IPDFViewerApplication;

describe('PdfEvenSpreadComponent', () => {
  let component: PdfEvenSpreadComponent;
  let fixture: ComponentFixture<PdfEvenSpreadComponent>;
  let pdfNotificationService: PDFNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfEvenSpreadComponent, PdfShyButtonComponent, ResponsiveCSSClassPipe],
      providers: [PDFNotificationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfEvenSpreadComponent);
    component = fixture.componentInstance;
    pdfNotificationService = TestBed.inject(PDFNotificationService);

    // Assign the mock object to the PDFViewerApplication
    pdfNotificationService.onPDFJSInitSignal.set(mockPDFViewerApplication);

    // Detect changes to initialize the component
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the spreadMode to 2 on click', () => {
    component.onClick();
    expect(mockPDFViewerApplication.pdfViewer.spreadMode).toBe(2);
  });
});
