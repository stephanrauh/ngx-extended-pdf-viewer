import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform, signal } from '@angular/core';
import { PdfUndoRedoComponent } from './pdf-undo-redo.component';
import { PDFNotificationService } from '../../pdf-notification-service';
import { IPDFViewerApplication } from '../../options/pdf-viewer-application';
import { createSignalAwareEventBus, SignalAwareEventBus } from '../../testing/signal-aware-event-bus';

@Pipe({ name: 'responsiveCSSClass', standalone: false })
class MockResponsiveCSSClassPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Component({
  selector: 'pdf-shy-button',
  template: '<ng-content></ng-content>',
  inputs: ['title', 'primaryToolbarId', 'cssClass', 'l10nId', 'l10nLabel', 'order', 'action', 'closeOnClick', 'image', 'disabled'],
  standalone: false,
})
class MockPdfShyButtonComponent {}

describe('PdfUndoRedoComponent (stephanrauh/pdf.js#15)', () => {
  let component: PdfUndoRedoComponent;
  let fixture: ComponentFixture<PdfUndoRedoComponent>;
  let eventBus: SignalAwareEventBus;
  let pdfAppSignal: ReturnType<typeof signal<IPDFViewerApplication | undefined>>;

  beforeEach(() => {
    eventBus = createSignalAwareEventBus();
    pdfAppSignal = signal<IPDFViewerApplication | undefined>(undefined);

    TestBed.configureTestingModule({
      declarations: [PdfUndoRedoComponent, MockResponsiveCSSClassPipe, MockPdfShyButtonComponent],
      providers: [{ provide: PDFNotificationService, useValue: { onPDFJSInitSignal: pdfAppSignal } }],
    });

    fixture = TestBed.createComponent(PdfUndoRedoComponent);
    component = fixture.componentInstance;
    jest.useFakeTimers();
    pdfAppSignal.set({ eventBus } as any);
    fixture.detectChanges();
    TestBed.flushEffects();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  function statesChanged(details: Record<string, boolean>) {
    eventBus.dispatch('editingstateschanged', { details });
    jest.advanceTimersByTime(1);
  }

  it('starts with both buttons disabled', () => {
    expect(component.canUndo).toBe(false);
    expect(component.canRedo).toBe(false);
  });

  it('enables the buttons when there is something to undo or redo', () => {
    statesChanged({ isEditing: true, hasSomethingToUndo: true, hasSomethingToRedo: false });
    expect(component.canUndo).toBe(true);
    expect(component.canRedo).toBe(false);

    statesChanged({ isEditing: true, hasSomethingToUndo: false, hasSomethingToRedo: true });
    expect(component.canUndo).toBe(false);
    expect(component.canRedo).toBe(true);
  });

  it('keeps the buttons enabled outside editing mode, pdf.js undoes there too', () => {
    statesChanged({ isEditing: true, hasSomethingToUndo: true, hasSomethingToRedo: true });
    statesChanged({ isEditing: false });
    expect(component.canUndo).toBe(true);
    expect(component.canRedo).toBe(true);

    statesChanged({ isEditing: false, hasSomethingToUndo: true, hasSomethingToRedo: false });
    expect(component.canUndo).toBe(true);
    expect(component.canRedo).toBe(false);
  });

  it('resets the buttons when a new document is loaded', () => {
    statesChanged({ isEditing: true, hasSomethingToUndo: true, hasSomethingToRedo: true });
    eventBus.dispatch('documentloaded', {});
    jest.advanceTimersByTime(1);
    expect(component.canUndo).toBe(false);
    expect(component.canRedo).toBe(false);
  });

  it('sends pdf.js\'s editingaction event', () => {
    const dispatch = jest.spyOn(eventBus, 'dispatch');
    component.onUndo();
    expect(dispatch).toHaveBeenCalledWith('editingaction', expect.objectContaining({ name: 'undo' }));
    component.onRedo();
    expect(dispatch).toHaveBeenCalledWith('editingaction', expect.objectContaining({ name: 'redo' }));
  });

  it('stops listening after ngOnDestroy', () => {
    component.ngOnDestroy();
    statesChanged({ isEditing: true, hasSomethingToUndo: true, hasSomethingToRedo: true });
    expect(component.canUndo).toBe(false);
  });
});
