import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsiveCSSClassPipe } from '../../responsive-visibility';
import { PdfShyButtonComponent } from '../pdf-shy-button/pdf-shy-button.component';
import { PdfMoveUpComponent } from './pdf-move-up.component';

describe('PdfDownloadComponent', () => {
  let component: PdfMoveUpComponent;
  let fixture: ComponentFixture<PdfMoveUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfMoveUpComponent, PdfShyButtonComponent, ResponsiveCSSClassPipe],
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
    expect(component.showMoveUpButton).toBe(true);
  });

  it('should set showMoveUpButton to true', () => {
    component.showMoveUpButton = true;
    fixture.detectChanges();
    expect(component.showMoveUpButton).toBe(true);
  });

  it('should set showMoveUpButton to false', () => {
    component.showMoveUpButton = false;
    fixture.detectChanges();
    expect(component.showMoveUpButton).toBe(false);
  });
});
