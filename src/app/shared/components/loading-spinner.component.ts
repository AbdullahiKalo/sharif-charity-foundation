import { Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export type SpinnerSize = 'sm' | 'md' | 'lg';

const SIZE_CLASSES: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
};

/** Indeterminate spinner, used while the contact form submits. */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <span class="inline-flex items-center gap-2" role="status">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        [class]="spinnerClasses()"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25" />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>

      @if (label(); as text) {
        <span class="text-sm">{{ text }}</span>
      } @else {
        <span class="sr-only">{{ 'common.loading' | translate }}</span>
      }
    </span>
  `,
})
export class LoadingSpinnerComponent {
  readonly size = input<SpinnerSize>('md');
  /** Visible text beside the spinner. Falls back to a screen-reader-only label. */
  readonly label = input<string | null>(null);

  readonly spinnerClasses = computed(() => 'animate-spin ' + SIZE_CLASSES[this.size()]);
}
