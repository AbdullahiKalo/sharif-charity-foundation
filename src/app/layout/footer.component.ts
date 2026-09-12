import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/** A link rendered in one of the footer columns. */
interface FooterLink {
  /** Translation key for the visible label. */
  readonly key: string;
  /** Router path the link points at. */
  readonly path: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <footer class="w-full bg-primary text-white">
      <div class="mx-auto max-w-7xl px-4 py-12 md:py-16 sm:px-6 lg:px-8 lg:py-12 md:py-16">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
          <div>
            <p class="font-serif text-xl font-bold">{{ 'brand.name' | translate }}</p>
            <p class="mt-1 text-sm text-gold-on-dark">{{ 'brand.tagline' | translate }}</p>
            <p class="mt-4 text-sm leading-relaxed text-white/80">
              {{ 'footer.description' | translate }}
            </p>
          </div>

          <div>
            <h2 class="font-serif text-base font-bold">{{ 'footer.quickLinks' | translate }}</h2>
            <ul class="mt-4 flex flex-col gap-2.5">
              @for (link of quickLinks; track link.path) {
                <li>
                  <a
                    [routerLink]="link.path"
                    class="text-sm text-white/80 transition-colors hover:text-gold-on-dark"
                  >
                    {{ link.key | translate }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div>
            <h2 class="font-serif text-base font-bold">{{ 'footer.programs' | translate }}</h2>
            <ul class="mt-4 flex flex-col gap-2.5">
              @for (link of programLinks; track link.path) {
                <li>
                  <a
                    [routerLink]="link.path"
                    class="text-sm text-white/80 transition-colors hover:text-gold-on-dark"
                  >
                    {{ link.key | translate }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div>
            <h2 class="font-serif text-base font-bold">{{ 'footer.contact' | translate }}</h2>
            <ul class="mt-4 flex flex-col gap-2.5 text-sm text-white/80">
              <li>{{ 'footer.location' | translate }}</li>
              <li>
                <span>{{ 'footer.email' | translate }}:</span>
                <a
                  href="mailto:muhammadsharifhamza&#64;gmail.com"
                  class="break-all transition-colors hover:text-gold-on-dark"
                >
                  muhammadsharifhamza&#64;gmail.com
                </a>
              </li>
              <li>
                <span>{{ 'footer.whatsapp' | translate }}:</span>
                <a
                  href="https://wa.me/2349072102679"
                  target="_blank"
                  rel="noopener"
                  class="transition-colors hover:text-gold-on-dark"
                >
                  +234 907 210 2679
                </a>
              </li>
            </ul>

            <ul class="mt-5 flex items-center gap-4">
              <li>
                <a
                  href="#"
                  [attr.aria-label]="'footer.social.facebook' | translate"
                  class="inline-flex text-white/80 transition-colors hover:text-gold-on-dark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  [attr.aria-label]="'footer.social.instagram' | translate"
                  class="inline-flex text-white/80 transition-colors hover:text-gold-on-dark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  [attr.aria-label]="'footer.social.youtube' | translate"
                  class="inline-flex text-white/80 transition-colors hover:text-gold-on-dark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.51 2.51 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  [attr.aria-label]="'footer.social.x' | translate"
                  class="inline-flex text-white/80 transition-colors hover:text-gold-on-dark"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-gold">
        <div class="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/70 sm:px-6 lg:px-8">
          {{ 'footer.copyright' | translate }}
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly quickLinks: readonly FooterLink[] = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.programs', path: '/programs' },
    { key: 'nav.projects', path: '/projects' },
    { key: 'nav.transparency', path: '/transparency' },
    { key: 'nav.contact', path: '/contact' },
    { key: 'nav.donate', path: '/donate' },
  ];

  /**
   * Program names come from the keys the home page's programs preview already
   * uses, so the four names are defined in exactly one place.
   */
  readonly programLinks: readonly FooterLink[] = [
    { key: 'programs.orphans.title', path: '/programs/orphans' },
    { key: 'programs.mosques.title', path: '/programs/mosques' },
    { key: 'programs.schools.title', path: '/programs/schools' },
    { key: 'programs.hadiya.title', path: '/programs/hadiya' },
  ];
}
