import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfErrorMessageComponent } from './pdf-error-message.component';

describe('PdfErrorMessageComponent', () => {
  let component: PdfErrorMessageComponent;
  let fixture: ComponentFixture<PdfErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function setError(error: Error | null): void {
    fixture.componentRef.setInput('error', error);
    fixture.detectChanges();
  }

  function setMessage(message: string | undefined): void {
    fixture.componentRef.setInput('message', message);
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stay hidden without a loading error', () => {
    const wrapper = fixture.nativeElement.querySelector('#errorWrapper') as HTMLDivElement;

    expect(wrapper.hidden).toBe(true);
  });

  it('should show the empty message when a loading error is present', () => {
    setError(new Error('The file could not be downloaded.'));

    const wrapper = fixture.nativeElement.querySelector('#errorWrapper') as HTMLDivElement;
    const message = fixture.nativeElement.querySelector('#errorMessage') as HTMLElement;
    const details = fixture.nativeElement.querySelector('#errorMoreInfo') as HTMLTextAreaElement;

    expect(wrapper.hidden).toBe(false);
    expect(message.textContent?.trim()).toBe('An error occurred while loading the PDF.');
    expect(details.hidden).toBe(true);
  });

  it('should prefer a custom message when one is provided', () => {
    setMessage('Die Datei konnte nicht geladen werden.');
    setError(new Error('The file could not be downloaded.'));

    const message = fixture.nativeElement.querySelector('#errorMessage') as HTMLElement;

    expect(message.textContent?.trim()).toBe('Die Datei konnte nicht geladen werden.');
    expect(message.hasAttribute('data-l10n-id')).toBe(false);
  });

  it('should toggle technical details on demand', () => {
    setError(new Error('The server returned 404.'));

    const showMoreButton = fixture.nativeElement.querySelector('#errorShowMore') as HTMLButtonElement;
    showMoreButton.click();
    fixture.detectChanges();

    const details = fixture.nativeElement.querySelector('#errorMoreInfo') as HTMLTextAreaElement;
    const showLessButton = fixture.nativeElement.querySelector('#errorShowLess') as HTMLButtonElement;

    expect(details.hidden).toBe(false);
    expect(details.value).toContain('The server returned 404.');
    expect(showLessButton.hidden).toBe(false);
  });

  it('should reset dismissal and expanded details when a new error arrives', () => {
    setError(new Error('First error'));

    const showMoreButton = fixture.nativeElement.querySelector('#errorShowMore') as HTMLButtonElement;
    showMoreButton.click();
    fixture.detectChanges();

    const closeButton = fixture.nativeElement.querySelector('#errorClose') as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    let wrapper = fixture.nativeElement.querySelector('#errorWrapper') as HTMLDivElement;
    let details = fixture.nativeElement.querySelector('#errorMoreInfo') as HTMLTextAreaElement;
    expect(wrapper.hidden).toBe(true);
    expect(details.hidden).toBe(false);

    setError(new Error('Second error'));

    wrapper = fixture.nativeElement.querySelector('#errorWrapper') as HTMLDivElement;
    details = fixture.nativeElement.querySelector('#errorMoreInfo') as HTMLTextAreaElement;

    expect(wrapper.hidden).toBe(false);
    expect(details.hidden).toBe(true);
    expect(details.value).toContain('Second error');
  });
});