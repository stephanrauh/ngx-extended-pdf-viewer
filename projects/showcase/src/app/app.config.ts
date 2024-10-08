import { ApplicationConfig } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ContentPageTitleStrategyService } from './shared/components/content-page/services/content-page-title-strategy.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    {
      provide: TitleStrategy,
      useClass: ContentPageTitleStrategyService,
    },
    provideHttpClient(withFetch()),
    provideMarkdown(),
  ],
};
