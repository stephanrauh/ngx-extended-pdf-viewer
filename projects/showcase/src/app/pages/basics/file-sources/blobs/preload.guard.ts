import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BlobService } from './blob.service';
import { IS_BROWSER } from '../../../../shared/helper/is-browser-token';

export const preloadGuard = () => {
  const isBrowser = inject(IS_BROWSER);

  if (!isBrowser) {
    return false;
  }
  const http = inject(HttpClient);
  const blobService = inject(BlobService);
  return http.get('/assets/pdfs/pdf-sample.pdf', { responseType: 'blob' }).pipe(
    tap(() => console.log('Starting to preload the PDF file')),
    tap((blob) => (blobService.src = blob)),
    tap(() => console.log('PDF file preloaded', blobService.src)),
    map(() => true),
  );
};
