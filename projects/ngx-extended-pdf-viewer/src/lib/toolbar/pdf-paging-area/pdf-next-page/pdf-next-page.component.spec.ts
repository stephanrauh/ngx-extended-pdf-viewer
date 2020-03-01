import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfNextPageComponent } from './pdf-next-page.component';

describe('PdfNextPageComponent', () => {
  let component: PdfNextPageComponent;
  let fixture: ComponentFixture<PdfNextPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfNextPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfNextPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
