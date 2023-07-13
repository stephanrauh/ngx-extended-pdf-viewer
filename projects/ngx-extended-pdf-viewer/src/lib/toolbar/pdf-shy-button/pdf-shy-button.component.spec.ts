import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfShyButtonComponent } from './pdf-shy-button.component';

describe('PdfToolbarButtonOrMenuItemComponent', () => {
  let component: PdfShyButtonComponent;
  let fixture: ComponentFixture<PdfShyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfShyButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfShyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
