import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPreviousPageComponent } from './pdf-previous-page.component';

describe('PdfPreviousPageComponent', () => {
  let component: PdfPreviousPageComponent;
  let fixture: ComponentFixture<PdfPreviousPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfPreviousPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPreviousPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
