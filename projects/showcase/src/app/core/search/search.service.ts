import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { SearchContent } from './search-content.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);
  private searchIndex = new BehaviorSubject<SearchContent[] | null>(null);
  private searchResults = new BehaviorSubject<SearchContent[]>([]);

  search(query: string): Observable<SearchContent[]> {
    if (!query?.trim()) {
      return of([]);
    }

    return this.loadSearchIndex().pipe(
      map((index) => {
        const searchTerm = query.toLowerCase();
        return index.filter((item) => {
          const matchesTitle = item.title.toLowerCase().includes(searchTerm);
          const matchesContent = item.content.toLowerCase().includes(searchTerm);

          if (matchesContent) {
            const index = item.content.toLowerCase().indexOf(searchTerm);
            const start = Math.max(0, index - 60);
            const end = Math.min(item.content.length, index + searchTerm.length + 60);
            item.snippet = '...' + item.content.slice(start, end) + '...';
          }

          return matchesTitle || matchesContent;
        });
      }),
      tap((results) => this.searchResults.next(results)),
    );
  }

  private loadSearchIndex(): Observable<SearchContent[]> {
    // If we already have the index, return it
    if (this.searchIndex.value) {
      return of(this.searchIndex.value);
    }

    // Otherwise load it
    return this.http.get<SearchContent[]>('/assets/search-index.json').pipe(tap((index) => this.searchIndex.next(index)));
  }
}
