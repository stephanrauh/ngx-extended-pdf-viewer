import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ResponsiveCSSClassPipe } from '../../responsive-visibility';
import { PdfShyButtonComponent } from '../pdf-shy-button/pdf-shy-button.component';
import { PdfMoveUpComponent } from './pdf-move-up.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';

describe('PdfMoveUpComponent', () => {
  let component: PdfMoveUpComponent;
  let fixture: ComponentFixture<PdfMoveUpComponent>;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;
  let mockPDFViewerApplication: any;

  beforeEach(async () => {
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);
    mockPDFViewerApplication = {
      page: 5,
      eventBus: {
        dispatch: jest.fn(),
      },
    };

    await TestBed.configureTestingModule({
      declarations: [PdfMoveUpComponent, PdfShyButtonComponent, ResponsiveCSSClassPipe],
      providers: [
        { provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfMoveUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have showMoveUpButton default to true', () => {
    expect(component.showMoveUpButton()).toBe(true);
  });

  it('should set showMoveUpButton to true', () => {
    fixture.componentRef.setInput('showMoveUpButton', true);
    TestBed.flushEffects();
    expect(component.showMoveUpButton()).toBe(true);
  });

  it('should set showMoveUpButton to false', () => {
    fixture.componentRef.setInput('showMoveUpButton', false);
    TestBed.flushEffects();
    expect(component.showMoveUpButton()).toBe(false);
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

    it('should pass disabled to the template when disable is true', () => {
      fixture.componentRef.setInput('disable', true);
      fixture.detectChanges();
      // The template binds [disabled]="disable()" on pdf-shy-button
      const shyButton = fixture.debugElement.children[0].componentInstance;
      expect(shyButton.disabled()).toBe(true);
    });

    it('should pass disabled=false when disable is false', () => {
      fixture.componentRef.setInput('disable', false);
      fixture.detectChanges();
      const shyButton = fixture.debugElement.children[0].componentInstance;
      expect(shyButton.disabled()).toBe(false);
    });
  });

  describe('movePageUp', () => {
    it('should dispatch movePageUp event when PDFViewerApplication is initialized', () => {
      pdfAppSignal.set(mockPDFViewerApplication);
      fixture.detectChanges();
      TestBed.flushEffects();

      component.movePageUp();

      expect(mockPDFViewerApplication.eventBus.dispatch).toHaveBeenCalledWith('movePageUp', {
        source: { pageNumber: 5 },
      });
    });

    it('should not throw when PDFViewerApplication is undefined', () => {
      pdfAppSignal.set(undefined);
      fixture.detectChanges();
      TestBed.flushEffects();

      expect(() => component.movePageUp()).not.toThrow();
    });

    it('should use the current page number from PDFViewerApplication', () => {
      pdfAppSignal.set(mockPDFViewerApplication);
      fixture.detectChanges();
      TestBed.flushEffects();
      mockPDFViewerApplication.page = 10;

      component.movePageUp();

      expect(mockPDFViewerApplication.eventBus.dispatch).toHaveBeenCalledWith('movePageUp', {
        source: { pageNumber: 10 },
      });
    });
  });
});
