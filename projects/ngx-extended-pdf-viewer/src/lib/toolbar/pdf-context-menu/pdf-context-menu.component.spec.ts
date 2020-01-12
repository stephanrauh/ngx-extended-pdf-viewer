import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfContextMenuComponent } from './pdf-context-menu.component';

describe('PdfContextMenuComponent', () => {
  let component: PdfContextMenuComponent;
  let fixture: ComponentFixture<PdfContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfContextMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
