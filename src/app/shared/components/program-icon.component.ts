import { Component, input } from '@angular/core';

export type ProgramId = 'orphans' | 'mosques' | 'schools' | 'hadiya';

/** The line icon for one of the four programs. Colour comes from the parent. */
@Component({
  selector: 'app-program-icon',
  standalone: true,
  template: `
    @switch (program()) {
      @case ('orphans') {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          [class]="sizeClass()"
          aria-hidden="true"
        >
          <circle cx="12" cy="6" r="3.2" />
          <path d="M6.5 21v-3a5.5 5.5 0 0 1 11 0v3" />
          <path d="M9.5 21v-3.5M14.5 21v-3.5" />
        </svg>
      }
      @case ('mosques') {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          [class]="sizeClass()"
          aria-hidden="true"
        >
          <path
            d="M12 2.5c2.5 2.2 3.8 4 3.8 5.8 0 1.6-1.7 2.7-3.8 2.7s-3.8-1.1-3.8-2.7c0-1.8 1.3-3.6 3.8-5.8Z"
          />
          <path d="M4 21v-6.5a8 8 0 0 1 16 0V21" />
          <path d="M2.5 21h19M4 12V8M20 12V8M10 21v-3.5a2 2 0 0 1 4 0V21" />
        </svg>
      }
      @case ('schools') {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          [class]="sizeClass()"
          aria-hidden="true"
        >
          <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v17H5.5A2.5 2.5 0 0 0 3 22.5Z" />
          <path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H12v17h6.5a2.5 2.5 0 0 1 2.5 2.5Z" />
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
          [class]="sizeClass()"
          aria-hidden="true"
        >
          <rect x="3" y="9" width="18" height="12" rx="1.5" />
          <path d="M2 9h20M12 9v12" />
          <path d="M12 9S9.5 3 7 4.2C5.2 5 6.2 9 12 9ZM12 9s2.5-6 5-4.8C18.8 5 17.8 9 12 9Z" />
        </svg>
      }
    }
  `,
})
export class ProgramIconComponent {
  readonly program = input.required<ProgramId>();
  /** Tailwind sizing classes, so callers can scale the icon per context. */
  readonly sizeClass = input('h-9 w-9');
}
