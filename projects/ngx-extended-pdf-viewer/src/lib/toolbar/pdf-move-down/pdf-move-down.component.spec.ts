import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsiveCSSClassPipe } from '../../responsive-visibility';
import { PdfShyButtonComponent } from '../pdf-shy-button/pdf-shy-button.component';
import { PdfMoveDownComponent } from './pdf-move-down.component';

describe('PdfDownloadComponent', () => {
  let component: PdfMoveDownComponent;
  let fixture: ComponentFixture<PdfMoveDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfMoveDownComponent, PdfShyButtonComponent, ResponsiveCSSClassPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfMoveDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have showMoveDownButton default to true', () => {
    expect(component.showMoveDownButton).toBe(true);
  });

  it('should set showMoveDownButton to true', () => {
    component.showMoveDownButton = true;
    fixture.detectChanges();
    expect(component.showMoveDownButton).toBe(true);
  });

  it('should set showMoveDownButton to false', () => {
    component.showMoveDownButton = false;
    fixture.detectChanges();
    expect(component.showMoveDownButton).toBe(false);
  });
});
