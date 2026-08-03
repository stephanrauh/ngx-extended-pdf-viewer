import { Component, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'pdf-error-message',
  templateUrl: './pdf-error-message.component.html',
  standalone: false,
})
export class PdfErrorMessageComponent {
  /** Opt-in switch. pdf.js itself shows nothing when a file fails to load. */
  public show = input(false);
  public error = input<Error | null>(null);
  public message = input<string | undefined>(undefined);

  protected readonly detailsExpanded = signal(false);
  protected readonly dismissed = signal(false);
  protected readonly visible = computed(() => this.show() && !!this.error() && !this.dismissed());
  protected readonly customMessage = computed(() => this.message()?.trim() || '');
  protected readonly hasDetails = computed(() => this.errorDetails().length > 0);
  protected readonly errorDetails = computed(() => {
    const currentError = this.error();
    if (!currentError) {
      return '';
    }

    return [currentError.name, currentError.message, currentError.stack].filter((part, index, parts) => !!part && parts.indexOf(part) === index).join('\n\n');
  });

  constructor() {
    // A new error re-opens the card and collapses the details again.
    effect(() => {
      this.error();
      this.dismissed.set(false);
      this.detailsExpanded.set(false);
    });
  }

  protected expandDetails(): void {
    this.detailsExpanded.set(true);
  }

  protected collapseDetails(): void {
    this.detailsExpanded.set(false);
  }

  protected dismiss(): void {
    this.dismissed.set(true);
  }
}
