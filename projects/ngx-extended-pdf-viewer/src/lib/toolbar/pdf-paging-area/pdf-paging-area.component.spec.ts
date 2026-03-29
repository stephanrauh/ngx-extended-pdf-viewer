import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PdfPagingAreaComponent } from './pdf-paging-area.component';

@Pipe({ name: 'responsiveCSSClass', standalone: false })
class MockResponsiveCSSClassPipe implements PipeTransform {
  transform(value: any): any {
    return typeof value === 'string' ? value : 'always-visible';
  }
}

// Mock child components that PdfPagingAreaComponent uses in its template
@Component({ selector: 'pdf-first-page', template: '', inputs: ['show', 'disable'], standalone: false })
class MockPdfFirstPageComponent { disable: any; }

@Component({ selector: 'pdf-previous-page', template: '', inputs: ['show', 'disable'], standalone: false })
class MockPdfPreviousPageComponent { disable: any; }

@Component({ selector: 'pdf-next-page', template: '', inputs: ['show', 'disable'], standalone: false })
class MockPdfNextPageComponent { disable: any; }

@Component({ selector: 'pdf-last-page', template: '', inputs: ['show', 'disable'], standalone: false })
class MockPdfLastPageComponent { disable: any; }

@Component({ selector: 'pdf-page-number', template: '', inputs: ['showPageNumber', 'disablePageNumber', 'showPageLabel'], standalone: false })
class MockPdfPageNumberComponent { disablePageNumber: any; }

describe('PdfPagingAreaComponent', () => {
  let component: PdfPagingAreaComponent;
  let fixture: ComponentFixture<PdfPagingAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PdfPagingAreaComponent,
        MockResponsiveCSSClassPipe,
        MockPdfFirstPageComponent,
        MockPdfPreviousPageComponent,
        MockPdfNextPageComponent,
        MockPdfLastPageComponent,
        MockPdfPageNumberComponent
      ]
    });

    fixture = TestBed.createComponent(PdfPagingAreaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('disable inputs (#2818)', () => {
    it('should default all disable inputs to false', () => {
      expect(component.disablePagingButtons()).toBe(false);
      expect(component.disableFirstAndLastPageButtons()).toBe(false);
      expect(component.disablePreviousAndNextPageButtons()).toBe(false);
      expect(component.disablePageNumber()).toBe(false);
    });

    it('should pass disablePagingButtons OR disableFirstAndLastPageButtons to first-page and last-page', () => {
      // Template: [disable]="disablePagingButtons() || disableFirstAndLastPageButtons()"
      fixture.componentRef.setInput('disablePagingButtons', true);
      fixture.componentRef.setInput('disableFirstAndLastPageButtons', false);
      fixture.detectChanges();

      const firstPage = fixture.debugElement.query(By.css('pdf-first-page'))?.componentInstance as MockPdfFirstPageComponent;
      const lastPage = fixture.debugElement.query(By.css('pdf-last-page'))?.componentInstance as MockPdfLastPageComponent;
      expect(firstPage.disable).toBe(true);
      expect(lastPage.disable).toBe(true);
    });

    it('should pass disableFirstAndLastPageButtons to first-page and last-page when disablePagingButtons is false', () => {
      fixture.componentRef.setInput('disablePagingButtons', false);
      fixture.componentRef.setInput('disableFirstAndLastPageButtons', true);
      fixture.detectChanges();

      const firstPage = fixture.debugElement.query(By.css('pdf-first-page'))?.componentInstance as MockPdfFirstPageComponent;
      const lastPage = fixture.debugElement.query(By.css('pdf-last-page'))?.componentInstance as MockPdfLastPageComponent;
      expect(firstPage.disable).toBe(true);
      expect(lastPage.disable).toBe(true);
    });

    it('should not disable first/last when both disablePagingButtons and disableFirstAndLastPageButtons are false', () => {
      fixture.componentRef.setInput('disablePagingButtons', false);
      fixture.componentRef.setInput('disableFirstAndLastPageButtons', false);
      fixture.detectChanges();

      const firstPage = fixture.debugElement.query(By.css('pdf-first-page'))?.componentInstance as MockPdfFirstPageComponent;
      const lastPage = fixture.debugElement.query(By.css('pdf-last-page'))?.componentInstance as MockPdfLastPageComponent;
      expect(firstPage.disable).toBe(false);
      expect(lastPage.disable).toBe(false);
    });

    it('should pass disablePagingButtons OR disablePreviousAndNextPageButtons to prev/next', () => {
      fixture.componentRef.setInput('disablePagingButtons', false);
      fixture.componentRef.setInput('disablePreviousAndNextPageButtons', true);
      fixture.detectChanges();

      const prevPage = fixture.debugElement.query(By.css('pdf-previous-page'))?.componentInstance as MockPdfPreviousPageComponent;
      const nextPage = fixture.debugElement.query(By.css('pdf-next-page'))?.componentInstance as MockPdfNextPageComponent;
      expect(prevPage.disable).toBe(true);
      expect(nextPage.disable).toBe(true);
    });

    it('should disable all page buttons when disablePagingButtons is true', () => {
      fixture.componentRef.setInput('disablePagingButtons', true);
      fixture.detectChanges();

      const firstPage = fixture.debugElement.query(By.css('pdf-first-page'))?.componentInstance as MockPdfFirstPageComponent;
      const lastPage = fixture.debugElement.query(By.css('pdf-last-page'))?.componentInstance as MockPdfLastPageComponent;
      const prevPage = fixture.debugElement.query(By.css('pdf-previous-page'))?.componentInstance as MockPdfPreviousPageComponent;
      const nextPage = fixture.debugElement.query(By.css('pdf-next-page'))?.componentInstance as MockPdfNextPageComponent;
      expect(firstPage.disable).toBe(true);
      expect(lastPage.disable).toBe(true);
      expect(prevPage.disable).toBe(true);
      expect(nextPage.disable).toBe(true);
    });

    it('should pass disablePageNumber to page-number component', () => {
      fixture.componentRef.setInput('disablePageNumber', true);
      fixture.detectChanges();

      const pageNumber = fixture.debugElement.query(By.css('pdf-page-number'))?.componentInstance as MockPdfPageNumberComponent;
      expect(pageNumber.disablePageNumber).toBe(true);
    });

    it('should not disable page-number when disablePageNumber is false', () => {
      fixture.componentRef.setInput('disablePageNumber', false);
      fixture.detectChanges();

      const pageNumber = fixture.debugElement.query(By.css('pdf-page-number'))?.componentInstance as MockPdfPageNumberComponent;
      expect(pageNumber.disablePageNumber).toBe(false);
    });
  });
});
