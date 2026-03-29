import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PdfZoomToolbarComponent } from './pdf-zoom-toolbar.component';

@Pipe({ name: 'responsiveCSSClass', standalone: false })
class MockResponsiveCSSClassPipe implements PipeTransform {
  transform(value: any): any {
    return typeof value === 'string' ? value : 'always-visible';
  }
}

// Mock child components
@Component({ selector: 'pdf-zoom-out', template: '', inputs: ['showZoomButtons', 'disable'], standalone: false })
class MockPdfZoomOutComponent { disable: any; }

@Component({ selector: 'pdf-zoom-in', template: '', inputs: ['showZoomButtons', 'disable'], standalone: false })
class MockPdfZoomInComponent { disable: any; }

@Component({ selector: 'pdf-zoom-dropdown', template: '', inputs: ['zoomLevels', 'showZoomDropdown', 'disableZoomDropdown'], standalone: false })
class MockPdfZoomDropdownComponent { disableZoomDropdown: any; }

describe('PdfZoomToolbarComponent', () => {
  let component: PdfZoomToolbarComponent;
  let fixture: ComponentFixture<PdfZoomToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PdfZoomToolbarComponent,
        MockResponsiveCSSClassPipe,
        MockPdfZoomOutComponent,
        MockPdfZoomInComponent,
        MockPdfZoomDropdownComponent
      ]
    });

    fixture = TestBed.createComponent(PdfZoomToolbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('disable inputs (#2818)', () => {
    it('should default disableZoomButtons to false', () => {
      expect(component.disableZoomButtons()).toBe(false);
    });

    it('should default disableZoomDropdown to false', () => {
      expect(component.disableZoomDropdown()).toBe(false);
    });

    it('should pass disableZoomButtons to zoom-in and zoom-out', () => {
      fixture.componentRef.setInput('disableZoomButtons', true);
      fixture.detectChanges();

      const zoomIn = fixture.debugElement.query(By.css('pdf-zoom-in'))?.componentInstance as MockPdfZoomInComponent;
      const zoomOut = fixture.debugElement.query(By.css('pdf-zoom-out'))?.componentInstance as MockPdfZoomOutComponent;
      expect(zoomIn.disable).toBe(true);
      expect(zoomOut.disable).toBe(true);
    });

    it('should not disable zoom buttons when disableZoomButtons is false', () => {
      fixture.componentRef.setInput('disableZoomButtons', false);
      fixture.detectChanges();

      const zoomIn = fixture.debugElement.query(By.css('pdf-zoom-in'))?.componentInstance as MockPdfZoomInComponent;
      const zoomOut = fixture.debugElement.query(By.css('pdf-zoom-out'))?.componentInstance as MockPdfZoomOutComponent;
      expect(zoomIn.disable).toBe(false);
      expect(zoomOut.disable).toBe(false);
    });

    it('should pass disableZoomDropdown to zoom-dropdown', () => {
      fixture.componentRef.setInput('disableZoomDropdown', true);
      fixture.detectChanges();

      const dropdown = fixture.debugElement.query(By.css('pdf-zoom-dropdown'))?.componentInstance as MockPdfZoomDropdownComponent;
      expect(dropdown.disableZoomDropdown).toBe(true);
    });

    it('should not disable zoom dropdown when disableZoomDropdown is false', () => {
      fixture.componentRef.setInput('disableZoomDropdown', false);
      fixture.detectChanges();

      const dropdown = fixture.debugElement.query(By.css('pdf-zoom-dropdown'))?.componentInstance as MockPdfZoomDropdownComponent;
      expect(dropdown.disableZoomDropdown).toBe(false);
    });

    it('should independently control zoom buttons and zoom dropdown', () => {
      fixture.componentRef.setInput('disableZoomButtons', true);
      fixture.componentRef.setInput('disableZoomDropdown', false);
      fixture.detectChanges();

      const zoomIn = fixture.debugElement.query(By.css('pdf-zoom-in'))?.componentInstance as MockPdfZoomInComponent;
      const dropdown = fixture.debugElement.query(By.css('pdf-zoom-dropdown'))?.componentInstance as MockPdfZoomDropdownComponent;
      expect(zoomIn.disable).toBe(true);
      expect(dropdown.disableZoomDropdown).toBe(false);
    });
  });
});
