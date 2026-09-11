import { Component, computed, input } from '@angular/core';

export type PlaceholderPhotoIcon = 'person' | 'building';
export type PlaceholderPhotoRatio = 'square' | 'portrait' | 'landscape' | 'wide';

const RATIO_CLASSES: Record<PlaceholderPhotoRatio, string> = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
};

/** Stands in wherever a real photograph will be dropped in later. */
@Component({
  selector: 'app-placeholder-photo',
  standalone: true,
  template: `
    <figure class="w-full">
      <div [class]="frameClasses()">
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary-light to-gold opacity-20"
          aria-hidden="true"
        ></div>

        @if (icon() === 'person') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="relative h-12 w-12 text-primary"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        } @else {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="relative h-12 w-12 text-primary"
            aria-hidden="true"
          >
            <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
            <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M10 21v-4h4v4" />
          </svg>
        }
      </div>

      <figcaption class="mt-2 text-center text-xs italic text-text-muted">{{ label() }}</figcaption>
    </figure>
  `,
})
export class PlaceholderPhotoComponent {
  /** Caption shown under the frame, e.g. "Founder photo coming soon". */
  readonly label = input.required<string>();
  readonly icon = input<PlaceholderPhotoIcon>('person');
  readonly ratio = input<PlaceholderPhotoRatio>('landscape');

  readonly frameClasses = computed(
    () =>
      'relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border-soft bg-bg-warm ' +
      RATIO_CLASSES[this.ratio()]
  );
}
