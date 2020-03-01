import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfZoomOutComponent } from './pdf-zoom-out.component';

describe('PdfZoomOutComponent', () => {
  let component: PdfZoomOutComponent;
  let fixture: ComponentFixture<PdfZoomOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfZoomOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfZoomOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
