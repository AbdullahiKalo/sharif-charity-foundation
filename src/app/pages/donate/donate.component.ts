import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Web3FormsService } from '../../core/services/web3forms.service';
import { ButtonComponent } from '../../shared/components/button.component';
import { CardComponent } from '../../shared/components/card.component';
import { ContactMethodComponent } from '../../shared/components/contact-method.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';

/** One of the four ways to give. */
interface GivingOption {
  readonly id: 'oneTime' | 'monthly' | 'project' | 'zakat';
  readonly titleKey: string;
  readonly descriptionKey: string;
}

/** One slice of the placeholder allocation chart. */
interface Allocation {
  readonly labelKey: string;
  readonly percent: number;
  /** Tailwind text colour, applied to the arc via `stroke="currentColor"`. */
  readonly strokeClass: string;
  /** Tailwind background colour for the legend swatch. */
  readonly swatchClass: string;
}

/** Radius and circumference of the donut arc, in user units. */
const RADIUS = 60;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ALLOCATIONS: readonly Allocation[] = [
  {
    labelKey: 'donate.allocation.programs',
    percent: 40,
    strokeClass: 'text-primary',
    swatchClass: 'bg-primary',
  },
  {
    labelKey: 'donate.allocation.construction',
    percent: 30,
    strokeClass: 'text-primary-light',
    swatchClass: 'bg-primary-light',
  },
  {
    labelKey: 'donate.allocation.distribution',
    percent: 20,
    strokeClass: 'text-gold',
    swatchClass: 'bg-gold',
  },
  {
    labelKey: 'donate.allocation.operations',
    percent: 10,
    strokeClass: 'text-gold-dark',
    swatchClass: 'bg-gold-dark',
  },
];

/** The six pillars, named only, for the compact commitment row. */
const PILLAR_NAME_KEYS: readonly string[] = [
  'pillars.verifiability.name',
  'pillars.traceability.name',
  'pillars.independence.name',
  'pillars.accountability.name',
  'pillars.privacy.name',
  'pillars.continuity.name',
];

