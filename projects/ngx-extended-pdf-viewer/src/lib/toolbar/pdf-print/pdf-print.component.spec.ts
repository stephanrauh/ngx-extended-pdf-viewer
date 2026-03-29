import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { PdfPrintComponent } from './pdf-print.component';

@Pipe({ name: 'responsiveCSSClass', standalone: false })
class MockResponsiveCSSClassPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Component({
    selector: 'pdf-shy-button',
    template: '<ng-content></ng-content>',
    inputs: ['title', 'primaryToolbarId', 'cssClass', 'l10nId', 'l10nLabel', 'order', 'action', 'toggled', 'closeOnClick', 'image', 'disabled'],
    standalone: false
})
class MockPdfShyButtonComponent {
  disabled: any;
}

describe('PdfPrintComponent', () => {
  let component: PdfPrintComponent;
  let fixture: ComponentFixture<PdfPrintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PdfPrintComponent,
        MockResponsiveCSSClassPipe,
        MockPdfShyButtonComponent
      ]
    });

    fixture = TestBed.createComponent(PdfPrintComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('disable input (#2818)', () => {
    it('should default disable to false', () => {
      expect(component.disable()).toBe(false);
    });

    it('should accept disable input set to true', () => {
      fixture.componentRef.setInput('disable', true);
      TestBed.flushEffects();
      expect(component.disable()).toBe(true);
    });

    it('should pass disabled=true to pdf-shy-button when disable is true', () => {
      fixture.componentRef.setInput('disable', true);
      fixture.detectChanges();

      const shyButton = fixture.debugElement.children[0].componentInstance as MockPdfShyButtonComponent;
      expect(shyButton.disabled).toBe(true);
    });

    it('should pass disabled=false to pdf-shy-button when disable is false', () => {
      fixture.componentRef.setInput('disable', false);
      fixture.detectChanges();

      const shyButton = fixture.debugElement.children[0].componentInstance as MockPdfShyButtonComponent;
      expect(shyButton.disabled).toBe(false);
    });
  });

  describe('showPrintButton input', () => {
    it('should default to true', () => {
      expect(component.showPrintButton()).toBe(true);
    });

    it('should accept responsive visibility values', () => {
      fixture.componentRef.setInput('showPrintButton', 'xxl');
      TestBed.flushEffects();
      expect(component.showPrintButton()).toBe('xxl');
    });
  });
});
