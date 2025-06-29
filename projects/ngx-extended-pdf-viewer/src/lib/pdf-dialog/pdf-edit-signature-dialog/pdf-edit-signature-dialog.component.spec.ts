import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSignatureDialogComponent } from './pdf-edit-signature-dialog.component';

describe('EditSignatureDialogComponent', () => {
  let component: EditSignatureDialogComponent;
  let fixture: ComponentFixture<EditSignatureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSignatureDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSignatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
