import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfToggleSecondaryToolbarComponent } from './pdf-toggle-secondary-toolbar.component';

describe('PdfToggleSecondaryToolbarComponent', () => {
  let component: PdfToggleSecondaryToolbarComponent;
  let fixture: ComponentFixture<PdfToggleSecondaryToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfToggleSecondaryToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfToggleSecondaryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
