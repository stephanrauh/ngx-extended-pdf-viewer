import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizedHtml',
  standalone: false
})
export class SanitizedHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | undefined): SafeHtml | undefined {
    if (!value) return undefined;
    // The HTML is already validated in imageHtml computed signal (only allowed SVG tags)
    // We just need to bypass Angular's automatic sanitization
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
