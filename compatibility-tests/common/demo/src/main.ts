import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';

// The local `npm run build:lib` doesn't emit `viewer-*.min.mjs`; only the
// npm-published library does. The default suffix is '.min', which makes
// pdf.js request `viewer-*.min.mjs` and 404. Clearing the suffix forces
// the unminified bundle that this build actually produced.
// `_internalFilenameSuffix` is intentionally underscored because consumers
// should normally control this via the `[minifiedJSLibraries]` input.
(pdfDefaultOptions as unknown as { _internalFilenameSuffix: string })._internalFilenameSuffix = '';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(APP_ROUTES)],
}).catch((err) => console.error(err));
