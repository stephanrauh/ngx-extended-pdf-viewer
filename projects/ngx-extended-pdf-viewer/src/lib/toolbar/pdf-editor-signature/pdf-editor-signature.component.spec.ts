import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfEditorSignatureComponent } from './pdf-editor-signature.component';

describe('PdfEditorSignatureComponent', () => {
  let component: PdfEditorSignatureComponent;
  let fixture: ComponentFixture<PdfEditorSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfEditorSignatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfEditorSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
