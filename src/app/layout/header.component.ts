import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/** A single entry in the primary navigation. */
interface NavLink {
  /** Translation key for the visible label. */
  readonly key: string;
  /** Router path the link points at. */
  readonly path: string;
  /** Only mark active on an exact URL match (used for the home link). */
  readonly exact: boolean;
}

const BODY_SCROLL_LOCK = 'overflow-hidden';

/** Scroll distance past which the header gains its backdrop and shadow. */
const SCROLLED_THRESHOLD = 12;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  // Stickiness belongs on the host, not the inner <header>. A sticky element is
  // confined to its containing block, and the inner header's containing block is
  // this host, which is exactly header-height tall — so it had nowhere to travel.
  host: { class: 'sticky top-0 z-50 block' },
  template: `
    <header [class]="headerClasses()">
      <div
        class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <a routerLink="/" class="group flex flex-col leading-tight" (click)="closeMenu()">
          <span class="font-serif text-lg font-bold text-primary sm:text-xl lg:text-2xl">
            {{ 'brand.name' | translate }}
          </span>
          <span class="text-[11px] font-medium text-text-muted sm:text-xs">
            {{ 'brand.tagline' | translate }}
          </span>
        </a>

        <nav class="hidden lg:block" [attr.aria-label]="'nav.primary' | translate">
          <ul class="flex items-center gap-6">
            @for (link of navLinks; track link.path) {
              <li>
                <a
                  [routerLink]="link.path"
                  routerLinkActive="text-primary border-primary"
                  [routerLinkActiveOptions]="{ exact: link.exact }"
                  class="border-b-2 border-transparent pb-1 text-sm font-medium text-text-body transition-colors hover:text-primary"
                >
                  {{ link.key | translate }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <div class="flex items-center gap-2">
          <a
            routerLink="/donate"
            class="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-dark transition-colors hover:bg-gold-dark lg:inline-block"
          >
            {{ 'nav.donate' | translate }}
          </a>

          <button
            #menuButton
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-md text-primary transition-colors hover:bg-bg-warm lg:hidden"
            [attr.aria-label]="'nav.menu' | translate"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-menu"
            (click)="toggleMenu()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              class="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <div
          id="mobile-menu"
          class="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white lg:hidden"
          role="dialog"
          aria-modal="true"
          [attr.aria-label]="'nav.menu' | translate"
        >
          <div class="flex items-center justify-between border-b border-border-soft px-4 py-3">
            <span class="font-serif text-lg font-bold text-primary">
              {{ 'brand.name' | translate }}
            </span>
            <button
              #closeButton
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-md text-primary transition-colors hover:bg-bg-warm"
              [attr.aria-label]="'nav.close' | translate"
              (click)="closeMenu()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                class="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav class="flex-1 px-4 py-4" [attr.aria-label]="'nav.primary' | translate">
            <ul class="flex flex-col">
              @for (link of navLinks; track link.path) {
                <li class="border-b border-border-soft last:border-b-0">
                  <a
                    [routerLink]="link.path"
                    routerLinkActive="text-primary"
                    [routerLinkActiveOptions]="{ exact: link.exact }"
                    class="block py-4 text-lg font-medium text-text-body transition-colors hover:text-primary"
                    (click)="closeMenu()"
                  >
                    {{ link.key | translate }}
                  </a>
                </li>
              }
            </ul>
          </nav>

          <div class="px-4 pb-8 pt-2">
            <a
              routerLink="/donate"
              class="block rounded-full bg-gold px-6 py-4 text-center text-base font-semibold text-primary-dark transition-colors hover:bg-gold-dark"
              (click)="closeMenu()"
            >
              {{ 'nav.donate' | translate }}
            </a>
          </div>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  private readonly document = inject(DOCUMENT);

  readonly navLinks: readonly NavLink[] = [
    { key: 'nav.home', path: '/', exact: true },
    { key: 'nav.about', path: '/about', exact: false },
    { key: 'nav.programs', path: '/programs', exact: false },
    { key: 'nav.projects', path: '/projects', exact: false },
    { key: 'nav.transparency', path: '/transparency', exact: false },
    { key: 'nav.contact', path: '/contact', exact: false },
  ];

  readonly menuOpen = signal(false);

  /** True once the page has scrolled past {@link SCROLLED_THRESHOLD}. */
  private readonly scrolled = signal(false);

  readonly headerClasses = computed(
    () =>
      'w-full transition-shadow duration-200 ' +
      (this.scrolled()
        ? 'bg-white/80 shadow-md backdrop-blur-md supports-[backdrop-filter]:bg-white/70'
        : 'bg-white')
  );

  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  constructor() {
    // The overlay covers the hamburger, so move focus into it on open. The
    // query only resolves while the overlay is rendered, which is the signal.
    effect(() => {
      this.closeButton()?.nativeElement.focus();
    });
  }

  toggleMenu(): void {
    this.setMenu(!this.menuOpen());
  }

  closeMenu(): void {
    this.setMenu(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const offset = this.document.defaultView?.scrollY ?? 0;
    this.scrolled.set(offset > SCROLLED_THRESHOLD);
  }

  /** Keeps the page behind the full-screen overlay from scrolling. */
  private setMenu(open: boolean): void {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(open);
    this.document.body.classList.toggle(BODY_SCROLL_LOCK, open);

    // Closing returns focus to the control that opened the overlay.
    if (wasOpen && !open) {
      this.menuButton()?.nativeElement.focus();
    }
  }
}
