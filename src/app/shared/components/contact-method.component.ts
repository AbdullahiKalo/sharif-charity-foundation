import { Component, computed, input } from '@angular/core';

export type ContactMethodType = 'phone' | 'email' | 'whatsapp' | 'location';

/** Icon, bold label and a linked value for one way of reaching the foundation. */
@Component({
  selector: 'app-contact-method',
  standalone: true,
  template: `
    <div class="flex items-start gap-4">
      <span
        class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-warm text-primary ring-1 ring-border-soft"
        aria-hidden="true"
      >
        @switch (type()) {
          @case ('phone') {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path
                d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"
              />
            </svg>
          }
          @case ('email') {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
          }
          @case ('whatsapp') {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.16-1.35a9.92 9.92 0 0 0 4.88 1.27h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2Zm5.83 14.06c-.24.69-1.42 1.32-1.96 1.37-.5.05-1.14.07-1.84-.11-.42-.13-.97-.31-1.67-.61-2.94-1.27-4.86-4.23-5.01-4.43-.14-.2-1.19-1.59-1.19-3.03s.75-2.15 1.02-2.44c.27-.3.59-.37.78-.37h.56c.18 0 .42-.07.66.5.24.59.83 2.03.9 2.18.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.39-.25.66-.15.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.72-.17 1.41Z"
              />
            </svg>
          }
          @default {
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          }
        }
      </span>

      <div class="min-w-0">
        <p class="text-sm font-bold text-primary">{{ label() }}</p>
        @if (link(); as url) {
          <a
            [href]="url"
            [attr.target]="type() === 'whatsapp' ? '_blank' : null"
            [attr.rel]="type() === 'whatsapp' ? 'noopener' : null"
            class="mt-0.5 block break-words text-sm text-text-muted transition-colors hover:text-primary"
          >
            {{ value() }}
          </a>
        } @else {
          <p class="mt-0.5 break-words text-sm text-text-muted">{{ value() }}</p>
        }
      </div>
    </div>
  `,
})
export class ContactMethodComponent {
  readonly type = input.required<ContactMethodType>();
  readonly label = input.required<string>();
  /** Displayed text, e.g. "+234 907 210 2679". */
  readonly value = input.required<string>();
  /** Overrides the URL derived from `type` and `value`. */
  readonly href = input<string | null>(null);

  /** `null` for a location, which is plain text rather than a link. */
  readonly link = computed<string | null>(() => {
    const override = this.href();
    if (override !== null) {
      return override;
    }

    const value = this.value();
    switch (this.type()) {
      case 'phone':
        return 'tel:' + value.replace(/[^\d+]/g, '');
      case 'email':
        return 'mailto:' + value;
      case 'whatsapp':
        return 'https://wa.me/' + value.replace(/\D/g, '');
      case 'location':
        return null;
    }
  });
}
