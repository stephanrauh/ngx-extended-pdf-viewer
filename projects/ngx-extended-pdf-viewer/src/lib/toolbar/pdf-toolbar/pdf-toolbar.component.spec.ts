import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfToolbarComponent } from './pdf-toolbar.component';

describe('PdfToolbarComponent', () => {
  let component: PdfToolbarComponent;
  let fixture: ComponentFixture<PdfToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
