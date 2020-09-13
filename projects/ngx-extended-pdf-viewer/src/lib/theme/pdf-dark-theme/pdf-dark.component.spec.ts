import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDarkComponent } from './pdf-dark.component';

describe('PdfDarkComponent', () => {
  let component: PdfDarkComponent;
  let fixture: ComponentFixture<PdfDarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfDarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
