import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

/** Appended to every page title. */
const TITLE_SUFFIX = 'Sharif Charity Foundation';

/**
 * Sets the document title and description for the active page, keeping both in
 * step with the chosen language.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translate = inject(TranslateService);

  /**
   * Call from a page component's `ngOnInit`, passing the component's own
   * DestroyRef so the language subscription ends when the page is left.
   */
  apply(titleKey: string, descriptionKey: string, destroyRef: DestroyRef): void {
    this.translate
      .stream([titleKey, descriptionKey])
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((values: Record<string, string>) => {
        const pageTitle = values[titleKey];
        const description = values[descriptionKey];

        this.title.setTitle(
          pageTitle === TITLE_SUFFIX ? pageTitle : `${pageTitle} | ${TITLE_SUFFIX}`
        );
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: pageTitle });
        this.meta.updateTag({ property: 'og:description', content: description });
      });
  }
}
