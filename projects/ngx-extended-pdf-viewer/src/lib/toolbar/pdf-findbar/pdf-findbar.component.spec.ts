import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfFindbarComponent } from './pdf-findbar.component';

describe('PdfFindbarComponent', () => {
  let component: PdfFindbarComponent;
  let fixture: ComponentFixture<PdfFindbarComponent>;

  const isHidden = (selector: string): boolean => {
    const element = fixture.nativeElement.querySelector(selector) as HTMLElement | null;
    if (!element) {
      throw new Error(`the findbar template doesn't contain ${selector}`);
    }
    return element.classList.contains('hidden');
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfFindbarComponent],
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfFindbarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('mobileFriendlyZoomScale', 1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(PdfFindbarComponent);
  });

  describe('showFind* inputs', () => {
    const options: Array<{ input: string; selector: string }> = [
      { input: 'showFindHighlightAll', selector: 'pdf-find-highlight-all' },
      { input: 'showFindMatchCase', selector: 'pdf-find-match-case' },
      { input: 'showFindMatchDiacritics', selector: 'pdf-match-diacritics' },
      { input: 'showFindEntireWord', selector: 'pdf-find-entire-word' },
      { input: 'showFindMultiple', selector: 'pdf-find-multiple' },
      { input: 'showFindRegexp', selector: 'pdf-find-regexp' },
      { input: 'showFindResultsCount', selector: 'pdf-find-results-count' },
      { input: 'showFindMessages', selector: 'pdf-findbar-message-container' },
    ];

    options.forEach(({ input, selector }) => {
      it(`should hide ${selector} when ${input} is false`, () => {
        fixture.componentRef.setInput(input, false);
        fixture.detectChanges();
        expect(isHidden(selector)).toBe(true);
      });

      it(`should show ${selector} again when ${input} flips back to true`, () => {
        fixture.componentRef.setInput(input, false);
        fixture.detectChanges();
        fixture.componentRef.setInput(input, true);
        fixture.detectChanges();
        expect(isHidden(selector)).toBe(false);
      });
    });

    it('should hide the third option group when neither multiple nor regexp is shown', () => {
      fixture.componentRef.setInput('showFindMultiple', false);
      fixture.componentRef.setInput('showFindRegexp', false);
      fixture.detectChanges();
      expect(isHidden('#findbarOptionsThreeContainer')).toBe(true);
    });

    it('should keep the third option group visible if one of its options is shown', () => {
      fixture.componentRef.setInput('showFindMultiple', false);
      fixture.componentRef.setInput('showFindRegexp', true);
      fixture.detectChanges();
      expect(isHidden('#findbarOptionsThreeContainer')).toBe(false);
    });
  });
});
