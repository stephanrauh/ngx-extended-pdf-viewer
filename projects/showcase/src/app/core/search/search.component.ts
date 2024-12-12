import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchContent } from './search-content.type';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { SearchService } from './search.service';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'pvs-search',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  template: `
    <input
      [formControl]="searchControl"
      type="text"
      placeholder="Search documentation..."
      class="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-variant-light focus:border-transparent"
    />

    @if (results | async; as results) {
      @if (results.length > 0) {
        <div class="absolute w-full mt-1 overflow-y-auto bg-white border rounded-md shadow-lg max-h-96 z-50">
          @for (result of results; track result.route) {
            <a [routerLink]="result.route" class="block px-4 py-2 hover:bg-gray-50 border-b last:border-b-0 no-underline" (click)="clearSearch()">
              <h4 class="text-sm font-medium text-gray-900">{{ result.title }}</h4>
              @if (result.snippet) {
                <p [innerHTML]="result.snippet" class="mt-1 text-xs text-gray-600"></p>
              }
            </a>
          }
        </div>
      }
    }
  `,
  host: {
    class: 'relative w-72',
  },
})
export class SearchComponent {
  private searchService = inject(SearchService);

  searchControl = new FormControl('');

  results: Observable<SearchContent[]> = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => this.searchService.search(query || '')),
    takeUntilDestroyed(),
  );

  clearSearch() {
    this.searchControl.setValue('');
  }
}
