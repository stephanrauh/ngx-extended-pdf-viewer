import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsiveCSSClassPipe } from '../../responsive-visibility';
import { PdfShyButtonComponent } from '../pdf-shy-button/pdf-shy-button.component';
import { PdfDownloadComponent } from './pdf-download.component';

describe('PdfDownloadComponent', () => {
  let component: PdfDownloadComponent;
  let fixture: ComponentFixture<PdfDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfDownloadComponent, PdfShyButtonComponent, ResponsiveCSSClassPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have showDownloadButton default to true', () => {
    expect(component.showDownloadButton()).toBe(true);
  });

  it('should set showDownloadButton to true', () => {
    fixture.componentRef.setInput('showDownloadButton', true);
    TestBed.flushEffects();
    expect(component.showDownloadButton()).toBe(true);
  });

  it('should set showDownloadButton to false', () => {
    fixture.componentRef.setInput('showDownloadButton', false);
    TestBed.flushEffects();
    expect(component.showDownloadButton()).toBe(false);
  });
});
