import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSecondaryToolbarComponent } from './pdf-secondary-toolbar.component';

describe('PdfSecondaryToolbarComponent', () => {
  let component: PdfSecondaryToolbarComponent;
  let fixture: ComponentFixture<PdfSecondaryToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfSecondaryToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfSecondaryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
