import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { PdfZoomDropdownComponent } from './pdf-zoom-dropdown.component';

@Pipe({ name: 'responsiveCSSClass', standalone: false })
class MockResponsiveCSSClassPipe implements PipeTransform {
  transform(value: any): any {
    return typeof value === 'string' ? value : 'always-visible';
  }
}

describe('PdfZoomDropdownComponent', () => {
  let component: PdfZoomDropdownComponent;
  let fixture: ComponentFixture<PdfZoomDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PdfZoomDropdownComponent,
        MockResponsiveCSSClassPipe
      ]
    });

    fixture = TestBed.createComponent(PdfZoomDropdownComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('disableZoomDropdown input (#2818)', () => {
    it('should default to false', () => {
      expect(component.disableZoomDropdown()).toBe(false);
    });

    it('should accept true', () => {
      fixture.componentRef.setInput('disableZoomDropdown', true);
      TestBed.flushEffects();
      expect(component.disableZoomDropdown()).toBe(true);
    });

    it('should render select element as disabled when disableZoomDropdown is true', () => {
      fixture.componentRef.setInput('disableZoomDropdown', true);
      fixture.detectChanges();

      const selectEl = fixture.nativeElement.querySelector('#scaleSelect') as HTMLSelectElement;
      expect(selectEl.disabled).toBe(true);
    });

    it('should render select element as enabled when disableZoomDropdown is false', () => {
      fixture.componentRef.setInput('disableZoomDropdown', false);
      fixture.detectChanges();

      const selectEl = fixture.nativeElement.querySelector('#scaleSelect') as HTMLSelectElement;
      expect(selectEl.disabled).toBe(false);
    });
  });

  describe('showZoomDropdown input', () => {
    it('should default to true', () => {
      expect(component.showZoomDropdown()).toBe(true);
    });
  });

  describe('zoomLevels input and _zoomLevels computed', () => {
    it('should default to empty array', () => {
      expect(component.zoomLevels()).toEqual([]);
      expect(component._zoomLevels()).toEqual([]);
    });

    it('should convert string values like "auto" to ZoomLevel objects', () => {
      fixture.componentRef.setInput('zoomLevels', ['auto']);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels).toHaveLength(1);
      expect(levels[0]).toEqual({
        id: 'autoOption',
        value: 'auto',
        dataL10nId: 'pdfjs-page-scale-auto',
        dataL10nArgs: undefined,
        displayValue: 'auto',
      });
    });

    it('should convert "page-actual" to ZoomLevel with camelCase id', () => {
      fixture.componentRef.setInput('zoomLevels', ['page-actual']);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0]).toEqual({
        id: 'pageActualOption',
        value: 'page-actual',
        dataL10nId: 'pdfjs-page-scale-actual',
        dataL10nArgs: undefined,
        displayValue: 'page-actual',
      });
    });

    it('should convert "page-fit" to ZoomLevel', () => {
      fixture.componentRef.setInput('zoomLevels', ['page-fit']);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0]).toEqual({
        id: 'pageFitOption',
        value: 'page-fit',
        dataL10nId: 'pdfjs-page-scale-fit',
        dataL10nArgs: undefined,
        displayValue: 'page-fit',
      });
    });

    it('should convert "page-width" to ZoomLevel', () => {
      fixture.componentRef.setInput('zoomLevels', ['page-width']);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0]).toEqual({
        id: 'pageWidthOption',
        value: 'page-width',
        dataL10nId: 'pdfjs-page-scale-width',
        dataL10nArgs: undefined,
        displayValue: 'page-width',
      });
    });

    it('should convert numeric values to percentage-based ZoomLevel objects', () => {
      fixture.componentRef.setInput('zoomLevels', [0.5]);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0]).toEqual({
        id: 'scale_50',
        value: '0.5',
        dataL10nId: 'pdfjs-page-scale-percent',
        dataL10nArgs: JSON.stringify({ scale: 50 }),
        displayValue: '',
      });
    });

    it('should convert 1 to 100% ZoomLevel', () => {
      fixture.componentRef.setInput('zoomLevels', [1]);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0]).toEqual({
        id: 'scale_100',
        value: '1',
        dataL10nId: 'pdfjs-page-scale-percent',
        dataL10nArgs: JSON.stringify({ scale: 100 }),
        displayValue: '',
      });
    });

    it('should convert 1.25 to 125% ZoomLevel', () => {
      fixture.componentRef.setInput('zoomLevels', [1.25]);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0]).toEqual({
        id: 'scale_125',
        value: '1.25',
        dataL10nId: 'pdfjs-page-scale-percent',
        dataL10nArgs: JSON.stringify({ scale: 125 }),
        displayValue: '',
      });
    });

    it('should convert percentage strings like "50%" to numeric ZoomLevel', () => {
      fixture.componentRef.setInput('zoomLevels', ['50%']);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0]).toEqual({
        id: 'scale_50',
        value: '0.5',
        dataL10nId: 'pdfjs-page-scale-percent',
        dataL10nArgs: JSON.stringify({ scale: 50 }),
        displayValue: '',
      });
    });

    it('should convert "150%" to 1.5 numeric ZoomLevel', () => {
      fixture.componentRef.setInput('zoomLevels', ['150%']);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0]).toEqual({
        id: 'scale_150',
        value: '1.5',
        dataL10nId: 'pdfjs-page-scale-percent',
        dataL10nArgs: JSON.stringify({ scale: 150 }),
        displayValue: '',
      });
    });

    it('should handle mixed string and numeric zoom levels', () => {
      fixture.componentRef.setInput('zoomLevels', ['auto', 'page-fit', 0.5, 0.75, 1, 1.5, 2]);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels).toHaveLength(7);
      // string entries
      expect(levels[0].id).toBe('autoOption');
      expect(levels[1].id).toBe('pageFitOption');
      // numeric entries
      expect(levels[2].id).toBe('scale_50');
      expect(levels[3].id).toBe('scale_75');
      expect(levels[4].id).toBe('scale_100');
      expect(levels[5].id).toBe('scale_150');
      expect(levels[6].id).toBe('scale_200');
    });

    it('should round percentage values for numeric zoom levels', () => {
      fixture.componentRef.setInput('zoomLevels', [0.333]);
      TestBed.flushEffects();
      const levels = component._zoomLevels();
      expect(levels[0].id).toBe('scale_33');
      expect(levels[0].dataL10nArgs).toBe(JSON.stringify({ scale: 33 }));
    });
  });
});
