import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {
  HttpBackend,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { routes } from './app.routes';
import { languageInterceptor } from './core/interceptors/language.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      // withDebugTracing(),
    ),
    provideHttpClient(withInterceptors([languageInterceptor])),
    provideAnimationsAsync(),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
      }),
    ]), provideAnimationsAsync(),
  ],
};
export function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(httpBackend, [
    './assets/i18n/common/',
    './assets/i18n/header/',
    './assets/i18n/forms/labels/',
  ]);
}
