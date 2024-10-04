import { Component, inject, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'pvs-content-page',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './content-page.component.html',
})
export class ContentPageComponent {
  private http = inject(HttpClient);

  public pageTitle = input.required<string>();
  public contentSrc = input.required<string>();

  public content = toObservable(this.contentSrc).pipe(
    switchMap((contentSrc) => {
      return this.loadMarkdownFile(contentSrc);
    }),
  );

  loadMarkdownFile(markdownUrl: string | undefined) {
    if (!markdownUrl) {
      console.error('Markdown URL is not provided. Have you tried turning it off and on again?');
      return of('No content');
    }

    return this.http.get(markdownUrl, { responseType: 'text' });
  }
}
