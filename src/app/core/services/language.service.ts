import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppLanguage, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '../i18n/i18n.config';

const STORAGE_KEY = 'scf.language';

/**
 * Single entry point for reading and changing the active language.
 * Components use this rather than TranslateService directly so document
 * direction and persistence stay in one place.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly available = SUPPORTED_LANGUAGES;
  readonly current = signal<AppLanguage>(this.resolve(DEFAULT_LANGUAGE));

  /** Called once at startup to apply the stored or default language. */
  init(): void {
    this.use(this.stored() ?? DEFAULT_LANGUAGE);
  }

  use(code: string): void {
    const language = this.resolve(code);
    this.translate.use(language.code);
    this.current.set(language);
    this.document.documentElement.lang = language.code;
    this.document.documentElement.dir = language.dir;
    this.persist(language.code);
  }

  private resolve(code: string): AppLanguage {
    return SUPPORTED_LANGUAGES.find((language) => language.code === code) ?? SUPPORTED_LANGUAGES[0];
  }

  private stored(): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(STORAGE_KEY) ?? null;
    } catch {
      return null;
    }
  }

  private persist(code: string): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Storage unavailable (private mode); the language still applies for this session.
    }
  }
}
