import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Web3FormsService } from '../../core/services/web3forms.service';
import { ButtonComponent } from '../../shared/components/button.component';
import { ContactMethodComponent } from '../../shared/components/contact-method.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';

/**
 * A subject choice. `emailLabel` is the English text sent to Web3Forms, so the
 * notification stays readable whatever language the visitor used.
 */
interface SubjectOption {
  readonly id: string;
  readonly labelKey: string;
  readonly emailLabel: string;
}

const SUBJECT_OPTIONS: readonly SubjectOption[] = [
  { id: 'general', labelKey: 'contact.form.subjects.general', emailLabel: 'General Enquiry' },
  { id: 'donation', labelKey: 'contact.form.subjects.donation', emailLabel: 'Donation' },
  { id: 'partnership', labelKey: 'contact.form.subjects.partnership', emailLabel: 'Partnership' },
  { id: 'media', labelKey: 'contact.form.subjects.media', emailLabel: 'Media' },
  { id: 'other', labelKey: 'contact.form.subjects.other', emailLabel: 'Other' },
];

const INPUT_CLASSES =
  'w-full rounded-lg border bg-bg-warm px-4 py-3 text-base text-text-body transition-colors focus:outline-none focus:ring-2 focus:ring-primary';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    ButtonComponent,
    ContactMethodComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    <!-- 1. Page hero -->
    <section class="bg-primary">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-gold-on-dark">
          {{ 'contact.hero.eyebrow' | translate }}
        </p>
        <h1 class="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
          {{ 'contact.hero.heading' | translate }}
        </h1>
        <p class="mt-5 text-base leading-relaxed text-white/80">
          {{ 'contact.hero.subheading' | translate }}
        </p>
      </div>
    </section>

    <!-- 2 + 3. Contact methods and form -->
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 md:py-24 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <h2 class="font-serif text-2xl font-bold text-primary">
              {{ 'contact.methods.heading' | translate }}
            </h2>
            <p class="mt-3 text-base leading-relaxed text-text-muted">
              {{ 'contact.methods.description' | translate }}
            </p>

            <div class="mt-8 flex flex-col gap-6">
              <app-contact-method
                type="whatsapp"
                [label]="'contact.labels.whatsapp' | translate"
                [value]="'contact.whatsapp' | translate"
              />
              <app-contact-method
                type="phone"
                [label]="'contact.labels.phone' | translate"
                [value]="'contact.phone' | translate"
              />
              <app-contact-method
                type="email"
                [label]="'contact.labels.email' | translate"
                [value]="'contact.email' | translate"
              />
              <app-contact-method
                type="location"
                [label]="'contact.labels.location' | translate"
                [value]="'contact.location' | translate"
              />
            </div>
          </div>

          <div>
            @if (state() === 'success') {
              <div
                class="rounded-2xl border border-border-soft bg-bg-warm p-10 text-center"
                role="status"
              >
                <span
                  class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-8 w-8 text-primary-dark"
                    aria-hidden="true"
                  >
                    <path d="m5 13 4.5 4.5L19 7" />
                  </svg>
                </span>
                <h2 class="mt-6 font-serif text-2xl font-bold text-primary">
                  {{ 'contact.form.successHeading' | translate }}
                </h2>
                <p class="mt-3 text-base leading-relaxed text-text-muted">
                  {{ 'contact.form.successMessage' | translate }}
                </p>
                <div class="mt-8">
                  <app-button variant="outline" (pressed)="resetForm()">
                    {{ 'contact.form.sendAnother' | translate }}
                  </app-button>
                </div>
              </div>
            } @else {
              @if (state() === 'error') {
                <div
                  class="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700"
                  role="alert"
                >
                  <p class="font-semibold">
                    {{
                      errorMessage() !== ''
                        ? errorMessage()
                        : ('contact.form.errorGeneric' | translate)
                    }}
                  </p>
                  <p class="mt-1">{{ 'contact.form.errorFallback' | translate }}</p>
                </div>
              }

              <form
                class="rounded-2xl border border-border-soft bg-white p-6 sm:p-8"
                novalidate
                [formGroup]="form"
                (ngSubmit)="submit()"
              >
                <h2 class="font-serif text-2xl font-bold text-primary">
                  {{ 'contact.form.heading' | translate }}
                </h2>

                <div class="mt-6 flex flex-col gap-5">
                  <div>
                    <label for="contact-name" [class]="labelClasses">
                      {{ 'contact.form.name' | translate }}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autocomplete="name"
                      formControlName="name"
                      [class]="fieldClasses('name')"
                      [attr.aria-invalid]="showError('name')"
                      [attr.aria-describedby]="showError('name') ? 'contact-name-error' : null"
                    />
                    @if (showError('name')) {
                      <p id="contact-name-error" [class]="errorClasses">
                        {{ 'contact.form.errors.nameRequired' | translate }}
                      </p>
                    }
                  </div>

                  <div>
                    <label for="contact-email" [class]="labelClasses">
                      {{ 'contact.form.email' | translate }}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autocomplete="email"
                      formControlName="email"
                      [class]="fieldClasses('email')"
                      [attr.aria-invalid]="showError('email')"
                      [attr.aria-describedby]="showError('email') ? 'contact-email-error' : null"
                    />
                    @if (showError('email')) {
                      <p id="contact-email-error" [class]="errorClasses">
                        {{ emailErrorKey() | translate }}
                      </p>
                    }
                  </div>

                  <div>
                    <label for="contact-subject" [class]="labelClasses">
                      {{ 'contact.form.subject' | translate }}
                    </label>
                    <select
                      id="contact-subject"
                      formControlName="subject"
                      [class]="fieldClasses('subject')"
                      [attr.aria-invalid]="showError('subject')"
                      [attr.aria-describedby]="
                        showError('subject') ? 'contact-subject-error' : null
                      "
                    >
                      <option value="">{{ 'contact.form.subjectPlaceholder' | translate }}</option>
                      @for (option of subjectOptions; track option.id) {
                        <option [value]="option.id">{{ option.labelKey | translate }}</option>
                      }
                    </select>
                    @if (showError('subject')) {
                      <p id="contact-subject-error" [class]="errorClasses">
                        {{ 'contact.form.errors.subjectRequired' | translate }}
                      </p>
                    }
                  </div>

                  <div>
                    <label for="contact-message" [class]="labelClasses">
                      {{ 'contact.form.message' | translate }}
                      <span class="font-normal normal-case text-text-muted">
                        {{ 'contact.form.optional' | translate }}
                      </span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows="6"
                      formControlName="message"
                      [class]="fieldClasses('message')"
                    ></textarea>
                  </div>
                </div>

                <div class="mt-8">
                  <app-button
                    type="submit"
                    variant="primary"
                    [disabled]="state() === 'submitting'"
                    width="responsive"
                  >
                    @if (state() === 'submitting') {
                      <app-loading-spinner size="sm" [label]="'contact.form.sending' | translate" />
                    } @else {
                      {{ 'contact.form.submit' | translate }}
                    }
                  </app-button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Map placeholder -->
    <section class="bg-primary-dark">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center px-4 py-12 md:py-16 text-center sm:px-6"
      >
        <span
          class="flex h-16 w-16 items-center justify-center rounded-full bg-gold"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-8 w-8 text-primary-dark"
            aria-hidden="true"
          >
            <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </span>
        <p class="mt-5 font-serif text-xl font-bold text-white">
          {{ 'contact.map.label' | translate }}
        </p>
        <p class="mt-2 text-sm italic text-white/70">{{ 'contact.map.note' | translate }}</p>
      </div>
    </section>

    <!-- 5. CTA band -->
    <section class="bg-gold">
      <div class="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <h2 class="font-serif text-3xl font-bold leading-tight text-primary-dark sm:text-4xl">
          {{ 'contact.cta.heading' | translate }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-primary-dark">
          {{ 'contact.cta.description' | translate }}
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <app-button variant="primary" size="lg" routerLink="/programs">
            {{ 'contact.cta.programs' | translate }}
          </app-button>
          <app-button variant="outline" size="lg" routerLink="/projects">
            {{ 'contact.cta.projects' | translate }}
          </app-button>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly seoDestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.seo.apply('seo.contact.title', 'seo.contact.description', this.seoDestroyRef);
  }

  private readonly web3forms = inject(Web3FormsService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly subjectOptions = SUBJECT_OPTIONS;

  readonly labelClasses =
    'mb-2 block text-xs font-semibold uppercase tracking-wide text-text-muted';
  readonly errorClasses = 'mt-2 text-sm text-red-600';

  readonly state = signal<SubmitState>('idle');
  readonly errorMessage = signal('');

  /** True once the visitor has tried to submit, so errors appear all at once. */
  private readonly submitted = signal(false);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: [''],
  });

  /**
   * A method, not a computed: the form is a classic reactive form, so there is
   * no signal for a computed to depend on and it would cache the first answer.
   */
  emailErrorKey(): string {
    return this.form.controls.email.hasError('required')
      ? 'contact.form.errors.emailRequired'
      : 'contact.form.errors.emailInvalid';
  }

  submit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('submitting');
    this.form.disable();

    const { name, email, subject, message } = this.form.getRawValue();

    this.web3forms
      .submit({ name, email, subject: this.emailLabelFor(subject), message })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.form.enable();
          this.state.set('success');
        },
        error: (error: Error) => this.fail(error.message),
      });
  }

  resetForm(): void {
    this.form.reset();
    this.form.enable();
    this.submitted.set(false);
    this.errorMessage.set('');
    this.state.set('idle');
  }

  showError(field: 'name' | 'email' | 'subject'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.submitted());
  }

  fieldClasses(field: 'name' | 'email' | 'subject' | 'message'): string {
    const invalid = field !== 'message' && this.showError(field);
    return INPUT_CLASSES + (invalid ? ' border-red-400' : ' border-border-soft');
  }

  private emailLabelFor(id: string): string {
    return SUBJECT_OPTIONS.find((option) => option.id === id)?.emailLabel ?? id;
  }

  private fail(message: string): void {
    this.errorMessage.set(message);
    this.form.enable();
    this.state.set('error');
  }
}
