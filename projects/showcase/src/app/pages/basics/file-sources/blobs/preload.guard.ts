import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BlobService } from './blob.service';
import { isBrowser } from '../../../../shared/helper/utilities';

export const preloadGuard = () => {
  if (!isBrowser()) {
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
