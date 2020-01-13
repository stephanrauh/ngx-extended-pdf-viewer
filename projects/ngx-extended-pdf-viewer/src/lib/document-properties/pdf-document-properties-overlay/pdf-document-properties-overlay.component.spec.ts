import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDocumentPropertiesOverlayComponent } from './pdf-document-properties-overlay.component';

describe('PdfDocumentPropertiesOverlayComponent', () => {
  let component: PdfDocumentPropertiesOverlayComponent;
  let fixture: ComponentFixture<PdfDocumentPropertiesOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfDocumentPropertiesOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfDocumentPropertiesOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
