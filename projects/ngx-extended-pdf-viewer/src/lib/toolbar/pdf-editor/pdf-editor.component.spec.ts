import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfDrawEditorComponent } from '../pdf-draw-editor/pdf-draw-editor.component';
import { PdfHighlightEditorComponent } from '../pdf-highlight-editor/pdf-highlight-editor.component';
import { PdfStampEditorComponent } from '../pdf-stamp-editor/pdf-stamp-editor.component';
import { PdfTextEditorComponent } from '../pdf-text-editor/pdf-text-editor.component';
import { PdfEditorComponent } from './pdf-editor.component';
import { PdfShyButtonComponent } from '../pdf-shy-button/pdf-shy-button.component';
import { ResponsiveCSSClassPipe } from '../../responsive-visibility';

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
        PdfShyButtonComponent,
        ResponsiveCSSClassPipe,
      ],
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
    expect(component.showTextEditor).toBe(true);
  });

  it('should set showTextEditor to true', () => {
    component.showTextEditor = true;
    fixture.detectChanges();
    expect(component.showTextEditor).toBe(true);
  });

  it('should set showTextEditor to false', () => {
    component.showTextEditor = false;
    fixture.detectChanges();
    expect(component.showTextEditor).toBe(false);
  });
});
