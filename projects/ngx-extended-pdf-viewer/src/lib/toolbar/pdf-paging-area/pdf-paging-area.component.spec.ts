import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPagingAreaComponent } from './pdf-paging-area.component';

describe('PdfPagingAreaComponent', () => {
  let component: PdfPagingAreaComponent;
  let fixture: ComponentFixture<PdfPagingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfPagingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPagingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
