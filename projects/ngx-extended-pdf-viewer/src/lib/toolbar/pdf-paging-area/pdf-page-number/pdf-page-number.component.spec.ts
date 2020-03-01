import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPageNumberComponent } from './pdf-page-number.component';

describe('PdfPageNumberComponent', () => {
  let component: PdfPageNumberComponent;
  let fixture: ComponentFixture<PdfPageNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfPageNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPageNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
