import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PdfDrawEditorComponent } from '../pdf-draw-editor/pdf-draw-editor.component';
import { PdfHighlightEditorComponent } from '../pdf-highlight-editor/pdf-highlight-editor.component';
import { PdfStampEditorComponent } from '../pdf-stamp-editor/pdf-stamp-editor.component';
import { PdfTextEditorComponent } from '../pdf-text-editor/pdf-text-editor.component';
import { PdfEditorSignatureComponent } from '../pdf-editor-signature/pdf-editor-signature.component';
import { PdfEditorComponent } from './pdf-editor.component';
import { PdfShyButtonComponent } from '../pdf-shy-button/pdf-shy-button.component';
import { ResponsiveCSSClassPipe } from '../../responsive-visibility';
import { PositioningService } from '../../dynamic-css/positioning.service';

describe('PdfEditorComponent', () => {
  let component: PdfEditorComponent;
  let fixture: ComponentFixture<PdfEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PdfEditorComponent,
        PdfHighlightEditorComponent,
        PdfTextEditorComponent,
        PdfStampEditorComponent,
        PdfDrawEditorComponent,
        PdfEditorSignatureComponent,
        PdfShyButtonComponent,
        ResponsiveCSSClassPipe,
      ],
      providers: [
        PositioningService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have showTextEditor default to true', () => {
    expect(component.showTextEditor()).toBe(true);
  });

  it('should set showTextEditor to true', () => {
    fixture.componentRef.setInput('showTextEditor', true);
    TestBed.flushEffects();
    expect(component.showTextEditor()).toBe(true);
  });

  it('should set showTextEditor to false', () => {
    fixture.componentRef.setInput('showTextEditor', false);
    TestBed.flushEffects();
    expect(component.showTextEditor()).toBe(false);
  });
});
