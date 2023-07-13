import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfToolbarButtonOrMenuItemComponent } from './pdf-toolbar-button-or-menu-item.component';

describe('PdfToolbarButtonOrMenuItemComponent', () => {
  let component: PdfToolbarButtonOrMenuItemComponent;
  let fixture: ComponentFixture<PdfToolbarButtonOrMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfToolbarButtonOrMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfToolbarButtonOrMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
