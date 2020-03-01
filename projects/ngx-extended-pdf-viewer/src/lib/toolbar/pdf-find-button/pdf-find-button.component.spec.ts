import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFindButtonComponent } from './pdf-find-button.component';

describe('PdfFindButtonComponent', () => {
  let component: PdfFindButtonComponent;
  let fixture: ComponentFixture<PdfFindButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfFindButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfFindButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
