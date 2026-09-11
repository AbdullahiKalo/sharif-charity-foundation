import { Component, computed, input } from '@angular/core';

export type HeadingAlign = 'center' | 'left';
/** `dark` recolours the text for placement on a primary-green background. */
export type HeadingTone = 'light' | 'dark';

/** Eyebrow + heading + optional subheading, used to open a page section. */
@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <div [class]="wrapperClasses()">
      @if (eyebrow(); as text) {
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{{ text }}</p>
      }

      <h2 [class]="headingClasses()">{{ heading() }}</h2>

      @if (subheading(); as text) {
        <p [class]="subheadingClasses()">{{ text }}</p>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly eyebrow = input<string | null>(null);
  readonly heading = input.required<string>();
  readonly subheading = input<string | null>(null);
  readonly align = input<HeadingAlign>('center');
  readonly tone = input<HeadingTone>('light');

  readonly wrapperClasses = computed(() =>
    this.align() === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'
  );

  readonly headingClasses = computed(
    () =>
      'mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl ' +
      (this.tone() === 'dark' ? 'text-white' : 'text-primary')
  );

  readonly subheadingClasses = computed(() =>
    [
      'mt-4 text-base leading-relaxed',
      this.tone() === 'dark' ? 'text-white/80' : 'text-text-muted',
      this.align() === 'center' ? 'mx-auto' : '',
    ]
      .filter((part) => part !== '')
      .join(' ')
  );
}
