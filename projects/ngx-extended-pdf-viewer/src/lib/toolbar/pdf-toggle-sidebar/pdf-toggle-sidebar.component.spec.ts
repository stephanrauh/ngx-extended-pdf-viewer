import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfToggleSidebarComponent } from './pdf-toggle-sidebar.component';

describe('PdfToggleSidebarComponent', () => {
  let component: PdfToggleSidebarComponent;
  let fixture: ComponentFixture<PdfToggleSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfToggleSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfToggleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
