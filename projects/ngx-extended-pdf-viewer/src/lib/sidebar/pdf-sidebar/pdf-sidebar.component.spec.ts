import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSidebarComponent } from './pdf-sidebar.component';

describe('PdfSidebarComponent', () => {
  let component: PdfSidebarComponent;
  let fixture: ComponentFixture<PdfSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
