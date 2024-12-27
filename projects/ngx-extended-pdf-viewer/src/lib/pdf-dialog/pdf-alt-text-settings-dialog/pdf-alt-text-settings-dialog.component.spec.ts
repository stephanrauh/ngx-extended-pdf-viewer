/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfAltTextSettingsDialogComponent } from './pdf-alt-text-settings-dialog.component';

describe('PdfAltTextSettingsDialogComponent', () => {
  let component: PdfAltTextSettingsDialogComponent;
  let fixture: ComponentFixture<PdfAltTextSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PdfAltTextSettingsDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfAltTextSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
