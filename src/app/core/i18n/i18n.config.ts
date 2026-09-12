import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MissingTranslationHandler,
  TranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HumanisedMissingTranslationHandler } from './missing-translation.handler';

/**
 * A language the site can be rendered in.
 * Adding Arabic, Turkish or Hausa later means adding an entry here plus the
 * matching `src/assets/i18n/<code>.json` file — nothing else needs to change.
 */
export interface AppLanguage {
  /** ISO code, also the translation file name. */
  code: string;
  /** Name shown in the language switcher, written in that language. */
  label: string;
  /** Text direction applied to the <html> element when the language is active. */
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: readonly AppLanguage[] = [
  { code: 'en', label: 'English', dir: 'ltr' },
  // { code: 'ar', label: 'العربية', dir: 'rtl' },
  // { code: 'tr', label: 'Türkçe', dir: 'ltr' },
  // { code: 'ha', label: 'Hausa', dir: 'ltr' },
];

export const DEFAULT_LANGUAGE = 'en';

export const TRANSLATIONS_PREFIX = './assets/i18n/';
export const TRANSLATIONS_SUFFIX = '.json';

export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, TRANSLATIONS_PREFIX, TRANSLATIONS_SUFFIX);
}

/** Wires ngx-translate with the HTTP loader and the default language. */
export function provideI18n(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideTranslateService({
      defaultLanguage: DEFAULT_LANGUAGE,
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: HumanisedMissingTranslationHandler,
      },
    }),
  ]);
}