type SignupState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    ButtonComponent,
    CardComponent,
    ContactMethodComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    <!-- 1. Page hero -->
    <section class="border-t-4 border-gold bg-bg-warm">
      <div class="mx-auto max-w-3xl px-4 py-20 md:py-28 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold-on-light">
          {{ 'donate.hero.eyebrow' | translate }}
        </p>
        <h1
          class="mt-5 font-serif text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl"
        >
          {{ 'donate.hero.heading' | translate }}
        </h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
          {{ 'donate.hero.subheading' | translate }}
        </p>
      </div>
    </section>

    <!-- 2. How to donate right now -->
    <section class="bg-white">
      <div class="mx-auto max-w-5xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <h2 class="text-center font-serif text-3xl font-bold text-primary sm:text-4xl">
          {{ 'donate.now.heading' | translate }}
        </h2>
        <p class="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-text-muted">
          {{ 'donate.now.intro' | translate }}
        </p>

        <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <app-contact-method
            type="whatsapp"
            [label]="'contact.labels.whatsapp' | translate"
            [value]="'contact.whatsapp' | translate"
          />
          <app-contact-method
            type="email"
            [label]="'contact.labels.email' | translate"
            [value]="'contact.email' | translate"
          />
          <app-contact-method
            type="phone"
            [label]="'contact.labels.phone' | translate"
            [value]="'contact.phone' | translate"
          />
        </div>

        <p class="mx-auto mt-10 max-w-3xl text-center text-sm italic text-text-muted">
          {{ 'donate.now.internationalNote' | translate }}
        </p>
      </div>
    </section>

    <!-- 3. Ways to give -->
    <section class="bg-bg-warm">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <h2 class="text-center font-serif text-3xl font-bold text-primary sm:text-4xl">
          {{ 'donate.ways.heading' | translate }}
        </h2>

        <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (option of givingOptions; track option.id) {
            <app-card
              [title]="option.titleKey | translate"
              [description]="option.descriptionKey | translate"
              [linkLabel]="'donate.ways.arrange' | translate"
              [href]="'contact.whatsappLink' | translate"
            >
              <span icon>
                @switch (option.id) {
                  @case ('oneTime') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-9 w-9"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v10M9.5 9.5h4a1.8 1.8 0 0 1 0 3.6h-3a1.8 1.8 0 0 0 0 3.6h4" />
                    </svg>
                  }
                  @case ('monthly') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-9 w-9"
                      aria-hidden="true"
                    >
                      <path d="M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6" />
                      <path d="M4 6v4h4M20 18v-4h-4" />
                    </svg>
                  }
                  @case ('project') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-9 w-9"
                      aria-hidden="true"
                    >
                      <path d="M3 21h18M5 21V9l7-5 7 5v12" />
                      <path d="M9.5 21v-5h5v5" />
                    </svg>
                  }
                  @default {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="h-9 w-9"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 20.5s-7.2-4.4-7.2-9.6A4.1 4.1 0 0 1 12 8.3a4.1 4.1 0 0 1 7.2 2.6c0 5.2-7.2 9.6-7.2 9.6Z"
                      />
                    </svg>
                  }
                }
              </span>
            </app-card>
          }
        </div>
      </div>
    </section>

    <!-- 4. Where your donation goes -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 class="font-serif text-3xl font-bold leading-tight text-primary sm:text-4xl">
              {{ 'donate.allocation.heading' | translate }}
            </h2>
            <p class="mt-5 text-base leading-relaxed text-text-muted">
              {{ 'donate.allocation.body' | translate }}
            </p>

            <ul class="mt-8 flex flex-col gap-3">
              @for (slice of allocations; track slice.labelKey) {
                <li class="flex items-center gap-3 text-sm">
                  <span [class]="swatchClasses(slice)" aria-hidden="true"></span>
                  <span class="font-medium text-text-body">{{ slice.labelKey | translate }}</span>
                  <span class="ml-auto font-semibold text-primary">{{ slice.percent }}%</span>
                </li>
              }
            </ul>

            <p class="mt-8 text-sm italic text-text-muted">
              {{ 'donate.allocation.note' | translate }}
            </p>
          </div>

          <div class="mx-auto w-full max-w-xs">
            <!-- Decorative: the legend beside it carries the same figures as text. -->
            <svg viewBox="0 0 160 160" class="w-full" aria-hidden="true">
              <g transform="rotate(-90 80 80)">
                @for (slice of allocations; track slice.labelKey; let i = $index) {
                  <circle
                    cx="80"
                    cy="80"
                    [attr.r]="radius"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="26"
                    [class]="slice.strokeClass"
                    [attr.stroke-dasharray]="dashArray(i)"
                    [attr.stroke-dashoffset]="dashOffset(i)"
                  />
                }
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Our commitment -->
    <section class="bg-primary">
      <div class="mx-auto max-w-7xl px-4 py-12 md:py-16 sm:px-6 lg:px-8">
        <h2 class="text-center font-serif text-3xl font-bold text-white sm:text-4xl">
          {{ 'donate.commitment.heading' | translate }}
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-white/80">
          {{ 'donate.commitment.subheading' | translate }}
        </p>

        <ul class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          @for (key of pillarNameKeys; track key; let i = $index) {
            <li
              class="card-alive-dark flex flex-col items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-5 text-center"
            >
              <span
                class="font-serif text-2xl font-bold leading-none text-gold-on-dark"
                aria-hidden="true"
              >
                {{ pillarNumber(i) }}
              </span>
              <span class="text-sm font-semibold text-white">{{ key | translate }}</span>
            </li>
          }
        </ul>
      </div>
    </section>

    <!-- 6. Coming soon banner -->
    <section class="bg-gold">
      <div class="mx-auto max-w-3xl px-4 py-12 md:py-16 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-2xl font-bold text-primary-dark sm:text-3xl">
          {{ 'donate.notify.heading' | translate }}
        </h2>
        <p class="mt-3 text-base text-primary-dark">{{ 'donate.notify.body' | translate }}</p>

        @if (signupState() === 'success') {
          <p class="mt-8 text-base font-semibold text-primary-dark" role="status">
            {{ 'donate.notify.success' | translate }}
          </p>
        } @else {
          <form
            class="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            novalidate
            [formGroup]="signupForm"
            (ngSubmit)="signUp()"
          >
            <label class="sr-only" for="notify-email">
              {{ 'donate.notify.emailLabel' | translate }}
            </label>
            <input
              id="notify-email"
              type="email"
              autocomplete="email"
              formControlName="email"
              [placeholder]="'donate.notify.placeholder' | translate"
              class="w-full flex-1 rounded-lg border border-primary-dark/20 bg-white px-4 py-3 text-base text-text-body focus:outline-none focus:ring-2 focus:ring-primary-dark"
              [attr.aria-invalid]="showSignupError()"
              [attr.aria-describedby]="showSignupError() ? 'notify-email-error' : null"
            />
            <app-button type="submit" variant="primary" [disabled]="signupState() === 'submitting'">
              @if (signupState() === 'submitting') {
                <app-loading-spinner size="sm" [label]="'donate.notify.sending' | translate" />
              } @else {
                {{ 'donate.notify.submit' | translate }}
              }
            </app-button>
          </form>

          @if (showSignupError()) {
            <p id="notify-email-error" class="mt-3 text-sm font-semibold text-primary-dark">
              {{ 'donate.notify.invalidEmail' | translate }}
            </p>
          }

          @if (signupState() === 'error') {
            <div class="mt-3 text-sm text-primary-dark" role="alert">
              <p class="font-semibold">
                {{
                  signupError() !== '' ? signupError() : ('donate.notify.errorGeneric' | translate)
                }}
              </p>
              <p class="mt-1">{{ 'donate.notify.errorFallback' | translate }}</p>
            </div>
          }
        }
      </div>
    </section>

    <!-- 7. Final CTA band -->
    <section class="bg-primary-dark">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
          {{ 'donate.cta.heading' | translate }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-white/80">
          {{ 'donate.cta.description' | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="secondary" size="lg" routerLink="/contact">
            {{ 'donate.cta.contact' | translate }}
          </app-button>
          <app-button variant="outline-light" size="lg" routerLink="/transparency">
            {{ 'donate.cta.transparency' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class DonateComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly seoDestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.apply('seo.donate.title', 'seo.donate.description', this.seoDestroyRef);
  }

  private readonly web3forms = inject(Web3FormsService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly allocations = ALLOCATIONS;
  readonly pillarNameKeys = PILLAR_NAME_KEYS;
  readonly radius = RADIUS;

  readonly signupState = signal<SignupState>('idle');
  readonly signupError = signal('');
  private readonly signupSubmitted = signal(false);

  readonly signupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  readonly givingOptions: readonly GivingOption[] = [
    {
      id: 'oneTime',
      titleKey: 'donate.ways.oneTime.title',
      descriptionKey: 'donate.ways.oneTime.description',
    },
    {
      id: 'monthly',
      titleKey: 'donate.ways.monthly.title',
      descriptionKey: 'donate.ways.monthly.description',
    },
    {
      id: 'project',
      titleKey: 'donate.ways.project.title',
      descriptionKey: 'donate.ways.project.description',
    },
    {
      id: 'zakat',
      titleKey: 'donate.ways.zakat.title',
      descriptionKey: 'donate.ways.zakat.description',
    },
  ];

  /** Arc length for one slice, followed by the rest of the circle as a gap. */
  dashArray(index: number): string {
    const length = (ALLOCATIONS[index].percent / 100) * CIRCUMFERENCE;
    return `${length.toFixed(2)} ${(CIRCUMFERENCE - length).toFixed(2)}`;
  }

  /** Rotates each slice to start where the previous one ended. */
  dashOffset(index: number): string {
    const before = ALLOCATIONS.slice(0, index).reduce((sum, slice) => sum + slice.percent, 0);
    return (-(before / 100) * CIRCUMFERENCE).toFixed(2);
  }

  swatchClasses(slice: Allocation): string {
    return 'h-3 w-3 shrink-0 rounded-full ' + slice.swatchClass;
  }

  pillarNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  showSignupError(): boolean {
    const control = this.signupForm.controls.email;
    return control.invalid && (control.touched || this.signupSubmitted());
  }

  signUp(): void {
    this.signupSubmitted.set(true);

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.signupState.set('submitting');
    this.signupForm.disable();

    const { email } = this.signupForm.getRawValue();

    this.web3forms
      .submit({
        email,
        subject: 'Newsletter Signup',
        message: `User signed up for donation launch notification: ${email}`,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.signupForm.enable();
          this.signupState.set('success');
        },
        error: (error: Error) => {
          this.signupError.set(error.message);
          this.signupForm.enable();
          this.signupState.set('error');
        },
      });
  }
}
