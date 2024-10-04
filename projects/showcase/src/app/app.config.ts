import { ApplicationConfig } from '@angular/core';
import { provideRouter, TitleStrategy, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ContentPageTitleStrategyService } from './core/content-page/services/content-page-title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    {
      provide: TitleStrategy,
      useClass: ContentPageTitleStrategyService,
    },
  ],
};
